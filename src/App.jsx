import { useState, useRef } from 'react'
import html2canvas from 'html2canvas'
import CardPreview from './components/CardPreview'
import EditorPanel from './components/EditorPanel'

const DEFAULT_CARD = {
  name: 'Dragon Knight',
  seriesIcon: null,
  cardImage: null,
  quote: 'The flame that never dies...',
  level: 2,
  cost: 1,
  power: '5500',
  abilityText: '【AUTO】When this card attacks, choose one of your opponent\'s cards and it gets -1000 Power for that turn.',
  cardNumber: 'DK-001',
  rarity: 'R',
  triggerStars: 1,
  bgColor: 'blue',
  borderStyle: 'gold',
}

function App() {
  const [cardData, setCardData] = useState(DEFAULT_CARD)
  const [exporting, setExporting] = useState(false)
  const cardRef = useRef(null)

  const updateCard = (key, value) => {
    setCardData(prev => ({ ...prev, [key]: value }))
  }

  const exportCard = async () => {
    if (!cardRef.current) return
    setExporting(true)
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
      })
      const link = document.createElement('a')
      link.download = `${cardData.name || 'card'}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg, #0a0c14 0%, #111827 50%, #0a0c14 100%)' }}>
      {/* Header */}
      <header className="py-4 px-6 border-b border-gray-700/50 backdrop-blur-sm sticky top-0 z-10"
        style={{ background: 'rgba(10, 12, 20, 0.9)' }}>
        <h1 className="text-2xl font-bold text-center tracking-[0.3em] uppercase font-cinzel"
          style={{ background: 'linear-gradient(90deg, #b8860b, #ffd700, #b8860b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Card Editor
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex flex-col xl:flex-row gap-8 p-6 max-w-7xl mx-auto w-full flex-1">
        {/* Editor Panel */}
        <div className="xl:w-[420px] flex-shrink-0">
          <EditorPanel cardData={cardData} updateCard={updateCard} />
        </div>

        {/* Card Preview */}
        <div className="flex-1 flex flex-col items-center justify-start gap-4 pt-2">
          <p className="text-gray-500 text-sm tracking-widest uppercase font-cinzel">Preview</p>
          <CardPreview ref={cardRef} cardData={cardData} />
          <button
            onClick={exportCard}
            disabled={exporting}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-cinzel font-bold tracking-widest uppercase transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: exporting ? '#333' : 'linear-gradient(135deg, #7d5a00, #ffd700, #b8860b)',
              color: exporting ? '#888' : '#1a0f00',
              boxShadow: exporting ? 'none' : '0 0 20px rgba(255,215,0,0.35)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {exporting ? 'Exporting...' : 'Export PNG'}
          </button>
        </div>
      </main>
    </div>
  )
}

export default App
