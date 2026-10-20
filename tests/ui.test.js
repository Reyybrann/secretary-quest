import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {DATA} from '../src/data.js';import {OBJECTS,target} from '../src/world.js';import {summary,KEY} from '../src/engine.js';
// DOM integration only. This does NOT claim to run Phaser rendering or a real browser.
let JSDOM;try{({JSDOM}=await import('jsdom'));}catch{}
test('DOM: menu, tutorial, semua 20 form, retry, arsip, diskon, reload, sertifikat', {skip:!JSDOM}, async()=>{
let dom=new JSDOM(fs.readFileSync(new URL('../index.html',import.meta.url),'utf8'),{url:'https://example.test/secretary-quest/'});
for(let k of ['window','document','localStorage','Event','Blob'])globalThis[k]=dom.window[k];globalThis.matchMedia=()=>({matches:true});globalThis.Phaser={AUTO:0,Scale:{RESIZE:1,CENTER_BOTH:2},Scene:class{},Game:class{}};dom.window.Phaser=globalThis.Phaser;
const {app}=await import('../src/main.js');let player={x:656,y:480};app.scene={player,input:{keyboard:{resetKeys(){},enabled:true}},textures:{get(){return {getSourceImage(){return {toDataURL(){return 'data:image/png;base64,';}};}};}},resetPosition(){player.x=app.state.position.x;player.y=app.state.position.y;},touch:{}};app.beep=()=>{};app.confetti=()=>{};
const click=sel=>{let el=document.querySelector(sel);assert.ok(el,'Missing '+sel);assert.equal(el.disabled,false);el.click();};const fill=(sel,v)=>{let el=document.querySelector(sel);assert.ok(el,'Missing '+sel);el.value=String(v);el.dispatchEvent(new dom.window.Event('input',{bubbles:true}));};
app.ready();click('#new');fill('#player-name','Siswa Uji');click('#start');click('#go');assert.equal(app.modal,false);player.x=224;player.y=256;app.interact('boss');click('#dialog-next');
for(let [i,q] of DATA.quests.entries()){
if(i>0){app.close();let o=OBJECTS.find(o=>o.id===target(q));player.x=o.x;player.y=o.y+48;app.interact(o.id);if(document.querySelector('#dialog-next'))click('#dialog-next');}
assert.ok(document.querySelector('#work-form'),q.id+' form missing');
if(i===0){fill('#answer-modal','999');click('#submit-answer');assert.equal(app.state.cash,0);assert.ok(document.querySelector('#work-feedback').textContent.includes('Periksa'));}
let guard=0;while(document.querySelector('#work-form')&&guard++<5){for(let [k,v] of Object.entries(q.expected_answer)){if(typeof v==='number'){if(document.querySelector('#answer-'+k))fill('#answer-'+k,v);}else{let b=document.querySelector(`[data-choice="${k}"] button[data-value="${v}"]`);if(b)b.click();}}
if(q.minigame==='document-match')click('#archive-button');if(q.minigame==='discount-calculator')fill('#discount',10);if(q.minigame==='stock-count')for(let n=0;n<4;n++)click(`[data-stock="${n}"]`);click('#submit-answer');}
assert.equal(app.state.completedQuestIds.length,i+1,q.id);assert.ok(document.querySelector('#success-next'));click('#success-next');if(document.querySelector('#dialog-next'))click('#dialog-next');
if(i===0){app.close();player.x=656;player.y=272;app.interact('desk');fill('#practice','16000');click('#practice-submit');click('#dialog-next');assert.equal(app.state.tutorial,4);}
if([6,12,18].includes(i)){let before=structuredClone(app.state);app.load();assert.deepEqual(app.state,before);}
}
assert.equal(app.state.cash,575600);assert.equal(summary(app.state).profit,83600);assert.equal(app.state.exp,1000);assert.ok(document.querySelector('.certificate'));assert.ok(document.querySelector('.certificate').textContent.includes('Siswa Uji'));assert.equal(JSON.parse(localStorage.getItem(KEY)).completedQuestIds.length,20);
// State does not change from reports and certified save reloading.
let snapshot=JSON.stringify(app.state);app.notes();app.load();assert.equal(JSON.stringify(app.state),snapshot);
app.menu();click('#delete');assert.ok(localStorage.getItem(KEY));click('#yes');assert.ok(localStorage.getItem(KEY));click('#yes');assert.equal(localStorage.getItem(KEY),null);assert.equal(app.running,false);
clearTimeout(app.toastTimer);await new Promise(r=>setTimeout(r,60));dom.window.close();
});
