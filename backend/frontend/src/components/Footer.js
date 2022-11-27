import React, {useState, useEffect} from 'react'
import { Container, Row,  Col } from 'react-bootstrap';

function Footer() {

const [year, setYear] = useState(2022);
useEffect(() => {
    setYear(new Date().getFullYear());
}, []);
  return (
    
      <footer>
        <Container>
            <Row>
                <Col className="text-center py-3">Copyright &copy; Eray Okutay {year}</Col>
            </Row>
        </Container>
        
      </footer>
    
  )
}

export default Footer
