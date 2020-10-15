import styled from 'styled-components';
import { colors } from '../../styles/themes';

export const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
`;

export const Sider = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  background-color: ${colors.dark};
`;

export const SideMenu = styled.div`
  display: flex;
  padding: 28px 0 15px;
  flex-direction: column;
`;

export const SideMenuItem = styled.div`
  display: flex;
  padding: 15px;
  flex-direction: column;
`;

export const BottomMenu = styled.div`
  display: flex;
  justify-content: center;
  margin-top: auto;
  padding: 20px 15px;
  background-color: ${colors.darker};
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  overflow: auto;
`;

export const Container = styled.div`
  display: block;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 24px 20px;
`;
