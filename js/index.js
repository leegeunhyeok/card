import d2i from 'dom-to-image'
import { download } from './utils'
import '@/css/index.scss'

const app = new function () {
  const els = {}

  const resizeConfig = {
    RESIZE_EVENT_DELAY: 10,
    timeout: null
  }
  
  const cardSize = {
    width: 0,
    height: 0
  }

  const init = () => {
    els.app = document.getElementById('app')
    els.card = document.getElementById('card')
    els.logo = document.getElementById('logo')
    els.info = document.getElementById('info')
    els.menu = document.getElementById('menu')

    els.card.addEventListener('click', () => {
      save()
    })

    els.menu.addEventListener('click', () => {
      toggleMenu()
    })

    updateCard()
  }

  const resizeHandler = () => {
    clearTimeout(resizeConfig.timeout)
    resizeConfig.timeout = setTimeout(updateCard, resizeConfig.RESIZE_EVENT_DELAY)
  }

  const updateCard = () => {
    // Card ratio 1.58:1
    console.log(els)
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
    d2i.toPng(els.card, {
      style: {
        left: '0',
        right: '0',
        bottom: '0',
        top: '0',
        transform: 'none',
        webkitTransform: 'none',
        boxShadow: 'none',
        marginTop: '0'
      }
    }).then(r => {
      download(r, 'leegeunhyeok.png', 'image/png')
    })
  }

  const toggleMenu = () => {
    els.app.classList.toggle('up')
  }

  return {
    init,
    resizeHandler
  }
}

window.onload = () => {
  app.init()
  window.addEventListener('resize', app.resizeHandler)
}

if (
  process.env.NODE_ENV !== 'development' &&
  'serviceWorker' in navigator
) {
  navigator.serviceWorker.register('service-worker.js')
    .then(registration => {
      console.log(registration)
    })
    .catch(console.error)
}
