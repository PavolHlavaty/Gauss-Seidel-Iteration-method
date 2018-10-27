document.querySelector('#inputForm').addEventListener('submit', (e) => {
    // zober vstupy
    const A = JSON.parse(document.getElementById('matrixA').value);
    const b = JSON.parse(document.getElementById('vectorB').value);
    const xk = JSON.parse(document.getElementById('vectorX0').value);
    const epsilon = Number(document.getElementById('epsilon').value);
    const maxIterations = Number(document.getElementById('maxIterations').value);

    // vycisti riesenie
    const tableBody = document.getElementById('tableBody');
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }

    // samotny algoritmus
    const shouldDoNext = [true];
    iterationCount = 0;
    while (iterationCount < maxIterations && shouldDoNext.some(e => e)) {
        for (let i = 0; i < b.length; i++) {
            let tmp = b[i];
            for (let j = 0; j < b.length; j++) {
                if (i !== j) {
                    tmp -= A[i][j] * xk[j];
                }
            }
            // zisti, ze ci sa nova hodnota xk zmenila o viac ako epsilon - ak ano, tak bude pokracovat aj dalsia iteracia
            shouldDoNext[i] = Math.abs(xk[i] - tmp / A[i][i]) > epsilon;
            xk[i] = tmp / A[i][i];
        }
        iterationCount++;

        // vypis xk na obrazovku
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        td1.innerHTML = `x<sup>${iterationCount}</sup>`;
        const td2 = document.createElement('td');
        td2.innerHTML = JSON.stringify(xk);
        tr.append(td1, td2);
        tableBody.appendChild(tr)
    }

    // vypis vysledok a pocet iteracii
    document.getElementById('solution').innerHTML = `<b>Solution:</b> ${JSON.stringify(xk)}`;
    document.getElementById('iterations').innerHTML = `<b>Number of iterations:</b> ${iterationCount}`;

    e.preventDefault();
});