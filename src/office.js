import {makeArt} from './art.js?v=1.6.0';
import {WIDTH,HEIGHT,ROOMS,OBJECTS,FURNITURE,BLOCKS,SPAWN,safePosition,target} from './world.js?v=1.6.0';
import {quest} from './engine.js?v=1.6.0';
export function createOffice(app){return class OfficeScene extends Phaser.Scene{
constructor(){super('Office');this.direction=0;this.lastSave=0;this.touch={};this.touchAnalog={x:0,y:0};this.manualZoom=false;}
create(){makeArt(this);app.scene=this;this.add.image(0,0,'office-floor').setOrigin(0).setDepth(-10);
this.solids=this.physics.add.staticGroup();BLOCKS.forEach(r=>{let zone=this.add.zone(r.x+r.w/2,r.y+r.h/2,r.w,r.h);this.solids.add(zone);});
for(let [kind,x,y] of FURNITURE)this.add.image(x,y,kind).setScale(.5).setDepth(y);
this.objectSprites={};for(let o of OBJECTS){let img=this.add.image(o.x,o.y,o.texture).setScale(.5).setDepth(o.y);this.objectSprites[o.id]=img;this.add.text(o.x,o.y+37,o.id==='desk'?'PC + TELEPON':o.id==='store'?'PAK DONI':o.id==='boss'?'PAK BUDI':o.id==='marketing'?'KAK SARI':o.id==='meeting'?'LAPORAN':'ARSIP',{fontFamily:'Arial',fontSize:'10px',color:'#344c4d',backgroundColor:'#fff9ebd9',padding:{x:5,y:3}}).setOrigin(.5,0).setDepth(o.y+38);}
this.customers=[this.add.image(304,720,'person-1-2-0').setScale(.5).setDepth(720),this.add.image(144,776,'person-2-0-0').setScale(.5).setDepth(776)];
this.decorPlant=this.add.image(720,304,'plant').setScale(.5).setDepth(304).setVisible(false);this.decorRug=this.add.rectangle(656,336,120,48,0xe1a96d).setStrokeStyle(3,0xf8dda3).setDepth(0).setVisible(false);
let p=safePosition(app.state.position)?app.state.position:SPAWN;this.player=this.physics.add.sprite(p.x,p.y,'person-0-0-0').setScale(.5).setOrigin(.5,5/6);this.player.body.setSize(40,28).setOffset(12,64);this.player.setCollideWorldBounds(true);this.physics.world.setBounds(32,32,1280,896);this.physics.add.collider(this.player,this.solids);this.cameras.main.setBounds(0,0,WIDTH,HEIGHT);this.cameras.main.startFollow(this.player,true,.15,.15);this.cameras.main.setRoundPixels(true);this.applyResponsiveZoom();this.scale.on('resize',()=>this.applyResponsiveZoom());
this.keys=this.input.keyboard.addKeys('W,A,S,D,UP,DOWN,LEFT,RIGHT');this.input.keyboard.on('keydown',e=>{if(app.modal)return;if(['KeyE','Space'].includes(e.code)){e.preventDefault();this.interact();}if(e.code==='KeyM')app.showMap();if(e.code==='KeyJ')app.showJournal();});
this.input.on('pointerdown',p=>{if(app.modal||!app.running)return;let o=OBJECTS.find(o=>Math.hypot(o.x-p.worldX,o.y-p.worldY)<36);if(o){if(Math.hypot(o.x-this.player.x,o.y-this.player.y)<=64)app.interact(o.id);else app.toast('Dekati objek terlebih dahulu, lalu tekan E (PC) atau AKSI (HP).');}});
this.marker=this.add.text(0,0,'▼',{fontFamily:'Arial',fontSize:'27px',color:'#f3a94f',stroke:'#7e5b38',strokeThickness:2}).setOrigin(.5).setDepth(2000);app.ready();}
applyResponsiveZoom(){
 const cam=this.cameras.main;
 const width=this.scale.gameSize.width||this.game.scale.width,height=this.scale.gameSize.height||this.game.scale.height;
 const portrait=height>=width;
 if(this.lastPortrait!==undefined&&this.lastPortrait!==portrait)this.manualZoom=false;
 this.lastPortrait=portrait;
 if(!this.manualZoom){
  const touchDevice=window.matchMedia('(pointer: coarse)').matches||window.matchMedia('(any-pointer: coarse)').matches;
  const zoom=touchDevice&&width<=1100?(portrait?Math.min(1.12,Math.max(.85,width/400)):Math.min(1.2,Math.max(.8,width/700))):1.5;
  cam.setZoom(Math.round(zoom*100)/100);
 }
 const zoomButton=document.querySelector('#zoom');if(zoomButton)zoomButton.textContent='Zoom '+Math.round(cam.zoom*100)+'%';
}
resetPosition(){let p=safePosition(app.state.position)?app.state.position:SPAWN;this.player.setPosition(p.x,p.y);this.cameras.main.centerOn(p.x,p.y);}
interact(){if(!app.running||app.modal)return;let o=OBJECTS.filter(o=>Math.hypot(o.x-this.player.x,o.y-this.player.y)<=64).sort((a,b)=>Math.hypot(a.x-this.player.x,a.y-this.player.y)-Math.hypot(b.x-this.player.x,b.y-this.player.y))[0];if(o)app.interact(o.id);else app.toast('Dekati Pak Budi atau objek bertanda ▼.');}
update(time){if(!this.player)return;const s=app.state;this.customers[0].setVisible(s.day>=2);this.customers[1].setVisible(s.day>=3);this.decorPlant.setVisible(s.decorations.includes('plant'));this.decorRug.setVisible(s.decorations.includes('rug'));let q=quest(s),dest=OBJECTS.find(o=>o.id===(s.tutorial===2?'desk':s.questStatus==='AVAILABLE'&&s.completedQuestIds.length===0?'boss':target(q)));this.marker.setPosition(dest.x,dest.y-60+Math.sin(time/250)*3);this.marker.setVisible(app.running);let rx=dest.x-this.player.x,ry=dest.y-this.player.y;document.querySelector('#quest-route').textContent=(Math.hypot(rx,ry)<64?'● Sudah dekat':(Math.abs(rx)>Math.abs(ry)?(rx<0?'← Ke kiri':'Ke kanan →'):(ry<0?'↑ Ke atas':'↓ Ke bawah')))+' · '+Math.ceil(Math.hypot(rx,ry)/32)+' petak';
this.player.setVelocity(0);if(!app.running||app.modal){this.player.setTexture(`person-${s.palette}-${this.direction}-0`);return;}let k=this.keys,dx=(k.D.isDown||k.RIGHT.isDown||this.touch.right?1:0)-(k.A.isDown||k.LEFT.isDown||this.touch.left?1:0)+this.touchAnalog.x,dy=(k.S.isDown||k.DOWN.isDown||this.touch.down?1:0)-(k.W.isDown||k.UP.isDown||this.touch.up?1:0)+this.touchAnalog.y;if(dx||dy){let l=Math.hypot(dx,dy);let speed=172*Math.min(1,l);this.player.setVelocity(dx/l*speed,dy/l*speed);this.direction=Math.abs(dx)>Math.abs(dy)?(dx<0?1:2):(dy<0?3:0);if(s.tutorial===0){s.tutorial=1;app.toast('Bagus! Sekarang temui Pak Budi di ruang kiri atas.');}}
this.player.setTexture(`person-${s.palette}-${this.direction}-${dx||dy?Math.floor(time/150)%3:0}`).setDepth(this.player.y+16);let o=OBJECTS.find(o=>Math.hypot(o.x-this.player.x,o.y-this.player.y)<=64);let hint=document.querySelector('#interaction');hint.hidden=!o;if(o)hint.textContent=`E / AKSI  ·  ${o.name}`;let touchTarget=document.querySelector('#touch-target'),touchE=document.querySelector('#touch-e');if(touchTarget)touchTarget.textContent=o?o.name:'Interaksi';touchE?.classList.toggle('nearby',!!o);let room=ROOMS.find(r=>this.player.x>r.x&&this.player.x<r.x+r.w&&this.player.y>r.y&&this.player.y<r.y+r.h);let zone=document.querySelector('#zone span');zone.textContent='• '+(room?.label||'LOBI');if(room&&!s.visited.includes(room.id)){s.visited.push(room.id);app.persist();}if(time-this.lastSave>2000&&safePosition(this.player)){s.position={x:Math.round(this.player.x),y:Math.round(this.player.y)};app.persist();this.lastSave=time;}}
};}
