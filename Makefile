api:
	mkdir -p console.spec.whatwg.org && \
	curl https://api.csswg.org/bikeshed/ -F file=@index.bs | node_modules/.bin/emu-algify \
	--throwing-indicators > console.spec.whatwg.org/index.html
