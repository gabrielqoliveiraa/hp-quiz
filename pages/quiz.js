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





export default function quiz(){

    return(
        <QuizBackground backgroundImage={db.bg}>
            <QuizContainer>
                <Widget>
                    <Widget.Header>
                        <h1>Quiz</h1>
                    </Widget.Header>

                    <Widget.Content>
                        <p>THIS IS LOREM IMPSUM</p>
                    </Widget.Content>



                    




                </Widget>








            </QuizContainer>
        </QuizBackground>


    )
}