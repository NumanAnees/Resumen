import React, { Component } from 'react';
import './BoardSelection.scss';
import { CSSTransition } from 'react-transition-group';
import { withTranslation } from 'react-i18next';
class BoardSelection extends Component {
  constructor(props) {
    super(props);
    this.togglerHandler = this.togglerHandler.bind(this);
    this.handleResumeClick = this.handleResumeClick.bind(this);
  }
  togglerHandler() {
    this.props.toggler();
    this.props.nextStep();
  }
  handleResumeClick(resumeName) {
    console.log("clicked cv");
    this.props.changeResumeName(resumeName);
    this.props.nextStep();
  }
  render() {
    const { t } = this.props;
    return (
      <div className="board">
        <CSSTransition appear={true} in={true} classNames="fade" timeout={1000}>
          <div className="templateSelection">
            <h3>{t("selectionAction.templates")}</h3>
            <div className="templatesList">
              <div className="template"> <img onClick={() => this.handleResumeClick("Cv1")} src={require('../../../assets/1.JPG')} alt="Cv Preview" /> </div>
              <div className="template"> <img onClick={() => this.handleResumeClick("Cv2")} src={require('../../../assets/2.JPG')} alt="Cv Preview" /> </div>
              <div className="template"> <img onClick={() => this.handleResumeClick("Cv6")} src={require('../../../assets/6.JPG')} alt="Cv Preview" /> </div>
              <div className="template"> <img onClick={() => this.handleResumeClick("Cv3")} src={require('../../../assets/3.JPG')} alt="Cv Preview" /> </div>
              <div className="template"> <img onClick={() => this.handleResumeClick("Cv4")} src={require('../../../assets/4.jpg')} alt="Cv Preview" /> </div>
              <div className="template"> <img onClick={() => this.handleResumeClick("Cv5")} src={require('../../../assets/5.JPG')} alt="Cv Preview" /> </div>
              <div className="template"> <img onClick={() => this.handleResumeClick("Cv7")} src={require('../../../assets/7.JPG')} alt="Cv Preview" /> </div>
              <div className="template"> <img onClick={() => this.handleResumeClick("Cv8")} src={require('../../../assets/8.jpg')} alt="Cv Preview" /> </div>
              <div className="template"> <img onClick={() => this.handleResumeClick("Cv9")} src={require('../../../assets/9.jpg')} alt="Cv Preview" /> </div>
              <div className="template"> <img onClick={() => this.handleResumeClick("Cv10")} src={require('../../../assets/10.JPG')} alt="Cv Preview" /> </div>

            </div>
          </div>
        </CSSTransition>
      </div>
    );
  };
}
const MyComponent = withTranslation('common')(BoardSelection)
export default MyComponent;
