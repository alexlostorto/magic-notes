async function fetchScript() {
    try {
        let response = await fetch('https://raw.githubusercontent.com/alexlostorto/sparx/main/release.json');
        let json = await response.json();

        let js = document.createElement("script");
        js.src = json.contentScript;
        js.async = false;
        js.defer = false;
        document.head.appendChild(js);
    } catch(err) {}
}

fetchScript();