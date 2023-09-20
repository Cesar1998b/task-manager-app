import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  template: ''
})
export abstract class RxjsSubscriber implements OnDestroy {
  protected destroySubject$: Subject<void> = new Subject();

  ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }
}
