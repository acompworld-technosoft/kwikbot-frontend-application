import React, { useEffect ,useState} from 'react';
import { Navbar, Nav, Form } from 'react-bootstrap';
import { getUserById } from '../../Services/SuperAdmin/apiCall';  

const TopNavbar = () => {
  
  const userId = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    userType: ''
  });

  const userData = async() => {
    const response = await getUserById({ userid: userId._id });
    console.log(response);
    const userData = response.data;
      setUser({
        firstName: userData.firstName,
        lastName: userData.lastName,
        userType: userData.userType
      });
  }
   
  useEffect(() => {
    userData();
  }, [])
  
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
                        <Nav.Link href="#home">{user.firstName}{""} {user.lastName} <br/> {user.userType}</Nav.Link>
                        <Nav.Link href="#link"> <img src="/images/superadminimages/avter.jpg"  className='avter-img' /> </Nav.Link>
                 </Nav>
                </Form>
            </Navbar.Collapse>
            </Navbar>
      </header>
    </div>
  )
}

export default TopNavbar;
