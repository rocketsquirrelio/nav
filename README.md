# Nav Component
This is a reworking of [10up's Navigation Component](https://github.com/10up/component-navigation) for [WordPress](https://wordpress.org) development. The notable change is using [Dart Sass](https://github.com/sass/dart-sass) to be the primary CSS preprocessor. The benefit of this is the ability to use the latest language features which enables the CSS to be highly customizable. The departures from the original component are noted in [Specific Changes](#specific-changes).


```bash
npm install @rocketsquirrelio/nav
```

## Markup
This is the markup template expected by the component.

```html
<nav class="site-navigation" role="navigation" itemscope="itemscope" itemtype="http://schema.org/SiteNavigationElement">

   <a href="#primary-nav" aria-controls="primary-nav">
   	<span class="screen-reader-text">Primary Menu</span>
   	<span aria-hidden="true">☰</span>
   </a>

   <?php
   	wp_nav_menu( array(
   		'theme_location' => 'primary',
   		'menu_class'     => 'primary-menu',
   		'menu_id'        => 'primary-nav',
   		) );
   ?>

</nav>
```

## Sass Component
The most basic usage is to simply include the component into the stylesheet.

```scss
@use '@rocketsquirrelio/nav';
```

### Dropdown Mixin
The dropdown mixin allows full customization at the point of implementation to customize the specific pseudo-element (`:after`).

```scss
@include nav.dropdown-icon {
    content: '+';
    display: inline-block;
    font-weight: 700;
    margin-left: .25em;
}
```

### Advanced Usage
This version takes advantage of the latest language features in Dart Sass. Override the default media query and dropdown selector for the Dropdown Mixin.

```scss
// => style.scss
@use '@rocketsquirrelio/nav' with (
	$menu-class: 'primary-menu',
    $media-query: '(min-width: 48em)',
    $dropdown-selector: '.menu-item-has-children > a:after',
);
```

| Variable | Default Value | Description |
|:---------|:--------------|:------------|
|`$media-query`|`min-width: 48em`|The breakpoint when the menu should switch to the mobile version. This should match the [media query](#javascript-component) passed in the JavaScript component.|
|`$dropdown-selector`|`.menu-item-has-children > a:after`|The full selector to target placing an icon.|


## JavaScript Component
Incorporate the component directly into a JavaScript build process.

### Example Usage
```js
import Nav from '@rocketsquirrelio/nav';

new Nav( '#primary-nav', {
    action: 'click',
    breakpoint: '(min-width: 48em)',
	onCreate: function() {
		console.log( 'onCreate callback' );
	},
	onOpen: function() {
		console.log( 'onOpen callback' );
	},
	onClose: function() {
		console.log( 'onClose callback' );
	},
	onSubmenuOpen: function() {
		console.log( 'onSubmenuOpen callback' );
	},
	onSubmenuClose: function() {
		console.log( 'onSubmenuClose callback' );
	}
} );
```

## Specific Changes
Any changes from the original component have been noted below.

### CSS Changes
There was one opinionated, non-structural line of CSS removed. The `margin-right` rule applied to `.menu-item` was removed to create a more raw template for development. This rule was likely implemented for accessibility, but it is easier to handle this at the point of implementation. [(source)](https://github.com/10up/component-navigation/blob/c576c004f141fffcc43b5e4ecd2ba1f03eebc4e6/src/style.css#L19-L22)

### Implementation Changes
This version removes mutation of the global `window` object and does not ship with a `dist/` folder. It cannot be used as a standalone implementation.
