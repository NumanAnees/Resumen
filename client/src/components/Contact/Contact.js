import React, { Component } from 'react';
import '../../components/CustomPage/CustomPage.scss'
import './Contact.scss'
import Logo from '../../assets/logo/logo.png';
import Lottie from 'react-lottie';
import LoaderAnimation from '../../assets/animations/lottie-loader.json';
import { ReactComponent as FacebookImage } from '../../assets/facebook.svg'
import { ReactComponent as TwitterImage } from '../../assets/twitter.svg'
import { ReactComponent as InstagramImage } from '../../assets/instagram.svg'
import { ReactComponent as PinterestImage } from '../../assets/pinterest.svg'
import { ReactComponent as YoutubeImage } from '../../assets/youtube.svg'
import { getPageByName, getPages, getWebsiteData, getSocialLinks, addContactMessage } from '../../firestore/dbOperations'
import SimpleInput from '../Form/simple-input/SimpleInput';
import SimpleTextarea from '../Form/simple-textarea/SimpleTextarea';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom'
class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: [],
            socialLinks: [],
            email: "",
            websiteDescription: "",
            name: "",
            message: "",
            isSuccessShowed:false,
            loaded: false
        }
        this.customStyles = this.customStyles.bind(this);
        this.handleInputs = this.handleInputs.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.redirectToHome = this.redirectToHome.bind(this)
        // Inisialising proper  style for custom pages
        window.location.pathname.substring(0, 8) == "/contact" && this.customStyles()
    }
    componentDidMount() {
        getPages().then(value =>
            value !== null && this.setState({ pages: value })
        );

        getWebsiteData().then(value => {
            value !== null && this.setState({ websiteName: value.title, websiteDescription: value.description })
        })
        getSocialLinks().then((value) => {
            value !== null && this.setState({ socialLinks: value })
            this.setState({ loaded: true })
        });
    }
    // Handling inputs
    handleInputs(inputName, value) {
        switch (inputName) {
            case "Email":
                this.setState({ email: value })
                break;
            case "Name":
                this.setState({ name: value })
                break;
            case "Message":
                this.setState({ message: value })
                break;
            default:
                break;
        }
    }
    // redirect 
    redirectToHome() {
        window.location.href = "/"
    }
    // Giving the proper stylicn for custom pages
    customStyles() {
        document.getElementById("root").style.overflow = "none"
        document.getElementById("root").style.height = "unset"
        document.getElementsByTagName("body")[0].style.height = "fit-content"
        document.getElementsByTagName("body")[0].style.overflow = "unset"
        document.getElementsByTagName("html")[0].style.height = "fit-content"
        document.getElementsByTagName("html")[0].style.overflow = "scroll"
        document.getElementsByTagName("html")[0].style.overflowX = "hidden"
    }
    // Handl submit 
    handleSubmit() {
        if(this.state.email.length > 0 && this.state.name.length > 0 && this.state.message.length >0) {
            addContactMessage(this.state.email, this.state.name, this.state.message)
            setTimeout(() => {
                this.setState({isSuccessShowed:true})
            }, 1000);
        }else{
            alert("Please fill all fields !")
        }

    }
    render() {
        const loaderOptions = {
            loop: true,
            autoplay: true,
            animationData: LoaderAnimation,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };
        return (
            <div className="custom-page">
                {
                    this.state.loaded == false &&
                    <div className="loading">
                        <Lottie options={loaderOptions}
                            height={190}
                            width={400} />
                    </div>
                }
                {/* Navbar */}
                <div className="custom-page__nav">
                    <a><img className="custom-page__nav__logo" src={Logo} /></a>
                    <ul className="custom-page__navlinks">
                        <li><a href="/" className="custom-page__navlinks">Home</a></li>
                        {this.state.pages !== null && this.state.pages.map((value, index) => {
                            return <li>  <Link className="custom-page__navlinks" to={{ pathname: "/p/" + value.id }}>{value.id}</Link>  </li>

                        })}
                        <li><Link to="/contact" className="custom-page__navlinks">Contact Us</Link> </li>

                    </ul>
                    <div className="custom-page__nav__action">
                        <Link onClick={() => { this.redirectToHome() }} >Go to App</Link>
                    </div>
                </div>
                {/* Page Content */}
                <div className="custom-page__content" >
                    <div className="custom-page__contactUs">
                        {/* Contact Head */}
                        <div className="custom-page-contactHead">
                        
                            <h1>Contact Us</h1> 

                            {
                                this.state.isSuccessShowed &&
                                <div className="contact-success">
                                Thank you for contacting us we will get back to you soon.
                                </div>
                            }
                        
                            <p>Have comments, questions, or feedback to share? Our team would love to hear from you. Give us a call or submit a message below.</p>
                        </div>
                        {/* Contact Body */}
                        <div className="custom-page-contactBody">
                            <SimpleInput handleInputs={this.handleInputs} title="Email" name="Email" />
                            <SimpleInput handleInputs={this.handleInputs} title="Name" name="Name" />
                            <SimpleTextarea handleInputs={this.handleInputs} title="Message" name="Message" />
                            <Button onClick={() => { this.handleSubmit() }} variant="contained" color="primary">
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>
                {/* Page Footer */}
                <div className="custom-page__footer-wrapper">
                    <div className="custom-page__footer" >
                        {/* Footer Item */}
                        <div className="custom-page__footer-item">
                            <a className="custom-page__footer-item__title"> Social  </a>
                            <ul className="custom-page__footer-item__social-links">
                                <li><div className="social-link__facebook"> <a href={this.state.socialLinks !== null ? this.state.socialLinks.facebook : "#"}><FacebookImage className="social-link__icon" /></a></div></li>
                                <li><div className="social-link__twitter"> <a href={this.state.socialLinks !== null ? this.state.socialLinks.twitter : "#"}> <TwitterImage className="social-link__icon" /></a> </div></li>
                                <li><div className="social-link__pinterest"> <a href={this.state.socialLinks !== null ? this.state.socialLinks.pinterest : "#"}> <PinterestImage className="social-link__icon" /></a></div></li>
                                <li><div className="social-link__instagram"> <a href={this.state.socialLinks !== null ? this.state.socialLinks.instagram : "#"}> <InstagramImage className="social-link__icon" /> </a></div></li>
                                <li><div className="social-link__youtube"><a href={this.state.socialLinks !== null ? this.state.socialLinks.youtube : "#"}><YoutubeImage className="social-link__icon" /> </a></div></li>
                            </ul>
                            <p>
                                Follow us in social media to get exclusive resources straight to your feed
                            </p>
                        </div>
                        {/* Footer Item */}
                        <div className="custom-page__footer-item">
                            <a className="custom-page__footer-item__title"> Content  </a>
                            <ul className="custom-page__footer-item__website-links">
                                <li><a href="/">Home</a></li>
                                {this.state.pages !== null && this.state.pages.map((value, index) => {
                                    return <li><a href={'/p/' + value.id}>{value.id}</a></li>
                                })}
                            </ul>
                        </div>
                        {/* Footer Item */}
                        <div className="custom-page__footer-item">
                            <a className="custom-page__footer-item__title"> About  </a>
                            <p>
                                {this.state.websiteDescription}
                            </p>
                        </div>
                    </div>
                    {/* Divider */}
                    <hr className="custom-page__footer-devider"></hr>
                    <div className="custom-page__footer-copyright">
                        <span>{this.state.websiteName}</span> Copyright © 2021-2022 All rights reserved.
                    </div>
                </div>
            </div>
        )
    }
}
export default Contact