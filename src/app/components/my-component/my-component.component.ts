import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { MyServiceService } from 'src/app/services/my-service.service';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css'],
})
export class MyComponentComponent {
  requestsForm!: FormGroup;
  updateForm!: FormGroup;
  actionResult: any;
  alerts: Array<any> = [];

  constructor(
    private formBuilder: FormBuilder,
    private myService: MyServiceService
  ) {
    this.createRequestsForm();
    this.createUpdateForm();
  }

  createRequestsForm() {
    this.requestsForm = this.formBuilder.group({
      name: ['', []],
      currentlyWorking: [false],
    });
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      title: ['', []],
      body: ['', []],
    });
  }

  requestEndpoints() {
    this.requestsForm.patchValue({ currentlyWorking: true });
    const randomUser = this.myService.getRandomUser();
    const agify = this.myService.getAgeOfName(this.requestsForm.value.name);
    const coindesk = this.myService.getCurrentPrice();
    forkJoin([randomUser, agify, coindesk]).subscribe({
      next: (response) => {
        this.alerts = response;
      },
      complete: () =>
        this.requestsForm.setValue({ name: '', currentlyWorking: false }),
    });
  }

  updateData() {
    let payload = {
      id: 1,
      userId: 1,
      ...this.updateForm.value,
    };
    this.myService.putEndpoint(payload).subscribe({
      next: (response) => {
        this.actionResult = response;
      },
      complete: () => this.updateForm.reset(),
    });
  }
}
