import _ from 'lodash';
import { useState } from 'react';
import Lightbox from "react-awesome-lightbox";

const Question = (props) => {
    const { data, index } = props;
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    if (_.isEmpty(data)) {
        return (<></>)
    }

    const handleHandleCheckBox = (event, aId, qId) => {
        props.handleCheckBox(aId, qId);
    }

    return (
        <>
            {data.image ?
                <div className='q-image'>
                    <img
                        onClick={() => setIsPreviewImage(true)}
                        src={`data:image/jpeg;base64,${data.image}`} alt="..." />
                    {isPreviewImage === true &&
                        <Lightbox
                            image={`data:image/jpeg;base64,${data.image}`}
                            title={"Question image"}
                            onClose={() => setIsPreviewImage(false)}
                        ></Lightbox>
                    }
                </div>
                :
                <> </>
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
                                        checked={a.isSelected}
                                        // id="flexCheckDefault"
                                        onChange={(event) => handleHandleCheckBox(event, a.id, data.questionId)} />
                                    <label className="form-check-label">
                                        {String.fromCharCode(65 + index)}. {a.description}
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