import d2i from 'dom-to-image'
import '@/css/index.scss'

const app = new function () {
  const els = {
    card: document.getElementById('card'),
    logo: document.getElementById('logo'),
    info: document.getElementById('info'),
    temp: document.getElementById('temp')  
  }

  const resizeConfig = {
    RESIZE_EVENT_DELAY: 10,
    timeout: null
  }
  
  const cardSize = {
    width: 0,
    height: 0
  }

  const resizeHandler = e => {
    clearTimeout(resizeConfig.timeout)
    resizeConfig.timeout = setTimeout(updateCard, resizeConfig.RESIZE_EVENT_DELAY)
  }

  const updateCard = () => {
    // Card ratio 1.58:1
    cardSize.width = els.card.getBoundingClientRect().width
    cardSize.height = cardSize.width * 1.58

    // Card Size update
    els.card.style.height = cardSize.height + 'px'
    els.card.style.padding = cardSize.height * 0.04 + 'px'

    // Card layout update
    els.logo.style.top = cardSize.height * 0.1 + 'px'
    els.info.style.bottom = cardSize.height * 0.03 + 'px'
  }

  const save = () => {
    d2i.toPng(this, {
      style: {
        left: '0',
        right: '0',
        bottom: '0',
        top: '0',
        transform: 'none',
        webkitTransform: 'none'
      }
    }).then(r => {
      const img = new Image()
      img.src = r
      document.body.appendChild(img)
    })
  }

  return {
    init: updateCard,
    save,
    resizeHandler
  }
}

window.onload = () => {
  app.init()
  window.addEventListener('resize', app.resizeHandler)
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(registration => {
      console.log(registration)
    })
    .catch(console.error)
}
