import React, { useState } from 'react'
import { ArrowDownUp, Loader } from 'lucide-react'
import clsx from 'clsx'

export function SwapScreen() {
  const [fromAsset, setFromAsset] = useState('ETH')
  const [toAsset, setToAsset] = useState('USDC')
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const assets = ['ETH', 'BTC', 'USDC', 'DAI', 'USDT']
  const prices: Record<string, number> = {
    ETH: 2250,
    BTC: 42500,
    USDC: 1.0,
    DAI: 1.0,
    USDT: 1.0
  }

  const balances: Record<string, number> = {
    ETH: 12.5,
    BTC: 0.8,
    USDC: 5000,
    DAI: 3200,
    USDT: 2100
  }

  const handleFromChange = (value: string) => {
    setFromAmount(value)
    const estimated = (parseFloat(value) * prices[fromAsset]) / prices[toAsset]
    setToAmount(isNaN(estimated) ? '' : estimated.toFixed(8))
  }

  const handleSwap = async () => {
    if (!fromAmount || !toAmount) {
      alert('Please enter amounts')
      return
    }

    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    alert('Swap executed!')
    setFromAmount('')
    setToAmount('')
    setIsLoading(false)
  }

  const swapAssets = () => {
    setFromAsset(toAsset)
    setToAsset(fromAsset)
    setFromAmount('')
    setToAmount('')
  }

  return (
    <div className={clsx('pb-32 bg-exodus-bg min-h-screen')}>
      {/* Header */}
      <div
        className={clsx(
          'sticky top-0 z-40 pt-safe px-4 py-3.5',
          'bg-exodus-bg/95 backdrop-blur-sm border-b border-exodus-border'
        )}
      >
        <h1 className="text-2xl font-bold text-exodus-text">Swap Crypto</h1>
        <p className="text-exodus-muted text-sm mt-1">Exchange between assets</p>
      </div>

      <div className="p-4 space-y-5 max-w-2xl mx-auto">
        {/* From Asset */}
        <div className="space-y-2">
          <label className="block text-exodus-text text-sm font-bold">
            From
          </label>
          <select
            value={fromAsset}
            onChange={(e) => setFromAsset(e.target.value)}
            className={clsx(
              'w-full px-4 py-3.5 rounded-xl mb-3',
              'bg-exodus-card border border-exodus-border',
              'text-exodus-text',
              'hover:border-exodus-border-light',
              'focus:outline-none focus:border-exodus-accent focus:ring-2 focus:ring-exodus-accent/20',
              'transition-all duration-200',
              'font-medium'
            )}
          >
            {assets.map(asset => (
              <option key={asset} value={asset} className="bg-exodus-bg text-exodus-text">
                {asset} — Balance: {balances[asset]}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="0.00"
            value={fromAmount}
            onChange={(e) => handleFromChange(e.target.value)}
            step={0.00000001}
            className={clsx(
              'w-full px-4 py-3.5 rounded-xl',
              'bg-exodus-card border border-exodus-border',
              'text-exodus-text placeholder-exodus-muted',
              'hover:border-exodus-border-light',
              'focus:outline-none focus:border-exodus-accent focus:ring-2 focus:ring-exodus-accent/20',
              'transition-all duration-200',
              'font-mono text-lg'
            )}
          />
        </div>

        {/* Swap Button */}
        <div className="flex justify-center py-2">
          <button
            onClick={swapAssets}
            className={clsx(
              'p-3.5 rounded-xl',
              'bg-gradient-to-br from-exodus-accent/20 to-exodus-accent/10',
              'border border-exodus-accent/50',
              'text-exodus-accent hover:bg-gradient-to-br hover:from-exodus-accent/30 hover:to-exodus-accent/20',
              'hover:border-exodus-accent/70',
              'active:scale-90',
              'transition-all duration-200',
              'touch-target'
            )}
            title="Swap assets"
          >
            <ArrowDownUp size={22} strokeWidth={2.5} />
          </button>
        </div>

        {/* To Asset */}
        <div className="space-y-2">
          <label className="block text-exodus-text text-sm font-bold">
            To
          </label>
          <select
            value={toAsset}
            onChange={(e) => setToAsset(e.target.value)}
            className={clsx(
              'w-full px-4 py-3.5 rounded-xl mb-3',
              'bg-exodus-card border border-exodus-border',
              'text-exodus-text',
              'hover:border-exodus-border-light',
              'focus:outline-none focus:border-exodus-accent focus:ring-2 focus:ring-exodus-accent/20',
              'transition-all duration-200',
              'font-medium'
            )}
          >
            {assets.map(asset => (
              <option key={asset} value={asset} className="bg-exodus-bg text-exodus-text">
                {asset}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="0.00"
            value={toAmount}
            readOnly
            className={clsx(
              'w-full px-4 py-3.5 rounded-xl',
              'bg-exodus-card/50 border border-exodus-border-light',
              'text-exodus-text/60 placeholder-exodus-muted',
              'cursor-not-allowed font-mono text-lg'
            )}
          />
        </div>

        {/* Price Impact & Details */}
        {fromAmount && toAmount && (
          <div className={clsx(
            'p-4 rounded-2xl',
            'bg-gradient-to-br from-exodus-card to-exodus-bg',
            'border border-exodus-border-light',
            'space-y-3',
            'animate-slide-up'
          )}>
            <div className="flex justify-between items-center">
              <span className="text-exodus-muted-light text-sm font-medium">Price Impact</span>
              <span className="text-exodus-success font-bold text-sm">{'<0.1%'}</span>
            </div>
            <div className="h-px bg-exodus-border" />
            <div className="flex justify-between items-center">
              <span className="text-exodus-muted-light text-sm font-medium">Exchange Rate</span>
              <span className="text-exodus-text font-semibold text-sm">
                1 {fromAsset} = {(prices[toAsset] / prices[fromAsset]).toFixed(4)} {toAsset}
              </span>
            </div>
          </div>
        )}

        {/* Confirm Swap Button */}
        <button
          onClick={handleSwap}
          disabled={isLoading || !fromAmount || !toAmount}
          className={clsx(
            'w-full py-4 px-4 rounded-xl font-bold',
            'bg-gradient-to-r from-exodus-accent to-exodus-accent-light',
            'text-exodus-bg',
            'hover:shadow-lg hover:shadow-exodus-accent/30',
            'active:scale-95',
            'transition-all flex items-center justify-center gap-2',
            'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none',
            'touch-target',
            'mt-8 mb-2'
          )}
        >
          {isLoading ? (
            <>
              <Loader size={20} className="animate-spin" />
              Processing Swap...
            </>
          ) : (
            <>
              <ArrowDownUp size={20} strokeWidth={2.5} />
              Confirm Swap
            </>
          )}
        </button>
      </div>
    </div>
  )
}
