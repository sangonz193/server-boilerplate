import gql from "graphql-tag";

export default gql`
	type User {
		id: ID!

		email: String!
		name: String

		createdAt: String
		updatedAt: String
		deletedAt: String
	}
`;
