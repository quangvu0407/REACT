import { useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';
import { ImSpinner3 } from 'react-icons/im'
import Language from '../Header/Language';
import { useTranslation} from 'react-i18next';

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const Dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false);
    const {t} = useTranslation();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleLogin = async () => {
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error(t("login.toast.invalidEmail"));
            return;
        }
        if (!password) {
            toast.error(t("login.toast.invalidPassword"));
            return;
        }
        setIsLoading(true)
        let data = await postLogin(email, password);

        if (data && data.EC === 0) {
            Dispatch(doLogin(data))
            toast.success(data.EM)
            setIsLoading(false)
            navigate('/')
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM)
            setIsLoading(false)
        }
    }

    const handleOnKeyDown = (event) => {
        console.log(event.key)
        if(event && event.key === 'Enter') {
            handleLogin();
        }
    }

    return (
        <div className="login-container">
            <div className="header">
                <span>{t("login.header.noAccount")}</span>
                <button
                    onClick={() => { navigate('/register') }}
                >{t("login.header.signup")}</button>
                <Language/> 
            </div>
            <div className="content col-4 mx-auto">
                <div className="title">
                    {t("login.title")}
                </div>
                <div className="welcome">
                    {t("login.welcome")}
                </div>

                <div className="content-form">
                    <div className="form-group">
                        <label>{t("form.email")}</label>
                        <input
                            type={"email"}
                            className="form-control"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder={t("form.emailPlaceholder")}
                        ></input>
                    </div>
                    <div className="form-group">
                        <label>{t("form.password")}</label>
                        <input
                            type={"password"}
                            className="form-control"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder={t("form.passwordPlaceholder")}
                            onKeyDown={(event) => handleOnKeyDown(event)}
                        ></input>
                    </div>
                    <span className='forgot-password'>{t("login.forgotPassword")}</span>
                    <div>
                        <button
                            className='btn-submit'
                            onClick={() => handleLogin()}
                            disabled={isLoading}
                        >
                            {isLoading === true &&<ImSpinner3 className='load-icon' /> }
                            <span>{t("login.login")}</span></button>
                    </div>
                    <div className='text-center'>
                        <span
                            className="back"
                            onClick={() => { navigate('/') }}
                        >{t("login.backHome")}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;