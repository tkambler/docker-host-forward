.PHONY: build publish

build:
	docker build -t tkambler/docker-host-forward .

publish:
	docker publish tkambler/docker-host-forward
