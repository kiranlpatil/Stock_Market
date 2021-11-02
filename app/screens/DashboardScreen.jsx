import React, { Component } from "react";
import {
  Text,
  Image,
  View,
  Dimensions,
  StyleSheet,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Linking,
  RefreshControl,
  BackHandler,
} from "react-native";
import Constants from "expo-constants";
import { AdMobBanner } from "expo-ads-admob";
import httpDelegateService, { getAPI } from "../services/http-delegate.service";

const testAdId = "ca-app-pub-3940256099942544/6300978111";
const prodAdId = "ca-app-pub-1789331916266084/1171417841";
const adUnitID = Constants.isDevice && !__DEV__ ? prodAdId : testAdId;
console.log(__DEV__);
import Carousel, { Pagination } from "react-native-snap-carousel";
import {
  Fontisto,
  Ionicons,
  Foundation,
  SimpleLineIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import LoaderScreen from "./LoaderScreen";
const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);
const SIZE = Dimensions.get("window").width / 3;
const height = Dimensions.get("window").height;

export default class App extends React.Component {
  state = {
    index: 0,
    dashboardPage: true,
    stopLoader: false,
    stockItems: [],
    refreshing: false,
  };

  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
  }

  _onPressCarousel = () => {
    Alert.alert("Buy Nifty", "Oops! bought Sensex");
  };

  onButtonPress = () => {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
    // then navigate
    // navigate('NewScreen');
  };

  handleBackButton = () => {
    Alert.alert(
      "Exit App",
      "Exiting the application?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Back"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {
        cancelable: false,
      }
    );
    return true;
  };

  async componentDidMount() {
    const result = await getAPI(
      "https://tradertunnel.herokuapp.com/api/stock-items/top-five"
    );
    this.setState({ stopLoader: true });
    if (result.status === "success") {
      console.log("refer");
      this.setState({ stockItems: result.data });
    }
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  _onPressGrid = (id) => {
    if (id === "f") {
      Linking.openURL("https://telegram.me/Traderstunnel");
    } else if (id === "c") {
      const whatsappMsg =
        "Hi,\nI need a premium subscription for stock trading. And will undertake terms and conditions allowed by Govt. and stock traders group";
      Linking.openURL(
        `whatsapp://send?phone=${918806572877}&text=${whatsappMsg}`
      ).then(() => {
        Alert.alert(
          "Success",
          "Your Premium Subscription will commence very soon"
        );
      });
    } else if (id === "a") {
      this.props.navigation.navigate("Intraday Page", { type: "Intraday" });
      BackHandler.removeEventListener(
        "hardwareBackPress",
        this.handleBackButton
      );
    } else if (id === "b") {
      this.props.navigation.navigate("Delivery Page", { type: "Delivery" });
      BackHandler.removeEventListener(
        "hardwareBackPress",
        this.handleBackButton
      );
    } else if (id === "d") {
      this.props.navigation.navigate("Indices");
      BackHandler.removeEventListener(
        "hardwareBackPress",
        this.handleBackButton
      );
    } else if (id === "e") {
      this.props.navigation.navigate("Market");
      BackHandler.removeEventListener(
        "hardwareBackPress",
        this.handleBackButton
      );
    }
  };

  _renderItem({ item }) {
    return (
      <View>
        <View style={styles.itemContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-around",
            }}
          >
            <Text
              style={{
                ...styles.itemLabel,
                justifyContent: "flex-start",
                borderRadius: 20,
                alignSelf: "center",
                flex: 1,
              }}
            >
              {item.stockName}
            </Text>
            <TouchableOpacity
              onPress={this._onPressCarousel}
              style={styles.itemLabelButton}
            >
              <Text
                style={{
                  ...styles.itemLabel,
                  justifyContent: "center",
                  borderRadius: 20,
                  fontSize: 17,
                  alignSelf: "center",
                  alignContent: "center",
                  backgroundColor: "green",
                }}
              >
                {item.stockType}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              padding: 5,
            }}
          >
            <FlatList
              data={item.stockInnerItems}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={{
                    ...styles.carouselContainerButtons,
                    padding: 2,
                    flexDirection: "column",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "lightgreen",
                      flex: 1,
                      justifyContent: "center",
                      borderRadius: 10,
                      alignContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        padding: 1,
                        justifyContent: "center",
                        alignSelf: "center",
                        fontSize: 10,
                      }}
                    >
                      {index === 0
                        ? "Target 1"
                        : index === 1
                        ? "Target 2"
                        : index === 2
                        ? "Target 3"
                        : "Stop Loss"}
                    </Text>
                    <Text
                      style={{
                        padding: 1,
                        justifyContent: "flex-end",
                        alignSelf: "center",
                        fontSize: 12,
                      }}
                    >
                      {item.value}
                    </Text>
                    <View
                      style={{
                        justifyContent: "flex-end",
                        padding: 2,
                        paddingRight: 5,
                        width: "100%",
                        alignItems: "flex-end",
                      }}
                    >
                      {item.markColor !== "grey" && (
                        <Ionicons
                          name="checkmark-circle-sharp"
                          size={15}
                          color={item.markColor}
                        />
                      )}
                      {item.markColor === "grey" && (
                        <Text style={{ fontSize: 12 }} />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
              numColumns={4}
            />
          </View>
          <View style={{ paddingLeft: 10, paddingBottom: 12 }}>
            <Text style={{ color: "black" }}>09:28 Thursday 26, 2021</Text>
          </View>
        </View>
      </View>
    );
  }

  getHeader = () => {
    return (
      <View style={{ alignItems: "center", justifyContent: "flex-end" }}>
        <AdMobBanner
          bannerSize="smartBannerLandscape"
          adUnitID="ca-app-pub-1789331916266084/1171417841"
          servePersonalizedAds="leaderboard"
        />
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.state.stockItems.length > 0 ? (
          <SafeAreaView>
            <SafeAreaView style={styles.navBar}>
              <Image
                source={require("../../assets/tradertunnel-bg.png")}
                style={{
                  width: 80,
                  height: 40,
                  padding: 0,
                }}
              />
              <SafeAreaView style={styles.rightNav}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("Notification");
                    BackHandler.removeEventListener(
                      "hardwareBackPress",
                      this.handleBackButton
                    );
                  }}
                >
                  <Ionicons
                    name="notifications-circle-outline"
                    size={30}
                    color="black"
                  />
                </TouchableOpacity>
              </SafeAreaView>
            </SafeAreaView>
            <SafeAreaView>
              <Carousel
                ref={(c) => (this.carousel = c)}
                data={this.state.stockItems}
                renderItem={this._renderItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                containerCustomStyle={styles.carouselContainer}
                inactiveSlideShift={0}
                onSnapToItem={(index) => this.setState({ index })}
                useScrollView={true}
                loop={true}
                autoplay={true}
                autoplayInterval={2000}
                autoplayDelay={1000}
              />
            </SafeAreaView>
            <SafeAreaView>
              <Pagination
                activeDotIndex={this.state.index}
                dotsLength={this.state.stockItems.length}
                dotColor={"red"}
                inactiveDotColor={"blue"}
              />
            </SafeAreaView>
            <FlatList
              data={[
                {
                  id: "a",
                  value: "Intraday Calls",
                  icons: (
                    <Foundation
                      name="graph-bar"
                      size={38}
                      color="lightblue"
                      style={{ ...styles.gridIcons, backgroundColor: "black" }}
                    />
                  ),
                },
                {
                  id: "b",
                  value: "Delivery Calls",
                  icons: (
                    <SimpleLineIcons
                      name="graph"
                      size={38}
                      color="lightblue"
                      style={{ ...styles.gridIcons, backgroundColor: "black" }}
                    />
                  ),
                },
                {
                  id: "c",
                  value: "Join Premium",
                  icons: (
                    <MaterialIcons
                      name="local-fire-department"
                      size={38}
                      color="lightblue"
                      style={{ ...styles.gridIcons, backgroundColor: "black" }}
                    />
                  ),
                },
                {
                  id: "d",
                  value: "Global Indices",
                  icons: (
                    <Ionicons
                      name="earth"
                      size={38}
                      color="black"
                      style={styles.gridIcons}
                    />
                  ),
                },
                {
                  id: "e",
                  value: "Market",
                  icons: (
                    <Foundation
                      name="graph-pie"
                      size={38}
                      color="lightblue"
                      style={{ ...styles.gridIcons, backgroundColor: "black" }}
                    />
                  ),
                },
                {
                  id: "f",
                  value: "Join Telegram",
                  icons: (
                    <Fontisto
                      name="telegram"
                      size={40}
                      color="black"
                      style={styles.gridIcons}
                    />
                  ),
                },
              ]}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{ ...styles.gridContainerButtons, padding: 5 }}
                  onPress={() => this._onPressGrid(item.id)}
                >
                  {item.icons}
                  <Text style={styles.gridItemLabel}>{item.value}</Text>
                </TouchableOpacity>
              )}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={() => this.componentDidMount()}
                />
              }
              keyExtractor={(item) => item.id}
              numColumns={3}
              ListFooterComponent={this.getHeader}
              ListEmptyComponent={this.getHeader}
            />
          </SafeAreaView>
        ) : (
          <LoaderScreen />
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 44,
    backgroundColor: "white",
    flex: 1,
  },
  gridContainerButtons: {
    width: SIZE,
    height: SIZE,
  },
  carouselContainerButtons: {
    width: SIZE / 2,
    height: SIZE / 2,
    paddingLeft: 5,
    paddingRight: 5,
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
    fontSize: 17,
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
