<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CleanData</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            margin: 20px;
            padding: 20px;
            background-color: #363535;
            color: #ffffff;
        }
        h1, h2, h3 {
            color: #bb86fc;
        }
        code {
            background-color: #1e1e1e;
            padding: 2px 4px;
            border-radius: 4px;
            color: #ffffff;
        }
        pre {
            background-color: #1e1e1e;
            padding: 10px;
            border-radius: 4px;
            overflow-x: auto;
            color: #ffffff;
        }
        a {
            color: #bb86fc;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        ul {
            list-style-type: disc;
            margin-left: 20px;
        }
        .icon {
            width: 24px;
            height: 24px;
            vertical-align: middle;
            margin-right: 5px;
            fill: #bb86fc;
        }
    </style>
</head>
<body>

<h1><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg> CleanData</h1>

<p><strong>CleanData</strong> is a JavaScript utility designed to clean and sanitize JSON data structures by removing unwanted values such as <code>null</code>, <code>undefined</code>, empty strings, and zeros. This package is especially useful for preparing data for processing or storage, ensuring that only meaningful values are retained.</p>

<h2><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 3h18v2H3V3zm0 4h18v2H3V7zm0 4h18v2H3v-2zm0 4h18v2H3v-2zm0 4h18v2H3v-2z"/></svg> Table of Contents</h2>
<ul>
    <li><a href="#features">Features</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#configuration-options">Configuration Options</a></li>
    <li><a href="#examples">Examples</a></li>
    <li><a href="#error-handling">Error Handling</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
</ul>

<h2 id="features"><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg> Features</h2>
<ul>
    <li>Cleans nested objects and arrays.</li>
    <li>Configurable options to specify which values to remove.</li>
    <li>Handles JSON string input and parses it automatically.</li>
    <li>Throws informative errors for invalid input.</li>
</ul>

<h2 id="installation"><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg> Installation</h2>
<p>You can install the CleanData package using npm. Run the following command in your terminal:</p>
<pre><code>npm install clean-data</code></pre>

<h2 id="usage"><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg> Usage</h2>
<p>To use the CleanData package, you can import it in your JavaScript file using either <code>require()</code> or the ES6 <code>import</code> statement.</p>

<h3>Using require()</h3>
<pre><code>const cleanData = require('clean-data');</code></pre>

<h3>Using import</h3>
<pre><code>import cleanData from 'clean-data';</code></pre>

<h3>Basic Example</h3>
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

<h3>Output</h3>
<pre><code>{
    "name": "Alice",
    "preferences": {
        "color": "blue"
    }
}</code></pre>

<h2 id="configuration-options"><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg> Configuration Options</h2>
<p>The <code>cleanData</code> function accepts an optional configuration object to specify which values to clean. The following options are available:</p>
<ul>
    <li><code>cleanNull</code> (Boolean): If <code>true</code>, removes all <code>null</code> values from the data. Default is <code>true</code>.</li>
    <li><code>cleanUndefined</code> (Boolean): If <code>true</code>, removes all <code>undefined</code> values from the data. Default is <code>true</code>.</li>
    <li><code>cleanEmptyString</code> (Boolean): If <code>true</code>, removes all empty strings from the data. Default is <code>false</code>.</li>
    <li><code>cleanZero</code> (Boolean): If <code>true</code>, removes all zero values from the data. Default is <code>false</code>.</li>
</ul>

<h3>Example Configuration</h3>
<pre><code>const config = {
    cleanNull: true,
    cleanUndefined: true,
    cleanEmptyString: true,
    cleanZero: true
};</code></pre>

<h2 id="examples"><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg> Examples</h2>

<h3>Cleaning Nested Structures</h3>
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

<h3>Output</h3>
<pre><code>{
    "users": [
        { "name": "Dana", "age": 28, "preferences": { "hobbies": ["Dancing"] } }
    ]
}</code></pre>

<h2 id="error-handling"><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg> Error Handling</h2>
<p>The <code>cleanData</code> function will throw errors in the following scenarios:</p>
<ul>
    <li>If the input is an invalid JSON string, it will throw an error with the message: <code>"Invalid JSON string provided."</code></li>
    <li>If the input is of an unsupported type (not an object, array, or valid JSON string), it will throw an error with the message: <code>"Input must be an object, array, or a valid JSON string."</code></li>
</ul>

<h3>Example of Error Handling</h3>
<pre><code>try {
    const invalidData = cleanData('Invalid JSON', {});
} catch (error) {
    console.error(error.message); // "Invalid JSON string provided."
}</code></pre>

<h2 id="contributing"><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg> Contributing</h2>
<p>Contributions are welcome! If you would like to contribute to CleanData, please follow these steps:</p>
<ol>
    <li>Fork the repository.</li>
    <li>Create a new branch (<code>git checkout -b feature/YourFeature</code>).</li>
    <li>Make your changes and commit them (<code>git commit -m 'Add some feature'</code>).</li>
    <li>Push to the branch (<code>git push origin feature/YourFeature</code>).</li>
    <li>Open a pull request.</li>
</ol>

<h2 id="license"><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg> License</h2>
<p>This project is licensed under the MIT License. See the <a href="LICENSE">LICENSE</a> file for details.</p>

</body>
</html>