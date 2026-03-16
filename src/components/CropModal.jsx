import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'

// Generate cropped image canvas → dataURL
async function getCroppedImg(imageSrc, pixelCrop, aspectRatio) {
  const image = await createImageBitmap(await (await fetch(imageSrc)).blob())
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  // Output size based on aspect ratio
  const outputWidth = 800
  const outputHeight = Math.round(outputWidth / aspectRatio)
  canvas.width = outputWidth
  canvas.height = outputHeight

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    outputWidth,
    outputHeight,
  )

  return canvas.toDataURL('image/png')
}

export default function CropModal({ imageSrc, aspect = 1, title = 'Crop Image', onConfirm, onCancel }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [saving, setSaving] = useState(false)

  const onCropComplete = useCallback((_, pixels) => {
    setCroppedAreaPixels(pixels)
  }, [])

  const handleConfirm = async () => {
    if (!croppedAreaPixels) return
    setSaving(true)
    try {
      const result = await getCroppedImg(imageSrc, croppedAreaPixels, aspect)
      onConfirm(result)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}
      onClick={e => e.target === e.currentTarget && onCancel()}
    >
      <div
        className="w-full max-w-lg rounded-2xl overflow-hidden border border-gray-700"
        style={{ background: '#12151f' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-700/50">
          <h3 className="font-cinzel font-bold text-sm tracking-widest uppercase text-gray-200">
            {title}
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-200 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Cropper area */}
        <div className="relative bg-gray-950" style={{ height: 360 }}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            style={{
              containerStyle: { borderRadius: 0 },
              cropAreaStyle: {
                border: '2px solid #ffd700',
                boxShadow: '0 0 0 9999px rgba(0,0,0,0.65)',
              },
            }}
          />
        </div>

        {/* Zoom Slider */}
        <div className="px-5 py-3 border-t border-gray-700/50 flex items-center gap-3">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
          </svg>
          <input
            type="range"
            min={1} max={3} step={0.05}
            value={zoom}
            onChange={e => setZoom(Number(e.target.value))}
            className="flex-1 h-1.5 appearance-none rounded-full cursor-pointer"
            style={{ accentColor: '#ffd700', background: `linear-gradient(to right, #ffd700 ${((zoom - 1) / 2) * 100}%, #333 0%)` }}
          />
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span className="text-xs text-gray-500 font-inter w-10 text-right">{zoom.toFixed(1)}x</span>
        </div>

        {/* Actions */}
        <div className="flex gap-3 px-5 py-4 border-t border-gray-700/50">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl text-sm font-cinzel font-bold tracking-widest uppercase text-gray-400 hover:text-gray-200 transition-colors border border-gray-600 hover:border-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={saving}
            className="flex-1 py-2.5 rounded-xl text-sm font-cinzel font-bold tracking-widest uppercase transition-all disabled:opacity-50"
            style={{
              background: saving ? '#333' : 'linear-gradient(135deg, #7d5a00, #ffd700, #b8860b)',
              color: saving ? '#888' : '#1a0f00',
              boxShadow: saving ? 'none' : '0 0 16px rgba(255,215,0,0.3)',
            }}
          >
            {saving ? 'Saving...' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  )
}
