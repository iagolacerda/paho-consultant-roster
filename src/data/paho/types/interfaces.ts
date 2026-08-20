// Tipos do formulário de perfil do consultor — cobre os campos editáveis
// F-001 a F-057 do Field Dictionary (os campos de sistema, somente-leitura,
// ficam de fora: F-025, F-042, F-055 a F-065).

export interface SkillEntry {
  skill: number; // CS-02
  depth: number; // CS-03 — F-014
  yearsUsing?: number; // F-015
}

export interface LanguageEntry {
  language: number; // CS-04 — F-017
  proficiency: number; // CS-05 — F-018
}

export interface AssignmentRecord {
  title: string; // F-026
  client: string; // F-027
  sector: number | undefined; // F-028 — CS-08
  country: number | undefined; // F-029 — CS-06
  yearFrom: number | undefined; // F-030
  yearTo?: number; // F-031 — em branco = em andamento
  role: number | undefined; // F-032 — CS-09
  outcome: string; // F-033
  relatedSkills: number[]; // F-034 — subconjunto das skills do perfil
}

export interface MockFile {
  name: string;
  size: number;
}
