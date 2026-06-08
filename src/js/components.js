export function injectNav() {
  const nav = document.getElementById('portfolio-header')
  if (!nav) return
  nav.innerHTML = `
    <p id="logo">LOGO</p>
    <nav id="nav">
      <p>PRACE</p>
      <p>GIERKA</p>
      <p>O mnie</p>
    </nav>
  `
}

export function injectFooter() {
  const footer = document.getElementById('portfolio-footer')
  if (!footer) return
  footer.innerHTML = `
    <p>Autor:</p>
    <p>Kontakt:</p>
  `
}
