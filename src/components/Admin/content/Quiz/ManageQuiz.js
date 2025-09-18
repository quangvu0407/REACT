import './ManageQuiz.scss';
import Select from 'react-select';
import { FcPlus } from 'react-icons/fc';
import { useState } from 'react';

const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'Vanilla' },
];

const ManageQuiz = (props) => {
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [type, setType] = useState('EASY');
    const [image, setImage] = useState(null);

    const handleChangeFile =(event) => {
        
    }

    return (
        <div className="quiz-container">
            <div className="title">
                Manage Quiz
            </div>
            <div className="add-new">
                <fieldset className="border rounded-3 p-3">
                    <legend className="float-none w-auto px-3">Add new Quizzes</legend>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" placeholder='Your quiz name' />
                        <label 
                        type="text"
                        className='form-control'
                        placeholder='your quiz name'
                        value={name}
                        onChange={(event) => setName(event.target.value)}

                        >Name</label>
                    </div>
                    <div className="form-floating">
                        <input 
                        type="password" 
                        className="form-control" 
                        placeholder='your decription' />
                        <label htmlFor="floatingPassword"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        >Password</label>
                    </div>
                    <div className='my-3'>
                        <Select
                            // value={selectedOption}
                            // onChange={this.handleChange}
                            options={options}
                            placeholder="quiz type..."
                        />
                    </div>
                    <div className='form-actions form-group'>
                        <label className="form-label label-upload" htmlFor='label-upload'>
                            <FcPlus className='icon-upload' />
                            Upolad File Image</label>
                        <input
                            type="file"
                            // hidden
                            id='label-upload'
                            className='form-control'
                            onChange={(event) => handleChangeFile(event.target.value)}
                        />
                    </div>
                </fieldset>
            </div>
            <div className="list-detail">

            </div>
        </div>
    )
}

export default ManageQuiz