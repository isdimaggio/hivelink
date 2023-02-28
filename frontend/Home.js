import { StyleSheet, Text, View, Button, Alert } from 'react-native';

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
             <View style={styles.tableRow}>
                <View style={styles.tableCell}><Text>1</Text></View>
                <View style={styles.tableCell}><Text>2</Text></View>
                <View style={styles.tableCell}><Text>3</Text></View>
                <View style={styles.tableCell}><Text>4</Text></View>
                <View style={styles.tableCell}><Text>5</Text></View>
            </View>
            <View style={styles.tableRow}>
                <View style={styles.tableCell}><Text>6</Text></View>
                <View style={styles.tableCell}><Text>7</Text></View>
                <View style={styles.tableCell}><Text>8</Text></View>
                <View style={styles.tableCell}><Text>9</Text></View>
                <View style={styles.tableCell}><Text>10</Text></View>
            </View>
            <View style={styles.tableRow}>
                <View style={styles.tableCell}><Text>11</Text></View>
                <View style={styles.tableCell}><Text>12</Text></View>
                <View style={styles.tableCell}><Text>13</Text></View>
                <View style={styles.tableCell}><Text>14</Text></View>
                <View style={styles.tableCell}><Text>15</Text></View>
            </View>
            <View style={styles.tableRow}>
                <View style={styles.tableCell}><Text>11</Text></View>
                <View style={styles.tableCell}><Text>12</Text></View>
                <View style={styles.tableCell}><Text>13</Text></View>
                <View style={styles.tableCell}><Text>14</Text></View>
                <View style={styles.tableCell}><Text>15</Text></View>
            </View>

            <Text>Sei nella Home</Text>  
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
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 1,
    },
    tableCell: {
        flex: 1,
        height: 50,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Home;