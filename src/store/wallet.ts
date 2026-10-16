import { create } from 'zustand'
import { DerivedKey } from '@/crypto/wallet'

export interface Asset {
  id: string
  symbol: string
  name: string
  balance: number
  price: number
  chain: 'ethereum' | 'bitcoin'
  icon?: string
}

interface WalletStore {
  seed: string | null
  ethKey: DerivedKey | null
  btcKey: DerivedKey | null
  assets: Asset[]
  totalBalance: number
  isLocked: boolean
  
  setSeed: (seed: string) => void
  setKeys: (eth: DerivedKey, btc: DerivedKey) => void
  setAssets: (assets: Asset[]) => void
  setTotalBalance: (balance: number) => void
  lock: () => void
  unlock: () => void
  reset: () => void
}

export const useWallet = create<WalletStore>((set) => ({
  seed: null,
  ethKey: null,
  btcKey: null,
  assets: [],
  totalBalance: 0,
  isLocked: false,
  
  setSeed: (seed) => set({ seed }),
  setKeys: (eth, btc) => set({ ethKey: eth, btcKey: btc }),
  setAssets: (assets) => set({ assets }),
  setTotalBalance: (balance) => set({ totalBalance: balance }),
  lock: () => set({ isLocked: true }),
  unlock: () => set({ isLocked: false }),
  reset: () => set({
    seed: null,
    ethKey: null,
    btcKey: null,
    assets: [],
    totalBalance: 0,
    isLocked: true
  })
}))
