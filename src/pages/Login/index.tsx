import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../components/Inputs';
import { Checkbox } from '../../components/FormFields';
import { useTranslation } from '../../i18n';
import { buildLoginSchema, LoginValues, EMPTY_LOGIN } from './schema';
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
