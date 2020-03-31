export function queryString(request) {
  return request.raw.url.substring(request.raw.url.indexOf('?'))
}

export function getField(search) {
  let field = search

  if (field === 'city' || field === 'country') {
    field = [
      'location',
      field
    ]
  }

  return field
}
