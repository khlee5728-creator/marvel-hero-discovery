let currentScale = 1
let resizeHandler = null

export function getCurrentScale() {
  return currentScale
}

export function initScaling(options = {}) {
  const {
    designWidth = 1280,
    designHeight = 800,
    containerId = "app",
    enableLog = false,
  } = options

  const container = document.getElementById(containerId)
  if (!container) {
    if (enableLog) {
      console.warn(`[scaling] container #${containerId} not found`)
    }
    return
  }

  const applyScale = () => {
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const scale = Math.min(
      viewportWidth / designWidth,
      viewportHeight / designHeight
    )

    const left = (viewportWidth - designWidth * scale) / 2
    const top = 0

    container.style.width = `${designWidth}px`
    container.style.height = `${designHeight}px`
    container.style.position = "absolute"
    container.style.left = `${left}px`
    container.style.top = `${top}px`
    container.style.transformOrigin = "top left"
    container.style.transform = `scale(${scale})`

    currentScale = scale
    window.currentScale = scale

    if (enableLog) {
      console.log("[scaling]", { scale, left, top })
    }
  }

  if (resizeHandler) {
    window.removeEventListener("resize", resizeHandler)
  }

  resizeHandler = () => applyScale()
  window.addEventListener("resize", resizeHandler)
  applyScale()
}
