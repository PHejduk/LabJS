const exec = document.querySelector(".execute");
exec.addEventListener('click', count)

function count() {

    const pools = [...document.querySelectorAll(".pool")].map(e => parseInt(e.value));
    const minPool = document.querySelector('#min');
    const maxPool = document.querySelector("#max");
    const sumPool = document.querySelector('#sum');
    const meanPool = document.querySelector('#mean');

    minPool.textContent = Math.min(...pools);
    maxPool.textContent = Math.max(...pools);
    let sum = 0;
    for (let i in pools) {
        sum += pools[i];
    }
    sumPool.textContent = sum;
    meanPool.textContent = sum / 4
}