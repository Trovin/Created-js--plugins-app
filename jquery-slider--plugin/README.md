# jQuery slider

## Install


* Set up your HTML markup.
```
	<div id="slider">
		<div class="slide">
			<h2>Slide 1</h2>
		</div>
		<div class="slide">
			<h2>Slide 2</h2>
		</div>
		<div class="slide">
			<h2>Slide 3</h2>
		</div>
	</div>
```	


* Add css in your <head>
```		
	<link type="text/css" rel="stylesheet" href="css/slider.css">
```		


* Add slick.js before your closing <body> tag, after jQuery (recommended version jQuery 3.2.1 +)
```	
	<script src="js/jquery-3.2.1.min.js"></script>
	<script src="js/slider.js"></script>
```		


* Initialize your slider in your script file or an inline script tag
```	
  $(document).ready(function() {
  $('#slider').slider({ 
        current_slide: '0',
        speed: 500,
        nav: true,
        dots: true,
        autoscroll: true,
        scrollSpeed: 2000,
        animation: 'slide_right',
    });
  }); 
```			


* Setting
```	
choice one of animation name and it pass as string:
	1) default
	2) fade
	3) slide_right
	4) slide_twitching

```	


## Authors

* **Ruslan Trovin 2018** 

## License

This project is licensed under the MIT License



