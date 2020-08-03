# html++ transpiler (in development)

Modern way to write html. The concept remains the same, but without the "&lt; > &lt;/>" like <a href='https://github.com/sass/sass'>Sass</a>, but different.

## Example

HTML
```html

<html>
  <head>
    <meta charset='utf-8' />
    <title>My title'</title>
    <link rel="stylesheet" href='https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css' />
    <!-- this is a comment -->
  </head>
  <body>
    <div class='container' id='main' >
      <div class='row' id='main' >
        <div class='col-lg-6 bg-dark' id='div-do-link' >
          <a href='https://google.com' id='linkG'>'Link to google'</a>
        </div>
      <div class='col-lg-6 bg-green' id='div1' >
        <p>'What is up'</p>
      </div>
      </div>
    </div>
  </body>
</html>
      
```

HTML++
```
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
```input```
```p```

## Supported Attributes

```charset```
```class```
```href```
```id```
```label```
```src```
```value```








