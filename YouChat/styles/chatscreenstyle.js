import { StyleSheet } from "react-native";
import { CUSTOM_GREEN, DARK_THEMED_HEADER, INPUT_TEXT_COLOR, PREVENT_COLOR } from "../utils/colors";

export default styles = StyleSheet.create({
    container: {
        height: '100%',
        position: 'relative',
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'space-between',
    },
    sendmsg: {
        // position: 'absolute',
        // bottom: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop : 7,
        marginBottom : 4,
        backgroundColor :'transparent',
    },
    inputmsg: {
        height: 47,
        borderRadius: 100,
        color: INPUT_TEXT_COLOR,
        fontSize: 18,
        // borderWidth : 1,
        // borderColor : 'white',
        width : '70%',
        paddingRight : 25
    },
    sendsym: {
        backgroundColor: CUSTOM_GREEN,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        padding : 10,
    },
    prevent: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: PREVENT_COLOR
    },
    send: {
        overflow: 'hidden',
        borderRadius: 100,
        marginRight: 5,
    },
    inputmsgmain : {
        backgroundColor: DARK_THEMED_HEADER,
        height: 47,
        borderRadius: 100,
        width: '84%',
        marginLeft: 5,
        paddingLeft: 15,
        fontSize: 18,
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'space-between',
    },
    msgoptions : {
        width : '30%',
        display : 'flex',
        flexDirection : 'row',
        alignItems : 'center'
    }
})