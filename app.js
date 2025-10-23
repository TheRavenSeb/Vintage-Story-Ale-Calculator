// App script for index.html
// Reads `window.alcohols` dataset and renders selection, fermentation and barrel info.
(function () {
    const dataset = (typeof window !== 'undefined' && window.alcohols && window.alcohols.length) ? window.alcohols : [];

    // In Vintage Story a barrel can hold up to 50L
    const barrels = [
        { id: 'barrel50', name: 'Barrel (50L)', liters: 50 }
    ];

    const sel = document.getElementById('ale-select');
    const aleTbody = document.getElementById('ale-tbody');
    const barrelTbody = document.getElementById('barrel-tbody');
    if (!sel || !aleTbody || !barrelTbody) return;

    function formatDays(n){ return `${n.toFixed(1)} days`; }

    function populate() {
        sel.innerHTML = '';
        dataset.forEach((a, i) => {
            const o = document.createElement('option');
            o.value = a.id;
            o.textContent = a.name;
            if (i === 0) o.selected = true;
            sel.appendChild(o);
        });
    }

    // Ingredient input elements
    const berriesInput = document.getElementById('berries-input');
    const flourInput = document.getElementById('flour-input');
    const calcIngredientsBtn = document.getElementById('calc-ingredients');
    const ingredientResult = document.getElementById('ingredient-result');
    const flourGroup = document.getElementById('flour-group');
    const berriesGroup = document.getElementById('berries-group');

    // Conversion helpers (assumptions based on wiki/examples):
    // - Fruit juices are produced from a fruitpress; using an earlier assumption: 16 berries -> 5 L juice.
    // - Grain-based ale: 5L water + 5 flour -> 1L ale. If user supplies only flour liters, assume equal water available.
    function berriesToJuiceL(berriesCount) {
        return (berriesCount / 16) * 5;
    }

    function flourToJuiceL(flourLiters) {
        // flourLiters / 5 => juice liters (since 5 flour -> 1L ale assuming water paired)
        return flourLiters / 5;
    }

    function calcFromIngredients() {
        const berries = parseFloat(berriesInput && berriesInput.value) || 0;
        const flour = parseFloat(flourInput && flourInput.value) || 0;
        const selectedId = sel.value;
        const recipe = dataset.find(x => x.id === selectedId) || dataset[0];
        if (!recipe) return;

        // Compute juice from available ingredients
        const juiceFromBerries = berriesToJuiceL(berries);
        let juiceFromFlour = 0;
        if (flour > 0) {
            // assume equal water available for simplicity
            juiceFromFlour = flourToJuiceL(flour);
        }
        const totalJuice = juiceFromBerries + juiceFromFlour;

        // How many full recipe batches can this make?
        const batches = recipe.juicePerBatch > 0 ? Math.floor(totalJuice / recipe.juicePerBatch) : 0;
        const remainderJuice = totalJuice - (batches * recipe.juicePerBatch);

    // Fermentation time: use flat sealingDays (7 for fruit, 14 for grain) per wiki
    const sealingDays = recipe.sealingDays || (recipe.category === 'grain' ? 14 : 7);

    // Barrel fills for total juice (full 50L barrels only)
    const fullBarrels = Math.floor(totalJuice / 50);
    const remainderLiters = totalJuice - fullBarrels * 50;

        // Render a short summary
        ingredientResult.innerHTML = `
            <strong>Ingredient conversion</strong><br/>
            Juice from berries: ${juiceFromBerries.toFixed(2)} L<br/>
            Juice from flour: ${juiceFromFlour.toFixed(2)} L<br/>
            <strong>Total juice:</strong> ${totalJuice.toFixed(2)} L<br/>
            Full ${recipe.name} batches: ${batches}<br/>
            Remainder juice: ${remainderJuice.toFixed(2)} L<br/>
            Estimated sealing time: ${sealingDays} days (flat)<br/>
            <strong>Barrels (50L) filled from total juice:</strong><br/>
            Full 50L barrels: ${fullBarrels}<br/>
            Remainder liters: ${remainderLiters.toFixed(2)} L
        `;
    }

    if (calcIngredientsBtn) calcIngredientsBtn.addEventListener('click', calcFromIngredients);

    function renderInfo(a) {
        aleTbody.innerHTML = '';
        const addRow = (label, value) => {
            const tr = document.createElement('tr');
            const td1 = document.createElement('td'); td1.textContent = label;
            const td2 = document.createElement('td'); td2.textContent = value;
            tr.appendChild(td1); tr.appendChild(td2);
            aleTbody.appendChild(tr);
        };

        addRow('Name', a.name);
        addRow('Category', a.category);
        addRow('Source', a.source);
        addRow('Sealing time', `${a.sealingDays} days`);

        if (a.category === 'grain') {
            addRow('Water per batch', `${a.inputWaterLiters} L`);
            addRow('Flour per batch', `${a.inputFlourLiters} L`);
        }

    addRow('Juice (ale) per batch', `${a.juicePerBatch} L`);

    // Sealing time is flat per category per wiki: 7 days for fruit/breadfruit, 14 days for grain/mead
    const sealing = a.sealingDays || (a.category === 'grain' ? 14 : 7);
    addRow('Sealing time (flat)', `${sealing} days`);

        if (a.distillRatio) {
            const distilledPerBatch = a.juicePerBatch / a.distillRatio;
            addRow('Distillation ratio', `${a.distillRatio}:1 (fermented:distilled)`);
            addRow('Distilled output per batch', `${distilledPerBatch.toFixed(2)} L`);
        }
    }

    function renderBarrels(a) {
        barrelTbody.innerHTML = '';
        barrels.forEach(b => {
            const tr = document.createElement('tr');
            const tdName = document.createElement('td'); tdName.textContent = b.name;
            const tdSize = document.createElement('td'); tdSize.textContent = `${b.liters} L`;
            const filled = (a.juicePerBatch / b.liters) || 0;
            const tdFilled = document.createElement('td'); tdFilled.textContent = `${filled.toFixed(2)} barrels per batch`;
            tr.appendChild(tdName); tr.appendChild(tdSize); tr.appendChild(tdFilled);
            barrelTbody.appendChild(tr);
        });
    }

    sel.addEventListener('change', () => {
        const id = sel.value;
        const a = dataset.find(x => x.id === id) || dataset[0];
        if (!a) return;
    // show/hide flour input depending on category
    if (flourGroup) flourGroup.style.display = a.category === 'grain' ? '' : 'none';
    if (berriesGroup) berriesGroup.style.display = a.category === 'grain' ? 'none' : '';
        renderInfo(a);
        renderBarrels(a);
    });

    // init
    populate();
    if (dataset[0]) {
    // ensure flour/berries group visibility on init
    if (flourGroup) flourGroup.style.display = dataset[0].category === 'grain' ? '' : 'none';
    if (berriesGroup) berriesGroup.style.display = dataset[0].category === 'grain' ? 'none' : '';
        renderInfo(dataset[0]);
        renderBarrels(dataset[0]);
    }
})();
