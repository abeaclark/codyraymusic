export const GA = (name, data) => {
  if (typeof ga != 'undefined') {
    return ga(name, data)
  } else {
    console.log(`Tracking Event: ${name} -- ${JSON.stringify(data)}`)
  }
}