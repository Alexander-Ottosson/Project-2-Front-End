async function registerMech() {
    make = document.getElementById('makeInput').value;
    model = document.getElementById('modelInput').value;
    year = (document.getElementById('yearInput').value).toString();
    color = document.getElementById('colorInput').value;
    maxSpeed = document.getElementById('maxSpeedInput').value;
    weight = document.getElementById('weightInput').value;
    height = document.getElementById('heightInput').value;
    description = document.getElementById('descriptionInput').value;
    currentPilot = null;
    pilotCount = document.getElementById('pilotCountInput').value;
    availableBox = document.getElementById('availableCheck');
    available = false;
    if (availableBox.checked) {
        available = true;
    }
    confidentialBox = document.getElementById('confidentialCheck');
    confidential = false;
    if (confidentialBox.checked) {
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

    const url = 'http://localhost:5000/mech';
    const httpResponse = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (httpResponse.status == 200) {
        body = await httpResponse.json();
        location.href = `mech_info.html?mechId=${body.id}`
    } else {
        alert('Could not create mech')
    }
}