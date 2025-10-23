// Vintage Story inspired brewing data.
// Exposes `window.alcohols` for browser usage and exports for CommonJS.

const alcohols = [
	// Fruit / Cider / Wine (1:1 fermentation, sealing 7 days)
	{ id: 'apple_cider', name: 'Apple Cider', category: 'fruit', source: 'Apple juice', sealingDays: 7, juicePerBatch: 50, abv: 6.0, distillRatio: 10 },
	{ id: 'cherry_cider', name: 'Cherry Cider', category: 'fruit', source: 'Cherry juice', sealingDays: 7, juicePerBatch: 50, abv: 6.2, distillRatio: 10 },
	{ id: 'lychee_cider', name: 'Lychee Cider', category: 'fruit', source: 'Lychee juice', sealingDays: 7, juicePerBatch: 50, abv: 6.5, distillRatio: 10 },

	// Honey / Mead (honey ferments 1:1, sealing 14 days for mead)
	{ id: 'mead', name: 'Mead', category: 'honey', source: 'Honey', sealingDays: 14, juicePerBatch: 50, abv: 8.0, distillRatio: 20 },

	// Grain ales: represented as water+flour batches. 50L water + 50 flour -> 10L ale (5:1)
	{ id: 'spelt_ale', name: 'Spelt Ale', category: 'grain', source: 'Spelt flour + Water', sealingDays: 14, inputWaterLiters: 50, inputFlourLiters: 50, juicePerBatch: 10, abv: 5.0, distillRatio: 20 },
	{ id: 'rice_ale', name: 'Rice / Sake', category: 'grain', source: 'Rice flour + Water', sealingDays: 14, inputWaterLiters: 50, inputFlourLiters: 50, juicePerBatch: 10, abv: 6.0, distillRatio: 20 },
	{ id: 'breadfruit_ale', name: 'Breadfruit Ale', category: 'fruit', source: 'Breadfruit juice', sealingDays: 7, juicePerBatch: 50, abv: 6.0, distillRatio: 10, note: 'Breadfruit ale behaves like fruit for sealing and ratios but provides grain nutrition in-game' }
];

if (typeof window !== 'undefined') window.alcohols = alcohols;
if (typeof module !== 'undefined' && module.exports) module.exports = alcohols;
