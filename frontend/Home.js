import { StyleSheet, Text, View, Button, Alert, Switch } from 'react-native';
import React, { useState } from 'react';
import {Picker} from '@react-native-picker/picker';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

 function Home({navigation}) {

    const options = [
        { label: 'Opzione 1', value: 'opzione1' },
        { label: 'Opzione 2', value: 'opzione2' },
        { label: 'Opzione 3', value: 'opzione3' },
      ];


    const [selectedOption, setSelectedOption] = useState(options[0].value);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
        Alert.alert("Sicurezza","Sei sicuro di voler attivare o disattivare il sistema di sicurezza?");
        setIsEnabled(previousState => !previousState);
    }


    const NavigateGraph = () => {
        navigation.navigate('Dettagli');
    };

    const navigateAddHive = () => {
        navigation.navigate('Aggiungi Arnia');
    }


     const tableData = [
         ['Name', 'Age', 'Gender'],
         ['John', '30', 'Male'],
         ['Jane', '25', 'Female'],
         ['Bob', '40', 'Male']
     ];


     return(

        <View>
            <View style={styles.container}>
                <Table>
                    <Row data={tableData[0]} style={styles.head} textStyle={styles.text} />
                    <Rows data={tableData.slice(1)} textStyle={styles.text} />
                </Table>
            </View>

            <Text>Sei nella Home</Text>
            <Picker
                selectedValue={selectedOption}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedOption(itemValue)
                }>
                {options.map(option => (
                    <Picker.Item
                    key={option.value}
                    label={option.label}
                    value={option.value}
                    />
                ))}
            </Picker>
            <Button
                title = "dettagli"
                onPress = {NavigateGraph}
            />
            <Button
                title = "aggiungi arnia"
                onPress = {navigateAddHive}
            />
            <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isEnabled ? '#ff00ff' : '#f0ff0f'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
});

export default Home;