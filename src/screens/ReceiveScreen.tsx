import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import WalletService from '../services/WalletService';
import QRCode from 'react-native-qrcode-svg';

type ReceiveScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Receive'>;

interface Props {
  navigation: ReceiveScreenNavigationProp;
}

const ReceiveScreen: React.FC<Props> = ({ navigation }) => {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(true);
  const [walletService] = useState(new WalletService());

  useEffect(() => {
    loadAddress();
  }, []);

  const loadAddress = async () => {
    try {
      await walletService.initialize();
      const addr = await walletService.getAccountAddress('default');
      setAddress(addr);
    } catch (error: any) {
      Alert.alert('Error', 'Failed to load address: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    // Note: Clipboard functionality would need react-native-clipboard package
    // For now, just show an alert
    Alert.alert('Address', address, [
      { text: 'OK' }
    ]);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.card}>
        <Text style={styles.title}>Your Nexus Address</Text>
        <Text style={styles.subtitle}>
          Share this address to receive NXS
        </Text>

        <View style={styles.qrContainer}>
          <QRCode
            value={address}
            size={200}
            backgroundColor="white"
          />
        </View>

        <View style={styles.addressContainer}>
          <Text style={styles.addressLabel}>Address:</Text>
          <Text style={styles.addressText} selectable>
            {address}
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={copyToClipboard}>
          <Text style={styles.buttonText}>View Address</Text>
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            💡 Only send NXS to this address. Sending other cryptocurrencies may result in permanent loss.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  contentContainer: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  qrContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 24,
  },
  addressContainer: {
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  addressLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
  },
  addressText: {
    fontSize: 12,
    color: '#111827',
    fontFamily: 'monospace',
    lineHeight: 18,
  },
  button: {
    backgroundColor: '#6366f1',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: '#fef3c7',
    padding: 12,
    borderRadius: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#92400e',
    lineHeight: 20,
  },
});

export default ReceiveScreen;
