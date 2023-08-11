import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row, Button, Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import User from '../components/User'

function App() {
  return (
    <>
      <Container>
        <Form>
          <Row className='justify-content-end'>
            <Col md={6}>
              <Form.Select aria-label="Default select example" className='m-3 mw-25 bg-primary text-white'>
                <option>Select region, default US</option>
                <option value="en_US">United States</option>
                <option value="ru">Россия</option>
                <option value="uk">Україна</option>
              </Form.Select>
              <Form.Group>
                <Form.Label className='mx-3'>Mistake</Form.Label>
                <Form.Range className='mx-3' min={0} max={10} step={0.25} defaultValue={0}/>
                <Form.Control className='m-3' placeholder="0" type='number' min={0} max={1000} step={0.25}/>
              </Form.Group>
              <Row className='mx-3'>
                <Col className='p-0'>
                  <Form.Group controlId="formGridEmail">
                    <Form.Control type="number" placeholder="Enter seed" min={0}/>
                  </Form.Group>
                </Col>
                <Col>
                  <Button variant="primary" type="submit">
                    Random
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
        <Table bordered hover className='my-5'>
          <thead className='table-primary'>
            <tr>
              <th>№</th>
              <th>Id</th>
              <th>Name</th>
              <th>Adress</th>
              <th>Number</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>3343dedw33</td>
              <td>Mark Polo</td>
              <td>Otto</td>
              <td>44 57 88 90</td>
            </tr>
            <User/>
          </tbody>
        </Table>
      </Container>
    </>
  )
}

export default App
