exports.syntax = function(token, line_number){

    //keep it hierarchical or don't. whatever, as long as it works
    var tag = ['--', 'html', 'head', 'closehead', 'title', 'meta', 'style',
                'body', 'closebody', 'div', 'closediv', 'a', 'button', 'input', 'p'];

    //keep it alphabetical
    var attribute = ['charset', 'class', 'href', 'id', 'label', 'src','value'];

    //Mandatory properties
    var expression = 
        {
            'title': {
                'property': 'value'
            },
            'p': {
                'property': 'value'
            },
            'a': {
                'property': ['value','href']
            }
        }

    if(!tag.includes(token['tag'])){
        console.log("\n\n");
        console.log("Syntax error:");
        console.log("Tag \""+token['tag'] + "\" is undefined \n\n");
        process.exit();
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

    }else{
        
    }

}
