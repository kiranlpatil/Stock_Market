import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  SafeAreaView,
  Animated,
  Image,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Caption } from "react-native-paper";
import { getAPI } from "../services/http-delegate.service";
import LoaderScreen from "./LoaderScreen";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);
const SIZE = Dimensions.get("window").width / 3;

const BG_IMG =
  "https://images.pexels.com/photos/2470655/pexels-photo-2470655.jpeg";
const SPACING = 20;
const AVATAR_SIZE = 70;

export default function MarketsScreen() {
  const [numColumns, setNumColumns] = useState(3);
  const [gainers, setGainers] = useState([]);
  const [loosers, setLoosers] = useState([]);

  useEffect(() => {
    loadGainersData();
    loadLoosersData();
  }, []);

  const loadGainersData = () => {
    getAPI("https://tradertunnel.herokuapp.com/api/nse/gainers").then(
      (result) => {
        if (result.status === 200) {
          setGainers(result.data);
        }
      }
    );
  };

  const loadLoosersData = () => {
    getAPI("https://tradertunnel.herokuapp.com/api/nse/losers").then(
      (result) => {
        if (result.status === 200) {
          setLoosers(result.data);
        }
      }
    );
  };

  const TopGainers = () => {
    const scrollY = React.useRef(new Animated.Value(0)).current;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Image
          source={{ uri: BG_IMG }}
          style={StyleSheet.absoluteFillObject}
          blurRadius={40}
        />
        {gainers && gainers.length > 0 ? (
          <Animated.FlatList
            data={gainers}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
            keyExtractor={(item) => item.symbol}
            contentContainerStyle={{
              padding: SPACING,
            }}
            renderItem={({ item, index }) => {
              return (
                <Animated.View
                  style={{
                    flexDirection: "row",
                    padding: SPACING - 5,
                    marginBottom: SPACING,
                    backgroundColor: "#ffffff",
                    borderRadius: 12,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 10 },
                    shadowOpacity: 0.4,
                    shadowRadius: 20,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "flex-start",
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "flex-start",
                      }}
                    >
                      <Text style={{ fontSize: 18, fontWeight: "800" }}>
                        {item.symbol}
                        <Caption></Caption>
                      </Text>
                    </View>
                    {/* <Caption style={{ paddingTop: 5 }}>
                      {"12:00 Thurday 7, 2021"}
                    </Caption> */}
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "500",
                        paddingTop: 10,
                      }}
                    >
                      {item.openPrice}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "500",
                        paddingTop: 10,
                      }}
                    >
                      {item.tradedQuantity}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "500",
                        paddingTop: 10,
                      }}
                    >
                      {item.netPrice + " %"}
                    </Text>
                  </View>
                </Animated.View>
              );
            }}
          />
        ) : (
          <LoaderScreen />
        )}
      </SafeAreaView>
    );
  };

  const TopLoosers = () => {
    const scrollY = React.useRef(new Animated.Value(0)).current;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Image
          source={{ uri: BG_IMG }}
          style={StyleSheet.absoluteFillObject}
          blurRadius={40}
        />
        {gainers && gainers.length > 0 ? (
          <Animated.FlatList
            data={loosers}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
            keyExtractor={(item) => item.symbol}
            contentContainerStyle={{
              padding: SPACING,
            }}
            renderItem={({ item, index }) => {
              return (
                <Animated.View
                  style={{
                    flexDirection: "row",
                    padding: SPACING - 5,
                    marginBottom: SPACING,
                    backgroundColor: "#ffffff",
                    borderRadius: 12,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 10 },
                    shadowOpacity: 0.4,
                    shadowRadius: 20,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "flex-start",
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "flex-start",
                      }}
                    >
                      <Text style={{ fontSize: 18, fontWeight: "800" }}>
                        {item.symbol}
                        <Caption></Caption>
                      </Text>
                    </View>
                    {/* <Caption style={{ paddingTop: 5 }}>
                      {"12:00 Thurday 7, 2021"}
                    </Caption> */}
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "500",
                        paddingTop: 10,
                      }}
                    >
                      {item.openPrice}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "500",
                        paddingTop: 10,
                      }}
                    >
                      {item.tradedQuantity}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "500",
                        paddingTop: 10,
                      }}
                    >
                      {item.netPrice + " %"}
                    </Text>
                  </View>
                </Animated.View>
              );
            }}
          />
        ) : (
          <LoaderScreen />
        )}
      </SafeAreaView>
    );
  };
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        // tabBarActiveTintColor: "#e91e63",
        tabBarItemStyle: { width: SLIDER_WIDTH / 2 },
        tabBarScrollEnabled: true,
      }}
    >
      <Tab.Screen name="Top Gainer" component={TopGainers} />
      <Tab.Screen name="Top Looser" component={TopLoosers} />
      {/* <Tab.Screen name="Price Shockers" component={TabScreen} />
      <Tab.Screen name="Volume Shockers" component={TabScreen} />
      <Tab.Screen name="52-Week High" component={TabScreen} />
      <Tab.Screen name="52-Week Low" component={TabScreen} /> */}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
  },
  item: {
    backgroundColor: "#6495ED",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
    margin: 5,
    borderRadius: 10,
  },
  item2: {
    backgroundColor: "#6495ED",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    margin: 5,
    borderRadius: 10,
    flexDirection: "row",
  },
  item3: {
    backgroundColor: "#6495ED",
    alignItems: "center",
    flex: 1,
    margin: 5,
    borderRadius: 10,
  },
  itemInvisible: {
    backgroundColor: "transparent",
  },
  itemText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },

  textStyle: {
    color: "black",
    borderColor: "#307ecc",
    height: 40,
    fontWeight: "700",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 15,
    flexDirection: "row",
  },
  buttonStyle: {
    backgroundColor: "#307ecc",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#307ecc",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
  textLabel: {
    fontWeight: "bold",
    fontSize: 25,
    color: "darkslategrey",
    fontFamily: "Roboto",
    paddingTop: "30%",
    paddingBottom: "10%",
    textAlign: "center",
    zIndex: 0,
  },
  textButton: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    textAlign: "center",
    fontFamily: "Roboto",
  },
  enabledButton: {
    height: "60%",
    alignItems: "center",
    backgroundColor: "#307ecc",
    padding: 10,
    borderRadius: 200,
    width: "70%",
    top: "10%",
    fontWeight: "bold",
    color: "darkslategrey",
    fontFamily: "Roboto",
    shadowColor: "#6e6969",
    shadowOffset: {
      width: 3,
      height: 7,
    },
    shadowOpacity: 10.2,
    shadowRadius: 10.41,
  },
  text: {
    color: "#0c0c0c",
    fontSize: 20,
    fontFamily: "Roboto",
    width: "100%",
    fontWeight: "bold",
  },
  container: {
    paddingTop: 44,
    backgroundColor: "white",
  },
  gridContainerButtons: {
    width: SIZE,
    height: SIZE,
  },
  carouselContainerButtons: {
    width: SIZE / 1.8,
    height: SIZE / 1.9,
    paddingLeft: 3,
    paddingRight: 3,
    justifyContent: "space-around",
  },
  navBar: {
    height: 55,
    backgroundColor: "white",
    elevation: 5,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rightNav: {
    flexDirection: "row",
  },
  navItem: {
    marginLeft: 25,
  },
  item: {
    flex: 1,
    margin: 3,
    backgroundColor: "lightblue",
  },
  carouselContainer: {
    marginTop: 30,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    backgroundColor: "dodgerblue",
    borderRadius: 20,
    alignItems: "stretch",
    justifyContent: "space-between",
  },
  itemLabel: {
    color: "white",
    fontSize: 20,
    padding: 20,
  },
  gridIcons: {
    zIndex: 1,
    alignSelf: "flex-end",
    position: "absolute",
    borderRadius: (SIZE + SIZE) / 2,
  },
  gridItemLabel: {
    color: "blue",
    fontSize: 15,
    padding: 20,
    alignSelf: "center",
    width: "100%",
    height: "80%",
    fontWeight: "bold",
    backgroundColor: "lightskyblue",
    alignItems: "center",
    borderRadius: 20,
  },
  carouselItemLabel: {
    color: "blue",
    fontSize: 12,
    alignSelf: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    fontWeight: "bold",
    alignContent: "center",
    backgroundColor: "lightskyblue",
    padding: 5,
    alignItems: "stretch",
    borderRadius: 10,
  },
  itemLabelButton: {
    color: "white",
    fontSize: 20,
    justifyContent: "center",
    borderRadius: 20,
    paddingRight: 10,
    paddingTop: 5,
  },
  itemLabelButtonBottom: {
    color: "white",
    fontSize: 20,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "goldenrod",
    borderRadius: 20,
  },
  counter: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
});
