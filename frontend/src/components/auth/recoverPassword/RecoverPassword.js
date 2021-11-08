import React, { Component } from 'react';
import GoogleImage from '../../../assets/google.png';
import FacebookImage from '../../../assets/facebook.png';
import Input from '../../Form/simple-input/SimpleInput';
import { addUser, IncrementUsers } from '../../../firestore/dbOperations'
import fire from '../../../conf/fire';
import { withTranslation } from 'react-i18next';
class RecoverPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            isSuccessToastShowed: true,
        }
        this.handleInputs = this.handleInputs.bind(this);
        this.recoverPassword = this.recoverPassword.bind(this);
    }
    handleInputs(title, value) {
        switch (title) {
            case "Email":
                this.setState((prevState, props) => ({
                    email: value
                }));
                break;
            default:
                break;
        }
    }
    recoverPassword(event) {
        event.preventDefault();
        var emailAddress = this.state.email;
        fire.auth().sendPasswordResetEmail(emailAddress).then(function () {
            this.props.throwSuccess();
        }).catch(function (error) {
            // An error happened.
        });
    }
    render() {
        const { t } = this.props;
        return (
            <div className="auth">
                <div className="head">
                    <span> {t("login.passwordRecovery")}</span>
                </div>
                <div className="body">
                    <form onSubmit={this.recoverPassword} className="registerForm">
                        <Input title={t("login.email")} handleInputs={this.handleInputs} />
                        <input className="inputSubmit" value={t("login.recoverMyPassword")} type="submit" />
                    </form>
                </div>
                {/* Modal Footer */}
                <div className="modalFooter">
                    <span>{t("login.alreadyHaveAccount")}<a onClick={() => this.props.handleNavigationClick()}>{t("login.login")}</a></span>
                </div>
            </div>
        );
    }
}
const MyComponent = withTranslation('common')(RecoverPassword)
export default MyComponent;