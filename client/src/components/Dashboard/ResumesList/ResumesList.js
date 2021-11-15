import React, { Component } from "react";
import addResume, {
  getResumes,
  removeResume,
} from "../../../firestore/dbOperations";
import { Link } from "react-router-dom";
import addResumesImage from "../../../assets/undraw_add_document_0hek.svg";
import fire from "../../../conf/fire";
import { withTranslation } from "react-i18next";
import Lottie from "react-lottie";
import axios from "axios";
import LoadingAnimation from "../../../assets/animations/lottie.loading.json";
import { IncrementDownloads, setJsonPb } from "../../../firestore/dbOperations";
import config from "../../../conf/configuration";
import download from "downloadjs";
class ResumesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resumes: "loading",
      DownloadShow: false,
      reloadState: undefined,
    };
    this.setAsCurrentResume = this.setAsCurrentResume.bind(this);
    this.returnResumes = this.returnResumes.bind(this);
    this.deleteResume = this.deleteResume.bind(this);
    this.startDownload = this.startDownload.bind(this);
    this.download = this.download.bind(this);
    this.ShowToast = this.ShowToast.bind(this);
    //this.reloadPage = this.reloadPage.bind(this);
  }
  deleteResume(userId, resumeId, indexInState) {
    removeResume(userId, resumeId);
    if (resumeId == localStorage.getItem("currentResumeId")) {
      localStorage.removeItem("currentResumeId");
    }
    var array = this.state.resumes;
    console.log("array is this");
    console.log(array);
    // Notifying the state that a resume has been deleted
    this.props.showDeletedToast();
    setTimeout(() => {
      document.location.reload();
    }, 1300);
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
  async FindInvoice(id, name) {
    try {
      const axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          APITOKEN:
            "xnd_development_MhZ1i71PE10W07MRxaRVCk0TZu3mMsLH8rHYe1qHxL6efXykHB88ZuTk1MK2Hx",
        },
      };
      const res = await axios.get(
        `https://buatcv.co.id/api/get/${id}`,
        axiosConfig
      );
      //const res = await data.json();
      const CurrentUser = JSON.parse(localStorage.getItem("currentResumeItem"));
      if (CurrentUser) {
        const currentname =
          CurrentUser.item.firstname + CurrentUser.item.lastname;
        if (currentname == name) {
          //alert("match");
          if (res.data.status == "PAID" || res.data.status == "SETTLED") {
            console.log("reload");
            setTimeout(() => {
              window.location.reload();
            }, 5000);
          }
        }
      }
      const oldUser = JSON.parse(localStorage.getItem(name));
      oldUser.status = res.data.status;

      localStorage.setItem(name, JSON.stringify(oldUser));
    } catch (err) {
      console.log(err);
    }
  }
  // reloadPage() {
  //   const reload = this.state.reloadState;
  //   if (reload != undefined) {
  //     const u = JSON.parse(localStorage.getItem("currentResumeItem"));
  //     if (u) {
  //       const uname = u.item.firstname + u.item.lastname;
  //       const reloadcheck = JSON.parse("reload");
  //       if (reloadcheck) {
  //         alert("jell");
  //         const ur = JSON.parse(localStorage.getItem(uname));
  //         if (ur) {
  //           if (ur.status == "PAID" || ur.status == "SETTLED") {
  //             this.setState({ reloadState: false });
  //             localStorage.setItem("reload", false);
  //             window.location.reload();
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
  startDownload(values, id) {
    this.ShowToast("Download");
    this.download(values, id);
  }
  async download(values, id) {
    var self = this;
    if (localStorage.getItem("currentResumeId") == null) {
      localStorage.setItem(
        "currentResumeId",
        Math.floor(Math.random() * 20000).toString() + "xknd"
      );
      //console.log("----> ", localStorage.getItem("currentResumeId"));
    }
    await IncrementDownloads();
    setJsonPb(id, values);
    axios
      .post(
        "https://" + config.backendUrl + "/api/export",
        {
          language: values.language,
          resumeId: id,
          resumeName: values.resumeName,
        },
        {
          responseType: "blob", // had to add this one here
        }
      )
      .then(function (response) {
        // handle success
        // const content = response.headers['content-type'];
        // download(response.data, "resume.pdf", content)
        // console.log(response);
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
  // When user click on go to resume we save the resume id he clicked on so we can display the proper inforamtions in our Resume Board
  setAsCurrentResume(resumeId, data) {
    localStorage.removeItem("currentResumeId");
    localStorage.removeItem("currentResumeDara");
    localStorage.setItem("currentResumeId", resumeId);
    localStorage.setItem("currentResumeItem", data);
    //console.log("Data of resumes");
    var resumeData = JSON.parse(localStorage.getItem("currentResumeItem"));
    //onsole.log(resumeData.firstname);
  }

  //// List all resumes for that specific user
  returnResumes() {
    // setTimeout(() => {
    //   window.location.reload();
    // }, 5000);

    var resumes = [];
    for (let index = 0; index < this.state.resumes.length; index++) {
      var downloads = false;

      const name =
        this.state.resumes[index].item.firstname +
        this.state.resumes[index].item.lastname;
      const r = JSON.parse(localStorage.getItem(name));
      if (r) {
        this.FindInvoice(r.id, name);
        const rd = JSON.parse(localStorage.getItem(name));
        if (rd.status == "PAID" || rd.status == "SETTLED") {
          downloads = true;
          //console.log(rd.status);
        }
      }
      var id = this.state.resumes[index].id;

      var values = {
        user: this.state.resumes[index].user,
        resumeName: this.state.resumes[index].item.template,
        title: this.state.resumes[index].item.title,
        //isAuthShowed: this.state.isAuthShowed,
        firstname: this.state.resumes[index].item.firstname,
        lastname: this.state.resumes[index].item.lastname,
        summary: this.state.resumes[index].item.summary,
        occupation: this.state.resumes[index].item.occupation,
        address: this.state.resumes[index].item.address,
        postalcode: this.state.resumes[index].item.postalcode,
        country: this.state.resumes[index].item.country,
        city: this.state.resumes[index].item.city,
        dateofbirth: this.state.resumes[index].item.dateofbirth,
        drivinglicense: this.state.resumes[index].item.drivinglicense,
        email: this.state.resumes[index].item.email,
        //nationality: this.state.resumes[index].item.nationality,
        phone: this.state.resumes[index].item.phone,
        employments: this.state.resumes[index].employments,
        educations: this.state.resumes[index].educations,
        languages: this.state.resumes[index].languages,
        skills: this.state.resumes[index].skills,
        photo: this.state.resumes[index].photo,
        //membership: this.state..membership,
        //membershipEnds: this.state.membershipEnds,
        language: this.state.resumes[index].item.language || "en",
      };
      //console.log(this.state.resumes[index]);
      resumes[index] = (
        <li key={index} className="resumeItem">
          <div
            className="resumeItemStatus"
            style={{ backgroundColor: "#2ecc71" }}
          ></div>
          <div className="resumeItemContent">
            <div className="resumeItemContentWrapper">
              <span className="name">
                {this.state.resumes[index].item.firstname}
              </span>
              <span className="occupation">
                {this.state.resumes[index].item.title}
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Link
                onClick={() =>
                  this.setAsCurrentResume(
                    this.state.resumes[index].id,
                    JSON.stringify(this.state.resumes[index])
                  )
                }
                className="btn-default btn-goResume"
                to={"/?step=3"}
              >
                {" "}
                Go To Resume
              </Link>
              <a
                onClick={() =>
                  this.deleteResume(
                    localStorage.getItem("user"),
                    this.state.resumes[index].id,
                    index
                  )
                }
                className="btn-default btn-removeResume"
              >
                Remove
              </a>
              {downloads ? (
                <a
                  onClick={() => this.startDownload(values, id)}
                  style={{ fontSize: "15px", backgroundColor: "#2ecc71" }}
                  className="btn-default btn-removeResume"
                >
                  Download
                </a>
              ) : (
                <button style={{ display: "none" }}>no</button>
              )}
            </div>
          </div>
        </li>
      );
    }
    return resumes;
  }
  componentWillMount() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        var resumes;
        /// Getting the resumes
        resumes = getResumes(user.uid);
        resumes.then((value) => {
          resumes = value;
          this.setState({ resumes: resumes });
        });
      }
    });
  }
  render() {
    const loadingSettings = {
      loop: true,
      autoplay: true,
      animationData: LoadingAnimation,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };
    const { t } = this.props;
    return (
      <>
        <div className="dashboardContent">
          <div className="head">
            <div className="headContent">
              <h2>{t("dashboard.dashboard")} </h2>
              {this.state.resumes != null && (
                <Link
                  onClick={() => addResume(localStorage.getItem("user"))}
                  to="/"
                  style={{ fontSize: "17px" }}
                  className="btn-default"
                >
                  {" "}
                  + {t("dashboard.addNew")}{" "}
                </Link>
              )}
            </div>
            <hr />
            {/* Resumes List */}
            <div className="resumesList">
              {this.state.resumes == "loading" ? (
                <Lottie height="50" width="50" options={loadingSettings} />
              ) : this.state.resumes == null ? (
                <div
                  style={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <img className="noResumesImage" src={addResumesImage} />
                  <Link
                    onClick={() => addResume(localStorage.getItem("user"))}
                    style={{ textDecoration: "none " }}
                    to="/"
                  >
                    <a className="btn-default"> {t("dashboard.addResume")} </a>
                  </Link>
                </div>
              ) : (
                <ul>
                  {/*  Return Resumes */}
                  {this.returnResumes()}
                </ul>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
const MyComponent = withTranslation("common")(ResumesList);
export default MyComponent;
