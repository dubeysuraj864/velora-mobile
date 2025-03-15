import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Signup } from "../hooks/useSignup";
import { Login } from "../hooks/useLogin";
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function LoginScreen() {
  const router = useNavigation();
  const [loader, setLoader] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = async () => {
    setLoader(true);
    router.navigate("Home");
    try {
      if (activeTab === "login") {
        const payload = { email, password };
        const res = await Login(payload);
  
        if (res?.data?.success) {
          setErrMessage(res?.data?.message || "Login successful");
          await AsyncStorage.setItem("token", res?.data?.token);
          router.navigate("Home");
          setName("")
          setEmail("")
          setPassword("")
          setErrMessage("")
          setModalVisible(false);
        } else {
          setErrMessage(res?.data?.message || "Login failed. Please try again.");
        }
      } else {
        const payload = { name, email, password };
        const res = await Signup(payload);
  
        if (res?.data?.success) {
          setErrMessage(res?.data?.message || "Signup successful");
          router.navigate("Home");
          setModalVisible(false);
          setName("")
          setEmail("")
          setErrMessage("")
          setPassword("")
        } else {
          setErrMessage(res?.data?.message || "Signup failed. Please try again.");
        }
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setErrMessage(error.response.data.message); // API error message
      } else {
        setErrMessage(error.message || "Something went wrong. Please try again.");
      }
      console.error("Error:", error);
    } finally {
      setLoader(false); // Ensure loader stops regardless of outcome
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <Image
          source={require("../assets/splash/group.png")}
          style={styles.centerUser}
        />
      </View>

      <Text style={styles.heading}>
        Let's meeting new{"\n"}people around you
      </Text>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>

            {activeTab === "login" ? (
              <View style={styles.formContainer}>
                <Text style={styles.modalTitle}>Login</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  keyboardType="email-address"
                  placeholderTextColor={"#ccc"}
                  value={email}
                  onChangeText={setEmail}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor={"#ccc"}
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
                 <Text style={styles.errText}>{errMessage}</Text>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}
                >
                  {loader ? (
                    <ActivityIndicator />
                  ) : (
                    <Text style={styles.submitButtonText}>Login</Text>
                  )}
                </TouchableOpacity>

               
              </View>
            ) : (
              <View style={styles.formContainer}>
                <Text style={styles.modalTitle}>Sign Up</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  value={name}
                  placeholderTextColor={"#ccc"}
                  onChangeText={setName}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  keyboardType="email-address"
                  placeholderTextColor={"#ccc"}
                  value={email}
                  onChangeText={setEmail}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry
                  placeholderTextColor={"#ccc"}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}
                >
                  {loader ? (
                    <ActivityIndicator />
                  ) : (
                    <Text style={styles.submitButtonText}>Sign Up</Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.phoneButton}
        onPress={() => {
          setActiveTab("login");
          setModalVisible(true);
        }}
      >
        <View style={styles.buttonContent}>
          <Image
            source={require("../assets/splash/phone.png")}
            style={styles.buttonIcon}
          />
          <Text style={styles.phoneButtonText}>Login with Email</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleButton}>
        <View style={styles.buttonContent}>
          <Image
            source={require("../assets/splash/google.png")}
            style={styles.buttonIcon}
          />
          <Text style={styles.googleButtonText}>Login with Google</Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Don't have an account?{" "}
        <Text
          style={styles.signUpText}
          onPress={() => {
            setActiveTab("signup");
            setModalVisible(true);
          }}
        >
          Sign Up
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  circleContainer: {
    borderRadius: 160,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    position: "relative",
    marginLeft: 18,
  },
  centerUser: {
    width: 300,
    height: 300,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#fff",
    objectFit: "contain",
  },
  user: {
    width: 50,
    height: 50,
    borderRadius: 25,
    position: "absolute",
  },
  locationIcon: {
    position: "absolute",
    top: "15%",
    right: "10%",
    width: 24,
    height: 24,
  },
  chatIcon: {
    position: "absolute",
    bottom: "25%",
    left: "10%",
    width: 24,
    height: 24,
  },
  heading: {
    fontSize: 34,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 32,
    color: "#22172A",
  },
  phoneButton: {
    backgroundColor: "#6C1D75",
    borderRadius: 50,
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: "85%",
    marginBottom: 16,
    elevation: 2,
  },
  googleButton: {
    backgroundColor: "#f5f5f5",
    borderRadius: 50,
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: "85%",
    marginBottom: 16,
    elevation: 2,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
    gap: 30,
  },
  buttonIcon: {
    width: 44,
    height: 44,
    marginRight: 12,
  },
  phoneButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  googleButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
  footerText: {
    fontSize: 16,
    color: "#666",
  },
  signUpText: {
    color: "#6C1D75",
    fontWeight: "600",
  },
  loginContainer: {
    flexDirection: "row",
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: "#f0f0f0",
    padding: 5,
    width: "90%",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabText: {
    fontSize: 16,
    color: "#666",
  },
  activeTabText: {
    color: "#6C1D75",
    fontWeight: "600",
  },
  submitButton: {
    backgroundColor: "#6C1D75",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    width: "90%",
    maxWidth: 400,
  },
  formContainer: {
    width: "100%",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
    color: "#22172A",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  closeButton: {
    position: "absolute",
    right: 10,
    top: 10,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 24,
    color: "#666",
  },
  errText:{
    color: '#ff0000',
    fontSize: 10
  }
});
