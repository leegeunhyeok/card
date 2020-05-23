import '@/css/index.scss'

window.onload = () => {
  const card = document.getElementById('card')
  const logo = document.getElementById('logo')
  const info = document.getElementById('info')
  const resizeEventDelay = 10
  const cardSize = {
    width: 0,
    height: 0
  }
  let t // timeout

  const resizeHandler = () => {
    // Card ratio 1.58:1
    cardSize.width = card.getBoundingClientRect().width
    cardSize.height = cardSize.width * 1.58

    // Card Size update
    card.style.height = cardSize.height + 'px'
    card.style.padding = cardSize.height * 0.04 + 'px'

    // Card layout update
    logo.style.top = cardSize.height * 0.1 + 'px'
    info.style.bottom = cardSize.height * 0.03 + 'px'
  }
  resizeHandler()

  window.onresize = () => {
    clearTimeout(t)
    t = setTimeout(resizeHandler, resizeEventDelay)
  }
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(registration => {
      console.log(registration)
    })
    .catch(console.error)
}
