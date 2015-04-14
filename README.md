# gaBasicSlider

A jQuery slider plug-in that's made to be **styleable**.

```javascript
$('#slider').gaBasicSlider();
```

If you want to design your own slider and can build it in html and css, gaBasicSlider can animate it and give you API controls into your own design.

**Note worthy features:**

- Touch navigation
- Customize behavior - modular parts
- Add to existing designs

## Simple API

Animation can be turned on and off using this simple API.

```javascript
$('#slider').gaBasicSlider('stop'); // turn animation off
$('#slider').gaBasicSlider('start');; // turn animation on
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

## How it works

gaBasicSlider takes in an unordered list and animates them going from left to right. You can optionally pass in selectors for next and previous buttons. gaBasicSlider also takes in a selector where it can either generate indicators or use your existing indicators.

### The slider markup

First let's look at the markup for the slider itself.

```html
<ul id="slider" class="your-styles">
    <li>...</li>
    <li>...</li>
    <li>...</li>
</ul>
```

gaBasicSlider needs the slider markup to have a parent child relationship. **Note** You can use divs if that best suits your needs.

```html
<!-- Divs would work just as well -->

<div id="slider" class="your-styles">
    <div>...</div>
    <div>...</div>
    <div>...</div>
</div>
```
gaBasicSlider adds the minimum amount of CSS to position the slides on top of each other and too animate between them.

At this point we can turn the slider on with the following JavaScript.

```html
<script>
    $('#slider').gaBasicSlider();
</script>
```

### Adding navigation

gaBasicSlider can add optional navigation elements, one of which is next and previous buttons.

#### Adding next and previous buttons

 I leave the position and look of these buttons entirely up to you, all gaBasicSlider does is add click handlers.

```html
<script>
    $('#slider').gaBasicSlider({
        btnNext : $('#your-next-button'),
        btnPrevious : $('#your-previous-button'))
    });
</script>
```

#### Indicators

Pass in an empty element to use for indicators

```html
<div id="slider-indicators" class="your-styles"></div>

<script>
    $('#slider').gaBasicSlider({
        indicators : $('#slider-indicators')
    });
</script>
```

By default gaBasicSlider outputs this HTML for each indicator.

```html
<span class="gabs-indicator">&bull;</span>

<!-- This is what the generated html could look like -->

<div id="slider-indicators" class="your-styles">
    <span class="gabs-indicator">&bull;</span>
    <span class="gabs-indicator">&bull;</span>
    <span class="gabs-indicator">&bull;</span>
</div>
```

The class `gabs-active` is added to the active indicator.

```html
<span class="gabs-indicator gabs-active">&bull;</span>
```

#### Custom Indicators

All you need to do to use custom indicators is just create the markup for it inside your indicator element. When gaBasicSlider sees you've created markup for the indicators it will only attach click handlers. **Note** when using custom indicators **your responsible for making sure the number of indicators match the number of slides**.

```html

<div id="slider-indicators" class="your-styles">
    <!-- create the markup for your custom indicators here -->
</div>

<div id="slider-indicators" class="your-styles">
    <!-- gaBasicSlider will use your indicators instead of creating it's own -->
    <span>Custom Indicator 1</span>
    <span>Custom Indicator 2</span>
    <span>Custom Indicator 3</span>
</div>
```

##### Link to a URL

Custom indicators can also **link to a URL instead of animating the slider**. To do this use the `data-gabs-bypass-url` attribute.

```html
<div id="slider-indicators" class="your-styles">
    <span>Custom Indicator 1</span>
    <span data-gabs-bypass-url="http://www.any-url.com">Custom Indicator 2</span>
    <span>Custom Indicator 3</span>
</div>
```