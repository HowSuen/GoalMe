import RNPickerSelect from "react-native-picker-select";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default GoalDropdownList = ({
  value,
  items,
  onValueChange,
  placeholder,
  disabled,
}) => {
  return (
    <RNPickerSelect
      value={value}
      items={items}
      onValueChange={onValueChange}
      placeholder={placeholder}
      disabled={disabled}
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "dodgerblue",
    borderRadius: 4,
    color: "black",
    paddingRight: 40, // to ensure the text is never behind the icon
    marginLeft: 10,
    marginRight: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "dodgerblue",
    borderRadius: 8,
    color: "black",
    paddingRight: 40, // to ensure the text is never behind the icon
    marginLeft: 10,
    marginRight: 10,
  },
});
