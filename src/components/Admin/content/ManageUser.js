import ModalCreactUser from "./ModalCreateUser";
import './ManageUser.scss';
const ManagerUser = () => {
    return (
        <div className="manage-user-container" >
            <div className="title">
                Manage User
            </div>
            <div className="User-content">
                <div>
                    <button>Add new user</button>
                </div>
                <div>
                    Table of user

                </div>
                <ModalCreactUser />
            </div>
        </div>
    )
}

export default ManagerUser;