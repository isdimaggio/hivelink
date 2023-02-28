import { StyleSheet, Text, View, Button, Alert, Image, Switch} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { useState } from 'react';


const options = [
    { label: 'Opzione 1', value: 'opzione1' },
    { label: 'Opzione 2', value: 'opzione2' },
    { label: 'Opzione 3', value: 'opzione3' },
  ];


 function Home({navigation}) {

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

    return(
        <View>
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
            <Image
                source = {{
                    uri: 'https://reactnative.dev/img/tiny_logo.png'
                }}
            />
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

export default Home;