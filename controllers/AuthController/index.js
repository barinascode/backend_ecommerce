const Users = require("../../models/Users");
const Role = require('../../models/role')
const jwtkey = "myjwtpassword123";

const Auth = ({ jwt, app }) => ({

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const account = await Users.findOne({ email })
      if (!account) {
        res.status(403).end();
        return;
      }

      const token = jwt.sign({ id: account._id }, jwtkey, {
        expiresIn: 86400,
      });

      res
        .status(200)
        .json({token})
        .end();
    } catch (error) {
      console.log(error);
      res.status(403).end();
      return;
    }
  },


  register: async (req, res) => {
    const { email, roles } = req.body;
    
    try {
      const payload = {
        check: true,
      };

      const verification_code = Math.random().toString(36).slice(2);

      const user = new Users({
        ...req.body,
        verification_code,
      });

      if (roles) {
        const rolesFound = await Role.findOne({ name: 'admin' })
        user.roles = [rolesFound._id]
      } else {
        const roleFound = await Role.findOne({ name: 'user' })
        user.roles = [roleFound._id]
      }

      let result = await user.save();

      const token = jwt.sign({ id: result._id }, jwtkey, {
        expiresIn: 80000,
      });

      res
        .status(201)
        .json(token);
    } catch (error) {
      console.log(error);
      res.status(411).end();
    }
  },
});

module.exports = Auth;
