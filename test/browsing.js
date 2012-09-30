var request = require('superagent');
var app = require('../app');
var should = require('should');
var expect = require('expect.js'), Browser = require('zombie'), browser = new Browser();

describe('Browsing test', function() {
	var aTxt = {
		p : [-7000, 7000],
		a : 'mocha',
		t : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		c : 'butter',
		s : 'f'
	};
	var pwid='5067d96c64cf0b4824000001';
	describe('Authors page', function() {
		it("should give an authors list", function(done) {
			browser.visit('http://localhost:3000/mauth', function() {
				done();
			});
		});
	});
	describe('Author page', function() {
		it("should give a txt list and pathwalk list", function(done) {
			browser.visit('http://localhost:3000/mpath/davidonet', function() {
				done();
			});
		});
	});
	describe('Path page', function() {
		it("should give a txt list and pathwalk list", function(done) {
			browser.visit('http://localhost:3000/mbook/'+pwid, function() {
				done();
			});
		});
	});
	describe('msg page', function() {
		it("should respond a msg html page", function(done) {
			browser.visit('http://localhost:3000/t/-2/-1', function() {
				done();
			});
		});
	});
	describe('Main page', function() {
		it("should respond an html page", function(done) {
			browser.visit('http://localhost:3000/', function() {
				done();
			});
		});
	});
	describe('RSS', function() {
		it("should respond an RSS file", function(done) {
			browser.visit('http://localhost:3000/rss', function() {
				done();
			});
		});
	});
	describe('Mobile page', function() {
		it("should respond a mobile map page", function(done) {
			browser.visit('http://localhost:3000/m/v/0/0', function() {
				done();
			});
		});
	});
	describe('Mobile msg page', function() {
		it("should respond a msg html page", function(done) {
			browser.visit('http://localhost:3000/m/t/-2/-1', function() {
				done();
			});
		});
	});
	describe('Mobile author page', function() {
		it("should respond a author html page", function(done) {
			browser.visit('http://localhost:3000/m/a/' + aTxt.a, function() {
				done();
			});
		});
	});
	describe('Mobile writing choice page', function() {
		it("should respond a msg html page", function(done) {
			browser.visit('http://localhost:3000/m/w/0/0', function() {
				done();
			});
		});
	});
});
