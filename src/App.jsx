import { useCallback, useEffect, useMemo, useState } from 'react'
import { profile, sections } from './data'
import { Hero, About, Experience, Projects, Skills, Education, Contact } from './components/Sections'
import { Menu, Close, Check, Bat } from './components/Icons'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [current, setCurrent] = useState('top')
  const [toast, setToast] = useState(null)
  const [scrolled, setScrolled] = useState(false)

  const goTo = useCallback((id) => {
    setMenuOpen(false)
    if (id === 'top') return window.scrollTo({ top: 0, behavior: 'smooth' })
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    history.replaceState(null, '', `#${id}`)
  }, [])

  const copy = useCallback(async (text, message) => {
    try {
      await navigator.clipboard.writeText(text)
      setToast(message)
    } catch {
      setToast('Couldn’t copy — please copy it manually')
    }
  }, [])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2000)
    return () => clearTimeout(t)
  }, [toast])

  const actions = useMemo(() => ({ goTo, copy }), [goTo, copy])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Track the section in view for the nav, and reveal elements as they scroll in.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const y = window.scrollY + window.innerHeight * 0.5
      let id = 'top'
      for (const s of sections) {
        const el = document.getElementById(s.id)
        if (el && el.offsetTop <= y) id = s.id
      }
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) id = 'contact'
      setCurrent(id)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        }),
      { rootMargin: '0px 0px -8% 0px' },
    )
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))

    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [])

  return (
    <>
      <a className="skip-link" href="#about">
        Skip to content
      </a>
      <nav className={`topbar ${scrolled || menuOpen ? 'is-scrolled' : ''}`} aria-label="Main">
        <div className="container topbar-inner">
          <a className="brand" href="#top" onClick={(e) => (e.preventDefault(), goTo('top'))}>
            <Bat width={38} height={19} className="brand-bat" />
            <span className="brand-text">Soma Prasanth</span>
          </a>
          <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`nav-link ${current === s.id ? 'is-active' : ''}`}
                aria-current={current === s.id ? 'true' : undefined}
                onClick={(e) => (e.preventDefault(), goTo(s.id))}
              >
                {s.label}
              </a>
            ))}
          </div>
          <button
            className="icon-btn menu-btn"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <Close /> : <Menu />}
          </button>
        </div>
      </nav>

      <main>
        <Hero actions={actions} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact actions={actions} />
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <span className="footer-brand">
            <Bat width={28} height={14} /> © {new Date().getFullYear()} {profile.name}
          </span>
          <span className="footer-note">Built with React · Deployed on Vercel</span>
        </div>
      </footer>

      <div className={`toast ${toast ? 'is-visible' : ''}`} role="status" aria-live="polite">
        <Check /> {toast}
      </div>
    </>
  )
}
