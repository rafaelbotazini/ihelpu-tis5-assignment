import styled from 'styled-components';

const CardList = styled.div`
  display: flex;
  flex: 1;
  flex-flow: row wrap;

  @media (max-width: 992px) {
    justify-content: center;
  }
`;

export default CardList;
