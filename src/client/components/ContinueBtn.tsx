import React from 'react';
import styled from 'styled-components';

type Props = {
  userDidAnswer: boolean;
};

const Button = styled.button`
  background: #c4d4d8;
  padding: 20px 10px;
  color: #266678;
  font-size: 1em;
  width: 200px;
  border-radius: 2px;
`;

const WrapDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 10px;
`;
const ContinueBtn = ({ userDidAnswer = false }: Props) => {
  return (
    <WrapDiv>
      <Button type="submit" value="Next" disabled={!userDidAnswer}>
        NEXT
      </Button>
    </WrapDiv>
  );
};

export default ContinueBtn;
