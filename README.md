# EndNote Developer Portal
Introduction goes here.


## Architecture
Below are descriptions of some of the principals that went into building the Developer Portal. This architecture was chosen in order to allow extensibility and facilitate passing the project between developers (e.g. co-ops). It is made to be semantic, modular, and maintainable.

### BEM
BEM (Block, Element, Modifier) is a front-end naming methodology that is meant to promote transparency and semantics within a project. The EN Dev Portal uses a naming system based on BEM principles. The systems follows this pattern:

```css
.block {}
.block__element {}
.block--modifier {}
```

Or a more specific example...

```css
.nav {}
.nav__link {}
.nav--vertical {}
```

You can read all about it [here](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/).

### Modular File Structure
The file structure of this project is broken up is such a way that each major element of the website can be easily modified or removed, and new elements can be added fairly easily. The scripts are grouped by element and share a folder, and each element folder is categorized by the type of elements it contains. The categories are as follows: Components (elements that are used only once, such as the home page or an information page), Services (angular services), and Shared (elements that appear on multiple pages, such as the header and footer).

An overview of the app file structure is below.

```
app/
-----components/
----------componentName/
---------------partials/
--------------------partialName.html
---------------ComponentCtrl.js
---------------componentView.html
-----services/
----------serviceName.js
-----shared/
----------sharedName/
---------------SharedCtrl.js
---------------sharedDir.js
---------------sharedView.html
```

### Unit Tests
test stuff

### Responsiveness
The website resized uses media queries. All font and elements that resize do so based on the font size of the <html> element. As a result of this, all styles should use 'em' instead of 'px' where possible.


## Resources
Below is a non-exhaustive list of the technologies and principles that went into building the Developer Portal.

### AngularJS
[AngularJS Best Practices Guide](https://github.com/jmcunningham/angularjs-styleguide)

### Bootstrap
[Bootstrap Grid](http://getbootstrap.com/css/#grid)

### CSS
[CSS Best Practices Guide](http://cssguidelin.es/)

### Karma
[Karma Generator](https://github.com/yeoman/generator-karma)

### Jasmine
[Jasmine Documentation](http://jasmine.github.io/2.1/introduction.html)
