import React from 'react';
import styled from 'styled-components';

type Props = {
  selection: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
};

const RiskChoices = styled.div`
  margin-top: 6px;
`;
const AnswerSpan = styled.span`
  padding-left: 6px;
`;
export const RiskChoice = ({ selection, onChange, checked }: Props) => {
  return (
    <RiskChoices>
      <label>
        <input
          type="radio"
          value={selection}
          onChange={onChange}
          checked={checked}
        />

        <AnswerSpan>{selection}</AnswerSpan>
      </label>
    </RiskChoices>
  );
};

export default RiskChoice;
