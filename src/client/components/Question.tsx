import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import WeatlhRisk from './WeatlhRisk';

enum QuestionTypes {
  MULT = 'multiple',
}

type QuizData = {
  type: string;
  question: string;
  options: [string];
};

type Props = {
  quizObj: QuizData;
  onSubmitAnswerToApp: (b: any) => void;
};

const Qdiv = styled(motion.div)`
  width: 80%;
  border: 1px solid black;
  border-radius: 4px;
  padding: 48px;
`;

const variants = {
  open: { x: 0 },
  closed: { x: '100%' },
};

const Question = ({ quizObj, onSubmitAnswerToApp }: Props) => {
  const q1 = quizObj.question;
  const question = q1;

  return (
    <Qdiv variants={variants} initial="closed" animate="open">
      <p style={{ color: '#000000', fontSize: '40px' }}>{question}</p>
      {quizObj &&
        (quizObj.type === QuestionTypes.MULT ? (
          <WeatlhRisk
            options={quizObj.options}
            onSubmitAnswer={onSubmitAnswerToApp}
          />
        ) : (
          <></>
        ))}
    </Qdiv>
  );
};

export default Question;
