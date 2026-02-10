import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from "react-native";

const imgTela = require('../assets/garoto_tela_incial.png')

// Obter a largura da tela para ajustar os botões
const { width } = Dimensions.get('window');

const EntryScreen = ({ navigation }) => {
  // Funções de navegação para o login de estudante e professor
  const handleStudentLogin = () => {
    console.log("Logando como estudante");
    navigation.navigate("LoginAluno");
  };

  const handleTeacherLogin = () => {
    console.log("Logando como professor");
    navigation.navigate("LoginProfessor");
  };

  return (
    <View style={styles.container}>
      {/* Imagem da tela inicial */}
      <Image source={imgTela} style={styles.image} />

      <Text style={styles.greetingText}>Olá</Text>
      <Text style={styles.descriptionText}>Fazer Login como:</Text>

      {/* Botão de login como Estudante */}
      <TouchableOpacity
        style={styles.studentButton}
        onPress={handleStudentLogin}
      >
        <Text style={styles.buttonText}>Estudante</Text>
      </TouchableOpacity>

      {/* Botão de login como Professor */}
      <TouchableOpacity
        style={styles.teacherButton}
        onPress={handleTeacherLogin}
      >
        <Text style={styles.buttonText}>Professor</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: width * 0.7, // Definir a largura da imagem com base na largura da tela
    height: width * 0.7, // Definir a altura proporcional
    resizeMode: 'contain', // Garantir que a imagem seja ajustada corretamente
    marginBottom: 40,
  },
  greetingText: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 18,
    color: "#aaa",
    marginBottom: 24,
  },
  studentButton: {
    width: "80%",
    height: 50,
    backgroundColor: "#FF4757",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 16,
  },
  teacherButton: {
    width: "80%",
    height: 50,
    backgroundColor: "#1E90FF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default EntryScreen;
