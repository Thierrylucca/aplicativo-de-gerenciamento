import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Calendar } from "react-native-calendars";
import NavigationBar from '../components/NavigationBar'
import AsyncStorage from '@react-native-async-storage/async-storage';

const CalendarScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(null);
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

  // Eventos marcados no calendário
  const events = {
    "2024-11-25": [{ title: "Aula Magna", description: "Evento especial" }],
    "2024-12-04": [{ title: "Curso Java", description: "Aula 1" }],
    "2024-12-06": [{ title: "Curso Java", description: "Aula 2" }],
    "2024-12-08": [{ title: "Curso java", description: "Aula 3" }],
    "2024-12-11": [{ title: "Curso Java", description: "Aula 4" }],
    "2024-12-13": [{ title: "Curso Java", description: "Aula 5" }],
    "2024-11-28": [{ title: "Reunião de Pais", description: "Auditório A" }],
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <Text style={styles.title}>Calendário</Text>

      {/* Calendário */}
      <Calendar
        current={new Date().toISOString().split("T")[0]} // Data atual
        onDayPress={handleDayPress}
        markedDates={{
          ...Object.keys(events).reduce((acc, date) => {
            acc[date] = { marked: true, dotColor: "#FF4757" };
            return acc;
          }, {}),
          [selectedDate]: {
            selected: true,
            marked: true,
            selectedColor: "#FF4757",
          },
        }}
        theme={{
          backgroundColor: "#000",
          calendarBackground: "#000",
          textSectionTitleColor: "#FFF",
          selectedDayBackgroundColor: "#FF4757",
          selectedDayTextColor: "#FFF",
          todayTextColor: "#FF4757",
          dayTextColor: "#FFF",
          textDisabledColor: "#555",
          arrowColor: "#FF4757",
          monthTextColor: "#FFF",
          indicatorColor: "#FF4757",
        }}
        monthFormat={"MMMM yyyy"} // Formato do mês
        firstDay={1} // Começar na segunda-feira
        enableSwipeMonths
      />

      {/* Lista de Eventos */}
      <View style={styles.eventList}>
        <Text style={styles.eventTitle}>
          {selectedDate
            ? `Eventos em ${new Date(selectedDate).toLocaleDateString("pt-BR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}`
            : "Selecione uma data para ver os eventos"}
        </Text>
        <FlatList
          data={events[selectedDate] || []}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.eventItem}>
              <Text style={styles.eventName}>{item.title}</Text>
              <Text style={styles.eventDescription}>{item.description}</Text>
            </View>
          )}
          ListEmptyComponent={
            selectedDate && (
              <Text style={styles.noEventText}>
                Nenhum evento registrado para esta data.
              </Text>
            )
          }
        />
      </View>

      {/* Barra de Navegação */}
      <NavigationBar
        onNavigate={(route) => navigation.navigate(route)} // Navega para a rota escolhida
        activeRoute="Calendario" // Define o botão ativo como Calendário
        userType={userType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 16,
    paddingBottom: 70, // Espaço para a barra de navegação
  },
  title: {
    fontSize: 24,
    color: "#FFF",
    textAlign: "center",
    marginBottom: 20,
  },
  eventList: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#222",
    borderRadius: 10,
  },
  eventTitle: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  eventItem: {
    marginBottom: 10,
  },
  eventName: {
    fontSize: 16,
    color: "#FF4757",
    fontWeight: "bold",
  },
  eventDescription: {
    fontSize: 14,
    color: "#FFF",
  },
  noEventText: {
    fontSize: 14,
    color: "#FFF",
    textAlign: "center",
    marginTop: 10,
  },
});

export default CalendarScreen;
