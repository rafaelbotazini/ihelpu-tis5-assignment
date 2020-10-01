import { darken } from 'polished';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const Sider = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  background-color: #211f27;
`;

export const MenuBrand = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  text-align: center;
  cursor: pointer;

  img {
    margin-right: 8px;
  }
`;

export const BottomMenu = styled.div`
  margin-top: auto;
  padding: 20px 14px;
  background-color: ${darken(0.05, '#211f27')};
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
`;

export const Container = styled.div`
  display: block;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 24px 20px;
`;
