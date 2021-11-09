import React, { Component, useState, useEffect } from "react";
import Logo from "../../../assets/logo/logo.png";
import conf from "../../../conf/configuration";
import { ReactComponent as FacebookImage } from "../../../assets/facebook.svg";
import { ReactComponent as TwitterImage } from "../../../assets/twitter.svg";
import { ReactComponent as InstagramImage } from "../../../assets/instagram.svg";
import { ReactComponent as PinterestImage } from "../../../assets/pinterest.svg";
import { ReactComponent as YoutubeImage } from "../../../assets/youtube.svg";
import "./Plans.scss";
import "../../CustomPage/CustomPage.scss";
import {
  getPageByName,
  getPages,
  getWebsiteDetails,
  getSocialLinks,
  getWebsiteData,
  getSubscriptionStatus,
} from "../../../firestore/dbOperations";
import PlansTable from "./PlansTable";
import Checkout from "./Checkout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, ElementsConsumer } from "@stripe/react-stripe-js";
import { Link } from "react-router-dom";

class Billing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
      websiteName: "",
      websiteDescription: "",
      pageContent: "",
      socialLinks: null,
      step: 0,
      monthly: null,
      quartarly: null,
      yearly: null,
      selectedPlan: null,
      isLoading: true,
      onlyPP: false,
    };
    this.customStyles();
    this.stripePromise = loadStripe(conf.stripe_publishable_key);
    window.location.pathname.substring(0, 14) == "/billing/plans" &&
      this.customStyles();
    this.customStyles = this.customStyles.bind(this);
    //this.nextStep = this.nextStep.bind(this);
    this.previousStep = this.previousStep.bind(this);
    //this.pagereload = this.pagereload.bind(this);
  }
  // const nextStep = async(plan) =>{
  //   const amount = 40.0;
  //   let invoiceUrl;
  //   if (!invoiceUrl) {
  //           const invoiceData = {
  //               amount,
  //               redirect_url: `${window.location.origin}/try-checkout`
  //           };

  //   try {
  //               const response = await fetch('/api/invoice', {
  //                   method: 'POST',
  //                   headers: {
  //                       'Content-Type': 'application/json;charset=utf-8'
  //                   },
  //                   body: JSON.stringify(invoiceData)
  //               });

  //               const data = await response.json();
  //               if (response.status >= 200 && response.status <= 299)
  //                   invoiceUrl = data.invoice_url;
  //               else alert(data.message);

  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  // pagereload() {
  //   window.location.reload();
  // }
  previousStep() {
    this.setState((prevState) => ({
      step: prevState.step - 1,
    }));
  }
  // Giving the proper stylicn for custom pages
  customStyles() {
    document.getElementById("root").style.overflow = "unset";
  }
  componentDidMount() {
    getPages().then((value) => this.setState({ pages: value }));
    getWebsiteData().then((value) => {
      value !== null &&
        this.setState({
          websiteName: value.title,
          websiteDescription: value.description,
        });
    });
    getSocialLinks().then((value) => {
      value !== null && this.setState({ socialLinks: value });
    });
    getSubscriptionStatus().then((data) => {
      this.setState({
        monthly: data.monthlyPrice,
        quartarly: data.quartarlyPrice,
        yearly: data.yearlyPrice,
        onlyPP: data.onlyPP,
      });
    });
  }
  render() {
    return (
      <Elements stripe={this.stripePromise}>
        <div className="custom-page">
          {/* Navbar */}
          <div className="custom-page__nav">
            <a>
              <img className="custom-page__nav__logo" src={Logo} />
            </a>
            <ul className="custom-page__navlinks">
              <li
              // onClick={() => {
              //   this.pagereload();
              // }}
              >
                {" "}
                <Link className="custom-page__navlinks" to={{ pathname: "/" }}>
                  Home
                </Link>
              </li>
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
          <div className="custom-page__content">
            <div className="custom-page__Plans">
              {this.state.step == 0 && (
                <PlansTable
                  monthly={this.state.monthly}
                  quartarly={this.state.quartarly}
                  yearly={this.state.yearly}
                  nextStep={this.nextStep}
                />
              )}
              {this.state.step == 1 && (
                <ElementsConsumer>
                  {({ stripe, elements }) => (
                    <Checkout
                      onlyPP={this.state.onlyPP}
                      previousStep={this.previousStep}
                      stripe={stripe}
                      elements={elements}
                      monthly={this.state.monthly}
                      quartarly={this.state.quartarly}
                      yearly={this.state.yearly}
                      selectedPlan={this.state.selectedPlan}
                    />
                  )}
                </ElementsConsumer>
              )}
            </div>
          </div>
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
                  Follow us in social media to get exclusive resources straight
                  to your feed
                </p>
              </div>
              {/* Footer Item */}
              <div className="custom-page__footer-item">
                <a className="custom-page__footer-item__title"> Content </a>
                <ul className="custom-page__footer-item__website-links">
                  <li>
                    <a href="/">Home</a>
                  </li>
                  {this.state.pages !== null &&
                    this.state.pages.map((value, index) => {
                      return (
                        <li>
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
              <span>{this.state.websiteName}</span> Copyright © 2021-2022 All
              rights reserved.
            </div>
          </div>
        </div>
      </Elements>
    );
  }
}
export default Billing;
