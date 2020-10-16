import styled from 'styled-components';
import { colors } from '../../styles/themes';

export const NavWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 15px;
  background-color: ${colors.dark};
`;

export const Brand = styled.div`
  display: inline-block;
  cursor: pointer;
  margin-right: 20px;

  div {
    display: flex;
    align-items: center;
  }

  span {
    font-size: 24px;
  }

  img {
    margin-right: 8px;
  }
`;
