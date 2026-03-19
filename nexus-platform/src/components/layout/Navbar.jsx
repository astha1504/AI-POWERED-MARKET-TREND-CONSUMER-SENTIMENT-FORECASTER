
export default function Navbar({ onNav, page }) {
  if (page === 'dashboard') return null;

  const isAuth = page === 'login' || page === 'signup';

  const scrollTo = (id) => {
    onNav('landing');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <nav id="mainNav">
      <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); onNav('landing'); }}>
        NEX<span>US</span>
      </a>

      {!isAuth && (
        <ul className="nav-links">
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); scrollTo('features-section'); }}>Features</a>
          </li>
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); scrollTo('about-section'); }}>About</a>
          </li>
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); scrollTo('footer'); }}>Contact</a>
          </li>
        </ul>
      )}

      {!isAuth && (
        <div className="nav-cta">
          <a href="#" className="btn-ghost" onClick={(e) => { e.preventDefault(); onNav('login'); }}>Sign In</a>
          <a href="#" className="btn-primary" onClick={(e) => { e.preventDefault(); onNav('signup'); }}>Get Started</a>
        </div>
      )}
    </nav>
  );
}


