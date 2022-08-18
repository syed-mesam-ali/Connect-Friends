import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-light text-center text-lg-start">
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          Created By :&nbsp;
          <span className="text-dark">Syed Mesam Ali</span>
          <a
            target="_blank"
            href="https://github.com/syed-mesam-ali"
            title="GitHub"
          >
            <i className="fa fa-github footerIcon"></i>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
