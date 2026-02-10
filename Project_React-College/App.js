import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import EntryScreen from "./src/screens/EntryScreen";
import LoginAluno from "./src/screens/LoginAluno";
import LoginProfessor from "./src/screens/LoginProfessor";
import AlunoPage from "./src/screens/AlunoPage";
import ProfessorPage from "./src/screens/ProfessorPage";
import CalendarioScreen from "./src/screens/CalendarioScreen";
import LibraryPage from "./src/screens/LibraryPage";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Entry">
        <Stack.Screen
          name="Entry"
          component={EntryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginAluno"
          component={LoginAluno}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginProfessor"
          component={LoginProfessor}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AlunoPage"
          component={AlunoPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfessorPage"
          component={ProfessorPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Calendario"
          component={CalendarioScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Library"
          component={LibraryPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
