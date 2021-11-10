import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { getWebsiteData, settWebsiteData } from "../../../firestore/dbOperations";
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
class WebsiteSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      websiteTitle: "",
      websiteDescription: "",
      websiteKeywords: "",
      defaultLan: "",
      isSuccesShowed: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.saveWebsiteMetaData = this.saveWebsiteMetaData.bind(this)
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
  }
  componentDidMount() {
    this.state.websiteTitle == "" && getWebsiteData().then((data) => {
      this.setState({ websiteTitle: data.title, websiteDescription: data.description, websiteKeywords: data.keywords, defaultLan: data.language })
    })
  }
  handleChange(event, inputName) {
    switch (inputName) {
      case "websiteTitle":
        this.setState({ websiteTitle: event.target.value })
        break;
      case "websiteDescription":
        this.setState({ websiteDescription: event.target.value })
        break;
      case "websiteKeywords":
        this.setState({ websiteKeywords: event.target.value })
        break;
      default:
        break;
    }
  }
  saveWebsiteMetaData() {
    settWebsiteData(this.state.websiteTitle, this.state.websiteDescription, this.state.websiteKeywords, this.state.defaultLan)
    this.setState({ isSuccesShowed: true })
  }
  handleLanguageChange(event) {
    this.setState({ defaultLan: event.target.value })
  }
  render() {
    return (
      <div className="website__Settings">
        <h2>Website Settings</h2>
        <p>Here you can change general setting of your website. like metadata.</p>
        <Collapse in={this.state.isSuccesShowed}>
          <Alert onClose={() => { this.setState(prevState => ({ isSuccesShowed: !prevState.isSuccesShowed })) }}>Metadata changed succefully!</Alert>
        </Collapse>
        <form>
          <TextField placeholder={this.state.websiteTitle} fullWidth className="settings__input" onChange={(event) => this.handleChange(event, "websiteTitle")} label="Website Title" variant="outlined" />
          <TextField placeholder={this.state.websiteDescription} multiline fullWidth className="settings__input" onChange={(event) => this.handleChange(event, "websiteDescription")} label="Website Description" variant="outlined" />
          <TextField placeholder={this.state.websiteKeywords} fullWidth className="settings__input" onChange={(event) => this.handleChange(event, "websiteKeywords")} label="Keywords" variant="outlined" />
          <Select
            style={{ marginTop: "10px" }}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            variant="outlined"
            fullWidth
            onChange={(event) => this.handleLanguageChange(event)}
            placeholder="Language "
            label="Language"
            value={this.state.defaultLan}
          >
            <MenuItem value={"English"}><em>English</em></MenuItem>
            <MenuItem value={"Danish"}>Danish</MenuItem>
            <MenuItem value={"Swedish"}>Swedish</MenuItem>
            <MenuItem value={"Spanish"}>Spanish</MenuItem>
            <MenuItem value={"Russian"}>Russian</MenuItem>
            <MenuItem value={"French"}>French</MenuItem>
            <MenuItem value={"Portuguese"}>Portuguese</MenuItem>
            <MenuItem value={"German"}>German</MenuItem>
          </Select>
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
export default WebsiteSettings