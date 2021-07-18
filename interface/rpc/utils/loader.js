const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Suggested options for similarity to existing grpc.load behavior
const loadOptions = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
}

module.exports.loadProto = (protoPath) => {
    const packageDefinition = protoLoader.loadSync(protoPath, loadOptions);
    return grpc.loadPackageDefinition(packageDefinition);    
}