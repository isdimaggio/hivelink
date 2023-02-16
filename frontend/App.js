import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Button from '@ant-design/react-native/lib/button';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hivelink</Text>
      <StatusBar style="auto" />
      <Button>Vafangul</Button>
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
