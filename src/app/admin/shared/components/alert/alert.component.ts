import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AlertService} from "../../services/alert.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  @Input()
  delay: number = 5000;

  public text!: string;
  public type: string = 'success';
  public alertClass = `alert-${this.type}`;

  aSub!: Subscription;

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.aSub = this.alertService.alert$.subscribe(alert => {
      console.log(this.type);
      this.text = alert.text;
      this.type = alert.type;

      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        this.text = '';
      }, this.delay)
    })
  }

  ngOnDestroy() {
    if(this.aSub) this.aSub.unsubscribe();
  }

}
