import React, { useState } from 'react'
import { ChevronRight, Lock, Eye, Download, LogOut } from 'lucide-react'
import clsx from 'clsx'

export function SettingsScreen() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [showSeed, setShowSeed] = useState(false)
  const [seedVisible, setSeedVisible] = useState(false)

  const mockSeed = 'abandon ability able about above absent abstract bus abuse access accident account achieve acid acoustic acquire across act action actress actual actual actual actual'

  const handleBackupSeed = () => {
    setSeedVisible(!seedVisible)
  }

  const handleLogout = () => {
    if (confirm('Are you sure? This will clear your wallet.')) {
      alert('Logged out')
    }
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
        <h1 className="text-2xl font-bold text-exodus-text">Settings</h1>
        <p className="text-exodus-muted text-sm mt-1">Account & security</p>
      </div>

      {/* Sections */}
      <div className="space-y-7 p-4 max-w-2xl mx-auto">
        {/* Account Section */}
        <div>
          <h2 className="text-exodus-muted-light text-xs font-bold uppercase tracking-widest mb-3.5">
            Account
          </h2>
          <button
            className={clsx(
              'w-full p-4 rounded-2xl bg-exodus-card border border-exodus-border-light',
              'flex items-center justify-between',
              'hover:border-exodus-accent/50 hover:bg-exodus-card-hover',
              'transition-all duration-200 group'
            )}
          >
            <div className="text-left">
              <p className="text-exodus-text font-bold text-sm">Public Address</p>
              <p className="text-exodus-muted text-xs mt-1.5 font-mono">0x1234...5678</p>
            </div>
            <ChevronRight 
              size={20} 
              strokeWidth={2}
              className="text-exodus-muted group-hover:text-exodus-accent transition-colors"
            />
          </button>
        </div>

        {/* Security Section */}
        <div>
          <h2 className="text-exodus-muted-light text-xs font-bold uppercase tracking-widest mb-3.5">
            Security
          </h2>
          <div className="space-y-2.5">
            <button
              className={clsx(
                'w-full p-4 rounded-2xl bg-exodus-card border border-exodus-border-light',
                'flex items-center justify-between',
                'hover:border-exodus-accent/50 hover:bg-exodus-card-hover',
                'transition-all duration-200 group'
              )}
            >
              <div className="flex items-center gap-3.5">
                <div className="p-2 rounded-lg bg-exodus-accent/10">
                  <Lock size={18} strokeWidth={2} className="text-exodus-accent" />
                </div>
                <span className="text-exodus-text font-bold text-sm">Change Password</span>
              </div>
              <ChevronRight 
                size={20}
                strokeWidth={2}
                className="text-exodus-muted group-hover:text-exodus-accent transition-colors"
              />
            </button>

            <button
              onClick={handleBackupSeed}
              className={clsx(
                'w-full p-4 rounded-2xl bg-exodus-card border border-exodus-border-light',
                'flex items-center justify-between',
                'hover:border-exodus-accent/50 hover:bg-exodus-card-hover',
                'transition-all duration-200 group'
              )}
            >
              <div className="flex items-center gap-3.5">
                <div className="p-2 rounded-lg bg-exodus-accent/10">
                  <Download size={18} strokeWidth={2} className="text-exodus-accent" />
                </div>
                <span className="text-exodus-text font-bold text-sm">Backup Seed Phrase</span>
              </div>
              <ChevronRight 
                size={20}
                strokeWidth={2}
                className="text-exodus-muted group-hover:text-exodus-accent transition-colors"
              />
            </button>

            {/* Seed Phrase Display */}
            {showSeed && (
              <div className={clsx(
                'p-4 rounded-2xl bg-gradient-to-br from-exodus-error/20 to-exodus-error/5',
                'border-2 border-exodus-error/40',
                'mt-3 animate-slide-up'
              )}>
                <div className="flex items-center gap-2 mb-3.5">
                  <Eye size={16} strokeWidth={2} className="text-exodus-error" />
                  <p className="text-exodus-error text-xs font-extrabold">KEEP THIS SAFE</p>
                </div>
                {seedVisible ? (
                  <p className="text-exodus-text text-xs font-mono break-all leading-relaxed bg-exodus-bg/30 p-3 rounded-lg">
                    {mockSeed}
                  </p>
                ) : (
                  <button
                    onClick={() => setSeedVisible(true)}
                    className={clsx(
                      'w-full py-2.5 px-3 rounded-lg',
                      'bg-exodus-error/20 hover:bg-exodus-error/30',
                      'text-exodus-error text-xs font-bold',
                      'transition-colors duration-200'
                    )}
                  >
                    Click to reveal seed phrase
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Preferences Section */}
        <div>
          <h2 className="text-exodus-muted-light text-xs font-bold uppercase tracking-widest mb-3.5">
            Preferences
          </h2>
          <div className={clsx(
            'p-4 rounded-2xl bg-exodus-card border border-exodus-border-light',
            'flex items-center justify-between'
          )}>
            <span className="text-exodus-text font-bold text-sm">Theme</span>
            <div className="flex gap-2">
              <button
                onClick={() => setTheme('dark')}
                className={clsx(
                  'px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200',
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-exodus-accent to-exodus-accent-light text-exodus-bg shadow-md'
                    : 'bg-exodus-border text-exodus-muted hover:text-exodus-text'
                )}
              >
                Dark
              </button>
              <button
                onClick={() => setTheme('light')}
                className={clsx(
                  'px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200',
                  theme === 'light'
                    ? 'bg-gradient-to-r from-exodus-accent to-exodus-accent-light text-exodus-bg shadow-md'
                    : 'bg-exodus-border text-exodus-muted hover:text-exodus-text'
                )}
              >
                Light
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div>
          <h2 className="text-exodus-error text-xs font-bold uppercase tracking-widest mb-3.5">
            Danger Zone
          </h2>
          <button
            onClick={handleLogout}
            className={clsx(
              'w-full p-4 rounded-2xl border-2 border-exodus-error/40',
              'bg-gradient-to-r from-exodus-error/15 to-exodus-error/5',
              'hover:border-exodus-error/60 hover:bg-gradient-to-r hover:from-exodus-error/25 hover:to-exodus-error/15',
              'flex items-center justify-between transition-all duration-200 group'
            )}
          >
            <div className="flex items-center gap-3.5">
              <div className="p-2 rounded-lg bg-exodus-error/20">
                <LogOut size={18} strokeWidth={2} className="text-exodus-error" />
              </div>
              <span className="text-exodus-error font-bold text-sm">Logout</span>
            </div>
            <ChevronRight 
              size={20}
              strokeWidth={2}
              className="text-exodus-error group-hover:translate-x-0.5 transition-transform"
            />
          </button>
        </div>
      </div>
    </div>
  )
}
