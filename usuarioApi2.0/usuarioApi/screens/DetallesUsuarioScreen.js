import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  Platform,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getApiUrl } from '../config/api';

export default function DetallesUsuarioScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { id, nombre: initialNombre, edad: initialEdad } = params;

  const [usuario, setUsuario] = useState({
    id: id,
    nombre: initialNombre || '',
    edad: initialEdad || ''
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [eliminando, setEliminando] = useState(false);

  const mostrarMensaje = (titulo, mensaje) => {
    if (Platform.OS === 'web') {
      window.alert(`${titulo}\n${mensaje}`);
    } else {
      Alert.alert(titulo, mensaje);
    }
  };

  const obtenerDetalle = async () => {
    if (!id) return;
    try {
      const url = getApiUrl();
      const res = await fetch(`${url}${id}`);
      const data = await res.json();
      if (data && data.data) {
        setUsuario(data.data);
      }
    } catch (err) {
      console.log('Error al obtener usuario:', err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      obtenerDetalle();
    }, [id])
  );

  const handleEliminar = async () => {
    try {
      setEliminando(true);
      const url = getApiUrl();
      const res = await fetch(`${url}${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Basic YWRtaW46MTIzNA=='
        }
      });
      const data = await res.json();
      setModalVisible(false);
      if (res.ok || data.status === '200') {
        mostrarMensaje('Éxito', 'Usuario eliminado correctamente');
        router.back();
      } else {
        mostrarMensaje('Error', data.detail || 'No se pudo eliminar el usuario');
      }
    } catch (err) {
      console.error('Error al eliminar usuario:', err);
      setModalVisible(false);
      mostrarMensaje('Error', 'Ocurrió un error al eliminar el usuario');
    } finally {
      setEliminando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Detalles del Usuario</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nombre</Text>
        <Text style={styles.valor}>{usuario.nombre}</Text>

        <View style={styles.linea} />

        <Text style={styles.label}>Edad</Text>
        <Text style={styles.valor}>{usuario.edad} años</Text>

        <View style={styles.contenedorBotones}>
          <Pressable
            style={styles.botonActualizar}
            onPress={() =>
              router.push({
                pathname: '/actualizar',
                params: { id: usuario.id, nombre: usuario.nombre, edad: usuario.edad }
              })
            }
          >
            <Text style={styles.textoBoton}>Actualizar</Text>
          </Pressable>

          <Pressable
            style={styles.botonEliminar}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.textoBoton}>Eliminar</Text>
          </Pressable>
        </View>
      </View>

      {/* Modal de Confirmación de Eliminación */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>Confirmar eliminación</Text>
            <Text style={styles.modalTexto}>
              ¿Estás seguro de que deseas eliminar al usuario {usuario.nombre}?
            </Text>

            <View style={styles.modalBotones}>
              <Pressable
                style={styles.botonCancelar}
                onPress={() => setModalVisible(false)}
                disabled={eliminando}
              >
                <Text style={styles.textoBotonCancelar}>Cancelar</Text>
              </Pressable>

              <Pressable
                style={styles.botonConfirmarEliminar}
                onPress={handleEliminar}
                disabled={eliminando}
              >
                {eliminando ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Text style={styles.textoBotonConfirmar}>Sí, eliminar</Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
    borderRadius: 15,
    padding: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  valor: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
  },
  linea: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },
  contenedorBotones: {
    marginTop: 25,
    alignItems: 'center',
    gap: 12,
  },
  botonActualizar: {
    backgroundColor: '#EAB308',
    width: 140,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  botonEliminar: {
    backgroundColor: '#DC2626',
    width: 140,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  textoBoton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalTexto: {
    fontSize: 15,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 24,
  },
  modalBotones: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    width: '100%',
  },
  botonCancelar: {
    backgroundColor: '#E5E7EB',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  textoBotonCancelar: {
    color: '#374151',
    fontWeight: 'bold',
    fontSize: 15,
  },
  botonConfirmarEliminar: {
    backgroundColor: '#DC2626',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  textoBotonConfirmar: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
