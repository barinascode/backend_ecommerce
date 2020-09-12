const handlers = ({axios})=>({
	get  : async (req, res) => {
		const { data } = await axios.get('http://localhost')
		res.status(200).send( data )
	}
})


describe('Auth', ()=>{
    describe('Login' , ()=>{
		
		it('Login successfully', async() => {
			
			const axios = {
				get : jest.fn().mockResolvedValue({ data : 1 }),
			}
			
			const res = {
				status : jest.fn().mockReturnThis(),
				send : jest.fn()
			}

			await handlers({axios}).get({}, res)
			
			expect(res.status.mock.calls).toEqual(
				[[200]]
			)

			expect(res.send.mock.calls).toEqual(
				[[1]]
			)
			
			console.log(res.status.mock.calls)
			console.log(res.send.mock.calls)


		})
    })
})