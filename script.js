const ro=document.getElementById('readout');
function show(p){document.querySelectorAll('.pin.on').forEach(x=>x.classList.remove('on'));p.classList.add('on');ro.innerHTML='<b>Pin '+p.dataset.n+'</b> · '+p.dataset.t}
document.querySelectorAll('.pin').forEach(p=>{['mouseenter','focus','click'].forEach(e=>p.addEventListener(e,()=>show(p)))});
const btn=document.getElementById('copy'),toast=document.getElementById('toast');
btn.addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText('sashashymanskyi@gmail.com');toast.textContent='Скопійовано'}
  catch(e){toast.textContent='Скопіюйте адресу нижче'}
  toast.classList.add('on');setTimeout(()=>toast.classList.remove('on'),2200);
});
