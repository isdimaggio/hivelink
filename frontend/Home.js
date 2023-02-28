import { StyleSheet, Text, View, Button, Alert } from 'react-native';

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



 function Home({navigation}) {

    const NavigateGraph = () => {
        navigation.navigate('Graph');
    };

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
            title = "grafici"
            onPress = {NavigateGraph}
            />
        </View>
    )
}

export default Home;