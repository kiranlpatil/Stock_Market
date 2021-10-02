import React, {useRef, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TextInput,
    TouchableOpacity, Dimensions, Alert,
} from 'react-native';
import Separator from "../utils/Seperator";
import {Icon} from "react-native-elements";
const {height} = Dimensions.get('window');
const setHeight = h => (height / 100) * h;

const VerificationScreen = () => {
    const firstInput = useRef();
    const secondInput = useRef();
    const thirdInput = useRef();
    const fourthInput = useRef();
    const [otp, setOtp] = useState({1: '', 2: '', 3: '', 4: ''});
    const [counter, setCounter] = React.useState(59);

    React.useEffect(() => {
        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);

    const onPress = () => {
        setCounter(59)
    }

    return (
        <View style={styles.container}>
            <View style={styles.bigCircle}/>
            <View style={styles.smallCircle}/>
            <View style={styles.centralizedView}>
            <View style={styles.authBox}>
            <View style={styles.logoBox}>
                <Icon
                    color='#fff'
                    name='check-circle'
                    type='font-awesome'
                    size={50}
                />
            </View>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={'white'}
                translucent
            />
            <Separator height={StatusBar.currentHeight} />
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>OTP Verification</Text>
            </View>
            <Text style={styles.title}></Text>
            <Text style={styles.content}>
                Enter the OTP number just sent you at:{' '}
                <Text style={styles.phoneNumberText}>{'\nadfak@gmail.com'}</Text>
            </Text>
            <View style={styles.otpContainer}>
                <View style={styles.otpBox}>
                    <TextInput
                        style={styles.otpText}
                        keyboardType="number-pad"
                        maxLength={1}
                        ref={firstInput}
                        onChangeText={text => {
                            setOtp({...otp, 1: text});
                            text && secondInput.current.focus();
                        }}
                    />
                </View>
                <View style={styles.otpBox}>
                    <TextInput
                        style={styles.otpText}
                        keyboardType="number-pad"
                        maxLength={1}
                        ref={secondInput}
                        onChangeText={text => {
                            setOtp({...otp, 2: text});
                            text ? thirdInput.current.focus() : firstInput.current.focus();
                        }}
                    />
                </View>
                <View style={styles.otpBox}>
                    <TextInput
                        style={styles.otpText}
                        keyboardType="number-pad"
                        maxLength={1}
                        ref={thirdInput}
                        onChangeText={text => {
                            setOtp({...otp, 3: text});
                            text ? fourthInput.current.focus() : secondInput.current.focus();
                        }}
                    />
                </View>
                <View style={styles.otpBox}>
                    <TextInput
                        style={styles.otpText}
                        keyboardType="number-pad"
                        maxLength={1}
                        ref={fourthInput}
                        onChangeText={text => {
                            setOtp({...otp, 4: text});
                            !text && thirdInput.current.focus();
                        }}
                    />
                </View>
            </View>
            <Text onPress={onPress} style={[styles.resendText, counter !== 0 ? {color: 'grey'} : {color: 'green'}]}>Resend OTP {counter !== 0 ? `in ${counter}` : ''}</Text>
            <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            </View></View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    bigCircle: {
        width: Dimensions.get('window').height * 0.7,
        height: Dimensions.get('window').height * 0.7,
        backgroundColor: '#ff6b81',
        borderRadius: 1000,
        position: 'absolute',
        right: Dimensions.get('window').width * 0.25,
        top: -50,
    },
    loginButton: {
        backgroundColor: '#ff4757',
        marginTop: 10,
        paddingVertical: 10,
        borderRadius: 4,
    },
    smallCircle: {
        width: Dimensions.get('window').height * 0.4,
        height: Dimensions.get('window').height * 0.4,
        backgroundColor: '#ff7979',
        borderRadius: 1000,
        position: 'absolute',
        bottom: Dimensions.get('window').width * -0.2,
        right: Dimensions.get('window').width * -0.3,
    },
    authBox: {
        width: '80%',
        backgroundColor: '#fafafa',
        borderRadius: 20,
        alignSelf: 'center',
        paddingHorizontal: 14,
        paddingBottom: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    logoBox: {
        width: 100,
        height: 100,
        backgroundColor: '#eb4d4b',
        borderRadius: 1000,
        alignSelf: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        top: -50,
        marginBottom: -50,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    centralizedView: {
        width: '100%',
        top: '15%',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignSelf: 'center'
    },
    headerTitle: {
        fontSize: 20,
        lineHeight: 20 * 1.4,
        alignSelf: 'center',
    },
    resendText: {
        fontSize: 15,
        lineHeight: 20 * 1.4,
        alignSelf: 'center',
    },
    title: {
        fontSize: 20,
        lineHeight: 20 * 1.4,
        marginTop: 50,
        marginBottom: 10,
        marginHorizontal: 20,
    },
    content: {
        fontSize: 20,
        marginTop: 10,
        marginBottom: 20,
        marginHorizontal: 20,
    },
    phoneNumberText: {
        fontSize: 18,
        lineHeight: 18 * 1.4,
        color: 'red',
        fontWeight:'bold',
        alignItems: 'center',
    },
    otpContainer: {
        marginHorizontal: 20,
        marginBottom: 20,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
    },
    otpBox: {
        borderRadius: 5,
        borderColor: 'green',
        borderWidth: 0.5,
    },
    otpText: {
        fontSize: 25,
        color: 'black',
        padding: 0,
        textAlign: 'center',
        paddingHorizontal: 18,
        paddingVertical: 10,
    },
    signinButton: {
        backgroundColor: 'green',
        borderRadius: 8,
        marginHorizontal: 20,
        height: setHeight(6),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    loginButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default VerificationScreen;