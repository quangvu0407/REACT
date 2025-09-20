import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import _ from "lodash";
const ModalViewQuiz = (props) => {
    const { show, setShow, quiz } = props;

    const handleClose = () => {
        setShow(false);
        setId("");
        setName("");
        setDescription("");
        setDifficulty("EASY");
        setQuizImage("");
    }


    const [id, setId] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [quizImage, setQuizImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    useEffect(() => {
        if (!_.isEmpty(quiz)) {
            setId(quiz.id);
            setDescription(quiz.description);
            setName(quiz.name);
            setDifficulty(quiz.difficulty);
            setQuizImage(quiz.image);
            setPreviewImage(`data:image/jpeg;base64,${quiz.image}`);
        }
    }, [quiz])
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
                className="modal-view-quiz"
            >
                <Modal.Header closeButton>
                    <Modal.Title>View Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-12">
                            <label className="form-label">Id</label>
                            <input
                                type="text"
                                className="form-control"
                                value={id}
                                disabled
                                onChange={(ev) => setId(ev.target.value)}
                            />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                disabled
                                onChange={(ev) => setName(ev.target.value)}
                            />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                value={description}
                                disabled
                                onChange={(ev) => setDescription(ev.target.value)}
                            />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Difficulty</label>
                            <select
                                className="form-select"
                                value={difficulty}
                                disabled
                                onChange={(ev) => setDifficulty(ev.target.value)}>
                                <option value="EASY">EASY</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HARD">HARD</option>
                            </select>
                        </div>
                        <div className='col-md-12 img-preview'>

                            {previewImage ?
                                <img src={previewImage} />
                                :
                                <span>preview image</span>
                            }

                        </div>
                    </form>
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
export default ModalViewQuiz;