import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, Dialog, FAB, Portal, Text } from 'react-native-paper';
import { Colors } from '../../renderizacao';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ListaFeedbackAsyncStorage({ navigation }) {
  const [feedback, setFeedback] = useState([]);
  const [showModalExcluirFeedback, setShowModalExcluirFeedback] = useState(false);
  const [feedbackASerExcluido, setFeedbackASerExcluido] = useState(null);

  useEffect(() => {
    loadFeedback();
  }, []);

  const loadFeedback = async () => {
    try {
      const response = await AsyncStorage.getItem('feedback');
      const feedbackStorage = response ? JSON.parse(response) : [];
      setFeedback(feedbackStorage);
    } catch (error) {
      console.error('Error loading feedback:', error);
    }
  };

  const showModal = () => setShowModalExcluirFeedback(true);
  const hideModal = () => setShowModalExcluirFeedback(false);

  const excluirFeedback = async (feedbackParaExcluir) => {
    try {
      const novaListaFeedback = feedback.filter(item => item !== feedbackParaExcluir);
      await AsyncStorage.setItem('feedback', JSON.stringify(novaListaFeedback));
      setFeedback(novaListaFeedback);
      // Adicione aqui a lógica para exibir uma mensagem de sucesso
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  const handleExcluirFeedback = () => {
    excluirFeedback(feedbackASerExcluido);
    setFeedbackASerExcluido(null);
    hideModal();
  };

  return (
    <View style={styles.container}>
    <Text variant='titleLarge' style={styles.title}>
      Lista de Feedbacks
    </Text>

    <FlatList
      style={styles.list}
      data={feedback}
      renderItem={({ item }) => (
        <Card mode='outlined' style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <View style={{ flex: 1 }}>
              {/* Mostra apenas o nome do feedback */}
              <Text colorvariant='titleMedium' style={{ color: Colors.DEFAULT_WHITE }}>{item?.NomeSobrenome}</Text>
            </View>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => navigation.push('FormFeedbackAsyncStorage', { acao: 'editar', inscricao: item })} labelStyle={{ color: Colors.DARK_ONE }}>
              Editar
            </Button>
            <Button
              onPress={() => {
                setFeedbackASerExcluido(item);
                showModal();
              }}
              style={{ backgroundColor: Colors.DARK_ONE }}
            >
              Excluir
            </Button>
          </Card.Actions>
        </Card>
      )}
      keyExtractor={(item, index) => index.toString()}
    />

    {/* Botão Flutuante */}
    <FAB
      icon='plus'
      style={styles.fab}
      color="white"
      onPress={() => navigation.push('FormFeedbackAsyncStorage', { acao: 'adicionar' })}
    />

    {/* Modal Excluir feedback */}
    <Portal>
      <Dialog visible={showModalExcluirFeedback} onDismiss={hideModal}>
        <Dialog.Title>Atenção!</Dialog.Title>
        <Dialog.Content>
          <Text variant='bodyMedium' style={{ color: Colors.WHITE }}>Tem certeza que deseja excluir este feedback?</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideModal} style={{ color: Colors.WHITE }} labelStyle={{ color: 'black' }} >Voltar</Button>
          <Button onPress={handleExcluirFeedback} style={{ color: Colors.WHITE }} labelStyle={{ color: 'black' }}>Tenho Certeza</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    margin: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
  },
  list: {
    width: '90%',
  },
  card: {
    marginTop: 15,
  },
  cardContent: {
    flexDirection: 'row',
    backgroundColor: Colors.DARK_ONE,
    borderWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 15,
  },
});
