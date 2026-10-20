/**
 * Joystick sentuh yang bekerja dengan Touch Events di HP, Pointer Events pada
 * perangkat lain, serta menangani drag keluar lingkaran dan multi-touch.
 * Mengembalikan vektor gerak kamera (-1..1) pada setiap perubahan.
 */
export function createJoystick({area,knob,canMove=()=>true,onInput=()=>{},transformed=()=>false,doc=document}={}){
  if(!area||!knob)throw Error('Kontrol analog belum ditemukan');
  let active=null, source=null, pointerId=null;
  const output={x:0,y:0};
  function emit(x=0,y=0){
    output.x=x;output.y=y;
    onInput({x,y});
  }
  function draw(rawX=0,rawY=0){
    // Posisi joystick di DOM mengalami CSS transform 90 derajat untuk fallback.
    // Koordinat global layar dikonversi ke sistem lokal joystick.
    const r=area.getBoundingClientRect();
    let dx=rawX-(r.left+r.width/2),dy=rawY-(r.top+r.height/2);
    if(transformed()){const lx=dy,ly=-dx;dx=lx;dy=ly;}
    const radius=Math.max(25,Math.min(r.width,r.height)*.3);
    const distance=Math.hypot(dx,dy);
    if(distance>radius){dx=dx*radius/distance;dy=dy*radius/distance;}
    // Gunakan transform gabungan, bukan properti CSS 'translate' individual
    // yang tidak tersedia di semua WebView Android lama.
    knob.style.transform=`translate(-50%, -50%) translate3d(${dx}px, ${dy}px, 0)`;
    const nx=dx/radius,ny=dy/radius;
    if(Math.hypot(nx,ny)<.12){emit();}else{emit(nx,ny);}
  }
  function reset(){active=null;source=null;pointerId=null;knob.style.transform='translate(-50%, -50%)';emit();}
  function isAvailable(){return canMove() && !!area.getClientRects().length;}
  const findTouch=(list,id)=>Array.from(list||[]).find(t=>t.identifier===id);
  const startTouch=e=>{
    if(!isAvailable()||(active!==null&&source==='touch'))return;
    const t=e.changedTouches?.[0];if(!t)return;
    e.preventDefault();active=t.identifier;source='touch';pointerId=null;
    draw(t.clientX,t.clientY);
  };
  const moveTouch=e=>{
    if(source!=='touch')return;
    const t=findTouch(e.touches,active)||findTouch(e.changedTouches,active);
    if(!t)return;
    e.preventDefault();draw(t.clientX,t.clientY);
  };
  const endTouch=e=>{
    if(source==='touch'&&findTouch(e.changedTouches,active)){e.preventDefault();reset();}
  };
  // Passive:false mencegah browser menggulir / menggeser halaman saat analog ditarik.
  area.addEventListener('touchstart',startTouch,{passive:false});
  doc.addEventListener('touchmove',moveTouch,{passive:false});
  doc.addEventListener('touchend',endTouch,{passive:false});
  doc.addEventListener('touchcancel',endTouch,{passive:false});
  const startPointer=e=>{
    if(!isAvailable()||active!==null||e.button>0)return;
    // Browser Android mengirim kedua event: TouchEvent adalah jalur utama.
    // Pointer touch ditangkap sementara agar WebView tanpa Touch Events bisa jalan.
    e.preventDefault();active=e.pointerId;pointerId=e.pointerId;source='pointer';
    try{area.setPointerCapture?.(e.pointerId);}catch{}
    draw(e.clientX,e.clientY);
  };
  const movePointer=e=>{
    if(source!=='pointer'||e.pointerId!==pointerId)return;
    e.preventDefault();draw(e.clientX,e.clientY);
  };
  const endPointer=e=>{
    if(source==='pointer'&&e.pointerId===pointerId)reset();
  };
  area.addEventListener('pointerdown',startPointer);
  doc.addEventListener('pointermove',movePointer,{passive:false});
  doc.addEventListener('pointerup',endPointer);
  doc.addEventListener('pointercancel',endPointer);
  area.addEventListener('lostpointercapture',endPointer);
  // Joystick mengambang: capture, lalu dokumen tetap menangkap jika jari keluar area.
  // Bila touchstart datang setelah pointerdown, ganti mode agar pointercancel tidak
  // mematikan analog aktif saat tombol AKSI disentuh dengan jari kedua.
  area.addEventListener('contextmenu',e=>e.preventDefault());
  return {reset,get value(){return {...output};}};
}
