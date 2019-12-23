import { Component, EventEmitter, Output } from '@angular/core';
import {LoggingService} from '../logging.service';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  providers: []
})
export class NewAccountComponent {
  //@Output() accountAdded = new EventEmitter<{name: string, status: string}>();

  constructor(private loggingService: LoggingService,
      private accountsService: AccountsService){}

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountsService.addAccount(accountName,accountStatus);
    //const service = new LoggingService();
    //this.loggingService.logStatusChange(accountStatus);
    // console.log('A server status changed, new status: ' + accountStatus);
  }
}
