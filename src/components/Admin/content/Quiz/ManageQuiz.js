import './ManageQuiz.scss';
import Select from 'react-select';
import { FcPlus } from 'react-icons/fc';
import { useEffect, useState } from 'react';
import { postCreateNewQuiz } from '../../../../services/apiServices';
import { toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
import Accordion from 'react-bootstrap/Accordion';
import { getAllQuizForAdmin } from '../../../../services/apiServices';

import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalUpdateQuiz from './ModalUpdateQuiz';
import ModalViewQuiz from './ModalViewQuiz';

const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
];

const ManageQuiz = (props) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState('EASY');
    const [image, setImage] = useState(null);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModalView, setShowModalView] = useState(false);

    const [quiz, setQuiz] = useState({});
    const [quizUpdate, setQuizUpdate] = useState({})
    const [quizView, setQuizView] = useState({})
    const [listQuiz, setListQuiz] = useState([]);

    useEffect(() => {
        fetchQuiz()
    }, [])

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin()
        if (res && res.EC === 0) {
            setListQuiz(res.DT)
        }
    }

    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    }

    const handleSubmitQuiz = async () => {
        let res = await postCreateNewQuiz(description, name, type?.value, image);
        console.log("check res", res)
        if (!name || !description) {
            toast.error('name/description is required...')
            return;
        }
        if (res && res.EC === 0) {
            toast.success(res.EM)
            setName('')
            setDescription('')
            setImage(null)
            fetchQuiz()
        }
        else {
            toast.error(res.EM)
        }
    }

    const handleClickBtnDelete = (item) => {
        setShowModalDelete(true);
        setQuiz(item)
    }

    const handleClickBtnUpdate = (item) => {
        setShowModalUpdate(true);
        setQuizUpdate(item);
    }

    const handleClickBtnView = (item) => {
        setShowModalView(true);
        setQuizView(item)
    }

    const resetUpdateQuiz = () => {
        setQuizUpdate({})
    }

    return (
        <div className="quiz-container">
            <Accordion defaultActiveKey="1">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Manage Quizzes</Accordion.Header>
                    <Accordion.Body>
                        <div className="add-new">
                            <fieldset className="border rounded-3 p-3">
                                <legend className="float-none w-auto px-3">Add new Quizzes</legend>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder='Your quiz name'
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                    <label >Name</label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder='your decription'
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)} />
                                    <label htmlFor="floatingPassword">Description</label>
                                </div>
                                <div className='my-3'>
                                    <Select
                                        defaultValue={type}
                                        onChange={setType}
                                        options={options}
                                        placeholder="quiz type..."
                                    />
                                </div>
                                <div className='form-actions form-group'>
                                    <label className="form-label label-upload" htmlFor='label-upload'>
                                        <FcPlus className='icon-upload' />
                                        Upolad File Image</label>
                                    <input
                                        type="file"
                                        // hidden
                                        id='label-upload'
                                        className='form-control'
                                        onChange={(event) => handleChangeFile(event)}
                                    />
                                </div>
                                <div className='mt-3'>
                                    <button className='btn btn-warning '
                                        onClick={() => handleSubmitQuiz()}
                                    >Save</button>
                                </div>
                            </fieldset>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <div className='quiz-content'>
                <div className="list-detail">
                    <TableQuiz
                        listQuiz={listQuiz}
                        handleClickBtnDelete={handleClickBtnDelete}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                    />
                </div>
                <ModalDeleteQuiz
                    show={showModalDelete}
                    setShow={setShowModalDelete}
                    quiz={quiz}
                    fetchQuiz={fetchQuiz}
                />
                <ModalUpdateQuiz
                    show={showModalUpdate}
                    setShow={setShowModalUpdate}
                    quiz={quizUpdate}
                    resetUpdateQuiz={resetUpdateQuiz}
                    fetchQuiz={fetchQuiz}
                />
                <ModalViewQuiz
                    show={showModalView}
                    setShow={setShowModalView}
                    quiz={quizView}
                />
            </div>
        </div>
    )
}

export default ManageQuiz
