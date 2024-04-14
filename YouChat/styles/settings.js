import { StyleSheet } from "react-native";
import { LINE_COLOR } from "../utils/colors";

export default styles = StyleSheet.create({
    container : {
        height : '100%',
        width : '100%'
    },
    privacysub : {
        paddingTop : 20,
        paddingBottom : 20,
        display : 'flex',
        flexDirection : 'row',
        gap : 15,
        paddingLeft : 30,
        alignItems : 'center',
        borderTopColor : LINE_COLOR,
        borderTopWidth : 0.5,
    },
    profile : {
        display : 'flex',
        flexDirection : 'row',
        alignItems : 'center',
        gap : 15,
        padding : 20,
    }
})