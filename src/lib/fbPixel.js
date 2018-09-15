const fireEventOrLog = (track, eventName, data={}) => {
  if (process.env.NODE_ENV === `production` && typeof fbq === `function`) {
    fbq(track, eventName, data)
  } else {
    console.log(track, eventName, JSON.stringify(data))
  }
}

export default {
  click: ({ target, page, link }) => fireEventOrLog('track', 'click', { target, page, link }),
  lead: ({ target, page, link, email, firstName, lastName }) => fireEventOrLog('track', 'Lead', { target, page, link, em: email, fn: firstName, ln: lastName })
}