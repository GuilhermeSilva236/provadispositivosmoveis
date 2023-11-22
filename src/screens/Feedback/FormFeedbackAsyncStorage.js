import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { StarRating } from '../../components';
import { Colors } from '../../renderizacao';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import * as Yup from 'yup';

const InscrevaValidador = Yup.object().shape({
  NomeSobrenome: Yup.string().required('Por favor, insira o nome e sobrenome'),
  // Adicione validação para outros campos, se necessário
});

export default function FormFeedbackAsyncStorage({ route, navigation }) {
  const [appFeedback, setAppFeedback] = useState(0);
  const [feedbackesFeedback, setFeedbackesFeedback] = useState(0);
  const [localizacaoFeedback, setLocalizacaoFeedback] = useState(0);
  const [initialValues, setInitialValues] = useState({
    NomeSobrenome: '',
  });

  useEffect(() => {
    if (route.params?.acao === 'editar') {
      const { inscricao } = route.params;
      setInitialValues({
        NomeSobrenome: inscricao?.NomeSobrenome || '',
      });
      setAppFeedback(inscricao?.AppFeedback || 0);
      setFeedbackesFeedback(inscricao?.FeedbackesFeedback || 0);
      setLocalizacaoFeedback(inscricao?.LocalizacaoFeedback || 0);
    }
  }, [route.params]);

  const enviarFeedback = async (values) => {
    try {
      const existingFeedback = await AsyncStorage.getItem('feedback');
      let feedbackList = existingFeedback ? JSON.parse(existingFeedback) : [];
      
      const newFeedback = {
        NomeSobrenome: values.NomeSobrenome,
        AppFeedback: appFeedback,
        FeedbackesFeedback: feedbackesFeedback,
        LocalizacaoFeedback: localizacaoFeedback,
      };
  
      if (!Array.isArray(feedbackList)) {
        feedbackList = [];
      }
  
      feedbackList.push(newFeedback);
  
      await AsyncStorage.setItem('feedback', JSON.stringify(feedbackList));
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao enviar feedback:', error);
    }
  };
  
  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={InscrevaValidador}
        onSubmit={(values) => {
          enviarFeedback(values);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <Text style={styles.title}>Deixe seu feedback:</Text>

            <TextInput
              style={{ ...styles.input }}
              label={'Nome e Sobrenome'}
              mode='outlined'
              onChangeText={handleChange('NomeSobrenome')}
              onBlur={handleBlur('NomeSobrenome')}
              theme={{ colors: { primary: 'black' } }}
              value={values.NomeSobrenome}
              error={errors.NomeSobrenome && touched.NomeSobrenome}
            />

            {/* Mostrar estrelas para diferentes tipos de feedback */}
            <Text style={styles.label}>Feedback do aplicativo:</Text>
            <StarRating classificacao={appFeedback} onChange={setAppFeedback} />

            <Text style={styles.label}>Feedback dos feedbackes:</Text>
            <StarRating classificacao={feedbackesFeedback} onChange={setFeedbackesFeedback} />

            <Text style={styles.label}>Feedback da localização:</Text>
            <StarRating classificacao={localizacaoFeedback} onChange={setLocalizacaoFeedback} />

            <Button
              mode="contained"
              style={styles.button}
              onPress={handleSubmit}
            >
              Enviar Feedback
            </Button>
          </>
        )}
      </Formik>
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
    backgroundColor: Colors.DARK_ONE,
  },
});
