import { useRef, useState } from 'react'
import CropModal from './CropModal'

const BG_OPTIONS = [
  { value: 'red', label: 'Red', bg: 'linear-gradient(135deg, #7a0000, #c0392b)', text: '#fff' },
  { value: 'yellow', label: 'Yellow', bg: 'linear-gradient(135deg, #5c3300, #c87000)', text: '#fff' },
  { value: 'blue', label: 'Blue', bg: 'linear-gradient(135deg, #001060, #0033aa)', text: '#fff' },
  { value: 'white', label: 'White', bg: 'linear-gradient(135deg, #e0e0e8, #ffffff)', text: '#333' },
  { value: 'black', label: 'Black', bg: 'linear-gradient(135deg, #111, #333)', text: '#ccc' },
]

const BORDER_OPTIONS = [
  { value: 'bronze', label: 'Bronze', bg: 'linear-gradient(135deg, #cd7f32, #e8960a, #cd7f32)', shadow: 'rgba(205,127,50,0.6)' },
  { value: 'silver', label: 'Silver', bg: 'linear-gradient(135deg, #aaa, #ddd, #aaa)', shadow: 'rgba(192,192,192,0.6)' },
  { value: 'gold', label: 'Gold', bg: 'linear-gradient(135deg, #ffd700, #ffe44d, #ffd700)', shadow: 'rgba(255,215,0,0.6)' },
  { value: 'purple', label: 'Purple', bg: 'linear-gradient(135deg, #8b00ff, #bb44ff, #8b00ff)', shadow: 'rgba(139,0,255,0.6)' },
  { value: 'rainbow', label: 'Rainbow', bg: 'linear-gradient(135deg, #ff0000, #ff7700, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff)', shadow: 'rgba(200,100,255,0.6)', backgroundSize: '200% 200%' },
]

const RARITY_OPTIONS = ['C', 'U', 'R', 'RR', 'SR', 'SP', 'UR']

// Styled label
const Label = ({ children }) => (
  <label className="block text-xs font-cinzel tracking-widest uppercase text-gray-400 mb-1.5">
    {children}
  </label>
)

// Styled text input
const TextInput = ({ value, onChange, placeholder, maxLength, className = '' }) => (
  <input
    type="text"
    value={value}
    onChange={e => onChange(e.target.value)}
    placeholder={placeholder}
    maxLength={maxLength}
    className={`w-full px-3 py-2 rounded-lg text-sm bg-gray-800 border border-gray-600 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-colors ${className}`}
  />
)

// Styled textarea
const TextArea = ({ value, onChange, placeholder, rows = 4 }) => (
  <textarea
    value={value}
    onChange={e => onChange(e.target.value)}
    placeholder={placeholder}
    rows={rows}
    className="w-full px-3 py-2 rounded-lg text-sm bg-gray-800 border border-gray-600 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-colors resize-none"
  />
)

// Number selector with +/- buttons
const NumberSelect = ({ label, value, min = 0, max = 3, onChange }) => (
  <div className="flex flex-col gap-1">
    <Label>{label}</Label>
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="w-8 h-8 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed text-gray-200 font-bold text-lg flex items-center justify-center transition-colors"
      >-</button>
      <span className="w-8 text-center font-cinzel font-bold text-lg text-white">{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="w-8 h-8 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed text-gray-200 font-bold text-lg flex items-center justify-center transition-colors"
      >+</button>
      {/* Quick dots */}
      <div className="flex gap-1 ml-1">
        {Array.from({ length: max + 1 }, (_, i) => (
          <button
            key={i}
            onClick={() => onChange(i)}
            className="w-4 h-4 rounded-full border transition-all"
            style={{
              background: i <= value ? '#4f8eff' : 'transparent',
              borderColor: i <= value ? '#4f8eff' : '#555',
            }}
          />
        ))}
      </div>
    </div>
  </div>
)

// Image upload with crop
const ImageUpload = ({ label, value, onChange, aspect = 1, cropTitle = 'Crop Image', hint = '', previewHeight = 120 }) => {
  const inputRef = useRef(null)
  const [pendingSrc, setPendingSrc] = useState(null)

  const handleFile = (e) => {
    const file = e.target.files[0]
    e.target.value = ''
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => setPendingSrc(ev.target.result)
    reader.readAsDataURL(file)
  }

  return (
    <div>
      <Label>{label}</Label>
      <div
        onClick={() => inputRef.current?.click()}
        className="relative cursor-pointer rounded-lg border-2 border-dashed border-gray-600 hover:border-blue-500 transition-colors overflow-hidden flex items-center justify-center group"
        style={{ height: previewHeight, background: '#1a1d2e' }}
      >
        {value ? (
          <>
            <img src={value} alt="preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <span className="text-white text-xs font-cinzel">Change</span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-500 group-hover:text-blue-400 transition-colors">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span className="text-xs font-cinzel">{hint || 'Click to upload'}</span>
          </div>
        )}
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>
      {value && (
        <div className="mt-1 flex gap-3">
          <button
            onClick={() => inputRef.current?.click()}
            className="text-xs text-blue-400 hover:text-blue-300 transition-colors font-inter"
          >
            ✎ Recrop
          </button>
          <button
            onClick={() => onChange(null)}
            className="text-xs text-red-400 hover:text-red-300 transition-colors font-inter"
          >
            × Remove
          </button>
        </div>
      )}

      {pendingSrc && (
        <CropModal
          imageSrc={pendingSrc}
          aspect={aspect}
          title={cropTitle}
          onConfirm={cropped => { onChange(cropped); setPendingSrc(null) }}
          onCancel={() => setPendingSrc(null)}
        />
      )}
    </div>
  )
}

// Circular trigger icon upload
const TriggerIconUpload = ({ value, onChange }) => {
  const inputRef = useRef(null)
  const [pendingSrc, setPendingSrc] = useState(null)

  const handleFile = (e) => {
    const file = e.target.files[0]
    e.target.value = ''
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => setPendingSrc(ev.target.result)
    reader.readAsDataURL(file)
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        onClick={() => inputRef.current?.click()}
        className="relative group"
        style={{
          width: 56, height: 56,
          background: value ? 'transparent' : '#1a1d2e',
          border: `2px ${value ? 'solid' : 'dashed'} ${value ? '#ffd700' : '#444'}`,
          borderRadius: '50%',
          overflow: 'hidden',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: value ? '0 0 10px rgba(255,215,0,0.3)' : 'none',
        }}
      >
        {value ? (
          <>
            <img src={value} alt="trigger icon" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-0.5 text-gray-600 group-hover:text-blue-400 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
        )}
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>
      {value && (
        <button onClick={() => onChange(null)} className="text-[10px] text-red-400 hover:text-red-300 font-inter">
          × Remove
        </button>
      )}
      {pendingSrc && (
        <CropModal
          imageSrc={pendingSrc}
          aspect={1}
          title="Crop Trigger Icon"
          onConfirm={cropped => { onChange(cropped); setPendingSrc(null) }}
          onCancel={() => setPendingSrc(null)}
        />
      )}
    </div>
  )
}

// Symbol quick-insert buttons
const SymbolButtons = ({ abilityText, updateCard }) => (
  <div className="mt-1.5 flex flex-wrap gap-1">
    {['【AUTO】', '【CONT】', '【ACT】', '【TRIGGER】', '❤️', '⚔️', '✨', '🌟'].map(sym => (
      <button
        key={sym}
        onClick={() => updateCard('abilityText', abilityText + sym)}
        className="px-2 py-0.5 rounded bg-gray-700 hover:bg-gray-600 text-xs text-gray-300 transition-colors font-inter"
      >
        {sym}
      </button>
    ))}
  </div>
)

// Section header
const SectionHeader = ({ icon, title }) => (
  <div className="flex items-center gap-2 mb-3 mt-1">
    <span className="text-base">{icon}</span>
    <span className="text-xs font-cinzel font-bold tracking-widest uppercase text-gray-300">{title}</span>
    <div className="flex-1 h-px bg-gray-700" />
  </div>
)

const CARD_TYPES = [
  { value: 'character', label: 'Character', icon: '⚔️' },
  { value: 'event',     label: 'Event',     icon: '✨' },
  { value: 'stage',     label: 'Stage',     icon: '🎭' },
]

export default function EditorPanel({ cardData, updateCard }) {
  const {
    cardType = 'character',
    name, seriesIcon, cardImage, quote, level, cost, power,
    abilityText, cardNumber, rarity, triggerStars, triggerIcon, bgColor, borderStyle,
  } = cardData

  const isCharacter = cardType === 'character'
  const isStage     = cardType === 'stage'

  // Stage crop ratio is landscape (520x370)
  const imageCropAspect = isStage ? 520 / 370 : 370 / 520

  return (
    <div
      className="rounded-2xl border border-gray-700/50 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #12151f 0%, #0d1018 100%)' }}
    >
      {/* Panel Header */}
      <div className="px-5 py-4 border-b border-gray-700/50" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <h2 className="text-sm font-cinzel font-bold tracking-widest uppercase text-gray-300 flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Card Editor
        </h2>
      </div>

      <div className="p-5 space-y-5 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 160px)' }}>

        {/* ── CARD TYPE ── */}
        <div>
          <SectionHeader icon="🃏" title="Card Type" />
          <div className="flex gap-2">
            {CARD_TYPES.map(t => (
              <button
                key={t.value}
                onClick={() => updateCard('cardType', t.value)}
                className="flex-1 flex flex-col items-center gap-1 py-2.5 rounded-xl text-xs font-cinzel font-bold transition-all"
                style={{
                  background: cardType === t.value ? 'rgba(79,142,255,0.15)' : '#1a1d2e',
                  border: `1.5px solid ${cardType === t.value ? '#4f8eff' : '#333'}`,
                  color: cardType === t.value ? '#a8c8ff' : '#666',
                  boxShadow: cardType === t.value ? '0 0 12px rgba(79,142,255,0.25)' : 'none',
                }}
              >
                <span className="text-base">{t.icon}</span>
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── THEME ── */}
        <div>
          <SectionHeader icon="🎨" title="Card Theme" />

          <Label>Background Color</Label>
          <div className="flex gap-2 flex-wrap mb-4">
            {BG_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => updateCard('bgColor', opt.value)}
                title={opt.label}
                className="relative px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold transition-all"
                style={{
                  background: opt.bg,
                  color: opt.text,
                  outline: bgColor === opt.value ? '2px solid #4f8eff' : '2px solid transparent',
                  outlineOffset: 2,
                  boxShadow: bgColor === opt.value ? '0 0 10px rgba(79,142,255,0.4)' : 'none',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <Label>Border Style</Label>
          <div className="flex gap-2 flex-wrap">
            {BORDER_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => updateCard('borderStyle', opt.value)}
                title={opt.label}
                className="relative px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold text-gray-900 transition-all"
                style={{
                  background: opt.bg,
                  backgroundSize: opt.backgroundSize || 'auto',
                  outline: borderStyle === opt.value ? '2px solid white' : '2px solid transparent',
                  outlineOffset: 2,
                  boxShadow: borderStyle === opt.value ? `0 0 12px ${opt.shadow}` : 'none',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── IDENTITY ── */}
        <div>
          <SectionHeader icon="📛" title="Card Identity" />
          <div className="space-y-3">
            <div>
              <Label>Card Name</Label>
              <TextInput
                value={name}
                onChange={v => updateCard('name', v)}
                placeholder="Enter card name..."
                maxLength={40}
              />
            </div>
            <ImageUpload
              label="Series Icon"
              value={seriesIcon}
              onChange={v => updateCard('seriesIcon', v)}
              aspect={1}
              cropTitle="Crop Series Icon"
              hint="Upload series logo"
              previewHeight={72}
            />
          </div>
        </div>

        {/* ── ILLUSTRATION ── */}
        <div>
          <SectionHeader icon="🖼️" title="Illustration" />
          <ImageUpload
            label="Card Image"
            value={cardImage}
            onChange={v => updateCard('cardImage', v)}
            aspect={imageCropAspect}
            cropTitle="Crop Card Artwork"
            hint="Upload card artwork"
            previewHeight={isStage ? 80 : 120}
          />
        </div>

        {/* ── FLAVOR TEXT ── */}
        <div>
          <SectionHeader icon="💬" title="Flavor Text" />
          <Label>Quote / Hint (optional)</Label>
          <TextInput
            value={quote}
            onChange={v => updateCard('quote', v)}
            placeholder="Leave blank to hide..."
            maxLength={80}
          />
        </div>

        {/* ── STATS (hidden for Stage) ── */}
        {!isStage && (
          <div>
            <SectionHeader icon="⚔️" title="Card Stats" />
            <div className="grid grid-cols-2 gap-4">
              <NumberSelect label="Level" value={level} min={0} max={3}
                onChange={v => updateCard('level', v)} />
              <NumberSelect label="Cost" value={cost} min={0} max={3}
                onChange={v => updateCard('cost', v)} />
            </div>

            {/* Power — Character only */}
            {isCharacter && (
              <div className="mt-4">
                <Label>Power (max 99999)</Label>
                <TextInput
                  value={power}
                  onChange={v => updateCard('power', v.replace(/[^0-9]/g, '').slice(0, 5))}
                  placeholder="5500"
                  maxLength={5}
                />
              </div>
            )}

            <div className="mt-4">
              <Label>Ability Text</Label>
              <TextArea
                value={abilityText}
                onChange={v => updateCard('abilityText', v)}
                placeholder="【AUTO】Effect description..."
                rows={5}
              />
              <SymbolButtons abilityText={abilityText} updateCard={updateCard} />
            </div>
          </div>
        )}

        {/* ── ABILITY (Stage only) ── */}
        {isStage && (
          <div>
            <SectionHeader icon="⚔️" title="Ability" />
            <TextArea
              value={abilityText}
              onChange={v => updateCard('abilityText', v)}
              placeholder="【TRIGGER】Effect description..."
              rows={4}
            />
            <SymbolButtons abilityText={abilityText} updateCard={updateCard} />
          </div>
        )}

        {/* ── CARD INFO ── */}
        <div>
          <SectionHeader icon="📋" title="Card Info" />
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <Label>Card Number</Label>
              <TextInput
                value={cardNumber}
                onChange={v => updateCard('cardNumber', v.toUpperCase())}
                placeholder="DK-001"
                maxLength={10}
              />
            </div>
            <div>
              <Label>Rarity</Label>
              <div className="grid grid-cols-4 gap-1">
                {RARITY_OPTIONS.map(r => (
                  <button key={r} onClick={() => updateCard('rarity', r)}
                    className="py-1.5 rounded text-xs font-cinzel font-bold transition-all"
                    style={{
                      background: rarity === r ? '#4f8eff' : '#1e2133',
                      color: rarity === r ? '#fff' : '#888',
                      border: `1px solid ${rarity === r ? '#4f8eff' : '#333'}`,
                    }}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Trigger Stars + Icon — Character only */}
          {isCharacter && (
            <div className="flex gap-4 items-start">
              <div className="flex-1">
                <Label>Trigger Stars (0–2)</Label>
                <div className="flex gap-2 mt-1">
                  {[0, 1, 2].map(n => (
                    <button key={n} onClick={() => updateCard('triggerStars', n)}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-sm font-cinzel transition-all"
                      style={{
                        background: triggerStars === n ? '#2a2410' : '#1a1d2e',
                        border: `1.5px solid ${triggerStars === n ? '#ffd700' : '#333'}`,
                        boxShadow: triggerStars === n ? '0 0 8px rgba(255,215,0,0.3)' : 'none',
                        color: triggerStars === n ? '#ffd700' : '#666',
                      }}>
                      {n === 0 ? <span className="text-xs">None</span> : <span>{'★'.repeat(n)}</span>}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0">
                <Label>Trigger Icon</Label>
                <TriggerIconUpload value={triggerIcon} onChange={v => updateCard('triggerIcon', v)} />
              </div>
            </div>
          )}

          {/* Trigger Icon only — Stage */}
          {isStage && (
            <div>
              <Label>Trigger Icon</Label>
              <TriggerIconUpload value={triggerIcon} onChange={v => updateCard('triggerIcon', v)} />
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
