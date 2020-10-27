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

export const Container = styled.div`
  position: absolute;
  height: 32.24px;
  left: 250px;
  right: 23px;
  top: 2px;

  @media screen and (max-width: 576px) {
    display: none;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 42px;
    height: 40px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;
    a {
      text-decoration: none;
      color: #ff9000;
      &:hover {
        opacity: 0.8;
      }
    }
  }
`;
