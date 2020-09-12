const controllers = require('../controllers')

const controllersLoader = async ({ mongoose, jwt }) => {

    const keys_controllers = Object.keys( controllers )
    let inyected_controllers = {}

    await keys_controllers.forEach( control => {
        inyected_controllers[ control ] = controllers[ control ]({mongoose, jwt})
    });

    return  inyected_controllers
}

module.exports = controllersLoader