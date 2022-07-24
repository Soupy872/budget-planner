import styled from "styled-components";

export const Wrapper = styled.tbody`
    width: 100%;

    td {
        width: 200px;
        text-align: center;
    }

    tr:nth-child(even) {
        background: #BDBDBD;
    }

    tr:nth-child(odd) {
        background: #9E9E9E;
    }
`