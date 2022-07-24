import React, { useState } from "react";
import propTypes from 'prop-types';
import { Wrapper } from './TableHead.styles';

const TableHead = ({ columns, handleSorting }) => {
    const [sortField, setSortField] = useState("");
    const [order, setOrder] = useState("asc");

    const handleSortingChange = (accessor) => {
        const sortOrder = 
            accessor === sortField && order === "asc" ? "desc" : "asc";
        setSortField(accessor);
        setOrder(sortOrder);
        handleSorting(accessor, sortOrder);
    }

    return (
        <Wrapper>
            <tr>
                {columns.map(({ label, accessor, sortable }) => {
                    return (
                    <th 
                        key={accessor}
                        onClick={sortable ? () => handleSortingChange(accessor) : null}
                    >
                        {label}
                    </th>)
                })}
            </tr>
        </Wrapper>
    )
}

export default TableHead;