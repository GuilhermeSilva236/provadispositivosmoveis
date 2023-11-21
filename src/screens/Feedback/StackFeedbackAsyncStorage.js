import { createStackNavigator } from '@react-navigation/stack'
import FormFeedbackAsyncStorage from './FormFeedbackAsyncStorage'
import ListaFeedbackAsyncStorage from './ListaFeedbackAsyncStorage'




const Stack = createStackNavigator()

export default function StackLocalizacaoAsyncStorage() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='ListaFeedbackAsyncStorage'
        >
            <Stack.Screen name='FormFeedbackAsyncStorage' component={FormFeedbackAsyncStorage} />
            <Stack.Screen name='ListaFeedbackAsyncStorage' component={ListaFeedbackAsyncStorage} />
        </Stack.Navigator>
    )
}
