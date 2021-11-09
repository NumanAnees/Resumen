import React, { Component } from 'react'
import './Cv8.scss';
import { withTranslation } from 'react-i18next'
import i18n from '../../i18n';
class Cv8 extends Component {
    constructor(props) {
        super(props);
        this.returnSkills = this.returnSkills.bind(this);
        this.returnLanguages = this.returnLanguages.bind(this);
        this.returnEmployments = this.returnEmployments.bind(this);
        this.returnEducations = this.returnEducations.bind(this);
        i18n.changeLanguage(this.props.language);
    }
    returnSkills() {
        var elements = [];
        for (let index = 0; index < this.props.values.skills.length; index++) {
            elements.push(
                <div className="cv8-skill">
                    <span className="cv8-skillName">{this.props.values.skills[index].name}</span>
                    <div className="cv8-skillBox">
                        <div style={{ width: this.props.values.skills[index].rating + "%" }} className="cv8-skillRating">
                        </div>
                    </div>
                </div>
            )
        }
        return elements;
    }
    returnLanguages() {
        var elements = [];
        for (let index = 0; index < this.props.values.languages.length; index++) {
            elements.push(
                <div key={index} className="cv8-languagesItem">
                    <span className="cv8-languageName">{this.props.values.languages[index].name}</span>
                    <span className="cv8-languageLevel">{this.props.values.languages[index].level}</span>
                </div>
            )
        }
        return elements;
    }
    returnEmployments() {
        var elements = []
        for (let index = 0; index < this.props.values.employments.length; index++) {
            elements.push(
                <div key={index} className="cv8-employment">
                    <div className="cv8-employmentsHead">
                        <span className="cv8-jobTitle" > {this.props.values.employments[index].jobTitle}</span>
                        <div className="cv8-dates">
                            <span>{this.props.values.employments[index].begin} - {this.props.values.employments[index].end}</span>
                        </div>
                    </div>
                    <div className="cv8-employmentBody">
                        <p>{this.props.values.employments[index].description}</p>
                    </div>
                </div>
            );
        }
        return elements;
    }
    returnEducations() {
        var elements = [];
        for (let index = 0; index < this.props.values.educations.length; index++) {
            elements.push(
                <div key={index} className="cv8-employment">
                    <div className="cv8-employmentsHead">
                        <span className="cv8-jobTitle" > {this.props.values.educations[index].degree}</span>
                        <div className="cv8-dates">
                            <span>{this.props.values.educations[index].started} - {this.props.values.educations[index].finished}</span>
                        </div>
                    </div>
                    <div className="cv8-employmentBody">
                        <p>{this.props.values.educations[index].description}</p>
                    </div>
                </div>
            );
        }
        return elements;
    }
    render() {
        const { t } = this.props;
        return (
            <div id="resumen" className="cv8-board">
                <div className="cv8-content">
                    {/* Head */}
                    <div className="cv8-head">
                        <div className="cv8-headBox">
                            <h1 className="cv8-name">{this.props.values.firstname}  {this.props.values.lastname} </h1>
                            <hr className="cv8-headBoxHr" />
                            <span className="cv8-headOccupation">{this.props.values.occupation} </span>
                        </div>
                    </div> {/* End Head */}
                    {/* cv8 Body */}
                    <div className="cv8-body">
                        <div className="cv8-rightSide">
                            {/* Profile */}
                            <div className="cv8-profile">
                                <div className="cv8-SectionTitle">
                                    <span className="cv8-SectionTitleName">{t("resume.personalSummary")}</span>
                                </div>
                                <p>{this.props.values.summary} </p>
                            </div>
                            {/* Employments */}
                            <div className="cv8-profile">
                                <div className="cv8-SectionTitle">
                                    <span className="cv8-SectionTitleName">{t("resume.employmentHistory")}</span>
                                </div>
                                {/* Employment */}
                                {this.returnEmployments()}
                            </div>
                            {/* End Employments */}
                            {/* Employments */}
                            <div className="cv8-profile">
                                <div className="cv8-SectionTitle">
                                    <span className="cv8-SectionTitleName">{t("resume.educationHistory")}</span>
                                </div>
                                {/* Employment */}
                                {this.returnEducations()}
                            </div>
                            {/* End Employments */}
                        </div>
                        <div className="cv8-leftSide">
                            {/* Details */}
                            <div className="cv8-details" >
                                <div className="cv8-SectionTitle">
                                    <span className="cv8-SectionTitleName">{t("resume.info")}</span>
                                </div>
                                <div className="cv8-detailsContent">
                                    <span>{this.props.values.email} </span>
                                    <span>{this.props.values.phone} </span>
                                    <span>{this.props.values.address} , {this.props.values.city} </span>
                                    <span>{this.props.values.postalcode} ,{this.props.values.country} </span>
                                </div>
                            </div>  {/* End  Details */}
                            {/* Skills */}
                            <div className="cv8-details" >
                                <div className="cv8-SectionTitle">
                                    <span className="cv8-SectionTitleName">{t("resume.skills")}</span>
                                </div>
                                <div className="cv8-skills">
                                    {/* Skill Item */}
                                    {this.returnSkills()}
                                </div>
                            </div>  {/* End  Skills */}
                            {/* Skills */}
                            <div className="cv8-details" >
                                <div className="cv8-SectionTitle">
                                    <span className="cv8-SectionTitleName">{t("resume.languages")}</span>
                                </div>
                                <div className="cv8-languages">
                                    {/* Language Item */}
                                    {this.returnLanguages()}
                                </div>
                            </div>  {/* End  Skills */}
                        </div>
                    </div>  {/* END cv8 Body */}
                </div>
            </div>
        )
    }
}
const MyComponent = withTranslation('common')(Cv8)
export default MyComponent;
