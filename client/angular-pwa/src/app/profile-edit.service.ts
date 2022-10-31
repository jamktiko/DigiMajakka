import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ProfileEditService {
	contactEdit: boolean = false;
	personalEdit: boolean = false;
	aboutMeEdit: boolean = false;
	addPhotoEdit: boolean = false;
	attachmentEdit: boolean = false;

	visibilityChange: Subject<boolean> = new Subject<boolean>();
	visibilityChangePersonal: Subject<boolean> = new Subject<boolean>();
	visibilityChangeAboutMe: Subject<boolean> = new Subject<boolean>();
	visibilityChangePhoto: Subject<boolean> = new Subject<boolean>();
	visibilityChangeAttachments: Subject<boolean> = new Subject<boolean>();

	constructor() {
		this.visibilityChange.subscribe((value) => {
			this.contactEdit = value;
		});
		this.visibilityChangePhoto.subscribe((value) => {
			this.addPhotoEdit = value;
		});
		this.visibilityChangePersonal.subscribe((value) => {
			this.personalEdit = value;
		});
		this.visibilityChangeAboutMe.subscribe((value) => {
			this.aboutMeEdit = value;
		});
		this.visibilityChangeAttachments.subscribe((value) => {
			this.attachmentEdit = value;
		});
	}

	toggleContactVisibility() {
		this.visibilityChange.next(!this.contactEdit);
	}

	togglePersonalVisibility() {
		this.visibilityChangePersonal.next(!this.personalEdit);
	}

	toggleAboutMeVisibility() {
		this.visibilityChangeAboutMe.next(!this.aboutMeEdit);
	}

	toggleContactVisibilityPhoto() {
		this.visibilityChangePhoto.next(!this.addPhotoEdit);
	}

	toggleAttachmentVisibility() {
		this.visibilityChangeAttachments.next(!this.attachmentEdit);
	}
}
