import gql from "graphql-tag";

export default gql`
	scalar Void

	type Mutation {
		_: Void
	}

	type GenericError {
		_: Void
	}

	type NotFoundError {
		_: Void
	}

	type AuthenticationError {
		_: Void
	}
`;
