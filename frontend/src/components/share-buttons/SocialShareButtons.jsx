import React from "react";

const SocialShareButtons = ({ url, title }) => {
  return (
    <div className="share-icons-grid">
      <div className="share-grid-social-icon">
        <a
          target="_blank" rel="noreferrer"
          href={`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${title}`}
        >
          <img alt="share on facebook" src="/social/fb.svg" />
        </a>
      </div>
      <div className="share-grid-social-icon">
        <a
          target="_blank" rel="noreferrer"
          href={`https://twitter.com/intent/tweet?text=${title}&url=${url}`}
        >
          <img alt="share on twitter" src="/social/x.svg" />
        </a>
      </div>
      <div className="share-grid-social-icon">
        <a
          target="_blank" rel="noreferrer"
          href={`mailto:?subject=Članak ${title}&amp; body=pogledaj ovu vijest ${url}`}
        >
          <img alt="share with mail" src="/social/mail.svg" />
        </a>{" "}
      </div>
      <div className="share-grid-social-icon">
      <a href={`viber://forward?text=${title} ${url}`} target="_blank" rel="noreferrer">
        <img alt="share on viber" src="/social/vib.svg" />
        </a>
      </div>
    </div>
  );
};

export default SocialShareButtons;
