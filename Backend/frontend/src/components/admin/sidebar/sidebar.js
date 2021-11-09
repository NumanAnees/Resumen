import React, { Component } from 'react';
import DashboardImage from '../../../assets/dashboard.png'
import SettingsImage from '../../../assets/settings.png'
import UsersImage from '../../../assets/user-white.png'
import HomeImage from '../../../assets/home.png'
import LogoutImage from '../../../assets/logout.png'
import './sidebar.scss'
import ReturnImage from '../../../assets/logout.png';
import MessageImage from '../../../assets/message.png'
import fire from '../../../conf/fire'
import { Link } from 'react-router-dom';
class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    handleLogout() {
        fire.auth().signOut();
    }
    render() {
        return (
            <div className={this.props.openSidebarClicked ? "sidebar-wrapper sidebar-wrapper-open" : "sidebar-wrapper"}  >
                {/* Sidebar */}
                <div className="sidebar">
                    {/* Head */}
                    <div className="sidebar__head">
                        <span className="sidebar__head-brand">
                            Resumen Admin
                     </span>
                    </div>
                    {/* Devider */}
                    {/* Body */}
                    <hr className="sidebar__devider" />
                    {/*  Navigation items */}
                    <ul className="sidebar__navigationList">
                        <li className="sidebar__navigationList-item">
                            <img src={HomeImage} className="sidebar__navigationList-icon" />
                            <Link to={{pathname:"/"}}  className="sidebar-navigatioList-itemLink" > Home</Link>
                        </li>
                        <li className="sidebar__navigationList-item">
                            <img src={DashboardImage} className="sidebar__navigationList-icon" />
                            <Link to={{pathname:"/adm/dashboard"}}  className="sidebar-navigatioList-itemLink" > Dashboard</Link>

                        </li>
                        <li className="sidebar__navigationList-item">
                            <img src={SettingsImage} className="sidebar__navigationList-icon" />
                            <Link to={{pathname:"/adm/settings"}}  className="sidebar-navigatioList-itemLink" > Settings</Link>
                        </li>
                        <li className="sidebar__navigationList-item">
                            <img src={UsersImage} className="sidebar__navigationList-icon" />
                           
                            <Link to={{pathname:"/adm/users"}}  className="sidebar-navigatioList-itemLink" > Users Manager</Link>

                        </li>
                        <li className="sidebar__navigationList-item">
                            <img src={MessageImage} className="sidebar__navigationList-icon" />
                            <Link to={{pathname:"/adm/messages"}}  className="sidebar-navigatioList-itemLink" >  Messages</Link>

                        </li>
                        <li onClick={() => this.handleLogout()} className="sidebar__navigationList-item">
                            <img src={LogoutImage} className="sidebar__navigationList-icon" />
                            <a href="" className="sidebar-navigatioList-itemLink">Logout</a>
                        </li>
                    </ul>                {/* Footer */}
                    <div className="sidebar__footer">
                        {/* Account Status */}
                        {/* Profile */}
                        {/* <SidebarProfile /> */}
                        <div className="btnToggler" onClick={() => { this.props.handleSidebarExit() }}>
                            <img src={ReturnImage} alt="Close menu" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Sidebar;