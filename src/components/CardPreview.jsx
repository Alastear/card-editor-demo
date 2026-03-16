import { forwardRef } from 'react'
import { FaStarOfDavid } from 'react-icons/fa'
import { TRIGGER_ICON_MAP } from '../triggerIcons'

// Card inner dimensions: 362 x 512px (370x520 minus 4px border padding each side)

const BG_THEMES = {
  red: {
    cardBg: 'linear-gradient(160deg, #2a0000 0%, #5a0000 40%, #900000 100%)',
    patternClass: 'card-pattern-red',
    topColor: 'rgba(42,0,0,1)',
    bottomColor: 'rgba(20,0,0,0.97)',
    textColor: '#ffe4d6',
    subColor: '#ffaa80',
    boxBg: 'rgba(30, 0, 0, 0.65)',
    accentLight: 'rgba(255, 100, 50, 0.3)',
    innerBorderTint: 'rgba(255,100,50,0.15)',
    emptyTint: '#5a0000',
  },
  yellow: {
    cardBg: 'linear-gradient(160deg, #150b00 0%, #3a1e00 40%, #6a3800 100%)',
    patternClass: 'card-pattern-yellow',
    topColor: 'rgba(21,11,0,1)',
    bottomColor: 'rgba(15,8,0,0.97)',
    textColor: '#fff3c0',
    subColor: '#ffc840',
    boxBg: 'rgba(25, 12, 0, 0.65)',
    accentLight: 'rgba(255, 200, 50, 0.25)',
    innerBorderTint: 'rgba(255,200,50,0.12)',
    emptyTint: '#3a1e00',
  },
  blue: {
    cardBg: 'linear-gradient(160deg, #000410 0%, #000d38 40%, #001870 100%)',
    patternClass: 'card-pattern-blue',
    topColor: 'rgba(0,4,16,1)',
    bottomColor: 'rgba(0,3,12,0.97)',
    textColor: '#d0e8ff',
    subColor: '#80b8ff',
    boxBg: 'rgba(0, 5, 35, 0.65)',
    accentLight: 'rgba(80, 140, 255, 0.25)',
    innerBorderTint: 'rgba(80,140,255,0.12)',
    emptyTint: '#001060',
  },
  white: {
    cardBg: 'linear-gradient(160deg, #d0d0e0 0%, #e8e8f4 40%, #ffffff 100%)',
    patternClass: 'card-pattern-white',
    topColor: 'rgba(210,210,228,1)',
    bottomColor: 'rgba(200,200,220,0.97)',
    textColor: '#1a1a3a',
    subColor: '#445',
    boxBg: 'rgba(210, 210, 230, 0.7)',
    accentLight: 'rgba(140,140,210,0.2)',
    innerBorderTint: 'rgba(100,100,180,0.1)',
    emptyTint: '#c8c8e0',
  },
  black: {
    cardBg: 'linear-gradient(160deg, #000000 0%, #0a0a0a 40%, #181818 100%)',
    patternClass: 'card-pattern-black',
    topColor: 'rgba(0,0,0,1)',
    bottomColor: 'rgba(0,0,0,0.97)',
    textColor: '#c8c8c8',
    subColor: '#888888',
    boxBg: 'rgba(20, 20, 20, 0.7)',
    accentLight: 'rgba(180,180,180,0.15)',
    innerBorderTint: 'rgba(180,180,180,0.06)',
    emptyTint: '#111111',
  },
}

const BORDER_THEMES = {
  bronze: {
    gradient: 'linear-gradient(135deg, #4a2500, #cd7f32, #7a4a15, #e8960a, #7a4a15, #cd7f32, #4a2500)',
    shadow: '0 0 28px rgba(205,127,50,0.65), 0 0 55px rgba(205,127,50,0.2)',
    innerBorder: 'rgba(210,140,50,0.8)',
  },
  silver: {
    gradient: 'linear-gradient(135deg, #3a3a3a, #aaaaaa, #666, #ddd, #999, #ccc, #555)',
    shadow: '0 0 25px rgba(192,192,192,0.5), 0 0 50px rgba(192,192,192,0.15)',
    innerBorder: 'rgba(200,200,200,0.75)',
  },
  gold: {
    gradient: 'linear-gradient(135deg, #5a3e00, #ffd700, #b8860b, #ffe44d, #b8860b, #ffd700, #5a3e00)',
    shadow: '0 0 32px rgba(255,215,0,0.65), 0 0 65px rgba(255,215,0,0.2)',
    innerBorder: 'rgba(220,175,0,0.85)',
  },
  purple: {
    gradient: 'linear-gradient(135deg, #1a0030, #8b00ff, #5500aa, #bb44ff, #5500aa, #8b00ff, #1a0030)',
    shadow: '0 0 28px rgba(139,0,255,0.65), 0 0 55px rgba(139,0,255,0.2)',
    innerBorder: 'rgba(160,80,255,0.75)',
  },
  rainbow: {
    gradient: null,
    shadow: '0 0 32px rgba(200,100,255,0.5), 0 0 65px rgba(255,100,100,0.15)',
    innerBorder: 'rgba(200,150,255,0.65)',
    isRainbow: true,
  },
}

// Luxury trigger star — circular badge with FaStarOfDavid
const LuxuryStar = ({ filled, subColor, size = 28 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: filled
        ? 'radial-gradient(circle at 40% 35%, rgba(255,255,180,0.35) 0%, rgba(255,215,0,0.18) 50%, transparent 100%)'
        : 'rgba(255,255,255,0.04)',
      border: `1.5px solid ${filled ? 'rgba(255,210,0,0.7)' : subColor + '35'}`,
      boxShadow: filled
        ? '0 0 12px rgba(255,215,0,0.55), 0 0 4px rgba(255,215,0,0.3), inset 0 1px 0 rgba(255,255,200,0.3)'
        : 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      backdropFilter: 'blur(2px)',
    }}
  >
    <FaStarOfDavid
      size={size * 0.52}
      color={filled ? '#ffd700' : subColor + '55'}
      style={{ filter: filled ? 'drop-shadow(0 0 3px rgba(255,215,0,0.9))' : 'none' }}
    />
  </div>
)

// Decorative double-border frame box (kept for name + ability)
const FrameBox = ({ children, className = '', style = {}, borderColor, innerBorderColor }) => (
  <div className={`relative ${className}`} style={style}>
    <div className="absolute inset-0" style={{ border: `1.5px solid ${borderColor}`, borderRadius: 3 }} />
    <div className="absolute inset-[4px]" style={{ border: `1px solid ${innerBorderColor}`, borderRadius: 2 }} />
    {[
      { top: -1, left: -1, borderRight: 'none', borderBottom: 'none' },
      { top: -1, right: -1, borderLeft: 'none', borderBottom: 'none' },
      { bottom: -1, left: -1, borderRight: 'none', borderTop: 'none' },
      { bottom: -1, right: -1, borderLeft: 'none', borderTop: 'none' },
    ].map((s, i) => (
      <div key={i} className="absolute w-3 h-3" style={{ ...s, border: `2px solid ${borderColor}` }} />
    ))}
    {children}
  </div>
)

// ── Shared card shell (border + inner bg + full-bleed image + gradients) ──
function CardShell({ theme, border, cardImage, children }) {
  const borderGradientStyle = border.isRainbow ? {} : { background: border.gradient }
  return (
    <div
      className={border.isRainbow ? 'rainbow-border' : ''}
      style={{ position: 'absolute', inset: 0, borderRadius: 16, padding: 4, boxShadow: border.shadow, ...borderGradientStyle }}
    >
      <div className={`relative w-full h-full overflow-hidden ${theme.patternClass}`}
        style={{ borderRadius: 13, background: theme.cardBg }}>

        {/* Full-bleed image */}
        {cardImage
          ? <img src={cardImage} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 1 }} />
          : <div className="absolute inset-0 flex flex-col items-center justify-center gap-3" style={{ zIndex: 1, background: `radial-gradient(ellipse at 50% 40%, ${theme.emptyTint}88 0%, transparent 70%)` }}>
              <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke={theme.subColor} strokeWidth="0.8" opacity="0.2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
              </svg>
              <span className="text-xs font-cinzel tracking-widest" style={{ color: theme.subColor, opacity: 0.18 }}>ILLUSTRATION</span>
            </div>
        }

        {/* Top gradient */}
        <div className="absolute left-0 right-0 top-0 pointer-events-none" style={{ height: '42%', zIndex: 2,
          background: `linear-gradient(to bottom, ${theme.topColor} 0%, ${theme.topColor.replace(',1)', ',0.85)')} 30%, ${theme.topColor.replace(',1)', ',0.35)')} 65%, transparent 100%)` }} />

        {/* Bottom gradient */}
        <div className="absolute left-0 right-0 bottom-0 pointer-events-none" style={{ height: '65%', zIndex: 2,
          background: `linear-gradient(to top, ${theme.bottomColor} 0%, ${theme.bottomColor.replace(',0.97)', ',0.9)')} 25%, ${theme.bottomColor.replace(',0.97)', ',0.7)')} 50%, ${theme.bottomColor.replace(',0.97)', ',0.25)')} 75%, transparent 100%)` }} />

        {/* Content */}
        <div className="absolute inset-0" style={{ zIndex: 3 }}>{children}</div>

        {/* Inner frame */}
        <div className="absolute pointer-events-none" style={{ inset: 5, borderRadius: 9, border: `1px solid ${border.innerBorder}22`, zIndex: 10 }} />
      </div>
    </div>
  )
}

// ── Shared: trigger icon circle (top-right, shows selected react-icon) ──
function TriggerIconCircle({ triggerIconType, theme, border }) {
  const entry = triggerIconType ? TRIGGER_ICON_MAP[triggerIconType] : null
  const IconComp = entry?.Icon
  return (
    <div className="flex-shrink-0 rounded-full overflow-hidden flex items-center justify-center"
      style={{ width: 48, height: 48, background: theme.boxBg, border: `2px solid ${border.innerBorder}`,
        boxShadow: `0 0 12px ${theme.accentLight}, inset 0 1px 0 rgba(255,255,255,0.08)`, backdropFilter: 'blur(6px)', flexShrink: 0 }}>
      {IconComp
        ? <IconComp size={22} color={theme.textColor} style={{ filter: `drop-shadow(0 0 4px ${theme.accentLight})` }} />
        : <FaStarOfDavid size={16} color={theme.subColor} style={{ opacity: 0.3 }} />
      }
    </div>
  )
}

// ── Shared: series icon panel (bottom-right, landscape 2:1) ──
function SeriesPanel({ seriesIcon, theme, border }) {
  return (
    <div className="flex-shrink-0 overflow-hidden flex items-center justify-center"
      style={{ width: 64, height: 32, borderRadius: 5, background: seriesIcon ? 'transparent' : theme.boxBg,
        border: `1.5px solid ${border.innerBorder}`, boxShadow: `0 0 8px ${theme.accentLight}`, backdropFilter: 'blur(6px)' }}>
      {seriesIcon
        ? <img src={seriesIcon} alt="series" className="w-full h-full object-cover" />
        : <span className="text-[7px] font-cinzel" style={{ color: theme.subColor, opacity: 0.5 }}>SERIES</span>
      }
    </div>
  )
}

// ── Stage card (landscape 520×370) ──
function StageCardLayout({ cardData, theme, border }) {
  const { name, seriesIcon, quote, abilityText, cardNumber, rarity, triggerIconType } = cardData
  return (
    <div className="absolute inset-0 flex flex-col px-3 py-3 gap-1.5">
      {/* Header: Name + Trigger icon (top-right) */}
      <div className="flex items-center gap-2" style={{ height: 44 }}>
        <FrameBox className="flex-1" style={{ height: 38, display: 'flex', alignItems: 'center', padding: '0 10px' }}
          borderColor={border.innerBorder} innerBorderColor={`${border.innerBorder}40`}>
          <div className="absolute inset-0 rounded-sm" style={{ background: theme.boxBg, backdropFilter: 'blur(4px)' }} />
          <span className="font-cinzel font-bold truncate text-sm tracking-wide w-full text-center relative z-10"
            style={{ color: theme.textColor, textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
            {name || 'Stage Name'}
          </span>
        </FrameBox>
        <TriggerIconCircle triggerIconType={triggerIconType} theme={theme} border={border} />
      </div>

      {/* Spacer — shows image */}
      <div className="flex-1" />

      {/* Quote */}
      {quote && (
        <div className="flex items-center justify-center px-3 mb-1"
          style={{ height: 22, background: 'rgba(0,0,0,0.35)', borderRadius: 3, border: `1px solid ${border.innerBorder}25`, backdropFilter: 'blur(3px)' }}>
          <span className="text-[9px] italic text-center truncate font-inter"
            style={{ color: theme.subColor, textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}>{quote}</span>
        </div>
      )}

      {/* Ability row — full width */}
      <div style={{ height: 100 }}>
        <FrameBox className="w-full h-full" borderColor={border.innerBorder} innerBorderColor={`${border.innerBorder}40`}>
          <div className="absolute inset-[5px] overflow-y-auto p-1.5" style={{ background: theme.boxBg, backdropFilter: 'blur(6px)' }}>
            <p className="text-[9px] leading-relaxed font-inter whitespace-pre-wrap" style={{ color: theme.textColor }}>
              {abilityText || ''}
            </p>
          </div>
        </FrameBox>
      </div>

      {/* Bottom bar: Number·Rarity + Series icon (bottom-right) */}
      <div className="flex items-center gap-2" style={{ height: 34 }}>
        <div className="flex-1 flex items-center justify-center gap-1.5 px-2"
          style={{ height: 22, background: theme.boxBg, border: `1.5px solid ${border.innerBorder}55`, borderRadius: 20, backdropFilter: 'blur(6px)' }}>
          <span className="text-[9px] font-cinzel font-bold tracking-wider" style={{ color: theme.subColor }}>{cardNumber || 'XXX-000'}</span>
          <span style={{ color: border.innerBorder, fontSize: 9, opacity: 0.7 }}>·</span>
          <span className="text-[10px] font-cinzel font-black tracking-[0.15em]" style={{ color: theme.textColor }}>{rarity || 'C'}</span>
        </div>
        <SeriesPanel seriesIcon={seriesIcon} theme={theme} border={border} />
      </div>
    </div>
  )
}

// ── Character / Event shared layout ──
function CharacterLayout({ cardData, theme, border }) {
  const { name, seriesIcon, quote, level, cost, power, abilityText, cardNumber, rarity,
          triggerStars, triggerIconType, cardType } = cardData
  const isEvent = cardType === 'event'
  return (
    <div className="absolute inset-0 flex flex-col px-3 py-3 gap-0">
      {/* Header: Name + Trigger icon (top-right) */}
      <div className="flex items-center gap-2" style={{ height: 48 }}>
        <FrameBox className="flex-1" style={{ height: 40, display: 'flex', alignItems: 'center', padding: '0 10px' }}
          borderColor={border.innerBorder} innerBorderColor={`${border.innerBorder}45`}>
          <div className="absolute inset-0 rounded-sm" style={{ background: theme.boxBg, backdropFilter: 'blur(4px)' }} />
          <span className="font-cinzel font-bold truncate text-sm tracking-wide w-full text-center relative z-10"
            style={{ color: theme.textColor, textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
            {name || 'Card Name'}
          </span>
        </FrameBox>
        {/* Trigger icon circle — top-right */}
        {!isEvent && <TriggerIconCircle triggerIconType={triggerIconType} theme={theme} border={border} />}
      </div>

      <div className="flex-1" />

      {/* Quote */}
      {quote
        ? <div className="flex items-center justify-center px-3 mb-1.5"
            style={{ height: 24, background: 'rgba(0,0,0,0.35)', borderRadius: 3, border: `1px solid ${border.innerBorder}30`, backdropFilter: 'blur(3px)' }}>
            <span className="text-[9px] italic text-center leading-tight truncate font-inter"
              style={{ color: theme.subColor, textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}>{quote}</span>
          </div>
        : <div style={{ height: 8 }} />
      }

      {/* Stats row */}
      <div className="flex gap-2 mb-2" style={{ height: 110 }}>
        <div className="flex flex-col items-center gap-1" style={{ width: 60 }}>
          {/* Level */}
          <div className="rounded-full flex flex-col items-center justify-center flex-shrink-0"
            style={{ width: 50, height: 50, background: theme.boxBg, border: `2px solid ${border.innerBorder}`,
              boxShadow: `0 0 10px ${theme.accentLight}, inset 0 1px 0 rgba(255,255,255,0.08)`, backdropFilter: 'blur(6px)' }}>
            <span className="text-[7px] font-cinzel font-bold leading-none" style={{ color: theme.subColor }}>LV</span>
            <span className="text-xl font-cinzel font-black leading-none"
              style={{ color: theme.textColor, textShadow: `0 0 10px ${theme.accentLight}` }}>{level}</span>
          </div>
          {/* Cost */}
          <div className="rounded-full flex flex-col items-center justify-center flex-shrink-0"
            style={{ width: 36, height: 36, background: theme.boxBg, border: `1.5px solid ${border.innerBorder}70`,
              boxShadow: `0 0 7px ${theme.accentLight}`, backdropFilter: 'blur(6px)' }}>
            <span className="text-[6.5px] font-cinzel font-bold leading-none" style={{ color: theme.subColor }}>COST</span>
            <span className="text-sm font-cinzel font-black leading-none" style={{ color: theme.textColor }}>{cost}</span>
          </div>
          {/* Power — character only */}
          {!isEvent && (
            <div className="w-full flex flex-col items-center justify-center" style={{ flex: 1,
              background: theme.boxBg, border: `1.5px solid ${border.innerBorder}`, borderRadius: 6,
              backdropFilter: 'blur(6px)', boxShadow: `0 0 8px ${theme.accentLight}` }}>
              <span className="text-[7px] font-cinzel font-bold" style={{ color: theme.subColor }}>PWR</span>
              <span className="font-cinzel font-black leading-none text-center"
                style={{ color: theme.textColor, fontSize: (power?.length || 0) > 4 ? '10px' : '13px',
                  textShadow: `0 0 8px ${theme.accentLight}` }}>{power || '0'}</span>
            </div>
          )}
        </div>

        {/* Ability */}
        <FrameBox className="flex-1" borderColor={border.innerBorder} innerBorderColor={`${border.innerBorder}40`}>
          <div className="absolute inset-[5px] overflow-y-auto p-1.5" style={{ background: theme.boxBg, backdropFilter: 'blur(6px)' }}>
            <p className="text-[9px] leading-[1.6] font-inter whitespace-pre-wrap" style={{ color: theme.textColor }}>
              {abilityText || ''}
            </p>
          </div>
        </FrameBox>
      </div>

      {/* Bottom bar: Stars + Number·Rarity + Series icon (bottom-right) */}
      <div className="flex items-center gap-2" style={{ height: 36 }}>
        {/* Stars — character only */}
        {!isEvent && (
          <div className="flex items-center gap-1 flex-shrink-0">
            {[1, 2].map(i => (
              <LuxuryStar key={i} filled={i <= triggerStars} subColor={theme.subColor} size={30} />
            ))}
          </div>
        )}
        {/* Number + Rarity pill */}
        <div className="flex-1 flex items-center justify-center gap-1.5 px-2"
          style={{ height: 24, background: theme.boxBg, border: `1.5px solid ${border.innerBorder}60`,
            borderRadius: 20, backdropFilter: 'blur(6px)' }}>
          <span className="text-[9px] font-cinzel font-bold tracking-wider" style={{ color: theme.subColor }}>
            {cardNumber || 'XXX-000'}
          </span>
          <span style={{ color: border.innerBorder, fontSize: 9, opacity: 0.7 }}>·</span>
          <span className="text-[10px] font-cinzel font-black tracking-[0.15em]"
            style={{ color: theme.textColor, textShadow: `0 0 6px ${theme.accentLight}` }}>
            {rarity || 'C'}
          </span>
        </div>
        {/* Series icon — landscape rectangle, bottom-right */}
        <SeriesPanel seriesIcon={seriesIcon} theme={theme} border={border} />
      </div>
    </div>
  )
}

const CardPreview = forwardRef(function CardPreview({ cardData }, ref) {
  const { cardType = 'character', bgColor, borderStyle } = cardData

  const theme = BG_THEMES[bgColor] || BG_THEMES.blue
  const border = BORDER_THEMES[borderStyle] || BORDER_THEMES.gold
  const isStage = cardType === 'stage'

  // Stage card is landscape (520×370)
  const W = isStage ? 520 : 370
  const H = isStage ? 370 : 520

  return (
    <div ref={ref} className="relative flex-shrink-0" style={{ width: W, height: H }}>
      <CardShell theme={theme} border={border} cardImage={cardData.cardImage}>
        {isStage
          ? <StageCardLayout cardData={cardData} theme={theme} border={border} />
          : <CharacterLayout cardData={cardData} theme={theme} border={border} />
        }
      </CardShell>
    </div>
  )
})

export default CardPreview
