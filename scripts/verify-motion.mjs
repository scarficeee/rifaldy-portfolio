import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import ts from 'typescript';
const code = ts.transpileModule(fs.readFileSync('components/motion-preferences.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
function environment({reduced=false,preference=null,kind='navigate',next=null,blocked=false}={}) {
  const timers=[];
  const values=new Map([['rr-motion',preference],['rr-next-page',next && JSON.stringify(next)]]);
  const storage={getItem(key){if(blocked)throw Error('Storage unavailable');return values.get(key)||null;},setItem(key,value){values.set(key,value);},removeItem(key){values.delete(key);}};
  const context={exports:{},document:{documentElement:{dataset:{}}},localStorage:storage,sessionStorage:storage,matchMedia:()=>({matches:reduced}),performance:{getEntriesByType:()=>[{type:kind}]},location:{pathname:'/work/japanect/'},setTimeout:(fn,ms)=>timers.push({fn,ms}),Date};
  vm.runInNewContext(code,context);
  vm.runInNewContext(context.exports.openingScript,context);
  return {context,timers,root:context.document.documentElement.dataset};
}
for(const [options,expected] of [[{},'on'],[{preference:'off'},'off'],[{reduced:true},'off'],[{reduced:true,preference:'on'},'off'],[{blocked:true,reduced:true},'off']]) {
  const {root,context}=environment(options);
  assert.equal(root.motion,expected);
  assert.equal(context.exports.motionEnabled(),expected==='on');
}
const next={path:'/work/japanect/',at:Date.now()};
assert.equal(environment({next}).root.loading,'route');
assert.equal(environment({next,kind:'reload'}).root.loading,'entry');
assert.equal(environment({next:{...next,at:Date.now()-20000}}).root.loading,'entry');
assert.equal(environment({next:{...next,path:'/different/'}}).root.loading,'entry');
const first=environment();
assert.equal(first.root.loading,'entry');
assert.equal(first.timers.length,1);
first.timers[0].fn();
assert.equal(first.root.loading,'ready');
assert.equal(first.root.navigation,'ready');
console.log('PASS: saved motion preference, OS reduced-motion priority, unavailable storage, internal route vs refresh, stale markers, and loading fail-safe.');
