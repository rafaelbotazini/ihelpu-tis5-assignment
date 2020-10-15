import styled from 'styled-components';

import Input from '../../../components/Input';
import { colors } from '../../../styles/themes';

export const Container = styled.div`
  flex: 1;
  padding: 15px;
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
`;

export const ResultsContainer = styled.div`
  text-align: center;
`;

export const ResultsList = styled.div`
  display: flex;
  flex: 1;
  flex-flow: row wrap;
`;

export const SearchInputWrapper = styled.div`
  width: 100%;
  max-width: 580px;
`;

export const SearchInput = styled(Input)`
  text-align: center;
`;

export const SearchStatus = styled.div`
  color: ${colors.textMuted};
  margin-bottom: 20px;
`;
