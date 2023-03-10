
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './screens/Login';
import Graph from './screens/Graph';
import Home from './screens/Home';
import AddHive from './screens/AddHive';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name = "Login" component = {Login}/>
                <Stack.Screen name = "Home" component = {Home}/>
                <Stack.Screen name = "Dettagli" component={Graph}/>
                <Stack.Screen name = "Aggiungi Arnia" component={AddHive}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});