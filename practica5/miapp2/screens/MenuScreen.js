/*Zona 1:   Importaciones de componentes y archivos*/
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import React, { useState } from 'react';
import TarjetasScreen from './TarjetasScreen';
import SafeAreaScreen from './SafeAreaScreen';
import PressableScreen from './PressableScreen';
import TextInputScreen from './TextInputScreen';
import FlatSectionListScreen from './FlatSectionListScreen';
import ImageBackgroundScreen from './ImageBackgroundScreen';
import ActivityIndicatorScreen from './ActivityIndicatorScreen';
import ModalScreen from './ModalScreen';

/*Zona 2:  Main - Hogar de los componentes */
export default function MenuScreen() {
    const [screen, setScreen] = useState('menu');

    switch (screen) {
        case 'tarjetas':
            return <TarjetasScreen/>;
        case 'safearea':
            return <SafeAreaScreen/>;
        case 'Pressable & Switch':
            return <PressableScreen/>;
        case 'TextInput':
            return <TextInputScreen/>;
        case 'FlatList':
            return <FlatSectionListScreen/>;
        case 'ImageBackground':
            return <ImageBackgroundScreen/>;
        case 'ActivityIndicator':
            return <ActivityIndicatorScreen/>;
        case 'Modal':
            return <ModalScreen/>;

        default:
            return (
                <View style={styles.container}>
                    <StatusBar style="auto" />

                    <Text style={styles.titulo}>Menu de practicas</Text>

                    <ScrollView contentContainerStyle={styles.lista}>
                        <Button onPress={() => setScreen('tarjetas')}           title="Tarjetas" />
                        <View style={styles.sep} />
                        <Button onPress={() => setScreen('safearea')}           title="Safe Area" />
                        <View style={styles.sep} />
                        <Button onPress={() => setScreen('Pressable & Switch')} title="Pressable & Switch" />
                        <View style={styles.sep} />
                        <Button onPress={() => setScreen('TextInput')}          title="TextInput" />
                        <View style={styles.sep} />
                        <Button onPress={() => setScreen('FlatList')}           title="FlatList" />
                        <View style={styles.sep} />
                        <Button onPress={() => setScreen('ImageBackground')}    title="ImageBackground & SplashScreen" />
                        <View style={styles.sep} />
                        <Button onPress={() => setScreen('ActivityIndicator')}  title="ActivityIndicator & KeyboardAvoidingView" />
                        <View style={styles.sep} />
                        <Button onPress={() => setScreen('Modal')}              title="Modal & BottomSheet" />
                    </ScrollView>
                </View>
            );
    }
}

/*Zona 3: Estilos y posicionamiento */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    lista: {
        alignItems: 'center',
    },
    sep: {
        height: 10,
    },
});
