import { model, Schema } from "mongoose";
import { TUser } from "src/models/user";

const SUser = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const MUser = model<TUser>("User", SUser);

export default MUser;
