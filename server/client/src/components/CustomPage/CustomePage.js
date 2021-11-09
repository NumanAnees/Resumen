import React, { Component } from "react";
import "./CustomPage.scss";
import {
  getPageByName,
  getPages,
  getSocialLinks,
  getWebsiteData,
} from "../../firestore/dbOperations";
// Images
import Logo from "../../assets/logo/logo.png";
import { ReactComponent as FacebookImage } from "../../assets/facebook.svg";
import { ReactComponent as TwitterImage } from "../../assets/twitter.svg";
import { ReactComponent as InstagramImage } from "../../assets/instagram.svg";
import { ReactComponent as PinterestImage } from "../../assets/pinterest.svg";
import { ReactComponent as YoutubeImage } from "../../assets/youtube.svg";
import { Link } from "react-router-dom";
class CustomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
      websiteName: "",
      websiteDescription: "",
      pageContent: "",
      socialLinks: null,
      loaded: false,
      currentPage: this.props.match.params.custompage,
    };

    // Inisialising proper  style for custom pages
    window.location.pathname.substring(0, 3) == "/p/" && this.customStyles();
  }

  componentDidMount() {
    getPageByName(this.state.currentPage).then((value) => {
      this.setState({
        pageContent: value.pagecontent,
        currentPage: this.props.match.params.custompage,
      });
    });
    getPages().then(
      (value) => value !== null && this.setState({ pages: value })
    );
    getWebsiteData().then((value) => {
      value !== null &&
        this.setState({
          websiteName: value.title,
          websiteDescription: value.description,
        });
    });
    getSocialLinks()
      .then((value) => {
        value !== null && this.setState({ socialLinks: value });
      })
      .then((value) => {
        this.setState({ loaded: true });
      });
  }

  // Giving the proper stylicn for custom pages
  customStyles() {
    document.getElementById("root").style.overflow = "none";
    document.getElementById("root").style.height = "unset";
    document.getElementsByTagName("body")[0].style.height = "fit-content";
    document.getElementsByTagName("body")[0].style.overflow = "unset";
    document.getElementsByTagName("html")[0].style.height = "fit-content";
    document.getElementsByTagName("html")[0].style.overflow = "scroll";
    document.getElementsByTagName("html")[0].style.overflowX = "hidden";
  }

  render() {
    return (
      <>
        {this.state.loaded == true && (
          <>
            <div id="customPage" className="custom-page">
              {/* Navbar */}
              <div className="custom-page__nav">
                <a>
                  <img className="custom-page__nav__logo" src={Logo} />
                </a>
                <ul className="custom-page__navlinks">
                  <li>
                    <Link
                      className="custom-page__navlinks"
                      to={{ pathname: "/" }}
                    >
                      Home
                    </Link>
                  </li>
                  {this.state.pages.map((value, index) => {
                    return (
                      <li key={index}>
                        {" "}
                        <a
                          className="custom-page__navlinks"
                          href={"./" + value.id}
                        >
                          {value.id}
                        </a>{" "}
                      </li>
                    );
                  })}
                  <li>
                    <a
                      href="https://story.kuana.id "
                      className="custom-page__navlinks"
                    >
                      Blog
                    </a>{" "}
                  </li>
                  <li>
                    <a
                      href="https://bacca-support.com/index.php?p=link&sp=3&ssp=en "
                      className="custom-page__navlinks"
                    >
                      Contact Us
                    </a>{" "}
                  </li>
                </ul>
                <div className="custom-page__nav__action">
                  <Link to={{ pathname: "/" }}>Go to App</Link>
                </div>
              </div>
              {/* Page Content */}
              <div
                dangerouslySetInnerHTML={{ __html: this.state.pageContent }}
                className="custom-page__content"
              ></div>
              {/* Page Footer */}
              <div className="custom-page__footer-wrapper">
                <div className="custom-page__footer">
                  {/* Footer Item */}
                  <div className="custom-page__footer-item">
                    <a className="custom-page__footer-item__title"> Social </a>
                    <ul className="custom-page__footer-item__social-links">
                      <li>
                        <div className="social-link__facebook">
                          {" "}
                          <a
                            href={
                              this.state.socialLinks !== null
                                ? this.state.socialLinks.facebook
                                : "#"
                            }
                          >
                            <FacebookImage className="social-link__icon" />
                          </a>
                        </div>
                      </li>
                      <li>
                        <div className="social-link__twitter">
                          {" "}
                          <a
                            href={
                              this.state.socialLinks !== null
                                ? this.state.socialLinks.twitter
                                : "#"
                            }
                          >
                            {" "}
                            <TwitterImage className="social-link__icon" />
                          </a>{" "}
                        </div>
                      </li>
                      <li>
                        <div className="social-link__pinterest">
                          {" "}
                          <a
                            href={
                              this.state.socialLinks !== null
                                ? this.state.socialLinks.pinterest
                                : "#"
                            }
                          >
                            {" "}
                            <PinterestImage className="social-link__icon" />
                          </a>
                        </div>
                      </li>
                      <li>
                        <div className="social-link__instagram">
                          {" "}
                          <a
                            href={
                              this.state.socialLinks !== null
                                ? this.state.socialLinks.instagram
                                : "#"
                            }
                          >
                            {" "}
                            <InstagramImage className="social-link__icon" />{" "}
                          </a>
                        </div>
                      </li>
                      <li>
                        <div className="social-link__youtube">
                          <a
                            href={
                              this.state.socialLinks !== null
                                ? this.state.socialLinks.youtube
                                : "#"
                            }
                          >
                            <YoutubeImage className="social-link__icon" />{" "}
                          </a>
                        </div>
                      </li>
                    </ul>
                    <p>
                      Follow us in social media to get exclusive resources
                      straight to your feed
                    </p>
                  </div>
                  {/* Footer Item */}
                  <div className="custom-page__footer-item">
                    <a className="custom-page__footer-item__title"> Content </a>
                    <ul className="custom-page__footer-item__website-links">
                      <li>
                        <a href="/">Home</a>
                      </li>
                      {this.state.pages.map((value, index) => {
                        return (
                          <li key={index}>
                            <a href={"/p/" + value.id}>{value.id}</a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  {/* Footer Item */}
                  <div className="custom-page__footer-item">
                    <a className="custom-page__footer-item__title"> About </a>
                    <p>{this.state.websiteDescription}</p>
                  </div>
                </div>
                {/* Divider */}
                <hr className="custom-page__footer-devider"></hr>
                <div className="custom-page__footer-copyright">
                  <span>{this.state.websiteName}</span> Copyright © 2021-2022
                  All rights reserved.
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}
export default CustomePage;
