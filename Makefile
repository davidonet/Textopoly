test:
	mocha

coverage-server:
	rm -rf routes-cov 
	jscoverage --no-highlight routes routes-cov
	NODE_COV=1 mocha -R html-cov > test/coverage.html
	rm -rf routes-cov 

coverage-client:
	rm -rf public-cov
	jscoverage public public-cov
	JS_COV=1 node app.js
	rm -rf public-cov

.PHONY: test