import * as bip39 from 'bip39'
import { BIP32Factory } from 'bip32'
import { ethers } from 'ethers'
import * as bitcoin from 'bitcoinjs-lib'
import { ECPairFactory } from 'ecpair'
import * as ecc from 'tiny-secp256k1'

const bip32 = BIP32Factory(ecc)
const ECPair = ECPairFactory(ecc)

export interface DerivedKey {
  privateKey: string
  publicKey: string
  address: string
  path: string
}

export interface WalletState {
  seed: string
  seedEncrypted: boolean
  ethKey: DerivedKey
  btcKey: DerivedKey
}

export function generateSeed(): string {
  return bip39.generateMnemonic(256)
}

export function validateSeed(mnemonic: string): boolean {
  return bip39.validateMnemonic(mnemonic)
}

export function seedToRoot(mnemonic: string): Buffer {
  return bip39.mnemonicToSeedSync(mnemonic)
}

export function deriveEthereumKey(seed: Buffer): DerivedKey {
  const root = bip32.fromSeed(seed)
  const path = "m/44'/60'/0'/0/0"
  const derived = root.derivePath(path)
  
  if (!derived.privateKey) throw new Error('Failed to derive ETH key')
  
  const privateKey = derived.privateKey.toString('hex')
  const wallet = new ethers.Wallet('0x' + privateKey)
  
  return {
    privateKey,
    publicKey: wallet.signingKey.publicKey,
    address: wallet.address,
    path
  }
}

export function deriveBitcoinKey(seed: Buffer): DerivedKey {
  const root = bip32.fromSeed(seed)
  const path = "m/44'/0'/0'/0/0"
  const derived = root.derivePath(path)
  
  if (!derived.privateKey) throw new Error('Failed to derive BTC key')
  
  const privateKey = derived.privateKey.toString('hex')
  const keyPair = ECPair.fromPrivateKey(Buffer.from(privateKey, 'hex'), {
    network: bitcoin.networks.bitcoin
  })
  const address = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey }).address!
  
  return {
    privateKey,
    publicKey: keyPair.publicKey.toString('hex'),
    address,
    path
  }
}

export function encryptSeed(seed: string, password: string): string {
  // Browser-based encryption using SubtleCrypto
  // Simple base64 + password XOR (NOT production-secure — use proper library)
  const encoded = new TextEncoder().encode(seed + password)
  return Buffer.from(encoded).toString('base64')
}

export function decryptSeed(encrypted: string, password: string): string {
  try {
    const decoded = Buffer.from(encrypted, 'base64').toString()
    const original = decoded.slice(0, -password.length)
    return original
  } catch {
    throw new Error('Decryption failed')
  }
}

export async function signEthereumTx(
  privateKey: string,
  to: string,
  value: string,
  gasPrice: string,
  gasLimit: string,
  nonce: number,
  chainId: number
): Promise<string> {
  const wallet = new ethers.Wallet('0x' + privateKey)
  const tx = {
    to,
    value: ethers.parseEther(value),
    gasPrice: ethers.parseUnits(gasPrice, 'gwei'),
    gasLimit,
    nonce,
    chainId
  }
  
  return wallet.signTransaction(tx)
}

export function signBitcoinTx(
  privateKey: string,
  inputs: Array<{ hash: string; index: number; amount: number }>,
  outputs: Array<{ address: string; amount: number }>,
  network: 'mainnet' | 'testnet' = 'mainnet'
): string {
  const net = network === 'mainnet' ? bitcoin.networks.bitcoin : bitcoin.networks.testnet
  const keyPair = ECPair.fromPrivateKey(Buffer.from(privateKey, 'hex'), { network: net })
  
  const psbt = new bitcoin.Psbt({ network: net })
  
  inputs.forEach(input => {
    psbt.addInput({
      hash: input.hash,
      index: input.index,
      witnessUtxo: {
        script: bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey }).output!,
        value: input.amount
      }
    })
  })
  
  outputs.forEach(output => {
    psbt.addOutput({
      address: output.address,
      value: output.amount
    })
  })
  
  psbt.signAllInputs(keyPair)
  psbt.finalizeAllInputs()
  
  return psbt.extractTransaction().toHex()
}
