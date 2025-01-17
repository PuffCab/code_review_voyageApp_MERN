import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    default: "user",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  user_image: {
    //Create it as object with publicId and secure url and when deleting image.publicID - set to image to delete + cloudinary destroy (use secureUrl in client)
    type: String,
    default:
      "https://res.cloudinary.com/dfm1r4ikr/image/upload/v1697397728/voyageApp/userPhoto.png",
  },
  bio: {
    type: String,
    default: "No bio added yet",
  },
  // REVIEW  is it intentional to store the date with the numeric format fiven by Date.now? if you store it already in the format you need to consume it in your frontend, you won't need to do that later.
  member_since: {
    type: Date,
    // REVIEW good catch not using Date.now() 👏👏
    default: Date.now,
    required: true,
  },
  bookmarks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "experience",
    },
  ],
  submissions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "experience",
    },
  ],
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
