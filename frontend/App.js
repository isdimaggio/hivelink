import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Button from '@ant-design/react-native/lib/button';
import InputItem from '@ant-design/react-native/lib/input-item';
import { useState } from 'react';

export default function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    return (
        <View style={styles.container}>
            <Text>Hivelink</Text>
            <StatusBar style="auto" />
            <Button>Vafangul</Button>
            <InputItem
                clear
                value={username}
                onChange={(value: string) => {
                    setUsername(value);
                }}
                placeholder="inzacca l'username"
            />
            <InputItem
                clear
                type="password"
                value={password}
                onChange={(value: string) => {
                    setPassword(value);
                }}
                placeholder="passwa"
            />
        </View>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
