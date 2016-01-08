spec = console
targetfolder = $(spec).spec.whatwg.org
server = $(spec).spec.whatwg.org

branch = $(shell git rev-parse --abbrev-ref HEAD)

# find all bikeshed files and create a target for them
# ./index.bs gets console.spec.whatwg.org/index.html
markupfiles := $(shell find . -name '*.bs' \
								| sed 's|.bs|.html|g' \
								| sed 's|./|$(targetfolder)/|g')

# and build after a clean
all: clean $(markupfiles)

# rule matches our target files from markupfiles:
# $(targetfolder)/%.html matches all html file in the targetfolder
# $@ in the rule gets the target files from markupfiles
# i.e. if markupfiles contains bla/foo.html and bla/index.html it gets:
# bla/index.html and bla/foo.html
# the magic var @D is the directory part of our matching rule.
# @$ is basically what is matched in the % of the %.html
$(targetfolder)/%.html:
	@[ -d $(@D) ] || mkdir -p $(@D) # create dir if it does not exist
	@curl -s https://api.csswg.org/bikeshed/ -F file=@$*.bs \
		| npm run emu-algify > $@

# cleaning up
clean:
	@rm -rf $(targetfolder)

# deployment
ifneq ($(branch),master)
deploy:
	@echo "Not on master branch; skipping deploy"
else ifneq ($(TRAVIS_PULL_REQUEST),false)
deploy:
	@echo "Building a pull request; skipping deploy"
else
deploy: clean all upload
	@echo "Living standard output to $(targetfolder)"
	@echo ""
	@find $(targetfolder) -print
	@echo ""
endif

# upload to server
upload:
	@openssl aes-256-cbc -K $(encrypted_b9b018a1d67d_key) -iv $(encrypted_b9b018a1d67d_iv) -in console_spec_id_rsa.enc -out console_spec_id_rsa -d
	@scp -r -i console_spec_id_rsa $(targetfolder) $(DEPLOY_USER)@$(server):

# don't confuse make given we have files called "clean" "upload"
# "deploy" or "all" in our root dir
.PHONY: clean upload deploy all
