import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  Platform,
  ActivityIndicator
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Constants from 'expo-constants';

const getApiUrl = () => {
  if (Platform.OS === 'web') {
    return 'http://localhost:5000/v1/usuarios/';
  }
  const host = Constants.expoConfig?.hostUri?.split(':')[0] || '10.186.2.28';
  return `http://${host}:5000/v1/usuarios/`;
};

const API_URL = getApiUrl();

export default function ActualizarUsuarioScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { id, nombre: initialNombre, edad: initialEdad } = params;

  const [nombre, setNombre] = useState(initialNombre || '');
  const [edad, setEdad] = useState(initialEdad ? String(initialEdad) : '');
  const [cargando, setCargando] = useState(false);

  const mostrarMensaje = (titulo, mensaje) => {
    if (Platform.OS === 'web') {
      window.alert(`${titulo}\n${mensaje}`);
    } else {
      Alert.alert(titulo, mensaje);
    }
  };

  const guardarCambios = async () => {
    if (nombre.trim() === '' || edad.trim() === '') {
      mostrarMensaje('Vacíos', 'Campos Obligatorios');
      return;
    }

    try {
      setCargando(true);
      const respuesta = await fetch(`${API_URL}${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: nombre.trim(),
          edad: Number(edad),
        }),
      });

      const datos = await respuesta.json();
      if (respuesta.ok || datos.status === '200') {
        mostrarMensaje('Éxito', 'Usuario actualizado correctamente');
        router.back();
      } else {
        mostrarMensaje('Error', datos.detail || 'No se pudo actualizar');
      }
    } catch (error) {
      console.log('Error API update:', error);
      mostrarMensaje('Error', 'No fue posible guardar los cambios');
    } finally {
      setCargando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Actualizar Usuario</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre del usuario"
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.label}>Edad</Text>
        <TextInput
          style={styles.input}
          placeholder="Edad del usuario"
          keyboardType="numeric"
          value={edad}
          onChangeText={setEdad}
        />

        <Pressable
          style={styles.boton}
          onPress={guardarCambios}
          disabled={cargando}
        >
          {cargando ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text style={styles.textoBoton}>Guardar cambios</Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1F2937',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 18,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    color: '#1F2937',
  },
  boton: {
    backgroundColor: '#EAB308',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBoton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
