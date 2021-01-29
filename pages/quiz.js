import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Head from "next/head";

import db from "../db.json";
import Widget from "../src/components/Widget";
import QuizBackground from "../src/components/QuizBackground";
import AlternativesForm from "../src/components/AlterrnativesForm";
import Footer from "../src/components/Footer";
import GitHubCorner from "../src/components/GitHubCorner";


const Button = styled.button`
  width: 100%;
  height: 36px;
  border-radius: 4px;
  margin-top: 25px;
  margin-bottom: 32px;
  background: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  padding-left: 15px;
  font: inherit;
  color: ${({ theme }) => theme.colors.contrastText};

  &:disabled {
    background-color: #979797;
    cursor: not-allowed;
  }
`;

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>Resultado:</Widget.Header>

      <Widget.Content>
        <p>
          Voce acertou{" "}
          {results.reduce((somatoriaAtual, resultAtual) => {
            const isAcerto = resultAtual === true;
            if (isAcerto) {
              return somatoriaAtual + 1;
            }
            return somatoriaAtual;
          }, 0)}{" "}
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${result}`}>
              #{index + 1} Resultado:
              {result === true ? "Acertou" : "Errou"}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>Carregando</Widget.Header>

      <Widget.Content>description</Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addresults,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(
    undefined
  );
  const [isFormSubmit, setIsFormSubmit] = React.useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasSelectedAlternative = selectedAlternative !== undefined;
  return (
    <Widget>
      <Widget.Header>
        {/* <BackLinkArrow href="/" /> */}
        <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: "100%",
          height: "150px",
          objectFit: "cover",
        }}
        src={question.image}
      />

      <Widget.Content>
        <h2>{question.title}</h2>

        <p>{question.description}</p>

        <AlternativesForm
          onSubmit={(infosEvent) => {
            infosEvent.preventDefault();
            setIsFormSubmit(true);
            setTimeout(() => {
              addresults(isCorrect);
              onSubmit();
              setIsFormSubmit(false);
              setSelectedAlternative(undefined);
            }, 3 * 1000);
          }}
        >
          {question.alternatives.map((alternatives, alternativesIndex) => {
            const alternativesId = `alternative__${alternativesIndex}`;
            const alternativeStatus = isCorrect ? 'SUCESS' : 'ERROR'
            const isSelected = selectedAlternative === alternativesIndex
            return (
              <Widget.Topic
                as="label"
                key={alternativesId}
                htmlFor={alternativesId}
                data-selected={true}
                data-status={isFormSubmit && alternativeStatus}
              >
                {alternatives}
                <input
                  style={{ display: "none" }}
                  id={alternativesId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativesIndex)}
                  type="radio"
                />
              </Widget.Topic>
            );
          })}

          <Button type="submit" disabled={!hasSelectedAlternative}>
            CONFIRMAR
          </Button>

          {isFormSubmit && isCorrect && <p>VOCE ACERRTOU</p>}
          {isFormSubmit && !isCorrect && <p>VOCE ERROU</p>}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: "QUIZ",
  LOADING: "LOADING",
  RESULT: "RESULT",
};

export default function quiz() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestionIndex] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  function addresults(result) {
    setResults([...results, result]);
  }

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handSubmit() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestionIndex(questionIndex + 1);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handSubmit}
            addresults={addresults}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && (
          <ResultWidget results={results} />
        )}
      </QuizContainer>
    </QuizBackground>
  );
}
