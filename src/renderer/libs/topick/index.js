import Utils from './utils'
import startProcess from './methods'
import Config from './config'

export default class Topick {

  static getKeywords(uri,opts) {
    const config = Config(opts)
    let cb = (typeof arguments[arguments.length-1] === "function") ? arguments[arguments.length-1] : undefined
    return Utils.httpGet(uri)
    .then((res) => {
      let result = startProcess(res.text,config)
      if (cb) { cb(result) }
      return result
    })
    .catch(() => {
      let result = startProcess(uri,config)
      if (cb) { cb(result) }
      return result
    })
  }

  static getLocalKeywords(html,opts) {
    const config = Config(opts)
    let cb = (typeof arguments[arguments.length-1] === "function") ? arguments[arguments.length-1] : undefined

    let result = startProcess(html,config)
    if (cb) { cb(result) }
    return result
  }

  static getDomain(uri) {
    return Utils.getDomainString(uri)
  }

}