import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";

export default function SplashScreen() {
  const router = useNavigation();
  const token = AsyncStorage.getItem("token");
  console.log(token,"token")
  useEffect(() => {
    setTimeout(() => {
      if (token) {
        // alert(token)
        router.navigate("Login");
      } else {
        // alert(token+"df")
        router.navigate("Home");
      }
    }, 200);
  }, [router]);
  return (
    <View style={styles.container}>
      <Image
        source={require("./assets/splash/group.png")} // Replace with your logo path
        style={styles.logo}
        resizeMode="contain"
      />

      {/* App Name or Tagline */}
      <Text style={styles.title}>Velora</Text>
      <Text style={styles.subtitle}>Dating app for working professionals</Text>

      {/* Loading Indicator */}
      {/* <ActivityIndicator size="large" color="#000" style={styles.loader} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 330,
    height: 330,
    marginHorizontal: "auto",
    marginBottom: 20,
    // backgroundColor:'#000',
    paddingLeft: 30,
  },
  title: {
    fontSize: 88,
    fontWeight: "bold",
    color: "#22172A",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#22172A",
    marginBottom: 30,
  },
  loader: {
    marginTop: 20,
  },
});
