let pageUrl = new URL(location.href);
mechId = pageUrl.searchParams.get("mechId");

var user;

async function loadMech() {


    const url = `http://localhost:5000/mech/${mechId}`;

    const httpResponse = await fetch(url);
    const body = await httpResponse.json();

    document.getElementById('modelDisplay').innerHTML = body.model;

    document.getElementById('makeDisplay').innerHTML = body.make;

    document.getElementById('yearDisplay').innerHTML = body.year;

    document.getElementById('colorDisplay').innerHTML = body.color;

    document.getElementById('speedDisplay').innerHTML = `${body.maxSpeed} km/h`

    document.getElementById('weightDisplay').innerHTML = `${body.weight} kg`

    document.getElementById('heightDisplay').innerHTML = `${body.height} m`

    document.getElementById('descriptionDisplay').innerHTML = body.description

    const userUrl = 'http://localhost:5000/current_user';
    const userResponse = await fetch(userUrl);
    
    if (userResponse.status = 200) {
        user = await userResponse.json();
        console.log(user);
        document.getElementById('ratingForm').classList.remove('d-none')
        if (user.isAdmin) {
            document.getElementById('buttonDisplay').innerHTML = `<a href="edit_mech.html?mechId=${body.id}" class="btn btn-primary">Edit Mech</a>`;
        }
    }

    displayRatings();
}

async function displayRatings() {
    const ratingUrl = `http://localhost:5000/rating/1/${mechId}`;
    const ratingResponse = await fetch(ratingUrl);
    const ratingBody = await ratingResponse.json();

    let ratingElem = document.getElementById('ratings');
    ratingElem.innerHTML = '';

    console.log(ratingBody);

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