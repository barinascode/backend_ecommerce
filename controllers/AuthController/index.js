const Users = require("../../models/Users");
const jwtkey = "myjwtpassword123";

const Auth = ({ jwt, app, mongodb, axios }) => ({

  GoogleLogin: async (req, res) => {


    const { idToken } = req.body
    const llave = app.get('llave')
    const usersCollection = mongodb.db('dbname').collection('users')
    const google_request = `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`
    let token = ''

    try {


      const { data } = await axios.get(google_request)
      const google_result = data


      try {



        let local_result = await usersCollection.findOne({ email: google_result.email })


        /**
         * this is a valid google user, and is registered locally
         */

        if (local_result && google_result.email === local_result.email) {

          // console.log('This is a valid google user, and is registered locally')

          token = jwt.sign({ _id: local_result._id }, llave, {
            // expiresIn: 1440
          })

          let response_data = {
            _id: local_result._id,
            email: local_result.email,
            user_type: local_result.user_type,
            name: local_result.name,
            picture: google_result.picture,
            token
          }
          res.status(200).json(response_data).end()

        }



        /**
        * This is a valid google user and will be registered locally
        */
        if (google_result.email && !local_result) {

          // console.log('This is a valid google user and will be registered locally')

          try {


            let user_saved_op = await usersCollection.insertOne({
              email: google_result.email,
              name: google_result.name,
              picture: google_result.picture
            })

            const user_saved = user_saved_op.ops[0]

            token = jwt.sign({ _id: user_saved._id }, llave, {
              // expiresIn: 1440
            })

            let response_data = {
              _id: user_saved._id,
              email: user_saved.email,
              name: user_saved.name,
              picture: google_result.picture,
              token
            }

            console.log()

            res.status(200).json({}).end()


          } catch (error) {
            console.log(error)
            res.status(411).end()
          }

        }



      } catch (error) {
        console.log(error)
      }



    } catch (error) {
      res.status(400).json({ message: 'invalid_token' })
      console.log(error)
    }

  },

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

        res.status(200)
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
