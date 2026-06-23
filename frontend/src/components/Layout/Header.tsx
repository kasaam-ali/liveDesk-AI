interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export default function Header({
  title = 'LiveDesk AI',
  subtitle = 'Visual AI Receptionist',
}: HeaderProps) {
  return (
    <header className="text-center py-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        {title}
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        {subtitle}
      </p>
    </header>
  );
}
