import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert, ToastAndroid } from "react-native";
import axios from 'axios';

const FormComponent = ({ isSignUp, onToggleSignUp, userType, onSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const enviarCadastro = async () => {
    const novoCadastro = { nome: username, senha: password };
    try {
      if (userType === "aluno") {
        const resposta = await axios.post('http://192.168.15.17:3100/aluno', novoCadastro);
        if (resposta.status === 201) {
          setUsername('');
          setPassword('');
          setConfirmPassword('');
          ToastAndroid.show('Cadastro Realizado com Sucesso!', ToastAndroid.SHORT)
        } else {
          Alert.alert('Erro', 'Falha ao adicionar cadastro!');
        }
      } else {
        const resposta = await axios.post('http://192.168.15.17:3100/prof', novoCadastro);
        if (resposta.status === 201) {
          setUsername('');
          setPassword('');
          setConfirmPassword('');
          ToastAndroid.show('Cadastro Realizado com Sucesso!', ToastAndroid.SHORT)

        } else {
          Alert.alert('Erro', 'Falha ao adicionar cadastro!');
        }
      }
    } catch (error) {
      console.error(error);

      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  };

  const enviarLogin = async () => {
    const loginData = userType === "aluno" ?
      { ra: username, senha: password } :
      { matricula: username, senha: password };


    try {
      const resposta = await axios.post(
        userType === "aluno" ? 'http://192.168.15.17:3100/aluno/login' : 'http://192.168.15.17:3100/prof/login',
        loginData
      );

      if (resposta.data) {
        setUsername('');
        setPassword('');
        setConfirmPassword('');


        // Passando a resposta do login para a tela seguinte via onSubmit
        onSubmit(resposta.data);
      } else {

        Alert.alert('Erro', resposta.data.msg || 'Falha ao tentar login!');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  };

  return (
    <View>
      <Text style={styles.title}>{isSignUp ? "Cadastro" : "Login"}</Text>
      {isSignUp ? (
        <TextInput
          placeholder="Nome"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
      ) : (
        <TextInput
          placeholder={userType === "aluno" ? "R.A" : "Matrícula"}
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
      )}

      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {isSignUp && (
        <TextInput
          placeholder="Confirm Password"
          style={styles.input}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={isSignUp ? enviarCadastro : enviarLogin}>
        <Text style={styles.buttonText}>{isSignUp ? "Cadastro" : "Login"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onToggleSignUp}>
        <Text style={styles.toggleText}>
          {isSignUp ? "Já tem conta? Faça seu Login" : "Não tem conta? Faça seu cadastro"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 24, color: "#fff", textAlign: "center", marginBottom: 20 },
  input: { backgroundColor: "#333", color: "#fff", padding: 10, marginBottom: 15 },
  button: { backgroundColor: "#FF4757", padding: 15, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 18 },
  toggleText: { color: "#aaa", textAlign: "center", marginTop: 10 },
});

export default FormComponent;