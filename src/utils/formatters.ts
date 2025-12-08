// Utility functions for the Q-Mobile wallet

/**
 * Format NXS amount to display with proper decimals
 */
export const formatNXS = (amount: number, decimals: number = 6): string => {
  return amount.toFixed(decimals);
};

/**
 * Format address for display (truncate middle)
 */
export const formatAddress = (address: string, startChars: number = 10, endChars: number = 10): string => {
  if (address.length <= startChars + endChars) {
    return address;
  }
  return `${address.substring(0, startChars)}...${address.substring(address.length - endChars)}`;
};

/**
 * Format timestamp to readable date
 */
export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
};

/**
 * Validate Nexus address format
 * Nexus addresses use base58 encoding which excludes 0, O, I, l
 */
export const isValidAddress = (address: string): boolean => {
  // Base58 character set (excluding 0, O, I, l)
  const base58Regex = /^[1-9A-HJ-NP-Za-km-z]+$/;
  return address.length > 30 && base58Regex.test(address);
};

/**
 * Validate amount format
 */
export const isValidAmount = (amount: string): boolean => {
  const num = parseFloat(amount);
  return !isNaN(num) && num > 0;
};

/**
 * Validate PIN format
 */
export const isValidPin = (pin: string): boolean => {
  return /^\d{4,8}$/.test(pin);
};

/**
 * Calculate transaction fee
 */
export const calculateFee = (amount: number, isNXS: boolean): number => {
  const NEXUS_FEE = 0.01;
  let distordiaFee = 0;
  
  if (isNXS) {
    const calculated = amount * 0.001;
    distordiaFee = Math.max(calculated, 0.000001);
  } else {
    distordiaFee = 0.01;
  }
  
  return NEXUS_FEE + distordiaFee;
};
