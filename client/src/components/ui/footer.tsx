import { Link } from 'react-router-dom';

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    to={href}
    className="px-4 py-2 border border-primary/20 rounded hover:border-primary/40
               hover:bg-primary/10 transition-all duration-300 text-sm"
  >
    {children}
  </Link>
);

export const Footer = () => {
  return (
    <footer className="w-full max-w-4xl mx-auto py-6 px-4">
      <nav className="flex flex-wrap gap-4 justify-center items-center">
        <FooterLink href="/x">X</FooterLink>
        <FooterLink href="/telegram">Telegram</FooterLink>
        <FooterLink href="/telegram">Discord</FooterLink>
        <FooterLink href="/telegram">Github</FooterLink>
        <FooterLink href="/dexscreener">Dexscreener</FooterLink>
        <FooterLink href="/disclaimer">Disclaimer</FooterLink>
        <FooterLink href="/about">About</FooterLink>
      </nav>
    </footer>
  );
};