import React, { useState } from 'react';
import {Navbar, Nav, Form} from 'react-bootstrap';
import {Row, Col } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import SideBarAdmin from './side-bar';
const CustomerConversation = ({onSearch }) => {

  const [searchTerm, setSearchTerm] = useState('');
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(true);
  };
  return (

    
    <div>
            <header>
           <Navbar  expand="lg" className='px-5 bg-blue'>
            <Navbar.Brand href="#home">Kwiwkbot</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                
                
                </Nav>
                <Form inline>
                 <Nav className='align-items-center'>
                        <Nav.Link href="#home">Rishabh Jain <br/> Admin</Nav.Link>
                        <Nav.Link href="#link"> <img src="/images/superadminimages/avter.jpg"  className='avter-img' /> </Nav.Link>
                 </Nav>
                </Form>
            </Navbar.Collapse>
            </Navbar>
      </header>


  <section className=''>



      <div fluid className='admin-panel'>
      
         <SideBarAdmin/>
                <div className={`right-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                  
                  <div>
                   <h2><i class="fa-solid fa-angle-left"></i> Stone Bridge - Customer Conversation</h2>  
                  </div>

                    <Row>
                       <Col xs={6} className='pt-5'>
                       <div className="search-bar-container">
                          <input
                            type="text"
                            className="search-input"
                            placeholder="search Conversation by name and conversation ID"
                            value={searchTerm}
                            onChange={handleInputChange}
                          />
                          <button className="search-button" onClick={handleSearch}>
                            Search
                          </button>
                       </div>  
                      </Col>
                      <Col xs={6} className='pt-5'>
                        <div className='d-flex justify-content-end align-items-baseline'>
                             <p className='mr-3'>Period From</p>
                             <input type="date" className='date-input mr-3' />
                             <p className='mr-3'>To</p>
                              <input type="date" className='date-input mr-3' />
                              <button className="search-button" onClick={handleShow}>
                                Search
                            </button>
                        </div>

                        <Modal show={show} onHide={handleClose} animation={true}       size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Stonebridge Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <table class="table table-striped table-bordered">
  <thead>
    <tr>
      <th scope="col">Date</th>
      <th scope="col">Transaction ID</th>
      <th scope="col">Amount</th>
      <th scope="col">Free Type</th>
      
      <th scope="col">Status</th>
      <th scope="col">Method</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">01-08-2023</th>
      <td>RX0987654321</td>
      <td>$100.00</td>
      <td>Set up fee</td>
      <td>Paid</td>
      <td>Credit card</td>
    </tr>
    <tr>
      <th scope="row">01-08-2023</th>
      <td>RX0987654321</td>
      <td>$85.00</td>
      <td>Monthly Subscription Fee</td>
      <td>Paid</td>
      <td>PayPal</td>
    </tr>
    <tr>
      <th scope="row">01-08-2023</th>
      <td>RX0987654321</td>
      <td>$100.00</td>
      <td>Monthly Subscription Fee</td>
      <td>Paid</td>
      <td>Credit card</td>
    </tr>
    <tr>
      <th scope="row">01-08-2023</th>
      <td>RX0987654321</td>
      <td>$85.00</td>
      <td>Monthly Subscription Fee</td>
      <td>Paid</td>
      <td>PayPal</td>
    </tr>
    <tr>
      <th scope="row"></th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

        </Modal.Body>
     
      </Modal>

                      </Col>
                    </Row>
                    <Row>

                      <Col xs={12} className='pt-5'>
                        <div className='border-container'>
                                 <table class="table table-bordered">
                                  <thead>
                                    <tr>
                                      <th scope="col">Alex</th>
                                      <td>Conversation ID 0551 <span className=''>01-08-2023 11:00 AM</span></td>
                                   
                                    
                                    </tr>
                                  </thead>
                                  <tbody>
                                  <tr>
                                      <th scope="row">vistior</th>
                                      <td ><span className='circle-dummy'><i class="fa-solid fa-a"></i></span>Hello</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">vistior</th>
                                      <td><span className='circle-dummy'><i class="fa-solid fa-robot"></i></span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy textever since the 1500s</td>
                                    </tr>
                                    <tr>

                                  <th scope="row">vistior</th>
                                          <td><span className='circle-dummy'><i class="fa-solid fa-a"></i></span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy textever since the 1500s</td>
                                  </tr>
                                  <tr>
                                  <th scope="row">vistior</th>
                                          <td><span className='circle-dummy'><i class="fa-solid fa-robot"></i></span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy textever since the 1500s</td>
                                  </tr>

                                  <tr>
                                  <th scope="row">vistior</th>
                                          <td><span className='circle-dummy'><i class="fa-solid fa-a"></i></span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy textever since the 1500s</td>
                                  </tr>


                                  <tr>
                                  <th scope="row">vistior</th>
                                          <td><span className='circle-dummy'><i class="fa-solid fa-robot"></i></span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy textever since the 1500s</td>
                                  </tr>





                                      </tbody>
                                      </table>
                                      <div>
                         
                          </div>

                          </div>
                       </Col>
                    </Row>
                </div>
                
        
         </div>
   </section>


    </div>
  )
}

export default CustomerConversation
