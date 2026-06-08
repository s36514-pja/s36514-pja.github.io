const base = import.meta.env.BASE_URL

export function injectNav() {
  const nav = document.getElementById('portfolio-header')
  if (!nav) return
  nav.innerHTML = `
    <a id="logo" href="${base}index.html">
      <img src="${base}public/favicon.svg" alt="Logo" id="logo-img"/>
    </a>
    <nav id="nav">
      <a href="${base}index.html">PRACE</a> 
      <a href="${base}src/pages/minigame.html">GIERKA</a>
      <a href="${base}src/pages/about.html">O MNIE</a>
    </nav>
  `
}

export function injectFooter() {
  const footer = document.getElementById('portfolio-footer')
  if (!footer) return
  footer.innerHTML = `
    <p class="footer-text">Autor: Wiktor Radziszewski s36514</p>
    <nav id="footer-links" class="footer-text">
      <p>Sociale:</p>
      <a href="https://www.instagram.com/wiktor.szop/" target="_blank">Instagram</a>
      <a href="https://www.facebook.com/wiktor.szop" target="_blank">Facebook</a>
    </nav>
  `
}
