import { StyleSheet, View, Text } from 'react-native';
import { VictoryLine, VictoryChart } from "victory-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {useEffect, useState} from 'react';

  const Tab = createBottomTabNavigator();

function Graph () {

    return(
      <Tab.Navigator
      screenOptions={() => ({
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: 'tomato',
      })}
      >
        <Tab.Screen name="Temperatura" component={Temperature} />
        <Tab.Screen name="Umidità" component={Umidity} />
        <Tab.Screen name="Peso" component={Weight} />
      </Tab.Navigator>
    );
}

const Weight = () => {
  let data = [];
  for(let i = 0; i < 10; i++){
    data.push({date: i, weight: i + 2});
  }

  const [update, setUpdate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdate(data[data.length - 1]);
    }, 1000); // aggiorna il tempo ogni secondo

    return () => clearInterval(interval);
  }, [update]);

    return(
        <View style={styles.container}>
        <VictoryChart width={350}>
          <VictoryLine data={data} x="date" y="weight" />
        </VictoryChart>
        <Text>Ultimo aggiornamento: {update.date}</Text>
        <Text>Peso: {update.weight}</Text>
      </View>
    );
}

const Umidity = () => {
  let data = [];
  for(let i = 0; i < 10; i++){
    data.push({date: i, umidity: i});
  }

  const [update, setUpdate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdate(data[data.length - 1]);
    }, 1000); // aggiorna il tempo ogni secondo

    return () => clearInterval(interval);
  }, [update]);

    return(
        <View style={styles.container}>
        <VictoryChart width={350}>
          <VictoryLine data={data} x="date" y="umidity" />
        </VictoryChart>
        <Text>ultimo aggiornamento: {update.date} </Text>
        <Text>Umidità: {update.umidity}</Text>
      </View>
    );
}

const Temperature = () => {

  let data = [];
  for(let i = 0; i < 10; i++){
    data.push({date: i, temperature: i*i});
  }

  const [update, setUpdate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdate(data[data.length - 1]);
    }, 1000); // aggiorna il tempo ogni secondo

    return () => clearInterval(interval);
  }, [update]);

    return(
        <View style={styles.container}>
        <VictoryChart width={350}>
          <VictoryLine data={data} x="date" y="temperature" />
        </VictoryChart>
        <Text>ultimo aggiornamento avvenuto: {update.date}</Text>
        <Text>temperatura: {update.temperature}</Text>
      </View>
    );
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Graph;