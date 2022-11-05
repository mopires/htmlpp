# htmlpp (in development)
###### Beta comming soon!
###### HTML preprocessor

>Soon enough this package will be deprecated and a new one will be 
> available with a small change in it's name. Don't worry, there will be a warning with more details when it happens.
> You can keep posted by following <a href='https://github.com/mopires'>@mopires</a> in github.

Modern and semantic way to write html. The concept remains the same, but without the "&lt; > &lt;/>", like <a href='https://github.com/sass/sass'>Sass</a>, but different.

## Example

HTML
```html
 <!DOCTYPE html>
<html lang="br">
<head>
    <meta description="This is a page made with htmlpp!">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"/>
</head>
<body class="bg-dark">
<main class="container pt-3">
    <div class="row">
        <div class="col text-white">
            <h1>HTMLPP</h1>
        </div>
    </div>
    <div class="row text-white">
        <p>
            Modern way to write html. The concept remains the same, but without the "< > </>". It's like Sass, but
        different.
        </p>
        <div class="col">
            <p id='about'>
                HTMLpp is a HTML preprocessor.
            </p>
        </div>
    </div>
</main>
</body>
</html>

```

HTMLPP
```htmlpp
html lang="en"
    head
        meta description="This is a page made with htmlpp!"
        style href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
    closehead
    body class="bg-dark"
        main class="container pt-3"
            div class="row"
                div class="col text-white"
                    h1 $hero closeh1
                closediv
            closediv
            div class="row text-white"
                p
                    $description
                closep

                div class="col"
                    p id='about'
                        $about
                    closep
                closediv
            closediv
        closemain
    closebody
closehtml
   
```

You don't need to use special characters to code, only if you want to.

## Feature Tags

 Use ``` // ``` to comment in htmlpp code;
 
```closehead```
```icon```
```style```
```javascript```
```$```

The ```style``` and ```javascript``` require only a ```src```.
The  ```$``` is for declaring variables (for text).

## Supported Attributes
All atributes are suported.

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

## Variables
To use variables, you need to create a file called var.json in the root of 
your project and introduce all your variables in there.

````json
{
  "hello_world": "Hello world!",
  "my_name_is": "Giovani Giorgio",
  "but_everybody_calls_me": "Giorgio",
  "age": 27
}
````

To call a variable in a htmlpp file it's simple. 

>$hello_world
> 
> $my_name_is

Variables require a $ to be interpreted as a variable. 

## Link files

Linking files to htmlpp is simple:

  ```htmlpp
      style src='assets/css/main.css'
      javascript src='assets/js/main.js'
  ```
Even to link an external file:
```htmlpp
style href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css"
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

>Soon enough this package will be deprecated and a new one will be
> available with a small change in it's name. Don't worry, there will be a warning with more details when it happens.
> You can keep posted by following <a href='https://github.com/mopires'>@mopires</a> in github.

Want to give extra help?

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/J3J521CN9)

__Enjoy it!__
