import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Image } from 'react-native'; // Adicionei o TextInput aqui
import NavigationBar from '../components/NavigationBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LibraryPage = ({ navigation }) => {

  const [userType, setUsertype] = useState('');

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@College:login');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const getyuserType = async () => {

      try {
        const storage = await getData();

        if (storage) {
          setUsertype(storage.userType || '');
        }

      } catch (error) {
        console.error('Erro ao buscar cursos:', error);
      }

    }

    getyuserType();
  }, []);

  const handleNavigation = (route) => {
    navigation.navigate(route);
  };

  return (
    <View style={styles.container}>

      <Text style={styles.header}>BIBLIOTECA ONLINE</Text>

      {/* Campo de pesquisa */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="O que procura?"
          placeholderTextColor="#ccc"
        />
      </View>

      <ScrollView style={styles.booksContainer}>
        <View style={styles.bookCategory}>
          <Text style={styles.categoryTitle}>MATERIALIZAÇÃO</Text>
          <View style={styles.bookList}>

            <View style={styles.bookItem}>
              <Image
                source={require('../assets/book1.png')}
                style={styles.bookImage}
              />
              <Text style={styles.bookTitle}>Análise e Projeto de Sistemas</Text>
              <Text style={styles.bookAuthor}>William Pereira Alves</Text>
            </View>
            <View style={styles.bookItem}>
              <Image
                source={require('../assets/book2.png')}
                style={styles.bookImage}
              />
              <Text style={styles.bookTitle}>Desenvolvimento de Software</Text>
              <Text style={styles.bookAuthor}>Instituto Federal</Text>
            </View>
          </View>
        </View>

        <View style={styles.bookCategory}>
          <Text style={styles.categoryTitle}>TECNOLOGIA</Text>
          <View style={styles.bookList}>
            <View style={styles.bookItem}>
              <Image
                source={require('../assets/book3.png')}
                style={styles.bookImage}
              />
              <Text style={styles.bookTitle}>Código Limpo</Text>
              <Text style={styles.bookAuthor}>Robert C. Martin</Text>
            </View>
            <View style={styles.bookItem}>
              <Image
                source={require('../assets/book4.png')}
                style={styles.bookImage}
              />
              <Text style={styles.bookTitle}>Java - Como Programar</Text>
              <Text style={styles.bookAuthor}>Deitel & Deitel</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <NavigationBar
        onNavigate={handleNavigation}
        activeRoute="Library"
        userType={userType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
  },
  booksContainer: {
    flex: 1,
  },
  bookCategory: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 20,
    marginBottom: 10,
  },
  bookList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  bookItem: {
    width: '45%',
    marginBottom: 20,
    alignItems: 'center',
  },
  bookImage: {
    width: 120,
    height: 160,
    borderRadius: 8,
  },
  bookTitle: {
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
  },
  bookAuthor: {
    color: '#ccc',
    textAlign: 'center',
  },
});

export default LibraryPage;
