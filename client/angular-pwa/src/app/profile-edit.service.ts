import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ProfileEditService {
	contactEdit: boolean = false;
	personalEdit: boolean = false;

	visibilityChange: Subject<boolean> = new Subject<boolean>();

	constructor() {
		this.visibilityChange.subscribe((value) => {
			this.contactEdit = value;
		});
		this.visibilityChangePhoto.subscribe((value) => {
			this.addPhotoEdit = value;
		});
	}

	toggleContactVisibility() {
		this.visibilityChange.next(!this.contactEdit);
	}

	togglePersonalVisibility() {
		this.visibilityChange.next(!this.personalEdit);
	}

	addPhotoEdit: boolean = false;

	visibilityChangePhoto: Subject<boolean> = new Subject<boolean>();

	toggleContactVisibilityPhoto() {
		this.visibilityChangePhoto.next(!this.addPhotoEdit);
	}

	/*
  editVisibility(form: string) {
    switch(form) {
      case 'contacts':
        this.contactEdit = !this.contactEdit;
        break;
      case 'personal':
        this.personalEdit = !this.personalEdit;
    }
  }
  */
}
