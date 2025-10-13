import XDropdown from './XDropdown';

export default function XHeader() {
  return (
    <header className="z-[1] flex h-14 bg-gray-200 p-2">
      <div className="flex-1"></div>
      <div>
        <XDropdown />
      </div>
    </header>
  );
}
