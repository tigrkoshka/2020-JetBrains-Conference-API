import {all, except, only} from '../static/queryTypes'
import {
  findField,
  findDate,
  findArray,
  findArrayObjects
} from '../static/logics'
import {getField, queryString} from '../static/utils'
import data from '../data/conferences'
import fast from 'fastify'

const searchFields = [
  '_id',
  'title',
  'ytLink',
  'country',
  'city',
  'link',
  'status'
]

const searchArray = [
  'projects',
  'tags'
]

const searchArrayObjects = ['participants']

export function buildAPI() {
  const conn = fast()

  conn.get('/', async (request, reply) => {
    reply.type('application/json')

    return JSON.stringify(all(data))
  })

  conn.get('/except/', async (request, reply) => {
    if (request.query.fields === undefined) {
      reply.redirect(303, `/${queryString(request)}`)
    }

    reply.type('application/json')

    return JSON.stringify(except(data, request.query.fields))
  })

  conn.get('/only/', async (request, reply) => {
    if (request.query.fields === undefined) {
      reply.redirect(303, `/${queryString(request)}`)
    }

    reply.type('application/json')

    return JSON.stringify(only(data, request.query.fields))
  })

  for (const search of searchFields) {
    conn.get(`/find_${search}/`, async (request, reply) => {
      if (request.query[search] === undefined) {
        reply.redirect(303, `/${queryString(request)}`)
      }

      reply.type('application/json')

      return JSON.stringify(all(findField(data, getField(search), request.query[search])))
    })

    conn.get(`/find_${search}/except/`, async (request, reply) => {
      if (request.query[search] === undefined) {
        reply.redirect(303, `/except/${queryString(request)}`)
      }

      if (request.query.fields === undefined) {
        reply.redirect(303, `/find_${search}/${queryString(request)}`)
      }

      reply.type('application/json')

      return JSON.stringify(except(findField(data, getField(search), request.query[search]), request.query.fields))
    })

    conn.get(`/find_${search}/only/`, async (request, reply) => {
      if (request.query[search] === undefined) {
        reply.redirect(303, `/only/${queryString(request)}`)
      }

      if (request.query.fields === undefined) {
        reply.redirect(303, `/find_${search}/${queryString(request)}`)
      }

      reply.type('application/json')

      return JSON.stringify(only(findField(data, getField(search), request.query[search]), request.query.fields))
    })
  }

  for (const search of searchArray) {
    conn.get(`/find_${search}/`, async (request, reply) => {
      if (request.query[search] === undefined) {
        reply.redirect(303, `/${queryString(request)}`)
      }

      reply.type('application/json')

      return JSON.stringify(all(findArray(data, getField(search), request.query[search])))
    })

    conn.get(`/find_${search}/except/`, async (request, reply) => {
      if (request.query[search] === undefined) {
        reply.redirect(303, `/except/${queryString(request)}`)
      }

      if (request.query.fields === undefined) {
        reply.redirect(303, `/find_${search}/${queryString(request)}`)
      }

      reply.type('application/json')

      return JSON.stringify(except(findArray(data, getField(search), request.query[search]), request.query.fields))
    })

    conn.get(`/find_${search}/only/`, async (request, reply) => {
      if (request.query[search] === undefined) {
        reply.redirect(303, `/only/${queryString(request)}`)
      }

      if (request.query.fields === undefined) {
        reply.redirect(303, `/find_${search}/${queryString(request)}`)
      }

      reply.type('application/json')

      return JSON.stringify(only(findArray(data, getField(search), request.query[search]), request.query.fields))
    })
  }

  for (const search of searchArrayObjects) {
    conn.get(`/find_${search}/`, async (request, reply) => {
      if (request.query.id === undefined) {
        reply.redirect(303, `/${queryString(request)}`)
      }

      reply.type('application/json')

      return JSON.stringify(all(findArrayObjects(data, search, request.query.id)))
    })

    conn.get(`/find_${search}/except/`, async (request, reply) => {
      if (request.query.id === undefined) {
        reply.redirect(303, `/except/${queryString(request)}`)
      }

      if (request.query.fields === undefined) {
        reply.redirect(303, `/find_${search}/${queryString(request)}`)
      }

      reply.type('application/json')

      return JSON.stringify(except(findArrayObjects(data, search, request.query.id), request.query.fields), request.query.fields)
    })

    conn.get(`/find_${search}/only/`, async (request, reply) => {
      if (request.query.id === undefined) {
        reply.redirect(303, `/only/${queryString(request)}`)
      }

      if (request.query.fields === undefined) {
        reply.redirect(303, `/find_${search}/${queryString(request)}`)
      }

      reply.type('application/json')

      return JSON.stringify(only(findArrayObjects(data, search, request.query.id), request.query.fields), request.query.fields)
    })
  }

  conn.get('/find_date/', async (request, reply) => {
    if (request.query.after === undefined && request.query.before === undefined) {
      reply.redirect(303, `/${queryString(request)}`)
    }

    reply.type('application/json')

    return JSON.stringify(all(findDate(data, request.query.after, request.query.before)))
  })

  conn.get('/find_date/except/', async (request, reply) => {
    if (request.query.after === undefined && request.query.before === undefined) {
      reply.redirect(303, `/except/${queryString(request)}`)
    }

    if (request.query.fields === undefined) {
      reply.redirect(303, `/find_date/${queryString(request)}`)
    }

    reply.type('application/json')

    return JSON.stringify(except(findDate(data, new Date(request.query.after), new Date(request.query.before)), request.query.fields))
  })

  conn.get('/find_date/only/', async (request, reply) => {
    if (request.query.after === undefined && request.query.before === undefined) {
      reply.redirect(303, `/only/${queryString(request)}`)
    }

    if (request.query.fields === undefined) {
      reply.redirect(303, `/find_date/${queryString(request)}`)
    }

    reply.type('application/json')

    return JSON.stringify(only(findDate(data, new Date(request.query.after), new Date(request.query.before)), request.query.fields))
  })

  return conn
}

export async function runServer(conn) {
  try {
    // eslint-disable-next-line no-process-env
    await conn.listen(process.env.PORT || 4343, '0.0.0.0')
  } catch (err) {
    conn.log.error(err)
    throw err
  }
}

export async function stopServer(conn) {
  try {
    await conn.close()
  } catch (err) {
    conn.log.error(err)
    throw err
  }
}

