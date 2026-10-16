import React from 'react'
import { TrendingUp, TrendingDown, ChevronRight } from 'lucide-react'
import clsx from 'clsx'

interface AssetCardProps {
  symbol: string
  name: string
  balance: number
  price: number
  priceChange24h: number
  icon?: string
  onClick?: () => void
}

export function AssetCard({
  symbol,
  name,
  balance,
  price,
  priceChange24h,
  icon,
  onClick
}: AssetCardProps) {
  const usdValue = balance * price
  const isPositive = priceChange24h >= 0

  return (
    <button
      onClick={onClick}
      className={clsx(
        'w-full px-4 py-3.5 rounded-2xl',
        'bg-exodus-card border border-exodus-border',
        'hover:bg-exodus-card-hover hover:border-exodus-border-light',
        'hover:shadow-md',
        'active:scale-95 active:bg-exodus-card',
        'transition-all duration-200 ease-smooth',
        'flex items-center justify-between',
        'group'
      )}
    >
      {/* Left: Icon & Name */}
      <div className="flex items-center gap-3.5 text-left flex-1 min-w-0">
        <div className="flex-shrink-0">
          {icon ? (
            <img
              src={icon}
              alt={symbol}
              className={clsx(
                'w-12 h-12 rounded-full',
                'bg-gradient-to-br from-exodus-border-light to-exodus-border',
                'p-0.5 object-cover',
                'group-hover:shadow-md transition-shadow duration-200'
              )}
            />
          ) : (
            <div className={clsx(
              'w-12 h-12 rounded-full',
              'bg-gradient-to-br from-exodus-accent/20 to-exodus-accent/10',
              'flex items-center justify-center',
              'font-extrabold text-sm',
              'text-exodus-accent',
              'border border-exodus-accent/30'
            )}>
              {symbol[0]}
            </div>
          )}
        </div>

        <div className="min-w-0">
          <p className="text-exodus-text font-bold text-base leading-tight">
            {symbol.toUpperCase()}
          </p>
          <p className="text-exodus-muted text-xs mt-0.5 truncate">
            {name}
          </p>
        </div>
      </div>

      {/* Right: Values */}
      <div className="text-right flex items-center gap-3 flex-shrink-0">
        <div>
          <p className="text-exodus-text font-bold text-sm">
            ${usdValue.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </p>
          <div className={clsx(
            'flex items-center gap-1 justify-end mt-1',
            'font-semibold text-xs',
            'transition-colors duration-200'
          )}>
            {isPositive ? (
              <>
                <TrendingUp size={12} strokeWidth={2.5} className="text-exodus-success" />
                <span className="text-exodus-success">
                  +{priceChange24h.toFixed(2)}%
                </span>
              </>
            ) : (
              <>
                <TrendingDown size={12} strokeWidth={2.5} className="text-exodus-error" />
                <span className="text-exodus-error">
                  {priceChange24h.toFixed(2)}%
                </span>
              </>
            )}
          </div>
        </div>

        <ChevronRight 
          size={18} 
          strokeWidth={2}
          className={clsx(
            'text-exodus-muted',
            'group-hover:text-exodus-accent group-hover:translate-x-0.5',
            'transition-all duration-200'
          )}
        />
      </div>
    </button>
  )
}
