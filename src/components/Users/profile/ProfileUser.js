import { useSelector } from "react-redux";
import "./Profile.scss"
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FcPlus } from 'react-icons/fc';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { changePassword, changeProfile } from "../../../services/apiServices";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { doUpdate } from "../../../redux/action/userAction";
import HistoryUser from "./HistoryUser";

const Profile = () => {
    const user = useSelector(state => state.user.account);
    const [account, setAccount] = useState(user);

    const [PreviewImage, setPreviewImage] = useState('');
    const [PreviewImage1, setPreviewImage1] = useState('');
    const [image, setImage] = useState('');

    const [username, setUsername] = useState('');
    const [show, setShow] = useState(false);
    const [showChangeName, setShowChangeName] = useState(false);
    const [showChangePass, setShowChangePass] = useState(false);
    const [showHistory, setShowHistory] = useState(false);


    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');

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

    const handleChangeName = () => {
        setShowChangeName(!showChangeName);
    }

    const handleChangePass = () => {
        setShowChangePass(!showChangePass);
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
        let res = await changeProfile(username, image);
        if (res && res.EC === 0) {
            let base64Image
            if (PreviewImage1 !== '') {
                base64Image = await fileToBase64(image);
            }
            const updatedAccount = {
                ...account,
                username: res.DT?.username || username,
                image: base64Image || account.image
            };

            setAccount(updatedAccount);
            Dispatch(doUpdate(updatedAccount));
            handleClose();
            toast.success("Update avatar success");
            setUsername('');
        }
        else {
            toast.error(res.EM)
        }
    }

    const handleSaveChangePass = async () => {
        let res = await changePassword(oldPass, newPass);
        console.log(res)
        if (res && res.EC === 0) {
            toast.success(res.EM)
        }
        else {
            toast.error(res.EM);
            handleChangePass();
            setOldPass('');
            setNewPass('');
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
                    <div className="infor-user">
                        <span className="span1">{`Email: ${account.email}`}</span>
                        <span className="span1">{`Name: ${account.username}`}</span>
                        <span className="span1">{`Role: ${account.role}`}</span>
                    </div>

                    <button
                        className="update-username"
                        onClick={() => handleChangeName()}
                    > Change a Username ?</button>
                    {showChangeName === true ?
                        <div className="form-name">
                            <input
                                placeholder="New name"
                                onChange={(ev) => setUsername(ev.target.value)}
                            ></input>
                            <button
                                className="cancer"
                                onClick={() => setShowChangeName(false)}
                            >Cancer</button>
                            <button
                                className="change"
                                onClick={() => handleSave()}
                            >Change</button>
                        </div>
                        :
                        <></>
                    }

                    <button
                        className="update-username"
                        onClick={() => handleChangePass()}
                    > Change a Password ?</button>
                    {showChangePass === true ?
                        <div className="form-name">
                            <input
                                type="password"
                                placeholder="old pass"
                                onChange={(ev) => setOldPass(ev.target.value)}
                            ></input>
                            <input
                                type="password"
                                placeholder="New pass"
                                onChange={(ev) => setNewPass(ev.target.value)}
                            ></input>
                            <button
                                className="cancer"
                                onClick={() => setShowChangePass(false)}
                            >Cancer</button>
                            <button
                                className="change"
                                onClick={() => handleSaveChangePass()}
                            >Change</button>
                        </div>
                        :
                        <></>
                    }

                </div>
            </div>
            <div className="history">
                <button
                    onClick={() => setShowHistory(!showHistory)}
                >History of user</button>

                {showHistory === true ?
                    <HistoryUser/>:
                    <></>
                }
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