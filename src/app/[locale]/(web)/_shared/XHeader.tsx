import { User } from '@/lib/types';
import XDropdown from './XDropdown';

export default function XHeader({ user }: { user: User }) {
  return (
    <header className="z-[1] flex h-14 bg-gray-200 p-2">
      <div className="flex-1"></div>
      <div>
        <XDropdown user={user} />
      </div>
    </header>
  );
}
