// Vintage Story inspired brewing data.
// Exposes `window.alcohols` for browser usage and exports for CommonJS.

const alcohols = [
	// Fruit / Cider / Wine (1:1 fermentation, sealing 7 days)
	{ id: 'apple_cider', name: 'Apple Cider', category: 'fruit', source: 'Apple juice', sealingDays: 7, juicePerBatch: 50, abv: 6.0, distillRatio: 10, baseSat: 80 },
	{ id: 'cherry_cider', name: 'Cherry Cider', category: 'fruit', source: 'Cherry juice', sealingDays: 7, juicePerBatch: 50, abv: 6.2, distillRatio: 10, baseSat: 80 },
	{ id: 'lychee_cider', name: 'Lychee Cider', category: 'fruit', source: 'Lychee juice', sealingDays: 7, juicePerBatch: 50, abv: 6.5, distillRatio: 10, baseSat: 80 },
    { id: "peach_cider", name: "Peach Cider", category: "fruit", source: "Peach juice", sealingDays: 7, juicePerBatch: 50, abv: 6.3, distillRatio: 10, baseSat: 80 },
    {id:"orange_cider", name:"Orange Cider", category:"fruit", source:"Orange juice", sealingDays:7, juicePerBatch:50, abv:6.4, distillRatio:10, baseSat:80},
    {id:"mango_cider", name:"Mango Cider", category:"fruit", source:"Mango juice", sealingDays:7, juicePerBatch:50, abv:6.6, distillRatio:10, baseSat:80},
    {id:"grenadine", name:"Grenadine", category:"fruit", source:"Grenadine juice", sealingDays:7, juicePerBatch:50, abv:6.7, distillRatio:10, baseSat:80},
    {id:"perry", name:"Perry", category:"fruit", source:"Pear juice", sealingDays:7, juicePerBatch:50, abv:6.1, distillRatio:10, baseSat:80},
    {id:"blueberry_wine", name:"Blueberry Wine", category:"fruit", source:"Blueberry juice", sealingDays:7, juicePerBatch:50, abv:7.0, distillRatio:10, baseSat:80},
    {id:"cranberry_wine", name:"Cranberry Wine", category:"fruit", source:"Cranberry juice", sealingDays:7, juicePerBatch:50, abv:7.2, distillRatio:10, baseSat:80},
    {id:"red_current_wine", name:"Red Currant Wine", category:"fruit", source:"Red Currant juice", sealingDays:7, juicePerBatch:50, abv:7.1, distillRatio:10, baseSat:80},
    {id:"black_current_wine", name:"Black Currant Wine", category:"fruit", source:"Black Currant juice", sealingDays:7, juicePerBatch:50, abv:7.3, distillRatio:10, baseSat:80},
    {id:"white_current_wine", name:"White Currant Wine", category:"fruit", source:"White Currant juice", sealingDays:7, juicePerBatch:50, abv:7.4, distillRatio:10, baseSat:80},
    {id:"saguaro_wine", name:"Saguaro Wine", category:"fruit", source:"Saguaro juice", sealingDays:7, juicePerBatch:50, abv:7.5, distillRatio:10, baseSat:80},
    {id:"pineapple_wine", name:"Pineapple Wine", category:"fruit", source:"Pineapple juice", sealingDays:7, juicePerBatch:50, abv:7.6, distillRatio:10, baseSat:80},

	// Honey / Mead (honey ferments 1:1, sealing 14 days for mead)
	{ id: 'mead', name: 'Mead', category: 'honey', source: 'Honey', sealingDays: 14, juicePerBatch: 50, abv: 8.0, distillRatio: 20, baseSat: 80 },

	// Grain ales: represented as water+flour batches. 50L water + 50 flour -> 10L ale (5:1)
	{ id: 'spelt_ale', name: 'Spelt Ale', category: 'grain', source: 'Spelt flour + Water', sealingDays: 14, inputWaterLiters: 50, inputFlourLiters: 50, juicePerBatch: 10, abv: 5.0, distillRatio: 20, baseSat: 80 },
	{ id: 'rice_ale', name: 'Rice / Sake', category: 'grain', source: 'Rice flour + Water', sealingDays: 14, inputWaterLiters: 50, inputFlourLiters: 50, juicePerBatch: 10, abv: 6.0, distillRatio: 20, baseSat: 80 },
	{ id: 'breadfruit_ale', name: 'Breadfruit Ale', category: 'fruit', source: 'Breadfruit juice', sealingDays: 7, juicePerBatch: 50, abv: 6.0, distillRatio: 10, baseSat: 80, note: 'Breadfruit ale behaves like fruit for sealing and ratios but provides grain nutrition in-game' },
    { id:"cassava_ale", name:"Cassava Ale", category:"grain", source:"Cassava flour + Water", sealingDays:14, inputWaterLiters:50, inputFlourLiters:50, juicePerBatch:10, abv:5.5, distillRatio:20, baseSat:80}
];

if (typeof window !== 'undefined') window.alcohols = alcohols;
if (typeof module !== 'undefined' && module.exports) module.exports = alcohols;
