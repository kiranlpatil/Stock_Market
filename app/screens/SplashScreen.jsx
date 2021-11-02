import React, { useRef, useEffect, useState } from "react";
import {
  SafeAreaView,
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Alert,
  PanResponder,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import LoaderScreen from "./LoaderScreen";
import * as Network from "expo-network";

const { width } = Dimensions.get("window");
const lockWidth = width * 0.75;
const lockHeight = 60;
const smallgap = 4;
const finalPosition = lockWidth - lockHeight;

const SplashScreen = (props) => {
  const [loader, setLoader] = useState(false);
  const moveAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const translateBtn = pan.x.interpolate({
    inputRange: [0, finalPosition],
    outputRange: [0, finalPosition],
    extrapolate: "clamp",
  });
  const textOpacity = pan.x.interpolate({
    inputRange: [0, lockWidth / 2],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  const translateText = pan.x.interpolate({
    inputRange: [0, lockWidth / 2],
    outputRange: [0, lockWidth / 4],
    extrapolate: "clamp",
  });
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {},
      onPanResponderMove: Animated.event([null, { dx: pan.x }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, g) => {
        if (g.vx > 2 || g.dx > lockWidth / 2) {
          unlock();
        } else {
          reset();
        }
      },
      onPanResponderTerminate: () => reset(),
    })
  ).current;
  const reset = () => {
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
      bounciness: 0,
    }).start();
  };
  const unlock = async () => {
    Animated.spring(pan, {
      toValue: { x: finalPosition, y: 0 },
      useNativeDriver: true,
      bounciness: 0,
    }).start();
    setLoader(true);
    const network = await Network.getNetworkStateAsync();
    if (network.isConnected) {
      setTimeout(async () => {
        const credentials = await SecureStore.getItemAsync("mail");
        console.log("value of credentials: ", JSON.parse(credentials));
        if (credentials && JSON.parse(credentials).email) {
          console.log("home");
          props.navigation.navigate(
            "Home Screen",
            JSON.parse(credentials).isAdmin
          );
        } else {
          props.navigation.navigate("AdCampaign");
          console.log("campaign");
        }
      }, 300);
    } else {
      Alert.alert("Poor Net Connection", "Restart App and try again");
    }
  };

  useEffect(() => {
    Animated.sequence([
      Animated.timing(moveAnim, {
        duration: 1000,
        toValue: Dimensions.get("window").width / 1.6,
        delay: 0,
        useNativeDriver: false,
      }),
      Animated.timing(moveAnim, {
        duration: 2000,
        toValue: 0,
        delay: 0,
        useNativeDriver: false,
      }),
    ]).start();
    Animated.timing(fadeAnim, {
      duration: 2000,
      toValue: 1,
      delay: 2000,
      useNativeDriver: false,
    }).start();
  }, [moveAnim, fadeAnim]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Animated.Image
          style={[styles.image, { opacity: fadeAnim }]}
          source={require("../../assets/tradertunnel-bg.png")}
        />
        <Animated.View style={[styles.logoContainer, { marginLeft: moveAnim }]}>
          <Text style={[styles.logoText]}>{"Stock "}</Text>
          <Animated.Text style={[styles.logoText, { opacity: fadeAnim }]}>
            Market
          </Animated.Text>
        </Animated.View>
      </View>
      <View style={styles.container2}>
        <View style={styles.lockContainer}>
          <Animated.Text
            style={[
              styles.txt,
              {
                opacity: textOpacity,
                transform: [{ translateX: translateText }],
              },
            ]}
          >
            {"Slide to Enter ->"}
          </Animated.Text>
          <Animated.View
            style={[styles.bar, { transform: [{ translateX: translateBtn }] }]}
            {...panResponder.panHandlers}
          />
        </View>
      </View>
      {loader && <LoaderScreen />}
    </SafeAreaView>
  );
};

export default SplashScreen;

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#00BFFF",
  },
  logoText: {
    fontSize: 35,
    marginTop: 20,
    color: "white",
    fontWeight: "700",
  },
  contentContainer: {
    top: "40%",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "40%",
  },
  logoContainer: {
    flexDirection: "row",
  },
  container2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 100,
  },
  lockContainer: {
    height: lockHeight,
    width: lockWidth,
    borderRadius: lockHeight,
    backgroundColor: "#555",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  txt: {
    color: "#fff",
    letterSpacing: 2,
  },
  bar: {
    position: "absolute",
    height: lockHeight - smallgap * 2,
    width: lockHeight - smallgap * 2,
    backgroundColor: "#fff",
    borderRadius: lockHeight,
    left: smallgap,
    elevation: 1,
  },
});
