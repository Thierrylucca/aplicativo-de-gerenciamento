import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

export default function CourseItem({ name, title, prof }) {
  const [professorName, setProfessorName] = useState(''); // Estado inicial vazio

  if (prof === undefined) {
    setProfessorName(''); // Corrige para usar setProfessorName
  }

  useEffect(() => {
    const fetchProfessorName = async () => {
      try {
        const response = await axios.get(`http://192.168.15.17:3100/prof/${prof}`);

        if (response && response.data && response.data.prof) {
          console.log(response.data.prof.nome);
          setProfessorName('Prof: ' + response.data.prof.nome); // Atualiza o estado corretamente
        }

      } catch (error) {
        console.error('Erro ao buscar professor:', error);
        setProfessorName('Erro ao carregar professor'); // Define estado com mensagem de erro
      }
    };

    console.log(prof);

    if (prof) { // Certifique-se de que prof não é null antes de buscar
      if (prof !== 'Sem professor') {
        fetchProfessorName();
      }
      setProfessorName('Sem professor'); // Corrige para usar setProfessorName
    }
  }, [prof]); // Depende apenas de `prof`

  return (
    <View style={styles.courseItem}>
      <Text style={styles.courseTitle}>{title}</Text>
      <Text style={styles.courseInstructor}>{name}</Text>
      <Text style={styles.courseInstructorText}>{professorName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  courseItem: {
    backgroundColor: '#F4F7FA',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  courseInstructor: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  courseTitle: {
    color: '#E53935',
    fontSize: 16,
  },
  courseInstructorText: {
    color: '#000000',
    fontSize: 14
  },
});