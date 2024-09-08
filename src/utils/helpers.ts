import CryptoJS from 'crypto-js';

// Função para criar um hash SHA-256
export function hash(data: string) {
  return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
}

// Função para verificar se o hash atende à prova de trabalho (proof of work)
export function isHashProofed({ hash, difficulty = 4, prefix = '0' }: { hash: string, difficulty?: number, prefix?: string }) {
  const check = prefix.repeat(difficulty);
  return hash.startsWith(check);
}
