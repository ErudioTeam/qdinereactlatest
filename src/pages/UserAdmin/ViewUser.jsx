import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Axios from "axios";


function View(props) {
  const [show, setShow] = useState(false);
  const user = props.user;
  const [showModal, setShowModal] = React.useState(false);
  const [id, setId] = useState(user.id);
  const [roleId, setRoleId] = useState(user.roleId);
  const [firstName, setFirstName] = useState(user.firstName);
  const [middleName, setMiddleName] = useState(user.middleName);
  const [lastName, setLastName] = useState(user.lastName);
  const [mobile, setMobile] = useState(user.mobile);
  const [email, setEmail] = useState(user.email);
  const [Password, setPassword] = useState(user.Password);
  const [registeredAt, setRegisteredAt] = useState(user.registeredAt);
  const [lastLogin, setLastLogin] = useState(user.lastLogin);
  const [intro, setIntro] = useState(user.intro);
  const [profile, setProfile] = useState(user.profile);

  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        View
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Middle Name</Form.Label>
              <Form.Control
                type="middle name"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                readOnly
              />
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Intro</Form.Label>
              <Form.Control
                type="intro"
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Profile</Form.Label>
              <Form.Control
                type="profile"
                value={profile}
                onChange={(e) => setProfile(e.target.value)}
                readOnly
              />
            </Form.Group>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default View;