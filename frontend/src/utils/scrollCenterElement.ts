const scrollCenterElement = <T extends HTMLElement>(el: T) => {
  const scrollToPositionY =
    window.scrollY + el.getBoundingClientRect().top - window.innerHeight / 2
  window.scrollTo({ top: scrollToPositionY, behavior: 'smooth' })
}

export default scrollCenterElement
