import React from 'react'
import {Navbar, Nav, Form} from 'react-bootstrap';



const Header = () => {
  return (
    <div>
           <header>
      <Navbar  expand="lg" className='px-5 bg-blue'>
            <Navbar.Brand href="#home" className='superadmin'>Kwiwkbot</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                
                
                </Nav>
                <Form inline>
                 <Nav className='align-items-center'>
                        <Nav.Link href="#home" className='superadmin'>Rishabh Jain <br/> Admin</Nav.Link>
                        <Nav.Link href="#link" className='superadmin'> <img src="/images/superadminimages/avter.jpg"  className='avter-img' /> </Nav.Link>
                 </Nav>
                </Form>
            </Navbar.Collapse>
            </Navbar>
      </header>
    </div>
  )
}

export default Header
