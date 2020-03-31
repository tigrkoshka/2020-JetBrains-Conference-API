import tap from 'tap'
import {buildAPI, stopServer} from '../src/api'
import {
  findArrayObjectsData,
  findArrayObjectsExceptData,
  findArrayObjectsOnlyData
} from './compareData'

tap.test('GET \'/find_*array-of-objects-field-name*/\' route', async t => {
  t.plan(2)

  const conn = buildAPI()

  t.tearDown(() => stopServer(conn))

  let res = await conn.inject({
    method: 'GET',
    url: '/find_participants/'
  })

  t.equal(res.statusCode, 303)

  res = await conn.inject({
    method: 'GET',
    url: '/find_participants/?id=1'
  })

  t.same(res.json(), findArrayObjectsData)
})

tap.test('GET \'/find_*array-of-objects-field-name*/except/\' route', async t => {
  t.plan(3)

  const conn = buildAPI()

  t.tearDown(() => stopServer(conn))

  let res = await conn.inject({
    method: 'GET',
    url: '/find_participants/except/?id=13'
  })

  t.equal(res.statusCode, 303)

  res = await conn.inject({
    method: 'GET',
    url: '/find_participants/except/?fields=attendance'
  })

  t.equal(res.statusCode, 303)

  res = await conn.inject({
    method: 'GET',
    url: '/find_participants/except/?id=13&fields=attendance'
  })

  t.same(res.json(), findArrayObjectsExceptData)
})

tap.test('GET \'/find_*array-of-objects-field-name*/only/\' route', async t => {
  t.plan(3)

  const conn = buildAPI()

  t.tearDown(() => stopServer(conn))

  let res = await conn.inject({
    method: 'GET',
    url: '/find_participants/only/?id=33'
  })

  t.equal(res.statusCode, 303)

  res = await conn.inject({
    method: 'GET',
    url: '/find_participants/only/?fields=title'
  })

  t.equal(res.statusCode, 303)

  res = await conn.inject({
    method: 'GET',
    url: '/find_participants/only/?id=33&fields=ytLink'
  })

  t.same(res.json(), findArrayObjectsOnlyData)
})
