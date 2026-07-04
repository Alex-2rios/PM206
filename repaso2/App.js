/*Zona 1:   Importaciones de componentes y archivos*/
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  Keyboard,
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

/*Zona 2:  Main - Hogar de los componentes */
export default function App() {
  // Estado para controlar la pantalla de bienvenida (Splash Screen)
  const [showSplash, setShowSplash] = useState(true);

  // Estados para las entradas de texto del formulario
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');

  // Estado para la lista de libros registrados
  const [libros, setLibros] = useState([]);

  // Estado para simular la espera de guardado
  const [isSaving, setIsSaving] = useState(false);

  // Efecto para ocultar el Splash Screen después de 2 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Manejador híbrido de alertas para compatibilidad con Web y Móviles nativos
  const alertasManager = (tituloAlerta, mensaje) => {
    if (Platform.OS === 'web') {
      alert(`${tituloAlerta}\n\n${mensaje}`);
    } else {
      Alert.alert(tituloAlerta, mensaje);
    }
  };

  // Lógica para guardar un libro con simulación de 4 segundos
  const handleAgregarLibro = () => {
    // Ocultar teclado en dispositivos móviles
    if (Platform.OS !== 'web') {
      Keyboard.dismiss();
    }

    // 1. Validar que todos los campos estén llenos
    if (titulo.trim() === '' || autor.trim() === '' || genero.trim() === '') {
      alertasManager('Alert', 'Todos los campos son obligatorios.');
      return;
    }

    // 2. Activar indicador de carga
    setIsSaving(true);

    // 3. Simular espera de 4 segundos antes de guardar
    setTimeout(() => {
      const nuevoLibro = {
        id: String(Date.now()),
        titulo: titulo.trim(),
        autor: autor.trim(),
        genero: genero.trim(),
      };

      // 4. Agregar el libro a la lista
      setLibros((librosActuales) => [nuevoLibro, ...librosActuales]);

      // 5. Limpiar los TextInput
      setTitulo('');
      setAutor('');
      setGenero('');

      // Desactivar el indicador de carga
      setIsSaving(false);

      // 6. Notificar con un Alert
      alertasManager('Alert', 'Libro guardado correctamente.');
    }, 4000);
  };

  // Renderizador de cada elemento de la FlatList (Libro)
  const renderLibroItem = ({ item }) => (
    <View style={styles.libroCard}>
      <Text style={styles.libroTitulo}>{item.titulo}</Text>
      <Text style={styles.libroDetalle}>Autor: {item.autor}</Text>
      <Text style={styles.libroDetalle}>Género: {item.genero}</Text>
    </View>
  );

  // VISTA 1: Pantalla de Bienvenida (Splash Screen - 2 Segundos)
  if (showSplash) {
    return (
      <View style={styles.splashContainer}>
        <StatusBar style="dark" />
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3631/3631278.png' }}
          style={styles.splashIcon}
        />
        <Text style={styles.splashText}>repa2</Text>
      </View>
    );
  }

  // VISTA 2: Pantalla Principal (Formulario e Historial)
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=600' }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Capa de contraste traslúcida */}
        <View style={styles.overlay}>
          <FlatList
            data={libros}
            renderItem={renderLibroItem}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={
              <View style={styles.formContainer}>
                <Text style={styles.tituloHeader}>Catálogo de Libros</Text>

                {/* Inputs */}
                <TextInput
                  style={styles.input}
                  placeholder="Título del libro"
                  placeholderTextColor="#888"
                  value={titulo}
                  onChangeText={setTitulo}
                  editable={!isSaving}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Autor"
                  placeholderTextColor="#888"
                  value={autor}
                  onChangeText={setAutor}
                  editable={!isSaving}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Género"
                  placeholderTextColor="#888"
                  value={genero}
                  onChangeText={setGenero}
                  editable={!isSaving}
                />

                {/* Botón / Indicador de Carga */}
                {isSaving ? (
                  <View style={styles.savingContainer}>
                    <View style={styles.savingBar}>
                      <ActivityIndicator size="small" color="#ffffff" style={{ marginRight: 8 }} />
                      <Text style={styles.savingBarText}>Guardando...</Text>
                    </View>
                    <Text style={styles.savingSubtext}>Guardando libro...</Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleAgregarLibro}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.buttonText}>Agregar Libro</Text>
                  </TouchableOpacity>
                )}

                {/* Contador de Libros */}
                <Text style={styles.totalText}>Total de libros: {libros.length}</Text>
              </View>
            }
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

/*Zona 3: Estilos y posicionamiento */
const styles = StyleSheet.create({
  // Estilos del Splash Screen
  splashContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashIcon: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  splashText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0f172a',
  },

  // Estilos de la Pantalla Principal
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)', // Filtro oscuro para contraste
  },
  listContainer: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
    flexGrow: 1,
  },
  formContainer: {
    width: '100%',
    marginBottom: 20,
  },
  tituloHeader: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 32,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 6,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000000',
    backgroundColor: '#ffffff',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#1d4ed8', // Azul Rey
    borderRadius: 6,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Estilos del estado de carga (Simulación)
  savingContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  savingBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(100, 116, 139, 0.8)', // Gris traslúcido
    borderRadius: 6,
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  savingBarText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  savingSubtext: {
    color: '#ffffff',
    fontSize: 14,
    marginTop: 8,
    fontStyle: 'italic',
  },

  // Estilo del totalizador
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 20,
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },

  // Estilos de los libros agregados (FlatList)
  libroCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)', // Blanco translúcido para contraste
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  libroTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 6,
  },
  libroDetalle: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 2,
  },
});
