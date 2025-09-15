import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { getDataQuiz } from "../../services/apiServices"
import _ from "lodash"

const DetailQuiz = (props) => {
    const paramas = useParams();
    const quizId = paramas.id;
    useEffect(() => {
        fetchQuestions();
    }, [quizId])

    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizId);
        console.log('check id', res);
        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                // Group the elements of Array based on `color` property
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {
                    let answers = [];
                    let questionDescriotion, image = null;
                    console.log('value', value, 'key', key)
                    value.forEach((item, index) => {
                        if(index === 0) {
                            questionDescriotion = item.description;
                            image = item.image
                        }
                         answers.push(item.answers)
                        console.log("item answers", item.answers)
                    })
                    return { questionId: key, answers, questionDescriotion, image }
                })
                .value()
            console.log(data)
        }
    }
    return (
        <div>   
            detailquiz
        </div>
    )
}
export default DetailQuiz