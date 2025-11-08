export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#f5f1e8] flex items-center justify-center p-8">
      {children}
    </div>
  )
}