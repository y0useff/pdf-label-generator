import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



import Buttonbar from './Buttonbar.jsx'
import Dropdown from './Dropdown.jsx'
import Numberoflabels from './Numberoflabels.jsx';
 
export default function Header() {


    return(
    <Container>
        <Row> 
            <Col><Buttonbar /> </Col>
        </Row>
        <Row>
                <Col>  <Dropdown /> </Col>
                <Col xs lg="2"> <Numberoflabels /> </Col>
        </Row>

    </Container>
    )

}