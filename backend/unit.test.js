import userModel from "./models/userModel";
import mongoose from "mongoose";

const url =
  "mongodb+srv://SuzalStha:aAhkZtMxwOlDwtZP@iicluster.yvjjj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
beforeAll(async () => {
  await mongoose.connect(url, {
    useNewUrlParser: true,
  });
});
afterAll(async () => {
  await mongoose.connection.close();
});

describe("UserSchema", () => {
  it("add user testing", () => {
    const user = {
      username: "Suzal",
      email: "suzal@gmail.com",
      password: "123",
    };
    return userModel.create(user).then((user_ret) => {
      expect(user_ret.email).toEqual("suzal@gmail.com");
    });
  });

  it("to test the update", async () => {
    return userModel
      .findOneAndUpdate(
        { username: "Suzal" },
        { $set: { email: "suzal@gmail.com" } }
      )
      .then((user) => {
        expect(user.email).toEqual("suzal@gmail.com");
      });
  });

  it("to test the delete User is working or not", async () => {
    const status = await userModel.deleteOne({ username: "Suzal" });
    expect(status["deletedCount"]).toEqual(1);
  });
});
