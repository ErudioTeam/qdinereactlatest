import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Axios from "axios";

function DeleteButton(props) {
    const [showModal, setShowModal] = useState(false);
    const user = props.user;
    const [id, setId] = useState(user.id);


    const handleDelete = (e) => {
        e.preventDefault();
        console.log("function called");
        Axios.delete(`http://103.186.185.127:8082/users/${id}`, {
            

        }).then((response) => {
            alert("User Deleted Successfully");
            window.location.reload();
        });

    // Close the modal
    setShowModal(false);
    };


return (
    <>
        <Button variant="danger" onClick={() => setShowModal(true)}>
            Delete
        </Button>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    </>
);
}

export default DeleteButton;
