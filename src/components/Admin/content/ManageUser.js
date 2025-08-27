import ModalCreactUser from "./ModalCreateUser";
import './ManageUser.scss';
import { FcPlus } from 'react-icons/fc';
import { useState } from "react";
import TableUser from "./tableUser";
const ManagerUser = () => {
    
    const [showModelCreateUser, setShowModelCreateUser] = useState(false);

    return (
        <div className="manage-user-container" >
            <div className="title">
                Manage User
            </div>
            <div className="User-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary" 
                        onClick = {() => {setShowModelCreateUser(true)}}>
                        <FcPlus/>Add new user
                    </button>

                </div>
                <div className="table-users-container">
                    <TableUser/>

                </div>
                <ModalCreactUser 
                show = {showModelCreateUser}
                setShow = {setShowModelCreateUser}
                />
            </div>
        </div>
    )
}

export default ManagerUser;