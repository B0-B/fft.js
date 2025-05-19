function sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function timestamp () {
    // Returns the current unix timestamp in ms.
    return Date.now(); 
}

async function runtime (func, args) {
    const digits = 2;
    const start = timestamp();
    await new Promise(resolve => {
        func(...args);
        resolve();  // Ensure it completes
    });
    const stop = timestamp();
    console.log(`runtime: ${Math.round(digits*(stop-start))/digits} ms`)
}