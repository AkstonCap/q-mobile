// Nexus API Service for React Native
// Handles all communication with the Nexus blockchain node

import axios, { AxiosInstance } from 'axios';

export interface SessionResponse {
  session: string;
  genesis: string;
}

export interface AccountInfo {
  address: string;
  balance: number;
  token: string;
  name?: string;
}

export interface TransactionInfo {
  txid: string;
  type: string;
  timestamp: number;
  amount: number;
  from?: string;
  to?: string;
  reference?: string;
}

class NexusAPI {
  private nodeUrl: string;
  private axiosInstance: AxiosInstance;

  constructor(nodeUrl: string = 'http://localhost:8080') {
    this.axiosInstance = axios.create({
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.nodeUrl = nodeUrl;
    this.validateAndSetNodeUrl(nodeUrl);
  }

  // Validate and set node URL with HTTPS enforcement
  validateAndSetNodeUrl(url: string): void {
    try {
      const urlObj = new URL(url);
      
      // SECURITY: Enforce HTTPS for remote connections
      if (urlObj.hostname !== 'localhost' && 
          urlObj.hostname !== '127.0.0.1' && 
          !urlObj.hostname.startsWith('192.168.') &&
          !urlObj.hostname.startsWith('10.') &&
          urlObj.protocol === 'http:') {
        throw new Error('HTTPS is required for remote connections. Use https:// instead of http://');
      }
      
      this.nodeUrl = url;
      this.axiosInstance.defaults.baseURL = url;
    } catch (error: any) {
      if (error.message.includes('HTTPS is required')) {
        throw error;
      }
      throw new Error('Invalid node URL format');
    }
  }

  // Set node URL (with validation)
  setNodeUrl(url: string): void {
    this.validateAndSetNodeUrl(url);
  }

  // Make API request
  async request(endpoint: string, params: any = {}): Promise<any> {
    try {
      const response = await this.axiosInstance.post(`/${endpoint}`, params);
      
      if (response.data.error) {
        throw new Error(response.data.error.message || 'API Error');
      }

      return response.data;
    } catch (error: any) {
      console.error('API Request failed:', error);
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error.message || error.response.data.error);
      }
      throw error;
    }
  }

  // ===== SESSIONS API =====

  async createSession(username: string, password: string, pin: string): Promise<SessionResponse> {
    const response = await this.request('sessions/create/local', {
      username,
      password,
      pin
    });
    return response.result || response;
  }

  async terminateSession(session: string): Promise<any> {
    return this.request('sessions/terminate/local', { session });
  }

  async unlockSession(pin: string, session: string): Promise<any> {
    return this.request('sessions/unlock/local', {
      pin,
      session,
      notifications: true,
      transactions: true
    });
  }

  async lockSession(pin: string, session: string): Promise<any> {
    return this.request('sessions/lock/local', {
      pin,
      session,
      notifications: false,
      transactions: false
    });
  }

  async getSessionStatus(session: string): Promise<any> {
    return this.request('sessions/status/local', { session });
  }

  // ===== PROFILES API =====

  async createProfile(username: string, password: string, pin: string): Promise<any> {
    return this.request('profiles/create/master', {
      username,
      password,
      pin
    });
  }

  async getProfile(session: string): Promise<any> {
    return this.request('profiles/get/master', { session });
  }

  // ===== FINANCE API =====

  async getAccount(name: string = 'default', session: string): Promise<AccountInfo> {
    const response = await this.request('finance/get/account', {
      name,
      session
    });
    return response.result || response;
  }

  async listAccounts(session: string): Promise<AccountInfo[]> {
    const response = await this.request('finance/list/account', { session });
    return response.result || response;
  }

  async getBalances(session: string): Promise<any> {
    return this.request('finance/get/balances', { session });
  }

  async createAccount(name: string | null, token: string = 'NXS', session: string, pin: string): Promise<any> {
    const params: any = {
      token,
      session,
      pin
    };
    
    if (name) {
      params.name = name;
    }
    
    return this.request('finance/create/account', params);
  }

  async debit(
    accountName: string,
    amount: number,
    recipientAddress: string,
    pin: string,
    reference: string,
    session: string
  ): Promise<any> {
    const params: any = {
      pin,
      session,
      from: accountName,
      amount: parseFloat(amount.toString()),
      to: recipientAddress
    };
    
    if (reference && reference.trim()) {
      params.reference = reference;
    }
    
    return this.request('finance/debit/account', params);
  }

  async credit(txid: string, pin: string, session: string): Promise<any> {
    return this.request('finance/credit/account', {
      pin,
      session,
      txid
    });
  }

  async getTransactions(
    name: string = 'default',
    session: string,
    limit: number = 20,
    sort: string = 'timestamp',
    order: string = 'desc'
  ): Promise<TransactionInfo[]> {
    const response = await this.request('finance/transactions/account', {
      name,
      session,
      limit,
      sort,
      order
    });
    return response.result || response;
  }

  // ===== SYSTEM API =====

  async getSystemInfo(): Promise<any> {
    return this.request('system/get/info');
  }
}

export default NexusAPI;
