var t = require('cotest'),
		cholesky = require('./'),
		ldl = require('./ldl')

//mult of square matrix or triangular matrix for testing

/**
 * @param {Array<Array<number>>} L
 * @return {Array<Array<number>>}
 */
function msq(L) {
	var dim = L.length,
			res = Array(dim)
	for (var i=0; i<dim; ++i) {
		res[i] = Array(dim)
		for (var j=0; j<dim; ++j) {
			res[i][j] = 0
			for (var k=0; k<dim; ++k) res[i][j] += L[i][k] * L[j][k] || 0
		}
	}
	return res
}
function rndM(dim, scale, shift) { //random symetrical matrix
	var res = Array(dim)
	for (var i=0; i<dim; ++i) {
		res[i] = []
		for (var j=0; j<i; ++j) res[i][j] = res[j][i] = Math.random() * scale + shift
		res[i][i] = 1
	}
	return res
}

function err2M(res, ref) {
	var err2 = 0,
			dim = ref.length
	for (var i=0; i<dim; ++i) for (var j=0; j<i+1; ++j) {
		var err = (res[i][j] || 0) - (ref[i][j] || 0)
		err2 += err*err
	}
	return err2
}

function testbench(fcn, src) {
	var st = process.hrtime(),
			low = fcn(src),
			et = process.hrtime(st),
			err2 = err2M(msq(low), src),
			ms = et[0] * 1e9 + et[1]
	return {ms: ms, er:err2}
}

var goodMatrix = [
	[[25, 15, -5], [15, 18, 0], [-5, 0, 11]],
	[[18, 22, 54, 42], [22, 70, 86, 62], [54, 86, 174, 134], [42, 62, 134, 106]],
	[[0.81, -0.36, 0.25],	[-0.36, 0.49, 0.16], [0.25, 0.16, 0.64]],
	[[4,12,-16],[12,37,-43],[-16,-43,98]]
]

var evilMatrix = [
	rndM(10,0.3,0.1),
	rndM(15,0.3,0),
	rndM(20,0.3,0)
]

var ref = {ms:0, er:0},
		res = ref,
		sumref = ref,
		sumres = ref

goodMatrix.forEach(function(m,i) {
	t('Test #'+i, () => {
		ref = testbench(ldl, m)
		res = testbench(cholesky, m)
		t('<=', res.er, ref.er, 'better error over LDL')
		t('<=', res.er, 1e-28, 'error')
		sumref.er += ref.er
		sumref.ms += ref.ms
		sumres.er += res.er
		sumres.ms += res.ms
	} )
})
evilMatrix.forEach(function(m,i) {
	t('Test #'+(i+goodMatrix.length), () => {
		ref = testbench(ldl, m)
		res = testbench(cholesky, m)
		t('<=', res.er, 0.001, 'error outliers')
		sumref.er += ref.er
		sumref.ms += ref.ms
		sumres.er += res.er
		sumres.ms += res.ms
	} )
})
t('Summary', () => {
	t('<=', sumres.er, sumref.er, 'better error over LDL')
	t('<=', sumres.er, 1, 'error outliers')
	t('<=', sumres.ms, sumref.ms, 'better performance over LDL')
})
