import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; 

export default function App() {
  const router = useRouter(); 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catatan Harian</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/notes')} 
      >
        <Text style={styles.buttonText}>Lihat Semua Catatan</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BBA4E1',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000',
  },
  button: {
    backgroundColor: '#3B28FF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
