# html++ transpiler (in development)

Modern way to write html. The concept remains the same, but without the "&lt; > &lt;/>", like <a href='https://github.com/sass/sass'>Sass</a>, but different.

## Example

HTML
```html

<html>
  <head>
    <meta charset='utf-8' />
    <title>My page with html++</title>
    <link rel="stylesheet" href='https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css' />
  </head>
<body>
  <div class='container' id='main' >
    <div class='row' >
    <div class='col-lg-6 bg-dark' >
      <a href='https://google.com' id='linkG'>Link to google</a>
      </div>
      <div class='col-lg-6 bg-green' id='div1' >
        <p>whats up? would like to check ou my sound?</p>
        <a href='https://juggnix.wtf' id=undefined>juggnix</a>

     </div>
    </div>
  </div>
  <script src='../main.js'></script>
</body>
</html>
      
```

HTML++
```html
  html

    head
        
        meta charset='utf-8'
        
        title value='My page with html++'

        style src='https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css'

        -- this is a comment
    
    closehead
    
    body

        div class='container' id='main'
            
            div class='row'

                div class='col-lg-6 bg-dark'

                    a href='https://google.com' value='Link to google' id='linkG'

                closediv
                div class='col-lg-6 bg-green' id='div1'

                    p value='whats up? would like to check ou my sound?'

                    a href='https://juggnix.wtf' value='juggnix'
                
                closediv
            closediv
        closediv
        
        javascript src='../main.js'
        
    closebody
   
```

You don't need to use special characters to code, only if you want to.

## Supported Tags

 Use ``` -- ``` to comment in htmlpp code;
 
```html```
```head```
```closehead```
```title```
```meta```
```style```
```body```
```closebody```
```div```
```closediv```
```a```
```button```
```input type='text'```
```p```
```javascript```

The ```style``` and ```javascript``` require only a ```src```.

## Supported Attributes

```charset```
```class```
```href```
```id```
```label```
```src``` 
```value```

The values in the attributes need to be especifield with single quote (src='example').

## Meta Tags

Now the ```meta``` tags, ```charset``` and ```viewport``` are built in with default values of __utf-8__ and __width=device-width, initial-scale=1__ respectively. ```DOCTYPE``` also, you don't need to write them at htmlpp document.

At the moment, to change it, you need to go in the build file and change it. In the future, that will have a much more cooler way to do it.

### Description & Keywords

Those are the new supported attributes to ```meta```!

```html
  [...]
  
  meta description='This is a page made with html++!'

  meta keywords='htmlpp, js, nodejs'

  [...]

```

## Syntax Highlighter Available!

On [Visual Code Editor]("https://code.visualstudio.com/") you can search for HTMLPP and install the extension and enjoy it!

> ext install mopires-htmlpp.htmlpp


# NPM

You can install it with NPM and test. ```npm i htmlpp-com-github-mopires```.

The file you are writing HTMLPP should be named __index.htmlpp__.

After install the dependencies you can compile with ```htmlpp```.

And that's it.
