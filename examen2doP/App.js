import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import TarjetaMascota from './components/TarjetaMascota';

export default function App() {
  return (
    <View style={styles.container}>
      <TarjetaMascota nombre="Snow" especie="Maltés" edad="12" color="#FF6B6B" />
      <TarjetaMascota nombre="Michi" especie="Gato" edad="3" color="#4D96FF" />
      <TarjetaMascota nombre="Rex" especie="Pastor Alemán" edad="5" color="#6BCB77" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
});
