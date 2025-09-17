import _ from 'lodash';

const Question = (props) => {
    const { data, index } = props;
    if (_.isEmpty(data)) {
        return (<></>)
    }
    return (
        <>
            {data.image &&
                <div className='q-image'>
                    <img src={`data:image/jpeg;base64,${data.image}`} alt="..." />
                </div>
            }

            <div className="question">
                Question {index + 1}: {data.questionDescriotion}
            </div>
            <div className="answer">
                {data.answers && data.answers.length > 0 &&
                    data.answers.map((a, index) => {
                        return (
                            <div key={`answer-${index}`} className="a-child">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="flexCheckDefault" />
                                    <label className="form-check-label">
                                        A.{a.description}
                                    </label>
                                </div>
                            </div>
                        )
                    })

                }
            </div>
        </>
    )
}

export default Question;