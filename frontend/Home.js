import { StyleSheet, Text, View, Button, Alert } from 'react-native';

 function Home({navigation}) {

    const NavigateGraph = () => {
        navigation.navigate('Graph');
    };

    return(
        <View>
            <Text>Sei nella Home</Text>  
            <Button
            title = "grafici"
            onPress = {NavigateGraph}
            />
        </View>
    )
}

export default Home;