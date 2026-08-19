import { ConsultantProfileFormValues } from '../data/paho/schema';

function delay<T>(value: T, ms = 900): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export interface SubmittedProfile {
  rosterId: string;
  profileStatus: 'Ativo';
  submittedAt: string;
  profile: ConsultantProfileFormValues;
}

let seq = 2042;

export const consultantProfileService = {
  // Mock: nenhuma chamada de rede real é feita — apenas simula a latência
  // e a resposta que o Dataverse daria (F-058 Profile status, F-060 Roster ID).
  submit(profile: ConsultantProfileFormValues): Promise<SubmittedProfile> {
    const rosterId = `p-${String(seq++).padStart(5, '0')}`;
    return delay({
      rosterId,
      profileStatus: 'Ativo',
      submittedAt: new Date().toISOString(),
      profile,
    });
  },
};
