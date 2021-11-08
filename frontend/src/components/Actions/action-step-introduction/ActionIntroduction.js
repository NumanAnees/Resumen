import React, { Component } from "react";
import "./ActionIntroduction.scss";
import logo from "../../../assets/logo/logo.png";
import conf from "../../../conf/configuration";
import { Link } from "react-router-dom";
import LanguagePicker from "../../Form/language-picker/LanguagePicker";
import { withTranslation } from "react-i18next";
import { getPages } from "../../../firestore/dbOperations";
class ActionIntroduction extends Component {
  constructor(props) {
    super(props);
    if (document.location.search.substr(0, 7) == "?step=3") {
      this.props.goThirdStep();
    }

    this.state = {
      pages: [],
    };
    window.location.pathname.substring(0, 8) == "/" && this.customStyles();

    this.customStyles = this.customStyles.bind(this);
  }
  authVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  customStyles() {
    document.getElementById("root").style.overflow = "hidden";
    document.getElementById("root").style.height = "100%";
    document.getElementsByTagName("body")[0].style.height = "100%";
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
    document.getElementsByTagName("html")[0].style.height = "100%";
    document.getElementsByTagName("html")[0].style.overflow = "hidden";
    document.getElementsByTagName("html")[0].style.overflowX = "hidden";
  }

  componentDidMount() {
    getPages().then(
      (value) => value !== null && this.setState({ pages: value })
    );
  }
  render() {
    const { t } = this.props;
    return (
      <div className="action-introWrapper">
        <div className="head">
          <div className="brand">
            {conf.brand.useImg == false ? (
              <span>{conf.brand.name}</span>
            ) : (
              <img className="logo" src={logo} />
            )}
          </div>
          <div className="authentication">
            {this.props.user != null ? (
              <Link
                style={{ textDecoration: "none" }}
                to={{ pathname: "./dashboard" }}
                className="authenticationButton"
              >
                {" "}
                {t("selectionAction.account")}
              </Link>
            ) : (
              <a
                onClick={() => this.props.authBtnHandler()}
                className="authenticationButton"
              >
                {" "}
                {t("intro.login")}{" "}
              </a>
            )}
            {this.props.values.email == conf.adminEmail && (
              <Link
                style={{ textDecoration: "none" }}
                className="authenticationButton"
                to={{ pathname: "./adm/dashboard" }}
                className="authenticationButton"
              >
                {" "}
                {t("selectionAction.admin")}
              </Link>
            )}
            {/* {this.props.user != null && <a onClick={() => this.props.logout()} className="authenticationButton">Logout</a>} */}
            <LanguagePicker
              isHome={true}
              values={this.props.values}
              handleLanguageClick={this.props.handleLanguageClick}
            />
          </div>
        </div>
        <div className="body">
          <h1>
            {t("intro.titleLeft")} <span>{t("intro.titleSpan")}</span>{" "}
            {t("intro.titleRight")}
          </h1>
          <ul>
            <li>
              {" "}
              <div className="numberWrapper"> 1 </div>{" "}
              <span>{t("intro.step1")} </span>{" "}
            </li>
            <li>
              {" "}
              <div className="numberWrapper"> 2 </div>
              <span>{t("intro.step2")} </span>{" "}
            </li>
            <li>
              {" "}
              <div className="numberWrapper"> 3 </div>
              <span> {t("intro.step3")}</span>
            </li>
          </ul>
          <div className="footer">
            <ul>
              <li>
                <a href="https://bacca-support.com/index.php?p=link&sp=3&ssp=en">
                  Contact Us
                </a>{" "}
              </li>
              <li>
                <a
                  href=" https://story.kuana.id 
"
                >
                  Blog
                </a>{" "}
              </li>
              {this.state.pages !== null &&
                this.state.pages.map((value, index) => {
                  return (
                    <li>
                      {" "}
                      <Link to={{ pathname: "/p/" + value.id }}>
                        {value.id}
                      </Link>{" "}
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
const MyComponent = withTranslation("common")(ActionIntroduction);
export default MyComponent;
