// Sessão mockada — não há autenticação real neste projeto ainda.
// countryResidence/nationality usam os mesmos valores de CS-06 (ver
// choiceSets.ts) — 76 = Brasil.
export const CURRENT_USER = {
  name: 'Mariana Costa Lima',
  firstName: 'Mariana',
  lastName: 'Costa Lima',
  displayName: '',
  initials: 'ML',
  email: 'mariana.lima@example.org',
  phone: '+55 21 97744 3390',
  countryResidence: 76,
  city: 'Brasília',
  nationality: 76,
  nationality2: undefined as number | undefined,
  gender: undefined as number | undefined,
};
