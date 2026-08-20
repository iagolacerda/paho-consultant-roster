// React
import React from 'react';
// Local
import { FieldStack, FieldLabel, RequiredMark, ErrorText, HintText } from './styles';

interface FieldProps {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

export function Field({ label, required, error, hint, children }: FieldProps) {
  return (
    <FieldStack as="div">
      <FieldLabel as="span">
        {label}
        {required && <RequiredMark>*</RequiredMark>}
      </FieldLabel>
      {children}
      {error ? <ErrorText>{error}</ErrorText> : hint ? <HintText>{hint}</HintText> : null}
    </FieldStack>
  );
}
