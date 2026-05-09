# ngx-burst

## Get Started

### Install

```bash
npm install @austinkurtti/ngx-burst
```

### Use

Every Directive and Component is standalone. Simply add the needed classes into the imports array of the Module or standalone Component using them. Related Directives and Components will come from the same namespace. For example, all Accordion Directives can be imported from the `ngx-burst/accordion` namespace.

```bash
import { NgxbButtonDirective } from 'ngx-burst/button';

...

@Component({
	...
    imports: [
        NgxbButtonDirective
    ]
})
```

### Style

Directives and Components will be unstyled by default, but ngx-burst does provide theme mixins to allow customization. You can include the base theme to apply styles application-wide or component-specific themes for more control. Note that the component-specific theme mixins are _not_ reliant on the base theme.

```scss
@use 'ngx-burst' as ngxb;

...

@include ngxb.theme();

@include ngxb.accordion-theme();
@include ngxb.button-theme();
```

Theme mixins also accept an override map, allowing precision customization of individual styles.

```scss
// Overriding the top level theme will customize the base styles for the whole library
@include ngxb.theme((
    'color-primary': 'red'
));

// Overriding a component-specific theme will customize the styles for just that component
@include ngxb.button-theme((
    'color-primary': 'green'
));
```

> [!NOTE]
> Component-specific theme mixins are _not_ reliant on the base theme. They can be used independently without the base theme ever being included.

## Running Showcase

Showcase is meant to give an overview of features for everything available in the ngx-burst library. To start a local Showcase server with ngx-burst in live development, run:

```bash
npm run start
```

Once the server is running, go to `http://localhost:4400/`.
