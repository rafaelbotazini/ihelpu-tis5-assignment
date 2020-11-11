import { lighten } from 'polished';
import styled from 'styled-components';
import { colors } from '../../styles/themes';

export const MessageAvatar = styled.div<{ avatar: string }>`
  width: 40px;
  height: 40px;
  content: 'R';
  border-radius: 50%;
  background-image: url(${(props) => props.avatar});
  background-color: ${colors.secondary};
  background-position: center;
  background-size: contain;
  margin-right: 12px;
`;

export const MessageContent = styled.div`
  display: inline;
  border-radius: 4px;
  padding: 8px 12px;
  max-width: 450px;
  background-color: ${lighten(0.15, colors.background)};
`;

export const MessageContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
`;

export const MessageHeader = styled.div`
  display: flex;
  color: ${lighten(0.15, colors.textMuted)};
  margin-bottom: 8px;
`;

export const UserInfo = styled.div`
  display: inline-block;
`;

export const MessageTime = styled.div`
  display: inline-block;
  font-size: 80%;
  color: ${lighten(0.2, colors.dark)};
  padding: 4px 8px;
`;

export const MessageContainer = styled.div<{ position: 'left' | 'right' }>`
  display: flex;

  justify-content: ${(props) =>
    props.position === 'right' ? 'flex-end' : 'flex-start'};

  & ${MessageContentWrapper} {
    align-items: ${(props) =>
      props.position === 'right' ? 'flex-end' : 'flex-start'};
  }
`;
