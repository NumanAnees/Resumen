import React, { Component } from 'react';
import './Welcome.scss';
import LoaderAnimation from '../../assets/animations/lottie-loader.json'
import Board from '../Boards/board/board'
import Action from '../Actions/action/Action'
import { Analytics } from '../Analytics'
// Models 
import EmploymentModel from '../../models/Employment';
import EducationModel from '../../models/Education';
import LanguageModel from '../../models/Language';
import SkillModel from '../../models/Skills';
// Images 
import PreviewImg from '../../assets/preview.png'
import NextImg from '../../assets/next.png'
import { ReactComponent as CloseImage } from '../../assets/close.svg'
import { ReactComponent as HamburgerImage } from '../../assets/menu.svg'
// Firebase
import fire from '../../conf/fire';
import { InitialisationCheck, getPages, getWebsiteData, getSubscriptionStatus, checkSbs, makeBasicAccount } from '../../firestore/dbOperations'
import { getUserMembership } from '../../firestore/paidOperations';
// Initialisation Component
import InitialisationWrapper from '../initailisation/initialisationWrapper/initialisationWrapper';
/// Animation Library
import { motion, AnimatePresence } from "framer-motion"
import i18n from '../../i18n';
import AuthWrapper from '../auth/authWrapper/AuthWrapper'
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
// This class is the source of truth. means that we will hold input states here 
class Welcome extends Component {
  constructor(props) {
    super(props);
    // This is the Parent Component that will contains all the data ( state )  of all its child component
    // From Here we will pass data to our Board Component ( Where resume is)
    this.steps = ["Introduction", "Template Selection", "Adding Data"];
    this.currentResume = JSON.parse(localStorage.getItem("currentResumeItem"));
    /// Removing any nulls in the arrays of current resume
    if (this.currentResume !== null) {
      this.currentResume.employments = this.checkForNullsInArray(this.currentResume.employments, null);
      this.currentResume.educations = this.checkForNullsInArray(this.currentResume.educations, null);
      this.currentResume.skills = this.checkForNullsInArray(this.currentResume.skills, null);
      this.currentResume.languages = this.checkForNullsInArray(this.currentResume.languages, null);
    }
    this.state = {
      // Meta data
      metaDataFetched: false,
      websiteTitle: "",
      websiteDescription: "",
      websiteKeywords: "",
      /// Subscriptions
      subscriptionsStatus: null,
      membership: null,
      membershipEnds: null,
      mobilePreviewOn: false,
      fullFields: 0,
      isMobileTogglerShowed: true,
      isMenuShowed: false,
      isAuthShowed: false,
      language: "en",
      stepIndex: 0,
      currentStep: this.steps[0],
      user: null,
      email: "",
      redirect: null,
      // resumeName: "Cv1",
      resumeName: this.currentResume != null && this.currentResume.item.template !== undefined ? this.currentResume.item.template : "Cv1",
      currentResumeName: "Cv1",
      currentResume: null,
      title:  this.currentResume != null && this.currentResume.item.title !== undefined ? this.currentResume.item.title : "Untitled",
      progress: 0,
      pages: [],
      firstname: this.currentResume != null && this.currentResume.item.firstname !== undefined ? this.currentResume.item.firstname : "",
      lastname: this.currentResume !== null && this.currentResume.item.lastname !== undefined ? this.currentResume.item.lastname : "",
      email: this.currentResume !== null && this.currentResume.item.email !== undefined ? this.currentResume.item.email : "",
      phone: this.currentResume !== null && this.currentResume.item.phone !== undefined ? this.currentResume.item.phone : "",
      occupation: this.currentResume !== null && this.currentResume.item.occupation !== undefined ? this.currentResume.item.occupation : "",
      country: this.currentResume !== null && this.currentResume.item.country !== undefined ? this.currentResume.item.country : "",
      city: this.currentResume !== null && this.currentResume.item.city !== undefined ? this.currentResume.item.city : "",
      address: this.currentResume !== null && this.currentResume.item.address !== undefined ? this.currentResume.item.address : "",
      postalcode: this.currentResume !== null && this.currentResume.item.postalcode !== undefined ? this.currentResume.item.postalcode : "",
      dateofbirth: this.currentResume !== null && this.currentResume.item.dateofbirth !== undefined ? this.currentResume.item.dateofbirth : "",
      drivinglicense: this.currentResume !== null && this.currentResume.item.drivinglicense !== undefined ? this.currentResume.item.drivinglicense : "",
      nationality: this.currentResume !== null && this.currentResume.item.nationality !== undefined ? this.currentResume.item.nationality : "",
      summary: this.currentResume !== null && this.currentResume.item.summary !== undefined ? this.currentResume.item.summary : "",
      photo: null,
      employments: this.currentResume !== null && this.currentResume.employments !== undefined ? this.currentResume.employments : [],
      educations: this.currentResume !== null && this.currentResume.educations !== undefined ? this.currentResume.educations : [],
      languages: this.currentResume !== null && this.currentResume.languages !== undefined ? this.currentResume.languages : [],
      isInitialisationShowed: false,
      skills: this.currentResume !== null && this.currentResume.skills !== undefined ? this.currentResume.skills : [],
      filledInputs: [],
      trackingCode: "",
      loaded: false,
    }
    this.authListener = this.authListener.bind(this);
    this.nextStep = this.nextStep.bind(this)
    this.logout = this.logout.bind(this);
    this.handleInputs = this.handleInputs.bind(this);
    this.setCurrentStep = this.setCurrentStep.bind(this);
    this.handlePreviewToggle = this.handlePreviewToggle.bind(this);
    this.createNewEmploymentObject = this.createNewEmploymentObject.bind(this);
    this.createNewEducationObject = this.createNewEducationObject.bind(this);
    this.createNewSkillObject = this.createNewSkillObject.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.changeSelectedResume = this.changeSelectedResume.bind(this);
    this.stepBack = this.stepBack.bind(this);
    this.closeInitialisation = this.closeInitialisation.bind(this);
    this.checkForNullsInArray = this.checkForNullsInArray.bind(this);
    this.wrapper = React.createRef();
    this.goThirdStep = this.goThirdStep.bind(this);
    this.handleLanguageClick = this.handleLanguageClick.bind(this);
    this.menuClose = this.menuClose.bind(this);
    this.menuOpen = this.menuOpen.bind(this);
    this.handleMenuLink = this.handleMenuLink.bind(this);
    this.authBtnHandler = this.authBtnHandler.bind(this);
    this.checkFullFields = this.checkFullFields.bind(this);
    this.removeEmployment = this.removeEmployment.bind(this);
    this.removeEducation = this.removeEducation.bind(this)
    this.removeLanguage = this.removeLanguage.bind(this)
    this.removeSkill = this.removeSkill.bind(this);
    this.checkLanguageFromDB = this.checkLanguageFromDB.bind(this)
    // Triggering analytics initializer with the page the visitor is in
    var AnalyticsObject = Analytics;
    AnalyticsObject("Homepage");
  }
  /// Checking if  user is singed in
  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        // User Logged in 
        this.setState({ user: user, email: user.email })
        localStorage.setItem('user', user.uid);
        getUserMembership(this.state.user.uid).then((value) => {
          // Here if membership is undefined that means it not in database (old schema)
          // else it should have Basic or Premium
          if (value.membershipEnds != undefined && typeof value.membershipEnds != 'string') {
            this.setState({ membership: value.membership, membershipEnds: value.membershipEnds.toDate() })
            console.log("going to check ");
            checkSbs(value.membership, value.membershipEnds.toDate()).then(
              (val) => {
                if (val == "false") {
                  this.setState({ membership: "Basic" })
                  makeBasicAccount(this.state.user.uid)
                }
              }
            )
          }
          console.log("check over ");
        })
      } else {
        this.setState({ user: null })
        localStorage.removeItem("user");
      }
    })
  }
  // Logout
  logout() {
    fire.auth().signOut();
    localStorage.removeItem("currentResumeId");
    localStorage.removeItem("currentResumeItem");
    this.currentResume = null;
  }
  // Setting the current step
  setCurrentStep(step, isLoginModalShowed) {
    this.setState({
      currentStep: this.steps[0],
      stepIndex: 0,
    });
  }
  // go to third step
  goThirdStep() {
    this.setState({
      currentStep: this.steps[2],
      stepIndex: 2,
    });
  }
  // Removing any null in employments
  checkForNullsInArray(array, elem) {
    var nullIndex = array.indexOf(elem);
    while (nullIndex > -1) {
      array.splice(nullIndex, 1);
      nullIndex = array.indexOf(elem);
    }
    return array;
  }




  checkLanguageFromDB(){

    if(localStorage.getItem('language')){
      this.handleLanguageClick(localStorage.getItem('language'))
      this.setState({loaded:true})

    }else{


    getWebsiteData().then((data) => {
      if (data !== undefined) {
        this.setState({ metaDataFetched: true, websiteTitle: data.title, websiteDescription: data.description, websiteKeywords: data.keywords })
        // Setting the language of the website depending on what the admin saved in db
        if (data.language != undefined) {
          if (data.language == "Danish") {
            this.handleLanguageClick("dk")
          }
          if (data.language == "Swedish") {
            this.handleLanguageClick("se")

          }
          if (data.language == "Spanish") {
            this.handleLanguageClick("es")

          }
          if (data.language == "English") {
            this.handleLanguageClick("en")

          }
          if (data.language == "Russian") {
            this.handleLanguageClick("ru")

          }
          if (data.language == "French") {
            this.handleLanguageClick("fr")

          }
          if (data.language == "Portuguese") {
            this.handleLanguageClick("pt")

          }
          if (data.language == "German") {
            this.handleLanguageClick("de")

          }
          
          
        }
      }
    }
    ).then((value) => {
      this.setState({ loaded: true })
    })
  }
  }

  componentDidMount() {
    getPages().then(value => {
      value === null ? console.log("no pages found") : this.setState({ pages: value })
    })
    // Check if the user doesnt have a pre defined language in his local storage, if not we fetch defaul language from database
   
    
    this.checkLanguageFromDB()
    getSubscriptionStatus().then((data) => this.setState({ subscriptionsStatus: data.state }))
  }
  UNSAFE_componentWillMount() {

    // Check which language
    if(localStorage.getItem('language')){
      this.handleLanguageClick(localStorage.getItem('language'))
    }else{
      this.handleLanguageClick('en')

    }
    this.authListener();
    InitialisationCheck().then(value => {
      if (value === "none" || value === undefined) {
        this.setState({ isInitialisationShowed: true });
      }
    });
    this.checkFullFields();
    // checking if the user clicked in a resume in dashboard, to set it as the current resume
    if (localStorage.getItem("currentResumeItem")) {
      this.setState({ currentResume: JSON.parse(localStorage.getItem("currentResumeItem")) })
    }
    /// check if the user comming from dashboard with specefic resume click
    this.props.match !== undefined &&
      this.props.match.params.step !== undefined && this.setState({ currentStep: this.steps[2] })
  }
  // Basic Function to remove value from array
  arrayRemove(arr, value) { return arr.filter(function (ele) { return ele !== value; }); }
  // Handling navigation between Board steps
  nextStep() {
    this.setState((state) => {
      return { stepIndex: state.stepIndex + 1, currentStep: this.steps[state.stepIndex + 1], mobilePreviewOn: false }
    })
  }
  closeInitialisation() {
    this.setState((prevState, props) => ({ isInitialisationShowed: false }));
  }
  // stepBack
  stepBack() {
    this.setState((state) => {
      return { stepIndex: state.stepIndex - 1, currentStep: this.steps[state.stepIndex - 1], mobilePreviewOn: false }
    })
  }
  // Create new employment object
  createNewEmploymentObject(id) {
    var employment = new EmploymentModel(id);
    employment.date = Date.now()
    this.state.employments.push(employment);
    this.setState({ employments: this.state.employments });
  }
  // Create new education object
  createNewEducationObject(id) {
    var education = new EducationModel(id);
    education.date = Date.now()

    this.state.educations.push(education);
    this.setState({ educations: this.state.educations });
  }
  // Create new education object
  createNewLanguageObject(id) {
    var language = new LanguageModel(id);
    language.date = Date.now()
    this.state.languages.push(language);
    this.setState({ languages: this.state.languages });
  }
  // Create new skill object
  createNewSkillObject(id) {
    var skill = new SkillModel(id);
    skill.date = Date.now()
    this.state.skills.push(skill);
    this.setState({ skills: this.state.skills });
  }
  // Handling Delete of a components/object Employment,Language,Education etc
  handleDelete(inputType, id) {
    switch (inputType) {
      case "Skills":
        this.setState({
          skills: [],
        })
        break;
      default:
        break;
    }
  }
  // Handling Inputs change from childs
  handleInputs(inputName, inputValue, idOptional, typeOptional) {
    // switching between which input is passed to the function
    // typeOptional if the input was in employment or education or langauge 
    // idOptional is an optional id when an input is inside another component like employments
    //  Each employment should contain id and when an input changed inside Employment component we need to 
    // know the id of that specefic employment to change it in here  same applicable for educations languages 
    switch (inputName) {
      case "Title":
        this.state.title = "" ?
          this.setState({ title: inputValue, fullFields: this.state.fullFields + 1 }) : this.setState({ title: inputValue });
        break;
      case "First Name":
        this.state.firstname == "" ?
          this.setState({ firstname: inputValue, fullFields: this.state.fullFields + 1 }) : this.setState({ firstname: inputValue });
        inputValue == "" && this.setState({ fullFields: this.state.fullFields - 1 })
        break;
      case "Last Name":
        this.state.lastname == "" ?
          this.setState({ lastname: inputValue, fullFields: this.state.fullFields + 1 }) : this.setState({ lastname: inputValue });
        inputValue == "" && this.setState({ fullFields: this.state.fullFields - 1 })
        break;
      case "Email":
        this.state.email == "" ?
          this.setState({ email: inputValue, fullFields: this.state.fullFields + 1 }) : this.setState({ email: inputValue });
        inputValue == "" && this.setState({ fullFields: this.state.fullFields - 1 })
        break;
      case "Phone":
        this.state.phone == "" ?
          this.setState({ phone: inputValue, fullFields: this.state.fullFields + 1 }) : this.setState({ phone: inputValue });
        inputValue == "" && this.setState({ fullFields: this.state.fullFields - 1 })
        break;
      case "Photo":
        this.state.photo == "" ?
          this.setState({ photo: inputValue, fullFields: this.state.fullFields + 1 }) : this.setState({ photo: inputValue });
        inputValue == "" && this.setState({ fullFields: this.state.fullFields - 1 })
        break;
      case "Occupation":
        this.state.occupation == "" ?
          this.setState({ occupation: inputValue, fullFields: this.state.fullFields + 1 }) : this.setState({ occupation: inputValue });
        inputValue == "" && this.setState({ fullFields: this.state.fullFields - 1 })
        break;
      case "Country":
        this.state.country == "" ?
          this.setState({ country: inputValue, fullFields: this.state.fullFields + 1 }) : this.setState({ country: inputValue });
        inputValue == "" && this.setState({ fullFields: this.state.fullFields - 1 })
        break;
      case "City":
        this.state.city == "" ?
          this.setState({ city: inputValue, fullFields: this.state.fullFields + 1 }) : this.setState({ city: inputValue });
        inputValue == "" && this.setState({ fullFields: this.state.fullFields - 1 })
        break;
      case "Address":
        this.state.address == "" ?
          this.setState({ address: inputValue, fullFields: this.state.fullFields + 1 }) : this.setState({ address: inputValue });
        inputValue == "" && this.setState({ fullFields: this.state.fullFields - 1 })
        break;
      case "Postal Code":
        this.state.postalcode == "" ?
          this.setState({ postalcode: inputValue, fullFields: this.state.fullFields + 1 }) : this.setState({ postalcode: inputValue });
        inputValue == "" && this.setState({ fullFields: this.state.fullFields - 1 })
        break;
      case "Date Of Birth":
        this.state.dateofbirth == "" ?
          this.setState({ dateofbirth: inputValue, fullFields: this.state.fullFields + 1 }) : this.setState({ dateofbirth: inputValue });
        inputValue == "" && this.setState({ fullFields: this.state.fullFields - 1 })
        break;
      case "Driving License":
        this.state.drivinglicense == "" ?
          this.setState({ drivinglicense: inputValue, fullFields: this.state.fullFields + 1 }) : this.setState({ drivinglicense: inputValue });
        inputValue == "" && this.setState({ fullFields: this.state.fullFields - 1 })
        break;
      case "Nationality":
        this.state.nationality == "" ?
          this.setState({ nationality: inputValue, fullFields: this.state.fullFields + 1 }) : this.setState({ nationality: inputValue });
        inputValue == "" && this.setState({ fullFields: this.state.fullFields - 1 })
        break;
      case "Professional Summary":
        this.state.summary == "" ?
          this.setState({ summary: inputValue, fullFields: this.state.fullFields + 1 }) : this.setState({ summary: inputValue });
        inputValue == "" && this.setState({ fullFields: this.state.fullFields - 1 })
        break;
      case "Job Title":
        /// Check if we have any employment with th id 
        // Boolean to check if the employment is already in state
        var found = false;
        // looping in state to see if its found based on the id raised from the components
        for (var i = 0; i < this.state.employments.length; i++) {
          if (this.state.employments[i] !== null && this.state.employments[i].id === idOptional && typeOptional === "Employment") {
            found = true;
            this.state.employments[i].jobTitle = inputValue;
            this.setState({ employments: this.state.employments });
            break;
          }
        }
        if (found === false) {
          // create new employment
          this.createNewEmploymentObject(idOptional);
        }
        found = false
        break;
      case "Begin":
        /// Check if we have any employment with th id 
        // Boolean to check if the employment is already in state
        found = false;
        // looping in state to see if its found based on the id raised from the components
        for (i = 0; i < this.state.employments.length; i++) {
          if (this.state.employments[i] !== null && this.state.employments[i].id === idOptional && typeOptional === "Employment") {
            found = true;
            this.state.employments[i].begin = inputValue;
            this.setState({ employments: this.state.employments });
            break;
          }
        }
        if (found === false) {
          // create new employment
          this.createNewEmploymentObject(idOptional);
        }
        found = false
        break;
      case "End":
        /// Check if we have any employment with th id 
        // Boolean to check if the employment is already in state
        found = false;
        // looping in state to see if its found based on the id raised from the components
        for (i = 0; i < this.state.employments.length; i++) {
          if (this.state.employments[i] !== null && this.state.employments[i].id === idOptional && typeOptional === "Employment") {
            found = true;
            this.state.employments[i].end = inputValue;
            this.setState({ employments: this.state.employments });
            break;
          }
        }
        if (found === false) {
          // create new employment
          this.createNewEmploymentObject(idOptional);
        }
        found = false
        break;
      case "Employer":
        /// Check if we have any employment with th id 
        // Boolean to check if the employment is already in state
        found = false;
        // looping in state to see if its found based on the id raised from the components
        for (i = 0; i < this.state.employments.length; i++) {
          if (this.state.employments[i] !== null && this.state.employments[i].id === idOptional && typeOptional === "Employment") {
            found = true;
            this.state.employments[i].employer = inputValue;
            this.setState({ employments: this.state.employments });
            break;
          }
        }
        if (found === false) {
          // create new employment
          this.createNewEmploymentObject(idOptional);
        }
        found = false
        break;
      case "Description":
        /// Check if we have any employment with th id 
        // Boolean to check if the employment is already in state
        found = false;
        // looping in state to see if its found based on the id raised from the components
        for (i = 0; i < this.state.employments.length; i++) {
          if (this.state.employments[i] !== null && this.state.employments[i].id === idOptional && typeOptional === "Employment") {
            found = true;
            this.state.employments[i].description = inputValue;
            this.setState({ employments: this.state.employments });
            break;
          }
        }
        if (found === false) {
          // create new employment
          this.createNewEmploymentObject(idOptional);
        }
        found = false
        break;
      case "School":
        /// Check if we have any employment with th id 
        // Boolean to check if the employment is already in state
        found = false;
        // looping in state to see if its found based on the id raised from the components
        for (i = 0; i < this.state.educations.length; i++) {
          if (this.state.educations[i] !== null && this.state.educations[i].id === idOptional && typeOptional === "Education") {
            found = true;
            this.state.educations[i].school = inputValue;
            this.setState({ educations: this.state.educations });
            break;
          }
        }
        if (found === false) {
          // create new employment
          this.createNewEducationObject(idOptional);
        }
        found = false
        break;
      case "Degree":
        /// Check if we have any employment with th id 
        // Boolean to check if the employment is already in state
        found = false;
        // looping in state to see if its found based on the id raised from the components
        for (i = 0; i < this.state.educations.length; i++) {
          if (this.state.educations[i] !== null && this.state.educations[i].id === idOptional && typeOptional === "Education") {
            found = true;
            this.state.educations[i].degree = inputValue;
            this.setState({ educations: this.state.educations });
            break;
          }
        }
        if (found === false) {
          // create new employment
          this.createNewEducationObject(idOptional);
        }
        found = false
        break;
      case "Started":
        /// Check if we have any employment with th id 
        // Boolean to check if the employment is already in state
        found = false;
        // looping in state to see if its found based on the id raised from the components
        for (i = 0; i < this.state.educations.length; i++) {
          if (this.state.educations[i].id === idOptional && typeOptional === "Education") {
            found = true;
            this.state.educations[i].started = inputValue;
            this.setState({ educations: this.state.educations });
            break;
          }
        }
        if (found === false) {
          // create new employment
          this.createNewEducationObject(idOptional);
        }
        found = false
        break;
      case "Finished":
        /// Check if we have any employment with th id 
        // Boolean to check if the employment is already in state
        found = false;
        // looping in state to see if its found based on the id raised from the components
        for (i = 0; i < this.state.educations.length; i++) {
          if (this.state.educations[i].id === idOptional && typeOptional === "Education") {
            found = true;
            this.state.educations[i].finished = inputValue;
            this.setState({ educations: this.state.educations });
            break;
          }
        }
        if (found === false) {
          // create new employment
          this.createNewEducationObject(idOptional);
        }
        found = false
        break;
      case "Course Description":
        /// Check if we have any employment with th id 
        // Boolean to check if the employment is already in state
        found = false;
        // looping in state to see if its found based on the id raised from the components
        for (i = 0; i < this.state.educations.length; i++) {
          if (this.state.educations[i].id === idOptional && typeOptional === "Education") {
            found = true;
            this.state.educations[i].description = inputValue;
            this.setState({ educations: this.state.educations });
            break;
          }
        }
        if (found === false) {
          // create new employment
          this.createNewEducationObject(idOptional);
        }
        found = false
        break;
      case "Language":
        /// Check if we have any employment with th id 
        // Boolean to check if the employment is already in state
        found = false;
        // looping in state to see if its found based on the id raised from the components
        for (i = 0; i < this.state.languages.length; i++) {
          if (this.state.languages[i].id === idOptional && typeOptional === "Languages") {
            found = true;
            this.state.languages[i].name = inputValue;
            this.setState({ languages: this.state.languages });
            break;
          }
        }
        if (found === false) {
          // create new Language
          this.createNewLanguageObject(idOptional);
        }
        found = false
        break;
      case "Level":
        /// Check if we have any employment with th id 
        // Boolean to check if the employment is already in state
        found = false;
        // looping in state to see if its found based on the id raised from the components
        for (i = 0; i < this.state.languages.length; i++) {
          if (this.state.languages[i].id === idOptional && typeOptional === "Languages") {
            found = true;
            this.state.languages[i].level = inputValue;
            this.setState({ languages: this.state.languages });
            break;
          }
        }
        if (found === false) {
          // create new Language
          this.createNewLanguageObject(idOptional);
        }
        found = false
        break;
      case "Skill Name":
        /// Check if we have any employment with th id 
        // Boolean to check if the employment is already in state
        found = false;
        // looping in state to see if its found based on the id raised from the components
        for (i = 0; i < this.state.skills.length; i++) {
          if (this.state.skills[i].id === idOptional && typeOptional === "Skills") {
            found = true;
            this.state.skills[i].name = inputValue;
            this.setState({ skills: this.state.skills });
            break;
          }
        }
        if (found === false) {
          // create new Language
          this.createNewSkillObject(idOptional);
        }
        found = false
        break;
      case "Rating":
        /// Check if we have any employment with th id 
        // Boolean to check if the employment is already in state
        found = false;
        // looping in state to see if its found based on the id raised from the components
        for (i = 0; i < this.state.skills.length; i++) {
          if (this.state.skills[i].id === idOptional && typeOptional === "Skills") {
            found = true;
            this.state.skills[i].rating = inputValue;
            this.setState({ skills: this.state.skills });
            break;
          }
        }
        if (found === false) {
          // create new Language
          this.createNewSkillObject(idOptional);
        }
        found = false
        break;
      default:
        break;
    }
  }
  // Check full fields 
  checkFullFields() {
    var count = 0;
    this.state.firstname.length > 0 && count++
    this.state.lastname.length > 0 && count++
    this.state.email.length > 0 && count++
    this.state.phone.length > 0 && count++
    this.state.occupation.length > 0 && count++
    this.state.country.length > 0 && count++
    this.state.city.length > 0 && count++
    this.state.address.length > 0 && count++
    this.state.postalcode.length > 0 && count++
    this.state.dateofbirth.length > 0 && count++
    this.state.nationality.length > 0 && count++
    this.state.summary.length > 0 && count++
    this.state.employments.length > 0 && count++
    this.state.educations.length > 0 && count++
    this.state.languages.length > 0 && count++
    this.state.skills.length > 0 && count++
    this.setState({ fullFields: count })
  }
  // Handling Preview Button
  handlePreviewToggle() {
    this.state.mobilePreviewOn ? this.setState({ mobilePreviewOn: false }) : this.setState({ mobilePreviewOn: true })
    this.state.currentStep == "Introduction" ? this.setState({ isMobileTogglerShowed: false }) : this.setState({ isMobileTogglerShowed: true })
  }
  // Changing the selected resume
  changeSelectedResume(resumeName) {
    this.setState({
      resumeName: resumeName,// Propertie
      currentResumeName: resumeName
    });
  }
  // Handle language click 
  handleLanguageClick(language) {
    i18n.changeLanguage(language);
    this.setState({ language: language })
    localStorage.setItem('language',language)

  }
  /// Close Menu
  menuClose() {
    this.setState({ isMenuShowed: false })
  }
  /// Open Menu
  menuOpen() {
    this.setState({ isMenuShowed: true })
  }
  /// Open Menu
  handleMenuLink(pagename) {
    if (pagename == "Home") {
      this.menuClose()
    } else if (pagename == "Contact") {
      window.location.href = window.location.pathname + "/contact"
    } else {
      window.location.href = window.location.pathname + "p/" + pagename
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      // alert(nextProps.location);
    }
  }
  authBtnHandler() {
    if (this.state.user == null) {
      this.setState((prevState, props) => ({
        isAuthShowed: prevState.isAuthShowed ? false : true
      }));
    } else if (this.props.user != null) {
      this.setState({
        isAuthShowed: false
      })
    }
  }
  /// Remove employment 
  removeEmployment(id) {
    console.log(this.state);
          let pos = null;
      for (let index = 0; index < this.state.employments.length; index++) {
        if (this.state.employments[index].id == id) {
          pos = index
        }
      }
      if (pos !== null) {
        var tempArray = this.state.employments;
        var sliced = tempArray.splice(pos, 1)
        this.setState({ employments: tempArray })
      }
    


  }

  /// Remove employment 
  removeEducation(id) {
    console.log("in");
    let pos = null;
      for (let index = 0; index < this.state.educations.length; index++) {
        if (this.state.educations[index].id == id) {
          pos = index
        }
      }
      if (pos !== null) {
        var tempArray = this.state.educations;
        var sliced = tempArray.splice(pos, 1)
        this.setState({ educations: tempArray })
      }
    
  }

  /// Remove employment 
  removeLanguage(id) {
    console.log("in");
      let pos = null;
      for (let index = 0; index < this.state.languages.length; index++) {
        if (this.state.languages[index].id == id) {
          pos = index
        }
      }
      if (pos !== null) {
        var tempArray = this.state.languages;
        var sliced = tempArray.splice(pos, 1)
        this.setState({ languages: tempArray })
      }
    
  }

  /// Remove employment 
  removeSkill(id) {
    console.log("in");
      let pos = null;
      for (let index = 0; index < this.state.skills.length; index++) {
        if (this.state.skills[index].id == id) {
          pos = index
        }
      }
      if (pos !== null) {
        var tempArray = this.state.skills;
        var sliced = tempArray.splice(pos, 1)
        this.setState({ skills: tempArray })
      }
    
  }

  render() {
    const menuWrapperVariants = {
      initial: { width: "0px", height: "0px" },
      isOpened: { width: "1200px", height: "1200px", transition: { duration: "0.5" } },
      isClosed: { width: "0px", height: "0px", transition: { duration: "0.5" } },
    }
    const loaderOptions = {
      loop: true,
      autoplay: true,
      animationData: LoaderAnimation,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };
    return (
      <div className="wrapper">
        {/* {
          this.state.loaded == false &&
          <div className="loading">
            <Lottie options={loaderOptions}
              height={190}
              width={400} />
          </div>
        } */}

        {this.state.loaded &&

          <>
            <Helmet>
              <meta charSet="utf-8" />
              <title>{this.state.websiteTitle}</title>
              <meta name="description" content={this.state.websiteDescription} />
              <meta name="keywords" content={this.state.websiteKeywords} />
            </Helmet>
            <AnimatePresence>
              {this.state.isAuthShowed &&
                <motion.div exit={{ opacity: 0 }} initial="hidden" animate="visible" variants={this.authVariants} transition={{ duration: 0.4 }}  >
                  <AuthWrapper closeModal={this.authBtnHandler} />
                </motion.div>
              }
            </AnimatePresence>
            <AnimatePresence>
              {
                this.state.isInitialisationShowed && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><InitialisationWrapper closeInitialisation={this.closeInitialisation} />  </motion.div>
              }
            </AnimatePresence>
            {/* {this.props.match.params.step != undefined && alert(this.props.match.params.step)} */}
            {this.state.mobilePreviewOn == true &&
              <div className="menuToggle">
                <a onClick={() => this.menuOpen()}>
                  <HamburgerImage className="hamburgerImage" />
                </a>
              </div>
            }
            <AnimatePresence>
              {this.state.isMenuShowed &&
                <motion.div variants={menuWrapperVariants} initial="initial" animate="isOpened" exit="isClosed" className="menu">
                </motion.div>
              }
            </AnimatePresence>
            <AnimatePresence>
              {this.state.isMenuShowed &&
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.4 } }} exit={{ opacity: 0, transition: { duration: 0.1 } }} className="menu-content">
                  <ul>
                    <li className="menu-active" onClick={() => this.handleMenuLink("Home")}>Home <a></a></li>
                    {this.state.pages.map((value, index) => {
                      return <li key={index + 10}   > <Link to={{ pathname: "/p/" + value.id }}>{value.id}</Link> </li>
                    })}
                    <li > <Link to={{ pathname: "/contact" }}>Contact Us</Link>  </li>
                    <li><CloseImage onClick={() => this.menuClose()} className="closeImage" /></li>
                  </ul>
                </motion.div>
              }
            </AnimatePresence>
            <div className="actions">
              <Action
                handleLanguageClick={this.handleLanguageClick}
                goThirdStep={this.goThirdStep}
                currentResumeName={this.state.currentResumeName}
                removeEmployment={this.removeEmployment}
                removeEducation={this.removeEducation}
                removeLanguage={this.removeLanguage}
                removeSkill={this.removeSkill}
                stepBack = {this.stepBack}
                values={{
                  user: this.state.user,
                  email: this.state.email,
                  resumeName: this.state.resumeName,
                  title: this.state.title,
                  isAuthShowed: this.state.isAuthShowed,
                  firstname: this.state.firstname,
                  lastname: this.state.lastname,
                  summary: this.state.summary,
                  occupation: this.state.occupation,
                  address: this.state.address,
                  postalcode: this.state.postalcode,
                  country: this.state.country,
                  dateofbirth: this.state.dateofbirth,
                  city: this.state.city,
                  email: this.state.email,
                  phone: this.state.phone,
                  employments: this.state.employments,
                  drivinglicense: this.state.drivinglicense,
                  nationality: this.state.nationality,
                  educations: this.state.educations,
                  languages: this.state.languages,
                  skills: this.state.skills,
                  photo: this.state.photo,
                  language: this.state.language,
                  membership: this.state.membership,
                  membershipEnds: this.state.membershipEnds,
                  fullFields: this.state.fullFields
                }}
                authBtnHandler={this.authBtnHandler}
                setCurrentStep={this.setCurrentStep}
                redirectToDashboard={this.redirectToDashboard} 
                logout={this.logout} user={this.state.user} 
                handlePreviewToggle={this.handlePreviewToggle}
                 handleDelete={this.handleDelete} 
                 progress={this.state.progress}
                  currentStep={this.state.currentStep} 
                  handleInputs={this.handleInputs} />
            </div>
            <div className={this.state.mobilePreviewOn ? " right-panel  boardShowed" : "right-panel "}>
              <Board
                nextStep={this.nextStep}
                stepBack={this.stepBack}
                changeResumeName={this.changeSelectedResume}
                currentResumeName={this.state.resumeName}
                values={{
                  subscriptionsStatus: this.state.subscriptionsStatus,
                  user: this.state.user,
                  resumeName: this.state.resumeName,
                  title: this.state.title,
                  isAuthShowed: this.state.isAuthShowed,
                  firstname: this.state.firstname,
                  lastname: this.state.lastname,
                  summary: this.state.summary,
                  occupation: this.state.occupation,
                  address: this.state.address,
                  postalcode: this.state.postalcode,
                  country: this.state.country,
                  city: this.state.city,
                  dateofbirth: this.state.dateofbirth,
                  drivinglicense: this.state.drivinglicense,
                  email: this.state.email,
                  nationality: this.state.nationality,
                  phone: this.state.phone,
                  employments: this.state.employments,
                  educations: this.state.educations,
                  languages: this.state.languages,
                  skills: this.state.skills,
                  photo: this.state.photo,
                  membership: this.state.membership,
                  membershipEnds: this.state.membershipEnds,
                  language: this.state.language
                }}
                currentStep={this.state.currentStep}
                authBtnHandler={this.authBtnHandler}
              />
            </div>
            <AnimatePresence>
              {this.state.isMobileTogglerShowed &&
                <div onClick={this.handlePreviewToggle} className="previewButton">
                  <img className="previewImg" src={this.state.currentStep == "Introduction" ? NextImg : PreviewImg} alt="Preview" />
                </div>}
            </AnimatePresence>
          </>
        }
      </div>
    );
  }
}
export default Welcome;
