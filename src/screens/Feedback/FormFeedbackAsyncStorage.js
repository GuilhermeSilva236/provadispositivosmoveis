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
});

export default function FormFeedbackAsyncStorage({ route, navigation }) {
  const [appFeedback, setAppFeedback] = useState(0);
  const [feedbackesFeedback, setFeedbackesFeedback] = useState(0);
  const [localizacaoFeedback, setLocalizacaoFeedback] = useState(0);
  const [initialValues, setInitialValues] = useState({ NomeSobrenome: '' });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (route.params?.acao === 'editar') {
      const { inscricao } = route.params;
      setInitialValues({
        NomeSobrenome: inscricao?.NomeSobrenome || '', // Define o valor inicial do campo NomeSobrenome
      });
      setAppFeedback(inscricao?.AppFeedback || 0);
      setFeedbackesFeedback(inscricao?.FeedbackesFeedback || 0);
      setLocalizacaoFeedback(inscricao?.LocalizacaoFeedback || 0);
    }
  }, [route.params])

  const enviarFeedback = async (values) => {
    try {
      if (appFeedback === 0 || feedbackesFeedback === 0 || localizacaoFeedback === 0 || !values.NomeSobrenome) {
        setErrorMessage('Atenção: Preencha todos os campos antes de enviar o feedback.');
        return;
      }

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

      const { acao, inscricao, handleSalvarEdicao } = route.params;

      if (acao === 'editar') {
        const index = feedbackList.findIndex(item => item.NomeSobrenome === initialValues.NomeSobrenome);
        if (index !== -1) {
          feedbackList[index] = { ...feedbackList[index], ...newFeedback };
          await AsyncStorage.setItem('feedback', JSON.stringify(feedbackList));
          handleSalvarEdicao(newFeedback);
        }
      } else {
        feedbackList.push(newFeedback);
        await AsyncStorage.setItem('feedback', JSON.stringify(feedbackList));
      }

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
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
          <>
            <Text style={styles.title}>Deixe seu feedback:</Text>

            <TextInput
              style={{ ...styles.input, marginBottom: 10 }}
              label={'Nome e Sobrenome'}
              mode='outlined'
              onChangeText={handleChange('NomeSobrenome')}
              onBlur={handleBlur('NomeSobrenome')}
              theme={{ colors: { primary: 'black' } }}
              value={values.NomeSobrenome}
              error={errors.NomeSobrenome && touched.NomeSobrenome}
            />
            {errors.NomeSobrenome && touched.NomeSobrenome && (
              <Text style={styles.errorText}>{errors.NomeSobrenome}</Text>
            )}

            <Text style={styles.label}>Feedback do aplicativo:</Text>
            <StarRating classificacao={appFeedback} onChange={value => setAppFeedback(value)} value={appFeedback} />

            <Text style={styles.label}>Feedback dos feedbackes:</Text>
            <StarRating classificacao={feedbackesFeedback} onChange={value => setFeedbackesFeedback(value)} value={feedbackesFeedback} />

            <Text style={styles.label}>Feedback da localização:</Text>
            <StarRating classificacao={localizacaoFeedback} onChange={value => setLocalizacaoFeedback(value)} value={localizacaoFeedback} />

            {errorMessage ? (
              <Text style={styles.attentionText}>{errorMessage}</Text>
            ) : null}

            <Button
              mode="contained"
              style={styles.button}
              onPress={handleSubmit}
            >
              {route.params?.acao === 'editar' ? 'Salvar Edição' : 'Enviar Feedback'}
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
  input: {
    width: '100%',
  },
  errorText: {
    color: 'red',
    marginLeft: 10,
    marginBottom: 5,
  },
  attentionText: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
});
