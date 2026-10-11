import { useEffect, useRef, useState } from 'react'
import {
  profile, stats, dossier, experience, projects, skills, education, certifications, achievements, sections,
} from '../data'
import { Skyline, BatSignal } from './Gotham'
import {
  GitHub, LinkedIn, GFG, Mail, Phone, Download, Copy, Check, ArrowRight, Bat, linkIcon,
} from './Icons'

const num = (id) => String(sections.findIndex((s) => s.id === id) + 1).padStart(2, '0')

function SectionHead({ id, children }) {
  const s = sections.find((x) => x.id === id)
  return (
    <header className="section-head reveal">
      <p className="eyebrow" aria-hidden="true">
        <span className="eyebrow-no">{num(id)}</span>
        <span className="eyebrow-line" />
      </p>
      <h2>{s.label}</h2>
      {children && <p className="section-sub">{children}</p>}
    </header>
  )
}

function Chips({ items }) {
  return (
    <div className="chips">
      {items.map((s) => (
        <span key={s} className="chip">
          {s}
        </span>
      ))}
    </div>
  )
}

/* ---------- Hero ---------- */

export function Hero({ actions }) {
  return (
    <section className="hero" id="top">
      <div className="hero-sky" aria-hidden="true" />
      <BatSignal />
      <Skyline />
      <div className="container hero-inner">
        <p className="hero-kicker">
          <span className="kicker-dot" /> Software Engineer · Tirupur, India
        </p>
        <h1 className="hero-name">
          <span>Soma</span>
          <span>Prasanth R</span>
        </h1>
        <p className="hero-tagline">{profile.tagline}</p>
        <div className="hero-badges">
          <span className="badge">Ex-SWE Intern · PayPal</span>
          <span className="badge">B.Tech IT · PSG Tech ’27</span>
        </div>
        <div className="hero-cta">
          <a className="btn btn-gold" href="#projects" onClick={(e) => (e.preventDefault(), actions.goTo('projects'))}>
            View projects <ArrowRight />
          </a>
          <a className="btn btn-ghost" href={profile.resume} target="_blank" rel="noreferrer">
            <Download /> Résumé
          </a>
        </div>
        <div className="hero-social">
          <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <GitHub />
          </a>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedIn />
          </a>
          <a href={profile.links.gfg} target="_blank" rel="noreferrer" aria-label="GeeksforGeeks">
            <GFG />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email">
            <Mail />
          </a>
        </div>
      </div>
      <a
        className="scroll-cue"
        href="#about"
        onClick={(e) => (e.preventDefault(), actions.goTo('about'))}
        aria-label="Scroll to the next section"
      >
        <Bat width={28} height={14} />
      </a>
    </section>
  )
}

/* ---------- About ---------- */

function CountUp({ value, decimals = 0, suffix = '' }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return setShown(value)
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = (t) => {
        const p = Math.min(1, (t - start) / 1200)
        setShown(value * (1 - Math.pow(1 - p, 3)))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    })
    io.observe(el)
    return () => io.disconnect()
  }, [value])
  return (
    <span ref={ref}>
      {shown.toFixed(decimals)}
      {suffix}
    </span>
  )
}

export function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHead id="about" />
        <div className="about-grid">
          <div className="about-text reveal">
            <p className="lead">
              I build software that solves practical problems — from a cross-platform app for my
              college’s hostel portal to AI tooling for PayPal’s analytics platform.
            </p>
            <p>
              I’m an Information Technology student at <b>PSG College of Technology</b>, Coimbatore. At{' '}
              <b>PayPal</b> I worked on Insightly, an internal analytics platform, building a real-time
              streaming layer for an AI agent’s reasoning and an MCP tool layer that lets the agent build
              dashboards on its own.
            </p>
            <p>
              I work mainly in <b>Java</b>, <b>Kotlin</b>, <b>Python</b> and <b>TypeScript</b>, I’ve
              solved 600+ DSA problems, and I enjoy the whole stack — from reverse-engineering an
              undocumented API to polishing the last pixel of a UI.
            </p>
          </div>
          <aside className="dossier reveal" aria-label="Profile summary">
            <div className="dossier-head">
              <span className="typewriter">Profile</span>
            </div>
            <dl>
              {dossier.map(([k, v]) => (
                <div key={k} className="dossier-row">
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <Bat className="dossier-bat" width={120} height={60} />
          </aside>
        </div>
        <div className="stats reveal">
          {stats.map((s) => (
            <div key={s.label} className="stat">
              <div className="stat-value">
                <CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} />
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Experience ---------- */

export function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionHead id="experience" />
        {experience.map((e) => (
          <article key={e.company} className="mission reveal">
            <div className="mission-side">
              <span className="typewriter">Past internship</span>
              <div className="mission-org">{e.company}</div>
              <div className="mission-role">{e.role}</div>
            </div>
            <div className="mission-body">
              <p className="mission-op">
                <span className="label">Product</span> {e.product}
              </p>
              <ul className="bat-list">
                {e.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <Chips items={e.stack} />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ---------- Projects ---------- */

function ProjectLinks({ links }) {
  return (
    <div className="project-links">
      {links.map((l) => {
        const Icon = linkIcon[l.icon]
        return (
          <a key={l.href} className="btn btn-sm" href={l.href} target="_blank" rel="noreferrer">
            <Icon /> {l.label}
          </a>
        )
      })}
    </div>
  )
}

function CaseHeader({ index, featured }) {
  return (
    <div className="case-head">
      <span className="typewriter">Project {String(index + 1).padStart(2, '0')}</span>
      {featured && <span className="tag-featured">Featured</span>}
    </div>
  )
}

function FeaturedProject({ p }) {
  return (
    <article id={p.id} className="case case-featured reveal">
      <CaseHeader index={0} featured />
      <div className="featured-grid">
        <div className="featured-copy">
          <span className="case-kind">{p.kind}</span>
          <h3>{p.name}</h3>
          <p className="case-summary">{p.summary}</p>
          <Chips items={p.stack} />
          <ProjectLinks links={p.links} />
        </div>
        <div className="phones" aria-label="App screenshots">
          <span className="phones-light" aria-hidden="true" />
          {p.screenshots.map((s, i) => (
            <figure key={s.src} className={`phone phone-${i}`}>
              <img src={s.src} alt={s.alt} loading="lazy" width="540" height="1200" />
            </figure>
          ))}
        </div>
      </div>
    </article>
  )
}

function ProjectCard({ p, index }) {
  return (
    <article id={p.id} className="case reveal">
      <CaseHeader index={index} />
      <div className="case-body">
        <span className="case-kind">{p.kind}</span>
        <h3>{p.name}</h3>
        <p className="case-summary">{p.summary}</p>
        <div className="case-foot">
          <Chips items={p.stack} />
          <ProjectLinks links={p.links} />
        </div>
      </div>
      <Bat className="case-watermark" width={150} height={75} />
    </article>
  )
}

export function Projects() {
  const [featured, ...rest] = projects
  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHead id="projects">
          Selected work across mobile, full-stack web and AI.
        </SectionHead>
        <FeaturedProject p={featured} />
        <div className="case-grid">
          {rest.map((p, i) => (
            <ProjectCard key={p.id} p={p} index={i + 1} />
          ))}
        </div>
        <p className="more reveal">
          <a href={profile.links.github} target="_blank" rel="noreferrer">
            <GitHub /> More projects on GitHub <ArrowRight />
          </a>
        </p>
      </div>
    </section>
  )
}

/* ---------- Skills ---------- */

export function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHead id="skills">Languages, frameworks and tools I work with.</SectionHead>
        <div className="pouches">
          {skills.map((g, i) => (
            <div key={g.name} className="pouch reveal" style={{ transitionDelay: `${i * 50}ms` }}>
              <div className="pouch-top">
                <span className="pouch-clasp" aria-hidden="true" />
                <h3>{g.name}</h3>
              </div>
              <Chips items={g.items} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Education ---------- */

export function Education() {
  return (
    <section id="education" className="section">
      <div className="container">
        <SectionHead id="education" />
        <div className="training-grid">
          <div className="panel reveal">
            <h3 className="panel-title">Education</h3>
            {education.map((e) => (
              <div key={e.school} className="edu-item">
                <div className="edu-years">{e.years}</div>
                <div className="edu-school">{e.school}</div>
                <div className="edu-sub">
                  {e.degree} <span className="score">{e.score}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="panel reveal">
            <h3 className="panel-title">Achievements</h3>
            <ul className="bat-list">
              {achievements.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <h3 className="panel-title panel-title-gap">Certifications</h3>
            <ul className="bat-list">
              {certifications.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Contact ---------- */

function CopyButton({ text, label, actions }) {
  const [done, setDone] = useState(false)
  return (
    <button
      className="icon-btn"
      aria-label={`Copy ${label}`}
      title={`Copy ${label}`}
      onClick={() => {
        actions.copy(text, `${label[0].toUpperCase()}${label.slice(1)} copied`)
        setDone(true)
        setTimeout(() => setDone(false), 1500)
      }}
    >
      {done ? <Check /> : <Copy />}
    </button>
  )
}

export function Contact({ actions }) {
  const rows = [
    { key: 'Email', icon: Mail, text: profile.email, href: `mailto:${profile.email}`, copy: 'email' },
    { key: 'Phone', icon: Phone, text: profile.phone, href: profile.phoneHref, copy: 'phone number' },
    { key: 'LinkedIn', icon: LinkedIn, text: 'linkedin.com/in/somaprasanthr', href: profile.links.linkedin },
    { key: 'GitHub', icon: GitHub, text: 'github.com/SomaPrasanth', href: profile.links.github },
    { key: 'GeeksforGeeks', icon: GFG, text: 'geeksforgeeks.org/user/somapra54cm', href: profile.links.gfg },
  ]
  return (
    <section id="contact" className="section contact">
      <Skyline className="skyline-footer" />
      <div className="container contact-inner">
        <div className="signal-lamp reveal" aria-hidden="true">
          <span className="signal-glow" />
          <span className="signal-disc">
            <Bat width={150} height={75} />
          </span>
        </div>
        <SectionHead id="contact">
          I’m open to software engineering roles and project opportunities. The quickest way to
          reach me is by email or phone.
        </SectionHead>
        <div className="contact-card reveal">
          {rows.map((r) => {
            const Icon = r.icon
            const external = r.href.startsWith('http')
            return (
              <div key={r.key} className="contact-row">
                <span className="contact-key">{r.key}</span>
                <a
                  href={r.href}
                  className="contact-link"
                  {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                >
                  <Icon /> {r.text}
                </a>
                {r.copy && <CopyButton text={r.text} label={r.copy} actions={actions} />}
              </div>
            )
          })}
          <div className="contact-cta">
            <a className="btn btn-gold" href={`mailto:${profile.email}`}>
              <Mail /> Email me
            </a>
            <a className="btn btn-ghost" href={profile.resume} target="_blank" rel="noreferrer">
              <Download /> Download résumé
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
