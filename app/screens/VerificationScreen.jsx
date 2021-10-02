import React, {useRef, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import {Separator} from '../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Display} from '../utils';

const VerificationScreen = () => {
    const firstInput = useRef();
    const secondInput = useRef();
    const thirdInput = useRef();
    const fourthInput = useRef();
    const [otp, setOtp] = useState({1: '', 2: '', 3: '', 4: ''});

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={'white'}
                translucent
            />
            <Separator height={StatusBar.currentHeight} />
            <View style={styles.headerContainer}>
                <Ionicons
                    name="chevron-back-outline"
                    size={30}
                    // onPress={() => navigation.goBack()}
                />
                <Text style={styles.headerTitle}>OTP Verification</Text>
            </View>
            <Text style={styles.title}>OTP Verification</Text>
            <Text style={styles.content}>
                Enter the OTP number just sent you at{' '}
                <Text style={styles.phoneNumberText}>+91 9834383493</Text>
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
            <TouchableOpacity
                style={styles.signinButton}
                onPress={() => console.log(otp)}>
                <Text style={styles.signinButtonText}>Verify</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    headerTitle: {
        fontSize: 20,
        lineHeight: 20 * 1.4,
        width: Display.setWidth(80),
        textAlign: 'center',
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
        color: 'yellow',
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
        height: Display.setHeight(6),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    signinButtonText: {
        fontSize: 18,
        lineHeight: 18 * 1.4,
        color: 'white',
    },
});

export default VerificationScreen;