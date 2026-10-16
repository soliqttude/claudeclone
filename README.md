# Exodus PWA — 1:1 Crypto Wallet Clone

A pixel-perfect iOS-optimized Exodus wallet clone built as a Progressive Web App. Self-custody, no servers, pure client-side crypto operations.

## Features

✅ **Exact Exodus UI** — Bottom tab nav, balance cards, asset lists, dark theme  
✅ **Multi-coin support** — Ethereum + Bitcoin derivation (BIP44)  
✅ **Self-custody** — Seed phrases, private keys never leave your device  
✅ **PWA installable** — "Add to Home Screen" on iPhone  
✅ **Offline ready** — Works without internet (crypto ops local only)  
✅ **iPhone optimized** — Notch/safe area support, touch-friendly (44px+ targets)  
✅ **Send/Receive** — Address display, QR codes, transaction forms  
✅ **Swap preview** — DEX integration hooks ready  

## Tech Stack

- **Frontend:** React 18 + TypeScript + Tailwind CSS
- **Build:** Vite (instant HMR)
- **Crypto:** ethers.js (EVM), bitcoinjs-lib (BTC), bip39/bip32 (derivation)
- **State:** Zustand (lightweight)
- **PWA:** Service Worker + Web App Manifest
- **Deployment:** Vercel (free tier)

## Local Setup

```bash
# Clone the repo
git clone https://github.com/soliqttude/claudeclone.git exodus_pwa
cd exodus_pwa

# Install deps
npm install

# Dev server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### First Run

1. Open `http://localhost:3000` in browser
2. Create or import a seed phrase
3. Wallet auto-derives ETH + BTC addresses (BIP44 paths)
4. All crypto operations happen locally — no server needed

## Project Structure

```
src/
├── screens/          # Pages (Home, Wallet, Send, Receive, Swap, Settings)
├── components/       # Reusable UI (TabNav, BalanceCard, AssetCard)
├── crypto/          # Seed generation, derivation, signing (wallet.ts)
├── store/           # Zustand wallet state (wallet.ts)
├── api/             # RPC endpoints, price feeds (ready for integration)
├── utils/           # Format, validation helpers
├── PWA/             # Service worker config
└── main.tsx         # React entry point

public/
├── manifest.json    # PWA app metadata
└── sw.js           # Service worker (offline support)
```

## Deployment to Vercel

### Option 1: CLI (Fastest)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts, link to your GitHub repo
# Vercel auto-builds on push to main
```

### Option 2: GitHub Integration

1. Push repo to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" → Select your GitHub repo
4. Vercel auto-detects Vite, builds, deploys
5. Get live URL (e.g., `https://exodus-pwa.vercel.app`)

### Option 3: Manual Build + Deploy

```bash
# Build locally
npm run build

# Deploy dist/ folder to Vercel with CLI
vercel --prod
```

## PWA Installation

### iPhone (iOS 15+)

1. Open wallet in Safari
2. Tap Share → Add to Home Screen
3. Named "Exodus", installable offline

### Android Chrome

1. Open wallet
2. Menu (⋮) → Install app
3. Auto-installs to home screen

## API Integration (Next Steps)

Currently uses mock data. To integrate real data:

**1. Ethereum balances** (ethers.js):
```typescript
// src/api/ethereum.ts
const provider = new ethers.JsonRpcProvider('https://eth.llamarpc.com')
const balance = await provider.getBalance(address)
```

**2. Bitcoin UTXOs** (Mempool API):
```typescript
// src/api/bitcoin.ts
const utxos = await fetch(`https://mempool.space/api/address/${address}/utxo`)
```

**3. Price feeds** (CoinGecko):
```typescript
// src/api/prices.ts
const prices = await fetch('https://api.coingecko.com/api/v3/simple/prices?ids=ethereum,bitcoin')
```

**4. Transaction broadcast**:
```typescript
// Sign locally, broadcast to RPC
await provider.sendTransaction(signedTx)
```

## Security Notes

⚠️ **This is a demo. For real crypto:**
- Use production RPC endpoints (Alchemy, Infura)
- Implement proper key encryption (argon2)
- Add wallet security (2FA, hardware wallet support)
- Audit seed phrase handling (never log, clear memory after use)
- Use HTTPS-only (Vercel auto-enables)

## Customization

### Colors (Exodus theme)
Edit `tailwind.config.js`:
```js
exodus: {
  bg: '#0F0F0F',
  card: '#1A1A1A',
  accent: '#F1941E',  // Orange
  text: '#FFFFFF'
}
```

### Add new coins
1. Add derivation path to `src/crypto/wallet.ts`
2. Add to asset list in screens
3. Integrate RPC endpoint in `src/api/`

### Customize UI
- Screens in `src/screens/`
- Components in `src/components/`
- Colors/spacing in `tailwind.config.js`

## Troubleshooting

**Q: PWA not installing?**  
A: Ensure HTTPS (Vercel auto-enables). Safari iOS requires Apple dev team for full support.

**Q: Crypto operations slow?**  
A: BIP44 derivation is CPU-bound. Cache derived keys in Zustand.

**Q: Missing dependencies?**  
A: Run `npm install` and check `node_modules/` exists.

## License

MIT — fork and customize freely.

## Support

- GitHub Issues: Report bugs
- Docs: See inline comments in source
- Vercel Deployment: Check deployment logs at `vercel.com/dashboard`

---

**Built with ❤️ for self-custody.** Your keys, your coins.
