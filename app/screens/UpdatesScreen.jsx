import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

const UpdatesScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Updates</Text>
    </SafeAreaView>
  );
};

export default UpdatesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
