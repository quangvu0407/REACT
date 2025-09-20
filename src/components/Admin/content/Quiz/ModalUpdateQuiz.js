import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import _ from "lodash";
import { putUpdateQuiz } from '../../../../services/apiServices';

const ModalUpdateQuiz = (props) => {
    const { show, setShow, quiz } = props;
    const handleClose = () => {
        setShow(false);
        setName("");
        setDescription("");
        setDifficulty("EASY");
        setQuizImage("");
        props.resetUpdateQuiz();
    }

    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [quizImage, setQuizImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    useEffect(() => {
        if (!_.isEmpty(quiz)) {
            setDescription(quiz.description);
            setName(quiz.name);
            setDifficulty(quiz.difficulty);
            setQuizImage(quiz.image);
            setPreviewImage(`data:image/jpeg;base64,${quiz.image}`);
        }
    }, [quiz])

    const handleUploadImage = (ev) => {
        if (ev.target && ev.target.files && ev.target.files[0]) {
            setPreviewImage(URL.createObjectURL(ev.target.files[0]));
            setQuizImage(ev.target.files[0]);
        }
        else {
            setPreviewImage("");
        }
    }
    const handleSubmitUpdateQuiz = async () => {
        let res = await putUpdateQuiz(quiz.id, description, name, difficulty, quizImage)

        if(res && res.EC === 0){
            toast.success(res.EM)
            handleClose()
            await props.fetchQuiz()
        }
        else {
            toast.error(res.EC)
        }
    }
    // console.log("check data", dataUpdate)
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
                className="modal-update-quiz"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-12">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(ev) => setName(ev.target.value)}
                            />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={(ev) => setDescription(ev.target.value)}
                            />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Difficulty</label>
                            <select className="form-select"
                                value={difficulty}
                                onChange={(ev) => setDifficulty(ev.target.value)}>
                                <option value="EASY">EASY</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HARD">HARD</option>
                            </select>
                        </div>
                        <div className='col-md-12'>
                            <label className="form-label label-upload" htmlFor='label-uploads'
                            >
                                <FcPlus /> Upload File Image
                            </label>
                            <input
                                hidden
                                type="file"
                                id="label-uploads"
                                onChange={(ev) => handleUploadImage(ev)}
                            />
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
                    <Button variant="primary" onClick={() => handleSubmitUpdateQuiz()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalUpdateQuiz;