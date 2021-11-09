import React, { Component } from 'react';
import './Cv9.scss'
import { withTranslation } from 'react-i18next'
import i18n from '../../i18n';
class Cv9 extends Component {
    constructor(props) {
        super(props);
        this.returnEmployments = this.returnEmployments.bind(this);
        this.returnEducations = this.returnEducations.bind(this);
        this.returnSkills = this.returnSkills.bind(this);
        this.returnLanguages = this.returnLanguages.bind(this);
        i18n.changeLanguage(this.props.language);
    }
    returnEmployments() {
        var elements = []
        for (let index = 0; index < this.props.values.employments.length; index++) {
            elements.push(
                <div key={index} className="cv-bodySection-right cv9-bodySection-right">
                    <div className="cv9-bodySection-rightHead cv9-jobItem">
                        <span className="cv9-jobTitle">{this.props.values.employments[index].jobTitle}</span>
                        <div className="cv9-bodySection-rightDates">
                            <span> {this.props.values.employments[index].begin} - {this.props.values.employments[index].end} </span>
                        </div>
                    </div>
                    <p>
                        {this.props.values.employments[index].description}    </p>
                </div>
            );
        }
        return elements;
    }
    returnEducations() {
        var elements = [];
        for (let index = 0; index < this.props.values.educations.length; index++) {
            elements.push(
                <div key={index} className="cv9-jobItem">
                    <div className="cv9-bodySection-rightHead">
                        <span className="cv9-jobTitle">{this.props.values.educations[index].degree}</span>
                        <div className="cv9-bodySection-rightDates">
                            <span> {this.props.values.educations[index].started} - {this.props.values.educations[index].finished} </span>
                        </div>
                    </div>
                    <p>{this.props.values.educations[index].description} </p>
                </div>
            );
        }
        return elements;
    }
    returnSkills() {
        var elements = [];
        for (let index = 0; index < this.props.values.skills.length; index++) {
            elements.push(
                <div key={index} className="cv9-skill">
                    <div className="cv9-bullet">
                    </div>
                    <span>{this.props.values.skills[index].name}</span>
                </div>
            )
        }
        return elements;
    }
    returnLanguages() {
        var elements = [];
        for (let index = 0; index < this.props.values.languages.length; index++) {
            elements.push(
                <div key={index} className="cv9-skill">
                    <div className="cv9-bullet">
                    </div>
                    <span>{this.props.values.languages[index].name} :  {this.props.values.languages[index].level}</span>
                </div>
            )
        }
        return elements;
    }
    render() {
        const { t } = this.props;
        return (
            <div id="resumen" className="cv9-board" >
                <div className="cv9-content">
                    {/* Cv Head */}
                    <div className="cv9-head">
                        <h1 className="cv9-name">{this.props.values.firstname} {this.props.values.lastname}</h1>
                        <span className="cv9-occupation">{this.props.values.occupation}</span>
                        <span className="cv9-address">{this.props.values.address}, {this.props.values.city}, {this.props.values.postalcode}, {this.props.values.country}</span>
                        <span className=" cv9-phone">{this.props.values.phone}</span>
                        <span className="cv9-email">{this.props.values.email}</span>
                    </div> {/*End Cv Head */}
                    {/* Cv Body */}
                    <div className="cv-body">
                        {/* Body Section */}
                        <div className="cv-bodySection cv9-bodySection">
                            <div className="cv-bodySection-left">
                                <span>{t("resume.personalSummary")}</span>
                            </div>
                            <div className="cv-bodySection-right cv9-bodySection-right">
                                <p>
                                    {this.props.values.summary}
                                </p>
                            </div>
                        </div>
                        {/* Body Section */}
                        <div className="cv-bodySection cv9-bodySection">
                            <div className="cv-bodySection-left">
                                <span>{t("resume.employmentHistory")}</span>
                            </div>
                            <div className="cv-bodySection-right cv9-bodySection-right">
                                {/* Employments Here */}
                                {this.returnEmployments()}
                            </div>
                        </div>
                        {/* Body Section */}
                        <div className="cv-bodySection cv9-bodySection">
                            <div className="cv-bodySection-left">
                                <span>{t("resume.educationHistory")}</span>
                            </div>
                            <div className="cv-bodySection-right cv9-bodySection-right">
                                {/* Job Items here */}
                                {this.returnEducations()}
                            </div>
                        </div>
                        {/* Body Section */}
                        <div className="cv-bodySection cv9-bodySection">
                            <div className="cv-bodySection-left">
                                <span>{t("resume.skills")}</span>
                            </div>
                            <div className="cv-bodySection-right cv9-bodySection-right">
                                <div className="cv9-skills">
                                    {/* Skills Here */}
                                    {this.returnSkills()}
                                </div>
                            </div>
                        </div>
                        {/* Body Section */}
                        <div className="cv-bodySection cv9-bodySection">
                            <div className="cv-bodySection-left">
                                <span>{t("resume.languages")}</span>
                            </div>
                            <div className="cv-bodySection-right cv9-bodySection-right">
                                <div className="cv9-skills">
                                    {/* Languages Here */}
                                    {this.returnLanguages()}
                                </div>
                            </div>
                        </div>
                    </div>{/* End Cv Body */}
                </div>
            </div>
        )
    }
}
const MyComponent = withTranslation('common')(Cv9)
export default MyComponent;
