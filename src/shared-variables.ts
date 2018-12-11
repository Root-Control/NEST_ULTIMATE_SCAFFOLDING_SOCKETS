import { Injectable } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class sharedVariables {
  private simpleString = new BehaviorSubject<string>('first basic');

  currentSimpleString = this.simpleString.asObservable();

  changeSimpleString(string: string) {
    this.simpleString.next(string);
  }
}