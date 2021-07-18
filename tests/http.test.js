process.env.NODE_ENV = 'test';

// let mongoose = require("mongoose");
let Order = require('../interface/http/models/order');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index').server;
let should = chai.should();


chai.use(chaiHttp);

describe('orders', () => {
    beforeEach((done) => {
        Order.remove({}, (err) => {
            done();
        });
    });
    describe('/GET order', () => {
        it('it should GET all the orders', (done) => {
            chai.request(server)
                .get('/all')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.orders.should.be.a('array');
                    res.body.orders.length.should.be.eql(0);
                    done();
                });
        });
    });
    describe('/PUT order', () => {
        it('it should PUT an order ', (done) => {
            let order = {
                customerId: "c220a2db2",
                amount: 2000,
                productIds: [
                      "60f30453e120d253911cf215",
                      "60f30453e120d253911cf215"
                    ]
              }
            chai.request(server)
                .put('/')
                .send(order)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Created order');
                    res.body.should.have.property('order');
                    res.body.order.should.have.property('_id');
                    res.body.order.should.have.property('customerId').eql(order.customerId);
                    res.body.order.should.have.property('productIds');
                    done();
                });
        });
    });
    describe('/GET/:orderId order', () => {
        it('it should GET an order by the given order id', (done) => {
            let order = new Order({
                customerId: "c220a2db2",
                amount: 2000,
                productIds: [
                      "60f30453e120d253911cf215",
                      "60f30453e120d253911cf215"
                    ]
              });
            order.save((err, order) => {
                chai.request(server)
                    .get('/' + order._id)
                    .send(order)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.order.should.have.property('_id').eql(order._id.toString());
                        res.body.order.should.have.property('amount').eql(order.amount);
                        res.body.order.should.have.property('productIds');
                        done();
                    });
            });

        });
    });
});