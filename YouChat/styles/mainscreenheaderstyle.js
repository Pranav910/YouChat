import { StyleSheet } from "react-native";
import { DARK_THEMED_HEADER } from "../utils/colors";

export default styles = StyleSheet.create({
    contianer: {
        height: 120,
        width: '100%',
        position: 'realative',
        marginBottom : 5,
        elevation : 10,
    },
    mainscreenheadertitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: '500',
    },
    subcontainer: {
        width: 'auto',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft : 15,
        paddingRight : 10
    },
    dots: {
        height: 3.5,
        width: 3.5,
        backgroundColor: 'white',
        borderRadius: 50,
    },
    optionsBtn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent : 'center',
        alignItems : 'center',
        gap: 2,
        borderRadius : 100,
        width : 20,
        height : 20,
        padding : 15,
    },
    optionsmain : {
        display : 'flex',
        flexDirection :'column-reverse',
    },
    optionsMenu : {
        position : 'absolute',
        bottom : 0,
        right : 0,
        backgroundColor : DARK_THEMED_HEADER,
        transform : [{translateY : (117*90)/100}],
        marginRight : 30,
        borderRadius : 13,
        elevation : 4,
        shadowOpacity : 1,
        height : 'auto',
        width : 120,
        overflow : 'hidden',
        zIndex : 1000
    },
    options : {
        color : 'white',
        margin : 10,
        paddingLeft : 10
    },
    touchables : {
      width : '100%',
      margin : 10
    },
    touchableview : {
    },
    touchablemain : {
        width : '100%',
    },
    backview: {
        position: 'absolute',
        height: 10000,
        width: '100%',
        backgroundColor: 'transparent',
        zIndex: 100
      }
})