import React, { useState } from 'react'
import { BalanceCard } from '@/components/BalanceCard'
import { AssetCard } from '@/components/AssetCard'
import { ArrowUpRight } from 'lucide-react'
import clsx from 'clsx'

export function HomeScreen() {
  const [balanceHidden, setBalanceHidden] = useState(false)

  // Mock data
  const totalBalance = 45230.50
  const topAssets = [
    {
      symbol: 'ETH',
      name: 'Ethereum',
      balance: 12.5,
      price: 2250,
      priceChange24h: 2.5
    },
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      balance: 0.8,
      price: 42500,
      priceChange24h: 1.2
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      balance: 5000,
      price: 1.0,
      priceChange24h: 0.0
    }
  ]

  return (
    <div className={clsx('pb-32 bg-exodus-bg min-h-screen')}>
      {/* Navbar */}
      <div
        className={clsx(
          'sticky top-0 z-40 pt-safe px-4 py-3.5',
          'bg-exodus-bg/95 backdrop-blur-sm',
          'border-b border-exodus-border',
          'flex items-center justify-center',
          'animate-fade-in'
        )}
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-exodus-accent to-exodus-accent-light flex items-center justify-center text-white text-xs font-extrabold">
            Ø
          </div>
          <h1 className="text-xl font-bold text-exodus-text tracking-tight">Exodus</h1>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6 pt-6">
        {/* Balance Card */}
        <BalanceCard
          balance={totalBalance}
          currency="USD"
          isHidden={balanceHidden}
          onToggleHidden={() => setBalanceHidden(!balanceHidden)}
        />

        {/* Assets Section */}
        <div className="space-y-4 px-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-exodus-text font-bold text-lg">Your Assets</h2>
              <p className="text-exodus-muted text-xs mt-1 font-medium">
                3 assets in portfolio
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            {topAssets.map((asset) => (
              <AssetCard
                key={asset.symbol}
                {...asset}
                onClick={() => console.log(`View ${asset.symbol}`)}
              />
            ))}
          </div>
        </div>

        {/* Promotional Banner */}
        <div className="mx-4">
          <button className={clsx(
            'w-full p-4 rounded-2xl',
            'bg-gradient-to-r from-exodus-accent/30 via-exodus-accent/15 to-exodus-accent/5',
            'border border-exodus-accent/40',
            'hover:border-exodus-accent/60 hover:from-exodus-accent/40',
            'transition-all duration-200',
            'group'
          )}>
            <div className="flex items-start justify-between">
              <div className="text-left">
                <p className="text-exodus-text text-sm font-bold mb-1">
                  ✨ Swap Crypto Anytime
                </p>
                <p className="text-exodus-muted text-xs">
                  Trade between assets with competitive rates
                </p>
              </div>
              <ArrowUpRight 
                size={16} 
                strokeWidth={2.5}
                className="text-exodus-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 flex-shrink-0 mt-0.5"
              />
            </div>
          </button>
        </div>

        {/* Info Footer */}
        <div className="mx-4 p-3.5 rounded-2xl bg-exodus-card border border-exodus-border-light">
          <p className="text-exodus-muted-light text-xs leading-relaxed">
            💡 <span className="font-medium">Tip:</span> Your private keys are stored locally on your device. Exodus never has access to your funds.
          </p>
        </div>
      </div>
    </div>
  )
}
