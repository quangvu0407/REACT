import { useState } from 'react';
import Select from 'react-select';
import './Questions.scss'
import { BsFillPatchPlusFill, BsPatchMinusFill } from "react-icons/bs"
import {AiOutlineMinusCircle, AiFillPlusSquare} from "react-icons/ai"

const Questions = () => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    const [selectedQuiz, setSelectedQuiz] = useState({});



    return (
        <div className="questions-container">
            <div className="title">
                Manage questions
            </div>
            <div className="add-new-question">
                <div className='col-6 form-group'>
                    <label>Select Quiz: </label>
                    <Select
                        value={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
                    />
                </div>
                <div className='mt-3'>
                    Add Question:
                </div>
                <div>
                    <div className='questions-content'>
                        <div class="form-floating description">
                            <input type="text" class="form-control" placeholder="name@example.com" />
                            <label for="floatingInput">Description</label>
                        </div>
                        <div className='group-upload'>
                            <label className='label-up'>Upload Image</label>
                            <input type='file'
                                hidden
                            />
                            <span>0 file input</span>
                        </div>
                        <div className='btn-add'>
                            <span>
                                <BsFillPatchPlusFill className='icon-add' />
                            </span>
                            <span>
                                <BsPatchMinusFill className='icon-remove' />
                            </span>
                        </div>
                    </div>
                    <div className='answers-content'>
                        <input
                            className="form-check-input iscorrect"
                            type="checkbox"
                        />
                        <div className="form-floating answer-name">
                            <input type="text" class="form-control" placeholder="name@example.com" />
                            <label for="floatingInput">answer</label>
                        </div>
                        <div className='btn-group'>
                            <span>
                                <AiFillPlusSquare className='icon-add' />
                            </span>
                            <span>
                                <AiOutlineMinusCircle className='icon-remove' />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default Questions;