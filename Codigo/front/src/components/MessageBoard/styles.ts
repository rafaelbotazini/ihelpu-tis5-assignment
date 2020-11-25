import { darken } from 'polished';
import styled from 'styled-components';
import { colors } from '../../styles/themes';

export const BoardWrapper = styled.div`
  flex: 1;
  overflow: hidden;
`;

export const Board = styled.div`
  flex: 1;
  max-height: calc(100vh - 242px);
  overflow-y: scroll;
  overflow-x: hidden;
  padding-right: 20px;
  margin-right: -20px;
  margin-bottom: 12px;
`;

export const MessagesWrapper = styled.div`
  width: 100%;
  padding: 20px 0;
`;

export const LoadMessagesButton = styled.div`
  color: ${colors.secondary};
  padding: 12px 20px;
  text-align: center;
  cursor: pointer;

  &:hover {
    color: ${darken(0.15, colors.secondary)};
  }
`;

export const ControlMessage = styled.div`
  color: ${colors.textMuted};
  padding: 8px;
  text-align: center;
`;
