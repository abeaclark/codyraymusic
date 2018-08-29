import FB from './fbPixel'

const GA = (name, data) => {
  if (typeof ga != 'undefined') {
    return ga(name, data)
  } else {
    console.log(`Tracking Event: ${name} -- ${JSON.stringify(data)}`)
  }
}

export default {
  click: ({ target, page, link }) => {
    GA('click', {target, page, link})
    FB.click({ target, page, link })
  },
  subscribe: ({ target, page, link, email }) => {
    GA('subscribe', {target, page, link, email})
    FB.subscribe({ target, page, link, email })
  },
}