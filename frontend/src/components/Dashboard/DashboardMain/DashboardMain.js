import React, { Component } from "react";
import "./DashboardMain.scss";
import conf from "../../../conf/configuration";
import logo from "../../../assets/logo/logo.png";
import { Link } from "react-router-dom";
import Toasts from "../../Toasts/Toats";
import Stats from "../stats/stats";
import fire from "../../../conf/fire";
// Components
import ResumeList from "../ResumesList/ResumesList";
import ProfileDropDown from "../ProfileDropdown/ProfileDropdown";
import Settings from "../Settings/Settings";
// Images
import userImage from "../../../assets/user.png";
import arrow from "../../../assets/arrow.png";
import { getFullName, getAds } from "../../../firestore/dbOperations";
// Animation Library
import { motion, AnimatePresence, transform } from "framer-motion";
import { withTranslation } from "react-i18next";
import AddAds from "../../addAds/AddAds";
import AddPage from "../AddPage/AddPage";
import { Helmet } from "react-helmet";
import { getWebsiteData } from "../../../firestore/dbOperations";
import i18n from "../../../i18n";
import { getPages } from "../../../firestore/dbOperations";
// import i18
class DashboardMain extends Component {
  constructor(props) {
    super(props);
    this.authListener = this.authListener.bind(this);
    this.state = {
      user: null,
      role: "user",
      membership: "",
      firstname: "",
      lastname: "",
      activeNav: "Dashboard",
      isDeleteToastShowed: false,
      isDropdownShowed: false,
      isCommingSoonShowed: false,
      pages: [],
      isSettingsShowed: false,
      isAdsManagerShowed: false,
      isDashboardShowed: true,
      isAddPagesShowed: false,
      // Meta data
      metaDataFetched: false,
      websiteTitle: "",
      websiteDescription: "",
      websiteKeywords: "",
    };
    this.dropdownHandler = this.dropdownHandler.bind(this);
    this.handleCoverLetter = this.handleCoverLetter.bind(this);
    this.showDeletedToast = this.showDeletedToast.bind(this);
    this.settingsClickHandler = this.settingsClickHandler.bind(this);
    this.handleDashboardClick = this.handleDashboardClick.bind(this);
    this.handleAdsClick = this.handleAdsClick.bind(this);
    this.handlePagesClick = this.handlePagesClick.bind(this);
    this.logout = this.logout.bind(this);
  }
  componentWillMount() {
    this.authListener();
    getPages().then(
      (value) => value !== null && this.setState({ pages: value })
    );
  }

  /// Check if the user is authenticated
  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user.uid });
        getFullName(user.uid).then((value) => {
          value !== undefined &&
            this.setState({
              firstname: value.firstname,
              lastname: value.lastname,
              membership: value.membership,
            });
        });
        localStorage.setItem("user", user.uid);
        /// Checking if user ad
        if (user.email === conf.adminEmail) {
          this.setState({ role: "admin" });
          getAds();
        }
      } else {
        this.setState({ user: null });
        localStorage.removeItem("user");
        window.location.href = "/";
      }
    });
  }
  // Show Drop down
  dropdownHandler() {
    this.setState((prevState, props) => ({
      isDropdownShowed: !prevState.isDropdownShowed,
    }));
  }
  // Handle Settings Click
  settingsClickHandler() {
    this.setState((prevState, props) => ({
      isSettingsShowed: !prevState.isSettingsShowed,
      isAdsManagerShowed: false,
    }));
  }
  // Handle dashboard Click
  handleDashboardClick() {
    this.setState((prevState, props) => ({
      isSettingsShowed: false,
      isDashboardShowed: true,
      activeNav: "Dashboard",
      isAdsManagerShowed: false,
      isAddPagesShowed: false,
    }));
  }
  // Handle Ads Click
  handleAdsClick() {
    this.setState((prevState, props) => ({
      isSettingsShowed: false,
      activeNav: "Ads Manager",
      isDashboardShowed: false,
      isAdsManagerShowed: true,
    }));
  }
  // Handle Ads Click
  handlePagesClick() {
    this.setState((prevState, props) => ({
      isSettingsShowed: false,
      activeNav: "Pages",
      isDashboardShowed: false,
      isAdsManagerShowed: false,
      isAddPagesShowed: true,
    }));
  }
  // Logout
  logout() {
    fire.auth().signOut();
    localStorage.removeItem("currentResumeId");
    localStorage.removeItem("currentResumeItem");
    this.currentResume = null;
  }
  // Handling cover letter click to show coming soon message
  handleCoverLetter() {
    setTimeout(() => {
      this.setState((prevStat, props) => ({
        isCommingSoonShowed: !prevStat.isCommingSoonShowed,
      }));
    }, 2000);
    this.setState((prevStat, props) => ({
      isCommingSoonShowed: !prevStat.isCommingSoonShowed,
    }));
  }
  // Show deleted toast
  showDeletedToast() {
    setTimeout(() => {
      this.setState((prevState, props) => ({
        isDeleteToastShowed: !prevState.isDeleteToastShowed,
      }));
    }, 2000);
    this.setState((prevState, props) => ({
      isDeleteToastShowed: !prevState.isDeleteToastShowed,
    }));
  }
  componentDidMount() {
    getWebsiteData().then((data) =>
      this.setState({
        metaDataFetched: true,
        websiteTitle: data.title,
        websiteDescription: data.description,
        websiteKeywords: data.keywords,
      })
    );
  }
  render() {
    const { t } = this.props;

    return this.state.user !== null ? (
      <div className="dashboardWrapper">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{this.state.websiteTitle + " | Dashboard"}</title>
          <meta name="description" content={this.state.websiteDescription} />
          <meta name="keywords" content={this.state.websiteKeywords} />
        </Helmet>
        <AnimatePresence>
          {this.state.isDeleteToastShowed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Toasts type="Delete" />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="navbar">
          {/* Website Logo */}
          <div className="brand">
            {conf.brand.useImg ? (
              <img src={logo} />
            ) : (
              <span> {conf.brand.name} </span>
            )}
          </div>
          {/* Navigation List */}
          <div className="dashboardNavigaitionList">
            <ul>
              <li>
                {" "}
                <Link to="/" className="dashboardNavItem">
                  {t("dashboard.homepage")}
                </Link>
              </li>
              <li>
                <a
                  onClick={() => this.handleDashboardClick()}
                  className={
                    this.state.activeNav == "Dashboard"
                      ? "dashboardNavItem dashboardNavItemActive"
                      : "dashboardNavItem "
                  }
                >
                  {t("dashboard.dashboard")}
                </a>
              </li>
              {this.state.pages !== null &&
                this.state.pages.map((value, index) => {
                  return (
                    <li>
                      {" "}
                      <Link
                        className="dashboardNavItem"
                        to={{ pathname: "/p/" + value.id }}
                      >
                        {value.id}
                      </Link>{" "}
                    </li>
                  );
                })}
              <li>
                <a
                  href="https://story.kuana.id 
"
                  className="dashboardNavItem"
                >
                  Blog
                </a>{" "}
              </li>
              <li>
                <a
                  href="https://bacca-support.com/index.php?p=link&sp=3&ssp=en 
"
                  className="dashboardNavItem"
                >
                  Contact Us
                </a>{" "}
              </li>

              <li>
                <Link
                  onClick={() => this.handleCoverLetter()}
                  className="dashboardNavItem"
                >
                  {t("dashboard.coverLetter")}
                </Link>

                <AnimatePresence>
                  {this.state.isCommingSoonShowed && (
                    <motion.a
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="statusSoon"
                    >
                      {t("dashboard.commingSoon")}
                    </motion.a>
                  )}
                </AnimatePresence>
              </li>
            </ul>
          </div>
          {/* Profile  */}
          <div
            onClick={() => this.dropdownHandler()}
            className="dashboarProfile"
          >
            <img
              className="dashboarProfileImage"
              src={userImage}
              alt="profile Image"
            />
            <a className="dashboarProfileName">
              {this.state.firstname === "" ||
              this.state.lastname === "" ||
              this.state.lastname === undefined ||
              this.state.firstname === ""
                ? "Welcome Back"
                : this.state.firstname + " " + this.state.lastname}{" "}
              <img src={arrow} alt="toggler" />
            </a>
            <AnimatePresence>
              {this.state.isDropdownShowed && (
                <motion.div
                  transition={{ duration: 0.3 }}
                  initial={{ translateX: 400 }}
                  animate={{ translateX: 0 }}
                  exit={{ translateX: 400 }}
                  className="dashboardDropdown"
                >
                  <ProfileDropDown
                    user={this.state.user}
                    handleDashboardClick={this.handleDashboardClick}
                    handleSettingsClick={this.settingsClickHandler}
                    logout={this.logout}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="dashboardContentWrapper">
          {this.state.isSettingsShowed ? (
            <Settings
              membership={this.state.membership}
              role={this.state.role}
              firstname={this.state.firstname}
              lastname={this.state.lastname}
              uid={this.state.user}
            />
          ) : this.state.isAdsManagerShowed ? (
            <AddAds />
          ) : this.state.isAddPagesShowed ? (
            <AddPage />
          ) : (
            <ResumeList showDeletedToast={this.showDeletedToast} />
          )}
        </div>
      </div>
    ) : (
      " "
    );
  }
}
const MyComponent = withTranslation("common")(DashboardMain);
export default MyComponent;
