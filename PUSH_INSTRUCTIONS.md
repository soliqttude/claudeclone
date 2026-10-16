# Push to GitHub — soliqttude/claudeclone

## Prerequisites
- Git installed locally
- GitHub account access to soliqttude/claudeclone
- SSH keys configured (or GitHub token ready)

## Step 1: Clone or Initialize the Repository

**Option A: If starting fresh**
```bash
cd ~/projects
git clone https://github.com/soliqttude/claudeclone.git
cd claudeclone
rm -rf *  # Clear any existing files (backup first!)
```

**Option B: If repo already exists**
```bash
cd ~/projects/claudeclone
git pull origin main
```

## Step 2: Copy Files from exodus_pwa

From Claude's build output (`/home/claude/exodus_pwa`), copy all files:

```bash
# Copy entire exodus_pwa to claudeclone
cp -r /home/claude/exodus_pwa/* ~/projects/claudeclone/
cp -r /home/claude/exodus_pwa/.gitignore ~/projects/claudeclone/
```

Or manually copy these key files:
- `src/` (all screens, components, crypto, store)
- `public/` (manifest.json, sw.js)
- `package.json`, `tailwind.config.js`, `tsconfig.json`
- `vite.config.ts`, `vercel.json`, `index.html`
- `README.md`, `REFINEMENTS.md`, `postcss.config.js`

## Step 3: Commit & Push

```bash
cd ~/projects/claudeclone

# Stage all files
git add .

# Commit with descriptive message
git commit -m "feat: Exodus 1:1 PWA clone — pixel-perfect UI, crypto engine, iPhone optimized

- Complete UI redesign matching Exodus mobile (dark theme, gradient accents)
- React 18 + TypeScript + Vite (fast builds)
- Crypto layer: BIP39 seed gen → BIP44 derivation (ETH + BTC)
- All 6 screens polished: Home, Wallet, Send, Receive, Swap, Settings
- PWA installable on iPhone (manifest.json + service worker)
- Tailwind design system with 10+ color shades
- Animations: fade-in, slide-up, scale-in, smooth transitions
- Touch-optimized (44px targets, safe areas, notch support)
- Ready for real API integration (Alchemy, CoinGecko, Mempool)
- Deployable to Vercel with one click"

# Push to main branch
git branch -M main
git push -u origin main
```

## Step 4: Verify Push

Check GitHub:
```bash
# Open in browser
https://github.com/soliqttude/claudeclone
```

Verify these appear:
- ✅ All source files in `src/`
- ✅ PWA config in `public/`
- ✅ `README.md` with setup instructions
- ✅ `REFINEMENTS.md` with polish breakdown
- ✅ `package.json` with all deps

## Step 5: Deploy to Vercel

### Option A: Vercel CLI
```bash
npm i -g vercel
cd ~/projects/claudeclone
vercel --prod
# Follow prompts, link to GitHub repo
```

### Option B: Vercel Dashboard (Easiest)
1. Go to https://vercel.com
2. Click "New Project"
3. Select "Import Git Repository"
4. Paste: `https://github.com/soliqttude/claudeclone.git`
5. Select GitHub account → authorize
6. Framework: Vite (auto-detected)
7. Build Command: `npm run build` (pre-filled)
8. Deploy
9. Get live URL (e.g., `https://exodus-pwa.vercel.app`)

## Step 6: Test on iPhone

On iPhone (iOS 15+):
1. Open Safari
2. Go to your Vercel URL (e.g., `https://exodus-pwa.vercel.app`)
3. Tap Share icon
4. Scroll down → "Add to Home Screen"
5. Name it "Exodus"
6. Tap "Add"

App now installed on home screen. Tap to launch.

## Troubleshooting

**Git says "nothing to commit"**
→ Files weren't copied. Check `ls -la` in claudeclone directory.

**Vercel build fails**
→ Check build logs. Usually missing `npm install`. Run locally first: `npm install && npm run build`

**iPhone app won't install**
→ Ensure HTTPS (Vercel auto-enables). Wait 5 min for manifest to cache. Clear Safari cache if needed.

**App shows blank page**
→ Check browser console. Missing Vite build? Run `npm run build` locally.

## Next: API Integration

After deployment works:

1. **Ethereum balances** (Alchemy)
   - Get free API key: https://www.alchemy.com
   - Add to `src/api/ethereum.ts`

2. **Bitcoin UTXOs** (Mempool)
   - Free API: https://mempool.space/api
   - Add to `src/api/bitcoin.ts`

3. **Price feeds** (CoinGecko)
   - Free, no key: https://api.coingecko.com
   - Add to `src/api/prices.ts`

See `README.md` for implementation snippets.

---

**Push happens once. Updates auto-deploy from GitHub on every `git push`.**

Good luck. The workshop is warm. 🔥
