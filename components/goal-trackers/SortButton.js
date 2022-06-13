import RNPickerSelect from "react-native-picker-select";
import { StyleSheet } from "react-native";

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
    />
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 15,
    height: 40,
    width: 130,
    textAlign: "center",
    paddingVertical: 12,
    paddingHorizontal: 5,
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
    textAlign: "center",
    paddingVertical: 8,
    paddingHorizontal: 5,
    marginTop: 15,
    borderWidth: 1.5,
    borderRadius: 8,
    borderColor: "black",
    color: "black",
    backgroundColor: "ghostwhite",
  },
});
