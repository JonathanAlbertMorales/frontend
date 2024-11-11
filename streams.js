const { Readable } = require('stream');

// Example readable stream, replace this with your own readable stream
const readableStream = new Readable({
  read() {
    this.push('Hello, ');
    this.push('world!');
    this.push(null); // No more data
  }
});

async function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    
    stream.on('data', chunk => {
      chunks.push(chunk);
    });

    stream.on('end', () => {
      resolve(Buffer.concat(chunks));
    });

    stream.on('error', err => {
      reject(err);
    });
  });
}

(async () => {
  try {
    const buffer = await streamToBuffer(readableStream);
    console.log(buffer.toString()); // Output: Hello, world!
  } catch (err) {
    console.error('Error:', err);
  }
})();


async function saveStreamToFile(apiUrl, outputFilePath) {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const chunks = [];

    // Collect data chunks from the readable stream
    response.body.on('data', (chunk) => {
      chunks.push(chunk);
    });

    // Once the stream ends, save to file
    response.body.on('end', () => {
      const buffer = Buffer.concat(chunks);
      fs.writeFileSync(outputFilePath, buffer);
      console.log(`File successfully saved to ${outputFilePath}`);
    });

    response.body.on('error', (err) => {
      console.error('Error reading stream:', err);
    });
  } catch (error) {
    console.error('Error fetching or saving file:', error);
  }
}

// Usage example
saveStreamToFile('https://example.com/file', 'downloadedFile.txt');
