import React from 'react' 
import styled from 'styled-components'
import { useRouter } from 'next/router'
import Head from 'next/head'


import db from '../db.json';
import Widget from '../src/components/Widget'
import QuizBackground from '../src/components/QuizBackground'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import QuizLogo from '../src/components/QuizLogo'

const Button = styled.button`
    width: 100%;
    height: 36px;
    border-radius: 4px;
    margin-top: 25px;
    margin-bottom: 32px;
    background: ${({ theme }) => theme.colors.primary };
    border: 1px solid ${({ theme }) => theme.colors.secondary};
    padding-left: 15px;
    font: inherit;
    color: ${({ theme }) => theme.colors.contrastText};
  
`


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

function LoadingWidget ()  {
    return (
        <Widget>
            <Widget.Header>
                Carregando
            </Widget.Header>

            <Widget.Content>
                description
            </Widget.Content>

        </Widget>


    )
}

function QuestionWidget ({question, questionIndex, totalQuestions, onSubmit}) {
    const questionId = `question__${questionIndex}`
    return (
        <Widget>
                    <Widget.Header>
                        {/* <BackLinkArrow href="/" /> */}
                        <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
                    </Widget.Header>

                    <img 
                        alt="Descrição"
                        style={{
                        width: '100%',
                        height: '150px',
                        objectFit: 'cover',
                        }}
                        src={question.image}
                    />
                    
                    <Widget.Content>
                        <h2>{question.title}</h2>

                        <p>{question.description}</p>
                        


                        <form onSubmit={(infosEvent) =>{
                            infosEvent.preventDefault();
                            onSubmit()

                        }}>

                            {question.alternatives.map((alternatives, alternativesIndex) => {
                                const alternativesId = `alternative__${alternativesIndex}`;
                                return (
                                    <Widget.Topic
                                        as="label"
                                        htmlFor={alternativesId}
                                    >
                                        {alternatives}
                                        <input
                                            style={{display: 'none'}}
                                            id={alternativesId}
                                            name={questionId}
                                            type='radio'
                                        />
                                    </Widget.Topic>
                                )
                            })}

                            <Button type="submit" >CONFIRMAR</Button>
                        </form>

                    </Widget.Content>
                </Widget>
                    
                    
                    


    )
}

const screenStates ={
    QUIZ: 'QUIZ',
    LOADING: 'LOADING',
    RESULT: 'RESULT',
}


export default function quiz(){
    const [screenState, setScreenState] = React.useState(screenStates.LOADING);
    const totalQuestions = db.questions.length
    const [currentQuestion, setCurrentQuestionIndex] = React.useState(0)
    const questionIndex = currentQuestion
    const question = db.questions[questionIndex]

    React.useEffect(() =>{
        setTimeout(() => {
            setScreenState(screenStates.QUIZ)
    
        }, 1* 1000)
    }, []);

    function handSubmit() {
        const nextQuestion = questionIndex + 1;
        if( nextQuestion < totalQuestions) {
            setCurrentQuestionIndex(questionIndex + 1)

        } else {
            setScreenState(screenStates.RESULT)
        }
    }

    return(

        <QuizBackground backgroundImage={db.bg}>
            <QuizContainer>
                
               { screenState === screenStates.QUIZ && (<QuestionWidget 
                    question={question}
                    questionIndex = {questionIndex}
                    totalQuestions={totalQuestions}  
                    onSubmit={handSubmit}  
                />)}

                {screenState === screenStates.LOADING && <LoadingWidget/>}

                {screenState === screenStates.RESULT && <LoadingWidget/>}



            </QuizContainer>
        </QuizBackground>


    )
}











                    



