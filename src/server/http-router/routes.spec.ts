import { } from "jasmine";

let chai = require('chai');
let chaiHttp = require('chai-http');
let fs = require('fs');
let api = require("../../server.ts");
let should = chai.should();

chai.use(chaiHttp);

describe("Routes Test Unit", () => {
    describe("/GET", () => {
        it("should return 404 page not found", (done) => {
            chai.request(api)
                .get("/ralouf")
                .end((err:any, res:any) => {
                    res.should.have.status(404);
                    res.should.be.json;
                    res.should.be.a('object');
                    res.body.should.have.property("error");
                    res.body.error.should.equal("Page not found");
                    done();
                })
        })
        describe("all locations", () => {
            it("should return list of locations", (done) => {
                chai.request(api)
                    .get("/location")
                    .end((err:any, res:any) => {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.should.be.a('object');
                        done();
                    })
            })
        })

        describe("one location", () => {
            it("should return one location", (done) => {
                chai.request(api)
                    .get("/location/1")
                    .end((err:any, res:any) => {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.should.be.a('object');
                        res.body.should.have.property("id");
                        res.body.should.have.property("name");
                        res.body.should.have.property("description");
                        res.body.should.have.property("image");
                        done();
                    })
            })
            it("should return 422 location does not exist", (done) => {
                chai.request(api)
                    .get("/location/90")
                    .end((err:any, res:any) => {
                        res.should.have.status(422);
                        res.should.be.json;
                        res.should.be.a('object');
                        res.body.should.have.property("error");
                        res.body.error.should.equal("No location with this id");
                        done();
                    })
            })
        })
    })
})