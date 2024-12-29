import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AddScreen = ({ navigation }) => {
  const [readReceipts, setReadReceipts] = useState(false);
  const pulseAnim = new Animated.Value(1);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 2000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <View style={styles.backButtonCircle}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </View>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>
          You connected with <Text style={styles.highlight}>Clara</Text>
        </Text>
        <Text style={styles.subtitle}>11 mins ago</Text>

        <View style={styles.avatarContainer}>
          <Image
            source={require('../assets/Avatar.png')}
            style={styles.avatar}
          />
          <Animated.View
            style={[
              styles.pulseCircle,
              {
                transform: [{ scale: pulseAnim }],
              },
            ]}
          />
          <View style={styles.pulseCircleOuter} />
        </View>

        <Text style={styles.infoText}>
          Know when <Text style={styles.highlight}>Clara</Text> has read your message
        </Text>

        <TouchableOpacity
          style={styles.readReceiptsButton}
          onPress={() => setReadReceipts(!readReceipts)}
        >
          <Ionicons
            name={readReceipts ? "checkmark-circle" : "checkmark-circle-outline"}
            size={20}
            color="#fff"
          />
          <Text style={styles.buttonText}>Get Read Receipts</Text>
        </TouchableOpacity>

        <View style={styles.actionBar}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="attach" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.actionButtonMain]}>
            <Ionicons name="mic" size={32} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="keypad" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D1B3D',
  },
  backButton: {
    padding: 16,
  },
  backButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  highlight: {
    color: '#E174FF',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 40,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#E174FF',
  },
  pulseCircle: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 1,
    borderColor: '#E174FF',
    opacity: 0.5,
  },
  pulseCircleOuter: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: '#E174FF',
    opacity: 0.2,
  },
  infoText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  readReceiptsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E174FF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 40,
  },
  buttonText: {
    marginLeft: 8,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 30,
    padding: 8,
    width: '100%',
    position: 'absolute',
    bottom: 40,
  },
  actionButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonMain: {
    backgroundColor: '#E174FF',
    borderRadius: 22,
    width: 56,
    height: 56,
    marginHorizontal: 20,
  },
});

export default AddScreen;