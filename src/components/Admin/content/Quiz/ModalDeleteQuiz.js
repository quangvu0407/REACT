
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import _ from "lodash";
import { deleteQuiz } from '../../../../services/apiServices';

const ModalDeleteQuiz = (props) => {
    const { show, setShow, quiz } = props;

    const handleClose = () => {
        setShow(false);
    }

    const handleSubmitDeleteQuiz = async () => {

        let res = await deleteQuiz(quiz.id)
        console.log(quiz.id)
        if (res && res.EC === 0) {
            toast.success(res.EM)
            handleClose();
            await props.fetchQuiz();
        }
        if (res && res.EC !== 0) {
            console.log(res)
            toast.error(res.EM)
        }
    }

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal
                show={show}
                onHide={handleClose}
                size='l'
                backdrop="static"
                className="modal-delete-quiz"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='del-id'>
                        You can delete quiz by id: <span>{quiz.id}</span>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitDeleteQuiz()}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteQuiz;