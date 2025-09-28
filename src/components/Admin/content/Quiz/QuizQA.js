import { useEffect, useState } from 'react';
import Select from 'react-select';
import './QuizQA.scss'
import { BsFillPatchPlusFill, BsPatchMinusFill } from "react-icons/bs"
import { AiOutlineMinusCircle, AiFillPlusSquare } from "react-icons/ai"
import { RiImageAddFill } from "react-icons/ri"
import { v4 as uuidv4 } from "uuid";
import _ from "lodash"
import Lightbox from "react-awesome-lightbox";
import { getQuizWithQA, getAllQuizForAdmin, postCreacteNewQuestionForQuiz, postCreacteNewAnswerForQuestion, postUpsertQA } from '../../../../services/apiServices';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const QuizQA = () => {
    const { t } = useTranslation();
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

    useEffect(() => {
        if (selectedQuiz && selectedQuiz.value) {
            fetchQuizWithQA();
        }

    }, [selectedQuiz])

    function urltoFile(url, filename, mimeType) {
        return fetch(url)
            .then(res => res.arrayBuffer())
            .then(buf => new File([buf], filename, { type: mimeType }));
    }

    const fetchQuizWithQA = async () => {
        let res = await getQuizWithQA(selectedQuiz.value)
        if (res && res.EC === 0) {
            let newQA = [];
            for (let i = 0; i < res.DT.qa.length; i++) {
                let q = res.DT.qa[i];
                if (q.imageFile) {
                    q.imageName = `Question-${q.id}.png`
                    q.imageFile =
                        await urltoFile(`data:image/png;base64,${q.imageFile}`, `Question-${q.id}.png`, 'image/png')
                }
                newQA.push(q)
            }
            toast.success(res.EM)
            console.log(">>>check res", newQA)
            setQuestions(newQA)
        }

    }

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
                imageFile: '',
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
                if (type === 'CHECKBOX') {
                    return {
                        ...answer,
                        isCorrect: answer.id === answerId ? value : false
                    };
                }
                if (answer.id === answerId) {
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
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].description || questions[i].answers.length < 2) {
                isValidQuestion = false;
                indexQ = i;
                break;
            }

            let hasCorrectAnswer = false; // kiểm tra riêng cho từng câu hỏi
            for (let j = 0; j < questions[i].answers.length; j++) {
                if (!questions[i].answers[j].description) {
                    isValidAnswers = false;
                    indexQ = i;
                    indexA = j;
                    break;
                }
                if (questions[i].answers[j].isCorrect === true) {
                    hasCorrectAnswer = true;
                }
            }

            if (!isValidAnswers) break;

            if (!hasCorrectAnswer) {
                toast.error(`Question ${i + 1} must have at least one correct Answer!`);
                return;
            }
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

        //validate data
        let questionClone = _.cloneDeep(questions);
        for (let i = 0; i < questionClone.length; i++) {
            if (questionClone[i].imageFile)
                questionClone[i].imageFile = await toBase64(questionClone[i].imageFile)
        }
        console.log(questionClone)
        let res = await postUpsertQA({
            quizId: selectedQuiz.value,
            questions: questionClone
        });
        console.log(res)
        // toast.success("Create Questions and Answers is successed!")
        // setQuestions(initQuestions)
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

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
            <div className="add-new-question">
                <div className='col-6 form-group'>
                    <label className='mb-2'>{t("managequiz.assignquiz.selectquiz")} </label>
                    <Select
                        value={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                    />
                </div>
                <div className='mt-3 mb-2'>
                    {t("managequiz.assignquiz.addquestion")}
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
                                        <label htmlFor="floatingInput">{t("managequiz.assignquiz.description")} {index + 1}</label>
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
                                                    <label>{t("managequiz.assignquiz.answer")} {index + 1}</label>
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
                            {t("managequiz.assignquiz.saveq")}
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
export default QuizQA;