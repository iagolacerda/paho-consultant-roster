import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from '../../../i18n';
import { UploadRow, UploadButton, FileName, RemoveLink } from './styles';
import { ErrorText, HintText } from '../shared/styles';

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

interface FileUploadFieldProps {
  name: string;
  accept: string; // ex.: '.pdf,.doc,.docx'
  acceptLabel: string; // ex.: 'PDF, DOC ou DOCX, até 5 MB'
}

export function FileUploadField({ name, accept, acceptLabel }: FileUploadFieldProps) {
  const { control } = useFormContext();
  const { t } = useTranslation();
  const [localError, setLocalError] = useState<string>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div>
          <UploadRow>
            <UploadButton>
              📎 {field.value ? t('formFields.fileUpload.change') : t('formFields.fileUpload.attach')}
              <input
                type="file"
                accept={accept}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  e.target.value = '';
                  if (!file) return;
                  if (file.size > MAX_SIZE_BYTES) {
                    setLocalError(t('formFields.fileUpload.tooLarge'));
                    return;
                  }
                  setLocalError(undefined);
                  // Mock: não enviamos o binário a lugar nenhum, só guardamos a referência.
                  field.onChange({ name: file.name, size: file.size });
                }}
              />
            </UploadButton>
            {field.value && (
              <>
                <FileName>{field.value.name}</FileName>
                <RemoveLink type="button" onClick={() => field.onChange(undefined)}>
                  {t('formFields.fileUpload.remove')}
                </RemoveLink>
              </>
            )}
          </UploadRow>
          {localError || fieldState.error ? (
            <ErrorText>{localError ?? fieldState.error?.message}</ErrorText>
          ) : (
            <HintText>{acceptLabel}</HintText>
          )}
        </div>
      )}
    />
  );
}
