import styled from 'styled-components';

const BaseButton = styled.button`
    background-color: royalblue;
    padding: 10px;
    color: white;
`;

const ButtonStyle2 = styled(BaseButton)`
    color: black;
    border-radius: 10px;
    border:none;
    font-weight: bold;
`;

const ButtonStyle3 = styled(BaseButton)`
    color: yellow;
    width: 100%;
    background-color: lightblue;
`;

const ButtonStyle4 = styled(BaseButton)`
    color: gray;
    border-radius: 20px;
    border:none;
    font-weight: bold;
`;


export { BaseButton, ButtonStyle2, ButtonStyle3, ButtonStyle4 }