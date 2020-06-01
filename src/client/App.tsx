import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Question from './components/Question';
import Header from './components/Header';
import * as COLORS from './Colors';

type RiskData = {
  cat: string;
  type: string;
  question: string;
  options: [string];
};

type Props = {
  api: string;
  headerTxt: string;
};

interface RiskDivProps {
  readonly bgColor: string;
}

interface Risklevel {
  risk: string;
  description: string;
  otherRiskOptions: [string];
}

interface SelectRisk {
  otherRiskOptions: any;
}

const ConfirmButton = styled.button`
  background: #c4d4d8;
  padding: 20px 10px;
  color: #266678;
  font-size: 1em;
  width: 200px;
  border-radius: 2px;
`;

const readProgressFromStorage = (): any => {
  try {
    const item = localStorage.getItem('progress');
    return item ? JSON.parse(item) : { qCount: 0 };
  } catch (e) {
    console.warn(
      'Could not store in local storage. Progress will be lost on closing tab'
    );
    return { qCount: 0 };
  }
};

const writeProgressToStorage = (params: any): any => {
  const { qCount, answer } = params || {};
  try {
    if (qCount === null || typeof qCount === 'undefined') {
      localStorage.removeItem('progress');
      return { qCount: 0 };
    }

    // Read from local storage
    const items = readProgressFromStorage();

    // Update the questions
    const itemsToWrite = {
      ...items,
      qCount,
      [qCount]: answer,
    };
    localStorage.setItem('progress', JSON.stringify(itemsToWrite));
    return itemsToWrite;
  } catch (e) {
    console.warn(
      'Could not store in local storage. Progress will be lost on closing tab'
    );
    return { qCount: 0 };
  }
};

const RiskDiv = styled.div<RiskDivProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
  background-color: ${(props) => props.bgColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

export const App = ({ api, headerTxt }: Props) => {
  const [riskDataArray, setRiskDataArray] = useState<Array<RiskData>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [currQuestion, setCurrQuestion] = useState<RiskData>();
  const [otherRiskOptions, setRiskOptions] = useState();
  const [qCount, setQcount] = useState(-1);
  const [riskLevel, setRiskResponse] = useState<Risklevel>();

  useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setRiskDataArray(data.results);
        setQcount(readProgressFromStorage().qCount);
      })
      .catch((err) => {
        console.error(err.message);
        setFetchError(true);
      });
  }, [api]);

  useEffect(() => {
    setCurrQuestion(riskDataArray[0]);
  }, [riskDataArray]);

  const handleSubmitAnswer = useCallback(
    (answer: any) => {
      const aggregatedResponse = writeProgressToStorage({
        qCount: qCount + 1,
        answer,
      });
      if (qCount >= 2) {
        // alert(JSON.stringify(aggregatedResponse) + '\nSend request from this if block to backend');
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify(aggregatedResponse),
        };

        fetch('http://localhost:4000/submit/risk-questions', requestOptions)
          .then((response) => response.json())
          .then((data) => setRiskResponse(data));
      }
      setQcount(qCount + 1);
    },
    [qCount]
  );

  const handleTheLastStep = () => {
    const risk = `risk: ${otherRiskOptions}`;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },

      body: JSON.stringify(risk),
    };

    fetch('http://localhost:4000/store/risk-level', requestOptions)
      .then((response) => response.json())
      .then((data) => setRiskResponse(data));
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRiskOptions(event.currentTarget.value);
  };

  useEffect(() => {
    if (qCount >= 0) {
      setCurrQuestion(riskDataArray[qCount]);
    }

    if (qCount > 2) {
      // Make API call here
      writeProgressToStorage(null);
      setQcount(-1);
    }
  }, [qCount, riskDataArray, handleSubmitAnswer]);

  return (
    <RiskDiv bgColor={COLORS.blue}>
      <Header txt={headerTxt} />
      {fetchError ? (
        <h1>Fetch Error </h1>
      ) : isLoading ? (
        <h1>Loading</h1>
      ) : currQuestion ? (
        <Question
          key={currQuestion.question}
          quizObj={currQuestion}
          onSubmitAnswerToApp={handleSubmitAnswer}
        />
      ) : (
        <>
          <main style={{ color: '#000', fontSize: '18px' }}>
            Your risk level is {riskLevel && riskLevel?.risk}
            {riskLevel && riskLevel?.description}
          </main>
          <p style={{ color: '#000' }}>
            Your default risk level is, if you are not satisfied, Please
            checkout other options and click on confirm
            {
              <select onChange={(e) => handleChange(e)}>
                <option value={riskLevel?.risk}>{riskLevel?.risk}</option>
                {riskLevel?.otherRiskOptions &&
                  riskLevel?.otherRiskOptions.map((otheroption, index) => {
                    return (
                      <option key={index} value={otheroption}>
                        {otheroption}
                      </option>
                    );
                  })}
              </select>
            }
          </p>
          <ConfirmButton onClick={handleTheLastStep}>Confirm</ConfirmButton>
        </>
      )}

      {riskDataArray.length > 0 && (
        <div style={{ width: '300px', background: 'gray', height: '15px' }}>
          <div
            style={{
              width: `${(300 * (qCount + 1)) / riskDataArray.length}px`,
              background: 'green',
              height: '100%',
              transition: 'width 0.1s linear',
            }}
          />
        </div>
      )}
    </RiskDiv>
  );
};
