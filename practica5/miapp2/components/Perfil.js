
/* Perfil usando Desestructuración */
import { Text, View, Button, StyleSheet} from 'react-native';
import React, {useState} from 'react';

export const Perfil = ({ nombre, carrera, materia, cuatrimestre, style}) => {
    const [mostrar, setMostrar] = useState(false);
    return(
        <View style={[styles.tarjeta, style]}>
            <Text style={styles.nombre}>{nombre}</Text>
            {mostrar && 
            <>
            <Text style={styles.carrera}>{carrera}</Text>
            <Text style={styles.otroTexto}>{materia}</Text>
            <Text style={styles.otroTexto}>{cuatrimestre}</Text>
            </>
            }   
            <Button title= "Mostrar Perfil"
            onPress={() => setMostrar(!mostrar)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    nombre: {
        fontSize: 24,
        fontWeight: 700,
        textTransform: 'uppercase',
    },
    carrera: {
        fontSize: 18,
        color: 'blue',
        fontFamily: 'Roboto',
    },
    otroTexto: {
        fontSize: 12,
        fontFamily: 'Courier New',
        fontStyle: 'italic',
    },
    tarjeta: {
        borderWidth: 3,
        margin: 20,
        padding: 25,
    },
});

/* Props */
/* export const Perfil = (props) => {
return(
<View>
<Text>{props.nombre}</Text>
<Text>{props.carrera}</Text>
<Text>{props.materia}</Text>
<Text>{props.cuatrimestre}</Text>
</View>
);
} */