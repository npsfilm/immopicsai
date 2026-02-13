import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "So funktioniert's", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Preise", href: "#pricing" },
  { label: "Ergebnisse", href: "/ergebnisse" },
  { label: "FAQ", href: "#faq" },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("#")) {
      if (location.pathname !== "/") {
        window.location.href = "/" + href;
        return;
      }
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-lg shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link to="/" className="font-grotesk text-2xl font-bold text-primary">
          ImmoPics.ai
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <button
                key={link.href}
                onClick={() => handleClick(link.href)}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {link.label}
              </button>
            )
          )}
          <button
            onClick={() => handleClick("#register")}
            className="bg-accent text-accent-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:brightness-110 transition-all"
          >
            Kostenlos starten
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-primary"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menü"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border px-6 pb-6 space-y-4">
          {navLinks.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMenuOpen(false)}
                className="block text-base font-medium text-foreground/80 py-2"
              >
                {link.label}
              </Link>
            ) : (
              <button
                key={link.href}
                onClick={() => handleClick(link.href)}
                className="block w-full text-left text-base font-medium text-foreground/80 py-2"
              >
                {link.label}
              </button>
            )
          )}
          <button
            onClick={() => handleClick("#register")}
            className="w-full bg-accent text-accent-foreground py-3 rounded-lg text-base font-semibold"
          >
            Kostenlos starten
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
