import React from 'react'
import { Eye, EyeOff } from 'lucide-react'
import clsx from 'clsx'

interface BalanceCardProps {
  balance: number
  currency: 'USD' | 'BTC' | 'ETH'
  isHidden: boolean
  onToggleHidden: () => void
}

export function BalanceCard({ balance, currency, isHidden, onToggleHidden }: BalanceCardProps) {
  const formatBalance = (value: number): string => {
    if (currency === 'USD') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value)
    }
    return value.toFixed(8)
  }

  return (
    <div
      className={clsx(
        'mx-4 p-8 rounded-3xl',
        'bg-gradient-to-br from-exodus-card via-exodus-bg to-exodus-bg',
        'border border-exodus-border-light',
        'shadow-lg',
        'flex flex-col items-center justify-center gap-6',
        'backdrop-blur-sm',
        'animate-fade-in'
      )}
    >
      {/* Logo with subtle glow */}
      <div className={clsx(
        'text-5xl font-extrabold',
        'bg-gradient-to-br from-exodus-accent to-exodus-accent-light',
        'bg-clip-text text-transparent',
        'drop-shadow-lg'
      )}>
        XO
      </div>

      {/* Balance Section */}
      <div className="text-center w-full space-y-3">
        <p className="text-exodus-muted text-sm font-medium tracking-wide uppercase">
          Total Balance
        </p>
        
        <div className="flex items-center gap-3 justify-center">
          <h1 className={clsx(
            'text-5xl font-extrabold text-exodus-text',
            'tracking-tight',
            'transition-all duration-200'
          )}>
            {isHidden ? (
              <span className="text-exodus-muted">••••••</span>
            ) : (
              formatBalance(balance)
            )}
          </h1>
          
          <button
            onClick={onToggleHidden}
            className={clsx(
              'p-2.5 rounded-lg',
              'transition-all duration-200 ease-smooth',
              'hover:bg-exodus-accent/20 hover:text-exodus-accent',
              'active:scale-95',
              'text-exodus-muted',
              isHidden ? 'hover:text-exodus-accent' : 'hover:text-exodus-text'
            )}
            aria-label={isHidden ? 'Show balance' : 'Hide balance'}
            title={isHidden ? 'Show balance' : 'Hide balance'}
          >
            {isHidden ? <EyeOff size={22} strokeWidth={1.5} /> : <Eye size={22} strokeWidth={1.5} />}
          </button>
        </div>
        
        <p className="text-exodus-muted-light text-xs font-medium tracking-widest">
          {currency}
        </p>
      </div>

      {/* Divider */}
      <div className="w-12 h-px bg-gradient-to-r from-transparent via-exodus-border to-transparent" />

      {/* Quick Actions */}
      <div className="flex gap-3 pt-2 w-full">
        <button
          className={clsx(
            'flex-1 py-3.5 px-4 rounded-xl font-semibold',
            'bg-gradient-to-r from-exodus-accent to-exodus-accent-light',
            'text-exodus-bg',
            'hover:shadow-lg hover:shadow-exodus-accent/30',
            'hover:scale-105',
            'active:scale-95',
            'transition-all duration-200 ease-snappy',
            'text-sm tracking-wide',
            'touch-target'
          )}
        >
          Send
        </button>
        
        <button
          className={clsx(
            'flex-1 py-3.5 px-4 rounded-xl font-semibold',
            'border-2 border-exodus-accent',
            'bg-exodus-accent/10',
            'text-exodus-accent',
            'hover:bg-exodus-accent/20 hover:shadow-lg',
            'hover:shadow-exodus-accent/20',
            'active:scale-95',
            'transition-all duration-200 ease-smooth',
            'text-sm tracking-wide',
            'touch-target'
          )}
        >
          Receive
        </button>
      </div>
    </div>
  )
}
