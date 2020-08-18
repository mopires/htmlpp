
let fs       = require('fs'),
    readline = require('readline');

var syntax  = require('./syntax/syntax.js');
    

//file

var myInterface = readline.createInterface({
    input: fs.createReadStream('index.htmlpp')
});

var lineno = 0;
var output = '';
myInterface.on('line', function (line) {
    
    lineno++;
    output = LexicalAnalizer(line, lineno) + '\n';
    // console.log(lineno + ': ' + output);
    fs.appendFile('./build/index.html', output, (e) => {
        if (e) throw e;
        
    });
    
});



//compile
    
//read tags

function LexicalAnalizer(line, line_number){

    //let lex = line.split(' ').map(s => s.trim()).filter(s => s.length);
    
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
    if(tokens == null){
        line = "\n";
        return line;
    }else{
        
        if(tokens['tag'] != '--'){
            syntax.syntax(tokens, line_number); //the process will stop if somenthing is wrong
        }
        
        
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
                line = '<meta ';
                for(key in tokens.props){
                    line += key + '='+ tokens.props[key];
                }
                line += ' />';
                break;
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
            case 'p':
                line = '<p>' + formatValue(tokens.props['value']) + '</p>';
                break;
            case 'javascript':
                line = '<script src=' + tokens.props['src'] + '></script>';
                break;
            
        }
    }

    return line;

}

function formatValue(value){
    
    return value.replace("'", "").replace("'", "");

}

