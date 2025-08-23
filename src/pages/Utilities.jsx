import React from "react";
import "./Utilities.css";

/**
 * Quick-links grid for common utilities.
 * Drop this component anywhere in your app.
 */
export default function Utilities() {
  const items = [
      {
      name: "Augutsya",
      href: "https://www.augutsya.com/",
      img: "/atpwhite.png",
    },
    {
      name: "BSES Yamuna",
      href: "https://www.bsesdelhi.com/web/bypl/quick-pay?paytm/",
      img: "../bsesyamuna.png",
    },
    {
      name: "Tata Power-DDL",
      href: "https://www.tatapower-ddl.com/billpay/paybillonline.aspx/",
      img: "../tatapower.png",
    },
    {
      name: "IGL",
      href: "https://www.iglonline.net/english/Default.aspx",
      img: "../igl.png",
    },
    {
      name: "BSES Delhi (BRPL)",
      href: "https://www.bsesdelhi.com/web/brpl/quick-pay?billDesk/",
      img: "../bsesdelhi.png",
    },
    {
      name: "IRCTC",
      href: "https://www.irctc.co.in/nget/train-search",
      img: "../irctc.png",
    },
    
    {
      name: "NVSP (Voter Services)",
      href: "https://www.nvsp.in/Account/Login",
      img: "../voterid.png",
    },
    
    {
      name: "UIDAI (Aadhaar)",
      href: "https://uidai.gov.in/my-aadhaar/get-aadhaar.html",
      img: "../aadhar.png",
    },
    {
      name: "PAN (NSDL)",
      href: "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html",
      img: "../pancard.png",
    },
    {
      name: "TIN (e-Tax NSDL)",
      href: "https://onlineservices.tin.egov-nsdl.com/etaxnew/tdsnontds.jsp",
      img: "../tinlogo.png",
    },
    {
      name: "Income Tax e-Filing",
      href: "https://eportal.incometax.gov.in/iec/foservices/#/login",
      img: "../incometax.png",
    },
        {
      name: "Passport Seva",
      href: "https://www.passportindia.gov.in/",
      img: "../passportseva.png",
    },
    {
      name: "Airtel Selfcare",
      href: "https://www.airtel.in/s/selfcare?normalLogin",
      img: "../airtel.png",
    },
    {
      name: "JIO",
      href: "https://jio.com",
      img: "../jiologo.jpeg",
    },
    {
      name: "MakeMyTrip",
      href: "https://makemytrip.com",
      img: "../mmyt.png",
    },

    {
      name: "Paytm",
      href: "https://www.paytm.com/".replace("www.", ""), // avoids some CSP issues
      img: "../paytm.png",
    },
    {
      name: "Amazon India",
      href: "https://www.amazon.in/",
      img: "../amazon.png",
    },
    {
      name: "HDFC PayZapp",
      href: "https://payzapp.biz.hdfcbank.com/HDFCPayZapp/Account/Login.aspx",
      img: "../payzapp.png",
    },
    {
      name: "Moneycontrol",
      href: "https://www.moneycontrol.com/",
      img: "../moneycontrol.png",
    },
  
  ];

  return (
    <section className="utilities" aria-labelledby="utilities-heading">
      <div className="utilities__container">
        <h2 id="utilities-heading" className="utilities__title">
          UTILITIES FOR YOU
        </h2>

        <div className="utilities__grid">
          {items.map((u) => (
            <a
              className="utilities__card"
              key={u.name}
              href={u.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={u.name}
              title={u.name}
            >
              <img
                className="utilities__img"
                src={u.img}
                alt={u.name}
                loading="lazy"
                decoding="async"
              />
              <span className="utilities__label">{u.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
