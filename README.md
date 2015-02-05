# gaBasicSlider

A jQuery slider plug-in that's made to be **styleable**.

```javascript
$('#slider').gaBasicSlider();
```

If you want to design your own slider and can build it in html and css, gaBasicSlider can animate it and give you API controls into your own design.

**Note worthy features:**

- Responsive
- Touch navigation
- Hardware accelerated animation

## A typical setup

In the following text I'll breakdown this code into it's individual parts.

```html
<div class="slider">
    <span id="slider-previous" class="slider-previous">&larr;</span>
    <span id="slider-next" class="slider-next">&rarr;</span>

    <ul id="slider" class="slider-items">
        <li>...</li>
        <li>...</li>
        <li>...</li>
    </ul>

    <div id="slider-indicators" class="slider-indicators"></div>
</div>

<script>
    $('#slider').gaBasicSlider({
        btnNext : $('#slider-next'),
        btnPrevious : $('#slider-previous'),
        indicators : $('#slider-indicators')
    });
</script>
```

### The slider markup

First let's look at the markup for the slider itself.

```html
<ul id="slider" class="slider-items">
    <li>...</li>
    <li>...</li>
    <li>...</li>
</ul>
```

gaBasicSlider needs the slider markup to have a parent child relationship with the same validation requirements as an unordered list. Because I don't enforce any tag restrictions you can use divs if that best suits your needs.

```html
<!-- Divs would work just as well -->

<div id="slider" class="slider-items">
    <div>...</div>
    <div>...</div>
    <div>...</div>
</div>
```
gaBasicSlider adds the minimum amount of CSS to position the slides on top of each other and too animate between them. *Note* I'm using **hardware accelerated CSS for animation**, and fallback to jQuery animation for older browsers.

At this point we can turn the slider on with the following JavaScript.

```html
<script>
    $('#slider').gaBasicSlider();
</script>
```

### Adding navigation

gaBasicSlider can add optional navigation elements, one of which is next and previous buttons.

#### Next and previous buttons

 I leave the position and look of these buttons entirely up to you, all gaBasicSlider does is add click events.

```html
<span id="slider-previous" class="slider-previous">&larr;</span>
<span id="slider-next" class="slider-next">&rarr;</span>
```

I wrote this markup in-order to design the next and previous buttons on top of the slider. The buttons would be positioned relative to .slider using `position:absolute;`.

```html
<div class="slider">
    <span id="slider-previous" class="slider-previous">&larr;</span>
    <span id="slider-next" class="slider-next">&rarr;</span>

    <ul id="slider" class="slider-items">
        <li>...</li>
        <li>...</li>
        <li>...</li>
    </ul>
</div>
```

Now we pass in the next and previous buttons to gaBasicSlider.

```html
<script>
    $('#slider').gaBasicSlider({
        btnNext : $('#slider-next'),
        btnPrevious : $('#slider-previous'))
    });
</script>
```

#### Indicators

When using default indicators gaBasicSlider outputs this HTML for each slide.

```html
<span class="ga-bs-indicator">&bull;</span>
```

The class `ga-bs-active` is added to the active indicator.

```html
<!-- if the slider is on the second slide -->

<div id="slider-indicators" class="slider-indicators">
    <span class="ga-bs-indicator">&bull;</span>
    <span class="ga-bs-indicator ga-bs-active">&bull;</span>
    <span class="ga-bs-indicator">&bull;</span>
</div>
```

#### Custom Indicators

All you need to do to use custom indicators is just create the markup for it inside your indicator element. When gaBasicSlider sees you've created markup for the indicators it will only attach click handlers. *Note* when using custom indicators **you will need to make sure the number of indicators match the number of slides**.

```html
<div id="slider-indicators" class="slider-indicators">
    <span>Custom Indicator 1</span>
    <span>Custom Indicator 2</span>
    <span>Custom Indicator 3</span>
</div>
```

Custom indicators can also **link to a URL instead of animating the slider**. To do this use the `data-ga-bs-bypass-url` attribute.

```html
<div id="slider-indicators" class="slider-indicators">
    <span>Custom Indicator 1</span>
    <span data-ga-bs-bypass-url="http://www.any-url.com">Custom Indicator 2</span>
    <span>Custom Indicator 3</span>
</div>
```


## gaBasicSlider options

This table shows each option of gaBasicSlider as well as the variable type of each option and what it's value will default too it the option is omitted.

| Option                   | Type                  | Default       |
| :----------------------- |:--------------------- | :------------ |
| animate                  | boolean               | true          |
| animationDelay           | number (milliseconds) | 6000          |
| animationTime            | number (milliseconds) | 300           |
| indicators               | object (jQuery)       | null          |
| btnNext                  | object (jQuery)       | null          |
| btnPrevious              | object (jQuery)       | null          |

Here is what it looks like when we set the options in JavaScript.

```javascript
$('#slider').gaBasicSlider({
    animate : true,
    animationDelay : 6000,
    animationTime : 300,
    indicators : $('#slider-indicators'),
    btnNext : $('#slider-next'),
    btnPrevious : $('#slider-previous')
});
```

## Simple API

Animation can be turned on and off using this simple API.

```javascript
$('#slider').gaBasicSlider('stop'); // turn animation off
$('#slider').gaBasicSlider('start');; // turn animation on
```
