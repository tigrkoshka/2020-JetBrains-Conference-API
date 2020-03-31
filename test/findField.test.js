import tap from 'tap'
import {buildAPI, stopServer} from '../src/api'
import {findFieldData, findFieldExceptData, findFieldOnlyData} from './compareData'

tap.test('GET \'/find_*field_name*/\' route', async t => {
  t.plan(2)

  const conn = buildAPI()

  t.tearDown(() => stopServer(conn))

  let res = await conn.inject({
    method: 'GET',
    url: '/find_country/'
  })

  t.equal(res.statusCode, 303)

  res = await conn.inject({
    method: 'GET',
    url: '/find_country/?country=Singapore'
  })

  t.same(res.json(), findFieldData)
})

tap.test('GET \'/find_*field_name*/except/\' route', async t => {
  t.plan(3)

  const conn = buildAPI()

  t.tearDown(() => stopServer(conn))

  let res = await conn.inject({
    method: 'GET',
    url: '/find_status/except/?status=ACCEPTED'
  })

  t.equal(res.statusCode, 303)

  res = await conn.inject({
    method: 'GET',
    url: '/find_status/except/?fields=comments'
  })

  t.equal(res.statusCode, 303)

  res = await conn.inject({
    method: 'GET',
    url: '/find_status/except/?status=ACCEPTED&fields=comments&fields=attendance'
  })

  t.same(res.json(), findFieldExceptData)
})

tap.test('GET \'/find_*field_name*/only/\' route', async t => {
  t.plan(3)

  const conn = buildAPI()

  t.tearDown(() => stopServer(conn))

  let res = await conn.inject({
    method: 'GET',
    url: '/find_ytLink/only/?ytLink=PANDA'
  })

  t.equal(res.statusCode, 303)

  res = await conn.inject({
    method: 'GET',
    url: '/find_ytLink/only/?fields=title'
  })

  t.equal(res.statusCode, 303)

  res = await conn.inject({
    method: 'GET',
    url: '/find_ytLink/only/?ytLink=40&fields=title'
  })

  t.same(res.json(), findFieldOnlyData)
})
