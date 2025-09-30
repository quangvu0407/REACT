import _ from 'lodash';
import { useState } from 'react';
import Lightbox from "react-awesome-lightbox";
import { useTranslation } from "react-i18next";
import { IoIosClose, IoIosCheckmark } from "react-icons/io";

const Question = (props) => {
    const { data, index, finish } = props;
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const { t } = useTranslation();
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
                {t("detailquiz.question")} {index + 1}: {data.questionDescriotion}
            </div>
            <div className="answer">
                {data.answers && data.answers.length > 0 &&
                    data.answers.map((a, i) => {
                        return (
                            <div key={`answer-${i}`} className="a-child">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={a.isSelected}
                                        disabled={finish}
                                        onChange={(event) => handleHandleCheckBox(event, a.id, data.questionId)}
                                    />
                                    <label className="form-check-label" htmlFor={`checkbox-${i}-${index}`} >
                                        {a.description}
                                    </label>
                                    {finish === true &&
                                        <>
                                            {a.isSelected === true && a.isCorrect === false
                                                && <IoIosClose className='incorrect' />
                                            }

                                            {a.isCorrect === true
                                                && <IoIosCheckmark className='correct' />
                                            }
                                        </>
                                    }
                                </div>
                            </div>
                        );
                    })
                }
            </div>

        </>
    )
}

export default Question;