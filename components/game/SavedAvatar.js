import React, { useState, useEffect } from "react";
import Avatar from "./Avatar";
import { Alert } from "react-native";
import { supabase } from "../../lib/supabase";
import { useIsFocused } from "@react-navigation/native";

const SavedAvatar = ({ size, session }) => {
  const [gender, setGender] = useState("chest");
  const [hat, setHat] = useState("None");
  const [skin, setSkin] = useState("light");
  const [bgColor, setBgColor] = useState("blue");
  const [accessory, setAccessory] = useState("none");
  const [clothing, setClothing] = useState("shirt");
  const [clotheColor, setClotheColor] = useState("white");
  const [eyebrow, setEyebrow] = useState("raised");
  const [eye, setEye] = useState("normal");
  const [facialHair, setFacialHair] = useState("none");
  const [graphic, setGraphic] = useState("none");
  const [hair, setHair] = useState("none");
  const [hairColor, setHairColor] = useState("black");
  const [hatColor, setHatColor] = useState("red");
  const [mouth, setMouth] = useState("grin");
  const [lipColor, setLipColor] = useState("red");

  const isFocused = useIsFocused();

  useEffect(() => {
    if (session) getProfile();
  }, [session, isFocused]);

  const getProfile = async () => {
    try {
      const user = supabase.auth.user();
      if (!user) throw new Error("No user on the session!");

      let { data, error, status } = await supabase
        .from("avatars")
        .select()
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setGender(data.gender);
        setHat(data.hat);
        setSkin(data.skin);
        setBgColor(data.bgColor);
        setAccessory(data.accessory);
        setClothing(data.clothing);
        setClotheColor(data.clotheColor);
        setEyebrow(data.eyebrow);
        setEye(data.eye);
        setFacialHair(data.facialHair);
        setGraphic(data.graphic);
        setHair(data.hair);
        setHairColor(data.hairColor);
        setHatColor(data.hatColor);
        setMouth(data.mouth);
        setLipColor(data.lipColor);
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <Avatar
      size={size}
      gender={gender}
      skin={skin}
      hat={hat}
      hatColor={hatColor}
      bgColor={bgColor}
      accessory={accessory}
      clothing={clothing}
      clotheColor={clotheColor}
      eyebrow={eyebrow}
      eye={eye}
      facialHair={facialHair}
      graphic={graphic}
      hair={hair}
      hairColor={hairColor}
      mouth={mouth}
      lipColor={lipColor}
    />
  );
};

export default SavedAvatar;
