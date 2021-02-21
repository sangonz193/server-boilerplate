import { GraphQLScalarType } from "graphql";

import { Resolvers } from "../schemas/index.types";

const resolver: Resolvers["Void"] = new GraphQLScalarType({ name: "Void" });

export default resolver;
