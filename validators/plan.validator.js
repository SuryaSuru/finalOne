import Joi from "joi";

// Validate the category data
export function validateCreatePlan(planData) {
  const planSchema = Joi.object({
    typeOfPlan: Joi.string().required(),
    levelIncome: Joi.boolean().required(),
    levels: Joi.array(),
    pairIncome: Joi.boolean().required(),
    pairs: Joi.array(),
  });

  const { error } = planSchema.validate(planData);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return { error };
}