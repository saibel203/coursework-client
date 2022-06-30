import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

	response: any = { dbPath: '' };
	@Output() public onUploadFinished = new EventEmitter();

	public userDetails: any;
	public userImage: any;

	constructor(public service: AuthService, private toastr: ToastrService, private http: HttpClient) { }

	ngOnInit(): void {
		this.service.getUserProfile().subscribe(
			(res: any) => {
				this.userDetails = res;
			},
			(err: any) => {
				console.log(err);
			}
		);
		this.service.getUserImage().subscribe(
			(res: any) => {
				if (!res.path.endsWith('/')) 
					this.userImage = res;
				
				else 
					this.userImage = '';
				
			},
			(err: any) => {
				console.log(err);
			}
		);
		uploadProfileImage();
	}

	onEditProfile() {
		this.service.changeProfileData().subscribe(
			(res: any) => {
				this.service.editProfileModel.reset();
				this.toastr.success('Go to section "Data"', 'Changes are successful');
				setTimeout(() =>  window.location.reload(), 1000);
			},
			(err: any) => { 
				this.toastr.error(`${err}`, "Error upload image");
			}
		);
	}

	uploadFile = (files: any) => {
		if (files.length === 0)
			return;

		let fileToUpload = <File>files[0];
		const formData = new FormData();
		formData.append('file', fileToUpload, fileToUpload.name);

		this.http.post('https://localhost:7269/api/UserProfile/Upload', formData, { reportProgress: true, observe: 'events' })
			.subscribe({
				error: (err: HttpErrorResponse) => console.log(err)
			});
	}
	
	uploadFinished = (event: any) => {
		this.response = event;
	}
}

function uploadProfileImage() {
	const drop: any = document.querySelector('.drop-container .drop'),
		input: any = document.querySelector('.drop-container .drop input'),
		text: any = document.querySelector('.drop-container .text'),
		progress: any = document.querySelector('.drop-container .progress'),
		headerProgress: any = document.getElementById('header-progress');

	let files: any = [];

	input.addEventListener('change', () => {
		drop.style.display = 'none';
		upload();
	});

	drop.addEventListener('dragover', (e: any) => {
		e.preventDefault();
		text.innerHTML = 'Release your mouse to drop.';
		drop.classList.add('active');
	});

	drop.addEventListener('dragleave', (e: any) => {
		e.preventDefault();
		text.innerHTML = 'Drag and drop your image here.';
		drop.classList.remove('active');
	});

	drop.addEventListener('drop', (e: any) => {
		e.preventDefault();
		files = e.dataTransfer.files;
		drop.style.display = 'none';
		upload();
	});

	function upload() {
		let intervalCount = 0.25;
		progress.style.display = 'block';
		progress.style.width = `${20 * intervalCount}%`;

		const interval = setInterval(() => {
			intervalCount += 0.25;
			progress.style.width = `${20 * intervalCount}%`;
			if (intervalCount == 5) {
				clearInterval(interval);
				progress.style.display = 'none';
				headerProgress.style.display = 'block';
			}
		}, 80);
	}
}
