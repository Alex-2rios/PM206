import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Pressable
} from 'react-native';
import { getApiUrl } from '../config/api';

export default function ConsultaUsuariosScreen() {
  const router = useRouter();
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const obtenerUsuarios = async () => {
    try {
      setCargando(true);
      const url = getApiUrl();
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      
      if (resultado && resultado.data) {
        setUsuarios(resultado.data);
      } else {
        setUsuarios([]);
      }
      setError(null);
    } catch (err) {
      console.error('Error al obtener usuarios:', err);
      setError('No se pudo establecer conexión con el servidor.');
    } finally {
      setCargando(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      obtenerUsuarios();
    }, [])
  );

  const renderTarjeta = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.nombre}>{item.nombre}</Text>
      <View style={styles.linea}></View>
      <Text style={styles.info}>
        Edad: {item.edad} años
      </Text>
      <Pressable
        style={styles.botonDetalles}
        onPress={() =>
          router.push({
            pathname: '/detalles',
            params: { id: item.id, nombre: item.nombre, edad: item.edad },
          })
        }
      >
        <Text style={styles.textoBotonDetalles}>Ver detalles →</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>
        Lista de Usuarios
      </Text>

      {cargando ? (
        <View style={styles.centro}>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.textoCarga}>Cargando usuarios...</Text>
        </View>
      ) : error ? (
        <View style={styles.centro}>
          <Text style={styles.textoError}>{error}</Text>
          <Pressable style={styles.botonReintentar} onPress={obtenerUsuarios}>
            <Text style={styles.textoBoton}>Reintentar</Text>
          </Pressable>
        </View>
      ) : usuarios.length === 0 ? (
        <View style={styles.centro}>
          <Text style={styles.textoVacio}>No hay usuarios registrados.</Text>
        </View>
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderTarjeta}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
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
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1F2937',
    marginBottom: 20,
  },
  centro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textoCarga: {
    marginTop: 10,
    fontSize: 16,
    color: '#4B5563',
  },
  textoError: {
    fontSize: 16,
    color: '#DC2626',
    textAlign: 'center',
    marginBottom: 15,
  },
  textoVacio: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
  },
  botonReintentar: {
    backgroundColor: '#2563EB',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  textoBoton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  linea: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 10,
  },
  info: {
    fontSize: 16,
    color: '#4B5563',
  },
  botonDetalles: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  textoBotonDetalles: {
    color: '#2563EB',
    fontWeight: 'bold',
    fontSize: 14,
  },
});