import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { putUpdateUser } from '../../../services/apiServices';
import _ from "lodash";
import { useTranslation } from "react-i18next";

const ModalUpdateUser = (props) => {
    const { show, setShow, dataUpdate } = props;
    console.log(dataUpdate)
     const { t } = useTranslation();
    const handleClose = () => {
        setShow(false);
        setEmail("");
        setPassword("");
        setUsername("");
        setRole("USER");
        setImage("");
        props.resetUpdateUser();
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const [image, setImage] = useState('');
    const [PreviewImage, setPreviewImage] = useState('');

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email);
            setUsername(dataUpdate.username);
            setRole(dataUpdate.role);
            setImage();
            setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
        }
    }, [dataUpdate])

    const handleUploadImage = (ev) => {
        if (ev.target && ev.target.files && ev.target.files[0]) {
            setPreviewImage(URL.createObjectURL(ev.target.files[0]));
            setImage(ev.target.files[0]);
        }
        else {
            setPreviewImage("");
        }
    }


    const handleSubmitUpdateUser = async () => {

        let data = await putUpdateUser(dataUpdate.id, username, role, image)

        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleClose();
            // await props.fetchListUser()
            // props.setCurrentPage(1);
            await props.fetchListUserWithPaginate(props.currentPage);
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }
    // console.log("check data", dataUpdate)
    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal
                show={show}
                onHide={handleClose}
                size='x'
                backdrop="static"
                className="modal-add-user"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t("manageuser.updateuser")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">{t("manageuser.form.email")}</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                disabled
                                onChange={(ev) => setEmail(ev.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">{t("manageuser.form.password")}</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                disabled
                                onChange={(ev) => setPassword(ev.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">{t("manageuser.form.username")}</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(ev) => setUsername(ev.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">{t("manageuser.form.role")}</label>
                            <select className="form-select"
                                value={role}
                                onChange={(ev) => setRole(ev.target.value)}>
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                        <div className='col-md-12'>
                            <label className="form-label label-upload" htmlFor='label-upload'>
                                <FcPlus className='icon-upload' />
                                {t("manageuser.uploadimage")}</label>
                            <input
                                type="file"
                                hidden
                                id='label-upload'
                                onChange={(ev) => handleUploadImage(ev)}
                            />
                        </div>
                        <div className='col-md-12 img-preview'>

                            {PreviewImage ?
                                <img src={PreviewImage} />
                                :
                                <span>{t("manageuser.previewimage")}</span>
                            }

                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitUpdateUser()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalUpdateUser;