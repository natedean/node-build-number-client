# node-build-number-client

This client calls [node-build-number-service](https://github.com/natedean/node-build-number-service) to get an updated build number, appends it to the major and minor numbers obtained from package.json, and runs webpack -p with the build number appended to the bundles.
