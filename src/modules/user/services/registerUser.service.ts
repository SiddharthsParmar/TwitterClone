import ApiError from "../../../utils/ApiError";
import asyncHandler from "../../../utils/asyncHandler";
import { hashPassword } from "../../../utils/hash.password";
import { UserRepository } from "../repositories/user.repo"

const userRepo = new UserRepository()

export const registerUserService = async (
  firstname: string,
  lastname: string,
  email: string,
  phone_number: string,
  username: string,
  password_hash: string,
  birth_date: string,
  joined_date: string,
  profile_image_path: string,
  cover_image_path: string,
  account_based_in: string,
  connected_via: string
) => {
  
  // Check if user already exists (using .catch() to handle "not found" errors)
  const userEmailExist = await userRepo.findUserByEmail(email).catch(() => null);
  const userUsernameExists = await userRepo.findUserByUsername(username).catch(() => null);
  const userPhoneNumberExists = await userRepo.findUserByPhoneNumber(phone_number).catch(() => null);

  // Throw errors if any exist
  if (userEmailExist) {
    throw new ApiError(409, "Email already registered");
  }
  if (userUsernameExists) {
    throw new ApiError(409, "Username already exists");
  }
  if (userPhoneNumberExists) {
    throw new ApiError(409, "Phone number already registered");
  }

  // Hash the password
  const hashed_password = await hashPassword(password_hash);

  // Register user and AWAIT + RETURN the result
  const newUser = await userRepo.registerUser(
    firstname,
    lastname,
    email,
    phone_number,
    username,
    hashed_password,
    birth_date,
    joined_date,
    profile_image_path,
    cover_image_path,
    account_based_in,
    connected_via
  );

  return newUser;  // Return the created user
}