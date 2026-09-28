import { ArrowRight, Clock3, Coffee, Croissant, ExternalLink, Instagram, MapPin, Menu as MenuIcon, Phone, Utensils, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Link } from "wouter";

const orderUrl = "https://www.ubereats.com/ke/store/papparoti-kilimani/OFu5oYdSVKO2ENPfM2QpNQ";
const reviewUrl = "https://www.tripadvisor.com/Restaurant_Review-g294207-d26867060-Reviews-Papparoti-Nairobi.html";

const branches = [
  { name: "Circle Mall", area: "Kilimani", address: "Circle Mall, Timau Road, Nairobi", phone: "+254 768 612 064", map: "https://www.google.com/maps/search/?api=1&query=Circle+Mall+Kilimani+Nairobi", embed: "https://maps.google.com/maps?q=Circle%20Mall%20Kilimani%20Nairobi&t=&z=14&ie=UTF8&iwloc=&output=embed", order: orderUrl },
  { name: "Broadwalk Mall", area: "Westlands", address: "Broadwalk Mall, Muthithi Road, Nairobi", phone: "+254 741 799 330", map: "https://www.google.com/maps/search/?api=1&query=Broadwalk+Mall+Nairobi", embed: "https://maps.google.com/maps?q=Broadwalk%20Mall%20Nairobi&t=&z=14&ie=UTF8&iwloc=&output=embed" },
];

function PageHeader() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const closeMenu = () => setMobileNavOpen(false);
  return <header className="site-header"><Link href="/" className="brand" aria-label="Papparoti Kenya home"><img className="brand-logo" src="/images/papparoti-logo.png" alt="Papparoti" /><span className="brand-country">Kenya</span></Link><nav id="page-navigation" className={`page-nav ${mobileNavOpen ? "open" : ""}`} aria-label="Main navigation"><Link href="/menu" onClick={closeMenu}>Menu</Link><Link href="/about" onClick={closeMenu}>Our story</Link><Link href="/locations" onClick={closeMenu}>Locations</Link><Link href="/contact" onClick={closeMenu}>Contact</Link></nav><div className="header-actions"><a className="header-order" href={orderUrl} target="_blank" rel="noreferrer"><span>Order</span><span className="header-order-full">from Circle Mall</span><ArrowRight size={15} /></a><button className="menu-toggle" aria-label={mobileNavOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileNavOpen} aria-controls="page-navigation" onClick={() => setMobileNavOpen((open) => !open)}>{mobileNavOpen ? <X size={21} /> : <MenuIcon size={21} />}</button></div></header>;
}

function PageFooter() {
  return <footer className="site-footer"><div className="footer-brand"><Link href="/" className="brand"><img className="brand-logo" src="/images/papparoti-logo.png" alt="Papparoti" /><span className="brand-country">Kenya</span></Link><p>Fresh baked warmth, in Nairobi.</p></div><div className="footer-columns"><div><span className="footer-label">Explore</span><Link href="/menu">Menu</Link><Link href="/about">Our story</Link></div><div><span className="footer-label">Visit</span><Link href="/locations">Locations</Link><Link href="/contact">Contact</Link></div><div><span className="footer-label">Follow</span><a href="https://www.instagram.com/papparotikenya/" target="_blank" rel="noreferrer">Instagram</a><a href={reviewUrl} target="_blank" rel="noreferrer">Guest reviews</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Papparoti Kenya</span><span>A warm bun. A good cup. A little more time.</span></div></footer>;
}

function PageFrame({ children, title, description }: { children: ReactNode; title: string; description: string }) {
  useEffect(() => {
    document.title = title;
    const metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (metaDescription) metaDescription.content = description;
  }, [title, description]);
  return <div className="site-shell"><PageHeader /><main className="inner-page">{children}</main><PageFooter /></div>;
}

export function MenuPage() {
  const menu = [
    { icon: Croissant, number: "01", title: "Signature buns", copy: "A crisp coffee-flavoured crust gives way to a soft, buttery centre. Enjoy the Papparoti classic warm." },
    { icon: Coffee, number: "02", title: "Bun & drink pairings", copy: "The global Papparoti menu pairs its signature bun with hot drinks, iced coffee, milk tea, bubble tea and an ice-blended durian drink." },
    { icon: Utensils, number: "03", title: "Your Nairobi visit", copy: "Make it a breakfast stop or a catch-up over a warm bun. Check with your branch for the current local selection." },
  ];
  return <PageFrame title="Menu | Papparoti Kenya" description="Explore Papparoti's Malaysian coffee bun and global drink pairings, then check current menu availability at our Nairobi branches."><section className="page-hero menu-page-hero"><p className="eyebrow">One bite. Different expressions.</p><h1>Good things<br /><i>for the table.</i></h1><p>At the heart of Papparoti is the Malaysian coffee bun: aromatic, crisp on top and soft in the middle. Pair it with a drink and make the moment yours.</p><a className="button button-dark" href={orderUrl} target="_blank" rel="noreferrer">Explore the live menu <ExternalLink size={16} /></a></section><section className="menu-page-grid" aria-label="Menu categories">{menu.map(({ icon: Icon, number, title, copy }) => <article className="menu-page-card" key={number}><span className="menu-page-number">{number} / PAPPA ROTI</span><Icon size={27} strokeWidth={1.4} /><h2>{title}</h2><p>{copy}</p><a href={orderUrl} target="_blank" rel="noreferrer">See current selection <ArrowRight size={15} /></a></article>)}</section><p className="page-note">The drink pairings above reflect the Papparoti global menu. For current Nairobi items, prices, allergens and branch availability, check the live Circle Mall ordering menu or call your preferred branch.</p></PageFrame>;
}

export function LocationsPage() {
  return <PageFrame title="Locations | Papparoti Kenya" description="Find Papparoti at Circle Mall in Kilimani or Broadwalk Mall in Westlands, Nairobi. View maps, call branches and get directions."><section className="page-hero locations-page-hero"><p className="eyebrow">Two Nairobi tables</p><h1>Find your<br /><i>nearest bun.</i></h1><p>Drop by either Papparoti branch for a warm bun and a little time to yourself.</p></section><section className="branch-grid">{branches.map((branch, index) => <article className="branch-card" key={branch.name}><div className="branch-map"><iframe title={`${branch.name} map`} src={branch.embed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div><div className="branch-details"><span className="menu-label">0{index + 1} / {branch.area}, Nairobi</span><h2>{branch.name}</h2><p><MapPin size={16} />{branch.address}</p><p><Clock3 size={16} />Hours may change. Call ahead to confirm.</p><p><Phone size={16} /><a href={`tel:${branch.phone.replace(/\s/g, "")}`}>{branch.phone}</a></p><div className="branch-actions"><a className="button button-dark" href={branch.map} target="_blank" rel="noreferrer">Get directions <ExternalLink size={15} /></a>{branch.order && <a className="text-link" href={branch.order} target="_blank" rel="noreferrer">Order delivery <ArrowRight size={15} /></a>}</div></div></article>)}</section></PageFrame>;
}

export function AboutPage() {
  return <PageFrame title="Our Story | Papparoti Kenya" description="Learn about Papparoti's Malaysian origins and the signature coffee bun enjoyed at our Nairobi cafés."><section className="page-hero about-page-hero"><p className="eyebrow">One bite. Different expressions.</p><h1>A bun like<br /><i>no other.</i></h1><p>Born in Malaysia in 2003, Papparoti began with one distinctive idea: an aromatic coffee-coated bun with a crisp top and soft, buttery centre.</p><a className="button button-dark" href="/locations">Visit Papparoti in Nairobi <ArrowRight size={16} /></a></section><section className="about-story"><div className="about-photo"><img src="https://i0.wp.com/papparoti.us/wp-content/uploads/2025/12/BUN-2-scaled-1.jpg" alt="A freshly baked Papparoti bun" loading="lazy" /></div><div><p className="eyebrow">From Malaysia, with love</p><h2>A simple bun.<br /><i>A world of moments.</i></h2><p>What started as a humble kiosk has grown into a global café brand. Papparoti brings people together through a signature bun, made memorable by the contrast of its crisp coffee-flavoured crust and soft, buttery middle.</p><p>In Nairobi, you can find us at Circle Mall in Kilimani and Broadwalk Mall in Westlands. Drop in for a warm bun and your favourite drink.</p><Link className="text-link" href="/menu">Explore the menu <ArrowRight size={16} /></Link></div></section></PageFrame>;
}

export function ContactPage() {
  return <PageFrame title="Contact | Papparoti Kenya" description="Contact Papparoti Kenya at Circle Mall, Kilimani or Broadwalk Mall, Westlands. Call a branch or get directions."><section className="page-hero contact-page-hero"><p className="eyebrow">We’d love to hear from you</p><h1>Say hello.<br /><i>Come on in.</i></h1><p>For branch questions, directions or a table request, get in touch with the team at your preferred location.</p></section><section className="contact-grid">{branches.map(branch => <article className="contact-card" key={branch.name}><span className="menu-label">{branch.area} / Nairobi</span><h2>{branch.name}</h2><p>{branch.address}</p><a href={`tel:${branch.phone.replace(/\s/g, "")}`}><Phone size={17} />{branch.phone}</a><a href={branch.map} target="_blank" rel="noreferrer"><MapPin size={17} />Get directions</a>{branch.order && <a href={branch.order} target="_blank" rel="noreferrer"><ExternalLink size={17} />Order delivery</a>}</article>)}</section><section className="contact-social"><div><Instagram size={22} /><h2>Keep up with<br /><i>what’s fresh.</i></h2><a className="text-link" href="https://www.instagram.com/papparotikenya/" target="_blank" rel="noreferrer">Follow Papparoti Kenya <ExternalLink size={15} /></a></div><div><h2>Hear from<br /><i>our guests.</i></h2><a className="text-link" href={reviewUrl} target="_blank" rel="noreferrer">Browse guest reviews <ExternalLink size={15} /></a></div></section></PageFrame>;
}
