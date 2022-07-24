import styled from "styled-components";

export const Wrapper = styled.form`
    border: 2px solid #424242;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #eee;
    margin: auto;
    padding: 20px;
    width: 100%;
    max-width: 450px;
    border-radius: 50px;

    p {
        color: #424242;
        margin-bottom: 2px;
    }

    input {
        margin-bottom: 10px;
        padding-left: 15px;
        width: 250px;
        height: 35px;
        border-radius: 8px;
    }
`;

