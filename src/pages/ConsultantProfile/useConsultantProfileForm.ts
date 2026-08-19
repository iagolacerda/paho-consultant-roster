import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  buildConsultantProfileSchema,
  ConsultantProfileFormValues,
  ConsultantProfileFormInput,
  EMPTY_PROFILE,
  SECTION_FIELDS,
} from '../../data/paho/schema';
import { consultantProfileService, SubmittedProfile } from '../../services/consultantProfileService';
import { useTranslation } from '../../i18n';

export const STEPS = [
  { key: 'identity', labelKey: 'consultantProfile.steps.identity', fields: SECTION_FIELDS.identity },
  { key: 'expertise', labelKey: 'consultantProfile.steps.expertise', fields: SECTION_FIELDS.expertise },
  { key: 'experience', labelKey: 'consultantProfile.steps.experience', fields: SECTION_FIELDS.experience },
  { key: 'availability', labelKey: 'consultantProfile.steps.availability', fields: SECTION_FIELDS.availability },
  { key: 'compliance', labelKey: 'consultantProfile.steps.compliance', fields: SECTION_FIELDS.compliance },
  { key: 'review', labelKey: 'consultantProfile.steps.review', fields: [] as readonly string[] },
] as const;

export function useConsultantProfileForm() {
  const { t } = useTranslation();
  // 3 genéricos: TFieldValues (o que RHF guarda enquanto o consultor digita,
  // com campos ainda não normalizados) e TTransformedValues (o tipo validado
  // que chega em handleSubmit) — necessário porque o schema usa preprocess
  // para normalizar valores vindos de <select> nativos.
  const consultantProfileSchema = useMemo(() => buildConsultantProfileSchema(t), [t]);
  const form = useForm<ConsultantProfileFormInput, unknown, ConsultantProfileFormValues>({
    resolver: zodResolver(consultantProfileSchema),
    defaultValues: EMPTY_PROFILE,
    mode: 'onBlur',
  });

  const [stepIndex, setStepIndex] = useState(0);
  const [maxReached, setMaxReached] = useState(0);
  const [submitted, setSubmitted] = useState<SubmittedProfile>();
  const [submitError, setSubmitError] = useState<string>();

  const isLastStep = stepIndex === STEPS.length - 1;

  const goToStep = (index: number) => {
    // TEMP: navegação livre entre etapas para revisão de UI — sem checar maxReached.
    // if (index <= maxReached) setStepIndex(index);
    setStepIndex(index);
  };

  const next = async () => {
    // TEMP: validação de etapa desativada para revisão de UI — reative removendo
    // o comentário abaixo e apagando a linha "const valid = true".
    // const fields = STEPS[stepIndex].fields as Path<ConsultantProfileFormInput>[];
    // const valid = fields.length === 0 ? true : await form.trigger(fields);
    const valid = true;
    if (!valid) return;
    const nextIndex = Math.min(stepIndex + 1, STEPS.length - 1);
    setStepIndex(nextIndex);
    setMaxReached((m) => Math.max(m, nextIndex));
  };

  const back = () => setStepIndex((i) => Math.max(0, i - 1));

  const submit = form.handleSubmit(
    async (values) => {
      setSubmitError(undefined);
      try {
        const result = await consultantProfileService.submit(values);
        setSubmitted(result);
      } catch (err) {
        setSubmitError(err instanceof Error ? err.message : t('consultantProfile.submitUnexpectedError'));
      }
    },
    () => {
      setSubmitError(t('consultantProfile.submitError'));
    },
  );

  const steps = useMemo(
    () => STEPS.map((step) => ({ ...step, label: t(step.labelKey) })),
    [t],
  );

  return useMemo(
    () => ({
      form,
      steps,
      stepIndex,
      maxReached,
      isLastStep,
      goToStep,
      next,
      back,
      submit,
      submitted,
      submitError,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [form, steps, stepIndex, maxReached, isLastStep, submitted, submitError],
  );
}
