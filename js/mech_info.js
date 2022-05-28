let pageUrl = new URL(location.href);
var mechId = pageUrl.searchParams.get("mechId");

var user;

var mech;

async function loadMech() {

    const url = `http://localhost:5000/mech/${mechId}`;

    const httpResponse = await fetch(url);
    mech = await httpResponse.json();

    document.getElementById('modelDisplay').innerHTML = mech.model;

    document.getElementById('makeDisplay').innerHTML = mech.make;

    document.getElementById('yearDisplay').innerHTML = mech.year;

    document.getElementById('colorDisplay').innerHTML = mech.color;

    document.getElementById('speedDisplay').innerHTML = `${mech.maxSpeed} km/h`

    document.getElementById('weightDisplay').innerHTML = `${mech.weight} kg`

    document.getElementById('heightDisplay').innerHTML = `${mech.height} m`

    document.getElementById('descriptionDisplay').innerHTML = mech.description

    const userUrl = 'http://localhost:5000/current_user';
    var userResponse = await fetch(userUrl);
    user = await userResponse.json();
    console.log(user);
    console.log(mech);

    displayButtons();

    displayRatings();
}

async function displayButtons() {

    let buttonDisplay = document.getElementById('buttonDisplay');
    if (user.id) {
        if (user.isAdmin) {
            let editLink = document.createElement('a');
            editLink.classList.add('btn', 'btn-primary', 'mx-2');
            editLink.setAttribute('href', `edit_mech.html?mechId=${mechId}`)
            editLink.innerHTML = 'Edit Mech';
            buttonDisplay.appendChild(editLink);
        }

        if (mech.available && user.isPilot) {
            let checkOutBtn = document.createElement('button');
            checkOutBtn.classList.add('btn', 'btn-success', 'mx-2');
            checkOutBtn.addEventListener('click', checkoutMech);
            checkOutBtn.innerHTML = 'Checkout Mech';
            buttonDisplay.appendChild(checkOutBtn);
        }

        if (mech.currentPilot == user.id) {
            let checkInBtn = document.createElement('button');
            checkInBtn.classList.add('btn', 'btn-warning', 'mx-2');
            checkInBtn.addEventListener('click', checkInMech);
            checkInBtn.innerHTML = 'Check In Mech'
            buttonDisplay.appendChild(checkInBtn);
        }
    }
}

async function displayRatings() {
    const ratingUrl = `http://localhost:5000/rating/1/${mechId}`;
    const ratingResponse = await fetch(ratingUrl);
    const ratingBody = await ratingResponse.json();

    let ratingElem = document.getElementById('ratings');
    ratingElem.innerHTML = '';

    console.log(ratingBody);

    if (user.id) {
        document.getElementById('ratingForm').classList.remove('d-none')
    }

    if (ratingBody.length == 0) {
        let noRatings = document.createElement('p');
        noRatings.classList.add("text-muted");
        noRatings.innerHTML = 'No Ratings Yet';
        ratingElem.appendChild(noRatings);
    } else {
        ratingBody.forEach(rating => {
            let row = document.createElement('div');
            row.classList.add('row', 'mb-1', 'border', 'rounded', 'p-2');
            let col1 = document.createElement('div');
            col1.classList.add('col-2', 'd-flex', 'align-items-start');
            let col2 = document.createElement('div');
            col2.classList.add('col', 'd-flex', 'align-items-center');
            
            row.appendChild(col1);
            row.appendChild(col2);

            // Generate the stars
            for (i = 0; i < 5 ; i++) {
                let icon = document.createElement('i');
                icon.classList.add('bi', 'fs-4')
                if (i < rating.Stars) {
                    icon.classList.add('bi-star-fill', 'text-success');
                } else {
                    icon.classList.add('bi-star');
                }
                col1.appendChild(icon);
            }
            col2.innerHTML = rating.Review;

            ratingElem.appendChild(row);
        });
    }
}

async function checkoutMech() {
    console.log('checking out mech...');

    let url = `http://localhost:5000/mech/checkout/${mechId}`;
    const httpResponse = await fetch(url, {method: 'PATCH'});

    if (httpResponse.status == 200) {
        location.reload();
    } else {
        alert('unable to checkout mech')
    }
}

async function checkInMech() {
    console.log('checking in mech...');

    let url = `http://localhost:5000/mech/checkin/${mechId}`
    const httpResponse = await fetch(url, {method: 'PATCH'});

    if (httpResponse.status == 200) {
        location.reload();
    } else {
        alert('unable to checkout mech')
    }
}

async function addRating() {
    starCount = parseInt(document.getElementById('starCount').value);
    review = document.getElementById('reviewInput').value;
    review = review.trim()

    if (review == "") {
        alert('Please Enter A Review')
    } else {
        const data = {
            'userId': user.id,
            'mechId': mechId,
            'stars': starCount,
            'review': review
        };
        const url = 'http://localhost:5000/rating'
        const httpResponse = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const body = await httpResponse.json();

        displayRatings();
    }
}