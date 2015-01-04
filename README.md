# gaBasicSlider

A jQuery slider plug-in that's made to be **re-usable**.

```javascript
$('#slider').gaBasicSlider();
```

I created gaBasicSlider for myself so that I could re-use it with any project. It's completely devoid of styling but instead adds slider capabilities to existing HTML and CSS.

#### A Typical Setup

gaBasicSlider does not rely on markup order to work, so the markup in this example could be rearranged to best suite the needs of the project. 

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
