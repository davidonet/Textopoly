var request = require('superagent');
var app = require('../app');
var should = require('should');
var expect = require('expect.js');

function testTxt(txt) {
	txt.should.have.property("a").and.be.a('string');
	txt.should.have.property("c").and.be.a('string');
	txt.should.have.property("d").and.be.a('string');
	txt.should.have.property("p").and.lengthOf(2);
	txt.should.have.property("t").and.be.a('string');
	txt.should.have.property("s").and.be.a('string');
}

function equalTxt(txta, textb) {
	txta.should.have.property("a").equal(textb.a);
	txta.should.have.property("c").equal(textb.c);
	//txta.should.have.property("p").equal(textb.p);
	txta.should.have.property("t").equal(textb.t);
	txta.should.have.property("s").equal(textb.s);

}

function testPath(path) {
	path.should.have.property("pw");
}

describe('Textopoly Server Side', function() {
	var aTxt = {
		p : [-7000, 7000],
		a : 'mocha',
		t : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		c : 'butter',
		s : 'f'
	};
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
				should.exist(res.body.texts[0]);
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
	describe('Txt cell consistency', function() {

		describe('Insert', function() {
			it("should insert a msg a db", function(done) {
				request.post('http://localhost:3000/insert').send(aTxt).set('Accept', 'application/json').end(function(res) {
					should.exist(res.body);
					equalTxt(res.body, aTxt);
					done();
				});
			});
		});
		describe('Read', function() {
			it("should read a msg equal to the one sent", function(done) {
				request.get('http://localhost:3000/t/' + aTxt.p[0] + '/' + aTxt.p[1]).set('Accept', 'application/json').end(function(res) {
					should.exist(res.body);
					equalTxt(res.body, aTxt);
					done();
				});
			});
		});
		describe('Freespace booked', function() {
			it("should have booked 16 cells", function(done) {
				request.get('http://localhost:3000/fa/' + aTxt.p[0] + '/' + aTxt.p[1]).set('Accept', 'application/json').end(function(res) {
					should.exist(res.body);
					res.body.should.have.property("s").equal(4);
					res.body.should.have.property("l").equal(6);
					res.body.should.have.property("t").equal(6);
					res.body.should.have.property("f").equal(9);
					done();
				});
			});
		});
		describe('Cell in section', function() {
			it("should contains our msg", function(done) {
				request.get('http://localhost:3000/section?xmin=' + (aTxt.p[0] - 1) + '&xmax=' + (aTxt.p[0] + 1) + '&ymin=' + (aTxt.p[1] - 1) + '&ymax=' + (aTxt.p[1] + 1)).set('Accept', 'application/json').end(function(res) {
					should.exist(res.body);
					res.body.should.have.property("texts");
					equalTxt(res.body.texts[0], aTxt);
					done();
				});
			});
		});

	});
	describe('Authors list', function() {
		it("should give a list of authors", function(done) {
			request.get('http://localhost:3000/authors').set('Accept', 'application/json').end(function(res) {
				should.exist(res.body);
				done();
			});
		});
	});
	describe('Path list', function() {
		it("should give a list of paths", function(done) {
			request.get('http://localhost:3000/allpath').set('Accept', 'application/json').end(function(res) {
				should.exist(res.body);
				done();
			});
		});
	});
	describe('Image', function() {
		it("should respond an image", function(done) {
			request.get('http://localhost:3000/getimg/[-7,-3]').set('Accept', 'image/jpeg').end(function() {
				done();
			});
		});
	});
	describe('Image', function() {
		it("should respond an image", function(done) {
			request.get('http://localhost:3000/getimg/s[-7,-3]').set('Accept', 'image/jpeg').end(function() {
				done();
			});
		});
	});
	
	describe('Remove', function() {
		it("should remove msg txt", function(done) {
			request.get('http://localhost:3000/remove?x=' + aTxt.p[0] + '&y=' + aTxt.p[1]).set('Accept', 'application/json').end(function(res) {
				should.exist(res.body);
				done();
			});
		});
	});
	describe('Read', function() {
		it("should read a null", function(done) {
			request.get('http://localhost:3000/t/' + aTxt.p[0] + '/' + aTxt.p[1]).set('Accept', 'application/json').end(function(res) {
				should.exist(res.body);
				done();
			});
		});
	});
	describe('Freespace freed', function() {
		it("should have freed 16 cells", function(done) {
			request.get('http://localhost:3000/fa/' + aTxt.p[0] + '/' + aTxt.p[1]).set('Accept', 'application/json').end(function(res) {
				should.exist(res.body);
				res.body.should.have.property("s").equal(0);
				res.body.should.have.property("l").equal(0);
				res.body.should.have.property("t").equal(0);
				res.body.should.have.property("f").equal(0);
				done();
			});
		});
	});
	
});
