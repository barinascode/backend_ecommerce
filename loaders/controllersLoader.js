const controllers = require('../controllers')

const controllersLoader = async ({ mongoose }) => {

    const keys_controllers = Object.keys( controllers )
    let inyected_controllers = {}

    await keys_controllers.forEach( control => {
        inyected_controllers[ control ] = controllers[ control ]({mongoose})
    });

    return  inyected_controllers
}

module.exports = controllersLoader