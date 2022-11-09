import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
	//Depending on number 0-6 modal will not show or show
	//specific message.
	isNumber: number = 6;
	constructor() {}

	ngOnInit(): void {}
}
