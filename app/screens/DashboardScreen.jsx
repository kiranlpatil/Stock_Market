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
} from "react-native";

import Carousel, { Pagination } from "react-native-snap-carousel";
import { Fontisto } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);
const SIZE = Dimensions.get("window").width / 3;
const height = Dimensions.get("window").height;

const DATA = [];
for (let i = 0; i < 10; i++) {
  DATA.push(i);
}

export default class App extends Component {
  state = {
    index: 0,
  };

  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
  }

  _onPressCarousel = () => {
    Alert.alert("Buy Nifty", "Oops! bought Sensex");
  };

  _onPressGrid = (id) => {
    if (id === "f") {
      Linking.openURL("https://telegram.me/Traderstunnel");
    } else if (id === "c") {
      const whatsappMsg =
        "Hi,\nI need a premium subscription for stock trading. And will undertake terms and conditions allowed by Govt. and stock traders group";
      Linking.openURL(
        `whatsapp://send?phone=${919834383943}&text=${whatsappMsg}`
      ).then(() => {
        Alert.alert(
          "Success",
          "Your Premium Subscription will commence very soon"
        );
      });
    } else if (id === "a" || id === "b") {
      this.props.navigation.navigate("Intraday Page");
    } else if (id === "d") {
      this.props.navigation.navigate("Indices");
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
              }}
            >{`Sensex ${item}`}</Text>
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
                {"Intraday Item"}
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
              data={[
                { id: "a", name: "Target 1", value: 12.22, isCorrect: true },
                { id: "b", name: "Target 2", value: 57.98, isCorrect: false },
                { id: "c", name: "Target 3", value: 98.42, isCorrect: true },
                { id: "d", name: "Stop Loss", value: 23.92, isCorrect: true },
              ]}
              renderItem={({ item }) => (
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
                      {item.name}
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
                      {item.isCorrect && (
                        <Ionicons
                          name="checkmark-circle-sharp"
                          size={15}
                          color="green"
                        />
                      )}
                      {!item.isCorrect && <Text style={{ fontSize: 12 }} />}
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

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.navBar}>
          <Image
            source={require("../../assets/icon-logo.jpeg")}
            style={{ width: 80, height: 50, padding: 0 }}
          />
          <View style={styles.rightNav}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Notification")}
            >
              <Ionicons
                name="notifications-circle-outline"
                size={30}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>
        <Carousel
          ref={(c) => (this.carousel = c)}
          data={DATA}
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
        <View>
          <Pagination
            activeDotIndex={this.state.index}
            dotsLength={DATA.length}
            dotColor={"red"}
            inactiveDotColor={"blue"}
          />
        </View>
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
          keyExtractor={(item) => item.id}
          numColumns={3}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 44,
    backgroundColor: "white",
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
