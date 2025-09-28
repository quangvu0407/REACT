import './ManageQuiz.scss';
import Select from 'react-select';
import { FcPlus } from 'react-icons/fc';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Lightbox from "react-awesome-lightbox";

import Accordion from 'react-bootstrap/Accordion';
import { useTranslation } from "react-i18next";

import { getAllQuizForAdmin, postCreateNewQuiz } from '../../../../services/apiServices';
import TableQuiz from './TableQuiz';
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalUpdateQuiz from './ModalUpdateQuiz';
import ModalViewQuiz from './ModalViewQuiz';
import QuizQA from './QuizQA';
import AssignQuiz from './AssignQuiz';

const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
];

const ManageQuiz = () => {
    const { t } = useTranslation();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState('EASY');
    const [image, setImage] = useState(null);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModalView, setShowModalView] = useState(false);

    const [quiz, setQuiz] = useState({});
    const [quizUpdate, setQuizUpdate] = useState({});
    const [quizView, setQuizView] = useState({});
    const [listQuiz, setListQuiz] = useState([]);
    const [imageName, setImageName] = useState("");
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [dataImagePreview, setDataImagePreview] = useState({
        url: '',
        title: ''
    });

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
            setImageName(event.target.files[0].name)
        }
    }

    const handleSubmitQuiz = async () => {
        if (!name || !description) {
            toast.error('name/description is required...');
            return;
        }
        let res = await postCreateNewQuiz(description, name, type?.value, image);
        if (res && res.EC === 0) {
            toast.success(res.EM)
            setName('')
            setDescription('')
            setImage(null)
            setImageName('')
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

    const handlePreviewImage = () => {
        setDataImagePreview({
            url: URL.createObjectURL(image),
            title: imageName
        })
        setIsPreviewImage(true);
    }

    return (
        <div className="quiz-container">
            <Accordion defaultActiveKey={[]} alwaysOpen>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>{t("managequiz.accordion.manage")}</Accordion.Header>
                    <Accordion.Body>
                        <div className="add-new">
                            <fieldset className="border border-dark rounded-3 p-3">
                                <legend className="float-none w-auto px-3">{t("managequiz.addnew.legend")}</legend>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder={t("managequiz.addnew.namePlaceholder")}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <label>{t("managequiz.addnew.name")}</label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder={t("managequiz.addnew.descriptionPlaceholder")}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                    <label>{t("managequiz.addnew.description")}</label>
                                </div>
                                <div className='my-3'>
                                    <Select
                                        defaultValue={type}
                                        onChange={setType}
                                        options={options}
                                        placeholder={t("managequiz.addnew.type")}
                                    />
                                </div>
                                <div className='form-actions form-group'>
                                    <label className="form-label label-upload" htmlFor='label-upload'>
                                        <FcPlus className='icon-upload' />
                                        {t("managequiz.addnew.upload")}
                                    </label>
                                    <input
                                        type="file"
                                        hidden
                                        id='label-upload'
                                        className='form-control'
                                        onChange={(e) => handleChangeFile(e)}
                                    />
                                    <span className='mx-2'>
                                        {imageName ?
                                            <span onClick={() => handlePreviewImage()}>{imageName}</span>
                                            : t("managequiz.addnew.nofile")}
                                    </span>
                                </div>
                                <div className='mt-3'>
                                    <button className='btn btn-warning '
                                        onClick={() => handleSubmitQuiz()}
                                    >
                                        {t("managequiz.addnew.save")}
                                    </button>
                                </div>
                            </fieldset>
                        </div>
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
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>{t("managequiz.accordion.updateqa")}</Accordion.Header>
                    <Accordion.Body>
                        <QuizQA />
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                    <Accordion.Header>{t("managequiz.accordion.assign")}</Accordion.Header>
                    <Accordion.Body>
                        <div className='quiz-content'>
                            <AssignQuiz />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            {isPreviewImage &&
                <Lightbox
                    image={dataImagePreview.url}
                    title={dataImagePreview.title}
                    onClose={() => setIsPreviewImage(false)}
                />}
        </div>
    )
}

export default ManageQuiz;
