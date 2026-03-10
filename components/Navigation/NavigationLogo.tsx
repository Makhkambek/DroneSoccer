import Link from 'next/link';

interface NavigationLogoProps {
  locale: string;
}

export function NavigationLogo({ locale }: NavigationLogoProps) {
  return (
    <Link href={`/${locale}`} className="flex items-center space-x-3 group">
      <div className="w-12 h-12 bg-white flex items-center justify-center transition-all duration-200 group-hover:bg-gray-200">
        <span className="text-black font-orbitron font-bold text-xl">DS</span>
      </div>
      <span className="font-orbitron text-2xl font-bold text-white hidden sm:block uppercase tracking-tight">
        DRONE SOCCER
      </span>
    </Link>
  );
}
