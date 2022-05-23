function searchMechs() {
    // alert("Mechs are being searched")

    loadMechs();
}

async function loadMechs() {
    let url = new URL(`http://localhost:5000/mech`);

    onlyAvailable = document.getElementById('onlyAvailable');

    if (onlyAvailable.checked) {
        url.searchParams.append("onlyAvailable", true);
    }

    searchTerm = document.getElementById('searchInput').value;

    if (searchTerm) {
        url.searchParams.append("searchTerm", searchTerm);
    }

    console.log(url.toString());

    const httpResponse = await fetch(url.toString())
    const body = await httpResponse.json()

    
    console.log(body)
    
    let tableElement = document.getElementById("mechTableBody")
    tableElement.innerHTML = "";

    body.forEach(mech => {
        //Create a new tr and put it into my tbody ("table")
        let mechRow = document.createElement("tr")
        tableElement.appendChild(mechRow)

        let Data = document.createElement("td")
        Data.innerHTML = mech.m_id
        mechRow.appendChild(Data);
        
        let Data5 = document.createElement("td")
        Data5.innerHTML = mech.make
        mechRow.appendChild(Data5);

        let Data2 = document.createElement("td")
        Data2.innerHTML = mech.model
        mechRow.appendChild(Data2);
        
        let Data7 = document.createElement("td")
        Data7.innerHTML = mech.year
        mechRow.appendChild(Data7);

        let Data3 = document.createElement("td")
        Data3.innerHTML = mech.color
        mechRow.appendChild(Data3);

        let Data8 = document.createElement("td")
        Data8.innerHTML = mech.supervisor
        mechRow.appendChild(Data8);

        let Data4 = document.createElement("td")
        Data4.innerHTML = mech.maxSpeed
        mechRow.appendChild(Data4);

        let Data6 = document.createElement("td")
        Data6.innerHTML = mech.weight
        mechRow.appendChild(Data6);

        let Data9 = document.createElement("td")
        Data9.innerHTML = mech.height
        mechRow.appendChild(Data9);

        let Data10 = document.createElement("td")
        Data10.innerHTML = mech.description
        mechRow.appendChild(Data10);

        let Data11 = document.createElement("td")
        Data11.innerHTML = mech.currentPilot
        mechRow.appendChild(Data11);

        let Data12 = document.createElement("td")
        Data12.innerHTML = mech.pilotCount
        mechRow.appendChild(Data12);

        let Data13 = document.createElement("td")
        Data13.innerHTML = mech.available
        mechRow.appendChild(Data13);

        let Data14 = document.createElement("td")
        Data14.innerHTML = mech.confidential
        mechRow.appendChild(Data14);
    });
}