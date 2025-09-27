import { useEffect, useState } from "react"
import { useParams, useLocation } from "react-router-dom"
import { getDataQuiz, postSubmitQuiz } from "../../services/apiServices";
import _ from "lodash"
import './DetailQuiz.scss'
import Question from "./Question"
import ModalResult from "./ModalResult"
import RightContent from "./Content/RightContent";

const DetailQuiz = (props) => {
    const paramas = useParams();
    const location = useLocation();

    const quizId = paramas.id;
    const [dataQuiz, setDataQuiz] = useState();
    const [index, setIndex] = useState(0);

    const [isShowModalResult, setIsShowModalResult] = useState(false);
    const [dataModalResult, setDataModalResult] = useState({});

    useEffect(() => {
        fetchQuestions();
    }, [quizId])

    const handlePrev = () => {
        if (index - 1 < 0) return;
        setIndex(index - 1);
    }
    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1)
            setIndex(index + 1)
    }

    const handleCheckBox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz)
        let question = dataQuizClone.find(item => +item.questionId === +questionId)
        if (question && question.answers) {
            question.answers = question.answers.map((item) => ({
                ...item,
                isSelected: +item.id === +answerId
            }))

        }

        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
        if (index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
        }
    }

    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizId);

        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                // Group the elements of Array based on `color` property
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {
                    let answers = [];
                    let questionDescriotion, image = null;
                    // console.log('value', value, 'key', key)
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescriotion = item.description;
                            image = item.image
                        }
                        item.answers.isSelected = false;
                        answers.push(item.answers)

                    })
                    return { questionId: key, answers, questionDescriotion, image }
                })
                .value()
            setDataQuiz(data)
        }
    }


    const handleFinishQuiz = async () => {
        console.log("check data ", dataQuiz)
        let payload = {
            quizId: +quizId,
            answers: []
        };
        let answers = [];
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(question => {
                let questionId = question.questionId;
                let userAnswerId = [];
                question.answers.forEach(a => {
                    if (a.isSelected === true) {
                        userAnswerId.push(a.id)
                    }
                })
                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })
            })
            payload.answers = answers;
            let res = await postSubmitQuiz(payload)
            console.log("check respon", res)
            if (res && res.EC === 0) {
                setDataModalResult({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData
                })
                setIsShowModalResult(true);
            } else {
                alert("wrong answer...")
            }
        }
    }

    // console.log(dataQuiz)
    return (
        <div className="detail-quiz-container">
            <hr/>
            <div className="left-content">
                <div className="title">
                    Quiz{quizId}: {location?.state?.quizTitle}
                </div>

                <hr />
                <div className="q-body">
                    <img />
                </div>
                <div className="q-content">
                    <Question
                        index={index}
                        handleCheckBox={handleCheckBox}
                        data={
                            dataQuiz && dataQuiz.length > 0 ?
                                dataQuiz[index] : []} />
                </div>
                <div className="footer">
                    <button
                        className="btn btn-secondary"
                        onClick={() => handlePrev()}
                    >prev</button>
                    <button
                        className="btn btn-primary mr-3"
                        onClick={() => handleNext()}
                    >next</button>
                    <button
                        className="btn btn-warning mr-3"
                        onClick={() => handleFinishQuiz()}
                    >Finish</button>
                </div>
            </div>
            <div className="right-content">
                <RightContent
                    dataQuiz = {dataQuiz}
                    handleFinishQuiz = {handleFinishQuiz}
                    setIndex={setIndex}
                    indexs = {index}
                />
            </div>
            <ModalResult
                show={isShowModalResult}
                setShow={setIsShowModalResult}
                dataModalResult={dataModalResult} />

        </div>
    )
}
export default DetailQuiz