import React, { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import { AssetCard } from '@/components/AssetCard'
import clsx from 'clsx'

export function WalletScreen() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'value' | 'name'>('value')

  const allAssets = [
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
    },
    {
      symbol: 'DAI',
      name: 'Dai Stablecoin',
      balance: 3200,
      price: 1.0,
      priceChange24h: -0.1
    },
    {
      symbol: 'USDT',
      name: 'Tether',
      balance: 2100,
      price: 1.0,
      priceChange24h: 0.05
    }
  ]

  const filteredAssets = useMemo(() => {
    let result = allAssets.filter(asset =>
      asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (sortBy === 'value') {
      result.sort((a, b) => (b.balance * b.price) - (a.balance * a.price))
    } else {
      result.sort((a, b) => a.symbol.localeCompare(b.symbol))
    }

    return result
  }, [searchQuery, sortBy])

  const totalValue = allAssets.reduce((sum, asset) => sum + (asset.balance * asset.price), 0)

  return (
    <div className={clsx('pb-32 bg-exodus-bg min-h-screen')}>
      {/* Header */}
      <div
        className={clsx(
          'sticky top-0 z-40 pt-safe px-4 py-3.5',
          'bg-exodus-bg/95 backdrop-blur-sm border-b border-exodus-border'
        )}
      >
        <h1 className="text-2xl font-bold text-exodus-text mb-4">Your Assets</h1>

        {/* Search */}
        <div className="relative mb-4">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-exodus-muted pointer-events-none" />
          <input
            type="text"
            placeholder="Search assets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={clsx(
              'w-full pl-11 pr-4 py-3 rounded-xl',
              'bg-exodus-card border border-exodus-border',
              'text-exodus-text placeholder-exodus-muted',
              'hover:border-exodus-border-light',
              'focus:outline-none focus:border-exodus-accent focus:ring-2 focus:ring-exodus-accent/20',
              'transition-all duration-200',
              'text-sm font-medium'
            )}
          />
        </div>

        {/* Sort Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setSortBy('value')}
            className={clsx(
              'px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-200',
              sortBy === 'value'
                ? 'bg-gradient-to-r from-exodus-accent to-exodus-accent-light text-exodus-bg shadow-md'
                : 'bg-exodus-card text-exodus-muted hover:text-exodus-text hover:border-exodus-border-light border border-exodus-border'
            )}
          >
            By Value
          </button>
          <button
            onClick={() => setSortBy('name')}
            className={clsx(
              'px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-200',
              sortBy === 'name'
                ? 'bg-gradient-to-r from-exodus-accent to-exodus-accent-light text-exodus-bg shadow-md'
                : 'bg-exodus-card text-exodus-muted hover:text-exodus-text hover:border-exodus-border-light border border-exodus-border'
            )}
          >
            By Name
          </button>
        </div>
      </div>

      {/* Total Portfolio */}
      <div className={clsx(
        'px-4 py-6 border-b border-exodus-border',
        'bg-gradient-to-r from-exodus-card/50 to-exodus-bg'
      )}>
        <p className="text-exodus-muted-light text-sm font-medium uppercase tracking-wide">Total Portfolio Value</p>
        <p className="text-4xl font-extrabold text-exodus-text mt-2 tracking-tight">
          ${totalValue.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
        </p>
      </div>

      {/* Assets List */}
      <div className="p-4 space-y-2.5 max-w-2xl mx-auto">
        {filteredAssets.length > 0 ? (
          filteredAssets.map((asset) => (
            <AssetCard
              key={asset.symbol}
              {...asset}
              onClick={() => console.log(`View ${asset.symbol}`)}
            />
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-exodus-muted">No assets found</p>
          </div>
        )}
      </div>
    </div>
  )
}
