/*Zona 1:   Importaciones de componentes y archivos*/
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

/*Zona 2:  Main - Hogar de los componentes */
export default function App() {
  // Estados para las entradas de texto
  const [nombre, setNombre] = useState('');
  const [carrera, setCarrera] = useState('');
  const [semestre, setSemestre] = useState('');

  // Estados para los interruptores (Switches)
  const [asistiraTaller, setAsistiraTaller] = useState(false);
  const [requiereConstancia, setRequiereConstancia] = useState(false);
  const [participaraDeportes, setParticiparaDeportes] = useState(false);

  // Manejador híbrido de alertas para compatibilidad con Web y Móviles nativos
  const alertasManager = (titulo, mensaje) => {
    if (Platform.OS === 'web') {
      alert(`${titulo}\n\n${mensaje}`);
    } else {
      Alert.alert(titulo, mensaje);
    }
  };

  // Lógica de procesamiento y validación del formulario
  const procesarRegistro = () => {
    // Ocultar teclado en dispositivos móviles
    if (Platform.OS !== 'web') {
      Keyboard.dismiss();
    }

    // 1. Regla de validación: No se permiten campos vacíos
    if (!nombre.trim() || !carrera.trim() || !semestre.trim()) {
      alertasManager('Campos incompletos', 'Debes llenar todos los campos.');
      return;
    }

    // 2. Regla de validación: Semestre debe ser numérico
    const esNumerico = /^\d+$/.test(semestre.trim());
    if (!esNumerico) {
      alertasManager('Error', 'El semestre debe ser un número.');
      return;
    }

    // Traducir respuestas booleanas a palabras en español
    const tallerRespuesta = asistiraTaller ? 'Sí' : 'No';
    const constanciaRespuesta = requiereConstancia ? 'Sí' : 'No';
    const deportesRespuesta = participaraDeportes ? 'Sí' : 'No';

    // 3. Formatear y mostrar el resumen del registro exitoso
    const mensajeExito = 
`Nombre: ${nombre.trim()}
Carrera: ${carrera.trim()}
Semestre: ${semestre.trim()}

Taller: ${tallerRespuesta}
Constancia: ${constanciaRespuesta}
Deportes: ${deportesRespuesta}`;

    alertasManager('Registro enviado', mensajeExito);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardContainer}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer} 
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.formContainer}>
            <Text style={styles.titulo}>Registro de Evento Universitario</Text>

            {/* Campos de texto */}
            <TextInput
              style={styles.input}
              placeholder="Nombre completo"
              value={nombre}
              onChangeText={setNombre}
              placeholderTextColor="#888"
            />

            <TextInput
              style={styles.input}
              placeholder="Carrera"
              value={carrera}
              onChangeText={setCarrera}
              placeholderTextColor="#888"
            />

            <TextInput
              style={styles.input}
              placeholder="Semestre"
              value={semestre}
              onChangeText={setSemestre}
              keyboardType="numeric"
              placeholderTextColor="#888"
            />

            {/* Listado de Opciones con Switches */}
            <Text style={styles.subtitulo}>Opciones</Text>

            <View style={styles.optionRow}>
              <Text style={styles.optionText}>¿Asistirá al taller?</Text>
              <Switch
                value={asistiraTaller}
                onValueChange={setAsistiraTaller}
                trackColor={{ false: '#e5e7eb', true: '#0d9488' }}
                thumbColor="#ffffff"
              />
            </View>

            <View style={styles.optionRow}>
              <Text style={styles.optionText}>¿Requiere constancia?</Text>
              <Switch
                value={requiereConstancia}
                onValueChange={setRequiereConstancia}
                trackColor={{ false: '#e5e7eb', true: '#0d9488' }}
                thumbColor="#ffffff"
              />
            </View>

            <View style={styles.optionRow}>
              <Text style={styles.optionText}>¿Participará en deportes?</Text>
              <Switch
                value={participaraDeportes}
                onValueChange={setParticiparaDeportes}
                trackColor={{ false: '#e5e7eb', true: '#0d9488' }}
                thumbColor="#ffffff"
              />
            </View>

            {/* Botón de envío */}
            <TouchableOpacity style={styles.button} onPress={procesarRegistro} activeOpacity={0.8}>
              <Text style={styles.buttonText}>Enviar Registro</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/*Zona 3: Estilos y posicionamiento */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: 'center',
  },
  formContainer: {
    width: '100%',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 28,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '700',
    color: '#374151',
    marginTop: 24,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    color: '#1f2937',
    backgroundColor: '#ffffff',
    marginBottom: 16,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  optionText: {
    fontSize: 16,
    color: '#4b5563',
  },
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 6,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 32,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
