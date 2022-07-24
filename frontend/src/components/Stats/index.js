import React from "react";

import { Label1, Label2, Label3, Label4, Text, Wrapper } from "./Stats.styles";

const Stats = ({ income, largestExpCat, largestReocExp, percent}) => {
    percent = 4.03;
    return (
        <Wrapper>
            <Label1>
                <p>Average Monthly Income</p>
                <Text>$2000/month</Text>
            </Label1>
            <Label2>
                <p>Largest Expense Category</p>
                <Text>Student Loans</Text>
            </Label2>
            <Label3>
                <p>Largest Reoccuring Expense</p>
                <Text>Rent</Text>
            </Label3>
            <Label4>
                <p>Percent Leftover</p>
                <Text>+ 4.03%</Text>
            </Label4>
        </Wrapper>
    )
}

export default Stats;