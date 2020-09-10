const Auth = ({ mongodb, jwt, app }) => ({

    login : async (req, res) => {
          
      const { email , password } = req.body
  
      console.log('consultando login')
  
      if( email === '' || password=== '')
          res.status( 411 ).end()
      
  
      let result
  
        try{
  
          result = await mongodb.db('workmoney')
          .collection('users')
          .findOne({ email, password })
          
          console.log(email , password)
          
          console.log(result)
        }
        catch (error)
        {
          console.log(error)
          res.status( 411 ).end()
              return
        }
  
      if(!result){
          res.status(403).end()
              return
      }
  
      if( email === result.email && password === result.password ) {
        
          const payload = {
              check:  true
            };
           
            const token = jwt.sign(payload, app.get('llave'), {
              // expiresIn: 1440
            });
        
        res.status(200).json({
            mensaje: 'Autenticación correcta',
            email : result.email,
            firstName : result.firstName,
            refferer_code : result.refferer_code,
          token,
          rol : result.rol,
          investment : result.investment
        });
        
      } 
      else
      {
        res.status(411).end()
      }
      
    },
    
  
  })
  
  
  module.exports = Auth