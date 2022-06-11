#!/usr/bin/env node

const fs = require('fs'), readline = require('readline'), chalk = require('chalk'), os = require("os");

const syntax = require('./syntax/syntax.js');
const log = console.log;

console.log(chalk.greenBright("Compiling... \n"));
let htmlpp_files = getFiles();
let expression = [], syntax_expression = [];
htmlpp_files.forEach((file) => {
    let file_content = readFile(file.path + file.name);
    compile(file_content, file);
});

function compile(file_content, file) {
    let line_number = 0;
    let output = [];
    let html_compiled = '';
    let linked_files = Array();
    // readline_interface.on('line', function (line) {
    //     line_number++;
    //     output = LexicalAnalizer(line, line_number);
    //
    //     html_compiled += output[0];
    //
    //     if (output[1].file !== undefined) {
    //         if (!fs.existsSync("./" + output[1].src)) {
    //             log(
    //                 " " + chalk.red("Error: \n") + " The linked file " + chalk.redBright(output[1].src) + " doesn't exists in the especified source " + chalk.yellow("at line: " + line_number) + " in " +
    //                 chalk.yellow(file.path + file.name) + "\n");
    //             process.exit();
    //         } else {
    //             linked_files.push(output[1]);
    //         }
    //     }
    // })
    //     .on('close', function () {
    //     if (!fs.existsSync('./build')) {
    //         fs.mkdirSync('./build');
    //     }
    //     if (file.path !== "" && !fs.existsSync('./build/' + file.path)) {
    //         fs.mkdirSync('./build/' + file.path);
    //     }
    //
    //     fs.writeFileSync('./build/' + file.path + swipeExtension(file.name), html_compiled, (e) => {
    //         if (e) throw e;
    //     });
    //
    //     linked_files.forEach((linked_file) => {
    //         let file_url = {};
    //         if (!linked_file.src.match("/")) {
    //             fs.copyFileSync(linked_file.src, './build/' + linked_file.src);
    //         } else {
    //             file_url = linked_file.src.split("/");
    //             file_url.pop(file_url.length - 1);
    //             let file_dir = file_url.toString().replace(',', "/");
    //
    //             if (!fs.existsSync('./build/' + file_dir)) {
    //                 fs.mkdirSync('./build/' + file_dir, {recursive: true});
    //                 fs.copyFileSync(linked_file.src, './build/' + linked_file.src);
    //             } else {
    //                 fs.copyFileSync(linked_file.src, './build/' + linked_file.src);
    //             }
    //
    //         }
    //         // fs.copyFileSync(linked_files[i].src, './build/' + linked_files[i].src);
    //     });
    //     log(chalk.green(file.path + file.name + " compiled *SUCCESSFULLY*"));
    // });
    let html = getTokens(file_content, file);
    if (!fs.existsSync('./build')) {
        fs.mkdirSync('./build');
    }
    fs.writeFileSync('./build/' + file.path + swipeExtension(file.name), html, (e) => {
        if (e) throw e;
    });
}

function getTokens(file_content, file) {
    let line = 0;
    let char_buffer = "";
    let column = 0;
    let parent_symbol = "";
    let token_id = ""

    function nextColumn() {
        column = column + 1;
    }

    function tokenId(token_name) {
        return token_name + Math.floor((Math.random() * 10000));
    }

    file_content = Array.from(file_content);
    while (column < file_content.length) {
        switch (file_content[column]) {
            case "/":
                if (file_content[column + 1] === "/") {
                    let comment = file_content[column];
                    while (true) {
                        nextColumn();
                        if (file_content[column] !== os.EOL) {
                            comment = comment + file_content[column];
                        } else {
                            break;
                        }
                    }
                    syntax_expression.push({"comment": comment, "column": column, "line": line});
                    nextColumn();
                }
                break;
            case " ":
                if (char_buffer.length > 0) {
                    token_id = tokenId(char_buffer);
                    syntax_expression.push({
                        "symbol": char_buffer,
                        "column": column,
                        "line": line,
                    });
                    char_buffer = "";
                }
                nextColumn();
                break;
            case "\n":
                line = line + 1;
                if (char_buffer.length > 0) {
                    if (char_buffer.match("close") === null) {
                        syntax_expression.push({
                            "symbol": char_buffer,
                            "column": column,
                            "line": line,
                        });
                        char_buffer = "";
                    } else {
                        let close_tag = char_buffer.split("close")[1];
                        syntax_expression.forEach(element => {
                            if (element.symbol !== undefined) {
                                if (element.symbol == close_tag) {
                                    element.close_tag = char_buffer;
                                }
                            }
                        });
                        syntax_expression.push({
                            "symbol": char_buffer,
                            "column": column,
                            "line": line,
                        });
                        char_buffer = ""
                    }
                }
                syntax_expression.push({
                    "delimiter": "OPEN_WITH_ENDLINE",
                    "column": column,
                    "line": line,
                });
                nextColumn();
                break;
            case "\r":
                line = line + 1;
                if (char_buffer.length > 0) {
                    if (char_buffer.match("close") === null) {
                        syntax_expression.push({
                            "symbol": char_buffer,
                            "column": column,
                            "line": line,
                        });
                        char_buffer = "";
                    } else {
                        let close_tag = char_buffer.split("close")[1];
                        syntax_expression.forEach(element => {
                            if (element.symbol !== undefined) {
                                if (element.symbol === close_tag) {
                                    element.close_tag = char_buffer;
                                    char_buffer = "";
                                }
                            }
                        })
                    }
                }
                syntax_expression.push({
                    "delimiter": "OPEN_WITH_ENDLINE",
                    "column": column,
                    "line": line,
                });
                nextColumn();
                break;
            case "=":
                if (char_buffer.length > 0) {
                    let value = file_content[column + 1];
                    let close_value_attribute = file_content[column + 1];
                    nextColumn();
                    while (true) {
                        nextColumn();
                        value += file_content[column];
                        if (close_value_attribute === file_content[column]) {
                            break;
                        }
                    }
                    if (!Array.isArray(syntax_expression[syntax_expression.length - 1].attr)) {
                        syntax_expression[syntax_expression.length - 1].attr = [];
                    }
                    syntax_expression[syntax_expression.length - 1].attr.push(char_buffer + "=" + value);
                    char_buffer = "";
                }
                nextColumn();
                break;
            case "\'":
                let single_quotes_content = file_content[column];
                while (true) {
                    nextColumn();
                    single_quotes_content = single_quotes_content + file_content[column];//send to expression
                    if (file_content[column] === "\'") {
                        break;
                    }
                }
                token_id = tokenId(char_buffer);
                syntax_expression.push({
                    "string": single_quotes_content,
                    "column": column,
                    "line": line,
                });
                nextColumn();
                break;
            case "\"":
                let quotes_content = file_content[column];
                while (true) {
                    nextColumn();
                    quotes_content = quotes_content + file_content[column];//send to expression
                    if (file_content[column] === "\"") {
                        break;
                    }
                }
                token_id = tokenId(char_buffer);
                syntax_expression.push({
                    "string": quotes_content,
                    "column": column,
                });
                parent_symbol = token_id;
                nextColumn();
                break
            default:
                char_buffer = char_buffer + file_content[column];
                if (file_content[column + 1] === undefined) {
                    token_id = tokenId(char_buffer);
                    syntax_expression.push({
                        "symbol": char_buffer,
                        "column": column,
                        "line": line,
                    });
                    char_buffer = "";
                }
                nextColumn();
                break;
        }
    }
    return LexicalAnalizer(syntax_expression);
}

function LexicalAnalizer(tokens = []) {
    if (tokens == null) {
        return false;
    } else {
        return Parser(tokens);
    }
}

function Parser(html = null) {

    let line;
    let files = Array(); //this configure the files linked to the document(i.e main.js, main.css)
    let data = [2];
    data[1] = Array();
    let html_compiled = "<!DOCTYPE html>";

    function processFeature(element) {
        // A feature is a htmlpp keyword/tag
        let feature = ["//", "icon", "style", "javascript", element.symbol];
        let feature_tag = feature.indexOf(element.symbol) > -1 ? feature[feature.indexOf(element.symbol)] : "";
        let tag = "";
        switch (feature_tag) {
            case "close"+element.symbol.replace("close", ""):
                tag = "</"+element.symbol.replace("close", "")+">" + os.EOL;
                return tag;
                break;
            case "style":
                tag = "<link rel=\"stylesheet\" "+element.attr+" />" + os.EOL;
                return tag;
                break;
            case "javascript":
                tag = "<script "+element.attr+"></script>";
                return tag;
                break;
            default:
                return null;
                break;
        }

    }

    function createElement(element) {
        let tag = "";
        if (element.symbol !== "!DOCTYPE") {
            let attributes = element.attr !== undefined ? element.attr.join(" ") : "";
            tag = "<" + element.symbol + " " + attributes + ">" + os.EOL;
            return tag;
        } else {
            log(chalk.yellowBright("* You don't need to set !DOCTYPE"));
        }
    }
    html = html.filter(element => element.symbol != undefined);
    html.forEach((element) => {
        html_compiled += processFeature(element) != null ? processFeature(element) : createElement(element);
    });
    return html_compiled;
    // if (tokens['tag'] !== '--') {
    //     syntax.syntax(tokens, line_number); //the process will stop if somenthing is wrong
    // }
    //
    // switch (tokens['tag']) {
    //
    //     case '--':
    //         line = '';
    //         break;
    //     case '!DOCTYPE':
    //         log(chalk.yellowBright("You don't need to implement a DOCTYPE..."));
    //         line = '';
    //         break;
    //     case 'html':
    //         line = '<!DOCTYPE html>'
    //         line += '<html>';
    //         break;
    //     case 'head':
    //         line = '<head>'
    //         line += '<meta charset="utf-8" />'
    //         line += '<meta name="viewport" content="width=device-width, initial-scale=1" />';
    //         break;
    //     case 'closehead':
    //         line = '</head>';
    //         break;
    //     case 'meta':
    //         line = '<meta ';
    //         if (tokens.props['keywords'] !== undefined) {
    //             line += 'name="keywords" content="' + tokens.props['keywords'] + '"';
    //         } else if (tokens.props['description'] !== undefined) {
    //             line += 'name="description" content="' + tokens.props['description'] + '"';
    //         }
    //         line += ' />';
    //         break;
    //     case 'icon':
    //         line = '<link rel="icon" href="' + formatValue(tokens.props['src']) + '" type="image/gif" sizes="16x16" />';
    //
    //         files["file"] = 'icon.png';
    //         files["src"] = formatValue(tokens.props['src']);
    //         files["folder"] = "ROOT";
    //         data[1] = files;
    //         break
    //     case 'title':
    //         line = '<title>' + formatValue(tokens.props['value']) + '</title>';
    //         break;
    //     case 'style':
    //         line = '<link rel="stylesheet" href=' + tokens.props['src'] + ' />';
    //
    //         if (!tokens.props['src'].match("https://")) {
    //             files["file"] = 'main.css';
    //             files["src"] = formatValue(tokens.props['src']);
    //             files["folder"] = "css";
    //             data[1] = files;
    //         }
    //
    //         break;
    //     case 'body':
    //         line = '<body>';
    //         break;
    //     case 'closebody':
    //         line = '</body>';
    //         break;
    //     case 'div':
    //         line = '<div ';
    //         for (key in tokens.props) {
    //             line += key + '=' + tokens.props[key];
    //         }
    //         line += '>';
    //         break;
    //     case 'closediv':
    //         line = '</div>';
    //         break;
    //     case 'a':
    //         line = '<a href=' + tokens.props['href'] + ' id=' + tokens.props['id'] + '>' +
    //             formatValue(tokens.props['value']) + '</a>';
    //         break;
    //
    //     case 'button':
    //         line = '<button ';
    //         for (key in tokens.props) {
    //             if (key !== 'value') line += key + '=' + tokens.props[key];
    //         }
    //         line += '>' + formatValue(tokens.props['value']);
    //         line += '</button>';
    //         break;
    //     case 'p':
    //         line = '<p>' + formatValue(tokens.props['value']) + '</p>';
    //         break;
    //     case 'javascript':
    //         line = '<script src=' + tokens.props['src'] + '></script>';
    //
    //         files["file"] = 'main.js';
    //         files["src"] = formatValue(tokens.props['src']);
    //         files["folder"] = "js";
    //         data[1] = files;
    //
    //         break;
    //
    //     case 'input':
    //         line = '<input ';
    //         for (key in tokens.props) {
    //             line += key + '=' + tokens.props[key];
    //         }
    //         line += ' />';
    //         break;
    // }
}

function formatValue(value) {
    return value.replace("'", "").replace("'", "");
}

function getFiles(subfolder = "./", htmlpp_files = []) {
    let folders;
    let path = subfolder;
    folders = fs.readdirSync(path);
    folders.forEach((folder) => {
        if (!fs.statSync(path + folder).isDirectory()) {
            if (isHTMLPPFile(folder)) {
                htmlpp_files.push({name: folder, path: path.replace("./", "")});
            }
        } else {
            if (!isReservedFolder(folder)) {
                folder = path + folder + "/";
                htmlpp_files = (getFiles(folder, htmlpp_files));
            }
        }
    });
    return htmlpp_files;
}

function isReservedFolder(folder) {
    let protected_dir = [".git", ".github", ".idea", "build", "syntax", "node_modules"];
    return protected_dir.indexOf(folder) !== -1;
}

function isHTMLPPFile(file) {
    let file_extension = file.split(".")[file.split(".").length - 1];
    if (file_extension === "htmlpp") {
        return true;
    }
}

function swipeExtension(file) {
    return file.replace(".htmlpp", ".html");
}

function readFile(file) {
    try {
        const file_content = fs.readFileSync(file, {encoding: 'utf8'});
        return file_content;
    } catch (err) {
        console.log(err);
    }
}