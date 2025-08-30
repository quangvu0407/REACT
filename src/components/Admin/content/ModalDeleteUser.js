import { deleteUser } from '../../../services/apiServices';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import _ from "lodash";

const ModalDeleteUser = (props) => {
    const { show, setShow, dataDelete, setDataDelete } = props;

    console.log(dataDelete)
    const handleClose = () => {
        setShow(false);
        setEmail("");
        setUsername("");
        setRole("USER");
        setImage("");
        setDataDelete({});
    }

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('USER');
    const [image, setImage] = useState('');
    const [PreviewImage, setPreviewImage] = useState('');

    useEffect(() => {
        if (!_.isEmpty(dataDelete)) {
            setEmail(dataDelete.email);
            setUsername(dataDelete.username);
            setRole(dataDelete.role);
            setPreviewImage(`data:image/jpeg;base64,${dataDelete.image}`);
        }
    }, [dataDelete])
    const handleSubmitDeleteUser = async () => {

        let data = await deleteUser(dataDelete.id)
        console.log(data, dataDelete)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleClose();
            await props.fetchListUser()
        }
        if (data && data.EC !== 0) {
            console.log(data)
            toast.error(data.EM)
        }
    }

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal
                show={show}
                onHide={handleClose}
                size='l'
                backdrop="static"
                className="modal-view-user"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-12">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                disabled
                                onChange={(ev) => setEmail(ev.target.value)}
                            />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                disabled
                                onChange={(ev) => setUsername(ev.target.value)}
                            />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Role</label>
                            <select
                                className="form-select"
                                value={role}
                                disabled
                                onChange={(ev) => setRole(ev.target.value)}>
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                        <div className='col-md-12 img-preview'>

                            {PreviewImage ?
                                <img src={PreviewImage} />
                                :
                                <span>preview image</span>
                            }

                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitDeleteUser()}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;