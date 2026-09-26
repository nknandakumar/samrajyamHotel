export interface NavItem {
  label: string;
  href: string;
  isCta?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#hero" },
  { label: "Our Story", href: "#story" },
  { label: "Menu", href: "#menu" },
  { label: "Heritage", href: "#heritage" },
  { label: "Catering", href: "#catering" },
  { label: "Celebrations", href: "#celebrations" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#location" },
];

export const NAV_CTA: NavItem = {
  label: "Reserve a Table",
  href: "#reservation",
  isCta: true,
};
