import * as yup from "yup"
import { AssertsShape, ObjectShape } from "yup/lib/object"

export const validateEnv = <TShape extends ObjectShape>(shape: TShape): AssertsShape<TShape> => {
	return yup.object(shape).required().validateSync(process.env, {
		stripUnknown: true,
	})
}
