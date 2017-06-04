import React from 'react';
import getAsciiFont from "../../../utils/asciifonts";

import translate from '../../main/translate';


const AsciiFont = ({strings, text}) => {

  return(
    <div className="asciifont" style={{whiteSpace: "pre"}}>
      {getAsciiFont(text)}
    </div>
  )
};

export default translate(AsciiFont);
