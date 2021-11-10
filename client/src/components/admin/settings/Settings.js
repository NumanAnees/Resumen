import React, { Component } from 'react';
import './Settings.scss';
import WebsiteSettings from './websiteSettings';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import SubscriptionSetting from './subscriptionsSettings';
import SocialSettings from './socialSettings';
import AnalyticsSettings from './anlyticsSettings';
import PagesSettings from './pagesSettings';
import AdsSettings from './adsSettings';
class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: "websiteSettings"
        }
        this.setStep = this.setStep.bind(this);
    }
    setStep(stepName) {
        this.setState({ step: stepName })
    }
    render() {
        return (
            <div className="settings">
                <Container>
                    <Grid container spacing={3}>
                        <Grid item md={3} sm={12} xs={12}>
                            {/* Settings Navigation Left */}
                            <div className="settings__navigation">
                                <ul>
                                    <li onClick={() => this.setStep("websiteSettings")}>Website Settings</li>
                                    <li onClick={() => this.setStep("subscriptionsSettings")}>Subscriptions </li>
                                    <li onClick={() => this.setStep("socialSettings")}>Social Links </li>
                                    <li onClick={() => this.setStep("analytics")} >Analytics   </li>
                                    <li onClick={() => this.setStep("pages")} >Pages   </li>
                                    <li onClick={() => this.setStep("ads")} >Ads Manger   </li>
                                </ul>
                            </div>
                        </Grid>
                        <Grid item md={9} sm={12} xs={12}>
                            {/* Settings Body Right */}
                            <div className="settings__body">
                                {
                                    this.state.step == "websiteSettings" && <WebsiteSettings />
                                }
                                {
                                    this.state.step == "subscriptionsSettings" && <SubscriptionSetting />
                                }
                                {
                                    this.state.step == "socialSettings" && <SocialSettings />
                                }
                                {
                                    this.state.step == "analytics" && <AnalyticsSettings />
                                }
                                {
                                    this.state.step == "pages" && <PagesSettings />
                                }
                                {
                                    this.state.step == "ads" && <AdsSettings />
                                }
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        )
    }
}
export default Settings;