import { GT } from "@graphql/index"
import { UserInputError } from "apollo-server-errors"

const LnPaymentSecret = GT.Scalar({
  name: "LnPaymentSecret",
  parseValue(value) {
    return validLnPaymentSecret(value)
  },
  parseLiteral(ast) {
    if (ast.kind === GT.Kind.STRING) {
      return validLnPaymentSecret(ast.value)
    }
    return new UserInputError("Invalid type for LnPaymentSecret")
  },
})

function validLnPaymentSecret(value) {
  // TODO: verify/improve
  if (value.match(/^[A-Fa-f0-9]{64}$/)) {
    return value
  }
  return new UserInputError("Invalid value for LnPaymentSecret")
}

export default LnPaymentSecret
