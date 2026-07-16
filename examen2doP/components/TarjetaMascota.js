import { View, Button, TextInput, Platform, Alert, Keyboard, StyleSheet, Text, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';

export default function TarjetaMascota ({ nombre, especie, edad, color }) {

   const [adoptado, setAdoptado] = useState('');

 

  
  return (
    <View style={[styles.tarjeta, { backgroundColor: color }]}>

      <Text style={styles.nombre}>{nombre}</Text>

      <View style={styles.fila}>

        <Text style={styles.etiqueta}>Especie:</Text>
        <Text style={styles.dato}>{especie}</Text>

      </View>

      <View style={styles.fila}>

        <Text style={styles.etiqueta}>Edad:</Text>
        <Text style={styles.dato}>{edad}</Text>

      </View>



    //Aqui empieza TextImput
 <View style={styles.container}>

      <TextInput
        style={styles.input}
        placeholder="Observaciones"
        value={observaciones}
        onChangeText={setObservaciones}
      />

      </View>
    </View>
  );
}




const styles = StyleSheet.create({
  tarjeta: {
    width: 260,
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
    container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  nombre: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  etiqueta: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  dato: {
    fontSize: 16,
    color: '#fff',
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#dcdde1',
    padding: 12, 
    borderRadius: 8, 
    marginBottom: 12, 
    backgroundColor: '#fff' 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#dcdde1',
    padding: 12, 
    borderRadius: 8, 
    marginBottom: 12, 
    backgroundColor: '#fff' 
  },
});
