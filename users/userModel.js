import mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});
//pre save hook that encrypts a user password before saving or updating
UserSchema.pre("save", function(next) {
  const user = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, null, (err, hash) => {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

//find users in db by email
UserSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email });
};

//authenticate users by password
UserSchema.methods.comparePassword = function(passw, cb) {
  bcrypt.compare(passw, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

export default mongoose.model("User", UserSchema);
