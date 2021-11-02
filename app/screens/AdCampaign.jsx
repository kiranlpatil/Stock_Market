import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  View,
  Image,
  Animated,
} from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import { AntDesign } from "@expo/vector-icons";

const slides = [
  {
    id: "1",
    title: "Welcome to Trader's Tunnel",
    description: "Earn and Profit",
    imageUrl: require("../../assets/stock1.png"),
  },
  {
    id: "2",
    title: "High Profits and Less efforts",
    description: "More you Earn, more will be our satisfaction",
    imageUrl: require("../../assets/stock5.jpg"),
  },
  {
    id: "3",
    title: "Better and Accurate Results",
    description: "Strong AI giving more precision",
    imageUrl: require("../../assets/stock3.png"),
  },
  {
    id: "4",
    title: "Continuous Profits ",
    description: "Give less time and earn more with us",
    imageUrl: require("../../assets/stock4.png"),
  },
];

const NextButton = ({ percentage, scrollTo, lastPage, props }) => {
  const size = 128;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef(null);

  const animation = (toValue) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  useEffect(() => {
    progressAnimation.addListener(
      (value) => {
        const strokeDashoffset =
          circumference - (circumference * value.value) / 100;

        if (progressRef?.current) {
          progressRef.current.setNativeProps({
            strokeDashoffset,
          });
        }
      },
      [percentage]
    );

    return () => {
      progressAnimation.removeAllListeners();
    };
  }, [percentage]);

  const onSubmit = () => {
    if (lastPage) {
      // console.log(props.navigate);
      props.navigation.navigate("Login");
    }
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={center}>
          <Circle
            stroke={"#E6E7E8"}
            cx={center}
            cy={center}
            r={center - 1}
            strokeWidth={strokeWidth}
          />
          <Circle
            ref={progressRef}
            stroke={"#F4338F"}
            cx={center}
            cy={center}
            r={center - 1}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
          />
        </G>
      </Svg>
      {lastPage ? (
        <TouchableOpacity
          onPress={() => onSubmit()}
          style={styles.button}
          activeOpacity={0.6}
        >
          <AntDesign name="checkcircle" size={32} color="#fff" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={scrollTo}
          style={styles.button}
          activeOpacity={0.6}
        >
          <AntDesign name="arrowright" size={32} color="#fff" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const Paginator = ({ data, scrollX }) => {
  const { width } = useWindowDimensions();

  return (
    <SafeAreaView style={{ flexDirection: "row", height: 64 }}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            style={[styles.dot, { width: dotWidth, opacity }]}
            key={i.toString()}
          />
        );
      })}
    </SafeAreaView>
  );
};

const AdContent = ({ item }) => {
  const { width } = useWindowDimensions();
  return (
    <SafeAreaView style={[styles.container, { width }]}>
      <Image
        source={item.imageUrl}
        style={[styles.image, { width, resizeMode: "contain" }]}
      />
      <View style={{ flex: 0.2 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </SafeAreaView>
  );
};

const AdCampaign = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewconfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    }
    // } else {
    //   props.navigation.navigate("Login");
    // }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={slides}
          renderItem={({ item }) => <AdContent item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          keyExtractor={(item) => item.id}
          scrollEventThrottle={32}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewconfig}
          ref={slidesRef}
        />
      </View>

      <Paginator data={slides} scrollX={scrollX} />
      <NextButton
        props={props}
        scrollTo={scrollTo}
        lastPage={currentIndex < slides.length - 1 ? false : true}
        percentage={(currentIndex + 1) * (100 / slides.length)}
      />
    </SafeAreaView>
  );
};

export default AdCampaign;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 0.7,
    justifyContent: "center",
  },
  title: {
    fontWeight: "800",
    fontSize: 28,
    marginBottom: 10,
    color: "#493d8a",
    textAlign: "center",
  },
  description: {
    fontWeight: "300",
    paddingHorizontal: 64,
    color: "#62656b",
    textAlign: "center",
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#493d8a",
    marginHorizontal: 8,
  },
  button: {
    position: "absolute",
    backgroundColor: "#f4338f",
    borderRadius: 100,
    padding: 20,
  },
});
