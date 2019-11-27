function resize() {
  this.style.height = '100px'
  this.style.height = `${this.scrollHeight}px`
}
export const setResizeListeners = ($el, query) => {
  const targets = $el.querySelectorAll(query)
  targets.forEach(target => {
    target.style.height = `${target.scrollHeight}px`
    target.addEventListener('input', resize)
  })
}
