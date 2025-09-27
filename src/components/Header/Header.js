import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { doLogOut } from '../../redux/action/userAction';
import Language from './Language';
import { useTranslation, Trans } from 'react-i18next';

const Header = () => {
    const account = useSelector(state => state.user.account)
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const navigate = useNavigate();
    const Dispatch = useDispatch();
    const {t} = useTranslation();
    const handleLogin = () => {
        navigate("/login")
    }
    const handleRegister = () => {
        navigate("/register")
    }

    const handleLogOut = async () => {
        let res = await logOut(account.email, account.refresh_token);
        if (res && res.EC === 0) {
            Dispatch(doLogOut())
            navigate("/login")
        }
        else {
            toast.error(res.EM)
        }
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <NavLink to="/" className="navbar-brand">QuangPro</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className="nav-link">{t("header.home")}</NavLink>
                        <NavLink to="/users" className="nav-link">{t("header.user")}</NavLink>
                        <NavLink to="/admins" className="nav-link ">{t("header.admin")}</NavLink>
                    </Nav>
                    <Nav>
                        {isAuthenticated === false ?
                            <>
                                <button className='btn-login' onClick={() => handleLogin()}>{t("header.login")}</button>
                                <button className='btn-signup' onClick={() => handleRegister()}>{t("header.signup")}</button>
                            </>
                            :
                            <NavDropdown title={t("header.setting")} id="basic-nav-dropdown" className="custom-dropdown">
                                <NavDropdown.Item >{t("header.profile")}</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => handleLogOut()}>{t("header.logout")}</NavDropdown.Item>
                            </NavDropdown>
                        }
                        <Language/>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;