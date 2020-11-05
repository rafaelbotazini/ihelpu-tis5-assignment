import { lighten } from 'polished';
import styled from 'styled-components';
import { colors } from '../../../styles/themes';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 15px;
  width: 100%;
  max-width: 992px;
`;

export const OptionsBar = styled.div`
  width: 100%;
  padding: 4px 15px;
  font-size: 14px;
  background-color: ${colors.darker};
  color: ${colors.textMuted};
  text-align: right;
`;

export const OptionLink = styled.span`
  margin-left: 12px;
  cursor: pointer;

  &:hover {
    color: ${lighten(0.15, colors.textMuted)};
  }
`;
