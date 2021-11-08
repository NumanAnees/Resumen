import React, { Component, lazy } from 'react'
import './Settings.scss'
import Input from '../../Form/simple-input/SimpleInput'
import { addUser, changePassword, getWebsiteDetails, editPersonalInfo } from '../../../firestore/dbOperations'
import { motion, AnimatePresence } from 'framer-motion'
import Toasts from '../../Toasts/Toats'
import { withTranslation, } from 'react-i18next';
import BasicPlanImage from '../../../assets/pen.png'

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            newPassword: "",
            websiteName: "",
            websiteDescription: "",
            facebook: "",
            pinterest: "",
            instagram: "",
            twitter: "",
            youtube: "",
            isPersonalSuccessToastShowed: false,
            isPasswordChangedToastShowed: false
        }
 
        this.handleInputs = this.handleInputs.bind(this);
        this.personalInfoFormHandler = this.personalInfoFormHandler.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }
    componentDidMount() {
        getWebsiteDetails().then((value) => {
            value !== null && this.setState({
                websiteName: value.websiteName,
                websiteDescription: value.websitedescription
            })
        });

        
    }

    // Edit personal INfo 

     editPersonalInfo(event,userId,firstname,lastname){
         event.preventDefault()
         editPersonalInfo(userId,firstname,lastname)
     }
    // Receiving data from inputs   
    handleInputs(title, value) {
        switch (title) {
            case "First name":
                this.setState({ firstname: value })
                break;
            case "Last name":
                this.setState({ lastname: value })
                break;
            case "New Password":
                this.setState({ newPassword: value })
                break;
            default:
                break;
        }
    }
    // handle Personal Info from submit
    personalInfoFormHandler(event) {
        event.preventDefault();
        if (this.state.firstname != "" && this.state.lastname != "") {
            addUser(this.props.uid, this.state.firstname, this.state.lastname)
            this.setState({ isPersonalSuccessToastShowed: true });
            setTimeout(() => {
                document.location.reload();
            }, 2000);
        }
    }

    // handle Password change
    handleChangePassword(event) {
        event.preventDefault();
        if (this.state.newPassword.length > 5) {
            changePassword(this.state.newPassword);
            this.setState({ isPasswordChangedToastShowed: true })
            setTimeout(() => {
                this.setState({ isPasswordChangedToastShowed: false })
            }, 2000);
        } else {
            alert("Password must contain 6 or more letters")
        }
    }

    render() {
        const { t } = this.props;
        return (
            <div style={{ overflowY: "scroll", marginBottom: "100px" }} className="dashboardContent">
                <AnimatePresence>
                    {this.state.isPersonalSuccessToastShowed && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Toasts type="Name Changed" />
                        </motion.div>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {this.state.isPasswordChangedToastShowed && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Toasts type="Password Changed" />
                        </motion.div>
                    )}
                </AnimatePresence>
                <div className="head">
                    <div className="headContent">
                        <h2>{t("dashboard.settings")} </h2>
                    </div>
                </div>
                {/* Your plan */}
                <div className="dashboardSubtitle">
                                <span>YOUR PLAN</span>
                 </div>

                 <div className="settingsCard">
                     <div className="settingsCard__plan">
                         {/* Image */}
                         <div className="settingsCard__plan-image">
                             <img src={BasicPlanImage} alt="image basic " />
                         </div>
                         {/* Plan details */}
                         <div className="settingsCard__details">
                             <span className="settingsCard__details-title">{this.props.membership} Account</span>
                             <span className="settingsCard__details-desc">{this.props.membership == "Premium" ? "Your account is Premium and you have access to all features" : "Your account is under free plan. and you have access to limited features."}</span>
                        </div>
                     
                         <div className="settingsCard__details-upgrade">
                         {
                            this.props.membership == "Basic" &&                                <a href="/billing/plans">Upgrade</a>
                        }
                        </div>
                    
                     </div>
                </div>

                <div style={{ justifyContent: "flex-start" }} className="dashboardContentWrapper">
                    {this.props.role !== "admin" &&
                        <div style={{ width: "100%" }}>
                            <div className="dashboardSubtitle">
                                <span>{t("dashboard.personalInfo")}</span>
                            </div>
                            <div className="settingsCard">
                                <form >
                                    <div className="grid-2-col">
                                        <Input placeholder={this.props.firstname} name={t("dashboard.firstname")}  handleInputs={this.handleInputs} title={t("dashboard.firstname")} />
                                        <Input placeholder={this.props.lastname} name={t("dashboard.lastname")}  handleInputs={this.handleInputs} title={t("dashboard.lastname")} />
                                    </div>
                                    <div className="dashboardAction">
                                        <input onClick={(event)=>{this.editPersonalInfo(event,this.props.uid,this.state.firstname,this.state.lastname)} } type="submit" className="saveInput" value={t("dashboard.save")} />
                                    </div>
                                </form>
                            </div>
                        </div>
                    }
                    {/* Change Password */}
                    <div className="dashboardSubtitle">
                        <span>{t("dashboard.changePassword")}</span>
                    </div>
                    <div style={{ width: "94%" }} className="settingsCard">
                        <form onSubmit={this.handleChangePassword}>
                            <Input type="Password" name="New Password" handleInputs={this.handleInputs} title={t("dashboard.newPassword")} />
                            <div className="dashboardAction">
                                <input type="submit" className="saveInput" value={t("dashboard.save")} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
const MyComponent = withTranslation('common')(Settings)
export default MyComponent;