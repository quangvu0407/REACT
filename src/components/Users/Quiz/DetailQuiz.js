import { useEffect, useState } from "react"
import { useParams, useLocation } from "react-router-dom"
import { getDataQuiz, postSubmitQuiz } from "../../../services/apiServices";
import _ from "lodash"
import './DetailQuiz.scss'
import Question from "./Question"
import ModalResult from "./ModalResult"
import RightContent from "../Content/RightContent";
import { useTranslation } from "react-i18next";

const DetailQuiz = () => {
    const { t } = useTranslation();
    const paramas = useParams();
    const location = useLocation();

    const quizId = paramas.id;
    const [dataQuiz, setDataQuiz] = useState();
    const [index, setIndex] = useState(0);

    const [isShowModalResult, setIsShowModalResult] = useState(false);
    const [dataModalResult, setDataModalResult] = useState({});
    const [finish, setFinish] = useState(false);
    const [checkArr, setCheckArr] = useState({});

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
            console.log(res)
            let raw = res.DT;
            let data = _.chain(raw)
                .groupBy("id")
                .map((value, key) => {
                    let answers = [];
                    let questionDescriotion, image = null;
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescriotion = item.description;
                            image = item.image
                        }
                        item.answers.isSelected = false;
                        item.answers.isCorrect = false;
                        answers.push(item.answers)
                    })
                    return { questionId: key, answers, questionDescriotion, image }
                })
                .value()
            setDataQuiz(data)
        }
    }

    const handleFinishQuiz = async () => {
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
            if (res && res.EC === 0) {
                console.log(res)
                setDataModalResult({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData
                })
                setIsShowModalResult(true);
                if (res.DT && res.DT.quizData) {
                    let dataQuizClone = _.cloneDeep(dataQuiz);
                    let a = res.DT.quizData;
                    for (let q of a) {
                        for (let i = 0; i < dataQuizClone.length; i++) {
                            if (+q.questionId === +dataQuizClone[i].questionId) {
                                //update answer
                                let newAnswers = [];
                                for (let j = 0; j < dataQuizClone[i].answers.length; j++) {
                                    let s = q.systemAnswers.find(item => +item.id === +dataQuizClone[i].answers[j].id)
                                    if (s) {
                                        dataQuizClone[i].answers[j].isCorrect = true;
                                    }
                                    newAnswers.push(dataQuizClone[i].answers[j]);
                                }
                                dataQuizClone[i].answers = newAnswers;
                            }
                        }
                    }
                    setDataQuiz(dataQuizClone);
                }
                setFinish(true);
            } else {
                alert(t("detailquiz.alert.wrongAnswer"))
            }
        }
    }


    return (
        <div className="detail-quiz-container">
            <hr />
            <div className="left-content">
                <div className="title">
                    {t("detailquiz.title", { id: quizId, title: location?.state?.quizTitle })}
                </div>

                <hr />
                <div className="q-body">
                    <img alt="" />
                </div>
                <div className="q-content">
                    <Question
                        finish={finish}
                        index={index}
                        handleCheckBox={handleCheckBox}
                        data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []} />
                </div>
                <div className="footer">
                    <button
                        className="btn btn-secondary"
                        onClick={handlePrev}
                    >
                        {t("detailquiz.button.prev")}
                    </button>
                    <button
                        className="btn btn-primary mr-3"
                        onClick={handleNext}
                    >
                        {t("detailquiz.button.next")}
                    </button>
                    <button
                        className="btn btn-warning mr-3"
                        onClick={handleFinishQuiz}
                        disabled={finish}
                    >
                        {t("detailquiz.button.finish")}
                    </button>
                </div>
            </div>
            <div className="right-content">
                <RightContent
                    dataQuiz={dataQuiz}
                    handleFinishQuiz={handleFinishQuiz}
                    setIndex={setIndex}
                    indexs={index}
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
