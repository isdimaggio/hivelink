import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import axios from 'axios';
import { Singleton } from '../utils/Singleton';

function Login({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let s = new Singleton();

    const instance = axios.create({
        baseURL: 'https://xpe.mrbackslash.it/hivelink/api',
      });

    const handleLogin = () => {

        instance.post('/rest_login.php',
            {
                email: email,
                password: password,
            }
        )
        .then((response) => {
            navigation.navigate('Home');
            const data = response.data;
            s.setToken(data.payload);
        })
        .catch(() => {
            Alert.alert("Errore","credenziali errate!");
          });
    };

    const handleLogout = () => {
        navigation.navigate('Login');
        setIsLoggedIn(false);
    };
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Login to the app</Text>
                <TextInput
                    style={styles.input}
                    placeholder="email"
                    value={email}
                    onChangeText={setEmail}
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