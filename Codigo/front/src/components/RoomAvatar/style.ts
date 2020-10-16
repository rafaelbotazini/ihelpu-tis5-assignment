import { darken, lighten } from 'polished';
import styled from 'styled-components';
import { RoomAvatarProps } from '.';
import { colors } from '../../styles/themes';

export const RoomAvatarWrapper = styled.div<RoomAvatarProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${lighten(0.3, colors.primary)};
  color: ${darken(0.2, colors.primary)};
  font-size: ${(props) => props.fontSize || 34}px;
  width: ${(props) => props.size || 68}px;
  height: ${(props) => props.size || 68}px;
  border-radius: 50%;
`;
