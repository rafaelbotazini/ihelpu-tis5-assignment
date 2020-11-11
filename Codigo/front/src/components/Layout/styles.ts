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

  @media screen and (max-width: 992px) {
    max-width: 64px;
    overflow-x: hidden;
  }
`;

export const BottomMenu = styled.div`
  display: flex;
  justify-content: center;
  margin-top: auto;
  padding: 20px 15px;
  background-color: ${colors.darker};

  @media screen and (max-width: 992px) {
    flex-flow: row wrap;
  }
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
