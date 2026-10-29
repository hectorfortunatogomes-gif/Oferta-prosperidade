"use strict";
try {const s=JSON.parse(localStorage.getItem('prosperity_app_state_v1')||'null');if(s?.user?.name&&!s.signedOut)document.getElementById('prepared-for').textContent='Prepared for '+String(s.user.name).slice(0,40);}catch(_){}
document.getElementById('print-book').addEventListener('click',()=>window.print());
