export default function Loader({ label = 'Loading...' }: { label?: string }) {
  return (
    <div className="flex items-center justify-center p-8 text-neutral-500">
      <span className="mr-3 inline-block h-4 w-4 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-500"></span>
      {label}
    </div>
  );
}
