import React from "react";

const TableBody = ({ tableData, columns }) => {
    return (
        <tbody>
            { tableData?.map((data) => {
                return (<tr key={data._id}>
                    {columns?.map(({ accessor }) => {
                        const tData = data[accessor] ? data[accessor] : "-";
                        return <td key={`${data.id}-${accessor}`}>{tData}</td>;
                    })}
                </tr>)
            }) }
        </tbody>
    )
}

export default TableBody;