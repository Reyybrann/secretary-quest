/**
 * Fullscreen + landscape Android Chrome dengan fallback rotasi CSS 90 derajat.
 * API Web Orientation hanya boleh dijalankan lewat klik + umumnya fullscreen.
 * Jika browser menolak, paksa layout horizontal agar tetap bisa dimainkan.
 */
export function initLandscapeMode({win=window,doc=document,screenObj=screen,
    find=selector=>doc.querySelector(selector),delay=(fn,ms)=>setTimeout(fn,ms)}={}){
  const root=doc.documentElement,hint=find('#rotate-hint'),retry=find('#rotate-retry'),skip=find('#rotate-skip'),okay=find('#rotate-okay');
  let requestToken=0,wants=false,portraitAllowed=false,fullscreenWasActive=false,dismissed=false;
  const refreshCanvas=()=>win.dispatchEvent?.(new Event('secretary-layout'));
  const coarse=()=>win.matchMedia('(pointer:coarse)').matches || win.matchMedia('(any-pointer:coarse)').matches;
  const isPhone=()=>coarse()&&Math.min(win.innerWidth,win.innerHeight)<750;
  const isPortrait=()=>win.matchMedia('(orientation:portrait)').matches;
  const forced=()=>root.classList.contains('force-landscape');
  function hideHint(){if(hint)hint.hidden=true;}
  function useCssLandscape(){
    if(!wants||portraitAllowed||!isPhone()||!isPortrait()){root.classList.remove('force-landscape');hideHint();return;}
    const wasForced=forced();
    root.classList.add('force-landscape');
    if(!wasForced)refreshCanvas();
    if(hint&&!dismissed){hint.hidden=false;hint.dataset.reason='forced';}
  }
  function update(){
    // Jangan putar halaman 90° jika sistem sudah landscape secara asli.
    if(!isPortrait()||!isPhone()){const wasForced=forced();root.classList.remove('force-landscape');hideHint();if(wasForced)refreshCanvas();}
    else if(wants&&!portraitAllowed&&forced()) { /* pertahankan fallback */ }
  }
  function enter(){
    if(!isPhone())return;
    wants=true;portraitAllowed=false;dismissed=false;const token=++requestToken;
    if(!isPortrait()){const wasForced=forced();root.classList.remove('force-landscape');hideHint();if(wasForced)refreshCanvas();return;}
    let fullscreenPromise;
    try{
      fullscreenPromise=doc.fullscreenElement ? Promise.resolve() :
        doc.documentElement.requestFullscreen ? doc.documentElement.requestFullscreen({navigationUI:'hide'}) : Promise.reject(Error('no fullscreen'));
    }catch(err){fullscreenPromise=Promise.reject(err);}
    Promise.resolve(fullscreenPromise).then(()=>{
      if(doc.fullscreenElement)fullscreenWasActive=true;
      if(screenObj.orientation?.lock)return screenObj.orientation.lock('landscape');
      throw Error('no orientation lock');
    }).catch(()=>{
      // Fallback yang benar-benar landscape secara visual, walau bukan rotasi OS.
      if(token===requestToken)useCssLandscape();
    }).then(()=>{
      if(token!==requestToken)return;
      // Beberapa browser resolve() tapi tampilan tetap portrait: deteksi ulang.
      delay(()=>{
        if(token!==requestToken)return;
        if(isPortrait())useCssLandscape();else update();
      },500);
    });
  }
  function exit(){
    ++requestToken;wants=false;portraitAllowed=true;
    const wasForced=forced();root.classList.remove('force-landscape');hideHint();if(wasForced)refreshCanvas();
    try{screenObj.orientation?.unlock?.();}catch{}
    if(doc.fullscreenElement&&doc.exitFullscreen){
      try{Promise.resolve(doc.exitFullscreen()).catch(()=>{});}catch{}
    }
  }
  const continueForced=()=>{dismissed=true;hideHint();};
  if(okay)okay.onclick=continueForced;
  if(skip)skip.onclick=()=>{portraitAllowed=true;dismissed=true;const wasForced=forced();root.classList.remove('force-landscape');hideHint();if(wasForced)refreshCanvas();};
  if(retry)retry.onclick=()=>{hideHint();enter();};
  win.addEventListener('orientationchange',update);win.addEventListener('resize',update);
  doc.addEventListener('fullscreenchange',()=>{
    if(doc.fullscreenElement)fullscreenWasActive=true;
    else if(fullscreenWasActive){
      fullscreenWasActive=false;
      // Keluar fullscreen via tombol kembali tidak memblok game.
      if(wants&&!portraitAllowed&&isPortrait())useCssLandscape();
    }
  });
  return {enter,exit,isForced:forced};
}
