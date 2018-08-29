const fireEventOrLog = (track, eventName, data={}) => {
  if (process.env.NODE_ENV === `production` && typeof fbq === `function`) {
    fbq(track, eventName, data)
  } else {
    console.log(track, eventName, JSON.stringify(data))
  }
}

export default {
  click: ({ target, page, link }) => fireEventOrLog('track', 'click', { target, page, link }),
  subscribe: ({ target, page, link, email }) => fireEventOrLog('track', 'subscribe', { target, page, link, email })
}