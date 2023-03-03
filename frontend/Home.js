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


    // problema da risolvere: dopo la prima riga non viene mostrata

     const tableData = [
         [<Button title = "dettagli" onPress = {NavigateGraph} />],
         [<Button title = "dettagli" onPress = {NavigateGraph} />],
         [<Button title = "dettagli" onPress = {NavigateGraph} />],
         [<Button title = "dettagli" onPress = {NavigateGraph} />],

     ];


     return(
         <View >
            <View style={styles.container}>
                <Table style={{flexDirection: 'row'}} borderStyle={{borderWidth: 1}}>

                    {/* Wrapper di sinistra*/}
                    <TableWrapper style={{width: '80%', flexDirection: 'row'}}>
                            <Col data={[1]} style={styles.head} heightArr={[200]} textStyle={styles.text} />
                    </TableWrapper>

                    {/* Wrapper di destra*/}
                    <TableWrapper style={{width: '20%'}}>
                        <Rows data={tableData} heightArr={[50, 50, 50, 50]} textStyle={styles.text}/>
                    </TableWrapper>

                </Table>
            </View>

     <View >
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
         </View>


 )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    celle: { height: 40, backgroundColor: '#F5F5F5' },
    text: { margin: 6 , color: '#000000', textAlign: 'center' },
        singleHead: { width: 80, height: 40, backgroundColor: '#c8e1ff' },
        head: { flex: 1, backgroundColor: '#c8e1ff' },
        title: { flex: 2.5, backgroundColor: '#f6f8fa' },
        titleText: { marginRight: 6, textAlign:'right' },
        btn: { width: 58, height: 18, marginLeft: 15, backgroundColor: '#c8e1ff', borderRadius: 2 },
        btnText: { textAlign: 'center' }
});

export default Home;