/*Zona 1:   Importaciones de componentes y archivos*/
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import { Perfil } from '../components/Perfil';

/*Zona 2:  Main - Hogar de los componentes */
export default function TarjetasScreen() {
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
    justifyContent: 'center',
    flexDirection: 'column',
  },
  tarjetaRoja: {backgroundColor: '#FF6B6B',},
  tarjetaVerde: {backgroundColor: '#6BCB77',},
});
