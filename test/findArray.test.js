import tap from 'tap'
import {buildAPI, stopServer} from '../src/api'
import {findArrayData, findArrayExceptData, findArrayOnlyData} from './compareData'

tap.test('GET \'/find_*array-field_name*/\' route', async t => {
  t.plan(2)

  const conn = buildAPI()

  t.tearDown(() => stopServer(conn))

  let res = await conn.inject({
    method: 'GET',
    url: '/find_tags/'
  })

  t.equal(res.statusCode, 303)

  res = await conn.inject({
    method: 'GET',
    url: '/find_tags/?tags=frontend'
  })

  t.same(res.json(), findArrayData)
})

tap.test('GET \'/find_*array-field_name*/except/\' route', async t => {
  t.plan(3)

  const conn = buildAPI()

  t.tearDown(() => stopServer(conn))

  let res = await conn.inject({
    method: 'GET',
    url: '/find_projects/except/?projects=WebStorm'
  })

  t.equal(res.statusCode, 303)

  res = await conn.inject({
    method: 'GET',
    url: '/find_projects/except/?fields=comments'
  })

  t.equal(res.statusCode, 303)

  res = await conn.inject({
    method: 'GET',
    url: '/find_projects/except/?projects=Marketing&fields=comments&fields=attendance'
  })

  t.same(res.json(), findArrayExceptData)
})

tap.test('GET \'/find_*array-field_name*/only/\' route', async t => {
  t.plan(3)

  const conn = buildAPI()

  t.tearDown(() => stopServer(conn))

  let res = await conn.inject({
    method: 'GET',
    url: '/find_projects/only/?projects=PyCharm'
  })

  t.equal(res.statusCode, 303)

  res = await conn.inject({
    method: 'GET',
    url: '/find_projects/only/?fields=title'
  })

  t.equal(res.statusCode, 303)

  res = await conn.inject({
    method: 'GET',
    url: '/find_projects/only/?projects=PyCharm&fields=_id'
  })

  t.same(res.json(), findArrayOnlyData)
})
