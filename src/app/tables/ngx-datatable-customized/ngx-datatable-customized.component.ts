import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
// declare const M: any;
interface Gender {
  id: string;
  value: string;
}

@Component({
  selector: 'app-ngx-datatable-customized',
  templateUrl: './ngx-datatable-customized.component.html',
  styleUrls: ['./ngx-datatable-customized.component.sass']
})
export class NgxDatatableCustomizedComponent implements OnInit {

  @ViewChild("roleTemplate", { static: true }) roleTemplate: TemplateRef<any>;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  rows = [];
  selectedRowData: selectRowInterface;
  newUserImg = "assets/images/user/user1.jpg";
  data = [];
  filteredData = [];
  editForm: UntypedFormGroup;
  register: UntypedFormGroup;
  selectedOption: string;
  isEditable = {};
  genders = [
    { id: "1", value: "male", label: "Male" },
    { id: "2", value: "female", label: "Female" },
  ];
  interestList = [
    { id: "1", value: "tennis", label: "Tennis" },
    { id: "2", value: "Kabadi", label: "Kabadi" },
    { id: "3", value: "Cricket", label: "Cricket" },
    { id: "4", value: "Vollyball", label: "Vollyball" },
  ];
  columns = [
    // { name: "Image", value: "img", inputType: "Image", sortable: false, columnWidth: "50" },
    { name: "First Name", value: "firstName", inputType: "Text", sortable: true, columnWidth: "120" },
    { name: "Last Name", value: "lastName", inputType: "Text", sortable: true, columnWidth: "120" },
    { name: "Gender", value: "gender", inputType: "Select", list: this.genders, sortable: true, columnWidth: "100" },
    { name: "Interests", value: "interest", inputType: "MultiSelect", list: this.interestList, sortable: true, columnWidth: "150" },
    { name: "Phone", value: "phone", inputType: "Text", sortable: true, columnWidth: "150" },
    { name: "Email", value: "email", inputType: "Text", sortable: true, columnWidth: "150" },
    { name: "Address", value: "address", inputType: "Text", sortable: true, columnWidth: "200" },
  ];
  foods = [
    { value: "steak-0", viewValue: "Steak" },
    { value: "pizza-1", viewValue: "Pizza" },
    { value: "tacos-2", viewValue: "Tacos" },
  ];
  // Table 2
  tb2columns = [
    { name: "First Name" },
    { name: "Last Name" },
    { name: "Address" },
  ];
  tb2data = [];
  tb2filteredData = [];
  @ViewChild(DatatableComponent, { static: false }) table2: DatatableComponent;
  constructor(
    private fb: UntypedFormBuilder,
    private _snackBar: MatSnackBar,
    private modalService: NgbModal
  ) {
    this.editForm = this.fb.group({
      id: new UntypedFormControl(),
      img: new UntypedFormControl(),
      firstName: new UntypedFormControl(),
      lastName: new UntypedFormControl(),
      phone: new UntypedFormControl(),
      email: new UntypedFormControl(),
      address: new UntypedFormControl(),
    });
  }
  ngOnInit() {
    this.fetch((data) => {
      this.data = data;
      this.filteredData = data;

      this.rows = this.data;
      this.rows.forEach(row => 
        {
          let testArr = []; 
          row.interests.forEach(interest => {testArr.push(interest)});
          row.selected = testArr;
        }
      )
      console.log(this.rows);
    });
    // Table 2
    this.tb2fetch((data) => {
      this.tb2data = data;
      this.tb2filteredData = data;
    });
    this.register = this.fb.group({
      id: [""],
      img: [""],
      firstName: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      lastName: [""],
      phone: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      email: [
        "",
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      address: [""],
    });
    
  }
  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open("GET", "assets/data/adv-tbl-data.json");
    req.onload = () => {
      const data = JSON.parse(req.response);
      cb(data);
    };
    req.send();
  }
  // Table 2
  tb2fetch(cb) {
    const req = new XMLHttpRequest();
    req.open("GET", "assets/data/ngx-data.json");
    req.onload = () => {
      const data = JSON.parse(req.response);
      cb(data);
    };
    req.send();
  }
  // Table 2
  tb2filterDatatable(event) {
    // get the value of the key pressed and make it lowercase
    const val = event.target.value.toLowerCase();
    // get the amount of columns in the table
    const colsAmt = this.tb2columns.length;
    // get the key names of each column in the dataset
    const keys = Object.keys(this.tb2filteredData[0]);
    // assign filtered matches to the active datatable
    this.tb2data = this.tb2filteredData.filter(function (item) {
      // iterate through each row's column data
      for (let i = 0; i < colsAmt; i++) {
        // check for a match
        if (
          item[keys[i]].toString().toLowerCase().indexOf(val) !== -1 ||
          !val
        ) {
          // found match, return true to add to result set
          return true;
        }
      }
    });
    // whenever the filter changes, always go back to the first page
    this.table2.offset = 0;
  }
  editRow(row, rowIndex, content) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
    this.editForm.setValue({
      id: row.id,
      firstName: row.firstName,
      lastName: row.lastName,
      phone: row.phone,
      email: row.email,
      address: row.address,
      img: row.img,
    });
    this.selectedRowData = row;
  }
  addRow(content) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
    this.register.patchValue({
      id: this.getId(10, 100),
      img: this.newUserImg,
    });
  }
  deleteRow(row) {
    this.data = this.arrayRemove(this.data, row.id);
    this.showNotification(
      "bg-red",
      "Delete Record Successfully",
      "bottom",
      "right"
    );
  }

  // Save row
  save(row, rowIndex){
    this.isEditable[rowIndex]=!this.isEditable[rowIndex]
    console.log("Row saved: "+ rowIndex);
  }

  // Delete row
  delete(row, rowIndex){
    this.isEditable[rowIndex]=!this.isEditable[rowIndex]
    console.log("Row deleted: "+ rowIndex);
  }
  arrayRemove(array, id) {
    return array.filter(function (element) {
      return element.id != id;
    });
  }
  onEditSave(form: UntypedFormGroup) {
    this.data = this.data.filter((value, key) => {
      if (value.id == form.value.id) {
        value.firstName = form.value.firstName;
        value.lastName = form.value.lastName;
        value.phone = form.value.phone;
        value.gender = form.value.gender;
        value.email = form.value.email;
        value.address = form.value.address;
      }
      this.modalService.dismissAll();
      return true;
    });
    this.showNotification(
      "bg-black",
      "Edit Record Successfully",
      "bottom",
      "right"
    );
  }
  onAddRowSave(form: UntypedFormGroup) {
    this.data.push(form.value);
    this.data = [...this.data];
    // console.log(this.data);
    form.reset();
    this.modalService.dismissAll();
    this.showNotification(
      "bg-green",
      "Add Record Successfully",
      "bottom",
      "right"
    );
  }
  filterDatatable(event) {
    // get the value of the key pressed and make it lowercase
    const val = event.target.value.toLowerCase();
    // get the amount of columns in the table
    const colsAmt = this.columns.length;
    // get the key names of each column in the dataset
    const keys = Object.keys(this.filteredData[0]);
    // assign filtered matches to the active datatable
    this.data = this.filteredData.filter(function (item) {
      // iterate through each row's column data
      for (let i = 0; i < colsAmt; i++) {
        // check for a match
        if (
          item[keys[i]].toString().toLowerCase().indexOf(val) !== -1 ||
          !val
        ) {
          // found match, return true to add to result set
          return true;
        }
      }
    });
    // whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
  getId(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, "", {
      duration: 2000,
      verticalPosition: "bottom",
      horizontalPosition: "right",
      panelClass: ["bg-red"],
    });
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this._snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
export interface selectRowInterface {
  img: String;
  firstName: String;
  lastName: String;
}