import React, { Component } from 'react';
import './dashboard.scss';
import DollarImage from '../../../assets/dashboard/dollar.png'
import UsersImage from '../../../assets/dashboard/user.png'
import NoMoneyImage from '../../../assets/no-money.png';
import ResumesImage from '../../../assets/dashboard/document.png'
import DownArrow from '../../../assets/down-arrow.png';
import { getStats, getAllSubscriptions,getEarnings } from '../../../firestore/dbOperations';
import { Redirect } from 'react-router';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            numberOfUsers: 0,
            numberOfResumes: 0,
            numberOfDownloads: 0,
            earnings:0,
            users: [],
            userEditOpen: false,
            redirectToUser: false,
            clickedUser: null,
            clickedUserEmail: null,
            clickedUserMembership: null,
            clickedUserMembershipEnd: null,
            // 
            subscriptions: null,
            rows: null
        }
        this.users = [{ type: "premium" }, { type: "free" }, { type: "free" }, { type: "premium" }, { type: "premium" }, { type: "premium" }, { type: "premium" }]
        this.returnUsers = this.returnUsers.bind(this);
    }
    componentDidMount() {
        getStats().then((value) => {
            this.setState({
                numberOfUsers: value !== undefined ? value.numberOfUsers : 0,
                numberOfResumes: value !== undefined ? value.numberOfResumesCreated : 0,
                numberOfDownloads: value !== undefined ? value.numberOfResumesDownloaded : 0
            })
        });
        getAllSubscriptions().then((element) => {
            var subscriptionsRows = [];
            if (!element) {
                this.setState({
                    subscriptions: false
                })
            } else {
                // Found subscriptions and we need to add them to row state to display it 
                element.forEach(sub => {
                    console.log(sub);
                    subscriptionsRows.push(
                        this.createData(sub.userId, sub.type, sub.sbsEnd.toDate().toDateString(), sub.paimentType)
                    )
                });
            }
            this.setState({ rows: subscriptionsRows })
        }
        )
        getEarnings().then((value)=>{
            if(value !=null){
                this.setState({earnings: value.amount})
            }else{
                // no earnings object found
            }
        })
    }
    returnUsers() {
        if (this.state.subscriptions == false) {
            return (
                <div className="subscriptions__notfound">
                    <img src={NoMoneyImage} />
                    <h2>No Subscriptions Found</h2>
                </div>
            )
        }
        return (
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>User Id</TableCell>
                            <TableCell align="right">Duration</TableCell>
                            <TableCell align="right">Expiration Date</TableCell>
                            <TableCell align="right">Paiment Method</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.rows != null && this.state.rows.map((row) => (
                            <TableRow >
                                <TableCell component="th" scope="row">{row.id}</TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.subscription}</TableCell>
                                <TableCell align="right">{row.type}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
    createData(id, email, subscription, type) {
        return { id, email, subscription, type };
    }
    render() {
        return (
            <div className="dashboard">
                {this.state.redirectToUser == true &&
                    <Redirect to={{
                        pathname: "/adm/user/ss",
                        state: {
                            userId: this.state.clickedUser,
                            email: this.state.clickedUserEmail,
                            membership: this.state.clickedUserMembership,
                            membershipEnd: this.state.clickedUserMembershipEnd
                        }
                    }} />}
                {/* Summary cards */}
                <div className="dashboard__SummaryCards">
                    {/* Card */}
                    <div className="dashboard__SummaryCard">
                        {/* Leftside Icon */}
                        <div className="dashboard__SummaryCard-left">
                            <img src={DollarImage} alt="Dolllar image" />
                        </div>
                        {/* Rightside */}
                        <div className="dashboard__SummaryCard-right">
                            <span>Earnings</span>
                            <span>{this.state.earnings}$</span>
                        </div>
                    </div>
                    {/* Card */}
                    <div className="dashboard__SummaryCard">
                        {/* Leftside Icon */}
                        <div className="dashboard__SummaryCard-left">
                            <img src={UsersImage} alt="Dolllar image" />
                        </div>
                        {/* Rightside */}
                        <div className="dashboard__SummaryCard-right">
                            <span>Users</span>
                            <span>{this.state.numberOfUsers}</span>
                        </div>
                    </div>
                    {/* Card */}
                    <div className="dashboard__SummaryCard">
                        {/* Leftside Icon */}
                        <div className="dashboard__SummaryCard-left">
                            <img src={ResumesImage} alt="Dolllar image" />
                        </div>
                        {/* Rightside */}
                        <div className="dashboard__SummaryCard-right">
                            <span>Resumes</span>
                            <span>{this.state.numberOfResumes}</span>
                        </div>
                    </div>
                    {/* Card */}
                    <div className="dashboard__SummaryCard">
                        {/* Leftside Icon */}
                        <div className="dashboard__SummaryCard-left">
                            <img src={DownArrow} alt="Dolllar image" />
                        </div>
                        {/* Rightside */}
                        <div className="dashboard__SummaryCard-right">
                            <span>Downloads</span>
                            <span>{this.state.numberOfDownloads}</span>
                        </div>
                    </div>
                </div>
                {/* Table users  */}
                <div className="dashboardTable">
                    <h2>Last Subscriptions</h2>
                    {this.returnUsers()}
                    {/* Return subscription */}
                </div>
            </div>
        )
    }
}
export default Dashboard;