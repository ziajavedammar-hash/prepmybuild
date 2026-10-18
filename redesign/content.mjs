export const projects = [
 {id:'bathroom',name:'Bathroom',tag:'A little everyday luxury',image:'bathroom',alt:'Warm bathroom design concept with oak vanity and ivory tile',description:'Make the everyday feel considered.',focus:['Layout & storage','Tile & surfaces','Fixtures & lighting'],scope:['Confirm the existing layout and any plumbing changes','Specify waterproofing, tile and substrate preparation','List fixtures, ventilation, lighting and disposal'],materials:[['Paint for bathroom walls','paint','For paintable walls only; excludes tile and moisture protection.']]},
 {id:'patio',name:'Backyard patio',tag:'More room to unwind',image:'patio',alt:'Illustrative garden patio with stone paving and outdoor seating',description:'Create your own outdoor gathering place.',focus:['Surface & layout','Drainage & levels','Seating & shade'],scope:['Measure the area and confirm access and existing ground conditions','Specify excavation, base, drainage and the chosen surface','Clarify edges, disposal and any lighting or shade structures'],materials:[['Concrete patio quantities','concrete','For a rectangular concrete slab, not pavers or structural design.'],['Gravel surface quantities','gravel','For a gravel option; confirm the base and supplier density.']]},
 {id:'paint',name:'Room painting',tag:'A fresh perspective',image:'living',alt:'Illustrative neutral living room with warm painted walls',description:'Change the feeling, keep the home.',focus:['Colour & finish','Surface preparation','Walls & details'],scope:['Measure wall lengths and height; count doors and windows','Specify preparation, primer where needed, colour, finish and coats','Clarify ceilings, trim, furniture protection and cleanup'],materials:[['Room paint quantities','paint','Estimate room-wall coverage using your measurements and product label.']]},
 {id:'fence',name:'Fencing',tag:'A little more privacy',image:'patio',alt:'Garden design inspiration with timber and green planting',description:'Define your space with intention.',focus:['Privacy & boundaries','Material & finish','Gates & access'],scope:['Confirm property boundaries, utilities and any local height rules','Measure each run and locate corners, ends and gates','Specify material, height, post spacing, footing and removal scope'],materials:[['Fence posts & sections','fence','A straight-run starting point; corners, gates and terrain need review.']]},
 {id:'kitchen',name:'Kitchen',tag:'The heart of your home',image:'kitchen',alt:'Illustrative kitchen with oak cabinetry and pale stone counters',description:'Plan a kitchen that works beautifully.',focus:['Layout & workflow','Cabinets & storage','Surfaces & appliances'],scope:['Document the layout, appliances and plumbing or electrical changes','Specify cabinets, worktops, fittings and installation inclusions','Confirm preparation, disposal, access and the work schedule'],materials:[['Paint for kitchen walls','paint','For paintable room walls only; cabinet and renovation costs are not estimated.']]},
 {id:'custom',name:'Something else',tag:'Start with your idea',image:'living',alt:'Home interior inspiration',description:'Every good project starts with a thought.',focus:['Your goals','Existing conditions','Scope & priorities'],scope:['Describe the work and existing conditions','Record dimensions and the materials or finishes you prefer','Confirm inclusions, exclusions, permits and timing with a contractor'],materials:[]}
];
export const styles = [
 {id:'natural',name:'Warm & natural',detail:'Soft neutrals, tactile finishes and honest materials.',palette:['#ddd1ba','#a68561','#ede8db','#717960'],materials:'Oak tones · warm stone · soft whites',note:'Prioritise texture, warm light and a restrained natural palette.'},
 {id:'modern',name:'Clean & contemporary',detail:'Simple lines, considered contrast and uncluttered spaces.',palette:['#e6e4df','#858982','#313b36','#c5b69d'],materials:'Pale surfaces · dark accents · clean lines',note:'Keep details simple and let a few well-chosen materials do the work.'},
 {id:'classic',name:'Classic & timeless',detail:'Familiar forms, balanced details and lasting character.',palette:['#f0e8d8','#b99e70','#7e8c80','#b3a294'],materials:'Warm whites · muted colour · classic detailing',note:'Choose balanced proportions and familiar finishes you will enjoy for years.'}
];

const looks = {
 bathroom:{
  natural:{title:'A warm, quiet retreat',details:[['Vanity','Natural oak and simple storage'],['Surfaces','Warm ivory tile and tactile stone'],['Fittings','Soft brass accents']],consideration:'Ask about tile preparation, waterproofing and ventilation before choosing finishes.'},
  modern:{title:'Calm lines, considered contrast',details:[['Vanity','Charcoal floating cabinetry'],['Surfaces','Large pale porcelain tiles'],['Fittings','Matte black tapware']],consideration:'Check tile sizes against your room dimensions and confirm cleaning and maintenance requirements.'},
  classic:{title:'A little timeless character',details:[['Vanity','White shaker cabinetry'],['Surfaces','Pale marble and a patterned floor'],['Fittings','Polished nickel and a classic mirror']],consideration:'Natural stone may need sealing; discuss suitable wet-area materials and upkeep.'}
 },
 patio:{
  natural:{title:'An outdoor room for slow afternoons',details:[['Surface','Warm limestone paving'],['Furniture','Timber dining and woven seating'],['Shade','Natural timber pergola']],consideration:'Confirm drainage, the base and whether the chosen paving is suitable for your climate.'},
  modern:{title:'A crisp, architectural garden',details:[['Surface','Large pale concrete pavers'],['Furniture','Minimal charcoal outdoor furniture'],['Shade','Black pergola and simple lines']],consideration:'Paver systems need their own base and layout plan; the concrete calculator is for poured slabs.'},
  classic:{title:'An inviting garden gathering place',details:[['Surface','Herringbone brick paving'],['Furniture','Classic dark green garden seating'],['Shade','White painted timber pergola']],consideration:'Ask about brick suitability, drainage and the maintenance needs of painted outdoor timber.'}
 },
 paint:{
  natural:{title:'Warm neutrals, softer everyday living',details:[['Walls','Soft warm neutrals'],['Palette','Cream, oak and olive accents'],['Finish','A subtle low-sheen wall finish']],consideration:'Try physical paint samples in your own daylight; screen colours are only inspiration.'},
  modern:{title:'A fresh sage-green perspective',details:[['Walls','Muted sage-green paint'],['Palette','Cream furnishings and dark accents'],['Finish','Clean lines and restrained details']],consideration:'Confirm surface preparation, primer needs and the actual product coverage before buying.'},
  classic:{title:'Soft blue, with a little detail',details:[['Walls','Dusty blue paint'],['Palette','White trim and aged brass accents'],['Detail','Traditional wall moulding']],consideration:'Moulding and trim add work beyond wall painting; ask for those items separately in a quote.'}
 },
 fence:{
  natural:{title:'Warm timber, a softer boundary',details:[['Boards','Horizontal cedar slats'],['Finish','Natural warm wood tones'],['Planting','Layered green borders']],consideration:'Confirm boundaries, utilities, permitted height and the maintenance needs of the timber finish.'},
  modern:{title:'A clean, private garden edge',details:[['Boards','Vertical charcoal slats'],['Finish','A dark, consistent finish'],['Planting','Architectural grasses']],consideration:'Confirm the actual material and finish; dark coatings and slat spacing affect maintenance and privacy.'},
  classic:{title:'A traditional garden backdrop',details:[['Boards','White painted timber'],['Detail','A subtle lattice top'],['Planting','Flowering borders and clipped shrubs']],consideration:'Check total height including the lattice, gate details and the upkeep of painted timber.'}
 },
 kitchen:{
  natural:{title:'Oak, stone and everyday warmth',details:[['Cabinets','Natural oak cabinetry'],['Worktops','Pale stone surfaces'],['Fittings','Warm metal accents']],consideration:'Confirm appliance sizes, services and measured cabinetry layouts before ordering.'},
  modern:{title:'Deep green, beautifully pared back',details:[['Cabinets','Flat-front forest-green cabinetry'],['Worktops','Pale quartz and a simple backsplash'],['Fittings','Minimal black details']],consideration:'Confirm the actual worktop specification, fitting details and what the installation quote includes.'},
  classic:{title:'An easy, enduring kitchen',details:[['Cabinets','Warm ivory shaker doors'],['Island','A muted blue accent'],['Fittings','Brass hardware and classic tapware']],consideration:'Check cabinet construction, worktop maintenance and which fittings and appliances are included.'}
 }
};
export function conceptFor(projectId,styleId){
 const id=projectId==='custom'?'paint':projectId;
 const style=styles.some(s=>s.id===styleId)?styleId:'natural';
 const base={bathroom:'bathroom',patio:'patio',paint:'living',fence:'fence',kitchen:'kitchen'}[id]||'living';
 return {...looks[id][style],image:style==='natural'?base:`${id}-${style}`,alt:`${styles.find(s=>s.id===style).name} ${id==='paint'?'living room':id} — illustrative design concept`,general:projectId==='custom'};
}
