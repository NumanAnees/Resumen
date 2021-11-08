import React, { Component } from 'react'
import { PayPalButton } from "react-paypal-button-v2";
import conf from '../../../conf/configuration'
import {
    CardElement
} from "@stripe/react-stripe-js";
import CheckImage from '../../../assets/check.png'
import AmericanExpress from '../../../assets/paiment/american-express.png'
import Paypal from '../../../assets/paiment/paypal.png'
import Visa from '../../../assets/paiment/visa.png'
import MasterCard from '../../../assets/paiment/mastercard.png'
import JCB from '../../../assets/paiment/jcb.png'
import DropdownInput from '../../Form/dropdown-input/DropdownInput';
import SimpleInput from '../../Form/simple-input/SimpleInput';
import Lottie from 'react-lottie';
import axios from 'axios'
import { addSbs } from '../../../firestore/dbOperations'
import SuccessAnimation from '../../../assets/animations/50049-nfc-successful.json';
class Checkout extends Component {
    constructor(props) {
        super(props);
        this.countries = ['Afghanistan', 'Åland Islands', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bangladesh', 'Barbados', 'Bahamas', 'Bahrain', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'British Indian Ocean Territory', 'British Virgin Islands', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burma', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo-Brazzaville', 'Congo-Kinshasa', 'Cook Islands', 'Costa Rica', '$_[', 'Croatia', 'Curaçao', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'El Salvador', 'Egypt', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Federated States of Micronesia', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Lands', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard and McDonald Islands', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn Islands', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Réunion', 'Romania', 'Russia', 'Rwanda', 'Saint Barthélemy', 'Saint Helena', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Martin', 'Saint Pierre and Miquelon', 'Saint Vincent', 'Samoa', 'San Marino', 'São Tomé and Príncipe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Sint Maarten', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia', 'South Korea', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen', 'Sweden', 'Swaziland', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Vietnam', 'Venezuela', 'Wallis and Futuna', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe'];
        this.state = {
            step: 0,
            isLoading: false,
            postalCode: "",
            country: "",
            cardHolder: "",
            address: "",
        }
        this.nextStep = this.nextStep.bind(this);
        this.previousStep = this.previousStep.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }
    handleInput(name, event) {
        switch (name) {
            case "Postal":
                this.setState({
                    postalCode: event.target.value
                })
                break;
            case "Country":
                this.setState({
                    postalCode: event.target.value
                })
                break;
            case "CardHolder":
                this.setState({
                    cardHolder: event.target.value
                })
                break;
            case "Address":
                this.setState({
                    address: event.target.value
                })
                break;
            default:
                break;
        }
    }
    handleSubmit = async () => {
        const { stripe, elements } = this.props;
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }
        this.setState({ isLoading: true })
        const res = await axios.post("https://" + conf.backendUrl + "/api/pay", { price: this.props.selectedPlan == "monthly" ? this.props.monthly : this.props.selectedPlan == "halfYear" ? this.props.quartarly : this.props.selectedPlan == "yearly" ? this.props.yearly : 0 });
        const clientSecret = res.data['client_secret'];
        const time = res.data["server_time"]
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: this.state.cardHolder
                },
            },
            // receipt_email: "ja3tar@gmail.com"
        });
        if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            alert("Error")
            console.log(result.error.message);
        } else {
            // The payment has been processed!
            if (result.paymentIntent.status === 'succeeded') {
            console.log("adding subscription");          
                addSbs(this.props.selectedPlan, "Visa", new Date(time).toDateString(),this.props.selectedPlan == "monthly" ? this.props.monthly : this.props.selectedPlan == "halfYear" ? this.props.quartarly : this.props.selectedPlan == "yearly" ? this.props.yearly : 0)
                this.setState({ step: 3 })
                // Show a success message to your customer
            }
        }
    };
    nextStep() {
        this.setState((prevStat, props) => ({
            step: prevStat.step + 1
        }))
    }
    previousStep() {
        this.setState((prevStat, props) => ({
            step: prevStat.step - 1
        }))
    }
    render() {
        const successOptions = {
            loop: false,
            autoplay: true,
            animationData: SuccessAnimation,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };
        return (
            <div className="checkout__content">
                {/* Left */}
                <div className="checkout__content-left">
                    <div className="checkout__content-left-wrapper">
                        <h2 className="checkout__content-leftTitle">Get your dream job</h2>
                        {/* Paiment list */}
                        <ul className="checkout__content-leftList">
                            <li> <img src={CheckImage} alt="check" /> Payment through a trusted payment service </li>
                            <li> <img src={CheckImage} alt="check" /> SSL Secure / 256-bit SSL secure checkout</li>
                            <li> <img src={CheckImage} alt="check" /> 7-day money back guarantee</li>
                        </ul>
                        {/* Questio */}
                        <div className="checkout__content-leftQuestion">
                            <h3>How can I cancel?</h3>
                            <p>You can easily cancel your subscription by simply contacting our support team via email or telephone, or by using our contact page.</p>
                        </div>
                        {/* Questio */}
                        <div className="checkout__content-leftQuestion">
                            <h3>Accepted Payments Methods</h3>
                            <div className="methods">
                                <img src={Visa} alt="card" />
                                <img src={MasterCard} alt="card" />
                                <img src={Paypal} alt="card" />
                                <img src={JCB} alt="card" />
                                <img src={AmericanExpress} alt="card" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Right */}
                <div className="checkout__content-right">
                    <div className="checkout__content-rightWrapper">
                        <div className="head">
                            {/* Head */}
                            <span>Total due today : </span>
                            <span>  ${this.props.selectedPlan == "monthly" ? this.props.monthly : this.props.selectedPlan == "halfYear" ? this.props.quartarly : this.props.yearly}    </span>
                        </div>
                        {/* Postal code */}
                        {this.state.step == 0 &&
                            <div className="body">
                                <p className="whereLocated" >Where are you located?</p>
                                <p className="description">
                                    Please enter your country and postal code below. We collect this information in order to fight against fraud and guarantee the security of your payment.
                                             </p>
                                <DropdownInput handleInputs={this.handleInput} placeholder="United States" checkout={true} title="Country" options={this.countries} />
                                <SimpleInput handleInputs={this.handleInput} title="Postal Code" checkout={true} />
                                <div onClick={() => this.nextStep()} className="checkout-continue-btn">
                                    Continue
                                </div>
                            </div>
                        }
                        {/* Pick method  */}
                        {this.state.step == 1 &&
                            <div className="body">
                                {this.props.onlyPP == false || this.props.onlyPP == undefined ?  <div onClick={(() => this.nextStep())} className="checkout-continue-btn">
                                    Pay with card
                                </div> : "" }
                               
                                {/* <div className="checkout-continue-btn-light">
                                    <img src={Paypal} />
                                </div> */}
                                <PayPalButton
                                    amount={this.props.selectedPlan == "yearly" ? this.props.yearly : this.props.selectedPlan == "monthly" ? this.props.monthly : this.props.selectedPlan == "halfYear" ? this.props.quartarly : 0}
                                    // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                    options={{
                                        clientId: conf.paypalClienID,
                                        disableFunding: "card"
                                    }}
                                    onSuccess={async (details, data) => {
                                        // we need to get the time from the server since it can be manipulated by the  client
                                        const res = await axios.post("https://" +  conf.backendUrl  + "/api/date");
                                        const time = res.data["date"]
                                        addSbs(this.props.selectedPlan, "Paypal", new Date(time).toDateString(),this.props.selectedPlan == "monthly" ? this.props.monthly : this.props.selectedPlan == "halfYear" ? this.props.quartarly : this.props.selectedPlan == "yearly" ? this.props.yearly : 0)
                                        this.setState({ step: 3 })
                                        return true;
                                    }}
                                />
                                <div onClick={() => this.previousStep()} className="checkout-continue-btnOutlined" >Return</div>
                            </div>
                        }
                        {/* Checkout  */}
                        {this.state.step == 2 &&
                            <div className="body">
                                <div className="card-details">
                                    <input onChange={(event) => this.handleInput("CardHolder", event)} placeholder="Card Holder" className="card-nameHolder" />
                                    <input onChange={(event) => this.handleInput("Address", event)} placeholder="Address" className="card-nameHolder" />
                                    <CardElement className="checkout-input" />
                                    <div onClick={() => {
                                        this.handleSubmit()
                                    }} className="checkout-continue-btn">
                                        Checkout
                                      </div>
                                    <div onClick={() => this.previousStep()} className="checkout-continue-btnOutlined" >Return</div>
                                    {this.state.isLoading && <div>Processing Payment...</div>}
                                    <div className="testWrapper">
                                        {/* <span className="testHeading">To test payments. use this testing card</span>
                                        <span className="testData">Card Number : 4242 4242 4242 4242 Exp: 22/22</span>
                                        <span className="testData">Full Name : Test Test</span>
                                        <span className="testData">Address: Any address.</span>cd
                                        <span className="testData">Address: Any address.</span> */}

                                    </div>
                                </div>
                            </div>
                        }
                        {/*  Loding - > Success   */}
                        {this.state.step == 3 &&
                            <div className="body">
                                <div className="paimentConfirmation">
                                    <Lottie options={successOptions}
                                        height={100}
                                        width={400}
                                    />
                                    <h2>Your payment made succefully</h2>
                                    <div onClick={() => { window.location.href = window.location.pathname+'/'; }} className="checkout-continue-btn">
                                        Continue
                                </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                {/* <Elements stripe={this.stripePromise}>
            <CardElement /> 
            </Elements> */}
            </div>)
    }
}
export default Checkout;