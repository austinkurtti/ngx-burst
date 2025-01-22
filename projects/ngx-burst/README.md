## Generating component under sub entry point

To generate a new component in it's own sub entry point of the ngx-burst library, run:

```bash
ng generate component component-name --flat --path projects/ngx-burst/component-name/src
```

Omit the `--flat` option if you want to create a subfolder. This is useful when the sub entry point already has a lot of existing components.
