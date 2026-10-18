import assert from 'node:assert/strict';
import {materialPlan,quoteSheet} from '../redesign/project-planning.mjs';
assert.match(materialPlan('fence',{length:'100'}).summary,/14 posts \/ 13 sections/);
assert.match(materialPlan('paint',{length:'12',width:'12'}).summary,/2 gallons.*1.91/);
assert.match(materialPlan('patio',{surface:'concrete',length:'12',width:'12'}).summary,/2.0 cubic yards/);
assert.match(materialPlan('patio',{surface:'gravel',length:'50',width:'10'}).summary,/9.5 tons/);
assert.equal(materialPlan('patio',{length:'12',width:'12'}).status,'empty');
for(const values of [{length:'-1'},{length:'Infinity'},{length:'abc'},{length:'100001'}])assert.equal(materialPlan('fence',values).status,'invalid');
assert.equal(materialPlan('fence',{length:''}).status,'empty');
assert.equal(materialPlan('paint',{length:'12',width:'12',doors:'1.2'}).status,'invalid');
assert.equal(materialPlan('paint',{length:'1',width:'1',doors:'100'}).status,'invalid');
for(const p of ['fence','paint','patio','bathroom','kitchen','custom']){assert.equal(quoteSheet(p).items.length,5);assert.equal(quoteSheet(p).questions.length,3)}
assert.equal(materialPlan('kitchen').status,'scope');
console.log('Material planning checks passed: legacy examples, empty/invalid inputs, explicit surface choice, project-specific quote sheets.');
