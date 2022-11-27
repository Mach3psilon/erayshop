import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function FormContainer(variant) {
  return (
    <Container>
        <Row className='justify-content-md-center'>
            <Col xs={12} md={6}>
                {variant.children}
            </Col>

        </Row>
    </Container>
  )
}

export default FormContainer
