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
        <FooterLink href="https://x.com/nova_dova_dao">X</FooterLink>
        <FooterLink href="https://t.me/novadovadao">Telegram</FooterLink>
        <FooterLink href="https://discord.gg/p5XDxgba6n">Discord</FooterLink>
        {/* <FooterLink href="/github">Github</FooterLink> */}
        <FooterLink href="https://dexscreener.com/solana/3i8wmd25pdifbikjmklelvenjjhim3mfluabcmeofwc2">Dexscreener</FooterLink>
        <FooterLink href="https://pump.fun/coin/8HjiRvPNwFT9jpzAAsYF4rE9y576CKdTkQZXaxibpump">Pump.fun</FooterLink>
        {/* <FooterLink href="/disclaimer">Disclaimer</FooterLink> */}
        {/* <FooterLink href="/roadmap">Road Map</FooterLink> */}
        {/* <FooterLink href="/about">About</FooterLink> */}
      </nav>
    </footer>
  );
};