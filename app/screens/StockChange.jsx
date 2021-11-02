import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput,
  Alert,
} from "react-native";
import { AntDesign, Ionicons, Entypo } from "@expo/vector-icons";
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";
import httpDelegateService from "../services/http-delegate.service";

const height = Dimensions.get("window").height;

const StockChange = (props) => {
  const [newItem, setNewItem] = useState(true);
  const [value, setValue] = useState("Intraday Buy");
  const [stockName, setStockName] = useState("");
  const [targetValue1, setTargetValue1] = useState();
  const [targetValue2, setTargetValue2] = useState();
  const [targetValue3, setTargetValue3] = useState();
  const [stopLossValue, setStopLossValue] = useState();
  // green --- red --- null
  const [target1, setTarget1] = useState("grey");
  const [target2, setTarget2] = useState("grey");
  const [target3, setTarget3] = useState("grey");
  const [stopLoss, setStopLoss] = useState("grey");

  useEffect(() => {
    const item = props.route.params.stockItem;
    if (item && item !== null) {
      setStockName(item.stockName);
      setValue(item.stockType);
      setTargetValue1(item.stockInnerItems[0].value);
      setTargetValue2(item.stockInnerItems[1].value);
      setTargetValue3(item.stockInnerItems[2].value);
      setStopLossValue(item.stockInnerItems[3].value);
      setTarget1(item.stockInnerItems[0].markColor);
      setTarget2(item.stockInnerItems[1].markColor);
      setTarget3(item.stockInnerItems[2].markColor);
      setStopLoss(item.stockInnerItems[3].markColor);
      setNewItem(false);
    }
  }, []);

  const sendStockItem = () => {
    if (
      stockName !== "" &&
      value !== "" &&
      targetValue1 &&
      targetValue2 &&
      targetValue3 &&
      stopLossValue
    ) {
      const body = {
        stockName: stockName,
        stockType: value,
        stockInnerItems: [
          {
            value: targetValue1,
            markColor: target1,
          },
          {
            value: targetValue2,
            markColor: target2,
          },
          {
            value: targetValue3,
            markColor: target3,
          },
          {
            value: stopLossValue,
            markColor: stopLoss,
          },
        ],
      };
      let method;
      let url;
      if (newItem) {
        method = false;
        url = "https://tradertunnel.herokuapp.com/api/stock-items";
      } else {
        method = true;
        url =
          "https://tradertunnel.herokuapp.com/api/stock-items/" +
          props.route.params.stockItem._id;
      }
      httpDelegateService(url, body, true, method).then((result) => {
        if (result.status === "success") {
          props.navigation.goBack();
        }
      });
    }
  };

  return (
    <SafeAreaView
      style={
        (styles.container, { height: height, paddingTop: 42, padding: 20 })
      }
    >
      <SafeAreaView style={styles.header2}>
        <Text style={styles.headerLabel2}>Stock Name</Text>
      </SafeAreaView>
      <SafeAreaView style={styles.inputBox2}>
        <TextInput
          style={styles.inputHeader2}
          value={stockName}
          onChangeText={(val) => setStockName(val)}
        />
      </SafeAreaView>
      <SafeAreaView style={styles.header2}>
        <Text style={styles.headerLabel2}>Stock Button Name</Text>
      </SafeAreaView>
      <SafeAreaView style={styles.inputBox2}>
        <RNPickerSelect
          placeholder={{}}
          items={[
            {
              label: "Intraday Buy",
              value: "Intraday Buy",
            },
            {
              label: "Delivery Buy",
              value: "Delivery Buy",
            },
          ]}
          onValueChange={(value) => {
            setValue(value);
          }}
          InputAccessoryView={() => null}
          style={pickerSelectStyles}
          value={value}
        />
      </SafeAreaView>
      <SafeAreaView style={styles.header2}>
        <Text style={styles.headerLabel2}>Items</Text>
      </SafeAreaView>
      <SafeAreaView
        style={
          (styles.inputBox2,
          {
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            justifyContent: "space-between",
          })
        }
      >
        <Text style={styles.headerLabel2}>Target 1</Text>
        <TextInput
          style={styles.inputHeader3}
          maxLength={5}
          keyboardType="numeric"
          value={targetValue1?.toString()}
          onChangeText={(val) => setTargetValue1(val)}
        />
        <TouchableOpacity onPress={() => setTarget1("green")}>
          <Ionicons
            name="checkmark-circle-sharp"
            size={30}
            color={target1 === "green" ? "green" : "grey"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTarget1("red")}>
          <Entypo
            name="circle-with-cross"
            size={30}
            color={target1 === "red" ? "red" : "grey"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTarget1("grey")}>
          <AntDesign
            name="minuscircle"
            size={25}
            color={target1 === "grey" ? "grey" : "grey"}
          />
        </TouchableOpacity>
      </SafeAreaView>
      <SafeAreaView
        style={
          (styles.inputBox2,
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 10,
          })
        }
      >
        <Text style={styles.headerLabel2}>Target 2</Text>
        <TextInput
          style={styles.inputHeader3}
          maxLength={5}
          keyboardType="numeric"
          value={targetValue2?.toString()}
          onChangeText={(val) => setTargetValue2(val)}
        />
        <TouchableOpacity onPress={() => setTarget2("green")}>
          <Ionicons
            name="checkmark-circle-sharp"
            size={30}
            color={target2 === "green" ? "green" : "grey"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTarget2("red")}>
          <Entypo
            name="circle-with-cross"
            size={30}
            color={target2 === "red" ? "red" : "grey"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTarget2("grey")}>
          <AntDesign
            name="minuscircle"
            size={25}
            color={target2 === "grey" ? "grey" : "grey"}
          />
        </TouchableOpacity>
      </SafeAreaView>
      <SafeAreaView
        style={
          (styles.inputBox2,
          {
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            justifyContent: "space-between",
          })
        }
      >
        <Text style={styles.headerLabel2}>Target 3</Text>
        <TextInput
          style={styles.inputHeader3}
          maxLength={5}
          keyboardType="numeric"
          value={targetValue3?.toString()}
          onChangeText={(val) => setTargetValue3(val)}
        />
        <TouchableOpacity onPress={() => setTarget3("green")}>
          <Ionicons
            name="checkmark-circle-sharp"
            size={30}
            color={target3 === "green" ? "green" : "grey"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTarget3("red")}>
          <Entypo
            name="circle-with-cross"
            size={30}
            color={target3 === "red" ? "red" : "grey"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTarget3("grey")}>
          <AntDesign
            name="minuscircle"
            size={25}
            color={target3 === "grey" ? "grey" : "grey"}
          />
        </TouchableOpacity>
      </SafeAreaView>
      <SafeAreaView
        style={
          (styles.inputBox2,
          {
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            justifyContent: "space-between",
          })
        }
      >
        <Text style={styles.headerLabel2}>Stop Loss</Text>
        <TextInput
          style={styles.inputHeader3}
          maxLength={5}
          keyboardType="numeric"
          value={stopLossValue?.toString()}
          onChangeText={(val) => setStopLossValue(val)}
        />
        <TouchableOpacity onPress={() => setStopLoss("green")}>
          <Ionicons
            name="checkmark-circle-sharp"
            size={30}
            color={stopLoss === "green" ? "green" : "grey"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setStopLoss("red")}>
          <Entypo
            name="circle-with-cross"
            size={30}
            color={stopLoss === "red" ? "red" : "grey"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setStopLoss("grey")}>
          <AntDesign
            name="minuscircle"
            size={25}
            color={stopLoss === "grey" ? "grey" : "grey"}
          />
        </TouchableOpacity>
      </SafeAreaView>
      <SafeAreaView style={styles.submitButtonView}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => sendStockItem()}
        >
          <Text style={styles.submitButtonLabel}>Send</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default StockChange;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header2: {
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
  },
  headerLabel2: {
    fontSize: 15,
    fontWeight: "700",
    alignItems: "center",
    padding: 5,
  },
  inputBox2: {
    marginTop: 5,
    width: "100%",
    alignItems: "center",
  },
  inputLabel2: {
    fontSize: 18,
    marginBottom: 6,
  },
  inputHeader2: {
    width: "100%",
    height: 40,
    backgroundColor: "#dfe4ea",
    borderRadius: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
  },
  inputHeader3: {
    width: "30%",
    height: 40,
    backgroundColor: "#dfe4ea",
    borderRadius: 4,
    borderWidth: 1,
    textAlign: "center",
  },
  inputBody2: {
    width: "100%",
    height: 100,
    backgroundColor: "#dfe4ea",
    borderRadius: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
    paddingTop: 5,
    textAlignVertical: "top",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    alignContent: "flex-start",
  },
  submitButtonView: {
    justifyContent: "flex-end",
    alignSelf: "center",
    flex: 1,
    padding: 20,
    width: 200,
  },
  submitButton: {
    backgroundColor: "green",
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: "center",
  },
  submitButtonLabel: {
    fontSize: 15,
    fontWeight: "700",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
