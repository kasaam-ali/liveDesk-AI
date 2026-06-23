import Link from 'next/link';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export default function Header({
  title = 'LiveDesk AI',
  subtitle = 'Visual AI Receptionist',
}: HeaderProps) {
  return (
    <header className="text-center py-6 relative">
      <h1 className="text-3xl font-bold" style={{ color: '#e94560' }}>
        {title}
      </h1>
      <p className="text-sm mt-1" style={{ color: '#8892b0' }}>
        {subtitle}
      </p>
      <Link
        href="/dashboard"
        className="absolute right-0 top-6 text-xs hover:underline"
        style={{ color: '#4a9eff' }}
      >
        Dashboard →
      </Link>
    </header>
  );
}
