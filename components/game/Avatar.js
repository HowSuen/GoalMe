import React from "react";
import { BigHead } from "react-native-bigheads";

const Avatar = ({
  size,
  gender,
  skin,
  hat,
  hatColor,
  bgColor,
  accessory,
  clothing,
  clotheColor,
  eyebrow,
  eye,
  facialHair,
  graphic,
  hair,
  hairColor,
  mouth,
  lipColor,
}) => {
  return (
    <BigHead
      accessory={accessory || "none"}
      bgColor={bgColor || "blue"}
      bgShape="circle"
      body={gender || "chest"}
      clothing={clothing || "shirt"}
      clothingColor={clotheColor || "white"}
      eyebrows={eyebrow || "raised"}
      eyes={eye || "normal"}
      facialHair={facialHair || "none"}
      graphic={graphic || "none"}
      hair={hair || "none"}
      hairColor={hairColor || "black"}
      hat={hat || "none"}
      hatColor={hatColor || "red"}
      lashes={gender ? (gender == "chest" ? false : true) : false}
      lipColor={lipColor || "red"}
      mouth={mouth || "grin"}
      showBackground={true}
      size={size}
      skinTone={skin || "light"}
    />
  );
};

export default Avatar;
