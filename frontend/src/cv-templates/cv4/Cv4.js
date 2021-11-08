import React, { Component } from 'react'
import './Cv4.scss';
import { withTranslation } from 'react-i18next'
import i18n from '../../i18n';
class Cv4 extends Component {
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
                <div className="cv4-skill">
                    <span className="cv4-skillName">{this.props.values.skills[index].name}</span>
                    <div className="cv4-skillBox">
                        <div style={{ width: this.props.values.skills[index].rating + "%" }} className="cv4-skillRating">
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
                <div key={index} className="cv4-languagesItem">
                    <span className="cv4-languageName">{this.props.values.languages[index].name}</span>
                    <span className="cv4-languageLevel">{this.props.values.languages[index].level}</span>
                </div>
            )
        }
        return elements;
    }
    returnEmployments() {
        var elements = []
        for (let index = 0; index < this.props.values.employments.length; index++) {
            elements.push(
                <div key={index} className="cv4-employment">
                    <div className="cv4-employmentsHead">
                        <span className="cv4-jobTitle" > {this.props.values.employments[index].jobTitle}</span>
                        <div className="cv4-dates">
                            <span>{this.props.values.employments[index].begin} - {this.props.values.employments[index].end}</span>
                        </div>
                    </div>
                    <div className="cv4-employmentBody">
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
                <div key={index} className="cv4-employment">
                    <div className="cv4-employmentsHead">
                        <span className="cv4-jobTitle" > {this.props.values.educations[index].degree}</span>
                        <div className="cv4-dates">
                            <span>{this.props.values.educations[index].started} - {this.props.values.educations[index].finished}</span>
                        </div>
                    </div>
                    <div className="cv4-employmentBody">
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
            <div id="resumen" className="cv4-board">
                <div className="cv4-content">
                    {/* Head */}
                    <div className="cv4-head">
                        <div className="cv4-headBox">
                            <h1 className="cv4-name">{this.props.values.firstname}  {this.props.values.lastname} </h1>
                            <hr className="cv4-headBoxHr" />
                            <span className="cv4-headOccupation">{this.props.values.occupation} </span>
                        </div>
                    </div> {/* End Head */}
                    {/* Cv4 Body */}
                    <div className="cv4-body">
                        <div className="cv4-leftSide">
                            {/* Details */}
                            <div className="cv4-details" >
                                <div className="cv4-SectionTitle">
                                    <span className="cv4-SectionTitleName">{t("resume.info")}</span>
                                </div>
                                <div className="cv4-detailsContent">
                                    <span>{this.props.values.email} </span>
                                    <span>{this.props.values.phone} </span>
                                    <span>{this.props.values.address} , {this.props.values.city} </span>
                                    <span>{this.props.values.postalcode} ,{this.props.values.country} </span>
                                </div>
                            </div>  {/* End  Details */}
                            {/* Skills */}
                            <div className="cv4-details" >
                                <div className="cv4-SectionTitle">
                                    <span className="cv4-SectionTitleName">{t("resume.skills")}</span>
                                </div>
                                <div className="cv4-skills">
                                    {/* Skill Item */}
                                    {this.returnSkills()}
                                </div>
                            </div>  {/* End  Skills */}
                            {/* Skills */}
                            <div className="cv4-details" >
                                <div className="cv4-SectionTitle">
                                    <span className="cv4-SectionTitleName">{t("resume.languages")}</span>
                                </div>
                                <div className="cv4-languages">
                                    {/* Language Item */}
                                    {this.returnLanguages()}
                                </div>
                            </div>  {/* End  Skills */}
                        </div>
                        <div className="cv4-rightSide">
                            {/* Profile */}
                            <div className="cv4-profile">
                                <div className="cv4-SectionTitle">
                                    <span className="cv4-SectionTitleName">{t("resume.personalSummary")}</span>
                                </div>
                                <p>{this.props.values.summary} </p>
                            </div>
                            {/* Employments */}
                            <div className="cv4-profile">
                                <div className="cv4-SectionTitle">
                                    <span className="cv4-SectionTitleName">{t("resume.employmentHistory")}</span>
                                </div>
                                {/* Employment */}
                                {this.returnEmployments()}
                            </div>
                            {/* End Employments */}
                            {/* Employments */}
                            <div className="cv4-profile">
                                <div className="cv4-SectionTitle">
                                    <span className="cv4-SectionTitleName">{t("resume.educationHistory")}</span>
                                </div>
                                {/* Employment */}
                                {this.returnEducations()}
                            </div>
                            {/* End Employments */}
                        </div>
                    </div>  {/* END Cv4 Body */}
                </div>
            </div>
        )
    }
}
const MyComponent = withTranslation('common')(Cv4)
export default MyComponent;
