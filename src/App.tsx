import React, { useState, useEffect } from 'react'
import { TabNav } from '@/components/TabNav'
import { HomeScreen } from '@/screens/Home'
import { WalletScreen } from '@/screens/Wallet'
import { SwapScreen } from '@/screens/Swap'
import { SettingsScreen } from '@/screens/Settings'
import { SendScreen } from '@/screens/Send'
import { ReceiveScreen } from '@/screens/Receive'
import { ChevronLeft } from 'lucide-react'
import clsx from 'clsx'

type Tab = 'home' | 'wallet' | 'swap' | 'settings'

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home')
  const [showSubScreen, setShowSubScreen] = useState<'send' | 'receive' | null>(null)
  const [transition, setTransition] = useState(false)

  // Handle tab transitions
  const handleTabChange = (tab: Tab) => {
    setTransition(true)
    setTimeout(() => {
      setActiveTab(tab)
      setTransition(false)
    }, 150)
  }

  // Install PWA prompt
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(err => {
        console.log('SW registration failed:', err)
      })
    }
  }, [])

  // Handle back from sub-screens with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showSubScreen) {
        setShowSubScreen(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showSubScreen])

  // Back button component
  const BackButton = () => (
    <button
      onClick={() => setShowSubScreen(null)}
      className={clsx(
        'fixed top-safe left-4 z-50',
        'p-2.5 rounded-lg',
        'bg-exodus-card/80 backdrop-blur-sm border border-exodus-border',
        'text-exodus-accent hover:text-exodus-accent-light',
        'hover:bg-exodus-card hover:border-exodus-border-light',
        'transition-all duration-200 active:scale-95',
        'touch-target'
      )}
      aria-label="Back"
      title="Back"
    >
      <ChevronLeft size={20} strokeWidth={2.5} />
    </button>
  )

  // Sub-screens with smooth transitions
  if (showSubScreen === 'send') {
    return (
      <>
        <SendScreen />
        <BackButton />
      </>
    )
  }

  if (showSubScreen === 'receive') {
    return (
      <>
        <ReceiveScreen />
        <BackButton />
      </>
    )
  }

  return (
    <>
      <div
        className={clsx(
          'transition-opacity duration-150',
          transition ? 'opacity-0' : 'opacity-100'
        )}
      >
        {activeTab === 'home' && <HomeScreen />}
        {activeTab === 'wallet' && <WalletScreen />}
        {activeTab === 'swap' && <SwapScreen />}
        {activeTab === 'settings' && <SettingsScreen />}
      </div>

      <TabNav activeTab={activeTab} onTabChange={handleTabChange} />
    </>
  )
}
