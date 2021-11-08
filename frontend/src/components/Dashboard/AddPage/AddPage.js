import React, { Component } from 'react';
import './AddPage.scss'
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
import SimpleInput from '../../Form/simple-input/SimpleInput';
import { addPages, getPages, removePageByName } from '../../../firestore/dbOperations'
import RemoveImage from '../../../assets/remove.png';
import { withTranslation } from 'react-i18next';
class AddPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: [],
            pageName: "",
            text: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleInputs = this.handleInputs.bind(this);
        this.addPageHandler = this.addPageHandler.bind(this);
        this.removePageHandler = this.removePageHandler.bind(this);
    }
    componentDidMount() {
        getPages().then(value => {
            value !== null && this.setState({ pages: value })
        })
    }
    handleChange(value) {
        this.setState({ text: value })
    }
    addPageHandler() {
        addPages(this.state.pageName, this.state.text).then(value => {
            window.location = "/dashboard"
        })
    }
    removePageHandler(name) {
        removePageByName(name).then(value => {
            window.location = "/dashboard"
        });
    }
    handleInputs(inputName, inputValue) {
        switch (inputName) {
            case "PageName":
                this.setState({
                    pageName: inputValue
                })
                break;
            default:
                break;
        }
    }
    render() {
        const { t } = this.props;
        return (
            <div className="add-page">
                <div className="add-page__details">
                    <h2 className="add-page__title"> {t("dashboard.pages")}</h2>
                    <hr />
                    <h4>{t("dashboard.currentPages")}</h4>
                    <ul className="add-page-links">
                        {this.state.pages.map((value, index) => {
                            return <li key={index}><a href={"/p/" + value.id}>{value.id}</a> <img onClick={() => this.removePageHandler(value.id)} className="remove-image" src={RemoveImage} /> </li>
                        })}
                    </ul>
                    <h4>{t("dashboard.addPages")}</h4>
                </div>
                <div className="add-page__wrapper">
                    <SimpleInput handleInputs={this.handleInputs} name="PageName" title={t("dashboard.pageName")} />
                    <ReactQuill style={{ height: "150px", marginTop: "10px" }} value={this.state.text}
                        onChange={this.handleChange} />
                    <div className="add-page-actions">
                        <br></br>
                        <a onClick={() => this.addPageHandler()} className="add-page-actions_button--blue">
                            {t("dashboard.addPage")}
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}
const MyComponent = withTranslation('common')(AddPage)
export default MyComponent;