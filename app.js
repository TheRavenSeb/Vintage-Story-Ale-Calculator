// App script for index.html. All calculations run locally in the browser.
(function () {
    const dataset = window.alcohols || [];
    const select = document.getElementById('ale-select');
    const inputAmount = document.getElementById('input-amount');
    const recipeOptions = document.getElementById('recipe-options');
    if (!select || !inputAmount || !dataset.length) return;

    const $ = id => document.getElementById(id);
    const themeSelect = $('theme-select');
    const shareButton = $('share-setup');
    const shareStatus = $('share-status');
    const whole = value => Math.ceil(value);
    const liters = value => `${value.toFixed(1).replace('.0', '')} L`;
    const item = value => `${whole(value).toLocaleString()} ${whole(value) === 1 ? 'item' : 'items'}`;
    let hasUserInput = false;

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
        if (params.get('input')) {
            inputAmount.value = Math.max(0, Number(params.get('input')) || 0);
            hasUserInput = true;
        }
    }

    function setTheme(theme) {
        const validThemes = ['moss', 'forge', 'fire', 'clay'];
        const selectedTheme = validThemes.includes(theme) ? theme : 'moss';
        document.documentElement.setAttribute('data-theme', selectedTheme);
        document.documentElement.dataset.theme = selectedTheme;
        if (themeSelect) themeSelect.value = selectedTheme;
        try {
            localStorage.setItem('brew-barrel-theme', selectedTheme);
        } catch {
            // Theme switching still works when storage is blocked.
        }
    }

    async function shareSetup() {
        const url = new URL(window.location.href);
        url.search = new URLSearchParams({ recipe: select.value, input: inputAmount.value }).toString();
        try {
            await navigator.clipboard.writeText(url.toString());
            if (shareStatus) shareStatus.textContent = 'Setup link copied.';
        } catch {
            window.history.replaceState({}, '', url);
            if (shareStatus) shareStatus.textContent = 'Setup link ready in the address bar.';
        }
    }

    function getPlan(recipe, startingProduct) {
        const liquidInput = startingProduct * recipe.liquidPerInput;
        const fullBarrels = Math.floor(liquidInput / 50);
        const partialLiquid = liquidInput - fullBarrels * 50;
        const output = liquidInput * recipe.outputPerBatch / 50;
        const distilled = output / recipe.distillRatio;
        return {
            startingProduct,
            liquidInput,
            fullBarrels,
            partialLiquid: partialLiquid < 0.0001 ? 0 : partialLiquid,
            barrels: fullBarrels + (partialLiquid > 0.0001 ? 1 : 0),
            output,
            distilled,
            aquaVitae: distilled / 2,
            distillationSeconds: output * 20
        };
    }

    function addResource(image, name, amount, detail, fallbackIcon = '•') {
        const card = document.createElement('div');
        card.className = 'resource';
        const icon = document.createElement('span');
        icon.className = 'resource-icon';
        icon.setAttribute('aria-hidden', 'true');
        if (image) {
            const imageElement = document.createElement('img');
            imageElement.src = `./images/${image}`;
            imageElement.alt = '';
            imageElement.addEventListener('error', () => {
                icon.textContent = fallbackIcon;
            }, { once: true });
            icon.appendChild(imageElement);
        } else {
            icon.textContent = fallbackIcon;
        }
        const main = document.createElement('div');
        main.className = 'resource-main';
        main.innerHTML = `<strong>${amount}</strong><span>${name}</span>`;
        const resourceDetail = document.createElement('small');
        resourceDetail.className = 'resource-detail';
        resourceDetail.textContent = detail;
        card.append(icon, main, resourceDetail);
        $('resource-list').appendChild(card);
    }

    function formatDuration(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.round(seconds % 60);
        return `${minutes}m ${remainingSeconds}s`;
    }

    function render(recipe) {
        const startingProduct = Math.max(0, Number(inputAmount.value) || 0);
        const plan = getPlan(recipe, startingProduct);
        const partialBarrel = plan.partialLiquid ? ` + ${liters(plan.partialLiquid)} partial` : '';

        $('recipe-hint').textContent = `${recipe.source} · ${recipe.outputPerBatch} L output per full barrel · ${recipe.sealingDays} days sealed`;
        $('amount-label').textContent = `Starting ${recipe.inputLabel.toLowerCase()}`;
        $('amount-help').textContent = `Produces ${liters(recipe.liquidPerInput)} liquid per ${recipe.inputUnit === 'items' ? 'item' : recipe.inputUnit}`;
        $('input-unit').textContent = recipe.inputUnit;
        $('summary-output').textContent = liters(plan.output);
        $('summary-barrels').textContent = plan.fullBarrels.toLocaleString();
        $('summary-partial').textContent = plan.partialLiquid ? liters(plan.partialLiquid) : 'None';
        $('summary-time').textContent = `${recipe.sealingDays}d`;
        $('summary-input').textContent = liters(plan.liquidInput);
        $('timeline-total').textContent = `${recipe.sealingDays}d sealing`;

        const resourceList = $('resource-list');
        resourceList.innerHTML = '';
        if (recipe.inputType === 'fruit') {
            addResource(recipe.inputImage, 'Fruit to press', item(plan.startingProduct), recipe.inputDetail, recipe.inputIcon);
            addResource('Barrel.png', 'Fruit juice', liters(plan.liquidInput), 'Ferment in a barrel', '🛢️');
        } else if (recipe.inputType === 'honey') {
            addResource(recipe.inputImage, 'Honeycombs', item(plan.startingProduct), recipe.inputDetail, recipe.inputIcon);
            addResource('Honeyportion.png', 'Honey', liters(plan.liquidInput), 'Ferment in a barrel', '🍯');
        } else {
            addResource(recipe.inputImage, recipe.source.split(' + ')[0], item(plan.startingProduct), recipe.inputDetail, recipe.inputIcon);
            addResource('Water.png', 'Water', liters(plan.liquidInput), '5 L water per 5 flour', '💧');
        }
        addResource('Barrel.png', 'Barrels', item(plan.barrels), `${plan.fullBarrels} full 50 L${partialBarrel}`, '🛢️');

        $('timeline').innerHTML = `
            <div class="timeline-step"><span>01</span><div><strong>Prepare the ingredients</strong><p>${recipe.inputType === 'fruit' ? 'Press the fruit into juice.' : recipe.inputType === 'honey' ? 'Squeeze honeycombs into honey.' : 'Combine flour and water in the barrel.'}</p></div><time>now</time></div>
            <div class="timeline-step"><span>02</span><div><strong>Seal ${plan.barrels} ${plan.barrels === 1 ? 'barrel' : 'barrels'}</strong><p>Leave the ${recipe.name.toLowerCase()} sealed until fermentation is complete.</p></div><time>${recipe.sealingDays}d</time></div>
            <div class="timeline-step"><span>03</span><div><strong>Enjoy your ${recipe.name.toLowerCase()}</strong><p>${plan.fullBarrels} full 50 L barrel${plan.fullBarrels === 1 ? '' : 's'}${plan.partialLiquid ? ` and one ${liters(plan.partialLiquid)} partial barrel` : ''} produce ${liters(plan.output)}. Fermented alcohol provides 80 satiety per liter.</p></div><time>ready</time></div>
            <div class="timeline-step optional"><span>04</span><div><strong>Optional: distill</strong><p>${liters(plan.output)} fermented alcohol becomes ${liters(plan.distilled)} distilled alcohol.</p></div><time>${formatDuration(plan.distillationSeconds)}</time></div>`;

        $('brew-notes').innerHTML = `
            <div class="note-row"><strong>Distillation</strong><span>${recipe.distillRatio}:1 fermented to distilled · 20 seconds per liter of input</span></div>
            <div class="note-row"><strong>Second distillation</strong><span>${liters(plan.distilled)} distilled alcohol becomes ${liters(plan.aquaVitae)} aqua vitae at a 2:1 ratio.</span></div>
            <div class="note-row"><strong>Nutrition</strong><span>${recipe.nutrition} nutrition · ${recipe.note || 'Fermented alcohol provides 80 satiety per liter and lasts 140 days.'}</span></div>`;
    }

    populateRecipes();
    loadSetupFromUrl();
    let savedTheme = 'moss';
    try {
        savedTheme = localStorage.getItem('brew-barrel-theme') || 'moss';
    } catch {
        // Use the default theme when storage is blocked.
    }
    setTheme(savedTheme);
    const update = () => {
        const recipe = dataset.find(item => item.id === select.value) || dataset[0];
        if (!hasUserInput) inputAmount.value = recipe.defaultInput;
        render(recipe);
    };
    select.addEventListener('change', update);
    inputAmount.addEventListener('input', () => {
        hasUserInput = true;
        update();
    });
    if (themeSelect) themeSelect.addEventListener('change', event => setTheme(event.target.value));
    if (shareButton) shareButton.addEventListener('click', shareSetup);
    update();
})();
