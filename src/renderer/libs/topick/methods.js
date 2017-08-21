import Utils from './utils'

export default function(text,opts) {
  let method = opts.method
  let cleanedText = Utils.clean(Utils.parseHtml(text, opts), opts)

  switch(method) {

    case "combined":
      return Methods.combineNGramsAndNamedEntities(cleanedText,opts)
    case "ngram":
      return Methods.useNGrams(cleanedText,opts)
    case "namedentites":
      return Methods.useNamedEntities(cleanedText,opts)
    default:
      return Methods.combineNGramsAndNamedEntities(cleanedText,opts)
  
  }

}

class Methods {

  static useNGrams(text,opts) {
    return Utils.filterWords(Utils.sortNGrams(Utils.generateNGrams(text,opts), opts), opts)
  }

  static useNamedEntities(text,opts) {
    return Utils.useNGrams(Utils.generateNamedEntitiesString(text),opts)
  }

  static combineNGramsAndNamedEntities(text,opts) {
    return Utils.filterWords(Utils.sortNGrams(
      Utils.generateNGrams(text,opts)
      .concat(Utils.generateNGrams(Utils.generateNamedEntitiesString(text), opts)), opts
    ), opts)
  }

}