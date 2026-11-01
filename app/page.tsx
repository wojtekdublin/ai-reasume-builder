"use client";

import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react'
import { FiArrowDown, FiArrowRight, FiArrowUpRight, FiBookmark, FiCamera, FiCheck, FiHeart, FiMenu, FiMessageCircle, FiPlus, FiSend, FiUsers, FiX } from './icons'

const photos = [
  { id: 'coast', category: 'Outdoors', title: 'A little closer to the sea.', user: 'oliver.wanders', location: 'Somewhere along the coast', alt: 'Gentle ocean waves under a pastel evening sky' },
  { id: 'coffee', category: 'Everyday', title: 'Slow mornings, always.', user: 'the.slow.days', location: 'The good kind of Monday', alt: 'Coffee brewing equipment in a sunlit cafe' },
  { id: 'interior', category: 'Design', title: 'Room for a little daydreaming.', user: 'spaces.by.sofia', location: 'A place to call home', alt: 'A sunlit living room with natural textures and plants' },
  { id: 'mountains', category: 'Outdoors', title: 'Out here, everything feels smaller.', user: 'alex.outside', location: 'Taking the scenic route', alt: 'Dramatic mountain peaks under a cloudy sky' },
  { id: 'flowers', category: 'Everyday', title: 'A small reason to smile.', user: 'flora.and.light', location: 'Little things, lately', alt: 'Delicate pink blossoms in soft spring light' },
  { id: 'city', category: 'Travel', title: 'The city has its own kind of stars.', user: 'jules.in.motion', location: 'New York, after hours', alt: 'New York City lights and buildings at dusk' },
]

function Brand() {
  return <a className="brand" href="#" aria-label="Gather home"><span className="brand-mark"><span /><span /><span /><span /></span>gather<span className="brand-period">.</span></a>
}

function App() {
  const [category, setCategory] = useState('For you')
  const [liked, setLiked] = useState<string[]>([])
  const [saved, setSaved] = useState<string[]>([])
  const [dialog, setDialog] = useState(false)
  const [selected, setSelected] = useState<(typeof photos)[number] | null>(null)
  const [joined, setJoined] = useState(false)
  const [menu, setMenu] = useState(false)
  const modalRef = useRef<HTMLElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)
  const modalOpen = dialog || Boolean(selected)

  useEffect(() => {
    if (!modalOpen) return
    previousFocus.current = document.activeElement as HTMLElement
    const oldOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    modalRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setDialog(false); setSelected(null) }
      if (event.key === 'Tab') {
        const elements = modalRef.current?.querySelectorAll<HTMLElement>('button, input, a[href]')
        if (!elements?.length) return
        const first = elements[0]
        const last = elements[elements.length - 1]
        if (event.shiftKey && (document.activeElement === first || document.activeElement === modalRef.current)) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = oldOverflow; document.removeEventListener('keydown', onKey); previousFocus.current?.focus() }
  }, [modalOpen])

  const toggle = (setter: Dispatch<SetStateAction<string[]>>, id: string) => setter((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id])
  const openJoin = () => { setMenu(false); setDialog(true) }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="header page-width">
        <Brand />
        <nav className={menu ? 'navigation is-open' : 'navigation'} aria-label="Main navigation">
          <a href="#explore" onClick={() => setMenu(false)}>Explore</a>
          <a href="#how-it-works" onClick={() => setMenu(false)}>How it works</a>
          <a href="#our-story" onClick={() => setMenu(false)}>Our story</a>
        </nav>
        <button className="button button-small header-join" onClick={openJoin}>Find your people <FiArrowUpRight /></button>
        <button className="menu-button icon-button" aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <FiX /> : <FiMenu />}</button>
      </header>
      <main id="main">
        <section className="hero page-width">
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot" /> A LITTLE MORE HUMAN. A LITTLE MORE YOU.</div>
            <h1>Life’s better<br />when you<br /> <span className="serif-word">share it.</span><span className="sparkle" aria-hidden="true">✳</span></h1>
            <p>A place for your everyday magic. Share what you love,<br className="desktop-break" /> find your kind of people, and make a little connection.</p>
            <div className="hero-actions"><button className="button" onClick={openJoin}>Find your people <FiArrowUpRight /></button><a className="text-link" href="#explore">Take a look around <FiArrowRight /></a></div>
            <div className="hero-note"><div className="avatar-stack"><img src="/images/portrait.jpg" alt="" /><img src="/images/friends.jpg" alt="" /><span>☺</span></div><span>Good moments. Real connections.<br /><strong>A little corner of the internet to call yours.</strong></span></div>
          </div>
          <div className="hero-art" aria-label="A preview of moments shared on Gather">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <div className="handwritten top-note">the little things are the big things <span>↘</span></div>
            <article className="polaroid coast-card">
              <div className="photo-author"><img src="/images/portrait.jpg" alt="" /><span>oliver.wanders</span><span className="tiny-dots">•••</span></div>
              <img className="coast-image" src="/images/coast.jpg" alt="Gentle ocean waves in soft evening light" fetchPriority="high" />
              <div className="post-actions"><button className={`icon-button ${liked.includes('hero') ? 'is-liked' : ''}`} aria-label="Like coastal moment" aria-pressed={liked.includes('hero')} onClick={() => toggle(setLiked, 'hero')}><FiHeart /></button><FiMessageCircle /><FiSend /><button className="icon-button bookmark-action" aria-label="Save coastal moment" aria-pressed={saved.includes('hero')} onClick={() => toggle(setSaved, 'hero')}><FiBookmark fill={saved.includes('hero') ? 'currentColor' : 'none'} /></button></div>
              <p>A little saltwater is good for the soul. <span>☀</span></p>
            </article>
            <article className="polaroid portrait-card"><img src="/images/portrait.jpg" alt="A portrait of a woman in soft studio light" /><div><span>Just being me.</span><span>♡</span></div></article>
            <article className="polaroid coffee-card"><img src="/images/coffee.jpg" alt="Coffee being brewed for a slow morning" /><div>Slow mornings, full hearts. <span>☕</span></div></article>
            <div className="connection-pill"><span className="connection-heart"><FiHeart /></span><span>A little moment.<br /><strong>A real connection.</strong></span><span className="pill-spark">✦</span></div>
            <div className="art-doodle" aria-hidden="true">✳</div>
            <span className="handwritten bottom-note">less perfect. more present.</span>
          </div>
        </section>
        <div className="values-bar"><div className="page-width values-inner"><span><FiCamera /> Everyday, worth sharing</span><span className="values-star">✳</span><span><FiUsers /> Your people are out there</span><span className="values-star">✳</span><span><FiHeart /> A little less scroll. A little more soul.</span></div></div>
        <section className="explore-section page-width" id="explore">
          <div className="section-heading"><div><div className="eyebrow">A WINDOW INTO SOMEONE’S WORLD</div><h2>Ordinary moments.<br /><span className="serif-word">Extraordinary connections.</span></h2></div><p>A new perspective. A shared obsession.<br />Your next favorite corner of the world is here.</p></div>
          <div className="explore-toolbar"><div className="filters" aria-label="Filter moments">{['For you', 'Everyday', 'Outdoors', 'Travel', 'Design'].map((item) => <button key={item} onClick={() => setCategory(item)} className={category === item ? 'filter active' : 'filter'} aria-pressed={category === item}>{item === 'For you' && <span>✦</span>}{item}</button>)}</div><span className="gallery-note">A glimpse of life on Gather <FiArrowDown /></span></div>
          <div className="photo-grid">{photos.filter((photo) => category === 'For you' || photo.category === category).map((photo) => <article className="moment" key={photo.id}>
            <button className="moment-image-button" onClick={() => setSelected(photo)} aria-label={`View ${photo.title}`}><img src={`/images/${photo.id}.jpg`} alt={photo.alt} loading="lazy" /><span className="moment-overlay"><span>{photo.title}</span><FiArrowUpRight /></span><span className="category-label">{photo.category}</span></button>
            <div className="moment-info"><div><span className={`mini-avatar avatar-${photo.id}`}>{photo.user.charAt(0)}</span><span>{photo.user}</span></div><button className={`icon-button ${liked.includes(photo.id) ? 'is-liked' : ''}`} aria-label={`Like ${photo.title}`} aria-pressed={liked.includes(photo.id)} onClick={() => toggle(setLiked, photo.id)}><FiHeart /></button></div>
          </article>)}</div>
          <p className="demo-caption">A few imagined moments from a world we’re building together.</p>
        </section>
        <section id="how-it-works" className="how-section page-width"><div className="how-intro"><div className="eyebrow">COME AS YOU ARE</div><h2>No big production.<br /><span className="serif-word">Just your little world.</span></h2><p>The best stories are already happening.<br />You just have to let someone in.</p></div><div className="steps">{[{ icon: <FiCamera />, title: 'Catch a little moment.', text: 'The first coffee. The last light. The things that make your day yours.' }, { icon: <FiUsers />, title: 'Find a familiar feeling.', text: 'Discover people who see the world a little like you. Or a little differently.' }, { icon: <FiHeart />, title: 'Make a real connection.', text: 'Start with a shared moment. See where a simple hello takes you.' }].map((step, index) => <div className="step" key={step.title}><span className="step-icon">{step.icon}</span><div><span className="step-number">0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></div></div>)}</div></section>
        <section className="join-section page-width" id="our-story"><span className="join-doodle" aria-hidden="true">✳</span><div className="eyebrow">LESS NOISE. MORE FEELING.</div><h2>The world doesn’t need<br />another perfect feed.<br /><span className="serif-word">It needs a little more you.</span></h2><p>That’s the idea behind Gather. A space for the everyday,<br className="desktop-break" /> the in-between, and the people who make it all matter.</p><button className="button button-cream" onClick={openJoin}>Find your people <FiArrowUpRight /></button><span className="join-small">Your next good thing could start with a hello.</span></section>
      </main>
      <footer className="footer page-width"><Brand /><span>A little more connected. A little more human.</span><a href="#main">Back to the top <FiArrowUpRight /></a><span className="copyright">© 2026 Gather · A social app concept</span></footer>
      {modalOpen && <div className="modal-backdrop" onClick={(event) => { if (event.target === event.currentTarget) { setDialog(false); setSelected(null) } }}><section className={`modal ${selected ? 'photo-modal' : ''}`} ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="modal-title" tabIndex={-1}><button className="modal-close icon-button" aria-label="Close dialog" onClick={() => { setDialog(false); setSelected(null) }}><FiX /></button>
        {selected ? <><img className="modal-photo" src={`/images/${selected.id}.jpg`} alt={selected.alt} /><div className="modal-photo-copy"><div className="eyebrow">{selected.location}</div><h2 id="modal-title">{selected.title}</h2><div className="modal-photo-footer"><span>@{selected.user}</span><div><button className={`icon-button ${liked.includes(selected.id) ? 'is-liked' : ''}`} aria-label="Like moment" aria-pressed={liked.includes(selected.id)} onClick={() => toggle(setLiked, selected.id)}><FiHeart /></button><button className="icon-button" aria-label="Save moment" aria-pressed={saved.includes(selected.id)} onClick={() => toggle(setSaved, selected.id)}><FiBookmark fill={saved.includes(selected.id) ? 'currentColor' : 'none'} /></button></div></div></div></> : joined ? <div className="join-dialog-content"><span className="success-mark"><FiCheck /></span><h2 id="modal-title">You’re in good company.</h2><p>Thanks for trying Gather! Your demo signup is complete. Here’s to more little moments.</p><button className="button" onClick={() => setDialog(false)}>Keep exploring <FiArrowRight /></button><small>This is a design preview. No details were sent or stored.</small></div> : <div className="join-dialog-content"><span className="dialog-spark">✳</span><div className="eyebrow">YOUR PEOPLE ARE OUT THERE</div><h2 id="modal-title">A little hello.<br /><span className="serif-word">A new beginning.</span></h2><p>Try the Gather signup preview and imagine a feed that feels a little more like you.</p><form onSubmit={(event) => { event.preventDefault(); modalRef.current?.focus(); setJoined(true) }}><label htmlFor="name">What should we call you?</label><input id="name" name="name" placeholder="Your first name" autoComplete="given-name" required maxLength={80} /><label htmlFor="email">Your email address</label><input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required /><button className="button" type="submit">Count me in <FiPlus /></button></form><small>Just a design preview. No account is created.</small></div>}
      </section></div>}
    </>
  )
}

export default App
