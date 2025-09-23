import { useEffect, useState } from 'react';
import Select from 'react-select';
import './Questions.scss'
import { BsFillPatchPlusFill, BsPatchMinusFill } from "react-icons/bs"
import { AiOutlineMinusCircle, AiFillPlusSquare } from "react-icons/ai"
import { RiImageAddFill } from "react-icons/ri"
import { v4 as uuidv4 } from "uuid";
import _ from "lodash"
import Lightbox from "react-awesome-lightbox";
import { getAllQuizForAdmin, postCreacteNewQuestionForQuiz, postCreacteNewAnswerForQuestion } from '../../../../services/apiServices';
import { toast } from 'react-toastify';

const Questions = () => {
    const initQuestions = [
        {
            id: uuidv4(),
            description: '',
            image: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false
                }
            ]
        }
    ]

    const [questions, setQuestions] = useState(initQuestions)

    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [dataImagePreview, setDataImagePreview] = useState({
        url: '',
        title: ''
    })

    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [actionError, setActionError] = useState("");


    useEffect(() => {
        fetchQuiz()
    }, [])

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin()
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`
                }
            })
            setListQuiz(newQuiz)
        }
    }

    const handleAddRemoveQuestion = (type, id) => {
        if (type === 'ADD') {
            const newquestion = {
                id: uuidv4(),
                description: '',
                image: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    },
                ]
            };
            setQuestions([...questions, newquestion])
        }
        if (type === 'REMOVE') {
            let questionsClone = _.cloneDeep(questions);
            questionsClone = questionsClone.filter(item => item.id !== id);
            setQuestions(questionsClone)
        }

        console.log(type, id)

    }

    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        let questionsClone = _.cloneDeep(questions);
        if (type === 'ADD') {
            const newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false
            };
            let index = questionsClone.findIndex(item => item.id === questionId);
            questionsClone[index].answers.push(newAnswer);
            setQuestions(questionsClone);
        }

        if (type === 'REMOVE') {
            let index = questionsClone.findIndex(item => item.id === questionId);
            questionsClone[index].answers = questionsClone[index].answers.filter(item => item.id !== answerId)
            setQuestions(questionsClone)
        }
    }

    const handleOnchange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            let questionsClone = _.cloneDeep(questions);
            let index = questionsClone.findIndex(item => item.id === questionId);
            if (index > -1) {
                questionsClone[index].description = value;
                setQuestions(questionsClone)
            }
        }
    }

    const handleOnchangeFileQuestion = (questionId, event) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            questionsClone[index].imageFile = event.target.files[0];
            questionsClone[index].imageName = event.target.files[0].name;
            console.log("check file", event.target.files[0])
            setQuestions(questionsClone)
        }
    }

    const handleAnswerQuestion = (type, answerId, questionId, value) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            questionsClone[index].answers = questionsClone[index].answers.map(answer => {
                if (answer.id === answerId) {
                    if (type === 'CHECKBOX') {
                        return {
                            ...answer,
                            isCorrect: answer.id === answerId ? value : false
                        };
                    }
                    if (type === 'INPUT') {
                        answer.description = value;
                    }
                }
                return answer;
            })
        }
        setQuestions(questionsClone);
    }

    const handleSubmitQuestionForQuiz = async () => {
        //todo
        if (_.isEmpty(selectedQuiz)) {
            toast.error("please choose a Quiz")
            return;
        }

        let isValidQuestion = true;
        let isValidAnswers = true;
        let indexQ = 0, indexA = 0;
        let countIsCorrect = false;
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].description || questions[i].answers.length < 2) {
                isValidQuestion = false;
                indexQ = i;
                break;
            }
            for (let j = 0; j < questions[i].answers.length; j++) {
                if (!questions[i].answers[j].description) {
                    isValidAnswers = false;
                    indexA = j;
                    break;
                }
                if (questions[i].answers[j].isCorrect === true) {
                    countIsCorrect = true;
                    break;
                }
            }
            indexQ = i;
            if (isValidAnswers === false) break;
            if (countIsCorrect === false) break;
        }

        if (isValidQuestion === false) {
            toast.error(`Not empty Question ${indexQ + 1} or Answer of Question > 1`);
            setActionError("is-invalid")
            return;
        }
        if (isValidAnswers === false) {
            toast.error(`Not empty Answer ${indexA + 1} of Question ${indexQ + 1}`);
            setActionError("is-invalid")
            return;
        }

        if (countIsCorrect === false) {
            toast.error(`Question ${indexQ + 1} must have a Answer correct!`);
            return;
        }

        //validate data
        for (const question of questions) {
            const q = await postCreacteNewQuestionForQuiz(
                +selectedQuiz.value,
                question.description,
                question.imageFile
            )
            for (const answer of question.answers) {
                await postCreacteNewAnswerForQuestion(
                    answer.description, answer.isCorrect, q.DT.id
                )
            }
        }
        toast.success("Create Questions and Answers is successed!")
        setQuestions(initQuestions)
    }

    const handlePreviewImage = (questionId) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            setDataImagePreview({
                url: URL.createObjectURL(questionsClone[index].imageFile),
                title: questionsClone[index].imageName
            })
            setIsPreviewImage(true);
        }
    }
    return (
        <div className="questions-container">
            <div className="title">
                Manage questions
            </div>
            <hr />
            <div className="add-new-question">
                <div className='col-6 form-group'>
                    <label className='mb-2'>Select Quiz: </label>
                    <Select
                        value={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                    />
                </div>
                <div className='mt-3 mb-2'>
                    Add Question:
                </div>
                {
                    questions && questions.map((question, index) => {
                        return (
                            <div key={question.id} className='q-main mb-4'>
                                <div className='questions-content'>
                                    <div className="form-floating description">
                                        <input type="text"
                                            className={`form-control ${question.description ? "" : actionError}`}
                                            placeholder="name@example.com"
                                            value={question.description}
                                            onChange={(event) => handleOnchange('QUESTION', question.id, event.target.value)}
                                        />
                                        <label htmlFor="floatingInput">Question {index + 1} 's Description</label>
                                    </div>
                                    <div className='group-upload'>
                                        <label htmlFor={`${question.id}`}>
                                            <RiImageAddFill className='label-up' />
                                        </label>
                                        <input
                                            id={`${question.id}`}
                                            onChange={(event) => handleOnchangeFileQuestion(question.id, event)}
                                            type='file'
                                            hidden
                                        />
                                        <span>{question.imageName ?
                                            <span onClick={() => handlePreviewImage(question.id)}>{question.imageName}</span>
                                            : "0 file input upload"}</span>
                                    </div>
                                    <div className='btn-add'>
                                        <span onClick={() => handleAddRemoveQuestion('ADD', '')}>
                                            <BsFillPatchPlusFill className='icon-add' />
                                        </span>
                                        {questions.length > 1 &&
                                            <span onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}>
                                                <BsPatchMinusFill className='icon-remove' />
                                            </span>
                                        }

                                    </div>
                                </div>
                                {question.answers && question.answers.length > 0 &&
                                    question.answers.map((answers, index) => {
                                        return (
                                            <div key={answers.id} className='answers-content'>
                                                <input
                                                    className="form-check-input iscorrect"
                                                    type="checkbox"
                                                    checked={answers.isCorrect}
                                                    onChange={(event) => handleAnswerQuestion('CHECKBOX', answers.id, question.id, event.target.checked)}
                                                />
                                                <div className="form-floating answer-name">
                                                    <input
                                                        value={answers.description}
                                                        type="text"
                                                        className={`form-control ${answers.description ? "" : actionError}`}
                                                        placeholder="name@example.com"
                                                        onChange={(event) => handleAnswerQuestion('INPUT', answers.id, question.id, event.target.value)}
                                                    />
                                                    <label>answer {index + 1}</label>
                                                </div>
                                                <div className='btn-group'>
                                                    <span onClick={() => handleAddRemoveAnswer('ADD', question.id, answers.id)}>
                                                        <AiFillPlusSquare className='icon-add' />
                                                    </span>
                                                    {question.answers.length > 1 &&
                                                        <span onClick={() => handleAddRemoveAnswer('REMOVE', question.id, answers.id)}>
                                                            <AiOutlineMinusCircle className='icon-remove' />
                                                        </span>
                                                    }

                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        )
                    })
                }
                {
                    questions && questions.length > 0 &&
                    <div>
                        <button
                            onClick={() => handleSubmitQuestionForQuiz()}
                        >
                            Save Questions
                        </button>
                    </div>
                }

                {isPreviewImage === true &&
                    <Lightbox
                        image={dataImagePreview.url}
                        title={dataImagePreview.title}
                        onClose={() => setIsPreviewImage(false)}
                    ></Lightbox>
                }
            </div>
        </div >
    )
}
export default Questions;