import React, { Component } from 'react';
import Sidebar from './sidebar/sidebar';
import './Admin.scss';
import Dashboard from './dashboard/dashboard';
import ProfileImage from '../../assets/user.png'
import {
    Route,
} from "react-router-dom";
import Settings from './settings/Settings';
import UserEdit from './userEdit/UserEdit';
import UsersManager from './usersManager/UsersManager';
import Messages from './messages/Messages';
import fire from '../../conf/fire'
import conf from '../../conf/configuration'
class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openSidebarClicked: false,
            user: null,
            showAdm: false
        }
        this.handleSidebarToggle = this.handleSidebarToggle.bind(this)
        this.handleSidebarExit = this.handleSidebarExit.bind(this);
        this.authListener = this.authListener.bind(this);
    }
    handleSidebarToggle() {
        this.setState({
            openSidebarClicked: true
        })
    }
    handleSidebarExit() {
        this.setState({
            openSidebarClicked: false
        })
    }
    componentDidMount() {
        this.authListener();
    }
    /// Check if the user is authenticated
    authListener() {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user: user.uid })
                localStorage.setItem('user', user.uid);
                /// Checking if user ad
                if (user.email === conf.adminEmail) {
                    // is  admin show confirmation
                    this.setState({ showAdm: true })
                } else {
                    // not an admin redirect away
                    this.setState({ user: null })
                    localStorage.removeItem("user");
                    window.location.href = '/';
                }
            } else {
                // not an admin redirect away
                this.setState({ user: null })
                localStorage.removeItem("user");
                window.location.href = '/';
            }
        })
    }
    render() {
        return (
            <div className="admin">
                {this.state.showAdm == true && <>
                    {/*  left side */}
                    <div className="admin__left">
                        <Sidebar handleSidebarExit={this.handleSidebarExit} openSidebarClicked={this.state.openSidebarClicked} />
                    </div>
                    <div className="admin__right">
                        {/* Navbar */}
                        <div className="admin__navbar">
                            <div className="admin__navbar-left">
                                <span>Dashboard</span>
                            </div>
                            <div className="admin__navbar-right">
                                <div className="admin__navbar-user">
                                    <img src={ProfileImage} alt="kk" />
                                    <span>Welcome Back</span>
                                </div>
                                <a onClick={() => this.handleSidebarToggle()} className="admin__mobileToggle"> Open </a>
                            </div>
                        </div>
                        <Route exact path="/adm/dashboard" component={Dashboard} />
                        <Route exact path="/adm/settings" component={Settings} />
                        <Route exact path="/adm/user/ss" component={UserEdit} />
                        <Route exact path="/adm/users" component={UsersManager} />
                        <Route exact path="/adm/messages" component={Messages} />
                    </div>
                </>}
            </div>
        )
    }
}
export default Admin;