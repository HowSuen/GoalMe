import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    padding:15,
    justifyContent:"center",
    flex:1
  },
  verticallySpaced: {
    paddingTop:5,
    paddingBottom:5,
    alignSelf:"stretch",
  },
  mt20: {
    marginTop:20,
  },
  textInput: {
    color:"white",
  },
  signInButton:{
    marginRight:20,
    marginLeft:20,
    marginTop:15,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:"#00fa9a",
    borderRadius:5,
  },
  signUpButton:{
    marginRight:100,
    marginLeft:100,
    marginTop:20,
    paddingTop:5,
    paddingBottom:5,
  },
  signInText:{
    color:"black",
    fontSize:18,
    textAlign:"center",
  },
  signUpText:{
    color:"white",
    fontSize:14,
    textAlign:"center",
  }
});
