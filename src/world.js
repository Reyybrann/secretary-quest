export const WIDTH=1344,HEIGHT=960,SPAWN={x:656,y:480};
export const ROOMS=[
{id:'boss',label:'RUANG KETUA',x:32,y:32,w:384,h:384,color:0xe4cda5,door:224},
{id:'desk',label:'MEJA BENDAHARA',x:448,y:32,w:416,h:384,color:0xcddfd3,door:656},
{id:'archive',label:'ARSIP KEUANGAN',x:896,y:32,w:416,h:384,color:0xded5bc,door:1104},
{id:'store',label:'GUDANG / TOKO',x:32,y:544,w:384,h:384,color:0xe8d9b6,door:224},
{id:'marketing',label:'PEMASARAN',x:448,y:544,w:416,h:384,color:0xe9c4b2,door:656},
{id:'meeting',label:'RUANG RAPAT',x:896,y:544,w:416,h:384,color:0xc8d9de,door:1104}];
export const OBJECTS=[{id:'boss',name:'Pak Budi · ketua usaha',x:224,y:208,texture:'boss'}, {id:'desk',name:'Komputer bendahara',x:656,y:224,texture:'desk'}, {id:'archive',name:'Lemari bukti transaksi',x:1104,y:224,texture:'cabinet'}, {id:'store',name:'Pak Doni · gudang & kasir',x:224,y:688,texture:'doni'}, {id:'marketing',name:'Kak Sari · pemasaran',x:656,y:688,texture:'sari'}, {id:'meeting',name:'Layar rapat',x:1104,y:688,texture:'screen'}];
export const FURNITURE=[['desk',160,144],['chair',160,184],['cabinet',352,128],['plant',80,112],['plant',368,352],['sofa',80,304],['desk',560,128],['chair',560,172],['desk',768,128],['chair',768,172],['plant',800,352],['printer',496,304],['cabinet',960,128],['cabinet',1024,128],['cabinet',1216,128],['printer',1216,304],['plant',944,352],['shelf',96,624],['shelf',352,624],['shelf',96,832],['shelf',352,832],['desk',224,608],['plant',80,736],['desk',544,624],['chair',544,668],['poster',784,608],['plant',800,832],['sofa',560,832],['table',1040,800],['table',1104,800],['table',1168,800],['chair',1040,848],['chair',1104,848],['chair',1168,848],['plant',1248,608],['plant',944,880]];
export function obstacles(){let r=[{x:0,y:0,w:WIDTH,h:32},{x:0,y:928,w:WIDTH,h:32},{x:0,y:0,w:32,h:HEIGHT},{x:1312,y:0,w:32,h:HEIGHT}];for(let x of [416,864]){r.push({x,y:32,w:32,h:384},{x,y:544,w:32,h:384});}for(let a of ROOMS){let y=a.y===32?416:528;r.push({x:a.x,y,w:a.door-48-a.x,h:16},{x:a.door+48,y,w:a.x+a.w-a.door-48,h:16});}for(let [kind,x,y] of FURNITURE){r.push({x:x-22,y:y-14,w:44,h:28});}for(let o of OBJECTS)r.push({x:o.x-22,y:o.y-16,w:44,h:30});return r;}
export const BLOCKS=obstacles();
export function safePosition(p){return p&&p.x>=46&&p.x<=1298&&p.y>=46&&p.y<=914&&!BLOCKS.some(r=>p.x+10>r.x&&p.x-10<r.x+r.w&&p.y+8>r.y&&p.y-8<r.y+r.h);}
export function target(q){if(!q)return 'meeting';if(q.id==='D1Q1')return 'boss';if(q.place.includes('Bendahara'))return 'desk';if(q.place.includes('Pemasaran'))return 'marketing';if(q.place.includes('Rapat'))return 'meeting';if(q.place.includes('Arsip'))return 'archive';return 'store';}
