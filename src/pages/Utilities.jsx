import React from "react";
import "./Utilities.css";

/**
 * Quick-links grid for common utilities.
 * Drop this component anywhere in your app.
 */
export default function Utilities() {
  const items = [
    {
      name: "BSES Yamuna",
      href: "https://www.bsesdelhi.com/web/bypl/quick-pay?paytm/",
      img: "https://www.augutsya.com/wp-content/uploads/2020/08/bsesyamuna.png",
    },
    {
      name: "Tata Power-DDL",
      href: "https://www.tatapower-ddl.com/billpay/paybillonline.aspx/",
      img: "https://www.augutsya.com/wp-content/uploads/2020/08/tatapower.png",
    },
    {
      name: "IGL",
      href: "https://www.iglonline.net/english/Default.aspx",
      img: "https://www.augutsya.com/wp-content/uploads/2020/08/igl.png",
    },
    {
      name: "BSES Delhi (BRPL)",
      href: "https://www.bsesdelhi.com/web/brpl/quick-pay?billDesk/",
      img: "https://www.augutsya.com/wp-content/uploads/2020/08/bsesdelhi.png",
    },
    {
      name: "IRCTC",
      href: "https://www.irctc.co.in/nget/train-search",
      img: "https://www.augutsya.com/wp-content/uploads/2020/08/irctc.png",
    },
    {
      name: "MakeMyTrip",
      href: "https://www.makemytrip.com/",
      img: "https://www.augutsya.com/wp-content/uploads/2020/08/mmyt.png",
    },
    {
      name: "NVSP (Voter Services)",
      href: "https://www.nvsp.in/Account/Login",
      img: "https://www.augutsya.com/wp-content/uploads/2020/08/voterid.png",
    },
    {
      name: "Passport Seva",
      href: "https://portal2.passportindia.gov.in/AppOnlineProject/user/RegistrationBaseAction?request_locale=en",
      img: "https://www.augutsya.com/wp-content/uploads/2020/08/passportseva.png",
    },
    {
      name: "UIDAI (Aadhaar)",
      href: "https://uidai.gov.in/my-aadhaar/get-aadhaar.html",
      img: "https://www.augutsya.com/wp-content/uploads/2020/08/aadhar-copy.png",
    },
    {
      name: "PAN (NSDL)",
      href: "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html",
      img: "https://www.augutsya.com/wp-content/uploads/2020/08/pancard.png",
    },
    {
      name: "TIN (e-Tax NSDL)",
      href: "https://onlineservices.tin.egov-nsdl.com/etaxnew/tdsnontds.jsp",
      img: "https://www.augutsya.com/wp-content/uploads/2020/08/tinlogo.png",
    },
    {
      name: "Income Tax e-Filing",
      href: "https://eportal.incometax.gov.in/iec/foservices/#/login",
      img: "https://www.augutsya.com/wp-content/uploads/2020/08/income_tax.png",
    },
    {
      name: "Airtel Selfcare",
      href: "https://www.airtel.in/s/selfcare?normalLogin",
      img: "https://www.augutsya.com/wp-content/uploads/2020/08/airtel.png",
    },
    {
      name: "Paytm",
      href: "https://www.paytm.com/".replace("www.", ""), // avoids some CSP issues
      img: "https://www.augutsya.com/wp-content/uploads/2020/08/paytmlogo.png",
    },
    {
      name: "Amazon India",
      href: "https://www.amazon.in/",
      img: "https://www.augutsya.com/wp-content/uploads/2020/08/amazon.png",
    },
    {
      name: "HDFC PayZapp",
      href: "https://payzapp.biz.hdfcbank.com/HDFCPayZapp/Account/Login.aspx",
      img: "https://www.augutsya.com/wp-content/uploads/2020/08/payzapp.png",
    },
    {
      name: "Moneycontrol",
      href: "https://www.moneycontrol.com/",
      img: "https://www.augutsya.com/wp-content/uploads/2020/08/moneycontrol.png",
    },
    {
      name: "ClearTax",
      href: "https://cleartax.in/",
      img: "https://www.augutsya.com/wp-content/uploads/2020/08/cleartax-222x220.png",
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
