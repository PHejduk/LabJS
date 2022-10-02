const count=document.querySelector("#count");

count.addEventListener('click', justDoIt)

function justDoIt(){   
const pools=[...document.querySelectorAll(".pool")].map(v=>parseInt(v.value))
const meanPool=document.querySelector('.mean');
const minPool=document.querySelector('.min');
const maxPool=document.querySelector('.max');
const amountPool=document.querySelector('.amount');

console.log(pools)
minPool.textContent=Math.min(...pools);
maxPool.textContent=Math.max(...pools);
let amount=0;
for(let i in pools){
    amount+=pools[i];
}
amountPool.textContent=amount;
meanPool.textContent=amount/4;
}