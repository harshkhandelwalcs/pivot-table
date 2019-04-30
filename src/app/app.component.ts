import { Component } from '@angular/core';
import { IDataOptions } from '@syncfusion/ej2-angular-pivotview';
import { DataManager } from '@syncfusion/ej2-data';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent {

	title = 'Pivot Table Demo';
	public csvData: any;
	public data: DataManager;
	public dataSource: IDataOptions;
	public width: string;
	showTable: boolean = false;
	constructor() {
		this.width = '800';
	}

	// read csv file  on upload  
	handleFileSelect(evt) {
		const files = evt.target.files;
		const file = files[0];
		const reader = new FileReader();
		reader.readAsText(file);
		reader.onload = () => {
			const csv = reader.result;
			this.csvData = this.csvToJson(csv);
			if (this.csvData) {
				this.showTable = true;
				this.dataSource = {
					data: this.csvData,
					expandAll: false
				}
			}
		};

	}

	// convert csv data to json array
	csvToJson(csv) {
		const lines = csv.split('\n');
		const result = [];
		const headers = lines[0].split(',');

		for (let i = 1; i < lines.length; i++) {
			const obj = {};
			const row = lines[i];
			let queryIdx = 0;
			let startValueIdx = 0;
			let idx = 0;
			if (row.trim() === '') { continue; }
			while (idx < row.length) {
				/* if we meet a double quote we skip until the next one */
				let c = row[idx];
				if (c === '"') {
					do { c = row[++idx]; } while (c !== '"' && idx < row.length - 1);
				}
				if (c === ',' || /* handle end of line with no comma */ idx === row.length - 1) {
					/* we've got a value */
					let value = row.substr(startValueIdx, idx - startValueIdx).trim();
					/* skip first double quote */
					if (value[0] === '"') { value = value.substr(1); }
					/* skip last comma */
					if (value[value.length - 1] === ',') { value = value.substr(0, value.length - 1); }
					/* skip last double quote */
					if (value[value.length - 1] === '"') { value = value.substr(0, value.length - 1); }
					const key = headers[queryIdx++];
					obj[key] = value;
					startValueIdx = idx + 1;
				}
				++idx;
			}
			result.push(obj);
		}
		console.log(result);
		return result;
	}

	ngOnInit(): void {

	}
}

