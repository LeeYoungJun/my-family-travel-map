import { useRef, useEffect } from 'react'
import { schedule } from '../data/schedule'
import type { DaySchedule } from '../data/schedule'
import './Sidebar.css'

interface SidebarProps {
  selectedDay: number | null
  onSelectDay: (day: number | null) => void
  collapsed: boolean
  onToggleCollapse: () => void
  showRoute: boolean
  onToggleRoute: () => void
}

function DayCard({ item, isSelected, onClick }: {
  item: DaySchedule
  isSelected: boolean
  onClick: () => void
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
      <div className="day-card__image" style={{ backgroundImage: `url(${item.image})` }}>
        <div className="day-card__image-overlay" />
        <span className="day-card__day-badge">DAY {item.day}</span>
      </div>
      <div className="day-card__info">
        <div className="day-card__info-row">
          <span className="day-card__label">날짜</span>
          <span className={`day-card__value ${isWeekend ? 'day-card__value--weekend' : ''}`}>
            {item.date} ({item.weekday})
          </span>
        </div>
        <div className="day-card__info-row">
          <span className="day-card__label">도시</span>
          <span className="day-card__value">{item.city}, {item.country}</span>
        </div>
        <div className="day-card__info-row">
          <span className="day-card__label">이동</span>
          <span className="day-card__value">{item.transport}</span>
        </div>
        <div className="day-card__info-row">
          <span className="day-card__label">관광</span>
          <span className="day-card__value day-card__value--activities">{item.activities}</span>
        </div>
      </div>
    </div>
  )
}

export default function Sidebar({ selectedDay, onSelectDay, collapsed, onToggleCollapse, showRoute, onToggleRoute }: SidebarProps) {
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
          <div className="sidebar__header-top">
            <span className="sidebar__icon">&#9992;</span>
            <div>
              <h2 className="sidebar__title">여행 일정</h2>
              <p className="sidebar__subtitle">2026. 8. 15 — 8. 28</p>
            </div>
          </div>
          <div className="sidebar__progress">
            <div className="sidebar__progress-bar">
              <div className="sidebar__progress-fill" style={{ width: '100%' }} />
            </div>
            <span className="sidebar__progress-text">14일 / 6개 도시</span>
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
            />
          ))}
        </div>
      </aside>
    </>
  )
}
