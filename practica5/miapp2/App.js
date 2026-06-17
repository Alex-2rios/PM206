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
      <Perfil style={styles.tarjetaRoja} nombre="Alex Rios Carballo" carrera="Sistemas" materia="Programación Móvil" cuatrimestre="9no Cuatrimestre"> </Perfil>
      <Perfil 
      style={styles.tarjetaVerde}
      nombre="Alex Rios Carballo" 
      carrera="Sistemas" 
      materia="Programación Móvil" 
      cuatrimestre="9no Cuatrimestre"> 
      </Perfil>
      <Perfil style={styles.tarjetaRoja} nombre="Alex Rios Carballo" carrera="Sistemas" materia="Programación Móvil" cuatrimestre="9no Cuatrimestre"> </Perfil>
      
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
    justifyContent: 'space-evenly',
    flexDirection: 'row'
  },
  tarjetaRoja: {backgroundColor: '#FF6B6B',},
  tarjetaVerde: {backgroundColor: '#6BCB77',},
});
