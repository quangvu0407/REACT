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
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from 'react-icons/fa';
import sidebarBg from '../../assets/bg2.jpg';
import './SideBar.scss';

import { DiReact } from 'react-icons/di';
import { MdDashboard } from 'react-icons/md';
const SideBar = (props) => {
    const navigate = useNavigate();
    const { image, collapsed, toggled, handleToggleSidebar } = props;
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
                        <DiReact size={'3em'} color={"00bfff"}/>
                        <span onClick={() => navigate('/')}>Quang Quang</span>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<FaTachometerAlt />}
                        // suffix={<span className="badge red">New</span>}
                        >
                            dashboard
                            <Link to="/admins" />
                        </MenuItem>
                        {/* <MenuItem icon={<FaGem />}> components</MenuItem> */}
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            // suffix={<span className="badge yellow">3</span>}
                            // icon={<FaRegLaughWink />}
                            icon={<FaGem />}
                            title={"Features"}
                        >
                            <MenuItem>
                                Quản lý User
                                <Link to="/admins/manage-user" />
                            </MenuItem>
                            <MenuItem>
                                Quản lý bài Quiz
                                <Link to="/admins/manage-quizzes" />
                            </MenuItem>
                            <MenuItem>
                                Quản lý câu hỏi
                            </MenuItem>
                        </SubMenu>

                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="https://github.com/azouaoui-med/react-pro-sidebar"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <FaGithub />
                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                viewSource
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>

        </div>
    )
}
export default SideBar;