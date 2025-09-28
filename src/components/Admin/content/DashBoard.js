import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import './DashBoard.scss';
import { getOverview } from '../../../services/apiServices';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const DashBoard = () => {
    const [dataOverview, setDataOverview] = useState([]);
    const [dataChart, setDataChart] = useState([]);
    const [dataUser, setDataUser] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        fetchDataOverview();
    }, [])

    const fetchDataOverview = async () => {
        let res = await getOverview();
        if (res && res.EC === 0) {
            setDataOverview(res.DT.others);
            setDataUser(res.DT.users);
            let data = res.DT.others;
            setDataChart([
                {
                    "name": t("dashboard.chart.quizzes"),
                    "Qz": data?.countQuiz ?? 0
                },
                {
                    "name": t("dashboard.chart.questions"),
                    "Qs": data?.countQuestions ?? 0
                },
                {
                    "name": t("dashboard.chart.answers"),
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
                    {t("dashboard.title1")}
                </div>
                <div className='title2'>
                    {t("dashboard.title2")}
                </div>
                <hr />
            </div>
            <div className='header'>
                <div className='header1'>{t("dashboard.header1")}</div>
                <div className='header2'>{t("dashboard.header2")}</div>
            </div>
            <div className='content'>
                <div className='c-left'>
                    <div className='child'>
                        <span className='text-1'>{t("dashboard.users.total")}</span>
                        <span className='text-2'>
                            {dataUser && dataUser.total ?
                                <>{dataUser.total}</>
                                : <>0</>
                            }
                        </span>
                        <span>{t("dashboard.users.users")}: 
                            {dataUser && dataUser.countUsers ?
                                <> {dataUser.countUsers}</>
                                : <> 0</>
                            }
                        </span>
                        <span>{t("dashboard.users.admins")}: 
                            {dataUser && dataUser.countAdmin ?
                                <> {dataUser.countAdmin}</>
                                : <> 0</>
                            }
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>{t("dashboard.quizzes")}</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.countQuiz ?
                                <>{dataOverview.countQuiz}</>
                                : <>0</>
                            }
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>{t("dashboard.questions")}</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.countQuestions ?
                                <>{dataOverview.countQuestions}</>
                                : <>0</>
                            }
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>{t("dashboard.answers")}</span>
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
