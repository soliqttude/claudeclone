import React, { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Copy, Check } from 'lucide-react'
import clsx from 'clsx'

export function ReceiveScreen() {
  const [selectedAsset, setSelectedAsset] = useState('ETH')
  const [copied, setCopied] = useState(false)

  const addresses: Record<string, string> = {
    ETH: '0x1234567890abcdef1234567890abcdef12345678',
    BTC: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
    USDC: '0x1234567890abcdef1234567890abcdef12345678',
    DAI: '0x1234567890abcdef1234567890abcdef12345678'
  }

  const assets = ['ETH', 'BTC', 'USDC', 'DAI']
  const address = addresses[selectedAsset]

  const handleCopy = () => {
    navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
        <h1 className="text-2xl font-bold text-exodus-text">Receive Crypto</h1>
        <p className="text-exodus-muted text-sm mt-1">Share your address to receive funds</p>
      </div>

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
        </div>

        {/* QR Code */}
        <div className={clsx(
          'p-6 rounded-2xl',
          'bg-gradient-to-br from-exodus-card to-exodus-bg',
          'border border-exodus-border-light',
          'shadow-md',
          'flex items-center justify-center',
          'animate-fade-in'
        )}>
          <div className="p-3 bg-exodus-bg rounded-lg">
            <QRCodeSVG
              value={address}
              size={180}
              level="H"
              marginSize={0}
              bgColor="#0F0F0F"
              fgColor="#FFFFFF"
            />
          </div>
        </div>

        {/* Address Display */}
        <div className={clsx(
          'p-4 rounded-2xl bg-gradient-to-br from-exodus-card to-exodus-bg',
          'border border-exodus-border-light'
        )}>
          <p className="text-exodus-muted-light text-xs mb-3 uppercase tracking-widest font-bold">
            {selectedAsset} Address
          </p>
          <p className="text-exodus-text text-sm break-all font-mono leading-relaxed">
            {address}
          </p>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className={clsx(
            'w-full py-3.5 px-4 rounded-xl font-bold',
            'bg-gradient-to-r from-exodus-accent to-exodus-accent-light',
            'text-exodus-bg',
            'hover:shadow-lg hover:shadow-exodus-accent/30',
            'active:scale-95',
            'transition-all flex items-center justify-center gap-2',
            'touch-target'
          )}
        >
          {copied ? (
            <>
              <Check size={20} strokeWidth={2.5} />
              Copied to Clipboard!
            </>
          ) : (
            <>
              <Copy size={20} strokeWidth={2.5} />
              Copy Address
            </>
          )}
        </button>

        {/* Safety Info */}
        <div className={clsx(
          'p-4 rounded-2xl bg-exodus-card border border-exodus-border-light',
          'space-y-2'
        )}>
          <p className="text-exodus-text text-xs font-bold flex items-center gap-2">
            ⚠️ Important
          </p>
          <ul className="text-exodus-muted text-xs space-y-1.5 font-medium">
            <li className="flex items-start gap-2">
              <span className="text-exodus-success mt-0.5">✓</span>
              <span>Only send {selectedAsset} to this address</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-exodus-success mt-0.5">✓</span>
              <span>Double-check the address before sending</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
