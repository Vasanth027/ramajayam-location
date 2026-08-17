import { useEffect, useState } from 'react'

const coordinates = '12.465932, 79.069139'
const mapUrl = 'https://maps.app.goo.gl/tdyjJAG2PwWZXvhw5'
const directionsUrl = 'https://www.google.com/maps/dir/?api=1&destination=12.465932,79.0691386'
const address = 'Ramajayam Estate, Kachirimangalam, Kappalur, Kalasapakkam Taluk, Tiruvannamalai District, Tamil Nadu - 606751'

type ToastMessage = 'Address copied' | 'Plus code copied' | 'Coordinates copied' | 'Location link copied'

function Crest() {
  return <div className="crest" aria-label="Ramajayam Estate monogram">R</div>
}

function PinIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>
}

function DirectionsIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 4 7 2 4-2 7 2v14l-7-2-4 2-7-2V4Z" /><path d="M10 6v14m4-16v14" /></svg>
}

function CopyIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="11" height="11" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></svg>
}

function ShareIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="19" r="2.5" /><path d="m8.2 10.8 7.55-4.35m0 11.1-7.55-4.35" /></svg>
}

function EstateIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9" /><path d="M9 20v-6h6v6" /></svg>
}

function PlusIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v16M4 12h16" /><circle cx="12" cy="12" r="8" /></svg>
}

function CoordinatesIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="2" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2" /></svg>
}

async function copyToClipboard(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value)
    return
  }

  const textArea = document.createElement('textarea')
  textArea.value = value
  textArea.style.position = 'fixed'
  textArea.style.opacity = '0'
  document.body.appendChild(textArea)
  textArea.select()
  document.execCommand('copy')
  textArea.remove()
}

export default function App() {
  const [toast, setToast] = useState<ToastMessage | null>(null)

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(null), 2200)
    return () => window.clearTimeout(timer)
  }, [toast])

  const copyValue = async (value: string, message: ToastMessage) => {
    try {
      await copyToClipboard(value)
      setToast(message)
    } catch {
      setToast(null)
    }
  }

  const shareLocation = async () => {
    const shareData = {
      title: 'Ramajayam Estate',
      text: 'Ramajayam Estate, Kachirimangalam, Kappalur, Tiruvannamalai District - 606751',
      url: mapUrl,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await copyToClipboard(`${shareData.text}\n${shareData.url}`)
        setToast('Location link copied')
      }
    } catch (error) {
      if ((error as DOMException).name !== 'AbortError') {
        await copyToClipboard(`${shareData.text}\n${shareData.url}`)
        setToast('Location link copied')
      }
    }
  }

  return (
    <div className="page-shell">
      <header className="hero">
        <div className="hero-grain" />
        <div className="hero-content">
          <Crest />
          <p className="eyebrow">A Private Countryside Estate</p>
          <h1>Ramajayam <span>Estate</span></h1>
          <p className="tamil-name">ராமஜெயம் எஸ்டேட்</p>
          <div className="ornament" aria-hidden="true"><span /></div>
          <p className="locality">Kachirimangalam <i>·</i> Kappalur <i>·</i> Tamil Nadu</p>
        </div>
      </header>

      <main className="content">
        <section className="map-card" aria-label="Ramajayam Estate location map">
          <iframe
            src="https://maps.google.com/maps?q=12.465932,79.0691386&z=16&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Map showing the location of Ramajayam Estate"
          />
          <div className="map-meta">
            <span><PinIcon /> Estate Location</span>
            <span className="coordinate-text">12.4659° N · 79.0691° E</span>
          </div>
        </section>

        <section className="action-grid" aria-label="Location actions">
          <a className="button button-primary" href={directionsUrl} target="_blank" rel="noreferrer">
            <DirectionsIcon /> Plan Your Visit
          </a>
          <a className="button button-outline" href={mapUrl} target="_blank" rel="noreferrer">
            <PinIcon /> Open in Maps
          </a>
        </section>

        <button className="button button-gold" type="button" onClick={shareLocation}>
          <ShareIcon /> Share Estate Location
        </button>

        <section className="details" aria-labelledby="estate-location-heading">
          <div className="section-heading">
            <p id="estate-location-heading">Estate Location</p>
          </div>

          <div className="detail-card">
            <article className="detail-row">
              <span className="detail-icon"><EstateIcon /></span>
              <div className="detail-content">
                <p className="detail-label">Address <b>·</b> முகவரி</p>
                <p className="detail-value">Ramajayam Estate,<br />Kachirimangalam, Kappalur,<br />Kalasapakkam Taluk,<br />Tiruvannamalai District, Tamil Nadu — 606751</p>
                <button className="copy-control" type="button" onClick={() => copyValue(address, 'Address copied')}>
                  <CopyIcon /> Copy address
                </button>
              </div>
            </article>

            <article className="detail-row">
              <span className="detail-icon"><PlusIcon /></span>
              <div className="detail-content">
                <p className="detail-label">Plus Code</p>
                <p className="detail-value value-mono">F389+9MC Kappalur</p>
                <button className="copy-control" type="button" onClick={() => copyValue('F389+9MC Kappalur', 'Plus code copied')}>
                  <CopyIcon /> Copy code
                </button>
              </div>
            </article>

            <article className="detail-row">
              <span className="detail-icon"><CoordinatesIcon /></span>
              <div className="detail-content">
                <p className="detail-label">GPS Coordinates</p>
                <p className="detail-value value-mono">{coordinates}</p>
                <button className="copy-control" type="button" onClick={() => copyValue(coordinates, 'Coordinates copied')}>
                  <CopyIcon /> Copy coordinates
                </button>
              </div>
            </article>
          </div>
        </section>

        <footer>
          <p className="welcome">வருக, நல்வரவு</p>
          <p>For a seamless arrival, select <em>Plan Your Visit</em> to open directions to Ramajayam Estate.</p>
        </footer>
      </main>

      <div className="sticky-actions" aria-label="Quick location actions">
        <a className="button button-primary" href={directionsUrl} target="_blank" rel="noreferrer"><DirectionsIcon /> Plan Your Visit</a>
        <button className="button button-outline button-icon" type="button" onClick={shareLocation} aria-label="Share estate location"><ShareIcon /></button>
      </div>

      <div className={`toast${toast ? ' toast-visible' : ''}`} aria-live="polite">{toast}</div>
    </div>
  )
}
