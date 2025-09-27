import { useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';
import { ImSpinner3 } from 'react-icons/im'
import Language from '../Header/Language';

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const Dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false);

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
            toast.error("invalid email");
            return;
        }
        if (!password) {
            toast.error("invalid password");
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
                <span>Don't have an account yet?</span>
                <button
                    onClick={() => { navigate('/register') }}
                >Sign up</button>
                <Language/> 
            </div>
            <div className="content col-4 mx-auto">
                <div className="title">
                    LOGIN
                </div>
                <div className="welcome">
                    Hello, Who's this?
                </div>

                <div className="content-form">
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type={"email"}
                            className="form-control"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder='Nhập email...'
                        ></input>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type={"password"}
                            className="form-control"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder='Nhập Password...'
                            onKeyDown={(event) => handleOnKeyDown(event)}
                        ></input>
                    </div>
                    <span className='forgot-password'>Forgot a password</span>
                    <div>
                        <button
                            className='btn-submit'
                            onClick={() => handleLogin()}
                            disabled={isLoading}
                        >
                            {isLoading === true &&<ImSpinner3 className='load-icon' /> }
                            <span>Login</span></button>
                    </div>
                    <div className='text-center'>
                        <span
                            className="back"
                            onClick={() => { navigate('/') }}
                        > &#60;&#60; Go to Homepage</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;