import { model, Schema } from "mongoose";
import { TUser } from "src/types/user";

/**
 * Schema representing User in database
 */
const SUser = new Schema<TUser>(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    auth: { type: String, default: "user" },
    image: String,
  },
  { timestamps: true }
);

/**
 * Model representing User in database
 */
const MUser = model<TUser>("User", SUser);

export default MUser;
