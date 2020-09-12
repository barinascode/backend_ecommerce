const TestController = ({ /* . . . */ }) => ({

      sayWelcome : async ( req, res ) => {

		res.send('Welcome to ecommerce api')
		
      },
      sayBye : async ( req, res ) => {

		res.send('Good bye')
		
      }
})

module.exports = TestController