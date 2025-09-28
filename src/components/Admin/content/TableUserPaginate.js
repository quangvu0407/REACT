import ReactPaginate from "react-paginate";
import { useTranslation } from "react-i18next";
import React, {
    useEffect,
    useState
} from "react";

const TableUserPaginate = (props) => {
    const { t } = useTranslation();
    const { listUsers, pageCount } = props;

    const handlePageClick = (event) => {
        props.fetchListUserWithPaginate(+event.selected + 1)
        props.setCurrentPage(+event.selected + 1);
        console.log(`User requested page number ${event.selected}`);
    };
    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">{t("manageuser.form.id")}</th>
                        <th scope="col">{t("manageuser.form.username")}</th>
                        <th scope="col">{t("manageuser.form.email")}</th>
                        <th scope="col">{t("manageuser.form.role")}</th>
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
            <ReactPaginate
                nextLabel={t("manageuser.tableUser.next")}
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel={t("manageuser.tableUser.previous")}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
                forcePage={props.currentPage - 1}
            />
        </>
    )
}
export default TableUserPaginate;