const { endpointsDescription } = require("../endpoints")

exports.retrieveEndpoints = async () => {
    return endpointsDescription;
}