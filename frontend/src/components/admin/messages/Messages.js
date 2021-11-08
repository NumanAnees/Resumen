import React, { Component } from 'react'
import './Messages.scss';
import Grid from '@material-ui/core/Grid';
// Table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper'
//  db op
import { getAllMessages } from '../../../firestore/dbOperations';
import Collapse from '@material-ui/core/Collapse';
class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRow: null,
            rows: null,
        }
        this.createData = this.createData.bind(this);
    }
    // Return  Object with the data 
    createData(contact, email, date, more, message, name) {
        return { contact, email, date, more, message, name };
    }
    componentDidMount() {
        getAllMessages().then((data) => {
            console.log(data);
            if (data == null) {
                console.log("contacts is empty");
            } else {
                var dataToShow = []
                data.forEach((element) => {
                    dataToShow.push(
                        this.createData("imgHere", element.email, new Date(element.created_at.seconds*1000).toLocaleDateString("en"), <div className="dashboard_contactTable-showMessage">Show</div>, element.message, element.name),
                    )
                })
                this.setState({ rows: dataToShow })
            }
        })
    }
    render() {
        return (
            <div className="dashboard__contact">
                <div className="dashboard___contactHead">
                    <h1>All Contacts</h1>
                   
                </div>
                <div className="dashboard__contactTable">
                    {this.state.rows == null ? " No messages founds !" :
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Contact</TableCell>
                                        <TableCell align="right">Email</TableCell>
                                        <TableCell align="right">Created at</TableCell>
                                        <TableCell align="right">More</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.rows.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell   >
                                                {/* {row.contact} */}
                                                <div className="dashboard__ContactTable-circleImage">
                                                    {row.name !== undefined && row.name.substr(0, 1)}
                                                </div>
                                            </TableCell>
                                            <TableCell align="right">{row.email} </TableCell>
                                            <TableCell align="right">{row.date}
                                                <Collapse in={this.state.selectedRow == index ? true : false}>
                                                    {row.message}
                                                </Collapse>
                                            </TableCell>
                                            <TableCell onClick={() => { this.setState({ selectedRow: index }) }} align="right">{row.more}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    }
                </div>
            </div>
        )
    }
}
export default Messages;