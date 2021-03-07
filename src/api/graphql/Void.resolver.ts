import { GraphQLScalarType } from "graphql"

import { Resolvers } from "./schemas.types"

const resolver: Resolvers["Void"] = new GraphQLScalarType({ name: "Void" })

export default resolver
