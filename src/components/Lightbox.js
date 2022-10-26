import React, { useState } from "react";

const LightBox = ({ children, src, alt }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="col-3 lightbox" onClick={toggleIsOpen}>
      {children}
      {isOpen ? (
        <div className="lightbox__box" onClick={toggleIsOpen}>
          <img className="lightbox__image" src={src} alt={alt} />
        </div>
      ) : null}
    </div>
  );
};

export default LightBox;
