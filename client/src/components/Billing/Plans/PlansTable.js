import React, { Component, useState, useEffect } from "react";
import axios from "axios";
//import { Payment, redirectToInvoice } from "./Payment";
import Checkimage from "../../../assets/check.png";

const PlansTable = (props) => {
  const tempObj = {
    id: "null",
    invoice_url: "hello",
  };

  const [datas, setDatas] = useState();
  const [hide, setHide] = useState();
  useEffect(() => {
    var user = JSON.parse(localStorage.getItem("currentResumeItem"));
    if (user) {
      const name = user.item.firstname + user.item.lastname;
      var check = JSON.parse(localStorage.getItem(name));
      if (!check) {
        setHide(false);
      } else if (check.invoice == true) {
        setHide(true);
      }
    }
  }, []);
  const CreateInvoice = async () => {
    try {
      var user = JSON.parse(localStorage.getItem("currentResumeItem"));
      const name = user.item.firstname + user.item.lastname;
      console.log(name);
      const res = await axios.get(`https://buatcv.co.id/invoice/${name}`);
      console.log(res);
      //const res = await data.json();
      if (res) {
        setHide(true);
        window.location.href = res.data.invoice_url;
        //console.log(res);
        const objectInvoice = {
          invoice: true,
          id: res.data.id,
        };
        // console.log(objectInvoice);
        localStorage.setItem(name, JSON.stringify(objectInvoice));
      }
    } catch (err) {
      console.log(err);
    }
  };
  const FindInvoice = async (id) => {
    try {
      const data = await fetch(`https://buatcv.co.id/get/${id}`);
      const res = await data.json();
      // console.log(res);
      //console.log(res.status);
    } catch (err) {
      console.log(err);
    }
  };
  const FindAll = async () => {
    try {
      const data = await fetch("https://buatcv.co.id/invoices");
      const res = await data.json();
      //  console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  const Redirect = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    CreateInvoice(user);
    if (datas) {
      setHide(true);
      window.open(datas.invoice_url, "_blank");
    }
  };

  return (
    <>
      <div className="custom-page__Plans-heading">
        <h1>Simple,Transparent pricing</h1>
        <p>
          Important Note: After paying, You can edit the project one more time.
        </p>
      </div>
      <div className="custom-page__Plans-body">
        {/* Card */}
        <div className="custom-page__Plans-card" style={{ display: "none" }}>
          <div className="custom-page__Plans-cardHead">
            {/* Card Head */}
            <div className="price">
              <span className="currency">$</span>
              <span className="custom-page__Plans-price">
                {props.monthly !== null &&
                  props.monthly.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                /<span className="monthLabel">Month</span>
              </span>
            </div>
            {/* Name */}
            <div className="planName">
              <span>Premium Monthly</span>
              <span>Pay ${props.monthly} for 1 month</span>
            </div>
          </div>
          {/* Card Body  */}
          <div className="planCard__body">
            <ul>
              {/* feature item */}
              <li className="planCard__featureItem">
                <div className="leftside">
                  <img src={Checkimage} alt="check" />
                </div>
                <div className="rightside">
                  <div>Unlimited PDF Download </div>
                </div>
              </li>
              {/* feature item */}
              <li className="planCard__featureItem">
                <div className="leftside">
                  <img src={Checkimage} alt="check" />
                </div>
                <div className="rightside">
                  <div>Unlimited Resumes </div>
                </div>
              </li>
              {/* feature item */}
              <li className="planCard__featureItem">
                <div className="leftside">
                  <img src={Checkimage} alt="check" />
                </div>
                <div className="rightside">
                  <div>Non-recurring payment. </div>
                </div>
              </li>
            </ul>
            <div
              onClick={() => props.nextStep("monthly")}
              className="planCard-paymentBtnBasic"
            >
              Upgrade & Download
            </div>
          </div>
        </div>
        {/* Card */}
        <div className="custom-page__Plans-card custom-page__Plans-card-active  ">
          <div className="custom-page__Plans-cardHead">
            {/* Card Head */}
            <div className="price">
              {/* <span className="currency">Rp</span>
                <span className="custom-page__Plans-price"></span> */}
            </div>
            {/* Name */}
            <div className="planName">
              <span>
                <h2>
                  {" "}
                  <b>Premium Plan</b>
                </h2>
              </span>
              <span>RP 30.000/ 1 project</span>
            </div>
          </div>
          {/* Card Body  */}
          <div className="planCard__body">
            <ul>
              {/* feature item */}
              <li className="planCard__featureItem">
                <div className="leftside">
                  <img src={Checkimage} alt="check" />
                </div>
                <div className="rightside">
                  <div>Unlimited Download </div>
                </div>
              </li>
              {/* feature item */}
              <li className="planCard__featureItem">
                <div className="leftside">
                  <img src={Checkimage} alt="check" />
                </div>
                <div className="rightside">
                  <div>Export to PDF </div>
                </div>
              </li>
              {/* feature item */}
              <li className="planCard__featureItem">
                <div className="leftside">
                  <img src={Checkimage} alt="check" />
                </div>
                <div className="rightside">
                  <div>One Time Payment</div>
                </div>
              </li>
            </ul>
            {hide ? (
              <div
                onClick={() => Redirect()}
                className="planCard-paymentBtnBasic planCard-paymentBtnBasic-active"
                style={{ display: "none" }}
              >
                Upgrade & Download
              </div>
            ) : (
              <div
                onClick={() => CreateInvoice()}
                className="planCard-paymentBtnBasic planCard-paymentBtnBasic-active"
              >
                Upgrade & Download
              </div>
            )}
          </div>
        </div>
        {/* Card */}
        <div className="custom-page__Plans-card" style={{ display: "none" }}>
          <div className="custom-page__Plans-cardHead">
            {/* Card Head */}
            <div className="price">
              <span className="custom-page__Plans-price">
                <h1>none</h1>/
              </span>
            </div>
            {/* Name */}
            <div className="planName">
              <span>Premium Yearly</span>
              <span> ${props.yearly} for 1 Year</span>
            </div>
          </div>
          {/* Card Body  */}
          <div className="planCard__body">
            <ul>
              {/* feature item */}
              <li className="planCard__featureItem">
                <div className="leftside">
                  <img src={Checkimage} alt="check" />
                </div>
                <div className="rightside">
                  <div>Unlimited PDF Download </div>
                </div>
              </li>
              {/* feature item */}
              <li className="planCard__featureItem">
                <div className="leftside">
                  <img src={Checkimage} alt="check" />
                </div>
                <div className="rightside">
                  <div>Unlimited Resumes </div>
                </div>
              </li>
              {/* feature item */}
              <li className="planCard__featureItem">
                <div className="leftside">
                  <img src={Checkimage} alt="check" />
                </div>
                <div className="rightside">
                  <div>Non-recurring payment. </div>
                </div>
              </li>
            </ul>
            <div
              onClick={() => props.nextStep("yearly")}
              className="planCard-paymentBtnBasic"
            >
              Upgrade & Download
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PlansTable;
