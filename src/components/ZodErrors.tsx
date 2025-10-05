export default function ZodErrors({ errors }: { errors?: string[] }) {
  if (!errors) {
    return null;
  }

  return errors.map((err: string, index: number) => {
    return (
      <div key={index} className="py-2 text-xs text-red-500 italic">
        {err}
      </div>
    );
  });
}
