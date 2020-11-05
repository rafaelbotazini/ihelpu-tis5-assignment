import styled from 'styled-components';

export const BoardWrapper = styled.div`
  flex: 1;
  overflow: hidden;
`;

export const Board = styled.div`
  flex: 1;
  max-height: calc(100vh - 242px);
  overflow-y: scroll;
  overflow-x: hidden;
  margin-right: -15px;
  margin-bottom: 12px;
`;

export const MessagesWrapper = styled.div`
  width: 100%;
  padding: 20px 0;
`;
