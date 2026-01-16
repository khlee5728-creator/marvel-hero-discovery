function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col">
        {children}
      </div>
    </div>
  )
}

export default AppLayout
