import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh; 

  display: flex;
  align-items: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  place-content: center;

  width: 100%;

  img {
    width: 150px;
    height: 150px;
  }

  h4 {
    margin-top: 10px;
    font-size: 20px;
  }

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }
    
    a {
      color: #F4EDE8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition color 0.2s;

      &:hover {
        color: ${shade(0.2, '#F4EDE8')}
      }
    }
  }

  > a {
      color: #FF9000;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition color 0.2s;

      display: flex;
      align-items: center;

      svg {
        margin-right: 16px;
      }

      &:hover {
        color: ${shade(0.2, '#FF9000')}
      }
  }
`;