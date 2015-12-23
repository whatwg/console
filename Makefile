api:
	curl https://api.csswg.org/bikeshed/ -F file=@index.bs > index.html
	npm run ecmarkupify index.html index.html
