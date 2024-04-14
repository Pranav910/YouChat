import { StyleSheet } from "react-native";
import { CUSTOM_GREEN } from "../utils/colors";

export default styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderWidth: 1,
    height : '100%',
    width: '100%',
  },
  addBtn: {
    backgroundColor: CUSTOM_GREEN,
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 20,
    borderRadius: 100,
    height: 50,
    width: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  addSym: {
    color: 'white',
    fontSize: 30,
  },
  modal : {
    backgroundColor : 'blue'
  }
});