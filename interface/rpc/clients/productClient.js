const grpc = require('@grpc/grpc-js');
const loader = require("../utils/loader");
const config = require("../../../core/config");

const PROTO_PATH = __dirname + '/../proto/product.proto';

const protoDescriptor = loader.loadProto(PROTO_PATH);
const _client = new protoDescriptor.ProductService(
    config.rpc.host,
    grpc.credentials.createInsecure()
);

async function getProductByName(productName) {
    return new Promise((resolve, _)=>{
        _client.getProductByName({ productName }, (error, response) => {
            if (error) console.error(error);
            else console.log(response);
            resolve(response);
        });
    });
}

async function getProductById(productId) {
    return new Promise((resolve, _)=>{
        _client.getProductById({ productId }, (error, response) => {
            if (error) console.error(error);
            else console.log(response);
            resolve(response);
          });
    });
}

module.exports = {
    getProductByName,
    getProductById
};