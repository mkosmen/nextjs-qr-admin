import { User } from '@/lib/types';
import XDropdown from './XDropdown';

export default function XHeader({ user }: { user: User }) {
  return (
    <header className="z-[1] flex h-14 bg-gray-50 p-2">
      <div className="flex flex-1 items-center">QRMENU</div>
      <div>
        <XDropdown user={user} />
      </div>
    </header>
  );
}
