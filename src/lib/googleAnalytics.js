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
  lead: ({ target, page, link, email }) => {
    GA('lead', {target, page, link, email, content_name: target, content_category: page})
    FB.subscribe({ target, page, link, email, content_name: target, content_category: page})
  },
}