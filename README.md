# pwgen
A simple and fast javascript-based password generator

## features
- choose length of password (min 6)
- include a personal string (e.g. your name, birth date, ...) [not recommended]
- copy to clipboard
- debug information
- add / remove ui elements with keywords
- 'readable' option (remove all special characters)

## planned features
- abstract certain characters (e.g. 1 -> ! or A -> 4)

## usage
### script
- Add the latest jQuery via Google Hosted Libraries to your project head
- Add the `pwgen.js` or (`pwgen.min.js`) file aswell
```html
<head>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="path/to/pwgen.js"></script>
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
- fully responsive design (`.pwgen`'s size gets adjusted based on screen size). The responsive design can be toggled. See [here](https://github.com/Techassi/pwgen#responsive).

```html
<head>
  <link href="path/to/style.css" rel="stylesheet" type="text/css">
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
## style
### responsive
Toggles if the container uses responsive design.
TypeError results in `'responsive' = true`
```javascript
'responsive': true
supported values: true / false (boolean)
default: true
```

### length_field
Toggles if the length input field is displayed.
TypeError results in `'length_field' = false`

If the length input field isn't displayed (`'length_field' = false`) the script uses a length between `max_length` and `min_length`
```javascript
'length_field': true
supported values: true / false (boolean)
default: true
```

### include_field
Toggles if the inlude input field is displayed.
TypeError results in `'include_field' = false`
```javascript
'include_field': true
supported values: true / false (boolean)
default: true
```

### readable
Toggles if the 'readable' checkbox is displayed.
TypeError results in `'readable' = false`
```javascript
'readable': true
supported values: true / false (boolean)
default: false
```

### show_hint
Toggles if the hint box is displayed
TypeError results in `'show_hint' = true`
```javascript
'show_hint': true
supported values: true / false (boolean)
default: true
```

### show_copy
Toggles if 'copy to clipboard' is displayed
TypeError results in `'show_copy' = true`
```javascript
'show_copy': true
supported values: true / false (boolean)
default: true
```

### show_debug
Toggles if debug switch is displayed
TypeError results in `'show_debug' = false`
```javascript
'show_debug': true
supported values: true / false (boolean)
default: false
```

## behavior
### min_length
Set the minimum length of the password.
TypeError results in `'min_length' = 6`
```javascript
'min_length': 6
supported values: numeric
default: 6
```

### max_length
Set the maximum length of the password.
TypeError results in `'max_length' = 12`
```javascript
'max_length': 12
supported values: numeric
default: 12
```

### include
Set an include string to be included in every generated password.
TypeError results in `'include' = ''`
```javascript
'include': 'foo'
supported values: string
default: ''
```

### include_append
Where to append 'include' to user-entered include string.
TypeError results in `'include_append' = 'right'`
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

## complete example
```html
<script>
  $('.your-class').pwgen({
    'responsive': true,
    'min_length': 8,
    'max_length': 12,
    'include': 'foo',
    'include_append': 'right',
    'length_field': false;
  });
</script>
```
- container uses responsive design
- password has a minimum length of 8
- password has a maximum length of 12
- 'foo' gets included into every password [again not recommended]
- 'foo' gets appended on the right
- no length input field is displayed (results in random number between 8 [inclusive] and 12 [inclusive])
