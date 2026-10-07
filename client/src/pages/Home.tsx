import { FormEvent, useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  Clock3,
  Coffee,
  Croissant,
  ExternalLink,
  Instagram,
  MapPin,
  Menu as MenuIcon,
  Phone,
  Sparkles,
  Utensils,
  X,
} from "lucide-react";

const heroImage = "https://images.deliveryhero.io/image/talabat/MenuItems/SIGNATURE__BUN638024010968978277.jpg?width=1200";
const bunImage = "https://i0.wp.com/papparoti.us/wp-content/uploads/2025/12/BUN-2-scaled-1.jpg?fit=1200%2C900&quality=78";
const menuImages = [
  "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=480&q=68",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=480&q=68",
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=480&q=68",
];
const foodImages = [
  { src: "https://images.unsplash.com/photo-1768849352371-24837caf2179?auto=format&fit=crop&w=720&q=78", alt: "Grilled lamb chops with couscous and garnish" },
  { src: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=720&q=78", alt: "Chicken sandwich with fresh fillings" },
  { src: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=720&q=78", alt: "Creamy pasta topped with chicken" },
  { src: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=720&q=78", alt: "Beef burger with fresh toppings" },
  { src: "https://images.unsplash.com/photo-1652677050854-cf617a24b0d2?auto=format&fit=crop&w=720&q=78", alt: "Colorful cocktail served over ice" },
  { src: "https://images.unsplash.com/photo-1516559828984-fb3b99548b21?auto=format&fit=crop&w=720&q=78", alt: "Scoops of ice cream" },
];
const circleMallOrder = "https://www.ubereats.com/ke/store/papparoti-kilimani/OFu5oYdSVKO2ENPfM2QpNQ";
const guestReviews = "https://www.tripadvisor.com/Restaurant_Review-g294207-d26867060-Reviews-Papparoti-Nairobi.html";

const locations: { name: string; area: string; address: string; phone: string; hours: string; maps: string; order?: string; reviews?: string }[] = [
  {
    name: "Circle Mall",
    area: "Kilimani",
    address: "Circle Mall, Timau Road, Nairobi",
    phone: "+254 768 612 064",
    hours: "Daily, 7:00 AM–10:00 PM",
    maps: "https://www.google.com/maps/search/?api=1&query=Circle+Mall+Kilimani+Nairobi",
  },
  {
    name: "Broadwalk Mall",
    area: "Westlands",
    address: "Broadwalk Mall, Muthithi Road, Nairobi",
    phone: "+254 741 799 330",
    hours: "Daily, 7:00 AM–10:00 PM",
    maps: "https://www.google.com/maps/search/?api=1&query=Broadwalk+Mall+Nairobi",
    reviews: guestReviews,
  },
];

locations[0].order = circleMallOrder;
locations[0].reviews = guestReviews;

const menuGroups = [
  {
    label: "01 / Start here",
    title: "Signature buns",
    copy: "A crisp coffee-caramel top, a soft centre, and the smell of a bun just out of the oven.",
    items: [
      ["Papparoti signature bun", "A crisp coffee-flavoured top and soft, buttery centre"],
      ["Bun + hot drink", "A classic pairing from the Papparoti menu"],
    ],
    icon: Croissant,
    image: menuImages[0],
    imageAlt: "Freshly baked pastries arranged for serving",
  },
  {
    label: "02 / Find your cup",
    title: "Coffee & drinks",
    copy: "Coffee and cold drinks to go with an early start or an unhurried afternoon.",
    items: [
      ["Iced coffee & milk tea", "Cool pairings to enjoy with a warm bun"],
      ["Bubble tea & blended drinks", "Explore Papparoti favourites; selection varies by branch"],
    ],
    icon: Coffee,
    image: menuImages[1],
    imageAlt: "Coffee being prepared at a café",
  },
  {
    label: "03 / Stay a while",
    title: "Breakfast & dining",
    copy: "Breakfast and a broader restaurant menu for the meal that turns into a catch-up.",
    items: [
      ["A bun for breakfast", "A warm start, with your drink of choice"],
      ["Something to share", "Ask the Nairobi team what is available today"],
    ],
    icon: Utensils,
    image: foodImages[1].src,
    imageAlt: "Chicken sandwich with fresh fillings",
  },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showReservation, setShowReservation] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Papparoti Kenya — Warm buns, good coffee, good company";
    const metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (metaDescription) metaDescription.content = "Discover Papparoti's signature Malaysian coffee bun, explore drink pairings, and visit our cafés at Circle Mall in Kilimani and Broadwalk Mall in Westlands, Nairobi.";
    if (window.location.hash === "#reserve") setShowReservation(true);
  }, []);

  const handleReserve = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const branch = locations.find((location) => location.name === form.get("branch")) ?? locations[0];
    const requests = String(form.get("requests") || "").trim();
    const details = `Hello Papparoti, I’d like to request a table at ${branch.name}. Name: ${form.get("name")}. Phone: ${form.get("phone")}. Guests: ${form.get("guests")}. Preferred date and time: ${form.get("date")}.${requests ? ` Special requests: ${requests}.` : ""}`;
    window.open(`https://wa.me/${branch.phone.replace(/\D/g, "")}?text=${encodeURIComponent(details)}`, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  const closeReservation = () => {
    setShowReservation(false);
    setSubmitted(false);
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <a href="#top" className="brand" aria-label="Papparoti Kenya home">
          <img className="brand-logo" src="/images/papparoti-logo.png" alt="Papparoti" />
          <span className="brand-country">Kenya</span>
        </a>
        <nav id="site-navigation" className={`main-nav ${mobileNavOpen ? "open" : ""}`} aria-label="Main navigation">
          <a href="/menu" onClick={() => setMobileNavOpen(false)}>Menu</a>
          <a href="/about" onClick={() => setMobileNavOpen(false)}>Our story</a>
          <a href="/locations" onClick={() => setMobileNavOpen(false)}>Locations</a>
          <a href="/contact" onClick={() => setMobileNavOpen(false)}>Contact</a>
        </nav>
        <div className="header-actions">
          <button className="button header-reserve" onClick={() => setShowReservation(true)}>Reserve</button>
          <a className="header-order" href={circleMallOrder} target="_blank" rel="noreferrer"><span>Order</span><span className="header-order-full">from Circle Mall</span><ArrowRight size={15} /></a>
          <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={mobileNavOpen} aria-controls="site-navigation" onClick={() => setMobileNavOpen((open) => !open)}>
            {mobileNavOpen ? <X size={21} /> : <MenuIcon size={21} />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Fresh from the oven, Nairobi</p>
            <h1>Meet us where<br /><i>the bun is warm.</i></h1>
            <p className="hero-intro">Crisp coffee-flavoured crust. Soft, buttery centre. One bite, different expressions. Find your favourite pairing at our Nairobi cafés.</p>
            <div className="hero-actions">
              <button className="button button-dark" onClick={() => scrollToSection("menu")}>Find something good <ArrowRight size={17} /></button>
              <button className="text-link" onClick={() => scrollToSection("locations")}>Choose your branch <ArrowDownRight size={17} /></button>
            </div>
            <div className="hero-note"><Sparkles size={15} /> Circle Mall, Kilimani <span aria-hidden="true">·</span> Broadwalk Mall</div>
          </div>
          <div className="hero-media">
            <img src={heroImage} alt="Golden freshly baked pastry, warm from the oven" loading="eager" fetchPriority="high" />
            <div className="hero-caption"><span>01</span><span>Made for the first sip</span></div>
          </div>
        </section>

        <section className="ticker" aria-label="Papparoti highlights">
          <span>Warm coffee buns</span><i>✦</i><span>Coffee worth slowing down for</span><i>✦</i><span>Breakfast through dinner</span><i>✦</i><span>Room for one more</span><i>✦</i>
        </section>

        <section className="story-section section-grid" id="story">
          <div className="section-kicker">The Papparoti ritual</div>
          <div className="story-content">
            <div className="story-heading">
              <p className="eyebrow">Not just a bun</p>
              <h2>That first crack<br />of <i>coffee crust.</i></h2>
            </div>
            <div className="story-body">
              <p>Born in Malaysia, Papparoti began with a simple idea: a coffee-coated bun with a crisp, aromatic top and a soft, buttery middle. The contrast is what makes the first bite memorable.</p>
              <p>Today, the signature bun brings people together across the world. Pair yours with a drink, bring a friend, or make it a quiet moment of your own.</p>
              <a className="arrow-link" href="/about">Discover the Papparoti story <ArrowRight size={17} /></a>
            </div>
            <div className="story-image-wrap"><img src={bunImage} alt="Freshly baked golden pastry with a crisp, layered crust" loading="lazy" /><span>Warm from the oven</span></div>
          </div>
        </section>

        <section className="menu-section" id="menu">
          <div className="menu-intro section-grid">
            <div className="section-kicker">A table for every mood</div>
            <div>
              <p className="eyebrow">Discover the menu</p>
              <h2>Start with the bun.<br /><i>Stay for everything else.</i></h2>
              <p className="muted-copy">The signature bun is made for a good cup. Explore Papparoti favourites, from hot drinks to iced coffee and milk tea, then check with your Nairobi branch for today’s selection.</p>
            </div>
          </div>
          <div className="food-photo-grid" aria-label="A taste of the wider menu">
            {foodImages.map((image) => <img key={image.alt} src={image.src} alt={image.alt} loading="lazy" />)}
          </div>
          <div className="menu-list">
            {menuGroups.map((group, index) => {
              const Icon = group.icon;
              return (
                <article className="menu-group" key={group.title}>
                  <img className="menu-group-photo" src={group.image} alt={group.imageAlt} loading="lazy" />
                  <div className="menu-group-icon"><Icon size={23} strokeWidth={1.5} /></div>
                  <div className="menu-group-main">
                    <span className="menu-label">{group.label}</span>
                    <h3>{group.title}</h3>
                    <p>{group.copy}</p>
                    <div className="menu-items">
                      {group.items.map(([name, description]) => <a className="menu-item" href={circleMallOrder} target="_blank" rel="noreferrer" key={name}><span><strong>{name}</strong><small>{description}</small></span><ArrowUpRightIcon /></a>)}
                    </div>
                  </div>
                  <span className="menu-index">0{index + 1}</span>
                </article>
              );
            })}
          </div>
          <div className="menu-footnote"><span><Check size={15} /> Check current items and prices before ordering.</span><span>Ask the branch about allergens and availability.</span><a className="arrow-link" href="/menu">Explore the full menu <ArrowRight size={15} /></a><a className="arrow-link" href={circleMallOrder} target="_blank" rel="noreferrer">View live Circle Mall menu <ExternalLink size={15} /></a></div>
        </section>

        <section className="locations-section" id="locations">
          <div className="section-grid locations-heading">
            <div className="section-kicker">Come see us</div>
            <div><p className="eyebrow">Visit Papparoti</p><h2>Pick the place.<br /><i>We’ll save you a seat.</i></h2></div>
          </div>
          <div className="location-list">
            {locations.map((location, index) => (
              <article className="location-card" key={location.name}>
                <div className="location-number">0{index + 1}</div>
                <div className="location-info"><span className="menu-label">Nairobi / {location.area}</span><h3>{location.name}</h3><p><MapPin size={16} /> {location.address}</p><p><Clock3 size={16} /> {location.hours}</p><p><Phone size={16} /> {location.phone}</p></div>
                <div className="location-actions"><a href={`tel:${location.phone.replace(/\s/g, "")}`} className="button button-light"><Phone size={15} /> Call branch</a><a href={location.maps} target="_blank" rel="noreferrer" className="text-link">Directions <ExternalLink size={15} /></a><a href={location.reviews} target="_blank" rel="noreferrer" className="text-link">Guest reviews <ExternalLink size={15} /></a>{location.order && <a href={location.order} target="_blank" rel="noreferrer" className="text-link">Order delivery <ExternalLink size={15} /></a>}</div>
              </article>
            ))}
          </div>
          <div className="home-map-preview"><div><p className="eyebrow">Around Nairobi</p><h3>Two cafés.<br /><i>One warm welcome.</i></h3><p>Find us in Kilimani and Westlands. Get directions, call ahead, or explore each branch.</p><a className="button button-dark" href="/locations">Explore all locations <ArrowRight size={16} /></a></div><iframe title="Papparoti cafés in Nairobi map" src="https://maps.google.com/maps?q=Nairobi%2C%20Kenya&t=&z=11&ie=UTF8&iwloc=&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
        </section>

        <section className="reserve-section" id="reserve">
          <div className="reserve-card">
            <div><p className="eyebrow">Gather here</p><h2>Make time<br /><i>for good company.</i></h2><p>Planning a catch-up, family breakfast, or a meal together? Share your preferred time with a branch on WhatsApp and they’ll confirm availability.</p></div>
            <button className="button button-cream" onClick={() => setShowReservation(true)}>Request a reservation <ArrowRight size={17} /></button>
          </div>
          <div className="reserve-links"><a href="tel:+254768612064"><Phone size={16} /> Call Circle Mall</a><a href="#locations"><MapPin size={16} /> Find a branch</a><a href="https://www.ubereats.com/ke/store/papparoti-kilimani/OFu5oYdSVKO2ENPfM2QpNQ" target="_blank" rel="noreferrer"><ExternalLink size={16} /> Order delivery</a></div>
        </section>

        <section className="social-section">
          <div className="social-quote"><p className="eyebrow">Before you visit</p><h2>Hear it from<br /><i>the people who came.</i></h2><p>Read recent guest feedback on Tripadvisor, or get in touch with your preferred branch.</p><a className="arrow-link" href={guestReviews} target="_blank" rel="noreferrer">Browse guest reviews <ExternalLink size={15} /></a><a className="arrow-link" href="/contact">Contact Papparoti Kenya <ArrowRight size={15} /></a></div>
          <div className="social-aside"><Instagram size={22} /><p>A look at what’s fresh and happening at Papparoti Kenya.</p><a className="arrow-link" href="https://www.instagram.com/papparotikenya/" target="_blank" rel="noreferrer">Follow along <ExternalLink size={15} /></a></div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand"><a className="brand" href="#top" aria-label="Papparoti Kenya home"><img className="brand-logo" src="/images/papparoti-logo.png" alt="Papparoti" /><span className="brand-country">Kenya</span></a><p>Fresh baked warmth, in Nairobi.</p></div>
        <div className="footer-columns"><div><span className="footer-label">Explore</span><a href="/menu">Menu</a><a href="/about">Our story</a><a href="/locations">Locations</a></div><div><span className="footer-label">Visit</span><a href="tel:+254768612064">Call Circle Mall</a><a href="/contact">Contact</a><a href="https://www.ubereats.com/ke/store/papparoti-kilimani/OFu5oYdSVKO2ENPfM2QpNQ" target="_blank" rel="noreferrer">Order delivery</a></div><div><span className="footer-label">Follow</span><a href="https://www.instagram.com/papparotikenya/" target="_blank" rel="noreferrer">Instagram</a><a href="#top">Back to top</a></div></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Papparoti Kenya</span><span>A warm bun. A good cup. A little more time.</span></div>
      </footer>

      {showReservation && <div className="modal-backdrop" role="presentation" onClick={(event) => { if (event.target === event.currentTarget) closeReservation(); }}><div className="reservation-modal" role="dialog" aria-modal="true" aria-labelledby="reserve-title"><button className="modal-close" onClick={closeReservation} aria-label="Close reservation form"><X size={20} /></button>{submitted ? <div className="submitted-state"><span className="success-mark"><Check size={24} /></span><p className="eyebrow">One last step</p><h2 id="reserve-title">Your message is ready.</h2><p>WhatsApp has opened with your request. Review it and tap Send to reach the branch. Your table is not confirmed until the team replies.</p><button className="button button-dark" onClick={closeReservation}>Done</button></div> : <><p className="eyebrow">Request a table</p><h2 id="reserve-title">Make room<br /><i>for good company.</i></h2><form onSubmit={handleReserve}><label>Name<input name="name" required placeholder="Your name" /></label><label>Phone number<input name="phone" required type="tel" placeholder="+254 …" /></label><div className="form-row"><label>Branch<select name="branch" defaultValue="Circle Mall"><option value="Circle Mall">Circle Mall, Kilimani</option><option value="Broadwalk Mall">Broadwalk Mall</option></select></label><label>Guests<select name="guests" defaultValue="2 guests"><option>2 guests</option><option>3–4 guests</option><option>5+ guests</option></select></label></div><label>Preferred date & time<input name="date" required type="datetime-local" /></label><label>Special requests<textarea name="requests" rows={3} placeholder="Dietary needs, seating preferences, or anything else for the team" /></label><button className="button button-dark" type="submit">Continue in WhatsApp <ArrowRight size={17} /></button><small>Your request is sent only after you tap Send in WhatsApp. The branch will confirm availability.</small></form></>}</div></div>}
    </div>
  );
}

function ArrowUpRightIcon() {
  return <ArrowRight size={16} className="item-arrow" />;
}
