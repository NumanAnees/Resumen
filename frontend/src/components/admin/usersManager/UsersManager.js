import { Button, Grid, TextField } from '@material-ui/core';
import React, { Component } from 'react';
import './UsersManager.scss';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getAllUsers, getUserById } from '../../../firestore/dbOperations';
import MoreImage from '../../../assets/more.png'
import { Redirect } from 'react-router';
class UsersManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showUsers: false,
            rows: null,
            isRedirectToUser: false,
            enteredUser: null,
            /// Selected User data,
            selectedId: null,
            selectedEmail: null,
            selectedSubscription: null,
            selectedSubscriptionEnd: null
        }
        this.rows = [
            this.createData('x28839283', "ja3tar@gmail.com", "Premium"),
        ];
        this.createData = this.createData.bind(this);
        this.showTable = this.showTable.bind(this);
        this.redirectToUser = this.redirectToUser.bind(this);
        this.findUserById = this.findUserById.bind(this);
        this.handlInput = this.handlInput.bind(this);
    }
    createData(id, email, subscription, more) {
        return { id, email, subscription, more };
    }
    // change the state to show the table and also get the data 
    showTable() {
        var Rows = []
        getAllUsers().then((value) => {
            value.forEach((element) => {
                console.log(element);
                Rows.push(
                    this.createData(element.userId, element.email !== undefined ? element.email : "Not Provided", element.membership !== undefined ? element.membership : "Basic", <img onClick={() => this.redirectToUser(element.userId, element.email, element.membership, element.membershipsEnds)} className="moreImage" src={MoreImage} />),
                )
            })
            this.setState({ rows: Rows })
        })
        this.setState({ showUsers: true })
    }
    // Redirect to user page with its data
    redirectToUser(id, email, subscription, subscriptionEnd) {
        this.setState({
            isRedirectToUser: true,
            selectedId: id,
            selectedEmail: email,
            selectedSubscription: subscription,
            selectedSubscriptionEnd: subscriptionEnd
        })
    }
    /// Find user by id 
    findUserById() {
        getUserById(this.state.enteredUser).then((element) => {
            console.log(element);
            if (element == false) {
                alert("User not found please verify id!")
            } else {
                var Rows = []
                Rows.push(
                    this.createData(element.userId, element.email !== undefined ? element.email : "Not Provided", element.membership, <img onClick={() => this.redirectToUser(element.userId, element.email, element.membership, element.membershipsEnds)} className="moreImage" src={MoreImage} />),
                )
                this.setState({ showUsers: true, rows: Rows })
            }
        })
    }
    handlInput(inputName, event) {
        switch (inputName) {
            case "enteredUser":
                this.setState({
                    enteredUser: event.target.value
                })
                break;
            default:
                break;
        }
    }
    render() {
        return (
            <div className="users">
                {this.state.isRedirectToUser && <Redirect to={{
                    pathname: "/adm/user/ss", state: {
                        userId: this.state.selectedId,
                        email: this.state.selectedEmail,
                        membership: this.state.selectedSubscription,
                        membershipEnd: this.state.selectedSubscriptionEnd
                    }
                }} />}
                <Grid className="users__container" container >
                    <Grid item md={6} lg={6} sm={12}>
                        <div className="users__heading">
                            <h1>Users Manager</h1>
                            <p>Here you can change manage all of your users. add/edit subscriptions and more. </p>
                        </div>
                    </Grid>
                    <Grid item md={6} lg={6} sm={12}>
                        <div className="users__search">
                            <p>Enter user email </p>
                            <TextField onChange={(event) => { this.handlInput("enteredUser", event) }} variant="outlined" label="User email" />
                            <Button onClick={() => { this.findUserById() }} className="searchButton" variant="contained" color="primary">
                                Search
                              </Button>
                        </div>
                    </Grid>
                    {/* Table */}
                    <Grid className="users__all" item md={12} >
                        {
                            this.state.showUsers == false ?
                                <div className="show__users">
                                    <Button onClick={() => this.showTable()} variant="outlined">Show users</Button>
                                </div>
                                :
                                <TableContainer component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>User Id</TableCell>
                                                <TableCell align="right">Email</TableCell>
                                                <TableCell align="right">Subscription</TableCell>
                                                <TableCell align="right">More</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.state.rows != null && this.state.rows.map((row) => (
                                                <TableRow key={row.id}>
                                                    <TableCell component="th" scope="row">
                                                        {row.id}
                                                    </TableCell>
                                                    <TableCell align="right">{row.email}</TableCell>
                                                    <TableCell align="right">{row.subscription}</TableCell>
                                                    <TableCell align="right">{row.more}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                        }
                    </Grid>
                </Grid>
            </div>
        )
    }
}
export default UsersManager;
