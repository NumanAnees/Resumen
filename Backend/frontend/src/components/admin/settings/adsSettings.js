import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { addPages, getPages, removePageByName, getAds, addAds, removeAd } from "../../../firestore/dbOperations";
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import RemoveImage from '../../../assets/remove.png'
import { m } from 'framer-motion';
class AdsSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerName: "",
            imageLink: "",
            destinationLink: "",
            isSuccesShowed: false,
            pages: null,
            // ads
            ads: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.saveNewPage = this.saveNewPage.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)
        this.removeAddHandler = this.removeAddHandler.bind(this);
        this.getAllAds = this.getAllAds.bind(this)
    }
    componentDidMount() {
        this.getAllAds()
    }
    // Handling changes of inputs
    handleChange(event, inputName) {
        switch (inputName) {
            case "Banner Name":
                this.setState({ bannerName: event.target.value })
                break;
            case "Image Url":
                this.setState({ imageLink: event.target.value })
                break;
            case "Destination Link":
                this.setState({ destinationLink: event.target.value })
                break;
            default:
                break;
        }
    }
    // Handling changes of text fields
    handleTextChange(value) {
        this.setState({ text: value })
    }
    // Handling addition of page
    saveNewPage() {
        addAds(this.state.imageLink, this.state.bannerName, this.state.destinationLink).then(value => {
            this.getAllAds()
        })
    }
    // getPages 
    getAllAds() {
        getAds().then((value) => {
            value !== null ? this.setState({ ads: value }) : this.setState({ ads: null });
        })
    }
    // handling removal of page 
    removeAddHandler(id) {
        removeAd(id).then(value => {
            this.getAllAds()
        });
    }
    render() {
        return (
            <div className="website__Settings">
                <h2>Ads Manager </h2>
                <p>Here you can add and remove additional ads to your website.</p>
                {/* Success Alert */}
                <Collapse in={this.state.isSuccesShowed}>
                    <Alert onClose={() => { this.setState(prevState => ({ isSuccesShowed: !prevState.isSuccesShowed })) }}>New page added succefully!</Alert>
                </Collapse>
                {/* Form */}
                <form>
                    <TextField fullWidth className="settings__input" onChange={(event) => this.handleChange(event, "Banner Name")} label="Banner Name" variant="outlined" />
                    <TextField fullWidth className="settings__input" onChange={(event) => this.handleChange(event, "Image Url")} label="Image Url" variant="outlined" />
                    <TextField fullWidth className="settings__input" onChange={(event) => this.handleChange(event, "Destination Link")} label="Destination Link" variant="outlined" />
                    <div className="settings__subtitle">
                        Current Ads
                    </div>
                    {/* Current Pages */}
                    <div className="settings__pages">
                        {/* no pages show text  */}
                        {this.state.ads == null ?
                            <div className="settings__noPages">
                                No pages found !
                  </div>
                            :
                            <ul>
                                {this.state.ads.map((value, index) => {
                                    return <li key={index}><a href={"/p/" + value.name}> {value.name}</a><img onClick={() => this.removeAddHandler(value.id)} src={RemoveImage} alt="remove" /></li>
                                })}
                            </ul>
                        }
                    </div>
                    <div className="settings__formAction">
                        <Button onClick={() => this.saveNewPage()} variant="contained" color="primary">
                            Save
                        </Button>
                    </div>
                </form>
                {/* Form end */}
            </div>
        )
    }
}
export default AdsSettings