import { useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiServices';
import { toast } from 'react-toastify';
const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const handleLogin = async () => {
        let data = await postLogin(email, password);

        if (data && data.EC === 0) {
            toast.success(data.EM)
            navigate('/')
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }
    console.log(navigate)

    return (
        <div className="login-container">
            <div className="header">
                <span>Don't have an account yet?</span>
                <button
                    onClick={() => { navigate('/register') }}
                >Sign up</button>
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
                        ></input>
                    </div>
                    <span className='forgot-password'>Forgot a password</span>
                    <div>
                        <button
                            className='btn-submit'
                            onClick={() => handleLogin()}
                        >Login</button>
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