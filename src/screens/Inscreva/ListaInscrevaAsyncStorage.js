import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, Dialog, FAB, Portal, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { Colors } from '../../renderizacao';

export default function ListaInscrevaAsyncStorage({ navigation, route }) {
  const [inscricoes, setInscricoes] = useState([]);
  const [showModalExcluirInscricao, setShowModalExcluirInscricao] = useState(false);
  const [inscricaoASerExcluida, setInscricaoASerExcluida] = useState(null);

  useEffect(() => {
    loadInscricoes();
  }, []);

  async function loadInscricoes() {
    const response = await AsyncStorage.getItem('inscricoes');
    console.log("🚀 ~ file: ListaInscrevaAsyncStorage.js:21 ~ loadInscricoes ~ response:", response);
    const inscricoesStorage = response ? JSON.parse(response) : [];
    setInscricoes(inscricoesStorage);
    setLoading(false); // Quando os dados forem carregados, o indicador de carregamento será desativado
  }

  const showModal = () => setShowModalExcluirInscricao(true);

  const hideModal = () => setShowModalExcluirInscricao(false);

  async function adicionarInscricao(inscricao) {
    let novaListaInscricoes = inscricoes;
    novaListaInscricoes.push(inscricao);
    await AsyncStorage.setItem('inscricoes', JSON.stringify(novaListaInscricoes));
    setInscricoes(novaListaInscricoes);
  }

  async function editarInscricao(inscricaoAntiga, novosDados) {
    console.log('INSCRIÇÃO ANTIGA -> ', inscricaoAntiga);
    console.log('DADOS NOVOS -> ', novosDados);

    const novaListaInscricoes = inscricoes.map((inscricao) => {
      if (inscricao === inscricaoAntiga) {
        return novosDados;
      } else {
        return inscricao;
      }
    });

    await AsyncStorage.setItem('inscricoes', JSON.stringify(novaListaInscricoes));
    setInscricoes(novaListaInscricoes);
  }

  async function excluirInscricao(inscricao) {
    const novaListaInscricoes = inscricoes.filter((i) => i !== inscricao);
    await AsyncStorage.setItem('inscricoes', JSON.stringify(novaListaInscricoes));
    setInscricoes(novaListaInscricoes);
    Toast.show({
      type: 'success',
      text1: 'Inscrição excluída com sucesso!',
    });
  }

  function handleExcluirInscricao() {
    excluirInscricao(inscricaoASerExcluida);
    setInscricaoASerExcluida(null);
    hideModal();
  }

  return (
    <View style={styles.container}>
      <Text variant='titleLarge' style={styles.title}>
        Lista de Inscrições
      </Text>

      <FlatList
        style={styles.list}
        data={inscricoes}
        renderItem={({ item }) => (
          <Card mode='outlined' style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View style={{ flex: 1 }}>
                <Text colorvariant='titleMedium' style={{ color: Colors.DEFAULT_WHITE}}>{item?.nome}</Text>
                <Text variant='bodyLarge' style={{ color: Colors.DEFAULT_WHITE }}>CPF: {item?.Cpf}</Text>
                <Text variant='bodyLarge' style={{ color: Colors.DEFAULT_WHITE }}>E-mail: {item?.Email} </Text>
                <Text variant='bodyLarge' style={{ color: Colors.DEFAULT_WHITE }}>Senha: {item.Senha} </Text>
                <Text variant='bodyLarge' style={{ color: Colors.DEFAULT_WHITE }}>Telefone: {item.Telefone} </Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => navigation.push('FormInscrevaAsyncStorage', { acao: editarInscricao, inscricao: item })}  labelStyle={{ color: Colors.DARK_ONE }}>
                Editar
              </Button>
              <Button
                onPress={() => {
                  setInscricaoASerExcluida(item);
                  showModal();
                }}
                style={{ backgroundColor: Colors.DARK_ONE }}
              >
                Excluir
              </Button>
            </Card.Actions>
          </Card>
        )}
      />

      {/* Botão Flutuante */}
      <FAB
        icon='plus'
        style={styles.fab}
        color="white"
        onPress={() => navigation.push('FormInscrevaAsyncStorage', { acao: adicionarInscricao })}
      />

      {/* Modal Excluir Inscrição */}
      <Portal>
        <Dialog visible={showModalExcluirInscricao} onDismiss={hideModal}>
          <Dialog.Title>Atenção!</Dialog.Title>
          <Dialog.Content>
            <Text variant='bodyMedium' style={{ color: Colors.WHITE }}>Tem certeza que deseja excluir esta inscrição?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideModal} style={{ color: Colors.WHITE }} labelStyle={{ color: 'black' }} >Voltar</Button>
            <Button onPress={handleExcluirInscricao} style={{ color: Colors.WHITE }} labelStyle={{ color: 'black' }}>Tenho Certeza</Button>
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
