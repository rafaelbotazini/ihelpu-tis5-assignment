import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../styles/themes';

export const Link = styled(RouterLink)`
  font-size: 14px;
  text-align: center;
  text-decoration: none;
  color: ${colors.primary};
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
`;
