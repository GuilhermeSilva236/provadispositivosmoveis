import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, Dialog, FAB, Portal, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { Colors } from '../../renderizacao';

export default function ListaPagamentoAsyncStorage({ navigation, route }) {
  const [pagamento, setPagamento] = useState([]);
  const [showModalExcluirPagamento, setShowModalExcluirPagamento] = useState(false);
  const [pagamentoASerExcluido, setPagamentoASerExcluido] = useState(null);

  useEffect(() => {
    loadPagamento();
  }, []);

  async function loadPagamento() {
    const response = await AsyncStorage.getItem('pagamento');
    console.log("🚀 ~ file: ListaPagamentoAsyncStorage.js:21 ~ loadPagamento ~ response:", response);
    const pagamentoStorage = response ? JSON.parse(response) : [];
    setPagamento(pagamentoStorage);
  }

  async function adicionarPagamento(novoPagamento) {
    let novaListaPagamento = pagamento;
    novaListaPagamento.push(novoPagamento);
    await AsyncStorage.setItem('pagamento', JSON.stringify(novaListaPagamento));
    setPagamento(novaListaPagamento);

    // Recarrega os pagamentos após adicionar um novo pagamento
    await loadPagamento();
  }

  async function editarPagamento(pagamentoAntigo, novosDados) {
    const novaListaPagamento = pagamento.map((item) => {
      if (item === pagamentoAntigo) {
        return novosDados;
      } else {
        return item;
      }
    });

    await AsyncStorage.setItem('pagamento', JSON.stringify(novaListaPagamento));
    setPagamento(novaListaPagamento);
  }

  async function excluirPagamento(pagamentoASerExcluido) {
    const novaListaPagamento = pagamento.filter((u) => u !== pagamentoASerExcluido);
    await AsyncStorage.setItem('pagamento', JSON.stringify(novaListaPagamento));
    setPagamento(novaListaPagamento);
    Toast.show({
      type: 'success',
      text1: 'Pagamento excluído com sucesso!',
    });
  }

  function handleExcluirPagamento() {
    excluirPagamento(pagamentoASerExcluido);
    setPagamentoASerExcluido(null);
    hideModal();
  }

  const showModal = () => setShowModalExcluirPagamento(true);
  
  function hideModal() {
    setShowModalExcluirPagamento(false);
  }

  return (
    <View style={styles.container}>
      <Text variant='titleLarge' style={styles.title}>
        Lista de Pagamentos
      </Text>

      <FlatList
        style={styles.list}
        data={pagamento}
        renderItem={({ item }) => (
          <Card mode='outlined' style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View style={{ flex: 1 }}>
                <Text colorvariant='titleMedium' style={{ color: Colors.DEFAULT_WHITE }}>{item?.nome}</Text>
                <Text variant='bodyLarge' style={{ color: Colors.DEFAULT_WHITE }}>Número do Cartão: {item.numeroCartao} </Text>
                <Text variant='bodyLarge' style={{ color: Colors.DEFAULT_WHITE }}>Data de Validade: {item.dataValidade} </Text>
                <Text variant='bodyLarge' style={{ color: Colors.DEFAULT_WHITE }}>CVV: {item.cvv} </Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => navigation.push('FormPagamentoAsyncStorage', { acao: editarPagamento, pagamento: item })}  labelStyle={{ color: Colors.DARK_ONE }}>
                Editar
              </Button>
              <Button
                onPress={() => {
                  setPagamentoASerExcluido(item);
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

      <FAB
        icon='plus'
        style={styles.fab}
        color="white"
        onPress={() => navigation.push('FormPagamentoAsyncStorage', { acao: adicionarPagamento })}
      />

      <Portal>
        <Dialog visible={showModalExcluirPagamento} onDismiss={hideModal}>
          <Dialog.Title>Atenção!</Dialog.Title>
          <Dialog.Content>
            <Text variant='bodyMedium' style={{ color: Colors.WHITE }}>Tem certeza que deseja excluir este pagamento?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideModal} style={{ color: Colors.WHITE }} labelStyle={{ color: 'black' }} >Voltar</Button>
            <Button onPress={handleExcluirPagamento} style={{ color: Colors.WHITE }} labelStyle={{ color: 'black' }}>Tenho Certeza</Button>
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
