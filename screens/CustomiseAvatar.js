import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import Avatar from "../components/game/Avatar";
import styles from "./CustomiseAvatar.style";
import DropdownList from "../components/game/DropdownList";
import { supabase } from "../lib/supabase";
import { useIsFocused } from "@react-navigation/native";

const genders = [
  { label: "Male", value: "chest" },
  { label: "Female", value: "breasts" },
];

const skinTones = [
  { label: "Light", value: "light" },
  { label: "Yellow", value: "yellow" },
  { label: "Brown", value: "brown" },
  { label: "Dark", value: "dark" },
  { label: "Red", value: "red" },
  { label: "Black", value: "black" },
];

const hats = [
  { label: "None", value: "none" },
  { label: "Beanie", value: "beanie" },
  { label: "Turban", value: "turban" },
  { label: "Party", value: "party" },
  { label: "Hijab", value: "hijab" },
];

const hatColors = [
  { label: "White", value: "white" },
  { label: "Blue", value: "blue" },
  { label: "Black", value: "black" },
  { label: "Green", value: "green" },
  { label: "Red", value: "red" },
];

const bgColors = [
  { label: "Blue", value: "blue" },
  { label: "Green", value: "green" },
  { label: "Red", value: "red" },
  { label: "Orange", value: "orange" },
  { label: "Yellow", value: "yellow" },
  { label: "Turqoise", value: "turqoise" },
  { label: "Pink", value: "pink" },
  { label: "Purple", value: "purple" },
];

const accessories = [
  { label: "None", value: "none" },
  { label: "Round Glasses", value: "roundGlasses" },
  { label: "Tiny Glasses", value: "tinyGlasses" },
  { label: "Shades", value: "shades" },
  { label: "Face Mask", value: "faceMask" },
  { label: "Hoop Earrings", value: "hoopEarrings" },
];

const clothings = [
  { label: "Naked", value: "naked" },
  { label: "Shirt", value: "shirt" },
  { label: "Dress", value: "dress" },
  { label: "Dress Shirt", value: "dressShirt" },
  { label: "V-Neck", value: "vneck" },
  { label: "Tank Top", value: "tankTop" },
  { label: "Denim Jacket", value: "denimJacket" },
  { label: "Hoodie", value: "hoodie" },
  { label: "Chequered Shirt", value: "chequeredShirt" },
  { label: "Dark Chequered Shirt", value: "chequeredShirtDark" },
];

const clothingColor = [
  { label: "White", value: "white" },
  { label: "Black", value: "black" },
  { label: "Blue", value: "blue" },
  { label: "Green", value: "green" },
  { label: "Red", value: "red" },
];

const eyebrows = [
  { label: "Raised", value: "raised" },
  { label: "Left Lowered", value: "leftLowered" },
  { label: "Serious", value: "serious" },
  { label: "Angry", value: "angry" },
  { label: "Concerned", value: "concerned" },
];

const eyes = [
  { label: "Normal", value: "normal" },
  { label: "Left Twitch", value: "leftTwitch" },
  { label: "Happy", value: "happy" },
  { label: "Content", value: "content" },
  { label: "Squint", value: "squint" },
  { label: "Simple", value: "simple" },
  { label: "Dizzy", value: "dizzy" },
  { label: "Wink", value: "wink" },
  { label: "Hearts", value: "hearts" },
  { label: "Crazy", value: "crazy" },
  { label: "Cute", value: "cute" },
  { label: "Dollars", value: "dollars" },
  { label: "Stars", value: "stars" },
  { label: "Cyborg", value: "cyborg" },
  { label: "Simple Patch", value: "simplePatch" },
  { label: "Pirate Patch", value: "piratePatch" },
];

const facialHairs = [
  { label: "None", value: "none" },
  { label: "Stubble", value: "stubble" },
  { label: "Medium Beard", value: "mediumBeard" },
  { label: "Goatee", value: "goatee" },
];

const graphics = [
  { label: "None", value: "none" },
  { label: "Donut", value: "donut" },
  { label: "Rainbow", value: "rainbow" },
  { label: "GraphQL", value: "graphQL" },
  { label: "Redwood", value: "redwood" },
  { label: "Gatsby", value: "gatsby" },
  { label: "Vue", value: "vue" },
  { label: "React", value: "react" },
];

const hairs = [
  { label: "None", value: "none" },
  { label: "Long", value: "long" },
  { label: "Bun", value: "bun" },
  { label: "Short", value: "short" },
  { label: "Pixie", value: "pixie" },
  { label: "Balding", value: "balding" },
  { label: "Buzz", value: "buzz" },
  { label: "Afro", value: "afro" },
  { label: "Bob", value: "bob" },
  { label: "Mohawk", value: "mohawk" },
];

const hairColors = [
  { label: "Blonde", value: "blonde" },
  { label: "Orange", value: "orange" },
  { label: "Black", value: "black" },
  { label: "White", value: "white" },
  { label: "Brown", value: "brown" },
  { label: "Blue", value: "blue" },
  { label: "Pink", value: "pink" },
];

const mouths = [
  { label: "Grin", value: "grin" },
  { label: "Sad", value: "sad" },
  { label: "Open Smile", value: "openSmile" },
  { label: "Lips", value: "lips" },
  { label: "Open", value: "open" },
  { label: "Serious", value: "serious" },
  { label: "Tongue", value: "tongue" },
  { label: "Pierced Tongue", value: "piercedTongue" },
  { label: "Vomiting", value: "vomitingRainbow" },
];

const lipColors = [
  { label: "Red", value: "red" },
  { label: "Purple", value: "purple" },
  { label: "Pink", value: "pink" },
  { label: "Turqoise", value: "turqoise" },
  { label: "Green", value: "green" },
];

const CustomiseAvatar = ({ navigation, session }) => {
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
        setGender(data.gender)
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

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const user = supabase.auth.user();
      if (!user) throw new Error("No user on the session!");

      const updates = {
        id: user.id,
        gender: gender,
        hat: hat,
        skin: skin,
        bgColor: bgColor,
        accessory: accessory,
        clothing: clothing,
        clotheColor: clotheColor,
        eyebrow: eyebrow,
        eye: eye,
        facialHair: facialHair,
        graphic: graphic,
        hair: hair,
        hairColor: hairColor,
        hatColor: hatColor,
        mouth: mouth,
        lipColor: lipColor,
      };

      let { error } = await supabase
        .from("avatars")
        .upsert(updates, { returning: "minimal" });

      if (error) {
        throw error;
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={updateProfile}
        >
          <Text>Save</Text>
        </TouchableOpacity>
        <Avatar
          size={250}
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
      </View>
      <ScrollView style={styles.menu}>
        <View style={styles.slot}>
          <Text style={styles.label}>Gender</Text>
          <DropdownList items={genders} onValueChange={(e) => setGender(e)} />
        </View>
        <View style={styles.slot}>
          <Text style={styles.label}>Skin Tone</Text>
          <DropdownList items={skinTones} onValueChange={(e) => setSkin(e)} />
        </View>
        <View style={styles.slot}>
          <Text style={styles.label}>Background Color</Text>
          <DropdownList items={bgColors} onValueChange={(e) => setBgColor(e)} />
        </View>
        <View style={styles.slot}>
          <Text style={styles.label}>Hat</Text>
          <DropdownList items={hats} onValueChange={(e) => setHat(e)} />
        </View>
        <View style={styles.slot}>
          <Text style={styles.label}>Hat Color</Text>
          <DropdownList
            items={hatColors}
            onValueChange={(e) => setHatColor(e)}
          />
        </View>
        <View style={styles.slot}>
          <Text style={styles.label}>Accessory</Text>
          <DropdownList
            items={accessories}
            onValueChange={(e) => setAccessory(e)}
          />
        </View>
        <View style={styles.slot}>
          <Text style={styles.label}>Clothing</Text>
          <DropdownList
            items={clothings}
            onValueChange={(e) => setClothing(e)}
          />
        </View>
        <View style={styles.slot}>
          <Text style={styles.label}>Clothing Color</Text>
          <DropdownList
            items={clothingColor}
            onValueChange={(e) => setClotheColor(e)}
          />
        </View>
        <View style={styles.slot}>
          <Text style={styles.label}>T-Shirt Graphic</Text>
          <DropdownList items={graphics} onValueChange={(e) => setGraphic(e)} />
        </View>
        <View style={styles.slot}>
          <Text style={styles.label}>Eyebrows</Text>
          <DropdownList items={eyebrows} onValueChange={(e) => setEyebrow(e)} />
        </View>
        <View style={styles.slot}>
          <Text style={styles.label}>Eyes</Text>
          <DropdownList items={eyes} onValueChange={(e) => setEye(e)} />
        </View>
        <View style={styles.slot}>
          <Text style={styles.label}>Hair</Text>
          <DropdownList items={hairs} onValueChange={(e) => setHair(e)} />
        </View>
        <View style={styles.slot}>
          <Text style={styles.label}>Hair Color</Text>
          <DropdownList
            items={hairColors}
            onValueChange={(e) => setHairColor(e)}
          />
        </View>
        <View style={styles.slot}>
          <Text style={styles.label}>Facial Hair</Text>
          <DropdownList
            items={facialHairs}
            onValueChange={(e) => setFacialHair(e)}
          />
        </View>
        <View style={styles.slot}>
          <Text style={styles.label}>Mouth</Text>
          <DropdownList items={mouths} onValueChange={(e) => setMouth(e)} />
        </View>
        <View style={styles.slot}>
          <Text style={styles.label}>Lip Color</Text>
          <DropdownList
            items={lipColors}
            onValueChange={(e) => setLipColor(e)}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default CustomiseAvatar;
