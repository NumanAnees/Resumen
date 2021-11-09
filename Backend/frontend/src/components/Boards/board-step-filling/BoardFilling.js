import React, { Component, version } from "react";
import "./BoardFilling.scss";
// Importing packages that will help us to transfrom a div into a pdf ,  Div --> Canvas(jpeg) --> Pdf
import MenuImg from "../../../assets/menu.png";
import Canvas from "../canvas/Canvas";
// Toasts
import Toasts from "../../Toasts/Toats";
import {
  setResumePropertyPerUser,
  addEmployments,
  addEducations,
  IncrementDownloads,
  addSkills,
  addLanguages,
  setJsonPb,
  getResumeById,
} from "../../../firestore/dbOperations";
// Animation Library
import { motion, AnimatePresence } from "framer-motion";
import { withTranslation } from "react-i18next";
// Images
import NextImage from "../../../assets/right-arrow.png";
import axios from "axios";
import download from "downloadjs";
import config from "../../../conf/configuration";
class BoardFilling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      triggerDownload: false,
      page: 1,
      currentPage: 1,
      isSuccessToastVisible: false,
      isDownloadToastVisible: false,
      isSaving: false,
      count: 0,
      showMenu: true,
    };
    this.addPage = this.addPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.ShowToast = this.ShowToast.bind(this);
    this.saveToDatabase = this.saveToDatabase.bind(this);
    this.setToFirstPage = this.setToFirstPage.bind(this);
    this.removePage = this.removePage.bind(this);
    this.startDownload = this.startDownload.bind(this);
    this.download = this.download.bind(this);
  }
  setToFirstPage() {
    this.setState((prevState, props) => ({
      currentPage: 1,
    }));
  }
  addPage() {
    this.setState((prevState, props) => ({
      page: prevState.page + 1,
    }));
  }
  removePage() {
    this.setState((prevState, props) => ({
      page: prevState.page - 1,
    }));
  }
  nextPage() {
    this.setState((prevState, props) => ({
      currentPage: prevState.currentPage + 1,
    }));
  }
  previousPage() {
    this.setState((prevState, props) => ({
      currentPage: prevState.currentPage - 1,
    }));
  }
  componentDidMount() {
    console.log("reason:", this.props.values);
    for (let index = 0; index < 2; index++) {
      setTimeout(() => {
        if (this.state.count < 2) {
          this.setState({ count: this.state.count });
        }
      }, 1000);
    }
  }
  startDownload() {
    if (this.state.isSaving == true) {
      return;
    }
    // Download the resume

    this.saveToDatabase();
    setTimeout(() => {
      window.location.href = "./billing/plans";
    }, 8000);

    this.ShowToast("Download");
    // this.download();
  }
  async download() {
    var self = this;
    if (localStorage.getItem("currentResumeId") == null) {
      localStorage.setItem(
        "currentResumeId",
        Math.floor(Math.random() * 20000).toString() + "xknd"
      );
      console.log(localStorage.getItem("currentResumeId"));
      this.saveToDatabase();
    } else {
      this.saveToDatabase();
    }
    await IncrementDownloads();
    setJsonPb(localStorage.getItem("currentResumeId"), this.props.values);

    axios
      .post(
        "https://" + config.backendUrl + "/api/export",
        {
          language: this.props.values.language,
          resumeId: localStorage.getItem("currentResumeId"),
          resumeName: this.props.currentResumeName,
        },
        {
          responseType: "blob", // had to add this one here
        }
      )
      .then(function (response) {
        // handle success
        // const content = response.headers['content-type'];
        // download(response.data, "resume.pdf", content)
        console.log(response);
        const content = response.headers["content-type"];
        download(response.data, "resume.pdf", content);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }
  // Showing  Toast
  ShowToast(type) {
    if (type == "Download") {
      // Subscription status is off and we download directly
      setTimeout(() => {
        this.setState((prevState, props) => ({
          isDownloadToastVisible: !prevState.isDownloadToastVisible,
        }));
      }, 8000);
      this.setState((prevState, props) => ({
        isDownloadToastVisible: !prevState.isDownloadToastVisible,
      }));
    }
    if (type == "Success") {
      // Subscription status is off and we download directly
      setTimeout(() => {
        this.setState((prevState, props) => ({
          isSuccessToastVisible: !prevState.isSuccessToastVisible,
        }));
      }, 8000);
      this.setState((prevState, props) => ({
        isSuccessToastVisible: !prevState.isSuccessToastVisible,
      }));
    }
  }
  // Saving into database But first we check which field has been edited to avoid unecessary writes in  database
  saveToDatabase() {
    var r = JSON.parse(localStorage.getItem("currentResumeItem"));
    if (r) {
      const name = r.item.firstname + r.item.lastname;
      var vr = JSON.parse(localStorage.getItem(name));
      if (vr) {
        if (vr.status == "PAID" || vr.status == "SETTLED") {
          vr.ShowMenu = "false";

          localStorage.setItem(name, JSON.stringify(vr));
        }
      }
    }
    var numberOfInputs = 0;
    this.setState({ isSaving: true });
    if (!localStorage.getItem("currentResumeItem")) {
      this.currentResume = {};
    } else {
      this.currentResume = JSON.parse(
        localStorage.getItem("currentResumeItem")
      );
    }

    if (localStorage.getItem("currentResumeId") == null) {
      localStorage.setItem(
        "currentResumeId",
        Math.floor(Math.random() * 20000).toString() + "xknd"
      );
    }
    setResumePropertyPerUser(
      localStorage.getItem("user"),
      localStorage.getItem("currentResumeId"),
      "template",
      this.props.values.resumeName
    );
    setResumePropertyPerUser(
      localStorage.getItem("user"),
      localStorage.getItem("currentResumeId"),
      "title",
      this.props.values.title
    );

    setTimeout(() => {
      if (
        this.currentResume.firstname !== this.props.values.firstname ||
        this.currentResume.firstname == undefined
      ) {
        console.log("Firstname need to be changed in database");
        setResumePropertyPerUser(
          localStorage.getItem("user"),
          localStorage.getItem("currentResumeId"),
          "firstname",
          this.props.values.firstname
        );
      }
      if (
        this.currentResume.lastname !== this.props.values.lastname ||
        this.currentResume.lastname == undefined
      ) {
        console.log("Firstname need to be changed in database");
        setResumePropertyPerUser(
          localStorage.getItem("user"),
          localStorage.getItem("currentResumeId"),
          "lastname",
          this.props.values.lastname
        );
      }
      if (
        this.currentResume.email !== this.props.values.email ||
        this.currentResume.email == undefined
      ) {
        console.log("Firstname need to be changed in database");
        setResumePropertyPerUser(
          localStorage.getItem("user"),
          localStorage.getItem("currentResumeId"),
          "email",
          this.props.values.email
        );
      }
      if (
        this.currentResume.phone !== this.props.values.phone ||
        this.currentResume.phone == undefined
      ) {
        console.log("Firstname need to be changed in database");
        setResumePropertyPerUser(
          localStorage.getItem("user"),
          localStorage.getItem("currentResumeId"),
          "phone",
          this.props.values.phone
        );
      }
      if (
        this.currentResume.occupation !== this.props.values.occupation ||
        this.currentResume.occupation == undefined
      ) {
        console.log("Firstname need to be changed in database");
        setResumePropertyPerUser(
          localStorage.getItem("user"),
          localStorage.getItem("currentResumeId"),
          "occupation",
          this.props.values.occupation
        );
      }
      if (
        this.currentResume.country !== this.props.values.country ||
        this.currentResume.country == undefined
      ) {
        console.log("Firstname need to be changed in database");
        setResumePropertyPerUser(
          localStorage.getItem("user"),
          localStorage.getItem("currentResumeId"),
          "country",
          this.props.values.country
        );
      }
      if (
        this.currentResume.city !== this.props.values.city ||
        this.currentResume.city == undefined
      ) {
        console.log("Firstname need to be changed in database");
        setResumePropertyPerUser(
          localStorage.getItem("user"),
          localStorage.getItem("currentResumeId"),
          "city",
          this.props.values.city
        );
      }
      if (
        this.currentResume.address !== this.props.values.address ||
        this.currentResume.address == undefined
      ) {
        console.log("Firstname need to be changed in database");
        setResumePropertyPerUser(
          localStorage.getItem("user"),
          localStorage.getItem("currentResumeId"),
          "address",
          this.props.values.address
        );
      }
      if (
        this.currentResume.postalcode !== this.props.values.postalcode ||
        this.currentResume.postalcode == undefined
      ) {
        console.log("Firstname need to be changed in database");
        setResumePropertyPerUser(
          localStorage.getItem("user"),
          localStorage.getItem("currentResumeId"),
          "postalcode",
          this.props.values.postalcode
        );
      }
      if (
        this.currentResume.dateofbirth !== this.props.values.dateofbirth ||
        this.currentResume.dateofbirth == undefined
      ) {
        console.log("dateofbirth need to be changed in database");
        setResumePropertyPerUser(
          localStorage.getItem("user"),
          localStorage.getItem("currentResumeId"),
          "dateofbirth",
          this.props.values.dateofbirth
        );
      }
      if (
        this.currentResume.drivinglicense !==
          this.props.values.drivinglicense ||
        this.currentResume.drivinglicense == undefined
      ) {
        console.log("Firstname need to be changed in database");
        setResumePropertyPerUser(
          localStorage.getItem("user"),
          localStorage.getItem("currentResumeId"),
          "drivinglicense",
          this.props.values.drivinglicense
        );
      }
      if (
        this.currentResume.nationality !== this.props.values.nationality ||
        this.currentResume.nationality == undefined
      ) {
        console.log("Firstname need to be changed in database");
        setResumePropertyPerUser(
          localStorage.getItem("user"),
          localStorage.getItem("currentResumeId"),
          "nationality",
          this.props.values.nationality
        );
      }
      if (
        this.currentResume.summary !== this.props.values.summary ||
        this.currentResume.summary == undefined
      ) {
        console.log("Firstname need to be changed in database");
        setResumePropertyPerUser(
          localStorage.getItem("user"),
          localStorage.getItem("currentResumeId"),
          "summary",
          this.props.values.summary
        );
      }
      // Adding employments
      addEmployments(
        localStorage.getItem("user"),
        localStorage.getItem("currentResumeId"),
        this.props.values.employments
      );
      // adding educations if presented
      addEducations(
        localStorage.getItem("user"),
        localStorage.getItem("currentResumeId"),
        this.props.values.educations
      );
      // adding skills if presented
      addSkills(
        localStorage.getItem("user"),
        localStorage.getItem("currentResumeId"),
        this.props.values.skills
      );
      //adding Languages if presented
      addLanguages(
        localStorage.getItem("user"),
        localStorage.getItem("currentResumeId"),
        this.props.values.languages
      );
      getResumeById(
        localStorage.getItem("user"),
        localStorage.getItem("currentResumeId")
      ).then((data) => {
        if (data != null) {
          var r = JSON.parse(
            localStorage.getItem(data.firstname + data.lastname)
          );
          if (r) {
            localStorage.setItem(
              "currentResumeItem",
              JSON.stringify({
                id: localStorage.getItem("currentResumeId"),
                item: data,
                employments: data.employments,
                educations: data.educations,
                skills: data.skills,
                languages: data.languages,
                invoice: r.invoice,
              })
            );
          } else {
            localStorage.setItem(
              "currentResumeItem",
              JSON.stringify({
                id: localStorage.getItem("currentResumeId"),
                item: data,
                employments: data.employments,
                educations: data.educations,
                skills: data.skills,
                languages: data.languages,
                invoice: false,
              })
            );
          }
        }
      });
    }, 1000);
    this.ShowToast("Success");

    setTimeout(() => {
      this.setState({ isSaving: false });
    }, 8500);
  }
  render() {
    const { t } = this.props;
    var showM = true;
    var r = JSON.parse(localStorage.getItem("currentResumeItem"));
    if (r) {
      const name = r.item.firstname + r.item.lastname;
      const showed = JSON.parse(localStorage.getItem(name));
      if (showed) {
        if (showed.ShowMenu) {
          showM = false;
        }
      } else {
        showM = true;
      }
    }
    return (
      <div className="board">
        <AnimatePresence>
          {this.state.isSuccessToastVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Toasts type="Success" />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {this.state.isDownloadToastVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Toasts type="Download" />
            </motion.div>
          )}
        </AnimatePresence>
        <div id="cv" className="cv">
          <div className="cvWrapper">
            {/* <ul className="pagination">
              <li onClick={() => this.previousPage()}> <img className="navigationImagePrevious " src={NextImage} /> </li>
              <li>1 / {this.state.page}</li>
              <li onClick={() => this.nextPage()}> <img className="navigationImage" src={NextImage} /> </li>
            </ul> */}
            <div id="Resume">
              <Canvas
                setToFirstPage={this.setToFirstPage}
                currentResumeName={this.props.currentResumeName}
                initialisePages={this.initialisePages}
                currentPage={this.state.currentPage}
                pages={this.state.page}
                addPage={this.addPage}
                previousPage={this.removePage}
                downloadEnded={this.downloadEnded}
                triggerDownload={this.state.triggerDownload}
                values={this.props.values}
              />
            </div>
            {/* The canvas go here with the properties and which cv to render */}
            {/* <Canvas  triggerDownload={this.state.triggerDownload} values ={this.props.values} /> */}
            {/* <CvBasic values ={this.props.values} />
             */}
            {showM ? (
              <div className="cvAction">
                <span
                  onClick={() => this.props.stepBack()}
                  className="selectTemplateLink"
                >
                  {" "}
                  <img src={MenuImg} /> {t("form.selectTemplate")}{" "}
                </span>
                <div>
                  {localStorage.getItem("user") && (
                    <button
                      onClick={() => this.saveToDatabase()}
                      style={{ fontSize: "15px" }}
                      className="btn-default"
                    >
                      {t("form.save")}{" "}
                    </button>
                  )}
                  <button
                    onClick={() => this.startDownload()}
                    style={{ fontSize: "15px" }}
                    className={
                      this.state.isSaving == true
                        ? "btn-default isSaving"
                        : "btn-default"
                    }
                  >
                    {t("form.download")}{" "}
                  </button>
                </div>
              </div>
            ) : (
              <div className="cvAction" style={{ display: "none" }}>
                <span
                  onClick={() => this.props.stepBack()}
                  className="selectTemplateLink"
                >
                  {" "}
                  <img src={MenuImg} /> {t("form.selectTemplate")}{" "}
                </span>
                <div>
                  {localStorage.getItem("user") && (
                    <button
                      onClick={() => this.saveToDatabase()}
                      style={{ fontSize: "15px" }}
                      className="btn-default"
                    >
                      {t("form.save")}{" "}
                    </button>
                  )}
                  <button
                    onClick={() => this.startDownload()}
                    style={{ fontSize: "15px" }}
                    className={
                      this.state.isSaving == true
                        ? "btn-default isSaving"
                        : "btn-default"
                    }
                  >
                    {t("form.download")}{" "}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
const MyComponent = withTranslation("common")(BoardFilling);
export default MyComponent;
