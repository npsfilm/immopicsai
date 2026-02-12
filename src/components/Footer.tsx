const Footer = () => (
  <footer className="py-10 border-t border-border">
    <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">© 2025 ImmoAI. Alle Rechte vorbehalten.</p>
      <div className="flex gap-6">
        {["Impressum", "Datenschutz", "AGB"].map((link) => (
          <a key={link} href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            {link}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
