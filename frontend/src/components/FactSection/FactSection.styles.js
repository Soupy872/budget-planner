import styled from "styled-components";

export const Wrapper = styled.div`
    border: 2px solid red;
    display: grid;
    width: 100%;
    max-width: 720px;
    height: 300px;
    padding: 10px;
    margin: 20px;
    background: #424242;
    color: white;

    grid-template-columns: repeat(8, 12.5% [col-start]);
    grid-template-rows: repeat(10, 10% [row-start]);

    p {
        display: absolute;
        padding: 0;
        margin: 0;
        left: 10px;
        top: 10px;
    }
`;

export const Label1 = styled.div`
    border: 2px solid red;
    display: flex;
    flex-direction: column;
    padding: 4px;
    font-size: 30px;

    grid-column: 1 / span 6;
    grid-row: 1 / span 4;
`;

export const Label2 = styled.div`
    border: 2px solid green;
    padding: 4px;
    font-size: 18px;
    display: flex;
    flex-direction: column;

    grid-column: 1 / span 4;
    grid-row: 5 / span 3;
`;

export const Label3 = styled.div`
    border: 2px solid blue;
    padding: 4px;
    display: flex;
    flex-direction: column;

    grid-column: 1 / span 3;
    grid-row: 8 / span 3;
`;

export const Label4 = styled.div`
    border: 2px solid pink;
    padding: 10px;
    font-size: 25px;
    display: flex;
    flex-direction: column;

    grid-column: 6 / span 4;
    grid-row: 6 / span 5;
`;

export const Text = styled.div`
    margin: auto;
    text-align: center;
    font-size: 2em;
    font-weight: 600;
    
`;