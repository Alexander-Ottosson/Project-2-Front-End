async function loadMechs() {
    const url = 'http://localhost:7000/mech';
    const httpResponse = await fetch(url);
    const body = await httpResponse.json();

    console.log(body);

    display = document.getElementById('mechDisplay');

    body.forEach(mech => {
        col = document.createElement('div');
        col.classList.add('col', 'text-center');

        card = document.createElement('div');
        card.classList.add('card', 'mb-3');
        col.appendChild(card);

        cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        card.appendChild(cardBody);

        cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.innerHTML = mech.model;
        cardBody.appendChild(cardTitle);

        cardText = document.createElement('p');
        cardText.classList.add('card-text');
        if (mech.des.length > 100) {
            description = mech.des.slice(0, 100) + '...';
        } else {
            description = mech.des;
        }
        cardText.innerHTML = description;
        cardBody.appendChild(cardText);

        mechLink = document.createElement('a');
        mechLink.classList.add('btn', 'btn-primary');
        mechLink.setAttribute('href', `mech_info.html?mechId=${mech.mechId}`);
        mechLink.innerHTML = 'View Mech'
        cardBody.appendChild(mechLink);

        display.appendChild(col)
        
    });
}