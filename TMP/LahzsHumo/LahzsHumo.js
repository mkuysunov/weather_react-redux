import React from 'react'
import './LahzaHumo.css'
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap'
import logo from '../../assets/logo.svg'

function LahzsHumo() {
  return (
    <section>
      <Container className="header-container ">
        <Navbar collapseOnSelect expand="lg" className="px-0" style={{ paddingTop: 20, paddingBottom: 20 }}>
          <Navbar.Brand href="#home">
            <img src={logo} className="d-inline-block align-top" alt="React Bootstrap logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Заказать</Nav.Link>
              <Nav.Link href="#features">Прeимущество</Nav.Link>
              <Nav.Link href="#pricing">Как пользоваться</Nav.Link>
              <Nav.Link href="#pricing">Вопросы и ответы</Nav.Link>
            </Nav>
            <Form inline>(+992) 88-777-55-44</Form>
          </Navbar.Collapse>
        </Navbar>

        <div className="order-card">
          <h1>
            Лахза - больше <br /> чем банковская карта!
          </h1>
          <p>
            Кредиты до 3000 сомони сроком на 30 дней – это раз
            <br />
            Накопления сбережений со ставкой 6% годовых – это два
            <br />
            Денежные переводы из России – это три
          </p>
          <div>
            <Button variant="info" className="px-4 py-2">
              Заказать карту
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default LahzsHumo
