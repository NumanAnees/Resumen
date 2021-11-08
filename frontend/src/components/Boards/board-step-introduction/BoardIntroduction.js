import React, { Component } from 'react';
import './BoardIntroduction.scss';
import PortfolioImage from '../../../assets/portfolio.png';
import { withTranslation } from 'react-i18next';
class BoardIntroduction extends Component {
  /// This  class have nextStep passed to it in props so we be able to navigate between steps 
  render() {
    const { t } = this.props;
    return (
      <div className="board">
        <div className="introWrapper">
          <img className="introductionImage" src={PortfolioImage} alt="Portolio Img" />
          <button onClick={this.props.nextStep} className="btn-default">{t("intro.selectTemplate")}</button>
        </div>
        <div className="introFooter">
          {t("intro.rightReserved")}
        </div>
      </div>);
  };
}
const MyComponent = withTranslation('common')(BoardIntroduction)
export default MyComponent;