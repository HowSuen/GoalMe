import React from "react";
import { BigHead } from "react-native-bigheads";

const Avatar = ({avatar}) => {
  return (
    <BigHead
      accessory="hoopEarrings"
      bgColor="blue"
      bgShape="circle"
      body="chest"
      clothing="tankTop"
      clothingColor="black"
      eyebrows="angry"
      eyes="wink"
      facialHair="mediumBeard"
      graphic="vue"
      hair="short"
      hairColor="black"
      hat="none"
      hatColor="green"
      lashes={false}
      lipColor="purple"
      mouth="open"
      showBackground={true}
      size={300}
      skinTone="brown"
    />
  );
};

export default Avatar;