export const COUNTRY_ISO_BY_VALUE: Record<number, string> = {
  32: 'ar', // Argentina
  68: 'bo', // Bolívia
  76: 'br', // Brasil
  152: 'cl', // Chile
  170: 'co', // Colômbia
  218: 'ec', // Equador
  328: 'gy', // Guiana
  600: 'py', // Paraguai
  604: 'pe', // Peru
  740: 'sr', // Suriname
  858: 'uy', // Uruguai
  862: 've', // Venezuela
  84: 'bz', // Belize
  188: 'cr', // Costa Rica
  222: 'sv', // El Salvador
  320: 'gt', // Guatemala
  340: 'hn', // Honduras
  484: 'mx', // México
  558: 'ni', // Nicarágua
  591: 'pa', // Panamá
  192: 'cu', // Cuba
  214: 'do', // República Dominicana
  332: 'ht', // Haiti
  388: 'jm', // Jamaica
  780: 'tt', // Trinidad e Tobago
  52: 'bb', // Barbados
  44: 'bs', // Bahamas
  124: 'ca', // Canadá
  840: 'us', // Estados Unidos da América
  // 999 "Outro — fora da Região" não tem bandeira.
};

export const COUNTRY_ISO_BY_NAME: Record<string, string> = {
  Argentina: 'ar',
  Bolívia: 'bo',
  Brasil: 'br',
  Chile: 'cl',
  Colômbia: 'co',
  Equador: 'ec',
  Guiana: 'gy',
  Paraguai: 'py',
  Peru: 'pe',
  Suriname: 'sr',
  Uruguai: 'uy',
  Venezuela: 've',
  Belize: 'bz',
  'Costa Rica': 'cr',
  'El Salvador': 'sv',
  Guatemala: 'gt',
  Honduras: 'hn',
  México: 'mx',
  Nicarágua: 'ni',
  Panamá: 'pa',
  Cuba: 'cu',
  'República Dominicana': 'do',
  Haiti: 'ht',
  Jamaica: 'jm',
  'Trinidad e Tobago': 'tt',
  Barbados: 'bb',
  Bahamas: 'bs',
  Canadá: 'ca',
  'Estados Unidos da América': 'us',
};

export function isoCodeByValue(value: number | undefined): string | undefined {
  return value !== undefined ? COUNTRY_ISO_BY_VALUE[value] : undefined;
}

export function isoCodeByName(name: string): string | undefined {
  return COUNTRY_ISO_BY_NAME[name];
}
