import React, { Component } from 'react';
import './Cv1.scss'
import { withTranslation } from 'react-i18next'
import i18n from '../../i18n';
class Cv1 extends Component {
    constructor(props) {
        super(props);
        document.getElementsByTagName("body")[0].style.overflow = "none";
        i18n.changeLanguage(this.props.language);
        this.returnLanguages = this.returnLanguages.bind(this);
        this.returnSkills = this.returnSkills.bind(this);
        this.returnEmployments = this.returnEmployments.bind(this);
        this.returnEducations = this.returnEducations.bind(this);
    }
    returnLanguages() {
        var elements = [];
        var       tempLanguages=   this.props.values.languages.sort(function(a, b) {
            return a.date - b.date;
        });
        for (let index = 0; index <tempLanguages.length; index++) {
            elements.push(
                <div key={index} className="sectionLanguage">
                    <span className="language">{tempLanguages[index].name}</span>
                    <span className="level">{tempLanguages[index].level}</span>
                </div>
            )
        }
        return elements;
    }
    returnSkills() {
        var elements = [];
        var       tempSkills=   this.props.values.skills.sort(function(a, b) {
            return a.date - b.date;
        });
        for (let index = 0; index <tempSkills.length; index++) {
            elements.push(
                <div key={index} className="skillItem">
                    <p>{this.props.values.skills[index].name}</p>
                    <div className="progressBar">
                        <div style={{ width:tempSkills[index].rating + "%" }} className="progressFilling">
                        </div>
                    </div>
                </div>
            )
        }
        return elements;
    }
    returnEmployments() {
        var elements = []
        var       tempEmployments=   this.props.values.employments.sort(function(a, b) {
            return a.date - b.date;
        });

        for (let index = 0; index < tempEmployments.length; index++) {
            elements.push(
                <div key={index} className="employmentWrapper">
                    <div className="employment__head">
                        <span className="employment__jobTitle">{tempEmployments[index].jobTitle}, {tempEmployments[index].employer}</span>
                        <span>{tempEmployments[index].begin} - {tempEmployments[index].end}</span>
                    </div>
                    <div className="employment__body">
                        <p>
                            {tempEmployments[index].description}
                        </p>
                    </div>
                </div>
            );
        }
        return elements;
    }
    returnEducations() {
        var elements = [];

        var       tempEducations=   this.props.values.educations.sort(function(a, b) {
            return a.date - b.date;
        });

        for (let index = 0; index < tempEducations.length; index++) {
            elements.push(
                <div className="employmentWrapper">
                    <div className="employment__head">
                        <span className="employment__jobTitle">{tempEducations[index].degree}, {tempEducations[index].school}</span>
                        <span>{tempEducations[index].started} - {tempEducations[index].finished}</span>
                    </div>
                    <div className="employment__body">
                        <p>{tempEducations[index].description}</p>
                    </div>
                </div>
            );
        }
        return elements;
    }
    render() {
        const { t } = this.props;
        return (
            <div id="resumen" className="cv1-board">
                <div className="cv-content">
                    {/* Head */}
                    <div className="cv-head">
                        {/* Image */}
                        <div className="cv__imageWrapper">
                            <div className="cv__image">
                                {this.props.values.photo !== null ? <img className="photo" src={this.props.values.photo} /> : "photo"}
                            </div>
                        </div>
                        <div className="cv__head-details">
                            <h1>{this.props.values.firstname}  {this.props.values.lastname} </h1>
                            <h3> {this.props.values.occupation} </h3>
                        </div> {/* end Head */}
                        {/* End Body */}
                    </div>
                    {/* Body */}
                    <div className="cv__body">
                        <div className="cv__bodyLeft">
                            {/* Left Section  */}
                            <div className="cv__leftSecton">
                                <div className="sectionTitle">
                                    <h1>{t("resume.info")}</h1>
                                    <div style={{ width: "20%" }} className="sectionTitle__underLine">
                                    </div>
                                    {/* details */}
                                    <div className="subItem">
                                        <h3>{t("resume.address")}</h3>
                                        <p>{this.props.values.address}, {this.props.values.city},{this.props.values.postalcode},{this.props.values.country}</p>
                                    </div>
                                    <div className="subItem">
                                        <h3>{t("resume.phone")}</h3>
                                        <p>{this.props.values.phone}</p>
                                    </div>
                                    <div className="subItem">
                                        <h3>{t("resume.email")}</h3>
                                        <p>{this.props.values.email}</p>
                                    </div>
                                </div>
                            </div>
                            {/* Left Section  */}
                            <div className="cv__leftSecton">
                                <div className="sectionTitle">
                                    <h1>{t("resume.languages")}</h1>
                                    <div style={{ width: "20%" }} className="sectionTitle__underLine">
                                    </div>
                                    <div className="sectionLanguages">
                                        {/* Language Item */}
                                        {this.returnLanguages()}
                                    </div>
                                </div>
                            </div>
                            {/* Left Section  */}
                            <div className="cv__leftSecton">
                                <div className="sectionTitle">
                                    <h1>{t("resume.skills")}</h1>
                                    <div style={{ width: "20%" }} className="sectionTitle__underLine">
                                    </div>
                                    {this.returnSkills()}
                                </div>
                            </div>
                        </div> {/* End Body left */}
                        {/* Body Right */}
                        <div className="bodyRight">
                            {/* Right section  : Summary*/}
                            <div className="rightSection">
                                <div className="sectionTitle">
                                    <h1>{t("resume.personalSummary")}</h1>
                                    <div style={{ width: "100%" }} className="sectionTitle__underLine">
                                    </div>
                                    <p>
                                        {this.props.values.summary}
                                    </p>
                                </div>
                            </div> {/* End   Summary*/}
                            {/* Right section  : Employment*/}
                            <div className="rightSection">
                                <div className="sectionTitle">
                                    <h1>{t("resume.employmentHistory")}</h1>
                                    <div style={{ width: "100%" }} className="sectionTitle__underLine">
                                    </div>
                                    {/* Employment Item */}
                                    {this.returnEmployments()}
                                </div>
                            </div>  {/* End   Employment*/}
                            {/* Right section  : Education*/}
                            <div className="rightSection">
                                <div className="sectionTitle">
                                    <h1>{t("resume.educationHistory")}</h1>
                                    <div style={{ width: "100%" }} className="sectionTitle__underLine">
                                    </div>
                                    {/* Education Item */}
                                    {this.returnEducations()}
                                </div>
                            </div>  {/* End   Employment*/}
                        </div>{/*  end Body Right */}
                    </div>{/* End Body */}
                </div>{/* end  cv-content */}
            </div>
        )
    }
}
const MyComponent = withTranslation('common')(Cv1)
export default MyComponent;