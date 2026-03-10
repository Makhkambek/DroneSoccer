export interface NavLink {
  href: string;
  label: string;
}

export interface NavigationProps {
  locale: string;
  navLinks: NavLink[];
  competitionLinks: NavLink[];
}
