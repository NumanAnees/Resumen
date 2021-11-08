import React, { Component } from 'react';
import './Register.scss';
import GoogleImage from '../../../assets/google.png';
import FacebookImage from '../../../assets/facebook.png';
import Input from '../../Form/simple-input/SimpleInput';
import { addUser, IncrementUsers } from '../../../firestore/dbOperations'
import fire from '../../../conf/fire';
import Toast from '../../Toasts/Toats'
import { withTranslation } from 'react-i18next';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            passwordRepeat: "",
        }
        this.handleInputs = this.handleInputs.bind(this);
        this.signUp = this.signUp.bind(this);
    }
    handleInputs(title, value) {
        switch (title) {
            case "Email":
                this.setState((prevState, props) => ({
                    email: value
                }));
                break;
            case "Password":
                this.setState((prevState, props) => ({
                    password: value
                }));
                break;
            case "Repeat Password":
                this.setState((prevState, props) => ({
                    passwordRepeat: value
                }));
                break;
            default:
                break;
        }
    }
    signUp(event) {
        event.preventDefault();
        if (this.state.passwordRepeat == this.state.password) {
            fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
                addUser(u.user.uid,"Welcome","back",this.state.email)
            }).then((u) => {
                //    console.log(u)
                this.props.closeModal();
            }).catch((error) => {
                this.props.throwError(error.message);
                console.log(error);
            });
        } else {
            this.props.throwError("Passwords does not match");
        }
    }
    render() {
        const { t } = this.props;
        return (
            <div className="auth">
                <div className="head">
                    <span> {t("login.register")}</span>
                </div>
                <div className="body">
                    <form onSubmit={this.signUp} className="registerForm">
                        <Input name= "Email"  title= {t("login.email")} handleInputs={this.handleInputs} />
                        <Input name="Password" type="Password" title= {t("login.password")} handleInputs={this.handleInputs} />
                        <Input  name="Repeat Password"type="Password" title= {t("login.passwordRepeat")} handleInputs={this.handleInputs} />
                        <input className="inputSubmit" value= {t("login.register")} type="submit" />
                    </form>
                </div>
                {/* Modal Footer */}
                <div className="modalFooter">
                    <span> {t("login.alreadyHaveAccount")} <a onClick={() => this.props.handleNavigationClick()}> {t("login.login")}</a></span>
                </div>
            </div>
        );
    }
}
const MyComponent = withTranslation('common')(Register)
export default MyComponent;