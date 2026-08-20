// React
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// Components
import { Checkbox } from '../../components/FormFields';
import { Input } from '../../components/Inputs';
import { useTranslation } from '../../i18n';
// Local
import {
  Screen,
  BrandPanel,
  BrandMarkLg,
  BrandName,
  BrandTagline,
  FormPanel,
  FormBox,
  FormTitle,
  Field,
  FieldLabel,
  ErrorText,
  RememberRow,
  SubmitButton,
} from './styles';
import { buildLoginSchema, LoginValues, EMPTY_LOGIN } from './validators';

export function Login() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const loginSchema = useMemo(() => buildLoginSchema(t), [t]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema), defaultValues: EMPTY_LOGIN });

  const remember = Boolean(watch('remember'));

  const onSubmit = handleSubmit(async () => {
    // Mock: sem autenticação real neste projeto ainda.
    await new Promise((resolve) => setTimeout(resolve, 500));
    navigate('/');
  });

  return (
    <Screen>
      <BrandPanel>
        <BrandMarkLg />
        <BrandName>{t('navbar.brand')}</BrandName>
        <BrandTagline>{t('login.brandTagline')}</BrandTagline>
      </BrandPanel>

      <FormPanel>
        <FormBox as="form" onSubmit={onSubmit}>
          <FormTitle>{t('login.title')}</FormTitle>

          <Field>
            <FieldLabel htmlFor="login-email">{t('login.email')}</FieldLabel>
            <Input id="login-email" type="email" placeholder={t('login.emailPlaceholder')} {...register('email')} />
            {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
          </Field>

          <Field>
            <FieldLabel htmlFor="login-password">{t('login.password')}</FieldLabel>
            <Input id="login-password" type="password" placeholder="••••••••" {...register('password')} />
            {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
          </Field>

          <RememberRow>
            <Checkbox {...register('remember')} checked={remember} />
            {t('login.rememberMe')}
          </RememberRow>

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? t('login.submitting') : t('login.submit')}
          </SubmitButton>
        </FormBox>
      </FormPanel>
    </Screen>
  );
}
