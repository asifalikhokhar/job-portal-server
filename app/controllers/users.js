const User = include("models/user");
const AuthComponent = include("components/auth");
const config = include("config");
const md5 = require("md5");

class UsersController {
  constructor() {
    this.authComponent = new AuthComponent(config.tokenSecret);
  }

  async login(data) {
    if (!data.email || !data.password) {
      return { status: 400, message: "Parameters missing" };
    }
    data.password = md5(data.password);
    const user = await User.login(data);
    if (!user) return { status: 401, message: "Invalid Credentials" };

    const userObject = await this.authComponent.encodeToken(user.toObject());
    return { status: 200, data: userObject };
  }

  async signup(res, data) {
    if (!data.email || !data.password || !data.name) {
      return { status: 400, message: "Parameters missing" };
    }

    const user = await User.findByEmail(data.email);
    if (user) return { status: 403, message: "User already exists" };
    data.password = md5(data.password);
    console.log(data);
    var userObject = new User(data);
    await userObject.save();

    let newUser = await this.authComponent.encodeToken(userObject.toObject());
    return { status: 200, data: newUser };
  }
}
var exports = (module.exports = new UsersController());
