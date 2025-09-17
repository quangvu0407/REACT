import { useEffect, useState } from "react"
import { useParams, useLocation } from "react-router-dom"
import { getDataQuiz } from "../../services/apiServices"
import _ from "lodash"
import './DetailQuiz.scss'
import Question from "./Question"

const DetailQuiz = (props) => {
    const paramas = useParams();
    const location = useLocation();

    const quizId = paramas.id;
    const [dataQuiz, setDataQuiz] = useState();
    const [index, setIndex] = useState(0);

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
        let question = dataQuizClone.find(item =>  +item.questionId === +questionId)
        if(question && question.answers){
            let b = question.answers.map((item)=>{
                if(+item.id === +answerId){
                    item.isSelected = !item.isSelected;
                }
                return item;
            })
            console.log(b)
            question.answers = b
        }
            
        let index = dataQuizClone.findIndex(item =>  +item.questionId === +questionId)
        if(index > -1){
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
        }
    }

    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizId);
        // console.log('check id', res);
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
                        item.answers.isSelected= false;
                        answers.push(item.answers)
                        
                    })
                    return { questionId: key, answers, questionDescriotion, image }
                })
                .value()
            console.log(data)
            setDataQuiz(data)
        }
    }

    // console.log(dataQuiz)
    return (
        <div className="detail-quiz-container">
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
                        onClick={() => handleNext()}
                    >Finish</button>
                </div>
            </div>
            <div className="right-content">
                count down
            </div>

        </div>
    )
}
export default DetailQuiz