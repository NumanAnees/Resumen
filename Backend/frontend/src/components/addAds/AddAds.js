import React, { Component } from 'react';
import './AddAds.scss'
import SimpleInput from '../Form/simple-input/SimpleInput';
import { getAds, addAds, removeAd } from '../../firestore/dbOperations'
import { withTranslation } from 'react-i18next';
class AddAds extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ads: [],
            currentBanner: "",
            currentLink: "",
            destinationLink: ""
        }
        this.handleInputs = this.handleInputs.bind(this);
        this.addNewAdd = this.addNewAdd.bind(this)
        this.removeAd = this.removeAd.bind(this);
    }
    componentDidMount() {
        getAds().then((value) => {
            console.log("Value of ads")
            console.log(value);
            value !== null && this.setState({ ads: value });
        })
    }
    addNewAdd() {
        addAds(this.state.currentLink, this.state.currentBanner, this.state.destinationLink).then(value => {
            window.location.reload()
        })
    }
    removeAd(id) {
        removeAd(id).then(value => {
            window.location.reload()
        });
    }
    handleInputs(InputName, InputValue) {
        switch (InputName) {
            case "BannerName":
                this.setState({ currentBanner: InputValue })
                break;
            case "BannerLink":
                this.setState({ currentLink: InputValue })
                break;
            case "DestinationLink":
                this.setState({ destinationLink: InputValue })
                break;
            default:
                break;
        }
    }
    render() {
        const { t } = this.props;
        return (
            <div className="ads">
                <h2 className="ads__title--large">{t("dashboard.adsManager")}</h2>
                <hr className="ads__hr" />
                <h4 className="ads__title--medium">{t("dashboard.currentAds")}</h4>
                <div className="ads-list-wrapper">
                    <ul className="ads-list">
                        {/*Ads list */}
                        {this.state.ads.length > 0 ?
                            this.state.ads.map((value, index) => {
                                return <li key={index} className="ads-item">
                                    <div className="ads-item__image"><img src={value.imageLink} /></div>
                                    <div className="ads-item__details">
                                        <div className="ads-item__name"><span>{t("dashboard.name")}:</span> {value.name}</div>
                                        <div className="ads-item__date"> <span>{t("dashboard.date")}:</span> {value.date}</div>
                                    </div>
                                    <div className="ads-item__action">
                                        <a onClick={() => this.removeAd(value.id)} className="ads-item__action--red">{t("dashboard.remove")}</a>
                                    </div>
                                </li>
                            })
                            :
                            <div>{t("dashboard.noAdsFound")}</div>
                        }
                    </ul>
                    <h4 className="ads__title--medium">{t("dashboard.addNew")}</h4>
                    <div className="ads-form-holder">
                        <SimpleInput handleInputs={this.handleInputs} name="BannerLink" title={t("dashboard.bannerLink")} />
                        <SimpleInput handleInputs={this.handleInputs} name="BannerName" title={t("dashboard.bannerName")} />
                        <SimpleInput handleInputs={this.handleInputs} name="DestinationLink" title={t("dashboard.destinationLink")} />
                        <div className="ads-item__action">
                            <a onClick={() => this.addNewAdd()} className="ads-item__action--blue">Add</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const MyComponent = withTranslation('common')(AddAds)
export default MyComponent;