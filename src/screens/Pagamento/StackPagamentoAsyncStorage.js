import { createStackNavigator } from '@react-navigation/stack'
import FormPagamentoAsyncStorage from './FormPagamentoAsyncStorage'
import ListaPagamentoAsyncStorage from './ListaPagamentoAsyncStorage'




const Stack = createStackNavigator()

export default function StackPagamentoAsyncStorage() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='ListaPagamentoAsyncStorage'
        >
            <Stack.Screen name='ListaPagamentoAsyncStorage' component={ListaPagamentoAsyncStorage} />
            <Stack.Screen name='FormPagamentoAsyncStorage' component={FormPagamentoAsyncStorage} />
        </Stack.Navigator>
    )
}
