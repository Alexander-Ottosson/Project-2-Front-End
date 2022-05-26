let pageUrl = new URL(location.href);
mechId = pageUrl.searchParams.get("mechId");

makeElem = document.getElementById('makeInput');
modelElem = document.getElementById('modelInput');
yearElem = document.getElementById('yearInput');
colorElem = document.getElementById('colorInput');
maxSpeedElem = document.getElementById('maxSpeedInput');
weightElem = document.getElementById('weightInput');
heightElem = document.getElementById('heightInput');
descriptionElem = document.getElementById('descriptionInput');
pilotCountElem = document.getElementById('pilotCountInput');
availableElem = document.getElementById('availableCheck');
confidentialElem = document.getElementById('confidentialCheck');

async function getMech() {
    const url = `http://localhost:5000/mech/${mechId}`;

    const httpResponse = await fetch(url);
    const body = await httpResponse.json();

    console.log(body);

    makeElem.value = body.make;
    modelElem.value = body.model;
    yearElem.value = parseInt(body.year);
    colorElem.value = body.color;
    maxSpeedElem.value = body.maxSpeed;
    weightElem.value = body.weight;
    heightElem.value = body.height;
    descriptionElem.value = body.description;
    pilotCountElem.value = body.pilotCount;
    if (body.available) {
        availableElem.checked = true;
    }
    if (body.confidential) {
        confidentialElem.checked = true;
    }
}

async function editMech() {
    make = makeElem.value;
    model = modelElem.value;
    year = yearElem.value;
    color = colorElem.value;
    maxSpeed = maxSpeedElem.value;
    weight = weightElem.value;
    height = heightElem.value;
    description = descriptionElem.value;
    currentPilot = null;
    pilotCount = pilotCountElem.value;
    available = false;
    if (availableElem.checked) {
        available = true;
    }
    confidential = false;
    if (confidentialElem.checked) {
        confidential = true;
    }

    data = {
        'make': make,
        'model': model,
        'year': year,
        'color': color,
        'maxSpeed': maxSpeed,
        'weight': weight,
        'height': height,
        'description': description,
        'currentPilot': currentPilot,
        'pilotCount': pilotCount,
        'available': available,
        'confidential': confidential
    }

    const url = `http://localhost:5000/mech/${mechId}`;
    const httpResponse = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (httpResponse.status == 200) {
        location.href = `mech_info.html?mechId=${mechId}`
    } else {
        alert('Unable to edit mech data')
    }
}