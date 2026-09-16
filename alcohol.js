// Values verified against the Vintage Story Wiki Alcohol brewing page (1.21.5).
// Exposes `window.alcohols` for browser usage and exports for CommonJS.

const alcohols = [
    { id: 'mead', name: 'Mead', category: 'honey', source: 'Honey', inputType: 'honey', outputPerBatch: 50, inputLiquidPerBatch: 50, sealingDays: 14, distillRatio: 20, nutrition: 'Fruit', note: 'Honey ferments at a 1:1 ratio.' },
    { id: 'apple_cider', name: 'Apple Cider', category: 'fruit', source: 'Apple juice', inputType: 'fruit', outputPerBatch: 50, inputLiquidPerBatch: 50, sealingDays: 7, distillRatio: 10, nutrition: 'Fruit' },
    { id: 'cherry_cider', name: 'Cherry Cider', category: 'fruit', source: 'Cherry juice', inputType: 'fruit', outputPerBatch: 50, inputLiquidPerBatch: 50, sealingDays: 7, distillRatio: 10, nutrition: 'Fruit' },
    { id: 'peach_cider', name: 'Peach Cider', category: 'fruit', source: 'Peach juice', inputType: 'fruit', outputPerBatch: 50, inputLiquidPerBatch: 50, sealingDays: 7, distillRatio: 10, nutrition: 'Fruit' },
    { id: 'orange_cider', name: 'Orange Cider', category: 'fruit', source: 'Orange juice', inputType: 'fruit', outputPerBatch: 50, inputLiquidPerBatch: 50, sealingDays: 7, distillRatio: 10, nutrition: 'Fruit' },
    { id: 'mango_cider', name: 'Mango Cider', category: 'fruit', source: 'Mango juice', inputType: 'fruit', outputPerBatch: 50, inputLiquidPerBatch: 50, sealingDays: 7, distillRatio: 10, nutrition: 'Fruit' },
    { id: 'lychee_cider', name: 'Lychee Cider', category: 'fruit', source: 'Lychee juice', inputType: 'fruit', outputPerBatch: 50, inputLiquidPerBatch: 50, sealingDays: 7, distillRatio: 10, nutrition: 'Fruit' },
    { id: 'grenadine', name: 'Grenadine', category: 'fruit', source: 'Pomegranate juice', inputType: 'fruit', outputPerBatch: 50, inputLiquidPerBatch: 50, sealingDays: 7, distillRatio: 10, nutrition: 'Fruit' },
    { id: 'perry', name: 'Perry', category: 'fruit', source: 'Pear juice', inputType: 'fruit', outputPerBatch: 50, inputLiquidPerBatch: 50, sealingDays: 7, distillRatio: 10, nutrition: 'Fruit' },
    { id: 'blueberry_wine', name: 'Blueberry Wine', category: 'fruit', source: 'Blueberry juice', inputType: 'fruit', outputPerBatch: 50, inputLiquidPerBatch: 50, sealingDays: 7, distillRatio: 10, nutrition: 'Fruit' },
    { id: 'cranberry_wine', name: 'Cranberry Wine', category: 'fruit', source: 'Cranberry juice', inputType: 'fruit', outputPerBatch: 50, inputLiquidPerBatch: 50, sealingDays: 7, distillRatio: 10, nutrition: 'Fruit' },
    { id: 'red_currant_wine', name: 'Red Currant Wine', category: 'fruit', source: 'Red currant juice', inputType: 'fruit', outputPerBatch: 50, inputLiquidPerBatch: 50, sealingDays: 7, distillRatio: 10, nutrition: 'Fruit' },
    { id: 'white_currant_wine', name: 'White Currant Wine', category: 'fruit', source: 'White currant juice', inputType: 'fruit', outputPerBatch: 50, inputLiquidPerBatch: 50, sealingDays: 7, distillRatio: 10, nutrition: 'Fruit' },
    { id: 'black_currant_wine', name: 'Black Currant Wine', category: 'fruit', source: 'Black currant juice', inputType: 'fruit', outputPerBatch: 50, inputLiquidPerBatch: 50, sealingDays: 7, distillRatio: 10, nutrition: 'Fruit' },
    { id: 'saguaro_wine', name: 'Saguaro Wine', category: 'fruit', source: 'Saguaro juice', inputType: 'fruit', outputPerBatch: 50, inputLiquidPerBatch: 50, sealingDays: 7, distillRatio: 10, nutrition: 'Fruit' },
    { id: 'pineapple_wine', name: 'Pineapple Wine', category: 'fruit', source: 'Pineapple juice', inputType: 'fruit', outputPerBatch: 50, inputLiquidPerBatch: 50, sealingDays: 7, distillRatio: 10, nutrition: 'Fruit' },
    { id: 'breadfruit_ale', name: 'Breadfruit Ale', category: 'fruit', source: 'Breadfruit juice', inputType: 'fruit', outputPerBatch: 50, inputLiquidPerBatch: 50, sealingDays: 7, distillRatio: 10, nutrition: 'Grain', note: 'Breadfruit uses fruit ratios and timing but provides grain nutrition.' },
    { id: 'spelt_ale', name: 'Spelt Ale', category: 'grain', source: 'Spelt flour + Water', inputType: 'grain', outputPerBatch: 10, inputWaterPerBatch: 50, inputFlourPerBatch: 50, inputLiquidPerBatch: 50, sealingDays: 14, distillRatio: 20, nutrition: 'Grain' },
    { id: 'rice_ale', name: 'Sake / Rice Ale', category: 'grain', source: 'Rice flour + Water', inputType: 'grain', outputPerBatch: 10, inputWaterPerBatch: 50, inputFlourPerBatch: 50, inputLiquidPerBatch: 50, sealingDays: 14, distillRatio: 20, nutrition: 'Grain' },
    { id: 'rye_ale', name: 'Rye Ale', category: 'grain', source: 'Rye flour + Water', inputType: 'grain', outputPerBatch: 10, inputWaterPerBatch: 50, inputFlourPerBatch: 50, inputLiquidPerBatch: 50, sealingDays: 14, distillRatio: 20, nutrition: 'Grain' },
    { id: 'amaranth_ale', name: 'Amaranth Ale', category: 'grain', source: 'Amaranth flour + Water', inputType: 'grain', outputPerBatch: 10, inputWaterPerBatch: 50, inputFlourPerBatch: 50, inputLiquidPerBatch: 50, sealingDays: 14, distillRatio: 20, nutrition: 'Grain' },
    { id: 'cassava_ale', name: 'Cassava Ale', category: 'grain', source: 'Cassava flour + Water', inputType: 'grain', outputPerBatch: 10, inputWaterPerBatch: 50, inputFlourPerBatch: 50, inputLiquidPerBatch: 50, sealingDays: 14, distillRatio: 20, nutrition: 'Grain' }
];

// Starting-product conversions from the Vintage Story Wiki (1.21.5).
const inputRules = {
    fruit: { inputLabel: 'Fruit', inputUnit: 'items', liquidPerInput: 5 / 16,  inputDetail: '16 fruit makes 5 L juice', defaultInput: 160 },
    honey: { inputLabel: 'Honeycombs', inputUnit: 'items', liquidPerInput: 1 / 5,  inputDetail: '5 honeycombs make 1 L honey', defaultInput: 250 },
    grain: { inputLabel: 'Flour', inputUnit: 'items', liquidPerInput: 1,  inputDetail: '5 flour and 5 L water make 1 L ale', defaultInput: 50 }
};

const ingredientImages = {
    'Apple juice': 'fruit/Fruit-redapple.png',
    'Cherry juice': 'fruit/Fruit-cherry.png',
    'Peach juice': 'fruit/Fruit-peach.png',
    'Orange juice': 'fruit/Fruit-orange.png',
    'Mango juice': 'fruit/Fruit-mango.png',
    'Lychee juice': 'fruit/Fruit-lychee.png',
    'Pomegranate juice': 'fruit/Fruit-pomegranate.png',
    'Pear juice': 'fruit/Fruit-pear.png',
    'Blueberry juice': 'fruit/Fruit-blueberry.png',
    'Cranberry juice': 'fruit/Fruit-cranberry.png',
    'Red currant juice': 'fruit/Fruit-redcurrant.png',
    'White currant juice': 'fruit/Fruit-whitecurrant.png',
    'Black currant juice': 'fruit/Fruit-blackcurrant.png',
    'Saguaro juice': 'fruit/Fruit-saguaro.png',
    'Pineapple juice': 'fruit/Fruit-pineapple.png',
    'Breadfruit juice': 'fruit/Fruit-breadfruit.png',
    'Spelt flour + Water': 'grain/Grain-spelt.png',
    'Rice flour + Water': 'grain/Grain-rice.png',
    'Rye flour + Water': 'grain/Grain-rye.png',
    'Amaranth flour + Water': 'grain/Grain-amaranth.png',
    'Cassava flour + Water': 'grain/Grain-cassava.png'
};

alcohols.forEach(recipe => {
    Object.assign(recipe, inputRules[recipe.inputType]);
    recipe.inputImage = recipe.inputType === 'honey' ? 'Honeycomb.png' : ingredientImages[recipe.source];
    if (recipe.inputType === 'fruit') recipe.inputLabel = recipe.source.replace(/ juice$/, '');
    if (recipe.inputType === 'grain') recipe.inputLabel = recipe.source.split(' + ')[0];
});

if (typeof window !== 'undefined') window.alcohols = alcohols;
if (typeof module !== 'undefined' && module.exports) module.exports = alcohols;
