import { useEffect, useState } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiServices";

const TableQuiz = () => {
    const [listQuiz, setListQuiz] = useState([])
    useEffect(() => {
        fetchQuiz()
    }, [])

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin()
        console.log(res)
        if (res && res.EC === 0) {
            setListQuiz(res.DT)
        }
    }

    return (
        <>
            <div>List Quizzes:</div>
            <table className="table table-hover table-bordered mt-3">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz && listQuiz.map((item, index) => {
                        return (
                            <tr key={`table-quiz-${index}`}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.difficulty}</td>
                                <td style={{display:'flex', gap: '15px'}}>
                                    <button className="btn btn-warning">Edit</button>
                                    <button className="btn btn-danger">Delete</button>
                                    <button className="btn btn-primary">View</button>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </>
    )
}

export default TableQuiz;