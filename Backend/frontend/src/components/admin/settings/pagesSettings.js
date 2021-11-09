import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { addPages, getPages, removePageByName } from "../../../firestore/dbOperations";
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import RemoveImage from '../../../assets/remove.png'
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
class PagesSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageName: "",
            text: "",
            isSuccesShowed: false,
            pages: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.saveNewPage = this.saveNewPage.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)
        this.removePageHandler = this.removePageHandler.bind(this);
        this.getPages = this.getPages.bind(this)
    }
    componentDidMount() {
        this.getPages()
    }
    // Handling changes of inputs
    handleChange(event, inputName) {
        switch (inputName) {
            case "Page Name":
                this.setState({ pageName: event.target.value })
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
        addPages(this.state.pageName, this.state.text).then(value => {
            this.setState({ isSuccesShowed: true })
        })
        this.getPages()
    }
    // getPages 
    getPages() {
        getPages().then(value => {
            value !== null && this.setState({ pages: value })
        })
    }
    // handling removal of page 
    removePageHandler(name) {
        removePageByName(name).then(value => {
            this.getPages()
        });
    }
    render() {
        return (
            <div className="website__Settings">
                <h2>Pages Manager </h2>
                <p>Here you can add and remove additional Pages to your website.</p>
                {/* Success Alert */}
                <Collapse in={this.state.isSuccesShowed}>
                    <Alert onClose={() => { this.setState(prevState => ({ isSuccesShowed: !prevState.isSuccesShowed })) }}>New page added succefully!</Alert>
                </Collapse>
                {/* Form */}
                <form>
                    <TextField placeholder={this.state.facebook} fullWidth className="settings__input" onChange={(event) => this.handleChange(event, "Page Name")} label="Page Name" variant="outlined" />
                    <ReactQuill style={{ marginTop: "10px" }} value={this.state.text}
                        onChange={this.handleTextChange} />
                    <div className="settings__subtitle">
                        Current Pages
                    </div>
                    {/* Current Pages */}
                    <div className="settings__pages">
                        {/* no pages show text  */}
                        {this.state.pages == null ?
                            <div className="settings__noPages">
                                No pages found !
                  </div>
                            :
                            <ul>
                                {this.state.pages.map((value, index) => {
                                    return <li key={index}><a href={"/p/" + value.id}> {value.id}</a><img onClick={() => this.removePageHandler(value.id)} src={RemoveImage} alt="remove" /></li>
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
export default PagesSettings