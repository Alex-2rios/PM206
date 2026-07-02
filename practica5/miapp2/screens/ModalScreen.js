/*Zona 1:   Importaciones de componentes y archivos*/
import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, Button, Pressable } from 'react-native';


export default function ModalBottomSheet() { 
  const [modalVisible, setModalVisible] = useState(false);
  return(
    <View style={styles.container}>
        <Text style = {styles.titulo}>Ejemplo de modal y bottom sheet</Text>
        <Button title="Abrir Modal" onPress={() => setModalVisible(true)} />
        <Modal 
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.fondo}>
            <View style={styles.bottomSheet}>
              <Text style={styles.texto}>
                Hola esto es un BottomSheet
              </Text>
              <Pressable onPress={() => setModalVisible(false)}>
                <Text style={styles.boton}>
                  Cerrar
                </Text> 
              </Pressable>
            </View>
          </View>
        </Modal>
    </View>
  );
}


/*Zona 3: Estilos y posicionamiento */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  fondo: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    padding: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  texto: {
    fontSize: 20,
    marginBottom: 20,
  },
  boton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 8,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },
});