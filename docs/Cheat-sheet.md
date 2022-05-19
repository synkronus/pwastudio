Angular CLI Cheat Sheet

ng new <project name>  # To create a new project
ng serve  # To host the project on 4200 port
ng serve --port <port no> --host <host name> # To host application specific host/port

We can use a short alias as well:
ng s --p <port no> --h <hostname>

Some other helpful commands
ng lint # To lint and look for JavaScript errors
ng lint --format stylish # Linting and formatting the output
ng lint --fix # Lint and attempt to fix all the problems
ng build # to build a project in the dist folder
ng build ---target <target name> # Target for which we want to build
ng build --prod # To build in production mode
ng test # To run spec files
ng e2e # To run e2e test cases
ng doc # To look for angular documentation
ng help # To get help on angular cli commands

To change the .angular-cli.json config
ng set # to change properties

# For e.g. ng set default.styleExt scss
# ng set default.styleExt scss -g -- To set in global angular-cli file
Components
ng generate component <component name> # To generate new component
ng g c <component name> # Short notation to generate component
ng g c <component name> --flat # Want to generate folder name as well?
ng g c <component name> --inline-template # Want to generate HTML file?
ng g c <component name> -it # Short notation
ng g c <component name> --inline-style # Want to generate css file?
ng g c <component name> -is # Short notation
ng g c <component name> --spec # Want to generate spec file?
ng g c <component name> --view-encapsulation # View encapsulation stratergy
ng g c <component name> -ve # Short notation
ng g c <component name> --change-detection # Change detection strategy
ng g c <component name> -cd # Short notation
ng g c <component name> --dry-run # To only report files and don't write them
ng g c <component name> -d # Short notation
ng g c <component name> -m <module name> -d 

# Name of module where we need to add component as dependency
Directives and services
ng generate directive <directive-name> # To generate directive
ng g d <directive-name> # short notation
ng g d <directive-name> -d # To only report files and don't write them
ng generate service <service-name> # To generate service
ng g s <service-name> # short notation
ng g s <service-name> -d # To only report files and don't write them
ng g s <service-name> -m <module name> 

# Name of module where we need to add service as dependency
Classes, Interface, pipe, and enums
ng generate class <class name> # To generate class
ng g cl <class name> # short notation
ng generate interface <interface name> # To generate interface
ng g i <interface name> # short notation
ng generate pipe <pipe name> # To generate pipe
ng g p <pipe name> # short notation
ng generate enum <enum name> # To generate enum
ng g e <enum name> # short notation

Module and routing
ng generate module <module name> # To generate module
ng g m <module name> # To short notation
ng g m <module name> --spec true -d # To generate spec file for the module
ng g m <module name> --routing # To generate module with routing file
ng g guard <guard name> # To generate guard to route
