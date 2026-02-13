import { Link } from "react-router-dom";

const footerLinks = [
  { label: "Impressum", to: "/impressum" },
  { label: "Datenschutz", to: "/datenschutz" },
  { label: "AGB", to: "/agb" },
];

const Footer = () => (
  <footer className="py-10 border-t border-border">
    <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} ImmoPics.ai. Alle Rechte vorbehalten.</p>
      <div className="flex gap-6">
        {footerLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
