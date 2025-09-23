import React from "react";
import styled, { css } from 'styled-components';
import { BaseButton, ButtonStyle2, ButtonStyle3, ButtonStyle4 } from "./Buttons";


const One = css`
  color: red;
`;

const Two = css`
  border: 1px solid black;
`;

const Three = styled.div`
  ${One}
  ${Two}
`

const App = () => {
  return (
    <>
      <Three>Lorem ipsum dolor</Three>
      <BaseButton>버튼1</BaseButton>
      <ButtonStyle2>버튼2</ButtonStyle2>
      <ButtonStyle3>버튼3</ButtonStyle3>
      <ButtonStyle4>버튼4</ButtonStyle4>
    </>
  );
};

export default App;