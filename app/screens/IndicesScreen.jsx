import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Caption } from "react-native-paper";
import Constants from "expo-constants";
import { AdMobBanner } from "expo-ads-admob";
import LoaderScreen from "./LoaderScreen";
import httpDelegateService, { getAPI } from "../services/http-delegate.service";
const testAdId = "ca-app-pub-3940256099942544/6300978111";
const prodAdId = "ca-app-pub-1789331916266084/1171417841";
const adUnitID = Constants.isDevice && !__DEV__ ? prodAdId : testAdId;

export default function IndicesScreen() {
  const [numColumns, setNumColumns] = useState(3);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoaderStop, setLoaderStop] = useState(false);

  const [nseDATA, setNseData] = useState([]);
  const [nseFetch, setNseFetch] = useState("false");
  const [bseDATA, setBseData] = useState([]);
  const [bseFetch, setBseFetch] = useState("false");

  const renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <SafeAreaView style={styles.item}>
        <View
          style={[
            styles.item,
            {
              height: Dimensions.get("window").width / 2 / numColumns,
              backgroundColor: item.percChange > 0 ? "green" : "red",
            },
          ]}
        >
          <Text style={styles.itemText}>{item.indexName}</Text>
          <View style={[styles.item2]}>
            <Text
              style={
                (styles.itemText, { alignItems: "center", paddingRight: 20 })
              }
            >
              {item.percChange}
            </Text>
            <Text style={(styles.itemText, { alignItems: "center" })}>
              {item.open}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  };

  const renderItemB = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <SafeAreaView style={styles.item}>
        <View
          style={[
            styles.item,
            {
              height: Dimensions.get("window").width / 1.4 / numColumns,
              backgroundColor: item.perchg > 0 ? "green" : "red",
            },
          ]}
        >
          <Text style={styles.itemText}>{item.indxnm}</Text>
          <View style={[styles.item2]}>
            <Text
              style={
                (styles.itemText, { alignItems: "center", paddingRight: 20 })
              }
            >
              {item.perchg}
            </Text>
            <Text style={(styles.itemText, { alignItems: "center" })}>
              {item.PrevClose}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  };

  const TabA = () => {
    useEffect(() => {
      if (nseFetch === "false") {
        getSaved().then();
      }
    }, []);

    async function getSaved() {
      getAPI("https://tradertunnel.herokuapp.com/api/nse/indices").then(
        (result) => {
          console.log("dfdfs");
          if (result.status === 200) {
            setNseData(result.data);
            setLoaderStop(true);
            setNseFetch("true");
            console.log(nseFetch);
          }
        }
      );
    }

    return (
      <View style={styles.container}>
        {!isLoaderStop ? (
          <LoaderScreen />
        ) : nseDATA.length === 0 ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              fontSize: 20,
            }}
          >
            <Text
              style={{
                justifyContent: "center",
                alignItems: "center",
                fontSize: 20,
              }}
            >
              No Data Available Yet
            </Text>
          </View>
        ) : (
          <FlatList
            data={formatRow(nseDATA, numColumns)}
            style={styles.container}
            renderItem={renderItem}
            numColumns={numColumns}
            keyExtractor={(item) => item.indexName}
          />
        )}
        <View style={{ alignItems: "center" }}>
          {!isAdmin && (
            <AdMobBanner
              bannerSize="smartBannerLandscape"
              adUnitID={adUnitID}
              servePersonalizedAds="leaderboard"
            />
          )}
        </View>
      </View>
    );
  };

  const TabB = () => {
    useEffect(() => {
      if (bseFetch === "false") {
        getSaved().then();
      }
    }, []);

    async function getSaved() {
      getAPI("https://tradertunnel.herokuapp.com/api/bse/indices").then(
        (result) => {
          if (result.status === 200) {
            setBseData(result.data);
            setLoaderStop(true);
            setBseFetch("true");
          }
        }
      );
    }

    return (
      <View style={styles.container}>
        {!isLoaderStop ? (
          <LoaderScreen />
        ) : bseDATA.length === 0 ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              fontSize: 20,
            }}
          >
            <Text
              style={{
                justifyContent: "center",
                alignItems: "center",
                fontSize: 20,
              }}
            >
              No Data Available Yet
            </Text>
          </View>
        ) : (
          <FlatList
            data={formatRow(bseDATA, numColumns)}
            style={styles.container}
            renderItem={renderItemB}
            numColumns={numColumns}
            keyExtractor={(item) => item.indxnm}
          />
        )}
        <View style={{ alignItems: "center" }}>
          {!isAdmin && (
            <AdMobBanner
              bannerSize="smartBannerLandscape"
              adUnitID={adUnitID}
              servePersonalizedAds="leaderboard"
            />
          )}
        </View>
      </View>
    );
  };

  const TabC = () => {
    return (
      <View
        style={
          (styles.container, { justifyContent: "center", alignItems: "center" })
        }
      >
        <Text style={{ fontSize: 20, color: "blue", padding: 30 }}>
          Coming Soon
        </Text>
      </View>
    );
  };

  const formatRow = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }
    return data;
  };

  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="NSE" component={TabA} />
      <Tab.Screen name="BSE" component={TabB} />
      <Tab.Screen name="Global" component={TabC} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
  },
  item: {
    // backgroundColor: "green",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
    margin: 5,
    borderRadius: 10,
  },
  item2: {
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
    fontSize: 13,
    padding: 5,
    fontWeight: "bold",
  },
});
