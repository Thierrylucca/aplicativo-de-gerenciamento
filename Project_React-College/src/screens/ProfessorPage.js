import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import Header from '../components/Header';
import LibraryBanner from '../components/LibaryBanner';
import CourseItem from '../components/CourseItem';
import NavigationBar from '../components/NavigationBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function ProfessorPage({ navigation }) {
  const [name, setName] = useState(''); // Estado para armazenar o nome
  const [matricula, setmatricula] = useState(''); // Estado para armazenar o RA
  const [userType, setUsertype] = useState('');
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
    // Função para buscar os dados da API
    const fetchCourses = async () => {
      try {
        const storage = await getData();

        if (storage) {
          // Atualiza os estados com os dados do AsyncStorage
          setName(storage.nome || '');
          setmatricula(storage.matricula || '');
          setUsertype(storage.userType || '');
        }
        const response = await axios.get('http://192.168.15.17:3100/materia');

        if (response.data && response.data.materias) {
          const extractedCourses = [];
          response.data.materias.forEach((materia) => {
            extractedCourses.push({
              descricao: materia.descricao || "Sem Descrição",
              materia: materia.materia || "Curso Sem Título",
            });
          });

          setCourses(extractedCourses); // Atualizando o estado com os dados extraídos
        } else {
          console.error('Estrutura de dados inesperada:', response.data);
        }
      } catch (error) {
        console.error('Erro ao buscar cursos:', error);
      }
    };

    fetchCourses();
  }, []); // Executa apenas uma vez, ao montar o componente

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header
          greeting="BEM-VINDO DE VOLTA,"
          username={name}
          ra={matricula}
          profile={userType}
        />

        <LibraryBanner
          title="Livros e Materiais disponíveis"
          subtitle="para seus alunos!"
          onPress={() => console.log("Ver livros clicando")}
        />

        <View style={styles.courseSection}>
          {courses.length > 0 ? (
            courses.map((course, index) => (
              <CourseItem
                key={index} // Use o índice como chave (ou o campo `_id`, se for único)
                name={course.descricao} // Propriedade "descricao" do curso
                title={course.materia} // Propriedade "materia" do curso
                prof={null}
              />
            ))
          ) : (
            <Text style={styles.noCoursesText}>Nenhum curso encontrado.</Text>
          )}
        </View>
      </ScrollView>

      <NavigationBar onNavigate={(screen) => navigation.navigate(screen)} activeRoute="Home" userType={userType} />
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
