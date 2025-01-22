# ngx-burst

## Running showcase app with ngx-burst

To start a local showcase server with ngx-burst in live development, run:

```bash
npm run start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files in either the showcase app or ngx-burst library.

## Generating component under sub entry point

To generate a new component in it's own sub entry point of the ngx-burst library, run:

```bash
ng generate component component-name --flat --path projects/ngx-burst/component-name/src
```

Omit the --flat option if you want to create a subfolder. This is useful when the sub entry point already has a lot of existing components.
