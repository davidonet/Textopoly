var request = require('superagent');
var should = require('should');
var expect = require('expect.js'), Browser = require('zombie'), browser = new Browser();

describe('Browsing test', function() {
	describe('Main page', function() {
		it("should respond an html page", function(done) {
			this.timeout(4000);
			browser.visit('http://test.textopoly.org', function() {
				done();
			});
		});
	});
	describe('Mobile page', function() {
		it("should respond an html page", function(done) {
			this.timeout(4000);
			browser.visit('http://test.textopoly.org/m/v/0/0', function() {
				done();
			});
		});
	});
	
});
