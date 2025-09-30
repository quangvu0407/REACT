import { useEffect, useState } from "react";
import { getHistory } from "../../../services/apiServices";
import { useTranslation } from "react-i18next";

const HistoryUser = () => {
    const [listHistory, setLishHistory] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        getHistoryUser();
    }, [])

    const getHistoryUser = async () => {
        let res = await getHistory();
        if (res && res.EC === 0) {
            setLishHistory(res.DT.data)
        }
    }

    console.log(listHistory)
    return (
        <>
            <table className="table table-hover table-bordered" style={{ width: "70%" }}>
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Quiz name</th>
                        <th scope="col">Total questions</th>
                        <th scope="col">Total correct</th>
                        <th scope="col">date</th>
                    </tr>
                </thead>

                <tbody>
                    {listHistory && listHistory.length > 0 && listHistory.map((item, index) => {
                        // console.log("item:", item);
                        // console.log("createAt:", item.createdAt);
                        return (
                            <tr key={`table-users-${index}`}>
                                <td>{item.id}</td>
                                <td>{item.quizHistory.name}</td>
                                <td>{item.total_questions}</td>
                                <td>{item.total_correct}</td>
                                <td>{item.createdAt ? new Date(item.createdAt).toLocaleString("vi-VN") : ""}</td>
                            </tr>
                        )
                    })}
                    {listHistory && listHistory.length === 0 &&
                        <tr>
                            <td colSpan="5" className="text-center">
                                {t("manageuser.tableUser.notFound")}
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </>
    )
}

export default HistoryUser;