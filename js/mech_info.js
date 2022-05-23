async function loadMech() {
    let pageUrl = new URL(location.href);
    
    mechId = pageUrl.searchParams.get("mechId");

    const url = `http://localhost:5000/mech/${mechId}`;

    const httpResponse = await fetch(url);
    const body = await httpResponse.json();
}