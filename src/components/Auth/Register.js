import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import './Register.scss'
import { postRegister } from "../../services/apiServices";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const navigate = useNavigate()

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
            toast.error("invalid email");
            return;
        }
        if (!password) {
            toast.error("invalid password");
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
                <span>You have an account yet?</span>
                <button
                    onClick={() => { navigate('/login') }}
                >Login</button>
            </div>
            <div className="content  col-4 mx-auto">
                <div className="title">
                    SIGN UP
                </div>
                <div className="welcome">
                    Create a new account ?
                </div>
                <div className="content-form">
                    <div className="form-group">
                        <label >Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="Nhập Email..."
                        ></input>
                    </div>
                    <div className="form-group">
                        <label>UserName</label>
                        <input
                            type="username"
                            className="form-control"
                            value={userName}
                            onChange={(event) => setUserName(event.target.value)}
                            placeholder="Nhập UserName..."
                        ></input>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Nhập Password..."
                        ></input>
                    </div>
                    <div>
                        <button
                            className='btn-submit'
                            onClick={() => handleRegister()}
                        >Sign up</button>
                    </div>
                    <div className='text-center'>
                        <span
                            className="back"
                            onClick={() => { navigate('/') }}
                        >&#60;&#60; back</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register;