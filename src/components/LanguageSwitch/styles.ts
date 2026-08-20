import styled from 'styled-components';
import { Select } from '../Inputs';
import { typography } from '../../styles/tokens';

// Mesmo Select padrão do projeto, só compacto o bastante pra caber na
// navbar/sidebar (o tamanho normal de formulário — 44px, fonte de 17px —
// ficava grande demais ao lado da marca e do avatar do usuário, a ponto de
// cortar o texto "Português").
export const CompactSelect = styled(Select)`
  ${typography.finePrint}
  height: 32px;
  padding: 6px 22px 6px 10px;
  background-position: right 8px center;
  background-size: 10px 7px;
`;

export const Wrap = styled.div`
  width: 96px;
  flex: 0 0 auto;
`;
