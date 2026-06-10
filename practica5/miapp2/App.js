/*Zona 1:   Importaciones de componentes y archivos*/
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Saludo } from './components/Saludo';
import { Salud2 } from './components/Salud2';
import { Perfil } from './components/Perfil';

/*Zona 2:  Main - Hogar de los componentes */
export default function App() {
  return (
    <View style={styles.container}>
      <Text>------------Componente Nativos------------</Text>
      <Image source={require('./assets/wave.png')}/>
      <Text>Hola mundo RN!</Text>
      <Text>------------Componente Simple------------</Text>
      <Saludo></Saludo>   
      <Text>------------Componente Compuesto------------</Text> 
      <Salud2></Salud2> 
      <Text>------------Componente Perfi  l------------</Text>
      <Perfil></Perfil>
      <StatusBar style="auto" />
    
    </View>
  );
}

/*Zona 3: Estilos y posicionamiento */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
