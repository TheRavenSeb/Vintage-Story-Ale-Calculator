// App script for index.html. All calculations run locally in the browser.
(function () {
    const dataset = window.alcohols || [];
    const select = document.getElementById('ale-select');
    const targetInput = document.getElementById('target-output');
    const recipeOptions = document.getElementById('recipe-options');
    if (!select || !targetInput || !dataset.length) return;

    const $ = id => document.getElementById(id);
    const themeSelect = $('theme-select');
    const shareButton = $('share-setup');
    const shareStatus = $('share-status');
    const whole = value => Math.ceil(value);
    const liters = value => `${value.toFixed(1).replace('.0', '')} L`;
    const item = value => `${whole(value).toLocaleString()} ${whole(value) === 1 ? 'item' : 'items'}`;

    function populateRecipes() {
        dataset.forEach((recipe, index) => {
            const option = document.createElement('option');
            option.value = recipe.id;
            option.textContent = recipe.name;
            option.selected = index === 0;
            select.appendChild(option);

            const choice = document.createElement('label');
            choice.className = 'recipe-option';
            choice.innerHTML = `<input type="radio" name="recipe-choice" value="${recipe.id}"${index === 0 ? ' checked' : ''}><span><strong>${recipe.name}</strong><small>${recipe.category} · ${recipe.outputPerBatch} L</small></span>`;
            const radio = choice.querySelector('input');
            radio.addEventListener('change', () => {
                select.value = radio.value;
                select.dispatchEvent(new Event('change', { bubbles: true }));
            });
            recipeOptions.appendChild(choice);
        });
    }

    function loadSetupFromUrl() {
        const params = new URLSearchParams(window.location.search);
        if (dataset.some(recipe => recipe.id === params.get('recipe'))) {
            select.value = params.get('recipe');
            const radio = recipeOptions.querySelector(`input[value="${select.value}"]`);
            if (radio) radio.checked = true;
        }
        if (params.get('output')) targetInput.value = Math.max(1, Number(params.get('output')) || 50);
    }

    function setTheme(theme) {
        const validThemes = ['moss', 'forge', 'fire', 'clay'];
        const selectedTheme = validThemes.includes(theme) ? theme : 'moss';
        document.documentElement.dataset.theme = selectedTheme;
        if (themeSelect) themeSelect.value = selectedTheme;
        localStorage.setItem('brew-barrel-theme', selectedTheme);
    }

    async function shareSetup() {
        const url = new URL(window.location.href);
        url.search = new URLSearchParams({ recipe: select.value, output: targetInput.value }).toString();
        try {
            await navigator.clipboard.writeText(url.toString());
            if (shareStatus) shareStatus.textContent = 'Setup link copied.';
        } catch {
            window.history.replaceState({}, '', url);
            if (shareStatus) shareStatus.textContent = 'Setup link ready in the address bar.';
        }
    }

    function getPlan(recipe, requestedOutput) {
        const batches = Math.max(1, whole(requestedOutput / recipe.outputPerBatch));
        const output = batches * recipe.outputPerBatch;
        const liquidInput = batches * recipe.inputLiquidPerBatch;
        const distilled = output / recipe.distillRatio;
        return { batches, output, liquidInput, distilled, aquaVitae: distilled / 2, distillationSeconds: output * 20 };
    }

    function addResource(icon, name, amount, detail) {
        const card = document.createElement('div');
        card.className = 'resource';
        card.innerHTML = `<span class="resource-icon" aria-hidden="true">${icon}</span><div class="resource-main"><strong>${amount}</strong><span>${name}</span></div><small class="resource-detail">${detail}</small>`;
        $('resource-list').appendChild(card);
    }

    function formatDuration(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.round(seconds % 60);
        return `${minutes}m ${remainingSeconds}s`;
    }

    function render(recipe) {
        const requestedOutput = Math.max(1, Number(targetInput.value) || recipe.outputPerBatch);
        const plan = getPlan(recipe, requestedOutput);
        const inputBarrels = whole(plan.liquidInput / 50);
        const fruitNeeded = plan.liquidInput / 5 * 16;
        const honeycombsNeeded = plan.liquidInput * 5;

        $('recipe-hint').textContent = `${recipe.source} · ${recipe.outputPerBatch} L output per full barrel · ${recipe.sealingDays} days sealed`;
        $('summary-output').textContent = liters(plan.output);
        $('summary-barrels').textContent = `${plan.batches}`;
        $('summary-time').textContent = `${recipe.sealingDays}d`;
        $('summary-input').textContent = liters(plan.liquidInput);
        $('timeline-total').textContent = `${recipe.sealingDays}d sealing`;

        const resourceList = $('resource-list');
        resourceList.innerHTML = '';
        if (recipe.inputType === 'fruit') {
            addResource('🍎', 'Fruit to press', item(fruitNeeded), '16 fruit makes 5 L juice');
            addResource('🪣', 'Fruit juice', liters(plan.liquidInput), 'Ferment in a barrel');
        } else if (recipe.inputType === 'honey') {
            addResource('🍯', 'Honeycombs', item(honeycombsNeeded), '5 honeycombs make 1 L honey');
            addResource('🪣', 'Honey', liters(plan.liquidInput), 'Ferment in a barrel');
        } else {
            addResource('🌾', recipe.source.split(' + ')[0], item(plan.batches * recipe.inputFlourPerBatch), '5 flour per 1 L ale');
            addResource('💧', 'Water', liters(plan.batches * recipe.inputWaterPerBatch), '5 L water per 1 L ale');
        }
        addResource('🛢️', 'Barrels', item(inputBarrels), '50 L maximum per barrel');

        $('timeline').innerHTML = `
            <div class="timeline-step"><span>01</span><div><strong>Prepare the ingredients</strong><p>${recipe.inputType === 'fruit' ? 'Press the fruit into juice.' : recipe.inputType === 'honey' ? 'Squeeze honeycombs into honey.' : 'Combine flour and water in the barrel.'}</p></div><time>now</time></div>
            <div class="timeline-step"><span>02</span><div><strong>Seal ${plan.batches} ${plan.batches === 1 ? 'barrel' : 'barrels'}</strong><p>Leave the ${recipe.name.toLowerCase()} sealed until fermentation is complete.</p></div><time>${recipe.sealingDays}d</time></div>
            <div class="timeline-step"><span>03</span><div><strong>Enjoy your ${recipe.name.toLowerCase()}</strong><p>${recipe.outputPerBatch === 50 ? 'Each full barrel produces 50 L.' : `Each full barrel produces ${recipe.outputPerBatch} L.`} Fermented alcohol provides 80 satiety per liter.</p></div><time>ready</time></div>
            <div class="timeline-step optional"><span>04</span><div><strong>Optional: distill</strong><p>${liters(plan.output)} fermented alcohol becomes ${liters(plan.distilled)} distilled alcohol.</p></div><time>${formatDuration(plan.distillationSeconds)}</time></div>`;

        $('brew-notes').innerHTML = `
            <div class="note-row"><strong>Distillation</strong><span>${recipe.distillRatio}:1 fermented to distilled · 20 seconds per liter of input</span></div>
            <div class="note-row"><strong>Second distillation</strong><span>${liters(plan.distilled)} distilled alcohol becomes ${liters(plan.aquaVitae)} aqua vitae at a 2:1 ratio.</span></div>
            <div class="note-row"><strong>Nutrition</strong><span>${recipe.nutrition} nutrition · ${recipe.note || 'Fermented alcohol provides 80 satiety per liter and lasts 140 days.'}</span></div>`;
    }

    populateRecipes();
    loadSetupFromUrl();
    setTheme(localStorage.getItem('brew-barrel-theme') || 'moss');
    const update = () => render(dataset.find(recipe => recipe.id === select.value) || dataset[0]);
    select.addEventListener('change', update);
    targetInput.addEventListener('input', update);
    if (themeSelect) themeSelect.addEventListener('change', event => setTheme(event.target.value));
    if (shareButton) shareButton.addEventListener('click', shareSetup);
    update();
})();
