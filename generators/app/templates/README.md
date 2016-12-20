# @gnodi/<%= lib.name %>

[Node.js] <%= lib.description %>

[![Build][build-image]][build-url]
[![Version][version-image]][version-url]
[![Downloads][downloads-image]][downloads-url]
[![Dependencies][dependencies-image]][dependencies-url]
[![Dev Dependencies][dev-dependencies-image]][dev-dependencies-url]

## Installation

Run the following command to add the package to your dev dependencies:
```sh
$ npm install --save<% if (lib.dev) {%>-dev<%}%> @gnodi/<%= lib.name %>
```

## Use

...

### LICENSE

[MIT](LICENSE)

[build-image]: https://img.shields.io/travis/gnodi/<%= lib.name %>.svg?style=flat
[build-url]: https://travis-ci.org/gnodi/<%= lib.name %>
[version-image]: https://img.shields.io/npm/v/@gnodi/<%= lib.name %>.svg?style=flat
[version-url]: https://npmjs.org/package/@gnodi/<%= lib.name %>
[downloads-image]: https://img.shields.io/npm/dm/@gnodi/<%= lib.name %>.svg?style=flat
[downloads-url]: https://npmjs.org/package/@gnodi/<%= lib.name %>
[dependencies-image]:https://david-dm.org/gnodi/<%= lib.name %>.svg
[dependencies-url]:https://david-dm.org/gnodi/<%= lib.name %>
[dev-dependencies-image]:https://david-dm.org/gnodi/<%= lib.name %>/dev-status.svg
[dev-dependencies-url]:https://david-dm.org/gnodi/<%= lib.name %>#info=devDependencies
