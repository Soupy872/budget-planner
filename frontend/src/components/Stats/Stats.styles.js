import styled from "styled-components";

export const Wrapper = styled.div`
    display: grid;
    width: 100%;
    height: 300px;
    padding: 10px;
    color: black;
    
    grid-template-columns: repeat(8, 12.5% [col-start]);
    grid-template-rows: repeat(10, 10% [row-start]);

    div {
        margin: 4px;
    }

    @media screen and (max-width: 1280px) {
        line-height: .8rem;
        font-size: .9rem;
    }

    @media screen and (max-width: 768px) {
        display: block;
    }
`;

export const Label1 = styled.div`
    display: flex;
    flex-direction: column;
    padding: 4px;
    font-size: var(--fontBig);
    line-height: 1.4rem;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.19);

    grid-column: 1 / span 6;
    grid-row: 1 / span 4;

    @media screen and (max-width: 1280px) {
        line-height: .8em;
        padding-top: 10px;
        padding-left: 8px;
        font-size: 1.8em;
    }

    @media screen and (max-width: 768px) {
        display: block;
        line-height: .6em;
        padding: 8px 0 6px 8px;
    }
`;

export const Label2 = styled.div`
    padding: 4px;
    font-size: var(--fontMed);
    display: flex;
    flex-direction: column;
    line-height: 1.2rem;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.19);

    grid-column: 1 / span 4;
    grid-row: 5 / span 3;

    @media screen and (max-width: 1280px) {
        line-height: .8em;
        padding-bottom: 0;
        font-size: 1.2em;
    }

    @media screen and (max-width: 768px) {
        display: block;
        line-height: .6em;
        padding: 8px 0 6px 8px;
    }
`;

export const Label3 = styled.div`
    padding: 4px;
    display: flex;
    flex-direction: column;
    font-size: var(--fontMed);
    line-height: 1.2rem;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.19);

    grid-column: 1 / span 3;
    grid-row: 8 / span 3;

    @media screen and (max-width: 1280px) {
        line-height: .8em;
        padding-bottom: 0;
        font-size: 1.2em;
    }

    @media screen and (max-width: 768px) {
        display: block;
        line-height: .6em;
        padding: 8px 0 6px 8px;
    }
`;

export const Label4 = styled.div`
    padding: 10px;
    font-size: var(--fontSuperBig);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    line-height: 3rem;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.19);

    grid-column: 5 / span 4;
    grid-row: 5 / span 6;
    
    @media screen and (max-width: 1280px) {
        line-height: 1em;
        font-size: 2em;
    }

    @media screen and (max-width: 768px) {
        display: block;
        line-height: 0.8rem;
        font-size: var(--fontMed);
    }
`;

export const Text = styled.div`
    margin: auto;
    text-align: center;
    font-size: 2em;
    font-weight: 600;

    @media screen and (max-width: 1280px) {
        display: block;
        line-height: 0.4em;
        font-size: 1.8em;
    }
    
    @media screen and (max-width: 768px) {
        display: block;
        line-height: 0.8rem;
        font-size: 1.8rem;
    }
`;