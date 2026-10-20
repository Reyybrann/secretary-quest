// Original lightweight tycoon artwork. Curves, gradients and shadows are baked
// into small Canvas textures ONCE at boot; animation only swaps these textures.
import {WIDTH,HEIGHT,ROOMS,BLOCKS} from './world.js';
const ink='#354b52';
function rounded(c,x,y,w,h,r,fill,stroke=ink,lw=1.6){c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath();c.fillStyle=fill;c.fill();if(stroke){c.lineWidth=lw;c.strokeStyle=stroke;c.stroke();}}
function ellipse(c,x,y,rx,ry,fill,stroke=null,lw=1.5){c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fillStyle=fill;c.fill();if(stroke){c.lineWidth=lw;c.strokeStyle=stroke;c.stroke();}}
function line(c,x1,y1,x2,y2,color=ink,w=1.5){c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.strokeStyle=color;c.lineWidth=w;c.lineCap='round';c.stroke();}
function grad(c,y,h,a,b){let g=c.createLinearGradient(0,y,0,y+h);g.addColorStop(0,a);g.addColorStop(1,b);return g;}
function shadow(c,x,y,rx,ry){ellipse(c,x,y,rx,ry,'#26395012');ellipse(c,x,y,rx*.8,ry*.65,'#26395016');}
function panel(c,x,y,w,h,a='#f4d39b',b='#d8a96c'){rounded(c,x,y+4,w,h,6,'#966b4b');rounded(c,x,y,w,h,6,grad(c,y,h,a,b));line(c,x+8,y+4,x+w-8,y+4,'#fff8df99',2);}
function paper(c,x,y,w=15,h=19){rounded(c,x,y,w,h,2,'#fffbed','#a9b4ac',1);for(let n=0;n<3;n++)line(c,x+3,y+5+n*4,x+w-3,y+5+n*4,'#b7c8c0',1);}
export function makeArt(scene){
 function tex(key,w,h,draw){let t=scene.textures.createCanvas(key,w,h);let c=t.context;c.imageSmoothingEnabled=true;draw(c);t.refresh();}
 const clothes=['#4eafa3','#a88ac5','#eab15e','#51798c','#d58378','#7b9e78'];
 const hair=['#664638','#3e343e','#9f6338','#414247','#7f493a','#55533b'];
 for(let p=0;p<6;p++)for(let dir=0;dir<4;dir++)for(let f=0;f<3;f++)tex(`person-${p}-${dir}-${f}`,64,96,c=>{
   let bob=f===1?-1.6:0,step=f===1?-2:f===2?2:0;shadow(c,32,86,21,6);c.save();c.translate(0,bob);
   // Feet and trousers, small body, oversized expressive head.
   rounded(c,20,68,10,17+step,4,'#435e6c');rounded(c,35,68,10,17-step,4,'#435e6c');
   rounded(c,18,80+step,14,7,3,'#34474e');rounded(c,34,80-step,14,7,3,'#34474e');
   line(c,20,82+step,28,82+step,'#7d939a',1);line(c,36,82-step,44,82-step,'#7d939a',1);
   ellipse(c,15,63-step,5,9,'#edbc96',ink);ellipse(c,49,63+step,5,9,'#edbc96',ink);
   rounded(c,16,47,33,29,9,grad(c,47,29,clothes[p],['#31877e','#8162a2','#c28c40','#3b617b','#b9635a','#5d825a'][p]));
   ellipse(c,31,49,7,5,'#eec2a0');
   if(dir!==3){c.fillStyle='#fff9e9';c.beginPath();c.moveTo(22,50);c.lineTo(31,55);c.lineTo(25,60);c.fill();c.beginPath();c.moveTo(40,50);c.lineTo(32,55);c.lineTo(37,60);c.fill();line(c,31,56,31,70,'#e1ede6',1);rounded(c,38,61,7,9,1,'#fdf3ce','#497c81',1);line(c,39,63,43,63,'#7a9f9f',1);}
   // Hair silhouette and ears.
   ellipse(c,32,29,24,25,hair[p],ink,2);ellipse(c,10,36,4,6,'#e9b48d',ink);ellipse(c,54,36,4,6,'#e9b48d',ink);
   if(dir===3){ellipse(c,32,32,23,22,grad(c,8,47,hair[p],'#3b3435'),ink,2);c.strokeStyle='#ffffff1c';c.lineWidth=2;for(let i=0;i<4;i++){c.beginPath();c.moveTo(20+i*6,13);c.quadraticCurveTo(13+i*9,29,20+i*7,45);c.stroke();}if(p===1||p===4)ellipse(c,49,42,8,13,hair[p],ink);}
   else{
     let faceX=dir===1?29:dir===2?35:32;
     ellipse(c,faceX,33,20,22,grad(c,13,43,'#ffe0b7','#eebc93'),ink,1.7);
     c.fillStyle=hair[p];c.beginPath();c.moveTo(10,26);c.bezierCurveTo(8,0,49,-2,55,21);c.lineTo(51,30);c.quadraticCurveTo(43,23,41,15);c.quadraticCurveTo(32,27,13,28);c.closePath();c.fill();c.strokeStyle=ink;c.lineWidth=1.5;c.stroke();
     c.strokeStyle='#ffffff22';c.lineWidth=3;c.beginPath();c.moveTo(18,13);c.quadraticCurveTo(29,6,40,10);c.stroke();
     let eyes=dir===0?[24,41]:dir===1?[21]:[43];for(let x of eyes){ellipse(c,x,35,2.8,4,'#34434c');ellipse(c,x-.7,33.8,.8,1,'white');line(c,x-3,28.8,x+2,28,'#664d43',1.6);}
     ellipse(c,faceX-12,43,4,2.4,'#e5978d66');ellipse(c,faceX+12,43,4,2.4,'#e5978d66');
     c.beginPath();c.moveTo(faceX-3,45);c.quadraticCurveTo(faceX+1,49,faceX+5,44);c.strokeStyle='#9e6254';c.lineWidth=1.4;c.stroke();
     if(p===3&&dir===0){rounded(c,17,30,14,12,4,'#ffffff10','#354b52',1.5);rounded(c,35,30,14,12,4,'#ffffff10','#354b52',1.5);line(c,31,34,35,34);}
     if(p===1||p===4){ellipse(c,52,40,6,12,hair[p],ink);ellipse(c,51,29,3,3,clothes[p]);}
   }c.restore();
 });
 for(let key of ['boss','doni','sari']){let p={boss:3,doni:5,sari:4}[key];scene.textures.addCanvas(key,scene.textures.get(`person-${p}-0-0`).getSourceImage());}
 // Draw each 64-unit furniture illustration at 2× resolution.
 function furniture(key,fn){tex(key,128,128,c=>{c.scale(2,2);fn(c);});}
 furniture('desk',c=>{shadow(c,32,55,29,7);rounded(c,8,42,5,15,2,'#8d6c50');rounded(c,51,42,5,15,2,'#8d6c50');panel(c,3,17,58,32);rounded(c,32,38,21,12,3,'#c49161','#996a49');line(c,41,43,46,43,'#ffebbd',2);
 rounded(c,27,9,28,22,3,'#344f5b');rounded(c,29,11,24,17,1,grad(c,11,17,'#c5e7dd','#80bdba'),'#253c49',1);rounded(c,31,13,6,12,1,'#569e9c',null);line(c,39,16,50,16,'#eaf8eb',1.2);line(c,39,20,47,20,'#eaf8eb',1.2);line(c,41,31,41,35,'#344f5b',4);ellipse(c,41,35,7,2,'#344f5b');rounded(c,29,38,21,5,1,'#e3e8da','#8eaaa5',.8);for(let i=0;i<7;i++)line(c,31+i*2.5,39,31+i*2.5,41,'#91a9a2',.6);paper(c,8,24,13,17);ellipse(c,22,18,4,4,'#f5f2dd',ink,1);ellipse(c,22,17,2.6,2,'#8a6a51');});
 furniture('cabinet',c=>{shadow(c,32,56,25,6);panel(c,8,5,47,49,'#d8d9bf','#a3b59c');for(let y of [12,26,40]){rounded(c,12,y,39,11,2,grad(c,y,11,'#f4e8c5','#d7c7a2'),'#7e9786',1);rounded(c,28,y+3,10,3,1,'#738e83',null);rounded(c,16,y+2,7,5,1,'#fffaf0','#c4c5a7',.5);}line(c,12,7,50,7,'#fff8dc',1);});
 furniture('shelf',c=>{shadow(c,32,56,28,6);panel(c,4,4,56,50,'#d8b083','#b58259');for(let y of [11,30]){rounded(c,8,y,48,17,1,'#78674f','#99734d',1);for(let i=0;i<7;i++){let h=12+(i%3);rounded(c,10+i*6.4,y+16-h,5.6,h,1,['#73b8a3','#e9a079','#e5c672','#7ca9bc','#c49bb0'][i%5],'#675e53',.6);line(c,12+i*6.4,y+6,12+i*6.4,y+12,'#fff8de88',.7);}}});
 furniture('chair',c=>{shadow(c,32,54,22,6);line(c,32,39,32,55,'#627879',4);line(c,20,57,44,57,'#627879',3);rounded(c,13,5,38,28,9,grad(c,5,28,'#8bc9c1','#448b89'));rounded(c,17,9,30,17,6,'#8cc6bd','#9cd1c5',.7);rounded(c,12,31,40,16,7,grad(c,31,16,'#a2d4c5','#64aaa0'));rounded(c,7,26,5,18,2,'#527677');rounded(c,52,26,5,18,2,'#527677');});
 furniture('plant',c=>{shadow(c,32,56,21,6);rounded(c,20,37,25,20,5,grad(c,37,20,'#f2c48d','#c68c64'),'#8e7254');ellipse(c,32,37,13,4,'#896a4e','#8e7254');line(c,32,20,32,38,'#749552',4);for(let [x,y,r] of [[22,19,13],[40,18,13],[31,10,13],[21,30,12],[42,29,12],[32,23,15]]){ellipse(c,x,y,r,r*.85,grad(c,y-r,r*2,'#a2d377','#5e9c69'),'#598964',1);}ellipse(c,23,12,5,2.8,'#daee9f77');ellipse(c,41,23,4,2.5,'#daee9f66');line(c,25,45,25,51,'#ffe2b288',2);});
 furniture('sofa',c=>{shadow(c,32,55,30,6);rounded(c,8,46,5,10,2,'#826a55');rounded(c,51,46,5,10,2,'#826a55');rounded(c,4,12,56,34,9,grad(c,12,34,'#aaccc4','#649e9c'));for(let x of [10,33]){rounded(c,x,17,21,19,5,'#bed9c6','#729e98',1);rounded(c,x,36,21,13,4,grad(c,36,13,'#b8dbc7','#84b7a7'),'#629793',1);}rounded(c,3,29,8,22,4,'#9dc6b6');rounded(c,53,29,8,22,4,'#9dc6b6');});
 furniture('table',c=>{shadow(c,32,55,29,6);for(let x of [9,50])rounded(c,x,40,5,16,2,'#997256');panel(c,1,7,62,40,'#f0d4a4','#d0aa79');for(let i=0;i<4;i++)line(c,8,16+i*8,57,16+i*8,'#ae80522a',.8);paper(c,15,16,13,18);ellipse(c,43,23,5,4,'#eaf1da','#799b91',1);});
 furniture('printer',c=>{shadow(c,32,55,25,6);panel(c,5,37,54,17);paper(c,20,4,27,25);rounded(c,9,24,46,25,6,grad(c,24,25,'#edf0de','#b5c9be'));rounded(c,15,39,34,6,2,'#4c686b');paper(c,21,41,22,15);rounded(c,36,29,10,5,1,'#8ec8b5','#718c85',.8);ellipse(c,49,31,1.5,1.5,'#efac6a');});
 furniture('screen',c=>{shadow(c,32,57,25,5);line(c,31,40,31,57,'#6b8587',3);line(c,19,59,45,59,'#6b8587',3);rounded(c,2,3,60,40,4,'#476775');rounded(c,5,6,54,33,1,grad(c,6,33,'#f5f3df','#deeadb'),'#afc7ba',1);line(c,11,12,38,12,'#729e94',2);line(c,11,17,27,17,'#c1cdb9',1);for(let i=0;i<4;i++)rounded(c,13+i*11,30-i*3,7,6+i*3,1,['#7cb7a3','#e6b76d'][i%2],null);});
 furniture('poster',c=>{shadow(c,32,57,23,4);rounded(c,9,3,47,53,3,'#bf9871');rounded(c,12,6,41,47,1,'#fff8e3','#e1c7a0',1);rounded(c,16,10,33,14,2,'#dca365',null);ellipse(c,33,17,6,5,'#ffe2a9');line(c,19,30,45,30,'#6caa9b',3);line(c,22,36,42,36,'#b5bd9d',2);line(c,25,42,39,42,'#b5bd9d',2);});
 // Single baked floor: tile detail, wall shadows, windows and signage.
 tex('office-floor',WIDTH,HEIGHT,c=>{
   c.fillStyle='#365d66';c.fillRect(0,0,WIDTH,HEIGHT);
   for(let y=0;y<HEIGHT;y+=32)for(let x=0;x<WIDTH;x+=32){c.fillStyle=((x+y)/32)%2?'#d3dbce':'#e2e5d6';c.fillRect(x,y,32,32);line(c,x,y,x+32,y,'#f9f6e044',.7);}
   const floor={boss:['#ead9b8','#e3cfac'],desk:['#9dc2b5','#a9cbbd'],archive:['#d4c9ac','#dfd5b9'],store:['#74aaa4','#8dbab0'],marketing:['#e4c3ab','#edd0b7'],meeting:['#a9bfc1','#b6cbca']};
   for(let r of ROOMS){let colors=floor[r.id];for(let y=r.y;y<r.y+r.h;y+=32)for(let x=r.x;x<r.x+r.w;x+=32){c.fillStyle=colors[((x-r.x+y-r.y)/32)%2];c.fillRect(x,y,32,32);line(c,x+1,y+1,x+30,y+1,'#ffffff22',.6);}
     c.fillStyle=grad(c,r.y,24,'#26395022','#26395000');c.fillRect(r.x,r.y,r.w,24);
     rounded(c,r.x+16,r.y+16,r.w-32,30,6,'#fff9ebd9','#9dae9d',1);c.fillStyle='#375d62';c.font='bold 11px Arial';c.textAlign='left';c.fillText(r.label,r.x+28,r.y+35);
     if(r.y===32)for(let x=r.x+48;x<r.x+r.w-32;x+=128){rounded(c,x,40,64,14,3,'#6a8b8d');rounded(c,x+3,42,58,9,1,grad(c,42,9,'#d5edf0','#9ccfca'),null);line(c,x+32,43,x+32,50,'#658b8b',2);}
   }
   for(let r of BLOCKS.slice(0,20)){c.fillStyle='#1e354426';c.fillRect(r.x+3,r.y+r.h,r.w,8);c.fillStyle='#35636b';c.fillRect(r.x,r.y,r.w,r.h);c.fillStyle='#60908e';c.fillRect(r.x,r.y,r.w,Math.min(5,r.h));c.fillStyle='#b4c8a366';c.fillRect(r.x,r.y,r.w,1);}
   for(let r of ROOMS){let y=r.y===32?412:528;rounded(c,r.door-47,y,94,19,3,'#b79f79','#9d8f71',1);rounded(c,r.door-35,y+4,70,10,2,'#e7d3a5',null);}
   rounded(c,472,450,368,43,12,'#f8f3db','#abbba7',1.5);c.font='bold 16px Arial';c.textAlign='center';c.fillStyle='#527b74';c.fillText('K A N T O R   P E L A N G I',656,478);
 });
}
