import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import './DashBoard.scss';
import { getOverview } from '../../../services/apiServices';
import { useEffect, useState } from 'react';

const DashBoard = () => {
    const [dataOverview, setDataOverview] = useState([]);
    const [dataChart, setDataChart] = useState([]);
    const [dataUser, setDataUser] = useState([]);

    useEffect(() => {
        fetchDataOverview();
    }, [])

    const fetchDataOverview = async () => {
        let res = await getOverview();
        if (res && res.EC === 0) {
            console.log(res)
            setDataOverview(res.DT.others);
            setDataUser(res.DT.users);
            let data = res.DT.others
            setDataChart([
                {
                    "name": "Quizzes",
                    "Qz": data?.countQuiz ?? 0
                },
                {
                    "name": "Questions",
                    "Qs": data?.countQuestions ?? 0
                },
                {
                    "name": "Answers",
                    "As": data?.countAnswers ?? 0
                }
            ])
        }
    }

    const data = dataChart;
    return (
        <div className="dashboard-container">
            <div className="title">
                <div className='title1'>
                    Analytics Dashboad
                </div>
                <div className='title2'>
                    Have a lucky day! Let's work with numbers together.
                </div>
                <hr/>
            </div>
            <div className='header'>
                <div className='header1'>Statistical Parameters</div>
                <div className='header2'>Bar chart of questions and answers in the test</div>
            </div>
            <div className='content'>
                <div className='c-left'>
                    <div className='child'>
                        <span className='text-1'>Total Users</span>
                        <span className='text-2'>
                            {dataUser && dataUser.total ?
                                <>{dataUser.total}</>
                                : <>0</>
                            }
                        </span>
                        <span >Users:
                            {dataUser && dataUser.countUsers ?
                                <> {dataUser.countUsers}</>
                                : <> 0</>
                            }
                        </span>
                        <span >Admins:
                            {dataUser && dataUser.countAdmin ?
                                <> {dataUser.countAdmin}</>
                                : <> 0</>
                            }
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>Total Quizzes</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.countQuiz ?
                                <>{dataOverview.countQuiz}</>
                                : <>0</>
                            }
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>Total Questions</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.countQuestions ?
                                <>{dataOverview.countQuestions}</>
                                : <>0</>
                            }
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>Total Answers</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.countAnswers ?
                                <>{dataOverview.countAnswers}</>
                                : <>0</>
                            }
                        </span>
                    </div>
                </div>
                <div className='c-right'>
                    <ResponsiveContainer width={"95%"} height={"100%"}>
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Qz" fill="#8884d8" />
                            <Bar dataKey="Qs" fill="#82ca9d" />
                            <Bar dataKey="As" fill="#c26488ff" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}
export default DashBoard;