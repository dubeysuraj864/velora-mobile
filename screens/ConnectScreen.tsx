import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const InfoItem = ({ label, value }) => (
  <View style={styles.infoItem}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.valueContainer}>
      <Text style={styles.value}>{value}</Text>
      <Feather name="edit-2" size={16} color="#666" />
    </View>
  </View>
);

const ConnectScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <Image
            style={styles.avatar}
            source={require('../assets/Avatar.png')}
          />
          <View>
            <Text style={styles.name}>Alice Eve</Text>
            <Text style={styles.email}>alice.eve@gmail.com</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Feather name="x" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>My account</Text>

        <View style={styles.infoSection}>
          <InfoItem label="Name:" value="Alice Eve" />
          <InfoItem label="Email:" value="alice.eve@gmail.com" />
          <InfoItem label="Phone:" value="+1 561-230-0033" />
          <InfoItem label="Address:" value="2074, Half and Half Drive\nHialeah, Florida - 33012\nPh: +1 561-230-0033" />
        </View>


        <TouchableOpacity
          style={styles.settingsButton}
          onPress={async () => {
            await AsyncStorage.setItem("token", "");
            navigation.navigate('Login');
          }}
        >
          <Feather name="log-out" size={20} color="#000" />
          <Text style={styles.settingsText}>Logout</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default ConnectScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFC', // Light neutral background
  },

  // 🧑‍💼 Header Section
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: '#4B164C', // Elegant primary color
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4, // Shadow for Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },
  email: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },

  name: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 600,
    opacity: 0.9,
  },

  // 📚 Content Section
  content: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    color: '#333',
  },
  infoSection: {
    gap: 16,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  // 📄 Info Item
  infoItem: {
    gap: 8,
  },
  label: {
    fontSize: 12,
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  value: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    flex: 1,
  },

  // ⚙️ Settings Button
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 24,
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: '#fff', // Primary button color
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#4B164C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  settingsText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },

  // 🔄 Separator Line
  separator: {
    height: 1,
    backgroundColor: '#fff',
    marginVertical: 16,
  },
});

