import wash from "../Modal/style.jpg";
import clip from "../Modal/clip.jpg";
import hair from "../Modal/bath.jpg";

import React from "react";
import { Slide } from "react-slideshow-image";

const slideImages = [wash, clip, hair];

const Slideshow = () => {
  return (
    <div className="slider">
      <Slide easing="ease">
        <div className="each-slide">
          <div style={{ backgroundImage: `url(${slideImages[0]})` }}></div>
        </div>
        <div className="each-slide">
          <div style={{ backgroundImage: `url(${slideImages[1]})` }}></div>
        </div>
        <div className="each-slide">
          <div style={{ backgroundImage: `url(${slideImages[2]})` }}></div>
        </div>
      </Slide>
    </div>
  );
};

export default Slideshow;
