import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

function Login({navigation}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        navigation.navigate('Home');
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        navigation.navigate('Login');
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

export default Login;