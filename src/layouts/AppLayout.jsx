function AppLayout({ children }) {
  return (
    <div className="h-full bg-black text-white">
      <div className="mx-auto flex h-full w-full max-w-6xl flex-col">
        {children}
      </div>
    </div>
  )
}

export default AppLayout
