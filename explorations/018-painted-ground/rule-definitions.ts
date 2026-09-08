export const rules=[
 {id:'swap-add',name:'Swap · addition',equation:'A + B ↔ B + A',color:'#347e9b'},
 {id:'swap-mul',name:'Swap · multiplication',equation:'A × B ↔ B × A',color:'#347e9b'},
 {id:'assoc-add',name:'Regroup · addition',equation:'(A + B) + C ↔ A + (B + C)',color:'#b36148'},
 {id:'assoc-mul',name:'Regroup · multiplication',equation:'(A × B) × C ↔ A × (B × C)',color:'#b36148'},
 {id:'zero',name:'Additive identity',equation:'A + 0 → A',color:'#64883c'},
 {id:'one',name:'Multiplicative identity',equation:'A × 1 → A',color:'#64883c'},
 {id:'absorb',name:'Zero absorbs a product',equation:'A × 0 → 0',color:'#64883c'},
 {id:'distribute',name:'Distribute into a sum',equation:'A × (B + C) → A×B + A×C',color:'#99714c'},
 {id:'factor',name:'Common factor',equation:'A×X + B×X → (A+B)×X',color:'#8963a6'},
 {id:'eval-add',name:'Gather numbers · addition',equation:'3 + 2 → 5',color:'#a58120'},
 {id:'eval-mul',name:'Gather numbers · multiplication',equation:'3 × 2 → 6',color:'#a58120'},
];
export type RuleId=typeof rules[number]['id'];
