import React from "react";
import PropTypes from 'prop-types';
import { Wrapper } from './TableBody.styles';

const TableBody = ({ tableData, columns }) => {
    return (
        <Wrapper>
            { tableData?.map((data) => {
                return (<tr key={data._id}>
                    {columns.map(({ accessor }) => {
                        const tData = data[accessor] ? data[accessor] : "-";
                        return <td key={`${data.id}-${accessor}`}>{tData}</td>;
                    })}
                </tr>)
            }) }
        </Wrapper>
    )
}

export default TableBody;