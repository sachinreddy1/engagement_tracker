import React from "react";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

function Footer() {
  const shareUrl = 'https://engagementtracker.net'

  return (
    <div className="footer">
      <LinkedinShareButton data-testid="linkedin-share-button" className="socialButton" url={shareUrl} >
        <LinkedinIcon size='3vh' round={true} />
      </LinkedinShareButton>
      <TwitterShareButton data-testid="twitter-share-button" className="socialButton" url={shareUrl} >
        <TwitterIcon size='3vh' round={true} />
      </TwitterShareButton>
      <FacebookShareButton data-testid="facebook-share-button" className="socialButton" url={shareUrl} >
        <FacebookIcon size='3vh' round={true} />
      </FacebookShareButton>
      <EmailShareButton data-testid="email-share-button" className="socialButton" url={shareUrl} >
        <EmailIcon size='3vh' round={true} />
      </EmailShareButton>
      <div className="footerText">v0.1</div>
    </div>
  );
}

export default Footer;
