import React, { Component } from 'react';
import './Cv7.scss';
import Email from '../../assets/cv7-assets/email.png'
import Address from '../../assets/cv7-assets/pin.png';
import Phone from '../../assets/cv7-assets/phone-call.png';
import { withTranslation } from 'react-i18next'
import i18n from '../../i18n';
class Cv7 extends Component {
    constructor(props) {
        super(props);
        this.returnLanguages = this.returnLanguages.bind(this);
        this.returnSkills = this.returnSkills.bind(this);
        this.returnEmployments = this.returnEmployments.bind(this);
        this.returnEducations = this.returnEducations.bind(this);
        i18n.changeLanguage(this.props.language);
    }
    returnLanguages() {
        var elements = [];
        for (let index = 0; index < this.props.values.languages.length; index++) {
            elements.push(
                <div className="cv7-languagesItem">
                    <span>{this.props.values.languages[index].name}</span>
                    <span className="cv7-languageName">{this.props.values.languages[index].level}</span>
                </div>
            )
        }
        return elements;
    }
    returnEmployments() {
        var elements = []
        for (let index = 0; index < this.props.values.employments.length; index++) {
            elements.push(
                <div className="cv7-employmentItem">
                    <div className="cv7-details">
                        <p className="cv7-jobTitle">{this.props.values.employments[index].jobTitle}</p>
                        <p className="cv7-dates">{this.props.values.employments[index].employer},  {this.props.values.employments[index].begin} - {this.props.values.employments[index].end}.</p>
                    </div>
                    <div className="cv7-jobDescription">
                        <p>{this.props.values.employments[index].description}</p>
                    </div>
                </div>
            );
        }
        return elements;
    }
    returnSkills() {
        var elements = [];
        for (let index = 0; index < this.props.values.skills.length; index++) {
            elements.push(
                <div className="cv7-skillItem">
                    <span> {this.props.values.skills[index].name}</span>
                </div>
            )
        }
        return elements;
    }
    returnEducations() {
        var elements = [];
        for (let index = 0; index < this.props.values.educations.length; index++) {
            elements.push(
                <div className="cv7-employmentItem">
                    <div className="cv7-details">
                        <p className="cv7-jobTitle">{this.props.values.educations[index].degree}</p>
                        <p className="cv7-dates">{this.props.values.educations[index].school}, {this.props.values.educations[index].started} - {this.props.values.educations[index].finished}.</p>
                    </div>
                    <div className="cv7-jobDescription">
                        <p>
                            {this.props.values.educations[index].description}
                        </p>
                    </div>
                </div>
            );
        }
        return elements;
    }
    render() {
        const { t } = this.props;
        return (
            <div id="resumen" className="cv7-board">
                {/* Content */}
                <div className="cv7-content">
                    {/* Head */}
                    <div className="cv7-head">
                        <h1>{this.props.values.firstname} {this.props.values.lastname}</h1>
                        <h3> {this.props.values.occupation}</h3>
                    </div>
                    {/* End - Head */}
                    <div className="cv7-body">
                        <div class="cv7-bodyLeft">
                            {/* Summary */}
                            <div className="cv7-title">
                                <h3 class="cv7-titleText">{t("resume.personalSummary")}</h3>
                            </div>
                            <div class="cv7-summary">
                                <p>
                                    {this.props.values.summary}
                                </p>
                            </div>
                            {/* End - Summary */}
                            {/* EXPERIENCE */}
                            <div className="cv7-title">
                                <h3 class="cv7-titleText">{t("resume.employmentHistory")}</h3>
                            </div>
                            <div className="cv7-employments">
                                {/* Employment Item */}
                                {this.returnEmployments()}
                            </div>
                            {/* End Experience */}
                            {/* EXPERIENCE */}
                            <div className="cv7-title">
                                <h3 class="cv7-titleText">{t("resume.educationHistory")}</h3>
                            </div>
                            <div className="cv7-employments">
                                {/* Employment Item */}
                                {this.returnEducations()}
                            </div>
                            {/* End Experience */}
                        </div>{/* End Body Left */}
                        {/* Body Right */}
                        <div className="cv7-bodyRight">
                            {/* EXPERIENCE */}
                            <div className="cv7-title">
                                <h3 class="cv7-titleText">{t("resume.info")}</h3>
                            </div>
                            {/* Details */}
                            <div className="cv7-details">
                                <div className="cv7-detailsItem">
                                    <img src={Email} />
                                    <span>{this.props.values.email}</span>
                                </div>
                                <div className="cv7-detailsItem">
                                    <img src={Phone} />
                                    <span>{this.props.values.phone}</span>
                                </div>
                                <div className="cv7-detailsItem">
                                    <img src={Address} />
                                    <span>{this.props.values.address}, {this.props.values.city}, {this.props.values.country}, {this.props.values.postalecode}.</span>
                                </div>
                            </div>
                            {/* End Details */}
                            {/* Skills */}
                            <div className="cv7-skills">
                                <div className="cv7-title">
                                    <h3 class="cv7-titleText">{t("resume.skills")}</h3>
                                </div>
                                {this.returnSkills()}
                            </div>
                            {/* Skills End */}
                            {/* Languages */}
                            <div className="cv7-languages">
                                <div className="cv7-title">
                                    <h3 class="cv7-titleText">{t("resume.languages")}</h3>
                                </div>
                                {this.returnLanguages()}
                            </div>
                            {/* End Languages */}
                        </div>
                        {/*End Body Right */}
                    </div>
                </div>  {/* End Content */}
            </div>
        )
    }
}
const MyComponent = withTranslation('common')(Cv7)
export default MyComponent;
