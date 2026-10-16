import React, { useState } from 'react'
import { ArrowRight, Loader } from 'lucide-react'
import clsx from 'clsx'

export function SendScreen() {
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [selectedAsset, setSelectedAsset] = useState('ETH')
  const [isLoading, setIsLoading] = useState(false)

  const assets = ['ETH', 'BTC', 'USDC', 'DAI']
  const balances: Record<string, number> = {
    ETH: 12.5,
    BTC: 0.8,
    USDC: 5000,
    DAI: 3200
  }

  const handleSend = async () => {
    if (!recipient || !amount) {
      alert('Please fill in all fields')
      return
    }

    setIsLoading(true)
    // Simulate transaction
    await new Promise(resolve => setTimeout(resolve, 2000))
    alert('Transaction sent!')
    setRecipient('')
    setAmount('')
    setIsLoading(false)
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
        <h1 className="text-2xl font-bold text-exodus-text">Send Crypto</h1>
        <p className="text-exodus-muted text-sm mt-1">Transfer to another wallet</p>
      </div>

      {/* Form */}
      <div className="p-4 space-y-5 max-w-2xl mx-auto">
        {/* Asset Selector */}
        <div className="space-y-2">
          <label className="block text-exodus-text text-sm font-bold">
            Select Asset
          </label>
          <select
            value={selectedAsset}
            onChange={(e) => setSelectedAsset(e.target.value)}
            className={clsx(
              'w-full px-4 py-3.5 rounded-xl',
              'bg-exodus-card border border-exodus-border',
              'text-exodus-text placeholder-exodus-muted',
              'hover:border-exodus-border-light',
              'focus:outline-none focus:border-exodus-accent focus:ring-2 focus:ring-exodus-accent/20',
              'transition-all duration-200',
              'font-medium'
            )}
          >
            {assets.map(asset => (
              <option key={asset} value={asset} className="bg-exodus-bg text-exodus-text">
                {asset} (Balance: {balances[asset]})
              </option>
            ))}
          </select>
        </div>

        {/* Recipient */}
        <div className="space-y-2">
          <label className="block text-exodus-text text-sm font-bold">
            Recipient Address
          </label>
          <input
            type="text"
            placeholder="0x... or bitcoin address"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className={clsx(
              'w-full px-4 py-3.5 rounded-xl',
              'bg-exodus-card border border-exodus-border',
              'text-exodus-text placeholder-exodus-muted',
              'hover:border-exodus-border-light',
              'focus:outline-none focus:border-exodus-accent focus:ring-2 focus:ring-exodus-accent/20',
              'transition-all duration-200',
              'font-mono text-sm'
            )}
          />
        </div>

        {/* Amount */}
        <div className="space-y-2">
          <div className="flex items-end justify-between">
            <label className="block text-exodus-text text-sm font-bold">
              Amount
            </label>
            <p className="text-exodus-muted text-xs font-medium">
              Bal: <span className="text-exodus-text">{balances[selectedAsset]}</span> {selectedAsset}
            </p>
          </div>
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
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

        {/* Fee Estimate */}
        <div className={clsx(
          'p-4 rounded-xl bg-gradient-to-br from-exodus-card to-exodus-bg',
          'border border-exodus-border-light'
        )}>
          <div className="flex justify-between items-center">
            <span className="text-exodus-muted text-sm font-medium">Network Fee</span>
            <span className="text-exodus-accent font-bold">0.005 {selectedAsset}</span>
          </div>
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-exodus-border-light">
            <span className="text-exodus-muted text-sm font-medium">Total</span>
            <span className="text-exodus-text font-bold">
              {(parseFloat(amount || '0') + 0.005).toFixed(8)} {selectedAsset}
            </span>
          </div>
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={isLoading || !recipient || !amount}
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
              Processing...
            </>
          ) : (
            <>
              <ArrowRight size={20} strokeWidth={2.5} />
              Send Transaction
            </>
          )}
        </button>
      </div>
    </div>
  )
}
