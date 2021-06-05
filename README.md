# ie-10-11-conditional-comments
```html

    this comment will show for IE 5 - 9
    <!--[if IE]>
        <p>You are using Internet Explorer 5 - 9.</p>
    <![endif]-->


    this comment will show for 10 or 11
    <!--[if IE 12]>
        <p>You are using Internet Explorer 10, 11</p>
        <p> Hello, world </p>
        <h6> How is the weather </h6>
    <![endif]-->


    this comment will run a script for 10 or 11
    <!--[if IE 12]>
        <script> alert("hello") </script>
    <![endif]-->

```
Make sure to place the link to this script at the end of the body or after it or after all the comments you want to replace!
```html
<head>

    <!--[if IE]>
        <script src="old-ie.js"></script>
    <![endif]-->
    
    <!--[if IE 12]>
        <script src="last-ie.js"></script>
    <![endif]-->
    
    <script src="./last-conditional-comments.js"></script>
</head>
<body> 

</body>
```
