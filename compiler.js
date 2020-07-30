
let fs       = require('fs'),
    readline = require('readline');

//file

var myInterface = readline.createInterface({
    input: fs.createReadStream('index.htmlpp')
});

var lineno = 0;
var output = '';
myInterface.on('line', function (line) {
    
    output = LexicalAnalizer(line) + '\n';
    // console.log(lineno + ': ' + output);
    fs.appendFile('build/index.html', output, (e) => {
        if (e) throw e;
        
    });
    lineno++;
});



//compile
    
//read tags

function LexicalAnalizer(line){

    //let lex = line.split(' ').map(s => s.trim()).filter(s => s.length);
    
    let lex = line.match(/(?:[^\s']+|'[^']*')+/g);

    if(lex == null){
        // console.log(lex);
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

        return Parser(attributes);
    }

}



function Parser(tokens = null){
    
    var line;
    if(tokens == null){
        line = "\n";
        return line;
    }else{

        let grammar = {

            tag: ['--', 'html', 'head', 'closehead', 'title', 'meta', 'style', //keep it hierarchical
                 'body', 'closebody', 'div', 'closediv', 'a', 'button', 'input', 'p'], 
            attribute: ['charset', 'class', 'href', 'id', 'label', 'src','value'] //keep it alphabetical
            
        }

        //checking the syntax and mounting line
        
        if(!grammar.tag.includes(tokens['tag'])){
            console.log("Tag "+tokens['tag'] + " is undefined");
        }

        if(!tokens['tag'] == '--'){
            //checking attributes
            for(key in tokens.props){
                
                if(!grammar.attribute.includes(key)){
                    console.log("Attribute "+ key + " is undefined \n");
                }
            }
        }
        
        // console.log(tokens);
        switch(tokens['tag']){

            case '--':
                line = '';
                break;
            case 'html':
                line = '<html>';
                break;
            case 'head':
                line = '<head>'
                break;
            case 'closehead':
                line = '</head>';
                break;
            case 'meta':
                line = '<meta ' + tokens.props['charset'] + ' />';
                break;
            case 'title':
                line = '<title>' + tokens.props['value'].replace("'", "") + '</title>'
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
                line = '<div class='+tokens.props['class']+' id='+tokens.props['id']+' >';
                break;
            case 'closediv':
                line = '</div>';
                break;
            case 'a':
                line = '<a href='+tokens.props['href']+' id='+tokens.props['id']+'>' + tokens.props['value'] + '</a>';
                break;
            case 'p':
                line = '<p>' + tokens.props['value'] + '</p>';
                break;
            
        }
    }

    return line;

}