import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

import { ConfirmDialogData } from '#ui/model';

const imports = [MatDialogModule, MatButtonModule];

@Component({
  selector: 'echo-confirm-dialog',
  template: `
    <h2 mat-dialog-title>{{ dialogData.title }}</h2>

    <mat-dialog-actions>
      <button matButton [mat-dialog-close]="false">{{ dialogData.cancelLabel ?? 'No' }}</button>
      <button matButton="filled" [matDialogClose]="true">{{ dialogData.confirmLabel ?? 'Yes' }}</button>
    </mat-dialog-actions>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports,
})
export class ConfirmDialogComponent {
  readonly dialogData = inject<ConfirmDialogData>(MAT_DIALOG_DATA);
}
