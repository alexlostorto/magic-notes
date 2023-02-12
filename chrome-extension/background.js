console.log("Working");

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get(['sparxCodes'], function(database) {
        if (typeof database === 'undefined') {
            console.log(JSON.stringify(database));
            console.log("Database is undefined");
            database = {"sparxCodes": {}};
            chrome.storage.sync.set({ database });
        } else {
            console.log(JSON.stringify(database));
            console.log("Database is defined");
        }
    });
})

// chrome.storage.onChanged.addListener(function (changes, namespace) {
//     for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
//       console.log(
//         `Storage key "${key}" in namespace "${namespace}" changed.`,
//         `Old value was "${JSON.stringify(oldValue)}", new value is "${JSON.stringify(newValue)}".`
//       );
//     }
// });
