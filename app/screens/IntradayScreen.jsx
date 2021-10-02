import * as React from 'react';
import {Image, Animated, Text, View, StyleSheet, SafeAreaView, Button, TouchableOpacity} from 'react-native';
const statusBarHeight = Constants.statusBarHeight
import {rgbaColor} from "react-native-reanimated/src/reanimated2/Colors";
import {StatusBar} from "expo-status-bar";
import Constants from 'expo-constants';
import faker from 'faker'
import {useEffect, useState} from "react";

faker.seed(10);
const DATA = [...Array(30).keys()].map((_, i) => {
    return {
        key: faker.random.uuid(),
        image: `https://randomuser.me/api/portraits/${faker.helpers.randomize(['women', 'men'])}/${faker.random.number(60)}.jpg`,
        name: faker.name.findName(),
        jobTitle: faker.name.jobTitle(),
        email: faker.internet.email(),
    };
});

const BG_IMG = 'https://images.pexels.com/photos/2470655/pexels-photo-2470655.jpeg';
const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 5;

export default function IntradayScreen()  {
    const [ images, imageData ] = useState([]);

    const scrollY = React.useRef(new Animated.Value(0)).current;
    return <SafeAreaView style={{flex: 1, paddingTop: statusBarHeight}}>
        <Image
            source={{uri: BG_IMG}}
            style={StyleSheet.absoluteFillObject}
            blurRadius={40}
        />
        <Animated.FlatList
            data={DATA}
            onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {y: scrollY}}}],
                { useNativeDriver: true }
            )}
            keyExtractor={item => item.key}
            contentContainerStyle={{
                padding: SPACING,
                paddingTop: StatusBar.currentHeight || 42
            }}
            renderItem={({item, index}) => {
                const inputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 1)]
                const opacityInputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 1)]
                const scale = scrollY.interpolate({inputRange, outputRange: [1,1,1,0]})
                const opacity = scrollY.interpolate({inputRange: opacityInputRange, outputRange: [1,1,1,0]})
                return <Animated.View style={{flexDirection: 'row', padding: SPACING, marginBottom: SPACING, backgroundColor: rgbaColor(255,255,255,0.8),
                    borderRadius: 12, shadowColor: "#000", shadowOffset: {width: 0, height: 10}, shadowOpacity: 0.4, shadowRadius:20, opacity, transform: [{scale}]
                }}>
                    <Image
                        source={{uri: item.image}}
                        style={{width: AVATAR_SIZE, height: '100%', marginRight: SPACING / 2, flexDirection: 'row'}}
                    />
                    <View style={{ flex: 1,
                        justifyContent: 'center',
                        padding: 20,}}>
                        <Text style={styles.textStyle}>Nanded, Maharashtra</Text>
                    </View>
                </Animated.View>
            }}

        />
    </SafeAreaView>
}

const styles = StyleSheet.create({
    textStyle: {
        color: 'black',
        borderColor: '#307ecc',
        height: 40,
        fontWeight: '700',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 15,
        flexDirection: 'row'
    },
    buttonStyle: {
        backgroundColor: '#307ecc',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#307ecc',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 15,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    textLabel: {
        fontWeight: 'bold',
        fontSize: 25,
        color: 'darkslategrey',
        fontFamily: "Roboto",
        paddingTop: "30%",
        paddingBottom: "10%",
        textAlign: 'center',
        zIndex: 0
    },
    textButton: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        fontFamily: "Roboto"
    },
    enabledButton: {
        height: '60%',
        alignItems: "center",
        backgroundColor:"#307ecc",
        padding: 10,
        borderRadius: 200,
        width: '70%',
        top: '10%',
        fontWeight: 'bold',
        color: 'darkslategrey',
        fontFamily: "Roboto",
        shadowColor: "#6e6969",
        shadowOffset: {
            width: 3,
            height: 7,
        },
        shadowOpacity: 10.20,
        shadowRadius: 10.41,

        elevation: 2,
    },
    text: {
        color:  "#0c0c0c",
        fontSize: 20,
        fontFamily: "Roboto",
        width: '100%',
        fontWeight: 'bold',
    }
});