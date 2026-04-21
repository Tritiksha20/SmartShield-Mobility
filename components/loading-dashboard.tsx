export default function LoadingDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`h-[300px] rounded-lg bg-gray-800/50 animate-pulse ${i === 5 ? "md:col-span-2" : ""}`}
        />
      ))}
    </div>
  )
}

