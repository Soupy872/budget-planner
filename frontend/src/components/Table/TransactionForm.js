import React, { useState } from "react";
import { Form, Col, Row, Container, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const TransactionForm = ({ addTransaction }) => {
    const [error, setError] = useState();
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({ transactionType: 'income', reoccuring: false });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        setValidated(true);

        try {
          await addTransaction(formData);
          setFormData({ transactionType: 'income', reoccuring: false });
        } catch(err) {
          console.log(err);
          setError('Invalid.');
      }
    }

    return (
        <Container className="mb-3">
            <Form className='form-style' noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} xs={12} md={6} lg={3}  controlId="date">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type='date' name='date' className="form-control form-control-sm" onChange={
                            e => setFormData(data => {
                                return {
                                    ...data,
                                    date: e.target.value
                                }
                            })} />
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={3} controlId="type" >
                        <Form.Label>Type</Form.Label>
                        <Form.Select aria-label="Default select example" className="form-control form-select-sm" onChange={
                            e => setFormData(data => {
                                return {
                                    ...data,
                                    transactionType: e.target.value
                                }
                            })
                        }>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={3} controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter transaction name" className="form-control form-control-sm" onChange={
                            e => setFormData(data => {
                                return {
                                    ...data,
                                    name: e.target.value
                                }
                            })} />
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={3} controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" placeholder="Enter category name" className="form-control form-control-sm" onChange={
                            e => setFormData(data => {
                                return {
                                    ...data,
                                    category: e.target.value
                                }
                            })} />
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={3} controlId="amount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="number" placeholder="Enter transaction amount" className="form-control form-control-sm" onChange={
                            e => setFormData(data => {
                                return {
                                    ...data,
                                    amount: e.target.value
                                }
                            })} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="reoccuring">
                        <Form.Check type="checkbox" label="Reocurring" checked={formData.reoccuring ? formData.reoccuring : false} 
                        onChange={e => setFormData(data => {
                            return {
                                ...data,
                                reoccuring: !data.reoccuring
                            }
                        })} />
                    </Form.Group>
                </Row>
                <Button variant="primary" className="w-100" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default TransactionForm;