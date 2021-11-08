import React, { Component } from 'react'
import './Cv2.scss'
import Address from '../../assets/cv2-assets/address.png'
import Phone from '../../assets/cv2-assets/phone-call.png'
import Email from '../../assets/cv2-assets/envelope.png'
import { withTranslation } from 'react-i18next'
import i18n from '../../i18n';
class Cv2 extends Component {
    constructor(props) {
        super(props);
        this.returnEmployments = this.returnEmployments.bind(this);
        this.returnEducations = this.returnEducations.bind(this);
        this.returnSkills = this.returnSkills.bind(this);
        i18n.changeLanguage(this.props.language);
    }
    returnSkills() {
        var elements = [];
        for (let index = 0; index < this.props.values.skills.length; index++) {
            elements.push(
                <div className="skill">
                    <div className="name">
                        <span>{this.props.values.skills[index].name}</span>
                    </div>
                    <div className="rating">
                        {this.props.values.skills[index].rating > 70
                            ?
                            <>
                                <div className="bullet"></div>
                                <div className="bullet"></div>
                                <div className="bullet"></div>
                                <div className="bullet"></div>
                                <div className="bullet"></div>
                            </>
                            :
                            this.props.values.skills[index].rating > 40 ?
                                <>
                                    <div className="bullet"></div>
                                    <div className="bullet"></div>
                                    <div className="bullet"></div>
                                </>
                                :
                                this.props.values.skills[index].rating > 20 ?
                                    <>
                                        <div className="bullet"></div>
                                        <div className="bullet"></div>
                                    </> : ""
                        }
                    </div>
                </div>
            )
        }
        return elements;
    }
    returnEmployments() {
        var elements = []
        for (let index = 0; index < this.props.values.employments.length; index++) {
            elements.push(
                <div className="cv-sectionRightExperience">
                    <div className="cv-jobDetailsLeft">
                        <span className="employer">{this.props.values.employments[index].employer}</span>
                        <span className="date">{this.props.values.employments[index].begin} - {this.props.values.employments[index].end}</span>
                    </div>
                    <div className="cv-jobDetailsRight">
                        <span className="cv-jobTitle">{this.props.values.employments[index].jobTitle}</span>
                        <p className="cv-jobDescription">
                            {this.props.values.employments[index].description}
                        </p>
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
                <div className="cv-sectionRightExperience">
                    <div className="cv-jobDetailsLeft">
                        <span className="employer">{this.props.values.educations[index].school}</span>
                        <span className="date">{this.props.values.educations[index].started} - {this.props.values.educations[index].finished}</span>
                    </div>
                    <div className="cv-jobDetailsRight">
                        <span className="cv-jobTitle">{this.props.values.educations[index].degree}</span>
                        <p className="cv-jobDescription">
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
            <div id="resumen" className="cv2-board">
                <div className="cv2-content">
                    {/* Cv Head */}
                    <div className="cv2-head">
                        <div className="cv-headCircle">
                        </div>
                        <div className="head-details">
                            <h2>{this.props.values.firstname} {this.props.values.lastname} </h2>
                            <p>{this.props.values.occupation}</p>
                        </div>
                    </div>  {/* End Head */}
                    {/* Body */}
                    <div className="cv2-body">
                        {/* bodySection */}
                        <div className="cv-bodySection">
                            <div className="cv-sectionLeft">
                            </div>
                            <div className="cv-sectionRight">
                                {/* Contact details */}
                                <div className="cv-contactDetails">
                                    <div className="cv-contactItem">
                                        <div className="cv-contactItemImage">
                                            <img src={Phone} />
                                        </div>
                                        <div className="cv-contactItemDetails">
                                            <div className="cv-contactItemHead">
                                                {t("resume.phone")}
                                            </div>
                                            <div className="cv-contactItemValue">
                                                {this.props.values.phone}
                                            </div>
                                        </div>
                                    </div>
                                    {/* Contact Item */}
                                    <div className="cv-contactItem">
                                        <div className="cv-contactItemImage">
                                            <img src={Email} />
                                        </div>
                                        <div className="cv-contactItemDetails">
                                            <div className="cv-contactItemHead">
                                                {t("resume.email")}
                                            </div>
                                            <div className="cv-contactItemValue">
                                                {this.props.values.email}
                                            </div>
                                        </div>
                                    </div>
                                    {/* Contact Item */}
                                    <div className="cv-contactItem">
                                        <div className="cv-contactItemImage">
                                            <img src={Address} />
                                        </div>
                                        <div className="cv-contactItemDetails">
                                            <div className="cv-contactItemHead">
                                                {t("resume.address")}
                                            </div>
                                            <div className="cv-contactItemValue">
                                                {this.props.values.address} , {this.props.values.city}. {this.props.values.country}. {this.props.values.postalecode}
                                            </div>
                                        </div>
                                    </div>
                                </div>    {/* EndContact details */}
                            </div>   {/* End Section Right */}
                        </div>      {/* End bodySection */}
                        {/* bodySection */}
                        <div className="cv-bodySection">
                            <div className="cv-sectionLeft">
                                {t("resume.personalSummary")}
                            </div>
                            <div className="cv-sectionRight">
                                {/* Summary */}
                                <p className="summary">
                                    {this.props.values.summary}
                                </p>
                            </div>   {/* End Section Right */}
                        </div>      {/* End bodySection */}
                        {/* bodySection */}
                        <div className="cv-bodySection">
                            <div className="cv-sectionLeft">
                                {t("resume.employmentHistory")}
                            </div>
                            <div className="cv-sectionRight">
                                {/* Job Item */}
                                {this.returnEmployments()}
                            </div>   {/* End Section Right */}
                        </div>      {/* End bodySection */}
                        {/* bodySection */}
                        <div className="cv-bodySection">
                            <div className="cv-sectionLeft">
                                {t("resume.educationHistory")}
                            </div>
                            <div className="cv-sectionRight">
                                {/* Educations  */}
                                {this.returnEducations()}
                            </div>   {/* End Section Right */}
                        </div>      {/* End bodySection */}
                        {/* bodySection */}
                        <div className="cv-bodySection">
                            <div className="cv-sectionLeft">
                                {t("resume.skills")}
                            </div>
                            <div className="cv-sectionRight">
                                {/* Skills */}
                                <div className="skills">
                                    {this.returnSkills()}
                                </div>
                            </div>   {/* End Section Right */}
                        </div>      {/* End bodySection */}
                    </div> {/* End Body */}
                </div>
            </div>
        );
    }
}
const MyComponent = withTranslation('common')(Cv2)
export default MyComponent;