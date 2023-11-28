import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/Home/HomeScreen';
import StackInscrevaAsyncStorage from '../screens/Inscreva/StackInscrevaAsyncStorage';
import StackcondutoresAsyncStorage from '../screens/Condutores/StackCondutoresAsyncStorage';
import StackVeiculosAsyncStorage from '../screens/Veiculo/StackVeiculoAsyncStorage';
import StackPagamentoAsyncStorage from '../screens/Pagamento/StackPagamentoAsyncStorage';
import StackFeedbackAsyncStorage from '../screens/Feedback/StackFeedbackAsyncStorage';
import { Colors } from '../renderizacao';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator
      initialRouteName='HomeScreen'
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.DARK_ONE, // Define a cor de fundo da barra de navegação como preto
        },
        headerTintColor: Colors.SECONDARY_WHITE, // Define a cor do texto do cabeçalho como branco
        headerTitleStyle: {
          fontWeight: 'bold', // Define o estilo do texto do título (se necessário)
        },
      }}
    >
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="Inscrever-se" component={StackInscrevaAsyncStorage} />
      <Drawer.Screen name="Condutores" component={StackcondutoresAsyncStorage} />
      <Drawer.Screen name="Veiculos" component={StackVeiculosAsyncStorage} />
      <Drawer.Screen name="Pagamento" component={StackPagamentoAsyncStorage} />
      <Drawer.Screen name="Feedback" component={StackFeedbackAsyncStorage} />
    </Drawer.Navigator>
  );
}
