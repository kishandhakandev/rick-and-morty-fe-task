export default function ErrorState({ message }: { message?: string }) {
  return (
    <div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-700">
      {message ?? 'Something went wrong.'}
    </div>
  );
}
