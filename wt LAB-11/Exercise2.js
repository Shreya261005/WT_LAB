const fs = require('fs');

// 1. Create & Write File
fs.writeFile('sample.txt', 'Hello, this is the initial content.\n', (err) => {
    if (err) {
        console.log('Error creating file:', err);
        return;
    }
    console.log('File created and written successfully.');

    // 2. Read File
    fs.readFile('sample.txt', 'utf8', (err, data) => {
        if (err) {
            console.log('Error reading file:', err);
            return;
        }
        console.log('File content:\n', data);

        // 3. Append Data
        fs.appendFile('sample.txt', 'This is appended content.\n', (err) => {
            if (err) {
                console.log('Error appending file:', err);
                return;
            }
            console.log('Data appended successfully.');

            // 4. Read Again After Append
            fs.readFile('sample.txt', 'utf8', (err, updatedData) => {
                if (err) {
                    console.log('Error reading updated file:', err);
                    return;
                }
                console.log('Updated File content:\n', updatedData);

                // 5. Delete File
                fs.unlink('sample.txt', (err) => {
                    if (err) {
                        console.log('Error deleting file:', err);
                        return;
                    }
                    console.log('File deleted successfully.');
                });
            });
        });
    });
});