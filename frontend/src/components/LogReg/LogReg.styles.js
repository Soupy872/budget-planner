import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 80vh;

    h1 {
        text-align: center;
        font-weight: 700;
        padding-bottom: 20px;
        margin-bottom: 20px;
    }

    .form-style {
        width: 500px;
        padding: 20px;
        padding-bottom: 30px;
        border: 1px solid black;
        box-shadow: rgb(0 0 0 / 16%) 1px 1px 10px;
        border-radius: 20px;
    }
`;