import { useState, useEffect, useCallback, useRef } from 'react'
import { GoogleMap, LoadScript, MarkerF, PolylineF, OverlayViewF, OverlayView } from '@react-google-maps/api'
import Sidebar from './components/Sidebar'
import { schedule, cityMarkers, routePath } from './data/schedule'
import './App.css'

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''

const mapContainerStyle = {
  width: '100%',
  height: '100vh',
}

const defaultCenter = { lat: 48.5, lng: 15.0 }
const defaultZoom = 6

const routeLineOptions: google.maps.PolylineOptions = {
  strokeColor: '#2563eb',
  strokeOpacity: 0.8,
  strokeWeight: 3,
  geodesic: true,
}

function smoothZoom(map: google.maps.Map, targetZoom: number, callback?: () => void) {
  const currentZoom = map.getZoom() ?? defaultZoom
  if (currentZoom === targetZoom) {
    callback?.()
    return
  }

  const step = targetZoom > currentZoom ? 1 : -1
  const listener = google.maps.event.addListener(map, 'zoom_changed', () => {
    const newZoom = map.getZoom() ?? currentZoom
    if (
      (step > 0 && newZoom < targetZoom) ||
      (step < 0 && newZoom > targetZoom)
    ) {
      setTimeout(() => map.setZoom(newZoom + step), 80)
    } else {
      google.maps.event.removeListener(listener)
      callback?.()
    }
  })
  map.setZoom(currentZoom + step)
}

// Deduplicate route markers: show one marker per unique location with combined day labels
function getRouteMarkers() {
  const markerMap = new Map<string, { lat: number; lng: number; days: number[] }>()
  for (const s of schedule) {
    const key = `${s.lat.toFixed(4)},${s.lng.toFixed(4)}`
    const existing = markerMap.get(key)
    if (existing) {
      existing.days.push(s.day)
    } else {
      markerMap.set(key, { lat: s.lat, lng: s.lng, days: [s.day] })
    }
  }
  return Array.from(markerMap.values()).map(m => ({
    ...m,
    label: m.days.length === 1 ? `D${m.days[0]}` : `D${m.days[0]}-${m.days[m.days.length - 1]}`,
  }))
}

const routeMarkers = getRouteMarkers()

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [showRoute, setShowRoute] = useState(false)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const animating = useRef(false)

  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [showSplash])

  const handleClose = () => {
    setFadeOut(true)
    setTimeout(() => setShowSplash(false), 600)
  }

  const handleSelectDay = useCallback((day: number | null) => {
    setSelectedDay(day)
    if (!map || animating.current) return

    if (day === null) {
      animating.current = true
      smoothZoom(map, defaultZoom, () => {
        map.panTo(defaultCenter)
        animating.current = false
      })
      return
    }

    const item = schedule.find((s) => s.day === day)
    if (!item) return

    animating.current = true
    const currentZoom = map.getZoom() ?? defaultZoom
    const midZoom = Math.min(currentZoom, item.zoom, 8)

    smoothZoom(map, midZoom, () => {
      map.panTo({ lat: item.lat, lng: item.lng })
      setTimeout(() => {
        smoothZoom(map, item.zoom, () => {
          animating.current = false
        })
      }, 400)
    })
  }, [map])

  const handleToggleRoute = useCallback(() => {
    setShowRoute(prev => {
      const next = !prev
      if (next && map) {
        // Fit map to show entire route
        const bounds = new google.maps.LatLngBounds()
        routePath.forEach(p => bounds.extend(p))
        map.fitBounds(bounds, { top: 60, bottom: 60, left: 400, right: 60 })
      }
      return next
    })
  }, [map])

  const onMapLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance)
  }, [])

  return (
    <>
      {showSplash && (
        <div className={`splash-overlay ${fadeOut ? 'fade-out' : ''}`}>
          <div className="splash-bg" />
          <div className="splash-content">
            <div className="splash-popup">
              <div className="splash-badge">2026 FAMILY TRIP</div>
              <h1>동유럽 가족 여행</h1>
              <p className="splash-route">체코 · 오스트리아</p>
              <div className="splash-details">
                <div className="splash-detail-item">
                  <span className="splash-detail-value">13박 14일</span>
                </div>
              </div>
              <div className="splash-divider" />
              <button className="splash-button" onClick={handleClose}>
                여행 지도 보기
                <span className="splash-button-arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="app-layout">
        <Sidebar
          selectedDay={selectedDay}
          onSelectDay={handleSelectDay}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          showRoute={showRoute}
          onToggleRoute={handleToggleRoute}
        />
        <div className="map-container">
          <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={defaultCenter}
              zoom={defaultZoom}
              onLoad={onMapLoad}
              options={{
                styles: [
                  { featureType: 'poi', stylers: [{ visibility: 'simplified' }] },
                  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
                ],
              }}
            >
              {!showRoute && cityMarkers.map((marker) => (
                <MarkerF
                  key={marker.city}
                  position={{ lat: marker.lat, lng: marker.lng }}
                  label={{
                    text: marker.city,
                    fontSize: '13px',
                    fontWeight: '700',
                    className: 'marker-label',
                  }}
                />
              ))}

              {showRoute && (
                <>
                  <PolylineF path={routePath} options={routeLineOptions} />
                  {routeMarkers.map((marker) => (
                    <OverlayViewF
                      key={marker.label}
                      position={{ lat: marker.lat, lng: marker.lng }}
                      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    >
                      <div className="route-marker">
                        <div className="route-marker__pin" />
                        <span className="route-marker__label">{marker.label}</span>
                      </div>
                    </OverlayViewF>
                  ))}
                </>
              )}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </>
  )
}

export default App
