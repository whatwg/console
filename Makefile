api:
	curl https://api.csswg.org/bikeshed/ -F file=@index.bs | node_modules/.bin/emu-algify \
	--throwing-indicators > index.html
