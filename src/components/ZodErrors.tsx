export default function ZodErrors({ errors }: { errors?: string[] }) {
  if (!errors) {
    return null;
  }

  return errors.map((err: string, index: number) => {
    return (
      <div key={index} className="text-red-500 text-xs italic py-2">
        {err}
      </div>
    );
  });
}
