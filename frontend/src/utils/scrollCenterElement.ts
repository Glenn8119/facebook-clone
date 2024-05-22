const scrollCenterElement = <T extends HTMLElement>(el: T) => {
  const scrollToPositionY = el.offsetTop - window.innerHeight / 2
  window.scrollTo({ top: scrollToPositionY, behavior: 'smooth' })
}

export default scrollCenterElement
