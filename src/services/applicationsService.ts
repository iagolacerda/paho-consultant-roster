// Components
import { Application, SEED_APPLICATIONS } from '../data/paho/mockApplications';

// Mock: sem chamada de rede, estado mantido em memória — mesma convenção
// dos demais services deste projeto.
const applications: Application[] = [...SEED_APPLICATIONS];

export const applicationsService = {
  list(): Application[] {
    return applications;
  },

  find(opportunityId: string): Application | undefined {
    return applications.find((a) => a.opportunityId === opportunityId);
  },

  apply(opportunityId: string): Application {
    const existing = applications.find((a) => a.opportunityId === opportunityId);
    if (existing) return existing;

    const application: Application = {
      opportunityId,
      status: 'underReview',
      appliedAt: new Date().toISOString(),
    };
    applications.unshift(application);
    return application;
  },
};
