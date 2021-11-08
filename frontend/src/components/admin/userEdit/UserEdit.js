import { Grid, TextField, MenuItem, Button } from '@material-ui/core';
import React, { Component } from 'react';
import './UserEdit.scss';
import { editUser ,getUserById} from '../../../firestore/dbOperations'
class UserEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:   "",  //this.props.location.state.email,
            userId:  this.props.location.state.userId,
            subscription:   "", // this.props.location.state.subscription == undefined ? "Basic" : this.props.location.state.subscription,
            subscriptionEnd:   "", //this.props.location.state.membershipEnd == undefined ? "0/0/0" : this.props.location.state.membershipEnd
        }
        this.editSelectedUser = this.editSelectedUser.bind(this);
        this.handleInputs = this.handleInputs.bind(this);
        this.formatDate =this.formatDate.bind(this)
    }
    editSelectedUser(userId, email, membership, membershipsEnds) {
        try {
            editUser(userId, email, membership, membershipsEnds)
            console.log(membershipsEnds);
        } catch (error) {
            alert("Error occured. please check the entered fields!")
        }
     
    }
    handleInputs(inputName, inputValue) {
        switch (inputName) {
            case "userId":
                this.setState({ userId: inputValue })
                break;
            case "subscription":
                this.setState({ subscription: inputValue })
                break;
            case "email":
                this.setState({ email: inputValue })
                break;
            case "subscriptionEnd":
                this.setState({ subscriptionEnd: inputValue })
                break;
            default:
                break;
        }
    }
    componentWillMount(){
        getUserById(this.props.location.state.email).then((data)=>{
            console.log( new Date(data.membershipEnds.seconds*1000).toISOString() .split('T')[0])
            this.setState({
                email:data.email,
                subscription:data.membership,
                subscriptionEnd: this.formatDate( new Date(data.membershipEnds.seconds*1000).toISOString().split('T')[0])
                
            })
        })
    }

     formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

    
        return [day, month, year].join('-');
    }
 
    
    render() {
        return (
            <div className="user">
                {/* {this.props.location.state.userId} */}
                <div className="user_pageHead">
                    <h2>Edit user</h2>
                    <p>You can change all the details of this user bellow</p>
                </div>
                <Grid container direction="row">
                    {/* Left side */}
                    <Grid container className="user__left" item xs={12} md={12}>
                        {/* User id */}
                        <TextField onChange={(event) => { this.handleInputs("userId", event.target.value) }} className="user__input" value={this.state.userId} id="outlined-basic" label="User id" fullWidth variant="outlined" />
                        <TextField onChange={(event) => { this.handleInputs("email", event.target.value) }} className="user__input" value={this.state.email} id="outlined-basic" label="Email" fullWidth variant="outlined" />
                        {/* User membership */}
                        <TextField value={this.state.subscription} onChange={(event) => { this.handleInputs("subscription", event.target.value) }} className="user__input" select id="outlined-basic" label="Subscription" fullWidth variant="outlined" >
                            {/* user email */}
                            <MenuItem key={1} value={"Basic"}>
                                Basic
                        </MenuItem>
                            <MenuItem key={2} value={"Premium"}>
                                Premium
                        </MenuItem>
                        </TextField>
                        {/* Date picker  */}
                        <TextField
                            id="date"
                            label="Subscription end"
                            className="user__input"
                            fullWidth
                            type="date"
                            value={this.state.membershipEnd}
                            onChange={(event) => { this.handleInputs("subscriptionEnd", event.target.value) }}
                            defaultValue={this.state.membershipEnds !== undefined && this.state.membershipEnds}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                        />
                        <Button onClick={() => { this.editSelectedUser(this.state.userId, this.state.email, this.state.subscription, this.state.subscriptionEnd) }} className="user__button" variant="contained" color="primary">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}
export default UserEdit;