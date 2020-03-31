import {cloneDeep} from 'lodash'

function fieldMatchesExactly(field, model) {
  return (a, b) => {
    let compA = cloneDeep(a), compB = cloneDeep(b)

    if (Array.isArray(field)) {
      for (const level of field) {
        compA = compA[level]
        compB = compB[level]
      }
    } else {
      compA = compA[field]
      compB = compB[field]
    }

    if(compA === model && compB !== model) {
      return -1;
    }

    if(compB === model && compA !== model) {
      return 1;
    }

    return a.index - b.index;
  }
}

export function findField(data, field, model) {
  let dataCopy = []

  // Otherwise the standard does not provide stable sort

  for (let i = 0; i < data.length; i += 1) {
    const toPush = cloneDeep(data[i])

    toPush.index = i;

    dataCopy.push(toPush)
  }

  dataCopy = dataCopy.filter(
    conf => {
      let value = cloneDeep(conf)

      if (Array.isArray(field)) {
        for (const level of field) {
          value = value[level]
        }
      } else {
        value = value[field]
      }

      return value.includes(model)
    }
  )
    .sort(fieldMatchesExactly(field, model))

  for (const conf of dataCopy) {
    Reflect.deleteProperty(conf, 'index')
  }

  return dataCopy
}

export function findArray(data, field, model) {
  return data.filter(
    conf => conf[field].includes(model)
  )
}

export function findArrayObjects(data, field, id) {
  return data.filter(
    conf => conf[field].filter(
      instance => Number(instance.id) === Number(id)
    ).length > 0
  )
}

export function findDate(data, after, before) {
  let filtered = data

  if (after !== undefined) {
    filtered = filtered.filter(
      conf => {
        return new Date(conf['dateStart']) - new Date(after) >= 0
      }
    )
  }

  if (before !== undefined) {
    filtered = filtered.filter(
      conf => new Date(before) - new Date(conf['dateFinish']) >= 0
    )
  }

  return filtered
}
