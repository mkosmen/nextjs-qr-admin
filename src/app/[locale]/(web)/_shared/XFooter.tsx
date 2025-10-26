export default function XFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-t-gray-200 p-3 text-center text-sm font-medium">
      &copy;{year}
    </footer>
  );
}
