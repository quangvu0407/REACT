import ModalCreactUser from "./ModalCreateUser";

const ManagerUser = () => {
    return (
        <div claasName="manage-user-container" >
            <div classNameName="title">
                Manage User
            </div>
            <div classNameName="User-content">
                <div>
                    <button>Add new user</button>
                </div>
                <div>
                    Table of user
                    <ModalCreactUser />
                </div>
            </div>
        </div>
    )
}

export default ManagerUser;