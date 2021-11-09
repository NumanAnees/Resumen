import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withTranslation } from 'react-i18next';
class ProfileDropdown extends Component {
  render() {
    const { t } = this.props;
    return (
      <ul>
        <div className="mobileItems">
          <li><Link to="/" className="dropDownItem">Homepage</Link></li>
          <li><Link onClick={() => this.props.handleDashboardClick()} className="dropDownItem"> {t("dashboard.dashboard")}</Link></li>
          {/* <li><Link className="dropDownItem">Cover Letter</Link></li> */}
        </div>
        <li><Link onClick={() => this.props.handleSettingsClick()} className="dropDownItem">{t("dashboard.accountSettings")}</Link></li>
        <li><Link onClick={() => this.props.logout()} to="/" className="dropDownItem logout">{t("dashboard.logout")}</Link></li>
      </ul>
    )
  }
}
const MyComponent = withTranslation('common')(ProfileDropdown)
export default MyComponent;