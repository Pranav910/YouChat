import { StyleSheet } from "react-native";
import { CUSTOM_GREEN, MODAL_BACKGROUND_COLOR, MODAL_BOX_COLOR } from "../utils/colors";

export default styles = StyleSheet.create({
    modalmain : {
        backgroundColor : MODAL_BACKGROUND_COLOR,
        height : '100%',    
        width : '100%',
        position : 'absolute',
        zIndex : 50,
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center',
    },
    dialog : {
        height : 'auto',
        width : '70%',
        backgroundColor : MODAL_BOX_COLOR,
        borderRadius : 15,
        padding : 20,
        zIndex : 101,
        paddingBottom : 25
    },
    inputcode : {
        borderColor : CUSTOM_GREEN,
        borderWidth : 2,
        width : '100%',
        alignSelf : 'flex-start',
        marginTop : 20,
        borderRadius : 5,
        padding : 7,
        color : 'white',
        fontSize : 16   
    }
})