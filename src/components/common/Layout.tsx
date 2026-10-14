import Header from './Header'

function Layout({ title, children }: { title?: string, children: React.ReactNode }) {
  return (
    <>
      <Header />
      <h1>{title}</h1>
      <div id="main-content" className="page-content" tabIndex={-1}>
        {children}
      </div>
    </>
  )
}

export default Layout