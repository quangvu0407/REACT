import { useTranslation } from "react-i18next";

const TableQuiz = (props) => {
  const { listQuiz } = props;
  const { t } = useTranslation();

  return (
    <>
      <div>{t("managequiz.tableQuiz.title")}</div>
      <table className="table table-hover table-bordered my-3">
        <thead>
          <tr>
            <th scope="col">{t("managequiz.tableQuiz.id")}</th>
            <th scope="col">{t("managequiz.tableQuiz.name")}</th>
            <th scope="col">{t("managequiz.tableQuiz.description")}</th>
            <th scope="col">{t("managequiz.tableQuiz.type")}</th>
            <th scope="col">{t("managequiz.tableQuiz.actions")}</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz &&
            listQuiz.map((item, index) => {
              return (
                <tr key={`table-quiz-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.difficulty}</td>
                  <td style={{ display: "flex", gap: "15px" }}>
                    <button
                      className="btn btn-warning"
                      onClick={() => props.handleClickBtnUpdate(item)}
                    >
                      {t("managequiz.tableQuiz.edit")}
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => props.handleClickBtnDelete(item)}
                    >
                      {t("managequiz.tableQuiz.delete")}
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => props.handleClickBtnView(item)}
                    >
                      {t("managequiz.tableQuiz.view")}
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default TableQuiz;
