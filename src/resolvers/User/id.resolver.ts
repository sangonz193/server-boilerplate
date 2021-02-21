import { Resolvers } from "../../schemas/index.types";

const resolver: Resolvers["User"]["id"] = (parent) => parent.id.toString();

export default resolver;
