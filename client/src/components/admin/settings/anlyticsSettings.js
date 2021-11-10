import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { editTrackingCode ,getWebsiteData} from "../../../firestore/dbOperations";
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
class AnalyticsSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trackingCode: "",
      isSuccesShowed: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.saveWebsiteMetaData = this.saveWebsiteMetaData.bind(this)
  }
  componentDidMount() {
     getWebsiteData().then((data) => {
      this.setState({ trackingCode:data.trackingCode})
    })
  }
  handleChange(event, inputName) {
    switch (inputName) {
      case "Tracking Code":
        this.setState({ trackingCode: event.target.value })
        break;
      default:
        break;
    }
  }
  saveWebsiteMetaData() {
    editTrackingCode(this.state.trackingCode)
  }
  render() {
    return (
      <div className="website__Settings">
        <h2>Analytics Settings</h2>
        <p>Here you can add your Google analytics tracking code to keep track of your website.</p>
        <Collapse in={this.state.isSuccesShowed}>
          <Alert onClose={() => { this.setState(prevState => ({ isSuccesShowed: !prevState.isSuccesShowed })) }}>Socia Links has been changed succefully!</Alert>
        </Collapse>
        <form>
          <TextField placeholder={this.state.facebook} fullWidth className="settings__input" onChange={(event) => this.handleChange(event, "Tracking Code")} label={ "Tracking Code" } value={this.state.trackingCode} variant="outlined" />
          <div className="settings__formAction">
            <Button onClick={() => this.saveWebsiteMetaData()} variant="contained" color="primary">
              Save
           </Button>
          </div>
        </form>
      </div>
    )
  }
}
export default AnalyticsSettings