import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import './Register.scss'
import { postRegister } from "../../services/apiServices";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import Language from "../Header/Language";
import { useTranslation} from 'react-i18next';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const navigate = useNavigate();
     const {t} = useTranslation();

    const [isShowPassword, setIsShowPassword] = useState(false);

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleRegister = async () => {
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error(t("login.toast.invalidEmail"));
            return;
        }
        if (!password) {
            toast.error(t("login.toast.invalidPassword"));
            return;
        }
        let data = await postRegister(email, userName, password);

        if (data && data.EC === 0) {
            toast.success(data.EM)
            navigate('/login')
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }

    return (
        <div className="register-container">
            <div className="header">
                <span>{t("register.header.haveAccount")}</span>
                <button
                    onClick={() => { navigate('/login') }}
                >{t("login.login")}</button>
                <Language/> 
            </div>
            <div className="content  col-4 mx-auto">
                <div className="title">
                    {t("register.title")}
                </div>
                <div className="welcome">
                    {t("register.welcome")}
                </div>
                <div className="content-form">
                    <div className="form-group">
                        <label >{t("form.email")}</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder={t("form.emailPlaceholder")}
                        ></input>
                    </div>
                    <div className="form-group">
                        <label>{t("form.username")}</label>
                        <input
                            type="username"
                            className="form-control"
                            value={userName}
                            onChange={(event) => setUserName(event.target.value)}
                            placeholder={t("form.usernamePlaceholder")}
                        ></input>
                    </div>
                    <div className='form-group pass-group'>
                        <label>{t("form.password")}</label>
                        <input
                            type={isShowPassword ? "text" : "password"}
                            className="form-control"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder={t("form.passwordPlaceholder")}
                        />
                        {isShowPassword ? (
                            <span
                                className="icons-eyes"
                                onClick={() => setIsShowPassword(false)}
                            >
                                <VscEye />
                            </span>
                        ) : (
                            <span
                                className="icons-eyes"
                                onClick={() => setIsShowPassword(true)}
                            >
                                <VscEyeClosed />
                            </span>
                        )}
                    </div>
                    <div>
                        <button
                            className='btn-submit'
                            onClick={() => handleRegister()}
                        >{t("register.button.signup")}</button>
                    </div>
                    <div className='text-center'>
                        <span
                            className="back"
                            onClick={() => { navigate('/') }}
                        >{t("register.backHome")}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register;