import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { postCreateNewUser } from '../../../services/apiServices';
import { useTranslation } from "react-i18next";

const ModalCreactUser = (props) => {
    const { show, setShow } = props;
    const { t } = useTranslation();

    const handleClose = () => {
        setShow(false);
        setEmail("");
        setPassword("");
        setUsername("");
        setRole("USER");
        setImage("");
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('USER');
    const [image, setImage] = useState('');
    const [PreviewImage, setPreviewImage] = useState('');

    const handleUploadImage = (ev) => {
        if (ev.target && ev.target.files && ev.target.files[0]) {
            setPreviewImage(URL.createObjectURL(ev.target.files[0]));
            setImage(ev.target.files[0]);
        }
        else {
            setPreviewImage("");
        }
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSubmitCreateUser = async () => {
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error("invalid email");
            return;
        }
        if (!password) {
            toast.error("invalid password");
            return;
        }

        let data = await postCreateNewUser(email, password, username, role, image)
        console.log(">>check res: ", data)

        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleClose();
            // await props.fetchListUser()
            props.setCurrentPage(1);
            await props.fetchListUserWithPaginate(1);
        }
        if (data && data.EC !== 0) {
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
                size='xl'
                backdrop="static"
                className="modal-add-user"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t("manageuser.title")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">{t("manageuser.form.email")}</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(ev) => setEmail(ev.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">{t("manageuser.form.password")}</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
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
                            <select className="form-select" onChange={(ev) => setRole(ev.target.value)}>
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
                        {t("manageuser.close")}
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
                        {t("manageuser.save")}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalCreactUser;