import ModalCreactUser from "./ModalCreateUser";
import './ManageUser.scss';
import { FcPlus } from 'react-icons/fc';
import TableUser from "./tableUser";
import { useEffect, useState } from "react";
import { getAllUser } from "../../../services/apiServices"
import ModalUpdateUser from "./ModalUpdateUser";
const ManagerUser = () => {

    const [showModelCreateUser, setShowModelCreateUser] = useState(false);

    const [showModelUpdateUser, setShowModelUpdateUser] = useState(false);
    const [listUsers, setListUsers] = useState([])

    useEffect(async () => {
        fetchListUser();
    }, []);

    const fetchListUser = async () => {
        let res = await getAllUser()
        if (res.EC === 0) {
            setListUsers(res.DT)
        }
    }
    return (
        <div className="manage-user-container" >
            <div className="title">
                Manage User
            </div>
            <div className="User-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary"
                        onClick={() => { setShowModelCreateUser(true) }}>
                        <FcPlus />Add new user
                    </button>

                </div>
                <div className="table-users-container">
                    <TableUser
                        listUsers={listUsers}
                    />

                </div>
                <ModalCreactUser
                    show={showModelCreateUser}
                    setShow={setShowModelCreateUser}
                    fetchListUser={fetchListUser}
                />
                <ModalUpdateUser
                    show={showModelUpdateUser}
                    setShow={setShowModelUpdateUser}
                />
            </div>
        </div>
    )
}

export default ManagerUser;