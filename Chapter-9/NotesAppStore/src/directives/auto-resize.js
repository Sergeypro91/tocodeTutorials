function resize() {
  this.style.height = 'uato'
  this.style.height = `${this.scrollHeight}px`
}
export const setResizeListeners = ($el, query) => {
  const targets = $el.querySelectorAll(query)

  targets.forEach(target => {
    target.style.height = `${target.parentElement.clientHeight}px`
    target.addEventListener('input', resize)
    target.addEventListener('keydown', function(event) {
      if (event.key == 'Enter' || event.key == 'Escape') {
        target.style.height = `${target.parentElement.clientHeight}px`
      }
    })
  })
}
