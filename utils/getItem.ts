import { MenuItem } from '../src/models/types.model';

/**
 * Function the add an item to the sidebar
 * @param label Name of the item
 * @param key Anchor of the item
 * @param icon Icon of the item
 * @param children Name of the item
 * @returns {MenuItem} MenuItem
 */
export function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
