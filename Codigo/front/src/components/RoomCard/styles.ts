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

export const RoomDetails = styled.div`
  color: ${colors.textMuted};
`;
