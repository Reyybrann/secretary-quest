/**
 * Fitur opsional fullscreen + landscape khusus HP.
 * Hanya memanggil fullscreen dalam event klik pengguna (syarat browser).
 * Tidak ada pembatas quest/fitur ketika API diblokir; layar dapat diputar manual.
 */
export function initLandscapeMode({
  win=window,
  doc=document,
  screenObj=screen,
  find=selector=>doc.querySelector(selector),
  delay=(fn,ms)=>setTimeout(fn,ms)
}={}){
  let wantsLandscape=false, allowsPortrait=false, requestToken=0;
  const phoneGame=()=>win.matchMedia('(pointer:coarse) and (max-width:1100px)').matches;
  const sideways=()=>win.matchMedia('(orientation:landscape)').matches;
  const hint=find('#rotate-hint');
  const retry=find('#rotate-retry');
  const skip=find('#rotate-skip');

  function update(){
    if(!hint)return;
    hint.hidden=!wantsLandscape||allowsPortrait||!phoneGame()||sideways();
  }
  function enter(){
    if(!phoneGame())return;
    wantsLandscape=true;allowsPortrait=false;
    const token=++requestToken;
    // Jangan await lebih dulu: fullscreen wajib diminta dari ketukan langsung.
    let pending;
    try{
      pending=doc.fullscreenElement ? Promise.resolve() :
        (doc.documentElement.requestFullscreen ? doc.documentElement.requestFullscreen() : Promise.reject(new Error('Fullscreen tidak didukung')));
    }catch(e){pending=Promise.reject(e);}
    Promise.resolve(pending).then(()=>{
      // Chrome Android umumnya mengizinkan orientation.lock setelah fullscreen.
      if(screenObj.orientation && typeof screenObj.orientation.lock==='function'){
        return screenObj.orientation.lock('landscape');
      }
    }).catch(()=>{ /* Safari/iOS dan beberapa browser membatasi API. */ })
      .finally(()=>{
        if(token!==requestToken)return;
        delay(()=>{if(token===requestToken)update();},300);
      });
  }
  win.addEventListener('resize',update);
  win.addEventListener('orientationchange',update);
  doc.addEventListener('fullscreenchange',()=>{
    if(!doc.fullscreenElement){wantsLandscape=false;allowsPortrait=true;}
    update();
  });
  if(skip)skip.onclick=()=>{allowsPortrait=true;update();};
  if(retry)retry.onclick=()=>{allowsPortrait=false;enter();};
  function exit(){
    wantsLandscape=false;allowsPortrait=true;
    try{screenObj.orientation?.unlock?.();}catch{}
    if(doc.fullscreenElement && typeof doc.exitFullscreen==='function'){
      // Tombol keluar: tetap bisa bermain setelah kembali dari fullscreen.
      try{Promise.resolve(doc.exitFullscreen()).catch(()=>{});}catch{}
    }
    update();
  }
  return {enter,exit};
}
