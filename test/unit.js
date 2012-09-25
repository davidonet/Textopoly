var request = require('superagent');
var async = require('async');
var should = require('should');
var expect = require('expect.js');

describe('Internal function', function() {
	describe('Free cell search', function(done) {
		it("shouldn't have any occupied cell", function() {
			var memcache = require('../routes/models/redisdrv');
			red.find(-16, -16, 32, function(err, ret) {
				async.forEach(ret, function(value) {
					red.single(value[0], value[1], function(err, ret) {
						ret.s.should.equal(0, 'on ' + value);
					});
				}, done);
			});
		});
	});
	describe('mongo driver connection', function() {
		var models = require('../routes/models/mongodrv');
		describe("bounds test", function() {
			it("should return xmin,xmax,ymin,ymax", function(done) {
				models.bounds(function(err, bnd) {
					should.exist(bnd);
					bnd[0].should.be.below(0);
					bnd[1].should.be.below(0);
					bnd[2].should.be.above(0);
					bnd[3].should.be.above(0);
					done();
				});
			});
		});
	});
});
