#!/usr/bin/env node
exports.syntax = function(token, line_number){
    
    const chalk = require('chalk');
    const log = console.log;

    //keep it hierarchical or don't. whatever, as long as it works
    var tag = ['--', 'html', 'head', 'closehead', 'title', 'meta', 'style',
                'body', 'closebody', 'div', 'closediv', 'a', 'button', 'input', 'p', 'javascript'];

    //keep it alphabetical
    var attribute = ['charset', 'class', 'href', 'id', 'label', 'src','value', 'type', 'placeholder'];

    //Mandatory properties
    var expression = 
        {
            'title': {
                'property': 'value'
            },
            'p': {
                'property': 'value'
            },
            'input': {
                'property': 'type'
            },
            'a': {
                'property': ['value','href']
            },
            'button':{
                'property': 'value'
            },
            'style': {
                'property': 'src'
            },
            'javascript':{
                'property': 'src'
            }
        }
    
    //checking tag
    if(!tag.includes(token['tag'])){
        
        log("");
        log(chalk.red(" Syntax error:"));
        log(" Tag \"" + chalk.blue(token['tag']) + "\" is undefined at " +chalk.yellow("line: " + line_number));

        log(chalk.yellowBright("\n ** Check the supported Tags in https://github.com/mopires/htmlpp ** \n"));
        
        process.exit();
    }
    
    //checking attributes
    if(token['props'] != undefined){
    
        for(key in token.props){
            if(!attribute.includes(key)){
                
                console.log("\n");
                log(chalk.red("Syntax error:"));
                log("The attribute " + chalk.blue(key) + " is undefined at " +chalk.yellow("line: " + line_number)); 
                
                log(chalk.yellowBright("\n ** Check the supported attributes in https://github.com/mopires/htmlpp **"));
                
                console.log("\n");
                
                process.exit();
            }
        }
    }

    if(token['tag'] in expression){

        if(token['props'] == undefined){
            console.log("\n\n");
            console.log("Syntax error:");

            console.log("The tag \"" + token['tag'] + "\" expects a " + 
                        expression[token['tag']].property + " property on line: " + line_number);
            
            process.exit();

        }else{
            if(token['tag'] != '--'){
                for(key in token.props){
                    
                    if(!attribute.includes(key)){
                        console.log("\n\n");
                        console.log("Syntax error:");
                        console.log("Attribute \""+ key + "\" is undefined \n");
                        process.exit();
                    }
                }
            }
        }

    }

}
