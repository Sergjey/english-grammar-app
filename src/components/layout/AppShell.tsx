import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'

export function AppShell() {
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  return (
    <div className="flex min-h-dvh flex-col bg-cream text-ink">
      <header className="safe-top sticky top-0 z-20 border-b border-stone-200/80 bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
          <Link
            to="/"
            className="font-display text-lg font-semibold tracking-tight text-ink"
          >
            Murphy Drills
          </Link>
          <nav className="flex gap-2">
            <Link
              to="/units"
              className={`touch-target rounded-full px-4 py-2 text-sm font-medium transition ${
                location.pathname.startsWith('/units') || location.pathname.startsWith('/unit')
                  ? 'bg-teal text-white'
                  : 'bg-white text-ink ring-1 ring-stone-200'
              }`}
            >
              Units
            </Link>
          </nav>
        </div>
        {!isHome && (
          <div className="mx-auto max-w-3xl px-4 pb-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="touch-target inline-flex items-center gap-1 text-sm text-muted"
            >
              ← Back
            </button>
          </div>
        )}
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-4 md:py-6">
        <Outlet />
      </main>

      <footer className="safe-bottom border-t border-stone-200/80 py-4 text-center text-xs text-muted">
        Inspired by grammar topics · Not affiliated with Cambridge or Murphy
      </footer>
    </div>
  )
}
