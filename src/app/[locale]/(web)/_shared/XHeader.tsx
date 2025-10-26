import XDropdown from './XDropdown';
import { useAppSelector } from '@/lib/store/hooks';

export default function XHeader() {
  const user = useAppSelector((s) => s.user);

  return (
    <header className="z-[1] flex h-14 border-b border-b-gray-200 p-2">
      <div className="flex flex-1 items-center">QRMENU</div>
      <div>
        <XDropdown user={user.user!} />
      </div>
    </header>
  );
}
