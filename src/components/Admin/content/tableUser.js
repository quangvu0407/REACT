import { useTranslation } from "react-i18next";

const TableUser = (props) => {
    const { listUsers } = props;
    const { t } = useTranslation();

    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">{t("manageuser.tableUser.id")}</th>
                        <th scope="col">{t("manageuser.tableUser.username")}</th>
                        <th scope="col">{t("manageuser.tableUser.email")}</th>
                        <th scope="col">{t("manageuser.tableUser.role")}</th>
                        <th>{t("manageuser.tableUser.action")}</th>
                    </tr>
                </thead>

                <tbody>
                    {listUsers && listUsers.length > 0 && listUsers.map((item, index) => {
                        return (
                            <tr key={`table-users-${index}`}>
                                <td>{item.id}</td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                                <td>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => props.handClickBtnView(item)}
                                    >
                                        {t("manageuser.tableUser.view")}
                                    </button>
                                    <button
                                        className="btn btn-warning mx-3"
                                        onClick={() => props.handleClickBtnUpdate(item)}
                                    >
                                        {t("manageuser.tableUser.update")}
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => props.handClickBtnDelete(item)}
                                    >
                                        {t("manageuser.tableUser.delete")}
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                    {listUsers && listUsers.length === 0 &&
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
export default TableUser;
