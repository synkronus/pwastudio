
import { Component } from "@angular/core";
import { MenuItem } from "primeng/api";

@Component({
  selector: "app-breadcrumb",
  templateUrl: "./breadcrumb.component.html"
})
export class BreadCrumbComponent {
  items: MenuItem[];

  home: MenuItem;

  ngOnInit() {
    this.items = [
        {label: 'Formulario'},
        {label: 'Administrar'}
    ];
    this.home = {icon: 'pi pi-home', url:"#/inicio"};
  }
}
