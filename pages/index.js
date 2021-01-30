import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Head from "next/head";

import db from "../db.json";
import Widget from "../src/components/Widget";
import QuizBackground from "../src/components/QuizBackground";
import Footer from "../src/components/Footer";
import GitHubCorner from "../src/components/GitHubCorner";
import QuizLogo from "../src/components/QuizLogo";
import Link from '../src/components/Link';


const Input = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 3.5px;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  padding: 7px 15px;
  font: inherit;
  color: ${({ theme }) => theme.colors.contrastText};
  &::placeholder {
    /* Chrome/Opera/Safari */
    color: ${({ theme }) => theme.colors.contrastText};
  }
`;

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

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState("");

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>HPQUIZ - Base</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>

          <Widget.Content>
            <form
              onSubmit={function (evento) {
                evento.preventDefault();
                router.push(`/quiz?name=${name}`);
              }}
            >
              <Input
                onChange={function (event) {
                  setName(event.target.value);
                }}
                placeholder="Seu nome"
              />

              <Button>JOGAR</Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>QUIZES</h1>

            <ul>
              {db.external.map((linkExterno) => {
                const [project, user] = linkExterno
                  .replace(/\//g, "")
                  .replace("https:", "")
                  .replace(".vercel.app", "")
                  .split(".");

                return (
                  <li key={linkExterno}>
                    <Widget.Topic
                    as={Link}
                     href={`/quiz/${project}___${user}`}>
                      {`${user} / ${project}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/gabrielqoliveiraa" />
    </QuizBackground>
  );
}
