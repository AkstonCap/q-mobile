// Wallet Service for React Native
// Main wallet logic and state management

import NexusAPI, { AccountInfo, TransactionInfo } from './NexusAPI';
import StorageService from './StorageService';

export interface WalletInfo {
  username: string | null;
  genesis: string | null;
  isLoggedIn: boolean;
  isLocked: boolean;
}

class WalletService {
  private storage: StorageService;
  private api: NexusAPI | null = null;
  private session: string | null = null;
  private genesis: string | null = null;
  private username: string | null = null;
  private isLocked: boolean = true;

  constructor() {
    this.storage = new StorageService();
  }

  // Initialize wallet service
  async initialize(): Promise<boolean> {
    // Load node URL
    const nodeUrl = await this.storage.getNodeUrl();
    this.api = new NexusAPI(nodeUrl);

    // Check for existing session
    const savedSession = await this.storage.getSession();
    if (savedSession) {
      this.session = savedSession.session;
      this.genesis = savedSession.genesis;
      this.username = savedSession.username;
      this.isLocked = savedSession.isLocked || false;
    }

    return this.isLoggedIn();
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return this.session !== null;
  }

  // Get session information
  getSessionInfo(): any {
    if (!this.isLoggedIn()) {
      return null;
    }
    return {
      session: this.session,
      genesis: this.genesis,
      username: this.username,
      isLocked: this.isLocked
    };
  }

  // Create a new wallet (register profile)
  async createWallet(username: string, password: string, pin: string): Promise<any> {
    if (!this.api) throw new Error('API not initialized');
    
    try {
      const result = await this.api.createProfile(username, password, pin);
      
      // Mark wallet as initialized
      await this.storage.markWalletInitialized(username, result.genesis);
      
      // Create session
      const sessionResult = await this.api.createSession(username, password, pin);
      
      this.session = sessionResult.session;
      this.genesis = sessionResult.genesis;
      this.username = username;
      this.isLocked = true;

      // Save session
      await this.storage.saveSession({
        session: this.session,
        genesis: this.genesis,
        username: this.username,
        isLocked: true
      });

      return {
        success: true,
        genesis: this.genesis,
        username: this.username
      };
    } catch (error) {
      console.error('Failed to create wallet:', error);
      throw error;
    }
  }

  // Login to wallet
  async login(username: string, password: string, pin: string): Promise<any> {
    if (!this.api) throw new Error('API not initialized');
    
    try {
      const result = await this.api.createSession(username, password, pin);
      const sessionData = result.result || result;
      
      this.session = sessionData.session;
      this.genesis = sessionData.genesis;
      this.username = username;
      this.isLocked = true;

      // Save session
      await this.storage.saveSession({
        session: this.session,
        genesis: this.genesis,
        username: this.username,
        isLocked: true
      });

      return {
        success: true,
        genesis: this.genesis,
        username: this.username
      };
    } catch (error) {
      console.error('Failed to login:', error);
      throw error;
    }
  }

  // Unlock wallet with PIN
  async unlock(pin: string): Promise<any> {
    if (!this.api) throw new Error('API not initialized');
    if (!this.session) throw new Error('No active session to unlock');
    if (!pin) throw new Error('PIN is required to unlock session');
    
    try {
      await this.api.unlockSession(pin, this.session);
      this.isLocked = false;

      await this.storage.saveSession({
        session: this.session!,
        genesis: this.genesis!,
        username: this.username!,
        isLocked: false
      });

      return { success: true };
    } catch (error) {
      console.error('Failed to unlock wallet:', error);
      throw error;
    }
  }

  // Lock wallet
  async lock(pin: string): Promise<any> {
    if (!this.api) throw new Error('API not initialized');
    
    try {
      if (this.session) {
        await this.api.lockSession(pin, this.session);
      }
      
      this.isLocked = true;

      await this.storage.saveSession({
        session: this.session!,
        genesis: this.genesis!,
        username: this.username!,
        isLocked: true
      });

      return { success: true };
    } catch (error) {
      console.error('Failed to lock wallet:', error);
      throw error;
    }
  }

  // Logout
  async logout(): Promise<any> {
    if (this.api && this.session) {
      try {
        await this.api.terminateSession(this.session);
      } catch (error) {
        console.error('Failed to terminate session:', error);
      }
    }

    this.session = null;
    this.genesis = null;
    this.username = null;
    this.isLocked = true;

    await this.storage.clearSession();
    
    return { success: true };
  }

  // Get account balance
  async getBalance(accountName: string = 'default'): Promise<AccountInfo> {
    if (!this.api) throw new Error('API not initialized');
    if (!this.session) throw new Error('No active session');
    
    try {
      const account = await this.api.getAccount(accountName, this.session);
      return {
        balance: account.balance || 0,
        address: account.address,
        token: account.token || 'NXS'
      };
    } catch (error) {
      console.error('Failed to get balance:', error);
      throw error;
    }
  }

  // List all accounts
  async listAccounts(): Promise<AccountInfo[]> {
    if (!this.api) throw new Error('API not initialized');
    if (!this.session) throw new Error('No active session');
    
    try {
      return await this.api.listAccounts(this.session);
    } catch (error) {
      console.error('Failed to list accounts:', error);
      throw error;
    }
  }

  // Get account address
  async getAccountAddress(accountName: string = 'default'): Promise<string> {
    if (!this.api) throw new Error('API not initialized');
    if (!this.session) throw new Error('No active session');
    
    try {
      const account = await this.api.getAccount(accountName, this.session);
      return account.address;
    } catch (error) {
      console.error('Failed to get account address:', error);
      throw error;
    }
  }

  // Create a new account
  async createAccount(name: string | null, token: string = '0', pin: string): Promise<any> {
    if (!this.api) throw new Error('API not initialized');
    if (!this.session) throw new Error('No active session');
    
    try {
      const DISTORDIA_FEE = 0.01;
      const NEXUS_FEE = 0.01;
      const totalFees = NEXUS_FEE + DISTORDIA_FEE;
      
      const nxsBalance = await this.getBalance('default');
      if (nxsBalance.balance < totalFees) {
        throw new Error(`Insufficient NXS in default account for fees. Need ${totalFees} NXS`);
      }
      
      const result = await this.api.createAccount(name, token, this.session, pin);
      
      // Charge service fee
      const DISTORDIA_FEE_ADDRESS = '8Csmb3RP227N1NHJDH8QZRjZjobe4udaygp7aNv5VLPWDvLDVD7';
      try {
        await this.api.debit('default', DISTORDIA_FEE, DISTORDIA_FEE_ADDRESS, pin, '', this.session);
      } catch (feeError) {
        console.error('Failed to charge service fee:', feeError);
      }
      
      return result;
    } catch (error) {
      console.error('Failed to create account:', error);
      throw error;
    }
  }

  // Send transaction
  async send(
    accountName: string,
    amount: number,
    recipientAddress: string,
    pin: string,
    reference: string = ''
  ): Promise<any> {
    if (!this.api) throw new Error('API not initialized');
    if (!this.session) throw new Error('No active session');
    
    try {
      const parsedAmount = parseFloat(amount.toString());
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        throw new Error('Invalid amount');
      }

      if (!pin || pin.length < 4) {
        throw new Error('Valid PIN is required');
      }

      const accountInfo = await this.getBalance(accountName);
      const isNXS = accountInfo.token === '0' || accountInfo.token === 'NXS' || !accountInfo.token;
      
      if (parsedAmount > accountInfo.balance) {
        throw new Error('Insufficient balance');
      }

      const DISTORDIA_FEE_ADDRESS = '8Csmb3RP227N1NHJDH8QZRjZjobe4udaygp7aNv5VLPWDvLDVD7';
      const NEXUS_FEE = 0.01;
      let distordiaFee = 0;
      
      if (isNXS) {
        const calculated = parsedAmount * 0.001;
        distordiaFee = Math.max(calculated, 0.000001);
      } else {
        distordiaFee = 0.01;
      }
      
      const totalFees = distordiaFee + NEXUS_FEE;

      const nxsBalance = await this.getBalance('default');
      if (nxsBalance.balance < totalFees) {
        throw new Error(`Insufficient NXS in default account for fees. Need ${totalFees} NXS`);
      }

      // Send transaction
      const result = await this.api.debit(accountName, parsedAmount, recipientAddress, pin, reference, this.session);

      // Charge service fee
      try {
        await this.api.debit('default', distordiaFee, DISTORDIA_FEE_ADDRESS, pin, '', this.session);
      } catch (feeError) {
        console.error('Failed to charge service fee:', feeError);
      }

      return result;
    } catch (error) {
      console.error('Failed to send transaction:', error);
      throw error;
    }
  }

  // Get transaction history
  async getTransactions(accountName: string = 'default', limit: number = 100): Promise<TransactionInfo[]> {
    if (!this.api) throw new Error('API not initialized');
    if (!this.session) throw new Error('No active session');
    
    try {
      const transactions = await this.api.getTransactions(accountName, this.session, limit);
      await this.storage.saveTransactions(transactions);
      return transactions;
    } catch (error) {
      console.error('Failed to get transactions:', error);
      return await this.storage.getTransactions();
    }
  }

  // Update node URL
  async updateNodeUrl(url: string): Promise<void> {
    await this.storage.saveNodeUrl(url);
    if (this.api) {
      this.api.setNodeUrl(url);
    }
  }

  // Get node URL
  async getNodeUrl(): Promise<string> {
    return await this.storage.getNodeUrl();
  }

  // Get wallet info
  getWalletInfo(): WalletInfo {
    return {
      username: this.username,
      genesis: this.genesis,
      isLoggedIn: this.isLoggedIn(),
      isLocked: this.isLocked
    };
  }

  // Check if wallet is initialized
  async isWalletInitialized(): Promise<boolean> {
    return await this.storage.isWalletInitialized();
  }
}

export default WalletService;
