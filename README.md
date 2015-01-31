# gaBasicSlider

A jQuery slider plug-in that's made to be **styleable**.

```javascript
$('#slider').gaBasicSlider();
```

I tried to make gaBasicSlider as independent of markup and css as I could. This gives you the power to apply this slider to any design you can come up with.

#### A Typical Setup

```html
<div class="slider">
    <span id="slider-previous" class="slider-previous"></span>
    <span id="slider-next" class="slider-next"></span>

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

In order to achieve markup independence we need to tell gaBasicSlider where to find it's parts. If you look at the code example above you'll see that we are passing into gaBasicSlider jQuery selectors for next and previous buttons and the selector for where it will generate indicators.

```javascript
$('#slider').gaBasicSlider({
    btnNext : $('#slider-next'), // adds click events for the next button
    btnPrevious : $('#slider-previous'),// adds click events for the previous button
    indicators : $('#slider-indicators') // indicators will be generated at this location
});
```
The markup for the next and previous buttons can be as simple or as complicated as you like. The location of the markup in the html is also in your control. All gaBasicSlider does is add click events to the selector you pass-in. It's important to note that anything else added to the markup in addition to the selector passed into gaBasicSlider, is yours to do with as you please, for example using font glyphs inside the markup to add left and right arrow graphics.

```html
    <span id="slider-previous" class="slider-previous"></span>
    <span id="slider-next" class="slider-next"></span>
```


#### gaBasicSlider Options

This table shows each option of gaBasicSlider as well as the variable type of each option and what it's value will default too it the option is omitted.

| Option                   | Type                  | Default       |
| :----------------------- |:--------------------- | :------------ |
| animate                  | boolean               | true          |
| animationDelay           | number (milliseconds) | 6000          |
| animationTime            | number (milliseconds) | 300           |
| indicators               | object (jQuery)       | null          |
| btnNext                  | object (jQuery)       | null          |
| btnPrevious              | object (jQuery)       | null          |
| touchBounceBackThreshold | number (pixels)       | 80            |

Here is what it looks like when we set the options in JavaScript.

```javascript
$('#slider').gaBasicSlider({
    animate : true,
    animationDelay : 6000,
    animationTime : 300,
    indicators : $('#slider-indicators'),
    btnNext : $('#slider-next'),
    btnPrevious : $('#slider-previous'),
    touchBounceBackThreshold : 80
});
```
#### Indicators

When creating the slider indicators gaBasicSlider will output this markup by default:

```html
<span class="ga-bs-indicator">&bull;</span>
```

#### Custom Indicators

All you need to do to use custom indicators is just create the markup for it inside your indicator element. When gaBasicSlider sees you've created markup for the indicators it will only attach click handlers to your existing markup. Note when using custom indicators **you will need to make sure the number of indicators match the number of slides**.

```html
<p id="slider-indicators" class="slider-indicators">
    <span>Custom Indicator 1</span>
    <span>Custom Indicator 2</span>
    <span>Custom Indicator 3</span>
</p>
```

Custom indicators can also **link to a page instead of animating the slider**. To do this use the `data-ga-bs-bypass-url` attribute.

```html
<span data-ga-bs-bypass-url="http://www.any-url.com">Custom Indicator 2</span>
```

#### Turn animation on and off

Animation can also be turned on and off by using the following:

```javascript
$('#your-slider').gaBasicSlider('stop'); // turn animation off
$('#your-slider').gaBasicSlider('start');; // turn animation on
```
