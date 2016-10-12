// https://en.wikipedia.org/wiki/Cholesky_decomposition
// LU decomposition unstable for well-conditioned matrix
// square root round off errors to neg value?
// round off errors if ill-conditioned

module.exports = ldl

// LDL decomposition with the diagonal stored in L (insted of 1s)
function ldl(arr) {
	var len = arr.length
	var res = Array(len)

	for (var k = 0; k<len; ++k) res[k] = Array(k+1) // lower triangle

	res[0][0] = arr[0][0] // diagonal

	for (var i = 1; i<len; ++i) {
		for (var j = 0; j < i; ++j) {
			res[i][j] = delta(arr[i][j], res, i, j) / res[j][j]
		}
		res[i][i] = delta(arr[i][i], res, i, i) // the diagonal is stored in the array
	}
	//integrate the diagonal back into L
	return diag(res)
}
function delta(aij, res, i, j) {
	for (var k=0, sum=aij; k<j; ++k) sum -= res[i][k] * res[j][k] * res[k][k]
	return sum
}
function diag(res) { //integrate the diagonal back into L
	for (var i = 0; i<res.length; ++i) {
		res[i][i] = Math.sqrt( res[i][i] )
		for (var j = 0; j < i; ++j) res[i][j] *= res[j][j]
	}
	return res
}
