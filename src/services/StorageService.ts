// Storage Service for React Native
// Handles secure storage of wallet data using AsyncStorage and Keychain

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';

export interface SessionData {
  session: string;
  genesis: string;
  username: string;
  isLocked: boolean;
}

export interface WalletConfig {
  initialized: boolean;
  username: string;
  genesis: string;
  createdAt: number;
}

class StorageService {
  private readonly SESSION_KEY = 'wallet_session';
  private readonly CONFIG_KEY = 'wallet_config';
  private readonly NODE_URL_KEY = 'node_url';
  private readonly TRANSACTIONS_KEY = 'transactions';
  private readonly ACCOUNT_DATA_KEY = 'account_data';

  // Save data to storage
  async set(key: string, value: any): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Storage set error:', error);
      throw error;
    }
  }

  // Get data from storage
  async get(key: string): Promise<any> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Storage get error:', error);
      return null;
    }
  }

  // Remove data from storage
  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Storage remove error:', error);
      throw error;
    }
  }

  // Clear all storage
  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Storage clear error:', error);
      throw error;
    }
  }

  // ===== Wallet-specific methods =====

  // Save wallet configuration
  async saveWalletConfig(config: WalletConfig): Promise<void> {
    await this.set(this.CONFIG_KEY, config);
  }

  // Get wallet configuration
  async getWalletConfig(): Promise<WalletConfig | null> {
    return await this.get(this.CONFIG_KEY);
  }

  // Save session data
  async saveSession(sessionData: SessionData): Promise<void> {
    await this.set(this.SESSION_KEY, sessionData);
  }

  // Get session data
  async getSession(): Promise<SessionData | null> {
    return await this.get(this.SESSION_KEY);
  }

  // Clear session data
  async clearSession(): Promise<void> {
    try {
      // Overwrite with null for secure deletion
      await this.set(this.SESSION_KEY, null);
      await this.remove(this.SESSION_KEY);
      console.log('Session data securely cleared');
    } catch (error) {
      console.error('Error clearing session:', error);
    }
  }

  // Save node URL
  async saveNodeUrl(url: string): Promise<void> {
    await this.set(this.NODE_URL_KEY, url);
  }

  // Get node URL
  async getNodeUrl(): Promise<string> {
    const url = await this.get(this.NODE_URL_KEY);
    return url || 'https://api.distordia.com';
  }

  // Save account data
  async saveAccountData(accountData: any): Promise<void> {
    await this.set(this.ACCOUNT_DATA_KEY, accountData);
  }

  // Get account data
  async getAccountData(): Promise<any> {
    return await this.get(this.ACCOUNT_DATA_KEY);
  }

  // Save transaction cache
  async saveTransactions(transactions: any[]): Promise<void> {
    await this.set(this.TRANSACTIONS_KEY, transactions);
  }

  // Get transaction cache
  async getTransactions(): Promise<any[]> {
    const txs = await this.get(this.TRANSACTIONS_KEY);
    return txs || [];
  }

  // Check if wallet is initialized
  async isWalletInitialized(): Promise<boolean> {
    const config = await this.getWalletConfig();
    return config?.initialized === true;
  }

  // Mark wallet as initialized
  async markWalletInitialized(username: string, genesis: string): Promise<void> {
    await this.saveWalletConfig({
      initialized: true,
      username,
      genesis,
      createdAt: Date.now()
    });
  }

  // ===== Secure Keychain Methods =====

  // Save sensitive data to keychain
  async saveToKeychain(service: string, username: string, password: string): Promise<void> {
    try {
      await Keychain.setGenericPassword(username, password, { service });
    } catch (error) {
      console.error('Keychain save error:', error);
      throw error;
    }
  }

  // Get sensitive data from keychain
  async getFromKeychain(service: string): Promise<{ username: string; password: string } | null> {
    try {
      const credentials = await Keychain.getGenericPassword({ service });
      if (credentials) {
        return {
          username: credentials.username,
          password: credentials.password
        };
      }
      return null;
    } catch (error) {
      console.error('Keychain get error:', error);
      return null;
    }
  }

  // Remove data from keychain
  async removeFromKeychain(service: string): Promise<void> {
    try {
      await Keychain.resetGenericPassword({ service });
    } catch (error) {
      console.error('Keychain remove error:', error);
      throw error;
    }
  }
}

export default StorageService;
