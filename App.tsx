import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

type RootStackPeramList = {
  Home: undefined; //Homescreen has no parameters
  Game: {
    player1: string;
    player2: string;
  }; //game screen expects two strings
};

const Stack = createNativeStackNavigator<RootStackPeramList>();

function HomeScreen({ navigation }: { navigation: any }) {
  const [player1, setPlayer1] = useState<String>('');
  const [player2, setPlayer2] = useState<String>('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Player Name</Text>

      <TextInput
        style={styles.input}
        placeholder="Player1"
        placeholderTextColor="#aaa"
        value={player1 as string}
        onChangeText={setPlayer1}
      />

      <TextInput
        style={styles.input}
        placeholder="Player2"
        placeholderTextColor="#aaa"
        value={player2 as string}
        onChangeText={setPlayer2}
      />

      <TouchableOpacity
        style={styles.buttonWrapper}
        onPress={() => navigation.navigate('Game', { player1, player2 })}
      >
        <Text style={styles.buttonText}>Start Game</Text>
      </TouchableOpacity>
    </View>
  );
}

function renderCell(index: number) {
  return (
    <TouchableOpacity key={index} style={styles.cell}>
      <Text style={index % 2 === 0 ? styles.cellTextBlue : styles.cellTextRed}>
        {index % 2 === 0 ? 'X' : 'O'}
      </Text>
    </TouchableOpacity>
  );
}

function GameSCreen({ route }: { route: any }) {
  const { player1, player2 } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.vsText}>
        <Text style={styles.player1}>{player1}</Text> vs{' '}
        <Text style={styles.player2}>{player2}</Text>
      </Text>

      <View style={styles.grid}>
        {Array.from({ length: 9 }).map((_, i) => renderCell(i))}
      </View>
    </View>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#000' }, headerTintColor: '#fff' }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Game" component={GameSCreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000', // black background
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#fff', // white text
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#fff',
    color: '#fff',
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
  },
  buttonWrapper: {
    marginTop: 15,
    width: '60%',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  vsText: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 20,
  },
  grid: {
    width: 300,
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 30,
  },
  cell: {
    width: '32%',
    height: '32%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
  cellTextBlue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'blue',
  },
  cellTextRed: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'red',
  },
  player1: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 18,
  },
  player2: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default App;
