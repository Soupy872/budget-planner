import React from "react";
import Table from 'react-bootstrap/Table';
import Container from "react-bootstrap/Container";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import TransactionForm from "./TransactionForm";
import Accordion from 'react-bootstrap/Accordion';

const TableSection = ({ transactions, add }) => {
    const columns = [
        { label: "Date", accessor: "date", sortable: true },
        { label: "Name", accessor: "name", sortable: false },
        { label: "Category", accessor: "category", sortable: false }
      ]

    return (
        <Container className="h-100 mt-n4 d-flex flex-column">
            <Table>
                <TableHead columns={columns} />
                <TableBody className="overflow-auto" columns={columns} tableData={transactions} />
            </Table>

            <div className="row justify-content-center bg-blue flex-grow-1"></div>

            <div className="d-none d-md-block d-lg-block d-xl-block">
            <TransactionForm className="position-absolute bottom-0" addTransaction={add} />
            </div>
            
            <Accordion className='d-none d-sm-block d-md-none' >
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Add Transaction</Accordion.Header>
                    <Accordion.Body>
                        <TransactionForm className="position-absolute bottom-0" addTransaction={add} />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

        </Container>
    );
}

export default TableSection;