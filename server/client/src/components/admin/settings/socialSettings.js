import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { getSocialLinks, addSocial } from "../../../firestore/dbOperations";
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
class SocialSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      facebook: "",
      instagram: "",
      twitter: "",
      pinterest: "",
      youtube: "",
      isSuccesShowed: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.saveWebsiteMetaData = this.saveWebsiteMetaData.bind(this)
  }
  componentDidMount() {
    getSocialLinks().then((element) => {
      if (element) {
        this.setState({
          facebook: element.facebook,
          instagram: element.instagram,
          twitter: element.twitter,
          pinterest: element.pinterest,
          youtube: element.youtube,
        })
      }
    })
  }
  handleChange(event, inputName) {
    switch (inputName) {
      case "facebook":
        this.setState({ facebook: event.target.value })
        break;
      case "instagram":
        this.setState({ instagram: event.target.value })
        break;
      case "twitter":
        this.setState({ twitter: event.target.value })
        break;
      case "pinterest":
        this.setState({ pinterest: event.target.value })
        break;
      case "youtube":
        this.setState({ youtube: event.target.value })
        break;
      default:
        break;
    }
  }
  saveWebsiteMetaData() {
    this.setState({ isSuccesShowed: true })
    addSocial(this.state.facebook, this.state.twitter, this.state.instagram, this.state.youtube, this.state.pinterest)
  }
  render() {
    return (
      <div className="website__Settings">
        <h2>Social Links</h2>
        <p>Here you can add your social media links.</p>
        <Collapse in={this.state.isSuccesShowed}>
          <Alert onClose={() => { this.setState(prevState => ({ isSuccesShowed: !prevState.isSuccesShowed })) }}>Socia Links has been changed succefully!</Alert>
        </Collapse>
        <form>
          <TextField placeholder={this.state.facebook} fullWidth className="settings__input" onChange={(event) => this.handleChange(event, "facebook")} label="Facebook" variant="outlined" />
          <TextField placeholder={this.state.instagram} multiline fullWidth className="settings__input" onChange={(event) => this.handleChange(event, "instagram")} label="Instagram" variant="outlined" />
          <TextField placeholder={this.state.twitter} fullWidth className="settings__input" onChange={(event) => this.handleChange(event, "twitter")} label="Twitter" variant="outlined" />
          <TextField placeholder={this.state.pinterest} fullWidth className="settings__input" onChange={(event) => this.handleChange(event, "pinterest")} label="Pinterest" variant="outlined" />
          <TextField placeholder={this.state.youtube} fullWidth className="settings__input" onChange={(event) => this.handleChange(event, "youtube")} label="Youtube" variant="outlined" />
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
export default SocialSettings