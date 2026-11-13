// Oscilloscope wave
(function(){
  const cv=document.getElementById('wave'),ctx=cv.getContext('2d');
  const still=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let w,h,dpr,t=0,mx=.5,my=.5,fx=.5,fy=.5;
  function size(){dpr=Math.min(devicePixelRatio||1,2);w=cv.clientWidth;h=cv.clientHeight;cv.width=w*dpr;cv.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)}
  addEventListener('resize',size);size();
  addEventListener('pointermove',e=>{const r=cv.getBoundingClientRect();mx=(e.clientX-r.left)/r.width;my=(e.clientY-r.top)/r.height});
  function css(n){return getComputedStyle(document.documentElement).getPropertyValue(n).trim()}
  function trace(col,freq,amp,ph,lw,noise){
    ctx.beginPath();ctx.lineWidth=lw;ctx.strokeStyle=col;
    for(let x=0;x<=w;x+=3){
      const k=x/w;
      const y=h*.72+Math.sin(k*freq+ph)*amp+Math.sin(k*freq*3.1+ph*1.7)*amp*.22*noise;
      x?ctx.lineTo(x,y):ctx.moveTo(x,y);
    }
    ctx.stroke();
  }
  function draw(){
    fx+=(mx-fx)*.06;fy+=(my-fy)*.06;
    ctx.clearRect(0,0,w,h);
    const freq=6+fx*26,amp=18+(1-fy)*70;
    ctx.globalAlpha=.9;trace(css('--trace'),freq,amp,t,3,1);
    ctx.globalAlpha=.55;trace(css('--trace2'),freq*.5,amp*.6,-t*.7,2,0);
    ctx.globalAlpha=1;
    t+=.025;
    if(!still)requestAnimationFrame(draw);
  }
  draw();
})();
// Copy email
const btn=document.getElementById('copy'),toast=document.getElementById('toast');
btn.addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText('sashashymanskyi@gmail.com');toast.textContent='Скопійовано'}
  catch(e){toast.textContent='Виділіть адресу нижче й скопіюйте'}
  toast.classList.add('on');setTimeout(()=>toast.classList.remove('on'),2200);
});
