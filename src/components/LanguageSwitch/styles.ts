import styled from 'styled-components';
import { Select } from '../Inputs';

// Mesmo Select padrão do projeto, só compacto o bastante pra caber na
// navbar/sidebar (o tamanho normal de formulário — 44px — ficava grande
// demais ao lado da marca e do avatar do usuário).
export const CompactSelect = styled(Select)`
  height: 36px;
  padding: 6px 30px 6px 14px;
  background-position: right 10px center;
`;

export const Wrap = styled.div`
  width: 112px;
  flex: 0 0 auto;
`;
