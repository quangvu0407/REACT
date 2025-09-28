import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import _ from "lodash";
import { useTranslation } from "react-i18next";
const ModalViewUser = (props) => {
    const { show, setShow, dataView, setDataView } = props;
     const { t } = useTranslation();

    const handleClose = () => {
        setShow(false);
        setEmail("");
        setUsername("");
        setRole("USER");
        setImage("");
        setDataView({});
    }

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('USER');
    const [image, setImage] = useState('');
    const [PreviewImage, setPreviewImage] = useState('');

    useEffect(() => {
        if (!_.isEmpty(dataView)) {
            setEmail(dataView.email);
            setUsername(dataView.username);
            setRole(dataView.role);
            setImage();
            setPreviewImage(`data:image/jpeg;base64,${dataView.image}`);
        }
    }, [dataView])
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
                    <Modal.Title>{t("manageuser.viewuser")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-12">
                            <label className="form-label">{t("manageuser.form.email")}</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                disabled
                                onChange={(ev) => setEmail(ev.target.value)}
                            />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">{t("manageuser.form.username")}</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                disabled
                                onChange={(ev) => setUsername(ev.target.value)}
                            />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">{t("manageuser.form.role")}</label>
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
                                <span>{t("manageuser.previewimage")}</span>
                            }

                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t("manageuser.close")}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalViewUser;