import { Platform } from 'react-native';
import Constants from 'expo-constants';

// IP de la PC que hospeda la API en la red local.
// Se usa como respaldo cuando la app corre como APK autónomo, donde no existe
// el servidor Metro y por lo tanto Constants.expoConfig.hostUri es undefined.
const API_HOST = '192.168.68.103';

export const getApiUrl = () => {
  if (Platform.OS === 'web') {
    return 'http://localhost:5000/v1/usuarios/';
  }
  const host = Constants.expoConfig?.hostUri?.split(':')[0] || API_HOST;
  return `http://${host}:5000/v1/usuarios/`;
};
