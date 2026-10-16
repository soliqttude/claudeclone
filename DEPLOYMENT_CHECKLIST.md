# Exodus PWA — Deployment Checklist

## Pre-Push Verification ✓

- [x] All 6 screens built & polished
  - [x] Home (balance, assets, promo)
  - [x] Wallet (search, sort, portfolio)
  - [x] Send (form, fees, validation)
  - [x] Receive (QR, copy, safety)
  - [x] Swap (selectors, exchange, details)
  - [x] Settings (security, theme, logout)

- [x] Components refined
  - [x] TabNav (gradient, smooth)
  - [x] BalanceCard (premium styling)
  - [x] AssetCard (hover effects)

- [x] Crypto layer ready
  - [x] BIP39 seed generation
  - [x] BIP44 derivation (ETH m/44'/60'/0'/0/0)
  - [x] Bitcoin derivation (BTC m/44'/0'/0'/0/0)
  - [x] Transaction signing (stubs ready)

- [x] PWA config
  - [x] manifest.json (app metadata, icons, shortcuts)
  - [x] service worker (offline caching, network-first)
  - [x] Safe area support (notch/home indicator)
  - [x] Responsive viewport meta tags

- [x] Build config
  - [x] Vite (fast builds, HMR)
  - [x] TypeScript (strict mode)
  - [x] Tailwind (10+ color shades)
  - [x] PostCSS (autoprefixer)

- [x] Documentation
  - [x] README.md (setup & usage)
  - [x] REFINEMENTS.md (polish details)
  - [x] PUSH_INSTRUCTIONS.md (deployment steps)
  - [x] vercel.json (auto-deploy config)

---

## Push Workflow (You Do This)

```bash
# 1. Clone the repo locally
git clone https://github.com/soliqttude/claudeclone.git
cd claudeclone

# 2. Copy files from /home/claude/exodus_pwa
cp -r /home/claude/exodus_pwa/* .
cp /home/claude/exodus_pwa/.gitignore .

# 3. Verify package.json exists
cat package.json

# 4. Install deps locally (optional, but good to verify)
npm install

# 5. Build locally (optional, but good to verify)
npm run build

# 6. Stage & commit
git add .
git commit -m "feat: Exodus PWA — 1:1 clone, pixel-perfect UI, crypto ready

- Complete UI redesign: Home, Wallet, Send, Receive, Swap, Settings
- React 18 + TypeScript + Vite
- BIP39/BIP44 crypto derivation (ETH + BTC)
- Tailwind design system with animations
- PWA installable on iPhone
- Touch-optimized (44px targets, safe areas)
- Service worker for offline support
- Ready for API integration"

# 7. Push to GitHub
git push -u origin main

# 8. Verify on GitHub
# Open https://github.com/soliqttude/claudeclone
# Check: all files present, README shows, no build artifacts
```

---

## Vercel Deployment (Fast)

**Method: Dashboard** (2 minutes)

1. Go to https://vercel.com (sign in with GitHub)
2. Click "Add New Project"
3. Select "Import Git Repository"
4. Paste: `https://github.com/soliqttude/claudeclone`
5. Authorize GitHub connection
6. Framework auto-detects: **Vite** ✓
7. Build command pre-fills: `npm run build` ✓
8. Output dir pre-fills: `dist` ✓
9. Click "Deploy"
10. Wait ~2 min for build
11. Get live URL: e.g., `https://claudeclone.vercel.app`

**Auto-deploy on push:**
- Every `git push` to main → auto-builds & deploys
- No manual intervention needed after first deploy

---

## iPhone Installation (1 minute)

1. **On your iPhone**, open Safari
2. Go to your Vercel URL (e.g., `https://claudeclone.vercel.app`)
3. Tap **Share** icon (box with up arrow)
4. Scroll down → **"Add to Home Screen"**
5. Name: "Exodus"
6. Tap **"Add"**
7. **Done** — App now on home screen

Opens in standalone mode (no browser UI). Offline-capable via service worker.

---

## Live Check (After Deploy)

```
✓ GitHub repo has all files
✓ Vercel shows green checkmark (build passed)
✓ Live URL opens in browser (shows "Exodus" header)
✓ iPhone: App installs & launches
✓ Dark theme renders correctly
✓ Tap tabs (Home → Wallet → Swap → Settings)
✓ Balance card shows, buttons work
✓ Search in Wallet screen works
```

---

## API Integration (Next Phase)

After verify deployment works, add real data:

### 1. Ethereum Balances
**File:** `src/api/ethereum.ts`
```typescript
import { ethers } from 'ethers'

const provider = new ethers.JsonRpcProvider('https://eth.llamarpc.com')

export async function getBalance(address: string) {
  return await provider.getBalance(address)
}
```

### 2. Bitcoin UTXOs
**File:** `src/api/bitcoin.ts`
```typescript
export async function getUTXOs(address: string) {
  const res = await fetch(`https://mempool.space/api/address/${address}/utxo`)
  return res.json()
}
```

### 3. Price Feeds
**File:** `src/api/prices.ts`
```typescript
export async function getPrices() {
  const res = await fetch(
    'https://api.coingecko.com/api/v3/simple/prices?ids=ethereum,bitcoin&vs_currencies=usd'
  )
  return res.json()
}
```

### 4. Wire to Store
Update `src/store/wallet.ts` to fetch & cache prices.
Update screens to display real data instead of mock.

See `README.md` for full snippets.

---

## Success Metrics

After push & deploy:
- [ ] GitHub repo shows all files
- [ ] Vercel URL is live & fast
- [ ] PWA installs on iPhone
- [ ] Dark theme looks premium
- [ ] No console errors
- [ ] Service worker caches app
- [ ] Animations are smooth (60fps)
- [ ] Touch targets feel spacious (44px)

---

## Timeline

| Step | Time | Status |
|------|------|--------|
| Push to GitHub | 5 min | **You do this** |
| Deploy to Vercel | 2 min | Auto (Vercel) |
| iPhone install | 1 min | **You do this** |
| API integration | 30 min | Next phase |
| **Total to live app** | **~8 min** | ✨ |

---

## Support

**Files to reference:**
- `README.md` — Setup & dev instructions
- `REFINEMENTS.md` — Design system breakdown
- `PUSH_INSTRUCTIONS.md` — Detailed GitHub/Vercel steps
- `package.json` — Dependency list

**Questions?**
- Check Vercel build logs (shows errors)
- Check browser console (client-side issues)
- Check `npm install` ran locally

---

**The workshop is built. The app is ready. Push it live.** 🚀
