var request = require('superagent');
var app = require('../app');
var should = require('should');

function testTxt(txt) {
	/*jshint evil:true,es5: true*/
	txt.should.have.property("a").and.be.a('string');
	txt.should.have.property("c").and.be.a('string');
	txt.should.have.property("d").and.be.a('string');
	txt.should.have.property("p").and.lengthOf(2);
	txt.should.have.property("t").and.be.a('string');
}

function testPath(path) {
	path.should.have.property("pw");
}

describe('Textopoly Server Side', function() {
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
	describe('GET /t/:x/:y', function() {
		it("should respond a txt", function(done) {
			request.get('http://localhost:3000/t/3/0').set('Accept', 'application/json').end(function(res) {
				should.exist(res.body);
				testTxt(res.body);
				done();
			});
		});
	});
	describe('GET /fa/:x/:y', function() {
		it("should respond a composite object of txts and paths", function(done) {
			request.get('http://localhost:3000/fa/3/0').set('Accept', 'application/json').end(function(res) {
				should.exist(res.body);
				res.body.should.have.property("s");
				res.body.should.have.property("l");
				res.body.should.have.property("t");
				res.body.should.have.property("f");
				done();
			});
		});
	});
	describe('GET /a/:a', function() {
		it("should respond an array of occupied cells", function(done) {
			request.get('http://localhost:3000/a/Adrien').set('Accept', 'application/json').end(function(res) {
				should.exist(res.body);
				res.body.should.have.property("a").and.equal("Adrien");
				res.body.should.have.property("paths");
				testPath(res.body.paths[0]);
				res.body.should.have.property("txts");
				done();
			});
		});
	});
	describe('GET /p/:id', function() {
		it("should respond an array of txts following a path", function(done) {
			request.get('http://localhost:3000/p/4fc4b9ad4d71520266000120').set('Accept', 'application/json').end(function(res) {
				should.exist(res.body);
				res.body.should.have.property("pw");
				testTxt(res.body.pw[0]);
				done();
			});
		});
	});
});
