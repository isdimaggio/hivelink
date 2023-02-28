import { StyleSheet, View } from 'react-native';
import { VictoryLine, VictoryChart, VictoryTheme } from "victory-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

  const Tab = createBottomTabNavigator();

function Graph () {

    return(
      <Tab.Navigator>
        <Tab.Screen name="Temperatura" component={Temperature} />
        <Tab.Screen name="Umidità" component={Umidity} />
        <Tab.Screen name="Peso" component={Weight} />
      </Tab.Navigator>
    );
}

const Weight = () => {
  let data = [];
  for(let i = 0; i < 10; i++){
    data.push({ora: i, temperatura: i + 2});
  }

    return(
        <View style={styles.container}>
        <VictoryChart width={350} theme={VictoryTheme.material}>
          <VictoryLine data={data} x="ora" y="temperatura" />
        </VictoryChart>
      </View>
    );
}

const Umidity = () => {
  let data = [];
  for(let i = 0; i < 10; i++){
    data.push({ora: i, temperatura: i});
  }

    return(
        <View style={styles.container}>
        <VictoryChart width={350} theme={VictoryTheme.material}>
          <VictoryLine data={data} x="ora" y="temperatura" />
        </VictoryChart>
      </View>
    );
}

const Temperature = () => {

  let data = [];
  for(let i = 0; i < 10; i++){
    data.push({ora: i, temperatura: i*i});
  }

    return(
        <View style={styles.container}>
        <VictoryChart width={350} theme={VictoryTheme.material}>
          <VictoryLine data={data} x="ora" y="temperatura" />
        </VictoryChart>
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