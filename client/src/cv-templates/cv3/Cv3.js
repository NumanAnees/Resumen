import React, { Component } from 'react';
import './Cv3.scss';
import { withTranslation } from 'react-i18next'
import i18n from '../../i18n';
class Cv3 extends Component {
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
                <div key={index} className="cv-bodySection-right cv2-bodySection-right">
                    <div className="cv2-bodySection-rightHead cv2-jobItem">
                        <span className="cv2-jobTitle">{this.props.values.employments[index].jobTitle}</span>
                        <div className="cv2-bodySection-rightDates">
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
                <div key={index} className="cv2-jobItem">
                    <div className="cv2-bodySection-rightHead">
                        <span className="cv2-jobTitle">{this.props.values.educations[index].degree}</span>
                        <div className="cv2-bodySection-rightDates">
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
                <div key={index} className="cv2-skill">
                    <div className="cv2-bullet">
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
                <div key={index} className="cv2-skill">
                    <div className="cv2-bullet">
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
            <div id="resumen" className="cv3-board" >
                <div className="cv3-content">
                    {/* Cv Head */}
                    <div className="cv3-head">
                        <h1 className="cv3-name">{this.props.values.firstname}</h1>
                        <h1 className="cv3-name">{this.props.values.lastname}</h1>
                        <span className="cv3-occupation">{this.props.values.occupation}</span>
                        <span className="cv3-address">{this.props.values.address}, {this.props.values.city}, {this.props.values.postalcode}, {this.props.values.country}</span>
                        <span className=" cv3-phone">{this.props.values.phone}</span>
                        <span className="cv3-email">{this.props.values.email}</span>
                    </div> {/*End Cv Head */}
                    {/* Cv Body */}
                    <div className="cv-body">
                        {/* Body Section */}
                        <div className="cv-bodySection cv2-bodySection">
                            <div className="cv-bodySection-left">
                                <span>    {t("resume.personalSummary")}</span>
                            </div>
                            <div className="cv-bodySection-right cv2-bodySection-right">
                                <p>
                                    {this.props.values.summary}
                                </p>
                            </div>
                        </div>
                        {/* Body Section */}
                        <div className="cv-bodySection cv2-bodySection">
                            <div className="cv-bodySection-left">
                                <span>    {t("resume.employmentHistory")}</span>
                            </div>
                            <div className="cv-bodySection-right cv2-bodySection-right">
                                {/* Employments Here */}
                                {this.returnEmployments()}
                            </div>
                        </div>
                        {/* Body Section */}
                        <div className="cv-bodySection cv2-bodySection">
                            <div className="cv-bodySection-left">
                                <span>    {t("resume.educationHistory")}</span>
                            </div>
                            <div className="cv-bodySection-right cv2-bodySection-right">
                                {/* Job Items here */}
                                {this.returnEducations()}
                            </div>
                        </div>
                        {/* Body Section */}
                        <div className="cv-bodySection cv2-bodySection">
                            <div className="cv-bodySection-left">
                                <span>    {t("resume.skills")}</span>
                            </div>
                            <div className="cv-bodySection-right cv2-bodySection-right">
                                <div className="cv2-skills">
                                    {/* Skills Here */}
                                    {this.returnSkills()}
                                </div>
                            </div>
                        </div>
                        {/* Body Section */}
                        <div className="cv-bodySection cv2-bodySection">
                            <div className="cv-bodySection-left">
                                <span>    {t("resume.languages")}</span>
                            </div>
                            <div className="cv-bodySection-right cv2-bodySection-right">
                                <div className="cv2-skills">
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
const MyComponent = withTranslation('common')(Cv3)
export default MyComponent;
