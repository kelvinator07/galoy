import { GT } from "@graphql/index"
import { UserInputError } from "apollo-server-errors"

const ContactAlias = GT.Scalar({
  name: "ContactAlias",
  description:
    "An alias name that a user can set for a wallet (with which they have transactions)",
  parseValue(value) {
    return validContactAliasValue(value)
  },
  parseLiteral(ast) {
    if (ast.kind === GT.Kind.STRING) {
      return validContactAliasValue(ast.value)
    }
    return new UserInputError("Invalid type for ContactAlias")
  },
})

function validContactAliasValue(value) {
  if (value.match(/^[\p{Alpha}][\p{Alpha} -]{3,}/u)) {
    return value
  }
  return new UserInputError("Invalid value for ContactAlias")
}

export default ContactAlias
