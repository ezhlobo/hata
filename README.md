# Hata

Lightweight JavaScript framework for manipulation dom elements.

[Releases](https://github.com/ezhlobo/hata/releases)

## Table of content:
* [Getting started](#getting-started)
* [Documentation](#documentation)
  * [Before reading](#before-reading)
  * [Constructor](#constructor)
  * [DOM is ready](#dom-is-ready)
    * __[hata().get([ number ])](#hataget-number-)__
    * __[hata().eq( number )](#hataeq-number-)__
    * __[hata().each( function )](#hataeach-function-)__
    * __[hata().filter( selector )](#hatafilter-selector-)__
    * __[hata().is( selector )](#hatais-selector-)__
    * __[hata().find( selector )](#hatafind-selector-)__
    * __[hata().parent()](#hataparent)__
    * __[hata().parents( selector )](#hataparents-selector-)__
    * __[hata().closest( selector )](#hataclosest-selector-)__
  * [Utilities](#utilities)
    * __[hata.pushUniq( array, element )](#hatapushuniq-array-element-)__
    * __[hata.toArray( object )](#hatatoarray-object-)__
    * __[hata.each( object, function )](#hataeach-object-function-)__
  * [Extending](#extending)
    * __[hata.extend( object, object )](#hataextend-object-object-)__
* [Applications use hata](#applications-use-hata)
* [Contributions](#contributions)

## Getting started

Save [compressed](http://mmjs.herokuapp.com/?url=https://raw.github.com/ezhlobo/hata/master/hata.js) hata framework.

```html
<script src="js/hata.js" type="text/javascript">
```

## Documentation

### Before reading
* `selector` and `context` can be string selector, hata object or node.
* `number` can be positive or negative number.

### Constructor
```js
hata( selector );
hata( selector, context );
```

### DOM is ready
```js
hata.ready(function() {
  // Now DOM is fully loaded
});
```

#### hata().get([ number ])
```js
hataObj.get(); // => Array of nodes
hataObj.get( number ); // => One node by index
hata( "div" ).get( -1 ); // => Return last div node
```

#### hata().eq( number )
```js
hataObj.eq( number ); // => Hata object of one element
hata( "div" ).eq( 1 ); // => Hata object of second element
```

#### hata().each( function )
```js
hataObj.each(function( element, index ) {
  // this => node element
  // element => node element
  // index => index of node element
});
```
This method __returns__ previous Hata object.

#### hata().filter( selector )
```js
hataObj.filter( selector ); // => Hata object of elements filtering by `selector`
hata( "div" ).filter( ".tag" ); // => Hata object of divs with class 'tag'
```

#### hata().is( selector )
```js
hataObj.is( selector ) // => true if hataObj is matched to selector
hata( "div" ).is( ".tag" ); // => True is there are divs with class "tag"
```
This method __returns__ true or false.

#### hata().find( selector )
Equivalent to hata( selector, hata() ).
```js
hataObj.find( selector ) // => Find elements inside current collection
hata( "div" ).find( "p" ); // => Return hata( "div p" )
```

#### hata().parent()
```html
<body>
  <section>
    <div class="tag">tag</div>
  </section>
</body>
```
```js
hataObj.parent(); // => Return parents
hata( ".tag" ).parent(); // => Return hata( "section" )
hata( "section" ).parent(); // => Return hata( body )
```

#### hata().parents( selector )
```html
<body>
  <section>
    <div class="tag">tag</div>
  </section>
</body>
```
```js
hataObj.parents( selector ); // => Return parents which satisfies the 'selector'
hata( ".tag" ).parents( "body" ); // => Return hata( "body" )
hata( "section" ).parents( ".tag" ); // => Return hata( document )
```

#### hata().closest( selector )
```js
hataObj.closest( selector ); // => First parents by `selector` or this elements if it is `selector`
hata( "div" ).closest( ".tag" ); // => Return hata( "div" ) is there is div with class "tag"
hata( "div" ).closest( ".tag" ); // => Works like .parents() if divs without class "tag"
```

### Utilities

#### hata.pushUniq( array, element )
```js
hata.pushUniq( arr, element ); // => Add an element to the array if it is unique
hata.pushUniq( [1, 2], 1 ); // => [1, 2]
hata.pushUniq( [1, 2], 3 ); // => [1, 2, 3]
```
This method __returns__ array.

#### hata.toArray( object )
```js
hata.toArray( obj ); // => Convert something into an array
hata.toArray(); // => []
hata.toArray( "string" ); // => [ "string" ]
hata.toArray( document.querySelectorAll( "div" ) ); // => Array of divs
```
This method __returns__ array.

#### hata.each( object, function )
```js
hata.each( obj, function( element, key ) {
  // this => value
});
```

### Extending
#### hata.extend( object, object )
If you want to add hata methods:
```js
hata.extend( hata.fn, {
  ping: function() {
    return 'pong';
  }
});

// or

hata.fn.ping = function() {
  return 'pong';
}

elements.ping(); // => 'pong'
```

If you want to extend some objects:
```js
var someObject = {};

hata.extend( someObject, {
  ping: function() {
    return 'pong';
  }
});

someObject.ping(); // => 'pong'
```

## Applications use hata:
* [vkleaner](http://vkleaner.losky.net) - chrome extension for vk.com that hides unwanted posts. Look at [sources](https://github.com/EvgenyZhlobo/vkleaner/tree/master/js) for better understand role of Hata.

## Contributions

Contribuitions always are welcome. Hata is written according to [jQuery Core Style Guide](http://contribute.jquery.org/style-guide/js/) and:
```js
// Good
if ( condition ) return some;
if ( condition ) break;
```
Feel free to fork and pull request changes.
