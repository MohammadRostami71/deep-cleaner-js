<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css"> <!-- Link to an external CSS file -->
</head>
<body class="container">

<h1 class="title">Deep Cleaner</h1>

<p class="description"><strong>Deep Cleaner</strong> is a JavaScript utility designed to clean and sanitize JSON data structures by removing unwanted values such as <code>null</code>, <code>undefined</code>, empty strings, and zeros. This package is especially useful for preparing data for processing or storage, ensuring that only meaningful values are retained.</p>

<h2 class="section-title">Table of Contents</h2>
<ul class="table-of-contents">
    <li><a href="#features">Features</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#configuration-options">Configuration Options</a></li>
    <li><a href="#examples">Examples</a></li>
    <li><a href="#error-handling">Error Handling</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
</ul>

<h2 id="features" class="section-title">Features</h2>
<ul class="features-list">
    <li>Cleans nested objects and arrays.</li>
    <li>Configurable options to specify which values to remove.</li>
    <li>Handles JSON string input and parses it automatically.</li>
    <li>Throws informative errors for invalid input.</li>
</ul>

<h2 id="installation" class="section-title">Installation</h2>
<p>You can install the Deep Cleaner package using npm. Run the following command in your terminal:</p>
<pre><code>npm install deep-cleaner-js</code></pre>

<h2 id="usage" class="section-title">Usage</h2>
<p>To use the Deep Cleaner package, you can import it in your JavaScript file using either <code>require()</code> or the ES6 <code>import</code> statement.</p>

<h3 class="sub-title">Using require()</h3>
<pre><code>const cleanData = require('deep-cleaner-js');</code></pre>

<h3 class="sub-title">Using import</h3>
<pre><code>import cleanData from 'deep-cleaner-js';</code></pre>

<h3 class="sub-title">Basic Example</h3>
<pre><code>const jsonData = `{
    "name": "Alice",
    "age": null,
    "email": "",
    "preferences": {
        "color": "blue",
        "food": null
    }
}`;

const config = { cleanNull: true, cleanEmptyString: true };

const cleanedData = cleanData(jsonData, config);
console.log(cleanedData);</code></pre>

<h3 class="sub-title">Output</h3>
<pre><code>{
    "name": "Alice",
    "preferences": {
        "color": "blue"
    }
}</code></pre>

<h2 id="configuration-options" class="section-title">Configuration Options</h2>
<p>The <code>cleanData</code> function accepts an optional configuration object to specify which values to clean. The following options are available:</p>
<ul class="config-options">
    <li><code>cleanNull</code> (Boolean): If <code>true</code>, removes all <code>null</code> values from the data. Default is <code>true</code>.</li>
    <li><code>cleanUndefined</code> (Boolean): If <code>true</code>, removes all <code>undefined</code> values from the data. Default is <code>true</code>.</li>
    <li><code>cleanEmptyString</code> (Boolean): If <code>true</code>, removes all empty strings from the data. Default is <code>false</code>.</li>
    <li><code>cleanZero</code> (Boolean): If <code>true</code>, removes all zero values from the data. Default is <code>false</code>.</li>
</ul>

<h3 class="sub-title">Example Configuration</h3>
<pre><code>const config = {
    cleanNull: true,
    cleanUndefined: true,
    cleanEmptyString: true,
    cleanZero: true
};</code></pre>

<h2 id="examples" class="section-title">Examples</h2>

<h3 class="sub-title">Cleaning Nested Structures</h3>
<pre><code>const jsonData = `{
    "users": [
        { "name": "Charlie", "age": null },
        { "name": "Dana", "age": 28, "preferences": { "hobbies": [null, "Dancing"] } },
        { "name": "Eve", "age": 0 }
    ]
}`;

const config = {
    cleanNull: true,
    cleanUndefined: true,
    cleanEmptyString: true,
    cleanZero: true
};

const cleanedData = cleanData(jsonData, config);
console.log(cleanedData);</code></pre>

<h3 class="sub-title">Output</h3>
<pre><code>{
    "users": [
        { "name": "Dana", "age": 28, "preferences": { "hobbies": ["Dancing"] } }
    ]
}</code></pre>

<h2 id="error-handling" class="section-title">Error Handling</h2>
<p>The <code>cleanData</code> function will throw errors in the following scenarios:</p>
<ul class="error-handling-list">
    <li>If the input is an invalid JSON string, it will throw an error with the message: <code>"Invalid JSON string provided."</code></li>
    <li>If the input is of an unsupported type (not an object, array, or valid JSON string), it will throw an error with the message: <code>"Input must be an object, array, or a valid JSON string."</code></li>
</ul>

<h3 class="sub-title">Example of Error Handling</h3>
<pre><code>try {
    const invalidData = cleanData('Invalid JSON', {});
} catch (error) {
    console.error(error.message); // "Invalid JSON string provided."
}</code></pre>

<h2 id="contributing" class="section-title">Contributing</h2>
<p>Contributions are welcome! If you would like to contribute to Deep Cleaner, please follow these steps:</p>
<ol class="contributing-steps">
    <li>Fork the repository.</li>
    <li>Create a new branch (<code>git checkout -b feature/YourFeature</code>).</li>
    <li>Make your changes and commit them (<code>git commit -m 'Add some feature'</code>).</li>
    <li>Push to the branch (<code>git push origin feature/YourFeature</code>).</li>
    <li>Open a pull request.</li>
</ol>

<h2 id="license" class="section-title">License</h2>
<p>This project is licensed under the MIT License. See the <a href="LICENSE">LICENSE</a> file for details.</p>

</body>
</html>