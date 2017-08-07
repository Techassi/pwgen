# pwgen
A simple and fast javascript-based password generator

## features
- choose length of password (min 6)
- include a personal string (e.g. your name, birth date, ...)
- copy to clipboard
- debug information

## planned features
- add / remove ui elements with keywords

## usage
### script
- Add the latest jQuery via Google Hosted Libraries to your project head
- Add the `pwgen.js` or (`pwgen.min.js`) file aswell
- If you want to display SHA1 hashes include `sha1.min.js` aswell
```html
<head>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="js/pwgen.js"></script>
  <script src="js/sha1.min.js"></script>
</head>
```
Add this at the end of your file:
```html
<script>
  $('.your-class').pwgen();
</script>
```

### css
- Add the `style.css` or `style.min.css` file to your project head
- fully responsive design (`.generator`'s size gets adjusted based on screen size). The responsive design can be toggled. See [here](https://github.com/Techassi/pwgen#responsive).

```html
<head>
  <link href="css/style.css" rel="stylesheet" type="text/css">
</head>
```

## config
The script can be configured the way you like in the following fashion: 
```html
<script>
  $('.your-class').pwgen({
    'foo': bar,
    'dog': lazy
  });
</script>
```

Supported keywords:
### responsive
Toggles if the container uses responsive design.
TypeError results in 'responsive' = true
```javascript
'responsive': true
supported values: true / false (boolean)
default: true
```

### min_length
Set the minimum length of the password.
TypeError results in 'min_length' = 6
```javascript
'min_length': 6
supported values: numeric
default: 6
```

### max_length
Set the maximum length of the password.
TypeError results in 'max_length' = 12
```javascript
'max_length': 12
supported values: numeric
default: 12
```

### include
Set an include string to be included in every generated password.
TypeError results in 'include' = ''
```javascript
'include': 'foo'
supported values: string
default: ''
```

### include_append
Where to append 'include' to user-entered include string.
TypeError results in 'include_append' = 'right'
```javascript
'include_append': 'right'
supported values: 'right' / 'left'
default: 'right'
```
Example:
```javascript
user: foo
'include': bar

- 'include_append': 'left'
  bar|foo
- 'include_append': 'right'
  foo|bar
```
