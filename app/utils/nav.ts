export interface NavItem {
  label: string
  to: string
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Vins', to: '/vins' },
  { label: 'Arboriculture', to: '/arboriculture' },
  { label: 'Gîtes', to: '/gites' },
  { label: 'Événements', to: '/evenements' },
]

export const CONTACT_ITEM: NavItem = { label: 'Contact', to: '/contact' }

export function isNavActive(currentPath: string, itemPath: string): boolean {
  return currentPath === itemPath || currentPath.startsWith(`${itemPath}/`)
}
