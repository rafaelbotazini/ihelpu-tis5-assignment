import { darken, lighten } from 'polished';
import styled from 'styled-components';
import { colors } from '../../styles/themes';

export const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-flow: column wrap;
  width: 220px;
  text-align: center;
  padding: 12px;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.25);
  margin: 15px 20px;
  transition: box-shadow 0.2s ease-in;

  &:hover {
    box-shadow: 1px 1px 24px rgba(0, 0, 0, 0.25);
  }
`;

export const RoomAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${lighten(0.3, colors.primary)};
  color: ${darken(0.2, colors.primary)};
  font-size: 34px;
  width: 68px;
  height: 68px;
  border-radius: 50%;
  margin-bottom: 12px;
`;

export const RoomDetails = styled.div`
  color: ${colors.textMuted};
  margin-bottom: 12px;
`;
