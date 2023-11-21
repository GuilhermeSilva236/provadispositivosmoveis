import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { StarRating } from '../../components';
import { Colors } from '../../renderizacao';

export default function FormFeedbackAsyncStorage({ navigation }) {
  const [appFeedback, setAppFeedback] = useState(0);
  const [condutoresFeedback, setCondutoresFeedback] = useState(0);
  const [localizacaoFeedback, setLocalizacaoFeedback] = useState(0);

  const enviarFeedback = () => {
    // Lógica para enviar feedback
    console.log('Feedback do aplicativo:', appFeedback);
    console.log('Feedback dos condutores:', condutoresFeedback);
    console.log('Feedback da localização:', localizacaoFeedback);
    // ...

    // Navega de volta para a tela anterior após o envio do feedback
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deixe seu feedback:</Text>

      {/* Mostrando apenas as estrelas */}
      <Text style={styles.label}>Feedback do aplicativo:</Text>
      <StarRating classificacao={appFeedback} onChange={setAppFeedback} />

      <Text style={styles.label}>Feedback dos condutores:</Text>
      <StarRating classificacao={condutoresFeedback} onChange={setCondutoresFeedback} />

      <Text style={styles.label}>Feedback da localização:</Text>
      <StarRating classificacao={localizacaoFeedback} onChange={setLocalizacaoFeedback} />

      <Button
        mode="contained"
        style={styles.button}
        labelStyle={{ color: 'white' }}
        onPress={enviarFeedback}
      >
        Enviar Feedback
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginTop: 20,
  },
  button: {
    marginTop: 20,
    width: '100%',
    backgroundColor: Colors.DARK_ONE
  },
});
