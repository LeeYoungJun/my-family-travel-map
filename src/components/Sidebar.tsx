import { useRef, useEffect } from 'react'
import { schedule } from '../data/schedule'
import type { DaySchedule } from '../data/schedule'
import './Sidebar.css'

export type PoiType = 'hotel' | 'restaurant'

export interface ActivePoi {
  day: number
  type: PoiType
}

interface SidebarProps {
  selectedDay: number | null
  onSelectDay: (day: number | null) => void
  collapsed: boolean
  onToggleCollapse: () => void
  showRoute: boolean
  onToggleRoute: () => void
  activePoi: ActivePoi | null
  onTogglePoi: (day: number, type: PoiType) => void
}

function DayCard({ item, isSelected, onClick, activePoi, onTogglePoi }: {
  item: DaySchedule
  isSelected: boolean
  onClick: () => void
  activePoi: ActivePoi | null
  onTogglePoi: (day: number, type: PoiType) => void
}) {
  const isWeekend = item.weekday === '토' || item.weekday === '일'
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isSelected && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [isSelected])

  return (
    <div
      ref={ref}
      className={`day-card ${isSelected ? 'day-card--selected' : ''}`}
      onClick={onClick}
    >
      <div className="day-card__thumb" style={{ backgroundImage: `url(${item.image})` }}>
        <div className="day-card__thumb-overlay" />
        <span className="day-card__day-badge">DAY {item.day}</span>
      </div>
      <div className="day-card__body">
        <div className="day-card__top">
          <h3 className="day-card__title">{item.title}</h3>
          <span className={`day-card__date ${isWeekend ? 'day-card__date--weekend' : ''}`}>
            {item.date} ({item.weekday})
          </span>
        </div>
        <div className="day-card__meta">
          <span className="day-card__city">{item.city}, {item.country}</span>
          <span className="day-card__divider">|</span>
          <span className="day-card__transport">{item.transport}</span>
        </div>
        <p className="day-card__activities">{item.activities}</p>
        {(item.hotel || (item.restaurants && item.restaurants.length > 0)) && (
          <div className="day-card__actions">
            {item.hotel && (
              <button
                className={`day-card__action-btn day-card__action-btn--hotel ${activePoi?.day === item.day && activePoi?.type === 'hotel' ? 'day-card__action-btn--active' : ''}`}
                onClick={(e) => { e.stopPropagation(); onTogglePoi(item.day, 'hotel') }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                  <path d="M3 21V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14" />
                  <path d="M3 11h18" />
                  <path d="M9 21V11" />
                </svg>
                숙소
              </button>
            )}
            {item.restaurants && item.restaurants.length > 0 && (
              <button
                className={`day-card__action-btn day-card__action-btn--restaurant ${activePoi?.day === item.day && activePoi?.type === 'restaurant' ? 'day-card__action-btn--active' : ''}`}
                onClick={(e) => { e.stopPropagation(); onTogglePoi(item.day, 'restaurant') }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                  <line x1="6" y1="1" x2="6" y2="4" />
                  <line x1="10" y1="1" x2="10" y2="4" />
                  <line x1="14" y1="1" x2="14" y2="4" />
                </svg>
                식당
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default function Sidebar({ selectedDay, onSelectDay, collapsed, onToggleCollapse, showRoute, onToggleRoute, activePoi, onTogglePoi }: SidebarProps) {
  return (
    <>
      <button
        className={`sidebar-toggle ${collapsed ? 'sidebar-toggle--collapsed' : ''}`}
        onClick={onToggleCollapse}
        aria-label={collapsed ? '사이드바 열기' : '사이드바 닫기'}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          {collapsed
            ? <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>
            : <><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></>
          }
        </svg>
      </button>

      <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
        <div className="sidebar__header">
          <div className="sidebar__header-banner">
            <div className="sidebar__header-banner-bg" />
            <div className="sidebar__header-banner-content">
              <div className="sidebar__badge">2026 FAMILY TRIP</div>
              <h2 className="sidebar__title">동유럽 가족 여행</h2>
              <p className="sidebar__subtitle">체코 · 오스트리아</p>
            </div>
          </div>
          <div className="sidebar__stats">
            <div className="sidebar__stat">
              <span className="sidebar__stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              </span>
              <div>
                <span className="sidebar__stat-value">8.15 — 8.28</span>
                <span className="sidebar__stat-label">14일간</span>
              </div>
            </div>
            <div className="sidebar__stat-divider" />
            <div className="sidebar__stat">
              <span className="sidebar__stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </span>
              <div>
                <span className="sidebar__stat-value">6개 도시</span>
                <span className="sidebar__stat-label">2개국</span>
              </div>
            </div>
          </div>
          <button
            className={`sidebar__route-btn ${showRoute ? 'sidebar__route-btn--active' : ''}`}
            onClick={onToggleRoute}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
              <path d="M3 17l6-6 4 4 8-8" />
              <polyline points="17 7 21 7 21 11" />
            </svg>
            {showRoute ? '경로 숨기기' : '경로 보기'}
          </button>
        </div>
        <div className="sidebar__list">
          {schedule.map((item) => (
            <DayCard
              key={item.day}
              item={item}
              isSelected={selectedDay === item.day}
              onClick={() => onSelectDay(selectedDay === item.day ? null : item.day)}
              activePoi={activePoi}
              onTogglePoi={onTogglePoi}
            />
          ))}
        </div>
      </aside>
    </>
  )
}
