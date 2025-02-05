import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';

function ModalDollar(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className='px-5 mx-5'>
        <Modal.Title id="contained-modal-title-vcenter px-5">
             <div className='d-flex'>

             <div className='modeladd'>
                <span>1</span>
                Add User
            </div>
           

             </div>

            
        </Modal.Title>
        <Modal.Title id="contained-modal-title-vcenter px-5 ">
        <div className='modeladd modeline'>
                <span>2</span>
                Create Plan
                </div>
                </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className='mt-4 mb-4'>
            <Col xs={6}>
            <div className='input-topposition'>
                <input type="text" placeholder='' className='input-model'/>
                <label className='toplabel'>Set Up Free </label>
       
                     <div>
        
                       <input type="checkbox" id="huey" name="drone" value="huey"/> wave off set up fees for this user
                     </div>
  
                </div>
            </Col>


           
        </Row>

 

    

     

        <Row className='mb-4'>
            <Col xs={6}>
            <div className='input-topposition'>
                <input type="text" placeholder='' className='input-model'/>
                <label className='toplabel'>Choose Password </label>
                </div>
            </Col>

            
            <Col xs={6}>
            <div className='input-topposition'>
            <Form.Select aria-label="Default select example" className='input-model'>
      <option>Open this select menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
                

       
                     
  
                </div>
            </Col>
           
        </Row>


        <Row className='mb-4'>
        <Col xs={6}></Col>
            <Col xs={6}>
            <div className='text-right'>
            <Button className='mr-3' variant="secondary">back</Button>
              <Button className='btn-model'>Save & Next</Button>
            </div>
            </Col>
          </Row>
      </Modal.Body>
      
    </Modal>
  );
}
export default ModalDollar;