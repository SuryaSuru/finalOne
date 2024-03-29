// userValidation.js
import Joi from 'joi';

// Validate the user data
export function validateCreateUser(userData) {
  const userSchema = Joi.object({
    adminId: Joi.string(),
    // fromuserId: Joi.string(),
    wallet: Joi.number(),
    userName: Joi.string().required(),
    position: Joi.string().valid('Left', 'Center', 'Right').required(),
    type: Joi.string().required(),
    contactNumber: Joi.number(),
    location: Joi.string(),
    emailAddress: Joi.string().email().required(),
    password: Joi.string().required()
  });


  const { error } = userSchema.validate(userData);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return {error};
}

// Validate the update data
export function validateUpdateUser(updateData) {
  const userSchema = Joi.object({
    userName: Joi.string(),
    contactNumber: Joi.number(),
    location: Joi.string(),
  });
  
  const { error } = userSchema.validate(updateData);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return {error};
}

// Validate the update data for AdminModel
// export function validateUpdateUserRequest(sendRequest) {
//   const adminSchema = Joi.object({
//     type: Joi.string(),
//     walletAmount: Joi.number()
//   });
  
//   const { error } = adminSchema.validate(sendRequest);
//   if (error) {
//     const errorMessage = error.details.map((detail) => detail.message).join(", ");
//     throw new Error(errorMessage);
//   }
//   return { error };
// }
