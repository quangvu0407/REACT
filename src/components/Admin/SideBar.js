import 'react-pro-sidebar/dist/css/styles.css';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaGem, FaGithub } from 'react-icons/fa';
import sidebarBg from '../../assets/bg2.jpg';
import './SideBar.scss';

import { DiReact } from 'react-icons/di';
import { useTranslation } from 'react-i18next';

const SideBar = (props) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { collapsed, toggled, handleToggleSidebar } = props;

    return (
        <div>
            <ProSidebar
                image={sidebarBg}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <DiReact size={'3em'} color={"00bfff"} />
                        <span onClick={() => navigate('/')}>Quang Quang</span>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem icon={<FaTachometerAlt />}>
                            {t("sidebar.dashboard")}
                            <Link to="/admins" />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu icon={<FaGem />} title={t("sidebar.features")}>
                            <MenuItem>
                                {t("sidebar.manageUser")}
                                <Link to="/admins/manage-user" />
                            </MenuItem>
                            <MenuItem>
                                {t("sidebar.manageQuiz")}
                                <Link to="/admins/manage-quizzes" />
                            </MenuItem>
                            <MenuItem>
                                {t("sidebar.manageQuestion")}
                                <Link to="/admins/manage-questions" />
                            </MenuItem>
                        </SubMenu>
                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div className="sidebar-btn-wrapper" style={{ padding: '20px 24px' }}>
                        <a
                            href="https://github.com/azouaoui-med/react-pro-sidebar"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <FaGithub />
                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                {t("sidebar.viewSource")}
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </div>
    )
}
export default SideBar;
