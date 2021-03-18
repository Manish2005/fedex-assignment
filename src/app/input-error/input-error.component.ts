import {Component, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-input-error',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.scss']
})
export class InputErrorComponent {
  @Input() control: AbstractControl;
  @Input() messages: { [key: string]: string };

  constructor() {
  }

  /**
   * Get list of error keys
   */
  get errorKeys(): string[] {
    if (!this.messages) {
      return [];
    }

    return Object.keys(this.messages);
  }
}
