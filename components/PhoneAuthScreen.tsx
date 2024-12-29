import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const PhoneAuthScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  
  return (
    <View style={styles.container}>
      <TextInput
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        style={styles.input}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Send Code</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PhoneAuthScreen;