REPORTER = spec
test: 
	# ./node_modules/mocha/bin/mocha --reporter spec
	mocha --recursive --reporter spec
.PHONY: test

# test:
#   @NODE_ENV=test ./node_modules/.bin/mocha \
#         --reporter  \
#         --ui tdd

# test-w:
#     @NODE_ENV=test ./node_modules/.bin/mocha \
#         --reporter $(REPORTER) \
#         --growl \
#         --ui tdd \
#         --watch

# .PHONY: test test-w