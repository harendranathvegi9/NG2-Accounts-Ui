import {Component View, NgIf} from 'angular2/angular2';
import {Inject} from 'angular2/angular2';
import {AccountsService} from 'client/lib/accounts-service';

@Component({
  selector: 'submit-button',
  viewInjector: [AccountsService]
})
@View({
  template: `<button type="submit">
    <span *ng-if="processing"><i class="fa fa-spinner fa-pulse"></i></span>
    <span *ng-if="!processing">▸</span>
  </button>`,
  directives: [NgIf]
})
export class SubmitButton {
  processing:boolean;

  constructor(@Inject(AccountsService) accounts) {
    this.processing = accounts.processing;
  }
}