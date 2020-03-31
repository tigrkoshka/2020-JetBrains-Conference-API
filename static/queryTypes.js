export function all(data) {
  const response = []

  for(const conf of data) {
    response.push(
      Object.assign({}, conf, {_id: undefined})
    )
  }

  return response
}

export function except(data, fields) {
  const response = []
  const propsExclude = {_id: undefined}

  if (Array.isArray(fields)) {
    for (const field of fields) {
      propsExclude[field] = undefined
    }
  } else {
    propsExclude[fields] = undefined
  }

  for(const conf of data) {
    response.push(
      Object.assign({}, conf, propsExclude)
    )
  }

  return response
}

export function only(data, fields) {
  const response = []
  const propsInclude = {}

  for(const conf of data) {
    if (Array.isArray(fields)) {
      for (const field of fields) {
        propsInclude[field] = conf[field]
      }
    } else {
      propsInclude[fields] = conf[fields]
    }
    response.push(
      Object.assign({}, propsInclude)
    )
  }

  return response
}
