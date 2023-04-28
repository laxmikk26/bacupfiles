import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BasicTableComponent } from "./basic-table/basic-table.component";
import { NgxDatatableComponent } from "./ngx-datatable/ngx-datatable.component";
import { MaterialTableComponent } from "./material-table/material-table.component";
import { NgxDatatableCustomizedComponent } from "./ngx-datatable-customized/ngx-datatable-customized.component";
const routes: Routes = [
  {
    path: "",
    redirectTo: "basic-tables",
    pathMatch: "full",
  },
  {
    path: "basic-tables",
    component: BasicTableComponent,
  },
  {
    path: "material-tables",
    component: MaterialTableComponent,
  },
  {
    path: "ngx-datatable",
    component: NgxDatatableComponent,
  },
  {
    path: "ngx-datatable-customized",
    component: NgxDatatableCustomizedComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule {}
