import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row, Button, Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import User from './components/User'
import { useEffect, useState } from 'react';
import { faker, fakerRU, fakerUK, fakerPL } from '@faker-js/faker';
import { makeMistakes } from './helpers/helper';
import { CSVLink } from "react-csv";
import './App.css'

function App() {
  const [region, setRegion] = useState('pl');
  const [slider, setSlider] = useState('0');
  const [field, setField] = useState('');
  const [seed, setSeed] = useState(faker.seed());
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const maxValue = 10;

  useEffect(() => {
    switch(region){
      case 'pl':
        fakerPL.seed(seed);
        setUsers(createUsers(fakerPL, 20));
        break;
      case 'ru':
        fakerRU.seed(seed);
        setUsers(createUsers(fakerRU, 20));
        break;
      case 'uk':
        fakerUK.seed(seed);
        setUsers(createUsers(fakerUK, 20));
    }
  },[seed, region, field])

  const createUser = (fakerRegion:any) => {
    if (Number(field) === 0) {
      return {
        id: fakerRegion.database.mongodbObjectId(),
        name: fakerRegion.person.fullName(),
        address: fakerRegion.location.streetAddress(),
        phone: fakerRegion.phone.number(),
      }
    } else {
      return {
        id: fakerRegion.database.mongodbObjectId(),
        name: makeMistakes(fakerRegion.person.fullName(), region, false, Number(field)),
        address: makeMistakes(fakerRegion.location.streetAddress(), region, false, Number(field)),
        phone: makeMistakes(fakerRegion.phone.number(), region, true, Number(field)),
      }
    }

  }

  const createUsers = (region: any, count: number) => {
    return faker.helpers.multiple(() => createUser(region), {count: count})
  }

  function scroll(){
      switch(region){
        case 'pl':
          loadContent(fakerPL);
          break;
        case 'ru':
          loadContent(fakerRU);
          break;
        case 'uk':
          loadContent(fakerUK);
      }
    
  }
  function loadContent(region: any){
    setUsers(users.concat(createUsers(region, 10)))
  }

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
      return;
      setLoading(true);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if(loading){
      scroll();
      setLoading(false)
    }
  },[loading])

  return (
    <>
      <Container>
        <Form>
          <Row className='justify-content-start align-items-center'>
            <Col md={3}>
              <Form.Select aria-label="Default select example" className='my-3 mw-25 bg-primary text-white' value={region} onChange={(e) => setRegion(e.target.value)}>
                <option value="pl">Poland</option>
                <option value="ru">Россия</option>
                <option value="uk">Україна</option>
              </Form.Select>
            </Col>
            <Col md={5}>
              <CSVLink data={users}><Button variant="primary">Export to CSV</Button></CSVLink>
            </Col>
          </Row>
          <Row className='justify-content-start align-items-center'>
            <Col md={3}>
              <Form.Group controlId="formGridEmail">
                <Form.Control className='my-3' type="number" placeholder="Enter seed" min={0} value={seed} onChange={(e) => setSeed(Number(e.target.value))}/>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Button variant="primary" onClick={()=>setSeed(faker.seed())}>
                Random
              </Button>
            </Col>
          </Row>
          <Row className='justify-content-start align-items-center'>
            <Col md={3}>
                <Form.Range className='my-3' min={0} max={maxValue} step={0.25} value={slider} onChange={(e) => {setSlider(e.target.value); setField(e.target.value)}}/>
            </Col>
            <Col md={1}>
              <Form.Control className='my-3' placeholder="0" type='number' min={0} max={1000} step={0.25} value={field} onChange={(e) => {(Number(e.target.value)>1000) ? setField('1000') : setField(e.target.value); setSlider(`${Math.min(Number(e.target.value), maxValue)}`)}}/>
            </Col>
          </Row>
        </Form>
        <Table bordered hover>
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
            {users.map((e, i) => <User key={e.id} number={i+1} id={e.id} name={e.name} address={e.address} phone={e.phone}/>)}
          </tbody>
        </Table>
      </Container>
    </>
  )
}

export default App
