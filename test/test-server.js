const chai = require('chai');
const chaiHttp = require('chai-http');

const {
    app,
    runServer,
    closeServer
} = require('../server');


var chai = require('chai');
var chaiHttp = require('chai-http');


var recipe = require('../models/recipe.js');
var list = require('../models/list.js');
var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

describe('shopping-list-full-stack-capstone', function () {
    before(function (done) {
        server.runServer(function () {
            Activity.create({
                name: 'Fun Run'
            }, {
                name: 'Run Event'
            }, {
                name: 'Color Run'
            }, function () {
                done();
            });
        });
    });

    describe('shopping-list-full-stack-capstone', function () {

        it('should list recipes on GET', function (done) {
            chai.request(app)
                .get('/get-recipe/')
                .end(function (err, res) {
                    should.equal(err, null);
                    res.should.have.status(200);
                    res.should.be.json;
                    // res.body.should.be.a('array');
                    // res.body.should.have.length(3);
                    // res.body[0].should.be.a('object');
                    // res.body[0].should.have.property('_id');
                    // res.body[0].should.have.property('name');
                    // res.body[0]._id.should.be.a('string');
                    // res.body[0].name.should.be.a('string');
                    // res.body[0].name.should.equal('Fun Run');
                    // res.body[1].name.should.equal('Run Event');
                    // res.body[2].name.should.equal('Color Run');
                    done();
                });
        });

        it('should list ingredients on GET', function (done) {
            chai.request(app)
                .get('/retrieve-sList/')
                .end(function (err, res) {
                    should.equal(err, null);
                    res.should.have.status(200);
                    res.should.be.json;
                    // res.body.should.be.a('array');
                    // res.body.should.have.length(3);
                    // res.body[0].should.be.a('object');
                    // res.body[0].should.have.property('_id');
                    // res.body[0].should.have.property('name');
                    // res.body[0]._id.should.be.a('string');
                    // res.body[0].name.should.be.a('string');
                    // res.body[0].name.should.equal('Fun Run');
                    // res.body[1].name.should.equal('Run Event');
                    // res.body[2].name.should.equal('Color Run');
                    done();
                });
        });
        it('should add a recipe  on POST', function (done) {
            chai.request(app)
                .post('/add-recipe-db/')
                .send({
                    'id': 'test',
                })
                .end(function (err, res) {
                    should.equal(err, null);
                    res.should.have.status(201);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('_id');
                    res.body.name.should.be.a('string');
                    res.body._id.should.be.a('string');
                    res.body.name.should.equal('Jogger');
                    done();
                });
        });

        it('should delete an recipes on DELETE', function (done) {
            chai.request(app)
                .delete('/deleterec/:id')
                .send({
                    'id': 'killAll',
                })
                .end(function (err, res) {
                    res.should.have.status(404);
                    done();
                });
        });

    });


    after(function (done) {
        Activity.remove(function () {
            done();
        });
    });
});
