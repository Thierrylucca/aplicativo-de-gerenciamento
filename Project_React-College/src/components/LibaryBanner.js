import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function LibraryBanner({ title, subtitle, image, onPress }) {
  console.log(image);

  return (
    <View style={styles.libraryBanner}>
      <Text style={styles.libraryText}>{title}</Text>
      <Text style={styles.librarySubtitle}>{subtitle}</Text>
      <Image source={image} style={styles.libraryImage} />
      <TouchableOpacity style={styles.libraryButton} onPress={onPress}>
        <Text style={styles.libraryButtonText}>veja aqui ➔</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  libraryBanner: {
    backgroundColor: '#C62828',
    padding: 20,
    borderRadius: 40,
    marginVertical: 20,
    position: 'relative',
  },
  libraryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  librarySubtitle: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  libraryImage: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 250,
    height: 150,
    borderRadius: 40,
  },
  libraryButton: {
    marginTop: 60,
    padding: 8,
    width: 90,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  libraryButtonText: {
    color: '#000000',
    fontWeight: 'bold',
  },
});
