![Intelix Logo](http://cs.intelix.biz/logo/pic.png)

# mysql-server

Se detectó el siguiente problema al intentar establecer una conexión al sevidor mysql

***Unable to load autentication plugin 'caching_sha2_password'***
#### Solución
`Version MySQL : Ver 8.0.17 for Linux on x86_64 (MySQL Community Server - GPL)`

```mysql
 GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';
 ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
 ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'password';
 FLUSH PRIVILEGES;
 quit;
```

# abx-web

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
