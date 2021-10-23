import React, { useState } from "react";
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

export default function IndicesScreen() {
  const [numColumns, setNumColumns] = useState(3);
  const [data, setData] = useState([
    { key: "Strait Times", value: 23.23, percent: "98%" },
    { key: "CAC", value: 90.1, percent: "18%" },
    { key: "DAX", value: 12.234, percent: "38%" },
    { key: "DTDC", value: 1.23, percent: "68%" },
    { key: "ESPONAL", value: 23.46, percent: "88%" },
    { key: "FTSE", value: 34.67, percent: "28%" },
    { key: "GAK", value: 5422.768, percent: "98%" },
    { key: "HTC", value: 723.83, percent: "88%" },
    { key: "INK", value: 325.233, percent: "78%" },
    { key: "JBL", value: 435.23, percent: "58%" },
  ]);

  const renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <SafeAreaView style={styles.item}>
        <View
          style={[
            styles.item,
            { height: Dimensions.get("window").width / 2 / numColumns },
          ]}
        >
          <Text style={styles.itemText}>{item.key}</Text>
          <Caption>(Oct 2)</Caption>
          <View style={[styles.item2]}>
            <Text
              style={
                (styles.itemText, { alignItems: "center", paddingRight: 20 })
              }
            >
              {item.percent}
            </Text>
            {/* <Text style={styles.itemText}>{"    "}</Text> */}
            <Text style={(styles.itemText, { alignItems: "center" })}>
              {item.value}
            </Text>
          </View>
        </View>
        <View style={[styles.item3]}>
          <Text style={(styles.itemText, { alignItems: "center" })}>
            {item.value}
          </Text>
        </View>
      </SafeAreaView>
    );
  };

  const TabA = () => {
    return (
      <View style={styles.container}>
        <FlatList
          data={formatRow(data, numColumns)}
          style={styles.container}
          renderItem={renderItem}
          numColumns={numColumns}
        />
      </View>
    );
  };

  const TabB = () => {
    return (
      <View style={styles.container}>
        <FlatList
          data={formatRow(data, numColumns)}
          style={styles.container}
          renderItem={renderItem}
          numColumns={numColumns}
        />
      </View>
    );
  };

  const TabC = () => {
    return (
      <View style={styles.container}>
        <FlatList
          data={formatRow(data, numColumns)}
          style={styles.container}
          renderItem={renderItem}
          numColumns={numColumns}
        />
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
});
