import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import FormComponent from '../components/FormComponent';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginAluno = ({ navigation }) => {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleToggleSignUp = () => setIsSignUp(!isSignUp);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);

      await AsyncStorage.setItem('@College:login', jsonValue);
    } catch (error) {
      console.error(error);
    }
  };


  const handleSubmit = async (loginData) => {

    const nome = loginData.data.aluno.nome;

    const ra = loginData.data.aluno.ra;


    const data = {
      nome,
      ra
    };

    await storeData(data);

    navigation.navigate("AlunoPage");
  };

  const handleGoBack = () => {
    navigation.goBack(); // Voltar para a tela anterior
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Icon name="arrow-back" size={30} color="#fff" />
      </TouchableOpacity>

      <FormComponent
        isSignUp={isSignUp}
        onToggleSignUp={handleToggleSignUp}
        userType="aluno"
        onSubmit={handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
    justifyContent: "center"
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
    backgroundColor: '#FF4757',
    borderRadius: 5,
  }
});

export default LoginAluno;
