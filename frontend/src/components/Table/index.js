import React from "react";
import { Wrapper } from './Table.styles';
import TableBody from "../TableBody";
import TableHead from "../TableHead";

const Table = ({ tableData, columns, setTableData }) => {
    const handleSorting = (sortField, sortOrder) => {
        if (sortField) {
            const sorted = [...tableData].sort((a, b) => {
                if (a[sortField] === null) return 1;
                if (a[sortField] === null) return -1;
                if (a[sortField] === null && b[sortField] === null) return 0;
                return (
                    a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
                        numeric: true,
                    }) * (sortOrder === "asc" ? 1 : -1)
                )
            })
            setTableData(sorted);
        }
    }

    return (
        <Wrapper>
            <table>
                <TableHead columns={columns} handleSorting={handleSorting} />
                <TableBody tableData={tableData} columns={columns} />
            </table>
            </Wrapper>
    )
}

export default Table;