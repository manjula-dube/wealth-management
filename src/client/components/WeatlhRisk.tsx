import React, { useState, useEffect } from 'react';
import styles from '../../styles/App.module.css';
import ContinueBtn from './ContinueBtn';
import RiskChoice from './RiskChoice';

type Props = {
  options: Array<string>;
  onSubmitAnswer: (b: any) => void;
};

const WeatlhRisk: React.FC<Props> = ({ options, onSubmitAnswer }) => {
  const [userAnswer, setUserAnswer] = useState<string>();
  const [userHasAnswered, setUserHasAnswered] = useState(false);
  const [allAnswers, setAllAnswers] = useState<Array<string>>(['']);

  useEffect(() => {
    const arr = options.slice();
    setAllAnswers(arr);
  }, [options]);

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserHasAnswered(true);
    setUserAnswer(e.target.value);
  };

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    onSubmitAnswer(e.target.querySelector('input[type="radio"]:checked').value); // passes state up
    setUserHasAnswered(true);
  };

  return (
    <div className={styles.myComponent}>
      <form onSubmit={handleSubmit}>
        {allAnswers?.map((answer: string, index: number) => (
          <RiskChoice
            key={index}
            selection={answer}
            onChange={handleOptionChange}
            checked={userAnswer === answer}
          />
        ))}
        <ContinueBtn userDidAnswer={userHasAnswered} />
      </form>
    </div>
  );
};

export default WeatlhRisk;
