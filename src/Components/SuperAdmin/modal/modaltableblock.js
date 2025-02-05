import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import ModalDollar from './modaldollar';


function ModalBlock(props) {
    const [modalShowdoallar, setModalShowdoallar] = React.useState(false);

    const openDollarModal = () => {
      setModalShowdoallar(true);
    };
  
    const closeDollarModal = () => {
      setModalShowdoallar(false);
    };
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
                <label className='toplabel'>First Name </label>
                </div>
            </Col>

            <Col xs={6}>
            <div className='input-topposition'>
                <input type="text" placeholder='' className='input-model'/>
                <label className='toplabel'>Last Name </label>
                </div>
            </Col>
        </Row>

        <Row className='mb-4'>
            <Col xs={6}>
            <div className='input-topposition'>
                <input type="text" placeholder='' className='input-model'/>
                <label className='toplabel'>Email ID 
 </label>
                </div>
            </Col>

            <Col xs={6}>
            <div className='input-topposition'>
                <input type="text" placeholder='' className='input-model'/>
                <label className='toplabel'>Phone No </label>
                </div>
            </Col>
        </Row>

        <Row className='mb-4'>
            <Col xs={6}>
            <div className='input-topposition'>
                <input type="text" placeholder='' className='input-model'/>
                <label className='toplabel'>Organization name </label>
                </div>
            </Col>

            <Col xs={6}>
            <div className='input-topposition'>
                <input type="text" placeholder='' className='input-model'/>
                <label className='toplabel'>Industry </label>
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
                <input type="text" placeholder='' className='input-model'/>
                <label className='toplabel'>Rewrite Password </label>
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
            <div className='text-right'>
            <Button className='btn-model mr-3'variant="secondary" onClick={props.onHide}>Block User</Button>
              <Button className='btn-model'  onClick={() => setModalShowdoallar(true)}>Save & Next</Button>
     
                                  <ModalDollar
                                show={modalShowdoallar}
                                onHide={closeDollarModal}
                                />
            </div>
            </Col>
        </Row>
      </Modal.Body>
      
    </Modal>
  );
}
export default ModalBlock;