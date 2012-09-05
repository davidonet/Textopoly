var request = require('superagent');
var app = require('../app');
var should = require('should');

function testTxt(txt) {
	/*jshint evil:true,es5: true*/
	txt.should.have.property("a").and.be.a('string');
	txt.should.have.property("c").and.be.a('string');
	txt.should.have.property("d").and.be.a('string');
	txt.should.have.property("p").with.lengthOf(2);
	txt.should.have.property("t").and.be.a('string');
}

describe('My Server', function() {
	describe('GET /section', function() {
		it("should respond with a list of txt", function(done) {
			request.get('http://localhost:3000/section?xmin=-5&xmax=5&ymin=-5&ymax=5').set('Accept', 'application/json').end(function(res) {
				should.exist(res.body);
				res.body.should.have.property("success").equal(true);
				res.body.should.have.property("xmin");
				res.body.should.have.property("xmax");
				res.body.should.have.property("ymin");
				res.body.should.have.property("ymax");
				res.body.should.have.property("texts");
				res.body.texts.length.should.be.above(2);
				testTxt(res.body.texts[0]);
				done();
			});
		});
	});
	describe('GET /t', function() {
		it("should respond a txt", function(done) {
			request.get('http://localhost:3000/t/3/0').set('Accept', 'application/json').end(function(res) {
				should.exist(res.body);
				testTxt(res.body);
				done();
			});
		});
	});
});
