import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storyData = [
  {
    id: "1",
    name: "My Story",
    image: require("../assets/Avatar.png"),
    hasPlus: true,
  },
  { id: "2", name: "Selena", image: require("../assets/Avatar.png") },
  { id: "3", name: "Clara", image: require("../assets/Avatar.png") },
  { id: "4", name: "Fabian", image: require("../assets/Avatar.png") },
  { id: "5", name: "George", image: require("../assets/Avatar.png") },
];

const posts = [
  {
    id: "1",
    category: "🌍 Travel",
    question: "If you could live anywhere in the world, where would you pick?",
    user: {
      name: "Miranda Kehlani",
      location: "STUTTGART",
      avatar: require("../assets/Avatar.png"),
    },
    image: require("../assets/travel-bg.png"),
  },
  // Add more posts as needed
];

export default function HomeScreen() {
  const router = useNavigation();
  const token = AsyncStorage.getItem("token");
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Velora</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {/* Stories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.storiesContainer}
        >
          {storyData.map((story) => (
            <View key={story.id} style={styles.storyItem}>
              <View style={styles.storyImageContainer}>
                <Image source={story.image} style={styles.storyImage} />
                {story.hasPlus && (
                  <View style={styles.plusIcon}>
                    <Text style={styles.plusText}>+</Text>
                  </View>
                )}
              </View>
              <Text style={styles.storyName}>{story.name}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Make Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Search Partners</Text>
          </TouchableOpacity>
        </View>

        {/* Posts */}
        {posts.map((post) => (
          <View key={post.id} style={styles.postCard}>
            <Image source={post.image} style={styles.postImage} />
            <View style={styles.postContent}>
              <Text style={styles.category}>{post.category}</Text>
              <Text style={styles.question}>{post.question}</Text>
              <View style={styles.userInfo}>
                <Image source={post.user.avatar} style={styles.userAvatar} />
                <View>
                  <Text style={styles.userName}>{post.user.name}</Text>
                  <Text style={styles.userLocation}>{post.user.location}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={32} color="#4B164C" />
          {/* <Text style={styles.navLabel}>Home</Text> */}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.navigate("Exolore")}
        >
          <Ionicons name="compass-outline" size={32} color="#666" />
          {/* <Text style={styles.navLabel}>Explore</Text> */}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navItem, styles.addButton]}
          onPress={() => router.navigate("Add")}
        >
          <Ionicons name="add-circle" size={56} color="#4B164C" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.navigate("Connect")}
        >
          <Ionicons name="people-circle" size={32} color="#666" />
          {/* <Text style={styles.navLabel}>Friends</Text> */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons
            name="chatbubbles-outline"
            size={32}
            color="#666"
            onPress={() => router.navigate("Chat")}
          />
          {/* <Text style={styles.navLabel}>Chat</Text> */}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6C1D75",
  },
  storiesContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  storyItem: {
    alignItems: "center",
    marginRight: 16,
  },
  storyImageContainer: {
    position: "relative",
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "#4B164C",
  },
  storyImage: {
    width: "100%",
    height: "100%",
    borderRadius: 33,
  },
  plusIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#4B164C",
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  plusText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  storyName: {
    marginTop: 5,
    fontSize: 12,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  actionButton: {
    backgroundColor: "#F8F8F8",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: "48%",
  },
  actionButtonText: {
    textAlign: "center",
    color: "#6C1D75",
    fontWeight: "500",
  },
  postCard: {
    marginHorizontal: 16,
    marginVertical: 10,
    backgroundColor: "#F8F8F8",
    borderRadius: 20,
    overflow: "hidden",
  },
  postImage: {
    width: "100%",
    height: 200,
  },
  postContent: {
    padding: 16,
  },
  category: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  question: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 14,
    fontWeight: "500",
  },
  userLocation: {
    fontSize: 12,
    color: "#666",
  },
  bottomNav: {
    width: "95%",
    margin: "auto",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    borderRadius: 50,
  },
  navItem: {
    alignItems: "center",
  },
  navLabel: {
    fontSize: 10,
  },
});
