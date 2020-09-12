const Users = require("../../models/Users");
const jwtkey = "myjwtpassword123";

const Auth = ({ jwt, app }) => ({
  
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const account = await Users.findOne(
        { email, password },
        { password: false }
      );

      if (!account) {
        res.status(403).end();
        return;
      }

      if (account._id) {
        const payload = { check: true };

        const token = jwt.sign(payload, jwtkey, {
          // expiresIn: 1440
        });

        res
          .status(200)
          .json({ ...account._doc, token: `${token}|${account._doc._id}` })
          .end();
      } else {
        res.status(403).end();
      }
    } catch (error) {
      console.log(error);
      res.status(403).end();
      return;
    }
  },
  register: async (req, res) => {
    const { email } = req.body;

    try {
      let verifyAccount = await Users.findOne({ email });

      if (verifyAccount && verifyAccount.email) {
        res.status(403).end();
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(411).end();
      return;
    }

    try {
      const payload = {
        check: true,
      };

      const token = jwt.sign(payload, jwtkey, {
        expiresIn: 1440,
      });

      const verification_code = Math.random().toString(36).slice(2);

      const user = new Users({
        ...req.body,
        verification_code,
      });

      let result = await user.save();

      res
        .status(201)
        .json({ ...result._doc, token: `${token}|${result._doc._id}` });
    } catch (error) {
      console.log(error);
      res.status(411).end();
    }
  },
});

module.exports = Auth;
