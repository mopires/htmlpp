# htmlpp transpiler (in development)

Modern way to write html. The concept remains the same, but without the "&lt; > &lt;/>" like SASS, but different.

## Example

HTML
```html

<html>
  <head>
    <meta charset='utf-8' />
    <title>My title'</title>
    <link rel="stylesheet" href='https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css' />
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

HTMLpp
```
  html
    head
        
        meta charset='utf-8'
        
        title value='My title'

        style src='https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css'

        -- comment for the style hahaah
    
    closehead
    
    body

        div class='container' id='main'
            
            div class='row' id='main'

                div class='col-lg-6 bg-dark' id='div-do-link'

                    a href='https://google.com' value='Link to google' id='linkG'
                closediv
                div class='col-lg-6 bg-green' id='div1'
                    
                    p value='What is up'
                
                closediv
            closediv
        closediv

    closebody
    
```

## Suported Tags


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

## Suported Attributes

```charset```
```class```
```href```
```id```
```label```
```src```
```value```








