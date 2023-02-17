import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


const SecondaSchermata = ({navigation}) => {
    return(
        <View style = {styles.container}>
            <Button
                title = "Home"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    )
}

const Home = ({navigation}) => {
    return(
        <View style = {styles.container}>
            <Button
                title = "seconda schermata"
                onPress={() => navigation.navigate('SecondaSchermata')}
            />
        </View>
    )
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name = "Home" component = {Home}/>
                <Stack.Screen name = "SecondaSchermata" component = {SecondaSchermata}/>
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

/*import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const HomeScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        // Perform login authentication here, such as making an API call to a server
        // If successful, set isLoggedIn state to true
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        // Perform logout action here, such as clearing user session data or JWT token
        // Set isLoggedIn state to false
        setIsLoggedIn(false);
    };

    if (isLoggedIn) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Welcome to the app!</Text>
                <Button title="Logout" onPress={handleLogout} />
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Login to the app</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
                <Button title="Login" onPress={handleLogin} />
            </View>
        );
    }
};

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

export default HomeScreen;*/
