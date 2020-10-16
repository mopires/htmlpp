#!/usr/bin/env node

const { O_TRUNC } = require('constants');
const fs       = require('fs'),
      readline = require('readline'),
      chalk    = require('chalk');

const syntax  = require('./syntax/syntax.js');

const log = console.log;

console.log(chalk.greenBright("Compiling... \n"));

var myInterface = readline.createInterface({
    input: fs.createReadStream('index.htmlpp') // Needs to be wide for other files
});

var line_number = 0;
var output = [];
var html_compiled = '';
var linked_files = Array();
myInterface.on('line', function (line) {
    
    line_number++;
    output = LexicalAnalizer(line, line_number);
    
    html_compiled += output[0];

    // if(!output[1] == ""){
    //     linked_files
    // }
    
    

    // console.log(lineno + ': ' + output);

}).on('close', function(line){
    
    if (!fs.existsSync('./build')){
        fs.mkdirSync('./build');
    }

    fs.writeFileSync('./build/index.html', html_compiled, (e) => {
        if (e) throw e;
    });

    
        
    log(chalk.green("Compiled *SUCCESSFULLY* \n"));
    
});



function LexicalAnalizer(line, line_number){
    
    let lex = line.match(/(?:[^\s']+|'[^']*')+/g);

    if(lex == null){
        return Parser();
    }else{

        var attributes = [];

        if(lex.length >= 2){

            attributes['tag'] = lex[0];
            attributes['props'] = [];
            for(let i = 1; i < lex.length; i++){
                
                attributes['props'][lex[i].match(/(?:[^\s'=]+|'[^']*')+/g)[0]] = 
                    lex[i].match(/(?:[^\s'=]+|'[^']*')+/g)[1];

            }
            // console.log(attributes);
        }else{
            attributes['tag'] = lex[0];
        }

        return Parser(attributes, line_number);
    }

}   

function Parser(tokens = null, line_number){
    
    var line;
    var files = Array(); //this configure the files linked to the document(i.e main.js, main.css)
    var data = [2];
    data[1] = "";
    if(tokens == null){
        line = "";
        data[0] = line;
        data[1] = "";
        return data;
    }else{
        
        if(tokens['tag'] != '--'){
            syntax.syntax(tokens, line_number); //the process will stop if somenthing is wrong
        }
        
        switch(tokens['tag']){

            case '--':
                line = '';
                break;
            case '!DOCTYPE':
                log(chalk.yellowBright("You don't need to implement a DOCTYPE..."));
                line = '';
                break;
            case 'html':
                line = '<!DOCTYPE html>'
                line += '<html>';
                break;
            case 'head':
                line = '<head>'
                line += '<meta charset="utf-8" />'
                line += '<meta name="viewport" content="width=device-width, initial-scale=1" />';
                break;
            case 'closehead':
                line = '</head>';
                break;
            case 'meta':
                line = '<meta ';
                if(tokens.props['keywords'] != undefined){
                    line += 'name="keywords" content="' + tokens.props['keywords'] + '"';
                }else
                if(tokens.props['description'] != undefined){
                    line += 'name="description" content="' + tokens.props['description'] + '"';
                }

                // for(key in tokens.props){
                //     line += key + '='+ tokens.props[key];
                // }
                line += ' />';
                break;
            case 'icon':
                line = '<link rel="icon" href="icon.png" type="image/gif" sizes="16x16"></link>';
                
                files["file"]   = 'icon.png';
                files["src"]    = tokens.props['src'];
                files["folder"] = "ROOT";
                data[1] = files;
                break
            case 'title':
                line = '<title>' + formatValue(tokens.props['value']) + '</title>';
                break;
            case 'style':
                line = '<link rel="stylesheet" href=' + tokens.props['src'] + ' />';
                break;
            case 'body':
                line = '<body>';
                break;
            case 'closebody':
                line = '</body>';
                break;
            case 'div': 
                line = '<div ';
                for(key in tokens.props){
                    line += key + '='+ tokens.props[key];
                }
                line += '>';
                break;
            case 'closediv':
                line = '</div>';
                break;
            case 'a':
                line = '<a href='+tokens.props['href']+' id='+tokens.props['id']+'>' + 
                        formatValue(tokens.props['value']) + '</a>';
                break;
            
            case 'button': 
                line = '<button ';
                for(key in tokens.props){
                    if(key != 'value') line += key + '='+ tokens.props[key];
                }
                line += '>' + formatValue(tokens.props['value']);
                line += '</button>';
                break;
            case 'p':
                line = '<p>' + formatValue(tokens.props['value']) + '</p>';
                break;
            case 'javascript':
                line = '<script src=' + tokens.props['src'] + '></script>';
                break;

            case 'input':
                line = '<input ';
                for(key in tokens.props){
                    line += key + '='+ tokens.props[key];
                }
                line += ' />';
                break;
            
        }
    }

    data[0] = line;
    

    return data;

}

function formatValue(value){

    return value.replace("'", "").replace("'", "");

}

