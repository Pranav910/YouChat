import { StyleSheet } from "react-native";
import { CUSTOM_GREEN, DARK_THEMED_BODY, LINE_COLOR } from "../utils/colors";

export default styles = StyleSheet.create({
    main : {
        height : '100%',
        backgroundColor : DARK_THEMED_BODY
        
    },
    profileopts : {
        height : '100%'
    },
    setProfile : {
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'center',
        marginTop : 50,
        marginBottom : 20
    },
    container : {
        display : 'flex',
        flexDirection : 'row',
        gap : 20,
        alignItems : 'baseline',
        padding : 10,
        justifyContent : 'center',
        margin : 10
    },
    input : {
        borderBottomWidth : 2,
        borderColor : CUSTOM_GREEN,
        width : 200,
        padding : 7,
        color : 'white',
        fontSize : 17
    },
    line : {
        backgroundColor : LINE_COLOR,
        height : 1,
        alignSelf : 'center',
        width : "90%",
        padding : 0,
        marginTop : 20
    }
})