import React, { Component } from 'react';
import './Cv10.scss'

import AddressImage from '../../assets/cv10-assets/at.png'
import LocationImage from '../../assets/cv10-assets/location-pointer.png'
import PhoneImage from '../../assets/cv10-assets/phone-call.png'

import { withTranslation } from 'react-i18next'
import i18n from '../../i18n';

 class Cv10 extends Component {
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

                <div key={index} className="cv10-jobItem">
                    <div className="cv10-jobTitle">
                        <p>{this.props.values.employments[index].jobTitle} , <span className="cv10-employer">{this.props.values.employments[index].employer}</span>.</p>
                        <p className="cv10-jobtime">{this.props.values.employments[index].begin} - {this.props.values.employments[index].end}</p>
                    </div>
                    <div className="cv10-jobDesc">
                        <p> {this.props.values.employments[index].description}</p>
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
                <div key={index} className="cv10-jobItem">
                <div className="cv10-jobTitle">
                    <p>{this.props.values.educations[index].degree} , <span className="cv10-employer">{this.props.values.educations[index].school}</span>.</p>
                    <p className="cv10-jobtime">{this.props.values.educations[index].started} - {this.props.values.educations[index].finished}</p>
                </div>
                <div className="cv10-jobDesc">
                    <p>{this.props.values.educations[index].description}</p>
                </div>
            </div>
            );
        }
        return elements;
    }

    returnLanguages() {
        var elements = [];
        for (let index = 0; index < this.props.values.languages.length; index++) {
            elements.push(
                <div key={index} className="cv10-languages">
                <div className="cv10-languageName">
                {this.props.values.languages[index].name}
                </div>
                <div className="cv10-Level">
                {this.props.values.languages[index].level}
                 </div>
            </div>            
            )
        }
        return elements;
    }
    returnSkills() {
        var elements = [];
        for (let index = 0; index < this.props.values.skills.length; index++) {
            elements.push(
                <div key={index} className="cv10-skill">
                {this.props.values.skills[index].name}
             </div>
            )
        }
        return elements;
    }



    render() {
        const { t } = this.props;

        return (
            <div id="resumen" className="cv10-board">
                <div className="cv10-content">

                    <div className="cv10-content-head">
                        <h2>{this.props.values.firstname} {this.props.values.lastname}</h2>
                        <h3>{this.props.values.occupation} </h3>
                    </div>
                    {/* Body */}
                    <div className="cv10-content-body">
                        {/* Left Side */}
                        <div className="cv10-content-left">
                            {/* SUmmary */}
                            <div className="cv10-sectionTitle">
                                <h2>{t("resume.personalSummary")}</h2>
                            </div>
                            <p class="cv10-summary">
                                {this.props.values.summary}
                            </p>

                            {/* Professional experience */}
                            <div className="cv10-sectionTitle">
                                <h2>{t("resume.employmentHistory")}</h2>
                            </div>
                            {/* Job Items */}
                            {this.returnEmployments()}


                            {/* Education  */}
                            <div className="cv10-sectionTitle">
                                <h2>{t("resume.educationHistory")} </h2>
                            </div>

                            {/* Ecuations */}
                              {this.returnEducations()}


                        </div>
                        {/* Right Side */}
                        <div className="cv10-content-right">
                            <div className="cv10-sectionTitle">
                                <h2>{t("resume.info")} </h2>
                            </div>

                            <div className="cv10-infoSection">


                                {/* Info Item */}
                                <div className="cv10-infoItem">
                                    <div className="cv10-infoSectionLeft">
                                        <img src={LocationImage} />
                                    </div>
                                    <div className="cv10-infoSectionRight">
                                        <p>{this.props.values.address} , {this.props.values.city} , {this.props.values.postalecode}, {this.props.values.country}.</p>
                                    </div>
                                </div>
                                {/* Info Item */}
                                <div className="cv10-infoItem">
                                    <div className="cv10-infoSectionLeft">
                                        <img src={AddressImage} />
                                    </div>
                                    <div className="cv10-infoSectionRight">
                                    {this.props.values.email}
                            </div>
                                </div>
                                {/* Info Item */}
                                <div className="cv10-infoItem">
                                    <div className="cv10-infoSectionLeft">
                                        <img src={PhoneImage} />
                                    </div>
                                    <div className="cv10-infoSectionRight">
                                    {this.props.values.phone}
                            </div>
                                </div>

                            </div>

                            <div className="cv10-sectionTitle">
                                <h2>{t("resume.languages")} </h2>
                            </div>
                            <br></br>
                            {/* Languages */}
                            {this.returnLanguages()}
                            <div className="cv10-sectionTitle">
                                <h2>{t("resume.skills")} </h2>
                            </div>
                            <br></br>

                            {/* Skillls */}
                            <div className="cv10-skills">
                                {/* Skill */}
                              {this.returnSkills()}

                            </div>

                        </div>



                    </div>


                </div>
            </div>)
    }
}

const MyComponent = withTranslation('common')(Cv10)
export default MyComponent;
