import React, { Component } from 'react';
import './Action.scss';
import ActionIntroduction from '../action-step-introduction/ActionIntroduction'
import ActionStepSelection from '../action-step-selection/ActionSelection'
import ActionFilling from '../action-step-filling/ActionFilling'

class Action extends Component {
  constructor(props) {
    super(props)
  }
  /// This  class have nextStep passed to it in props so we be able to navigate between steps 
  // Note Step state is handled in parent to render the right components
  render() {
    // Checking which step is passed to the action wrapper and render the right component 

    
    switch (this.props.currentStep) {
      case "Introduction":
        return (<ActionIntroduction values={this.props.values} handleLanguageClick={this.props.handleLanguageClick} goThirdStep={this.props.goThirdStep} isAuthShowed={this.props.values.isAuthShowed} authBtnHandler={this.props.authBtnHandler} logout={this.props.logout} user={this.props.user} />);
      case "Template Selection":
        return (<ActionStepSelection setCurrentStep={this.props.setCurrentStep} isAuthShowed={this.props.isAuthShowed} authBtnHandler={this.props.authBtnHandler} logout={this.props.logout} user={this.props.user} handlePreviewToggle={this.props.handlePreviewToggle} />);
      case "Adding Data":
        return (<ActionFilling stepBack= {this.props.stepBack} removeSkill={this.props.removeSkill} removeLanguage={this.props.removeLanguage} removeEducation={this.props.removeEducation}  removeEmployment={this.props.removeEmployment}  currentResumeName={this.props.currentResumeName} handleLanguageClick={this.props.handleLanguageClick} values={this.props.values} logout={this.props.logout} user={this.props.user} handleDelete={this.props.handleDelete} progress={this.props.progress} handleInputs={this.props.handleInputs} />);
      default:
        return (<ActionIntroduction handleLanguageClick={this.props.handleLanguageClick} />);
    }
  };
}
export default Action;
