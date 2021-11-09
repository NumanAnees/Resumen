import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import { getSubscriptionStatus, setSubscriptionsData } from '../../../firestore/dbOperations'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
class SubscriptionSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            websiteTitle: "",
            checkedSubscriptions: false,
            checkedOnlyPP:false,
            monthlyPrice: 0,
            quartarlyPrice: 0,
            yearlyPrice: 0,
            isSuccessOpen: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubscriptionToggleChange = this.handleSubscriptionToggleChange.bind(this);
        this.handlePPCheckedChange = this.handlePPCheckedChange.bind(this)
        this.submitHandler = this.submitHandler.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleChange(event, inputName) {
        switch (inputName) {
            case "monthly":
                this.setState({ monthlyPrice: event.target.value })
                break;
            case "quartarly":
                this.setState({ quartarlyPrice: event.target.value })
                break;
            case "yearly":
                this.setState({ yearlyPrice: event.target.value })
                break;
            default:
                break;
        }
    }
    handleSubscriptionToggleChange() {
        this.setState((prevState) => ({ checkedSubscriptions: !prevState.checkedSubscriptions }))
        
    }
    handlePPCheckedChange(){
        this.setState((prevState) => ({ checkedOnlyPP: !prevState.checkedOnlyPP }))
    }
    componentDidMount() {
        this.state.monthlyPrice == 0 && getSubscriptionStatus().then((data) =>
            this.setState({
                checkedSubscriptions: data.state,
                monthlyPrice: data.monthlyPrice,
                quartarlyPrice: data.quartarlyPrice,
                yearlyPrice: data.yearlyPrice,
                checkedOnlyPP: data.onlyPP == undefined ? false : data.onlyPP

            })
        )
    }
    submitHandler() {
        setSubscriptionsData(this.state.checkedSubscriptions, this.state.monthlyPrice, this.state.quartarlyPrice, this.state.yearlyPrice,this.state.checkedOnlyPP)
        this.setState({ isSuccessOpen: true })
    }
    handleClose() {
        this.setState({ isSuccessOpen: false })
    }
    render() {
        return (
            <div className="website__Settings">
                <h2>Subscriptions Settings
                <Switch
                        checked={this.state.checkedSubscriptions}
                        onChange={this.handleSubscriptionToggleChange}
                        name="checkedA"
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                </h2>
                <p>Here you can change Subscriptions settings..</p>
                <form>
                    <div className="subscription__toggle">
                        <TextField
                            onChange={(event) => this.handleChange(event, "monthly")}
                            fullWidth
                            disabled={this.state.checkedSubscriptions == false ? true : false}
                            className="settings__input"
                            id="outlined-number"
                            label="Monthly Price"
                            placeholder={this.state.monthlyPrice.toString()}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            onChange={(event) => this.handleChange(event, "quartarly")}
                            disabled={this.state.checkedSubscriptions == false ? true : false}
                            className="settings__input"
                            id="outlined-number"
                            label="6 Months Price"
                            placeholder={this.state.quartarlyPrice.toString()}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            onChange={(event) => this.handleChange(event, "yearly")}
                            disabled={this.state.checkedSubscriptions == false ? true : false}
                            className="settings__input"
                            id="outlined-number"
                            label="1 Year  Price"
                            placeholder={this.state.yearlyPrice.toString()}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                        />
                    </div>
                    <span className="settings__input">
                        Accept only paypal
                    </span>
                    <Switch
                        checked={this.state.checkedOnlyPP}
                        onChange={this.handlePPCheckedChange}
                        name="checkedA"
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />

                    <div className="settings__formAction">
                        <Button onClick={() => this.submitHandler()} variant="contained" color="primary">
                            Save
           </Button>
                    </div>
                </form>
                <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={this.state.isSuccessOpen} autoHideDuration={3000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="success">
                        Subscription data saved!
                   </Alert>
                </Snackbar>
            </div>
        )
    }
}
export default SubscriptionSetting