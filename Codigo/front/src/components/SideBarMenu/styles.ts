import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../styles/themes';

export const SideMenu = styled.div`
  display: flex;
  padding: 28px 0 15px;
  flex-direction: column;
`;

export const SideMenuItem = styled.div`
  display: flex;
  padding: 15px;
  align-items: center;

  @media screen and (max-width: 992px) {
    display: none;
  }
`;

export const SideMenuLink = styled(NavLink)`
  display: flex;
  padding: 15px;
  align-items: center;
  text-decoration: none;
  border-radius: 12px 0 0 12px;
`;

export const SideMenuMessage = styled.div`
  padding: 15px;
  &,
  a {
    color: ${colors.textMuted};
  }
`;

export const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 32px;
  margin-right: 8px;
`;

export const FlexDiv = styled.div`
  display: flex;
  flex: 1;
  @media screen and (max-width: 992px) {
    display: none;
  }
`;
