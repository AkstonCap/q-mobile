import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import WalletService from '../services/WalletService';

type TransactionsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Transactions'>;

interface Props {
  navigation: TransactionsScreenNavigationProp;
}

interface Transaction {
  txid: string;
  type: string;
  timestamp: number;
  amount: number;
  from?: string;
  to?: string;
  reference?: string;
}

const TransactionsScreen: React.FC<Props> = ({ navigation }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [walletService] = useState(new WalletService());

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      await walletService.initialize();
      const txs = await walletService.getTransactions('default', 50);
      setTransactions(txs);
    } catch (error: any) {
      Alert.alert('Error', 'Failed to load transactions: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTransactions();
    setRefreshing(false);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionCard}>
      <View style={styles.transactionHeader}>
        <Text style={styles.transactionType}>{item.type}</Text>
        <Text style={styles.transactionAmount}>
          {item.amount > 0 ? '+' : ''}{item.amount.toFixed(6)} NXS
        </Text>
      </View>
      <Text style={styles.transactionDate}>{formatDate(item.timestamp)}</Text>
      {item.reference && (
        <Text style={styles.transactionReference}>{item.reference}</Text>
      )}
      <Text style={styles.transactionId} numberOfLines={1}>
        TxID: {item.txid.substring(0, 20)}...
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {transactions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No transactions yet</Text>
          <Text style={styles.emptySubtext}>
            Your transaction history will appear here
          </Text>
        </View>
      ) : (
        <FlatList
          data={transactions}
          renderItem={renderTransaction}
          keyExtractor={(item) => item.txid}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6b7280',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
  },
  listContainer: {
    padding: 16,
  },
  transactionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    textTransform: 'capitalize',
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  transactionDate: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  transactionReference: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
    fontStyle: 'italic',
  },
  transactionId: {
    fontSize: 12,
    color: '#9ca3af',
    fontFamily: 'monospace',
  },
});

export default TransactionsScreen;
