import CountDown from "./CountDown";
import { useState } from "react";

const RightContent = (props) => {
    const [currentIndex, setCurrentIndex] = useState(null);

    const { dataQuiz } = props;

    const onTimeUp = () => {
        props.handleFinishQuiz();
    }
    const getClassQuestion = (index, question) => {
        if (index === currentIndex) {
            return "question clicked";
        }

        if (question && question.answers.some(a => a.isSelected === true)) {
            return "question selected";
        }

        return "question";
    }

    const handleClickQuestion = (index) => {
        setCurrentIndex(index);
        props.setIndex(index);
    }

    return (
        <>
            <div className="main-timer">
                <CountDown
                    onTimeUp={onTimeUp}
                />
            </div>
            <div className="main-question">
                {dataQuiz && dataQuiz.length > 0 && dataQuiz.map((item, index) => {
                    return (
                        <div
                            key={`Question ${index + 1}`}
                            className={getClassQuestion(index, item)}
                            onClick={() => handleClickQuestion(index)}
                        >{index + 1}</div>
                    )
                })}
            </div>
        </>
    )
}

export default RightContent;