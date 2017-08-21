import DefaultConfig from './default_config'
import deepmerge from 'deepmerge'

export default function Config(opts) {  
  return deepmerge(DefaultConfig, opts || {})
}