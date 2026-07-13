export default function Loading() {
  return (
    <div className="min-h-screen bg-[#fcfcfc] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-[#100d63] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-zinc-500 font-medium">Loading business profile...</p>
      </div>
    </div>
  );
}