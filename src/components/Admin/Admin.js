import SideBar from "./SideBar";
import './Admin.scss';
import { FaHeart, FaBars } from 'react-icons/fa';
import { useState } from "react";
import { Outlet } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';
import Language from "../Header/Language";
const Admin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { t } = useTranslation();
    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed} />
            </div>

            <div className="admin-content">
                <div className="admin-header">
                    <span onClick={() => setCollapsed(!collapsed)}>
                        <FaBars className="leftside" />
                    </span>
                    <div className="rightside">
                        <Language />
                        <NavDropdown title={t("header.setting")} id="basic-nav-dropdown" className="custom-dropdown">
                            <NavDropdown.Item >{t("header.profile")}</NavDropdown.Item>
                            <NavDropdown.Item >{t("header.logout")}</NavDropdown.Item>
                        </NavDropdown>
                    </div>

                    {/* <FaBars onClick={() => setCollapsed(!toggled)} /> */}
                </div>

                <div className="admin-main">
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>

            </div>

        </div >
    )
}

export default Admin;