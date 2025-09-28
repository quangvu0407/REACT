
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import _ from "lodash";
import { deleteQuiz } from '../../../../services/apiServices';
import { useTranslation } from 'react-i18next';

const ModalDeleteQuiz = (props) => {
    const { show, setShow, quiz } = props;
    const { t } = useTranslation();
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
                    <Modal.Title>{t("managequiz.deletequiz.title")}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {t("managequiz.deletequiz.confirm", { id: quiz.id })}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t("managequiz.deletequiz.close")}
                    </Button>
                    <Button variant="primary" onClick={handleSubmitDeleteQuiz}>
                        {t("managequiz.deletequiz.delete")}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteQuiz;