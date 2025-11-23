import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import { ConfirmDialogComponent } from '#ui/component/confirm-dialog';
import { ConfirmDialogData } from '#ui/model';

@Injectable({ providedIn: 'root' })
export class ConfirmDialogService {
  readonly #dialog = inject(MatDialog);

  open$(config: ConfirmDialogData): Observable<boolean> {
    return this.#dialog.open(ConfirmDialogComponent, { data: config }).afterClosed();
  }
}
