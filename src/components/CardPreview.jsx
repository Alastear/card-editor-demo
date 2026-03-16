// Card dimensions: 370 x 520px (standard TCG ratio)
import { forwardRef } from 'react'

const BG_THEMES = {
  red: {
    cardBg: 'linear-gradient(160deg, #3a0000 0%, #6b0000 25%, #a50000 50%, #6b0000 75%, #3a0000 100%)',
    patternClass: 'card-pattern-red',
    textColor: '#ffe4d6',
    subColor: '#ffaa80',
    boxBg: 'rgba(60, 0, 0, 0.55)',
    boxBorder: 'rgba(255, 120, 60, 0.5)',
    nameBg: 'rgba(80, 0, 0, 0.7)',
    statsBg: 'rgba(80, 0, 0, 0.65)',
    quoteBg: 'rgba(100, 10, 0, 0.5)',
    accentLight: 'rgba(255, 100, 50, 0.25)',
    vignette: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.7) 100%)',
    shimmer: 'rgba(255, 80, 40, 0.15)',
  },
  yellow: {
    cardBg: 'linear-gradient(160deg, #1a0f00 0%, #3d2000 25%, #7a4500 50%, #3d2000 75%, #1a0f00 100%)',
    patternClass: 'card-pattern-yellow',
    textColor: '#fff3c0',
    subColor: '#ffc840',
    boxBg: 'rgba(40, 20, 0, 0.55)',
    boxBorder: 'rgba(255, 200, 50, 0.5)',
    nameBg: 'rgba(60, 30, 0, 0.7)',
    statsBg: 'rgba(60, 30, 0, 0.65)',
    quoteBg: 'rgba(80, 40, 0, 0.5)',
    accentLight: 'rgba(255, 200, 50, 0.2)',
    vignette: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.7) 100%)',
    shimmer: 'rgba(255, 200, 50, 0.15)',
  },
  blue: {
    cardBg: 'linear-gradient(160deg, #00061a 0%, #001045 25%, #002080 50%, #001045 75%, #00061a 100%)',
    patternClass: 'card-pattern-blue',
    textColor: '#d0e8ff',
    subColor: '#80b8ff',
    boxBg: 'rgba(0, 8, 50, 0.55)',
    boxBorder: 'rgba(80, 150, 255, 0.5)',
    nameBg: 'rgba(0, 10, 60, 0.7)',
    statsBg: 'rgba(0, 10, 60, 0.65)',
    quoteBg: 'rgba(0, 15, 70, 0.5)',
    accentLight: 'rgba(80, 140, 255, 0.2)',
    vignette: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.75) 100%)',
    shimmer: 'rgba(80, 150, 255, 0.15)',
  },
  white: {
    cardBg: 'linear-gradient(160deg, #d8d8e8 0%, #ebebf5 25%, #ffffff 50%, #ebebf5 75%, #d8d8e8 100%)',
    patternClass: 'card-pattern-white',
    textColor: '#1a1a3a',
    subColor: '#444488',
    boxBg: 'rgba(220, 220, 240, 0.6)',
    boxBorder: 'rgba(100, 100, 200, 0.4)',
    nameBg: 'rgba(200, 200, 230, 0.7)',
    statsBg: 'rgba(200, 200, 230, 0.65)',
    quoteBg: 'rgba(210, 210, 235, 0.55)',
    accentLight: 'rgba(150, 150, 220, 0.2)',
    vignette: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(150,150,200,0.3) 100%)',
    shimmer: 'rgba(150, 150, 220, 0.1)',
  },
  black: {
    cardBg: 'linear-gradient(160deg, #000000 0%, #0a0a0a 25%, #1a1a1a 50%, #0a0a0a 75%, #000000 100%)',
    patternClass: 'card-pattern-black',
    textColor: '#c8c8c8',
    subColor: '#888888',
    boxBg: 'rgba(30, 30, 30, 0.6)',
    boxBorder: 'rgba(150, 150, 150, 0.4)',
    nameBg: 'rgba(25, 25, 25, 0.75)',
    statsBg: 'rgba(25, 25, 25, 0.7)',
    quoteBg: 'rgba(20, 20, 20, 0.6)',
    accentLight: 'rgba(180, 180, 180, 0.1)',
    vignette: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.85) 100%)',
    shimmer: 'rgba(200, 200, 200, 0.08)',
  },
}

const BORDER_THEMES = {
  bronze: {
    gradient: 'linear-gradient(135deg, #4a2500, #cd7f32, #7a4a15, #e8960a, #7a4a15, #cd7f32, #4a2500)',
    shadow: '0 0 25px rgba(205, 127, 50, 0.6), 0 0 50px rgba(205, 127, 50, 0.2)',
    innerBorder: 'rgba(180, 100, 30, 0.7)',
    label: 'Bronze',
  },
  silver: {
    gradient: 'linear-gradient(135deg, #3a3a3a, #aaaaaa, #666666, #dddddd, #999999, #cccccc, #555555)',
    shadow: '0 0 25px rgba(192, 192, 192, 0.5), 0 0 50px rgba(192, 192, 192, 0.15)',
    innerBorder: 'rgba(160, 160, 160, 0.7)',
    label: 'Silver',
  },
  gold: {
    gradient: 'linear-gradient(135deg, #5a3e00, #ffd700, #b8860b, #ffe44d, #b8860b, #ffd700, #5a3e00)',
    shadow: '0 0 30px rgba(255, 215, 0, 0.6), 0 0 60px rgba(255, 215, 0, 0.2)',
    innerBorder: 'rgba(200, 160, 0, 0.8)',
    label: 'Gold',
  },
  purple: {
    gradient: 'linear-gradient(135deg, #1a0030, #8b00ff, #5500aa, #bb44ff, #5500aa, #8b00ff, #1a0030)',
    shadow: '0 0 25px rgba(139, 0, 255, 0.6), 0 0 50px rgba(139, 0, 255, 0.2)',
    innerBorder: 'rgba(140, 50, 255, 0.7)',
    label: 'Purple',
  },
  rainbow: {
    gradient: null, // uses CSS class
    shadow: '0 0 30px rgba(200, 100, 255, 0.5), 0 0 60px rgba(255, 100, 100, 0.2)',
    innerBorder: 'rgba(200, 150, 255, 0.6)',
    label: 'Rainbow',
    isRainbow: true,
  },
}

// Decorative corner ornament
const CornerOrnament = ({ pos, color }) => {
  const styles = {
    'tl': { top: -1, left: -1, borderRight: 'none', borderBottom: 'none' },
    'tr': { top: -1, right: -1, borderLeft: 'none', borderBottom: 'none' },
    'bl': { bottom: -1, left: -1, borderRight: 'none', borderTop: 'none' },
    'br': { bottom: -1, right: -1, borderLeft: 'none', borderTop: 'none' },
  }
  return (
    <div
      className="absolute w-3 h-3"
      style={{
        ...styles[pos],
        border: `2px solid ${color}`,
        ...styles[pos],
      }}
    />
  )
}

// Decorative double-border frame box
const FrameBox = ({ children, className = '', style = {}, borderColor, innerBorderColor }) => (
  <div className={`relative ${className}`} style={style}>
    {/* Outer border */}
    <div className="absolute inset-0" style={{ border: `2px solid ${borderColor}`, borderRadius: 2 }} />
    {/* Inner border */}
    <div className="absolute inset-[5px]" style={{ border: `1px solid ${innerBorderColor}`, borderRadius: 1 }} />
    {/* Corner squares */}
    {['tl', 'tr', 'bl', 'br'].map(pos => (
      <CornerOrnament key={pos} pos={pos} color={borderColor} />
    ))}
    {children}
  </div>
)

// Star trigger icon
const StarIcon = ({ filled, color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={filled ? color : 'none'}
    stroke={color} strokeWidth="1.5" strokeLinejoin="round">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
)

// Level/Cost dot display
const DotLevel = ({ value, max = 3, color }) => (
  <div className="flex gap-0.5 flex-wrap justify-center">
    {Array.from({ length: max + 1 }, (_, i) => (
      <div
        key={i}
        className="w-2 h-2 rounded-full"
        style={{
          background: i < value ? color : 'transparent',
          border: `1px solid ${color}`,
          opacity: i < value ? 1 : 0.4,
        }}
      />
    ))}
  </div>
)

const CardPreview = forwardRef(function CardPreview({ cardData }, ref) {
  const {
    name, seriesIcon, cardImage, quote, level, cost, power,
    abilityText, cardNumber, rarity, triggerStars, bgColor, borderStyle,
  } = cardData

  const theme = BG_THEMES[bgColor] || BG_THEMES.blue
  const border = BORDER_THEMES[borderStyle] || BORDER_THEMES.gold

  const borderStyle_ = border.isRainbow
    ? {} // handled by class
    : { background: border.gradient }

  return (
    <div ref={ref} className="relative" style={{ width: 370, height: 520 }}>
      {/* Outer border wrapper */}
      <div
        className={border.isRainbow ? 'rainbow-border' : ''}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 16,
          padding: 4,
          boxShadow: border.shadow,
          ...borderStyle_,
        }}
      >
        {/* Inner card */}
        <div
          className={`relative w-full h-full overflow-hidden ${theme.patternClass}`}
          style={{
            borderRadius: 13,
            background: theme.cardBg,
          }}
        >
          {/* Vignette overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{ background: theme.vignette }}
          />

          {/* Shimmer top-center glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32 pointer-events-none z-0"
            style={{ background: `radial-gradient(ellipse, ${theme.shimmer} 0%, transparent 70%)` }}
          />

          {/* Card Content */}
          <div className="relative z-10 flex flex-col h-full px-3 py-3 gap-2">

            {/* ── ROW 1: Name + Series Icon ── */}
            <div className="flex items-center gap-2">
              {/* Name Box */}
              <FrameBox
                className="flex-1"
                style={{ height: 42, display: 'flex', alignItems: 'center', padding: '0 10px' }}
                borderColor={border.innerBorder}
                innerBorderColor={`${border.innerBorder}50`}
              >
                <span
                  className="font-cinzel font-bold truncate text-sm tracking-wide w-full text-center relative z-10"
                  style={{ color: theme.textColor }}
                >
                  {name || 'Card Name'}
                </span>
              </FrameBox>

              {/* Series Icon Circle */}
              <div
                className="relative flex-shrink-0 rounded-full overflow-hidden flex items-center justify-center upload-circle cursor-pointer"
                style={{
                  width: 52,
                  height: 52,
                  background: theme.boxBg,
                  border: `2px solid ${border.innerBorder}`,
                  boxShadow: `0 0 8px ${theme.accentLight}`,
                }}
              >
                {seriesIcon ? (
                  <img src={seriesIcon} alt="series" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-0.5">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={theme.subColor} strokeWidth="1.5">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                    </svg>
                    <span className="text-[7px] font-cinzel" style={{ color: theme.subColor }}>ICON</span>
                  </div>
                )}
                {/* Upload overlay */}
                <div className="upload-overlay absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 transition-opacity">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>
              </div>
            </div>

            {/* ── ROW 2: Card Image ── */}
            <FrameBox
              style={{ flex: '0 0 auto', height: 210 }}
              borderColor={border.innerBorder}
              innerBorderColor={`${border.innerBorder}50`}
            >
              <div
                className="absolute inset-[6px] overflow-hidden"
                style={{ background: theme.boxBg }}
              >
                {cardImage ? (
                  <img src={cardImage} alt="card" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={theme.subColor} strokeWidth="1" opacity="0.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <span className="text-xs font-cinzel" style={{ color: theme.subColor, opacity: 0.5 }}>
                      ILLUSTRATION
                    </span>
                  </div>
                )}
              </div>
            </FrameBox>

            {/* ── ROW 3: Quote ── */}
            <div
              className="px-3 py-1.5 flex items-center justify-center"
              style={{
                height: 30,
                background: theme.quoteBg,
                borderRadius: 4,
                border: `1px solid ${border.innerBorder}40`,
              }}
            >
              <span
                className="text-[9px] italic text-center leading-tight truncate font-inter"
                style={{ color: theme.subColor }}
              >
                {quote || ''}
              </span>
            </div>

            {/* ── ROW 4: Stats Row ── */}
            <div className="flex gap-2 flex-1">
              {/* Left: Level + Cost + Power */}
              <div className="flex flex-col items-center gap-1.5" style={{ width: 62 }}>
                {/* Level Circle */}
                <div
                  className="rounded-full flex flex-col items-center justify-center"
                  style={{
                    width: 52,
                    height: 52,
                    background: theme.boxBg,
                    border: `2px solid ${border.innerBorder}`,
                    boxShadow: `0 0 8px ${theme.accentLight}`,
                  }}
                >
                  <span className="text-[8px] font-cinzel font-bold" style={{ color: theme.subColor }}>LV</span>
                  <span className="text-lg font-cinzel font-black leading-none" style={{ color: theme.textColor }}>{level}</span>
                  {/* <DotLevel value={level} color={theme.subColor} /> */}
                </div>

                {/* Cost Circle */}
                <div
                  className="rounded-full flex flex-col items-center justify-center"
                  style={{
                    width: 38,
                    height: 38,
                    background: theme.boxBg,
                    border: `2px solid ${border.innerBorder}80`,
                    boxShadow: `0 0 6px ${theme.accentLight}`,
                  }}
                >
                  <span className="text-[7px] font-cinzel font-bold" style={{ color: theme.subColor, lineHeight: 1 }}>COST</span>
                  <span className="text-sm font-cinzel font-black leading-none" style={{ color: theme.textColor }}>{cost}</span>
                </div>

                {/* Power Box */}
                <div
                  className="w-full flex flex-col items-center justify-center"
                  style={{
                    background: theme.boxBg,
                    border: `2px solid ${border.innerBorder}`,
                    borderRadius: 6,
                    padding: '4px 2px',
                    boxShadow: `0 0 8px ${theme.accentLight}`,
                  }}
                >
                  <span className="text-[7px] font-cinzel font-bold" style={{ color: theme.subColor }}>PWR</span>
                  <span
                    className="font-cinzel font-black text-center leading-none"
                    style={{
                      color: theme.textColor,
                      fontSize: power.length > 4 ? '10px' : '13px',
                    }}
                  >
                    {power || '0'}
                  </span>
                </div>
              </div>

              {/* Right: Ability Text Box */}
              <FrameBox
                className="flex-1"
                style={{ minHeight: 0 }}
                borderColor={border.innerBorder}
                innerBorderColor={`${border.innerBorder}50`}
              >
                <div
                  className="absolute inset-[6px] overflow-y-auto p-1"
                  style={{ background: theme.boxBg }}
                >
                  <p
                    className="text-[9px] leading-relaxed font-inter whitespace-pre-wrap"
                    style={{ color: theme.textColor }}
                  >
                    {abilityText || ''}
                  </p>
                </div>
              </FrameBox>
            </div>

            {/* ── ROW 5: Bottom Bar ── */}
            <div className="flex items-center gap-1.5" style={{ height: 26 }}>
              {/* Card Number Pill */}
              <div
                className="px-2 flex items-center justify-center"
                style={{
                  height: 22,
                  background: theme.boxBg,
                  border: `1.5px solid ${border.innerBorder}70`,
                  borderRadius: 20,
                  minWidth: 72,
                }}
              >
                <span className="text-[9px] font-cinzel font-bold tracking-wider" style={{ color: theme.subColor }}>
                  {cardNumber || 'XXX-000'}
                </span>
              </div>

              {/* Rarity Pill */}
              <div
                className="flex-1 flex items-center justify-center"
                style={{
                  height: 22,
                  background: theme.boxBg,
                  border: `1.5px solid ${border.innerBorder}70`,
                  borderRadius: 20,
                }}
              >
                <span
                  className="text-[10px] font-cinzel font-black tracking-[0.2em]"
                  style={{ color: theme.textColor }}
                >
                  {rarity || 'C'}
                </span>
              </div>

              {/* Trigger Stars */}
              <div className="flex items-center gap-0.5 flex-shrink-0">
                {[1, 2].map(i => (
                  <StarIcon
                    key={i}
                    filled={i <= triggerStars}
                    color={i <= triggerStars ? '#ffd700' : theme.subColor}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Inner card border decoration */}
          <div
            className="absolute inset-[3px] pointer-events-none z-20"
            style={{
              borderRadius: 11,
              border: `1px solid ${border.innerBorder}30`,
            }}
          />
        </div>
      </div>
    </div>
  )
})

export default CardPreview
