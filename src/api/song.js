import {commonParams, options} from './config'
import axios from 'axios'

export function getLyric(mid) {
  const url='api/lyric'
  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    g_tk:5381,
    pcachetime:+new Date(),
    songmid:mid,
    needNewCode: 0,
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}