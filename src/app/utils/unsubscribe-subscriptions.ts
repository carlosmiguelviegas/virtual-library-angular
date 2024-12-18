import { Subscription } from "rxjs";

export class UnsubscribeSubscriptions {

  private subscriptionsList: Subscription[] = [];

  set add(sub: Subscription) {
    this.subscriptionsList.push(sub);
  };

  unsubscribeAll = () => {
    this.subscriptionsList.forEach((sub: Subscription) => sub.unsubscribe());
    this.subscriptionsList = [];
  };

}
