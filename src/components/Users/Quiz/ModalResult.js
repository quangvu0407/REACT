import { deleteUser } from '../../../services/apiServices';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from "lodash";

const ModalResult = (props) => {
    const { show, setShow, dataModalResult } = props;

    const handleClose = () => {
        setShow(false);
    }
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size='l'
                backdrop="static"
                className="modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Your result</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Total correct answers: <b>{dataModalResult.countCorrect}</b></div>
                    <div>Total questions: <b>{dataModalResult.countTotal}</b></div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Show answer
                    </Button>
                    <Button variant="primary" onClick={() => handleClose()}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalResult;