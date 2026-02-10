import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import Header from '../components/Header';
import LibraryBanner from '../components/LibaryBanner';
import CourseItem from '../components/CourseItem';
import NavigationBar from '../components/NavigationBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

export default function AlunoPage({ navigation }) {
  const [name, setName] = useState(''); // Estado para armazenar o nome
  const [ra, setRa] = useState(''); // Estado para armazenar o RA
  const [courses, setCourses] = useState([]); // Estado para armazenar os cursos

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@College:login');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    // Função para buscar dados do AsyncStorage e da API
    const fetchData = async () => {
      try {
        const storage = await getData();

        if (storage) {
          // Atualiza os estados com os dados do AsyncStorage
          setName(storage.nome || '');
          setRa(storage.ra || '');
        }

        // Faz a requisição à API para buscar os cursos
        const response = await axios.get('http://192.168.15.17:3100/materia');

        if (response.data && response.data.materias) {
          const extractedCourses = response.data.materias.map((materia) => ({
            profID: materia.profID || 'Sem professor',
            descricao: materia.descricao || 'Sem Descrição',
            materia: materia.materia || 'Curso Sem Título',
          }));

          setCourses(extractedCourses); // Atualiza o estado com os cursos
        } else {
          console.error('Estrutura de dados inesperada:', response.data);
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []); // Executa apenas uma vez ao montar o componente

  const handleNavigate = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header
          greeting="QUE BOM QUE VOLTOU,"
          username={name} // Exibe o nome do aluno
          ra={ra} // Exibe o RA do aluno
          profile="aluno"
        />

        <LibraryBanner
          title="Livros disponíveis"
          subtitle="na Biblioteca!"
          onPress={() => console.log('Ver livros clicado')}
        />

        <View style={styles.courseSection}>
          {courses.length > 0 ? (
            courses.map((course, index) => (
              <CourseItem
                key={index} // Use o índice como chave (ou outro identificador único, como `_id`)
                name={course.descricao} // Nome do professor
                title={course.materia} // Nome do curso
                prof={course.profID}
              />
            ))
          ) : (
            <Text style={styles.noCoursesText}>Nenhum curso encontrado.</Text>
          )}
        </View>
      </ScrollView>

      <NavigationBar onNavigate={handleNavigate} activeRoute="Home" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 70,
  },
  courseSection: {
    marginVertical: 20,
  },
  noCoursesText: {
    color: '#fff',
    textAlign: 'center',
    marginVertical: 20,
  },
});
