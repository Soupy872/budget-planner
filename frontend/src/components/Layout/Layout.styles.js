import styled from 'styled-components';

export const Wrapper = styled.div`
    height: 94vh;    

    .custom-container {
        display: grid;
        height: calc(100% - 60px);
        margin: 10px;
        padding: 5px;
        border: 1px solid black;
        box-shadow: rgb(0 0 0 / 16%) 1px 1px 10px;
        border-radius: 20px;

        grid-template-columns: repeat(10, 10% [col-start]);
        grid-template-rows: repeat(8, 12.5% [row-start]);

        @media screen and (max-width: 1268px) {
            margin: 0;
            border: none;
            box-shadow: none;
        }

        @media screen and (max-width: 768px) {
            display: block;
        }
    }

    @media screen and (max-width: 768px) {
        height: auto;
    }
`;

export const StatsContainer = styled.div`
padding: 5px;
// border: 1px solid red;
grid-column: 1 / span 6;
grid-row: 1 / span 3;
`;

export const TableContainer = styled.div`
padding: 5px;
// border: 1px solid blue;
height: 100%;
grid-column: 1 / span 6;
grid-row: 4 / span 5;
`;

export const ChartsContainer = styled.div`
padding: 5px;
// border: 1px solid yellow;
grid-column: 7 / span 10;
grid-row: 1 / span 8;
`;