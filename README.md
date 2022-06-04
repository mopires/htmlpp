# htmlpp (in development)
###### HTML preprocessor

Modern and semantic way to write html. The concept remains the same, but without the "&lt; > &lt;/>", like <a href='https://github.com/sass/sass'>Sass</a>, but different.

## Example

HTML
```html

<!DOCTYPE html>
<html>
    <head>
        <meta description="This is a page made with html++!">
        <!-- this is amer... a comment -->
    </head>
    <body>
        <div class="container" id="main">
            hello world
        </div>
        <script src="main.js"></script>
    </body>
</html>
      
```

HTMLPP
```htmlpp
html
    head
        meta description="This is a page made with html++!"
        // this is amer... a comment
    closehead
    body
        div class='container' id='main'
            hello world
        closediv
        javascript src= "main.js"
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
```icon```
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
```keywords```
```description```
```class```
```href```
```id```
```label```
```src``` 
```value```

The values in the attributes need to be especifield with single quote (src='example').

## Meta Tags

The ```meta``` tags, ```charset``` and ```viewport``` are built in with default values of __utf-8__ and __width=device-width, initial-scale=1__ respectively. ```DOCTYPE``` also, you don't need to write them at __htmlpp__ document.

> Warning: At the moment, to change it, you need to go in the build file and change it. In the future, that will have a much more cooler way to do it.

### Description & Keywords

Those are the new supported attributes to ```meta```!

```htmlpp
  [...]
  
  meta description='This is a page made with html++!'

  meta keywords='htmlpp, js, nodejs'

  [...]

```

## Favicon (icon)

To setup the icon of the page you can use ```icon``` tag. 

> icon href='myicon.png'


## Link files

Linking files to htmlpp is simple:

  ```htmlpp

      style src='assets/css/main.css'
      javascript src='assets/js/main.js'

  ```

## Syntax Highlighter Available!

On [Visual Code Editor]("https://code.visualstudio.com/") you can search for HTMLPP and install the extension and enjoy it!

> ext install mopires-htmlpp.htmlpp


# NPM
You can install it with NPM and test.
>npm i htmlpp-com-github-mopires.
 
Installing globally allow you to use the command ```htmlpp```
>npm i -g htmlpp-com-github-mopires

The file you are writing HTMLPP need to have the extension __.htmlpp__.
And that's it.

__Enjoy it!__
