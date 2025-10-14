'use client';
import Dropdown, { Item } from '@/components/ui/Dropdown';

export default function LocalizerDropdown() {
  const items: Item[] = [
    {
      text: 'Deneme',
      onClick: () => {
        console.log('Deneme');
      },
    },
  ];

  return (
    <Dropdown items={items}>
      <span className="p-2">en</span>
    </Dropdown>
  );
}
