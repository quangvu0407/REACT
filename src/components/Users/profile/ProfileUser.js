import { useSelector } from "react-redux";
import "./Profile.scss"
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FcPlus } from 'react-icons/fc';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { changeProfile } from "../../../services/apiServices";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { doLogin } from "../../../redux/action/userAction";

const Profile = () => {
    const user = useSelector(state => state.user.account);
    const [account, setAccount] = useState(user);
    const [PreviewImage, setPreviewImage] = useState();
    const [PreviewImage1, setPreviewImage1] = useState();
    const [image, setImage] = useState('');
    const [username, setUsername] = useState('');
    const [show, setShow] = useState(false);
    const { t } = useTranslation();
    const Dispatch = useDispatch()
    const handleClose = () => {
        setShow(false);
        setImage('');
        setPreviewImage1('');
    }

    const handleShow = () => {
        setShow(true);
        setPreviewImage(`data:image/jpeg;base64,${account.image}`);
        setUsername(account.username)
    }
    useEffect(() => {
        
    }, [account])

    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleUploadImage = (ev) => {
        if (ev.target && ev.target.files && ev.target.files[0]) {
            setPreviewImage1(URL.createObjectURL(ev.target.files[0]));
            setImage(ev.target.files[0]);
        }
        else {
            setPreviewImage1("");
        }
    }

    const handleSave = async () => {
        let res = await changeProfile(account.username, image);
        if (res && res.EC === 0) {
            let base64Image = await fileToBase64(image);
            setAccount({
                ...account,
                username: res.DT?.username || username,
                image: base64Image || account.image
            });
            handleClose();
            toast.success("Update avatar success");
            Dispatch(doLogin(account))
        }
        else {
            toast.error(res.EM)
        }
    }

    return (
        <div className="profile-container">
            <div className="title">
                Thông tin cá nhân:
            </div>
            <div className="left-content">
                <div className="profile-avatar">
                    <img
                        src={
                            account.image?.startsWith("data:image")
                                ? account.image
                                : `data:image/jpeg;base64,${account.image}`
                        }
                        alt="avatar"
                    />
                    <div className="avatar-1">
                        <span className="avatar">Avatar</span>
                        <button
                            className="update-avatar"
                            onClick={() => handleShow()}
                        >Change Avatar</button>
                    </div>
                </div>
                <div className="profile-content">
                    <span className="span1">{`Email: ${account.email}`}</span>
                    <span className="span1">{`Name: ${account.username}`}</span>
                    <span className="span1">{`Role: ${account.role}`}</span>
                    <span></span>
                </div>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                size='x'
                backdrop="static"
                className="updateAvatar"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t("manageuser.updateuser")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
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
                        <div className='col-md-12 img-preview'>

                            {PreviewImage1 ?
                                <img src={PreviewImage1} />
                                :
                                <span>new {t("manageuser.previewimage")}</span>
                            }

                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={() => handleSave()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Profile;