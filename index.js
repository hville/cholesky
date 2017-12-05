// https://en.wikipedia.org/wiki/Cholesky_decomposition
// LU decomposition unstable for well-conditioned matrix
// square root round off errors to neg value?
// round off errors if ill-conditioned

/**
 * cholesky decomposition of a square matrix
 * @param {Array<Array<number>>} matrix - square matrix
 * @returns {Array<Array<number>>} - triangular matrix
 */
module.exports = function cholesky(matrix) {
	var len = matrix.length,
			res = Array(len)
	if (matrix.length !== matrix[len-1].length) throw Error('Input matrix must be square or lower triangle')

	res[0] = [Math.sqrt( matrix[0][0] )]

	for (var i = 1; i<len; ++i) {
		res[i] = Array(i+1) // lower triangle
		for (var j = 0; j < i; ++j) {
			res[i][j] = delta(matrix[i][j], res, i, j) / res[j][j]
		}
		res[i][i] = Math.sqrt(delta(matrix[i][i], res, i, i))
	}
	return res
}

/**
 * Sum{k=1..j-1} Lik*Ljk
 * @param {number} aij
 * @param {Array<Array<number>>} res
 * @param {number} i
 * @param {number} j
 * @return {number}
 */
function delta(aij, res, i, j) {
	for (var k=0, sum=aij; k<j; ++k) if (res[i][k]) sum -= res[i][k] * res[j][k]
	return sum
}
