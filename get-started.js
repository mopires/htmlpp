#!/usr/bin/env node

const fs = require('fs');

const htmlpp = "html lang=\"en\"\n" +
    "    head\n" +
    "        meta description=\"This is a page made with htmlpp!\"\n" +
    "        style href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css\"\n" +
    "    closehead\n" +
    "    body class=\"bg-dark\"\n" +
    "        main class=\"container pt-3\"\n" +
    "            div class=\"row\"\n" +
    "                div class=\"col text-white\"\n" +
    "                    h1 $hero closeh1\n" +
    "                closediv\n" +
    "            closediv\n" +
    "            div class=\"row text-white\"\n" +
    "                p\n" +
    "                    $description\n" +
    "                closep\n" +
    "\n" +
    "                div class=\"col\"\n" +
    "                    p id='about'\n" +
    "                        $about\n" +
    "                    closep\n" +
    "                closediv\n" +
    "            closediv\n" +
    "        closemain\n" +
    "    closebody\n" +
    "closehtml";

const variables = "{\n \"hero\": \"HTMLPP\",\n\"description\": \"Modern way to write html. The concept remains the same, but without the \" \< \> \< \/\>\". It's like Sass, but different.\",\n\"about\": \"HTMLpp is a HTML preprocessor.\",\n\"age\": 27\n}";

if (!fs.existsSync("../../src")) {
    fs.mkdirSync("../../src");
}

fs.writeFileSync("../../src/index.htmlpp", htmlpp, (e) => {
    if (e) throw e;
});

fs.writeFileSync("../../src/var.json", variables, (e) => {
    if (e) throw e;
});