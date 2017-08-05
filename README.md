# pwgen
A simple and fast javascript-based password generator

## features
- choose length of password (min 6)
- include a personal string (e.g. your name, birth date, ...)
- copy to clipboard
- debug information

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
```html
<head>
  <link href="css/style.css" rel="stylesheet" type="text/css">
</head>
```
- fully responsive design (`.generator`'s size gets adjusted based on screen size). The responsive design can be toggled in a future update.

