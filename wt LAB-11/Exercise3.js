const EventEmitter = require('events');

// Create event emitter object
const emitter = new EventEmitter();

// 1. Register Listener 1
emitter.on('greet', (name) => {
    console.log(`Hello, ${name}! Welcome.`);
});

// 2. Register Listener 2 (multiple listeners for same event)
emitter.on('greet', (name) => {
    console.log(`How are you, ${name}?`);
});

// 3. Register another event
emitter.on('status', (code, msg) => {
    console.log(`Status Code: ${code}, Message: ${msg}`);
});

// 4. Trigger events using emit()
console.log("Triggering greet event...");
emitter.emit('greet', 'Shreya');

console.log("\nTriggering status event...");
emitter.emit('status', 200, 'Success');

// 5. Demonstrate async behavior
setTimeout(() => {
    console.log("\nAsync Event Triggered after 2 seconds...");
    emitter.emit('greet', 'Async User');
}, 2000);