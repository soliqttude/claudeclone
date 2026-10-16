import React from 'react'
import { Home, Wallet, ArrowLeftRight, Settings } from 'lucide-react'
import clsx from 'clsx'

interface TabNavProps {
  activeTab: 'home' | 'wallet' | 'swap' | 'settings'
  onTabChange: (tab: 'home' | 'wallet' | 'swap' | 'settings') => void
}

export function TabNav({ activeTab, onTabChange }: TabNavProps) {
  const tabs = [
    { id: 'home' as const, icon: Home, label: 'Home' },
    { id: 'wallet' as const, icon: Wallet, label: 'Wallet' },
    { id: 'swap' as const, icon: ArrowLeftRight, label: 'Swap' },
    { id: 'settings' as const, icon: Settings, label: 'Settings' }
  ]

  return (
    <nav
      role="navigation"
      className={clsx(
        'fixed bottom-0 left-0 right-0 z-50',
        'bg-exodus-bg border-t border-exodus-border',
        'backdrop-blur-sm bg-opacity-95',
        'flex justify-around items-center',
        'pt-2 pb-safe px-3',
        'safe:pb-[calc(0.75rem+env(safe-area-inset-bottom))]'
      )}
    >
      {tabs.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={clsx(
            'flex flex-col items-center justify-center gap-0.5',
            'px-3 py-2.5 rounded-xl',
            'transition-all duration-200 ease-smooth',
            'active:scale-95',
            'touch-target h-12 w-14',
            activeTab === id
              ? clsx(
                  'text-exodus-accent bg-gradient-to-b from-exodus-accent/15 to-exodus-accent/5',
                  'shadow-inner'
                )
              : clsx(
                  'text-exodus-muted hover:text-exodus-text-secondary',
                  'hover:bg-exodus-card-hover/50'
                )
          )}
          aria-label={label}
          aria-current={activeTab === id ? 'page' : undefined}
          title={label}
        >
          <Icon 
            size={24} 
            strokeWidth={1.5}
            className="transition-transform duration-200"
          />
          <span className="text-[10px] font-semibold tracking-tight leading-none">
            {label}
          </span>
        </button>
      ))}
    </nav>
  )
}
