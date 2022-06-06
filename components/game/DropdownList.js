import RNPickerSelect from "react-native-picker-select";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const DropdownList = ({items, onValueChange}) => {
  return (
    <RNPickerSelect
      items={items}
      onValueChange={onValueChange}
      style={{
        ...pickerSelectStyles,
        iconContainer: {
          top: 10,
          right: 12,
        },
      }}
      useNativeAndroidPickerStyle={false}
      textInputProps={{ underlineColor: "red" }}
      Icon={() => {
        return <Ionicons name="md-arrow-down" size={24} color="gray" />;
      }}
    />
  );
};

export default DropdownList;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "white",
    paddingRight: 40, // to ensure the text is never behind the icon
    marginLeft: 10,
    marginRight: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "white",
    borderRadius: 8,
    color: "white",
    paddingRight: 40, // to ensure the text is never behind the icon
    marginLeft: 10,
    marginRight: 10,
  },
});
