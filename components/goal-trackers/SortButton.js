import RNPickerSelect from "react-native-picker-select";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default SortButton = ({ value, items, onValueChange }) => {
  return (
    <RNPickerSelect
      value={value}
      items={items}
      onValueChange={onValueChange}
      placeholder={{ label: "Sort by...", value: null }}
      style={{
        ...pickerSelectStyles,
      }}
      useNativeAndroidPickerStyle={false}
      textInputProps={{ underlineColor: "red" }}
      Icon={() => {
        return (
          <Ionicons
            style={pickerSelectStyles.icon}
            name="chevron-down-sharp"
            size={24}
            color="gray"
          />
        );
      }}
    />
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 15,
    height: 40,
    width: 130,
    paddingVertical: 12,
    paddingLeft: 6.5,
    paddingRight: 25, // to ensure the text is never behind the icon
    marginTop: 15,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "black",
    color: "black",
    backgroundColor: "ghostwhite",
  },
  inputAndroid: {
    fontSize: 15,
    height: 40,
    width: 130,
    paddingVertical: 8,
    paddingHorizontal: 6.5,
    paddingRight: 25, // to ensure the text is never behind the icon
    marginTop: 15,
    borderWidth: 1.5,
    borderRadius: 8,
    borderColor: "black",
    color: "black",
    backgroundColor: "ghostwhite",
  },
  icon: { 
    marginTop: 15, 
    paddingVertical: 8,
    paddingHorizontal: 2,
  },
});
