# gaBasicSlider

A jQuery slider plug-in that's made to be **styleable**.

```javascript
$('#slider').gaBasicSlider();
```

I tried to make gaBasicSlider as independent of markup and css as I could. This gives you the power to apply this slider to any design you can come up with.

**gaBasicSlider features:**

- Responsive
- Touch navigation
- Hardware accelerated animation

## A typical setup

In the following text I'll breakdown this code into it's individual parts and show how I achieve markup independence.

```html
<div class="slider">
    <span id="slider-previous" class="slider-previous">&larr;</span>
    <span id="slider-next" class="slider-next">&rarr;</span>

    <ul id="slider" class="slider-items">
        <li>...</li>
        <li>...</li>
        <li>...</li>
    </ul>

    <span id="slider-indicators" class="slider-indicators"></span>
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
<!-- This markup for the slider will work just as well -->

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

 I leave the position and look of these buttons entirely up to you. All gaBasicSlider does is add click events to the markup you pass in.

```html
<span id="slider-previous" class="slider-previous">&larr;</span>
<span id="slider-next" class="slider-next">&rarr;</span>
```

For this example I wanted to design the next and previous buttons on top of the slider. Because gaBasicSlider has the freedom to move it's parts around the html, we can achieve our design pretty easily. And I did so by wrapping the slider and buttons with a div so that I could use CSS to position them on top of the slider. 

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

We now need to use a JavaScript object to tell gaBasicSlider about the next and previous buttons.

```html
<script>
    $('#slider').gaBasicSlider({
        btnNext : $('#slider-next'),
        btnPrevious : $('#slider-previous'))
    });
</script>
```

#### Indicators

By default when indicators are activated gaBasicSlider will output this markup for each child of the slider.

```html
<span class="ga-bs-indicator">&bull;</span>
```

Clicking an indicator will animate the slider to that index. The class `ga-bs-active` is also added to the current indicator to assist in styling.

```html
<!-- Markup when opting for default behavior -->

<span id="slider-indicators" class="slider-indicators"></span>

<!-- for a slider that has three slides gaBasicSlider will generate this markup  -->

<span id="slider-indicators" class="slider-indicators">
    <span class="ga-bs-indicator ga-bs-active">&bull;</span>
    <span class="ga-bs-indicator">&bull;</span>
    <span class="ga-bs-indicator">&bull;</span>
</span>
```

#### Custom Indicators

All you need to do to use custom indicators is just create the markup for it inside your indicator element. When gaBasicSlider sees you've created markup for the indicators it will only attach click handlers to your existing markup. *Note* when using custom indicators **you will need to make sure the number of indicators match the number of slides**.

```html
<span id="slider-indicators" class="slider-indicators">
    <span>Custom Indicator 1</span>
    <span>Custom Indicator 2</span>
    <span>Custom Indicator 3</span>
</span>
```

Custom indicators can also **link to a URL instead of animating the slider**. To do this use the `data-ga-bs-bypass-url` attribute.

```html
<span id="slider-indicators" class="slider-indicators">
    <span>Custom Indicator 1</span>
    <span data-ga-bs-bypass-url="http://www.any-url.com">Custom Indicator 2</span>
    <span>Custom Indicator 3</span>
</span>
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
