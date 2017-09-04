SHELL=/bin/bash -o pipefail

local: index.bs
	bikeshed spec index.bs index.html --md-Text-Macro="SNAPSHOT-LINK LOCAL COPY"

remote: index.bs
	curl https://api.csswg.org/bikeshed/ -f -F file=@index.bs > index.html -F md-Text-Macro="SNAPSHOT-LINK LOCAL COPY"

# Don't confuse make given we have files called "local" or "remote" in our root dir
.PHONY: local remote

deploy: index.bs
	curl --remote-name --fail https://resources.whatwg.org/build/deploy.sh
	EXTRA_FILES="images/*.*" bash ./deploy.sh
