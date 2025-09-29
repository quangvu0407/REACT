import { useEffect, useState } from "react";
import { getQuizByUser } from "../../../services/apiServices";
import './ListQuiz.scss'
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ListQuiz = () => {
    const { t } = useTranslation(); // namespace
    const navigate = useNavigate();
    const [arrQuiz, setArrQuiz] = useState([]);

    useEffect(() => {
        getQuizData()
    }, [])

    const getQuizData = async () => {
        const res = await getQuizByUser();
        if (res && res.EC === 0) {
            setArrQuiz(res.DT)
        }
    }

    return (
        <div className="list-quiz-container container">
            {arrQuiz && arrQuiz.length > 0 &&
                arrQuiz.map((quiz, index) => (
                    <div key={`${index}-quiz`} className="card mt-4 ms-5" style={{ width: "25rem" }}>
                        <img src={`data:image/jpeg;base64,${quiz.image}`} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">
                                {t("listquiz.card.quiz", { number: index + 1 })}
                            </h5>
                            <p className="card-text">{quiz.description}</p>
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate(`/quiz/${quiz.id}`, { state: { quizTitle: quiz.description } })}
                            >
                                {t("listquiz.card.startNow")}
                            </button>
                        </div>
                    </div>
                ))
            }
            {arrQuiz && arrQuiz.length === 0 &&
                <div>{t("listquiz.empty.noQuiz")}</div>
            }
        </div>
    )
}
export default ListQuiz;
