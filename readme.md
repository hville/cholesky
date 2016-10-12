<!-- markdownlint-disable MD004 MD007 MD010 MD041 MD022 MD024 MD032 MD036 -->
# cholesky

*standalone [cholesky decomposition](https://en.wikipedia.org/wiki/Cholesky_decomposition) of a square matrix*

Take an native javascript array representing a square matrix and returns the lower triangular decomposition.
The [row-major convention](https://en.wikipedia.org/wiki/Row-major_order) is used: `mat[row][col]`

Unlike other implementations, this module only uses native Arrays and does not modify any prototypes.

• [Example](#example) • [API](#api) • [License](#license)

# Example

```javascript
cho = require('cholesky')

var tri = cho([[4, 12, -16], [12, 37, -43], [-16, -43, 98]])
console.log(tri[0]) // [2]
console.log(tri[1]) // [6, 1]
console.log(tri[2]) // [-8, 5, 3]
```

# API

`cholesky(array) => array`

The module exports a single function that takes a
[row-major](https://en.wikipedia.org/wiki/Row-major_order) matrix in the form `mat[row][col]`
and returns a new lower triangular matrix in the form `[[a], [b,c], [d,e,f], ...]`

# License

Released under the [MIT License](http://www.opensource.org/licenses/MIT)
