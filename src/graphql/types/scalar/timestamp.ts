import { GT } from "@graphql/index"

import { UserInputError } from "apollo-server-errors"

const Timestamp = GT.Scalar({
  name: "Timestamp",
  description:
    "Timestamp field, serialized as Unix time (the number of seconds since the Unix epoch)",
  serialize(value) {
    if (value.getTime) {
      return Math.floor(value.getTime() / 1000)
    }
    return value
  },
  // TODO: db work for dates
  parseValue(value) {
    return new Date(value)
  },
  parseLiteral(ast) {
    if (ast.kind === GT.Kind.STRING) {
      return new Date(parseInt(ast.value, 10))
    }
    return new UserInputError("Invalid type for Date")
  },
})

// TODO: validate date value

export default Timestamp
