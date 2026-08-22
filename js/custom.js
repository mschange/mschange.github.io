(function () {
  const normalizePath = path => {
    if (!path) return '/'
    const decoded = decodeURI(path)
    const normalized = decoded.endsWith('/') && decoded !== '/' ? decoded.slice(0, -1) : decoded
    return normalized || '/'
  }

  const isNavActive = (currentPath, linkPath) => {
    if (linkPath === '/') {
      return currentPath === '/'
    }
    return currentPath === linkPath || currentPath.startsWith(`${linkPath}/`)
  }

  const setActiveNav = () => {
    const currentPath = normalizePath(window.location.pathname)
    const links = document.querySelectorAll('#nav .menus_items a.site-page, #sidebar-menus .menus_items a.site-page')

    links.forEach(link => {
      const href = link.getAttribute('href')
      if (!href || href.startsWith('javascript')) return

      const linkPath = normalizePath(new URL(href, window.location.origin).pathname)
      link.classList.toggle('active', isNavActive(currentPath, linkPath))
    })
  }

  document.addEventListener('DOMContentLoaded', setActiveNav)
  document.addEventListener('pjax:complete', setActiveNav)
})()
