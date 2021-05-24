const API_ENDPOINT = "http://localhost:8081";
const MEDIA_TYPE_APPLICATION_JSON = "application/json";

//----------Student--------//

function createStudent(){
	let firstName = document.getElementById('firstName').value;
	let lastName = document.getElementById('lastName').value;
	let dob = document.getElementById('dob').value;
	let contact = document.getElementById('contact').value;

	let student = {};
	student.firstName = firstName;
	student.lastName = lastName;
	student.dateOfBirth = dob;
	student.phoneNumber = contact;

	let isValidData = validateStudentDetails(student);
	const errorCodes = [400, 401, 402, 500]
	if(isValidData){
		fetch(API_ENDPOINT+"/student/create", {
			method: "POST", 
			headers: {'Content-Type': MEDIA_TYPE_APPLICATION_JSON},
			body: JSON.stringify(student)
		}).then(response => {
			if(!response.ok){
				catchError( response );
			} else {
				alert("Student added successfully !")
				fetchStudents(true);
				console.log("Success");
			}
		}).catch(catchError);
	}

}

function fetchStudents(populateTable){
	let page = 0;
	let size = 50;
	return fetch(API_ENDPOINT+"/student?page="+page+"&size="+size, {
		method: "GET"
	})
	.then(response => response.json())
	.then(data => {
		if(populateTable){
			let table = document.getElementById('student-table');
			table.innerHTML = "";
			let students = data.students;
			students.forEach(function(student){
				console.log(student);

				let tr = document.createElement('tr');
				let fntd = document.createElement('td');
				fntd.innerHTML = student.firstName;
				fntd.id = 'fname-'+student.id;
				tr.appendChild(fntd);

				let lntd = document.createElement('td');
				lntd.innerHTML = student.lastName;
				lntd.id = 'lname-'+student.id;
				tr.appendChild(lntd);

				//Edit btn	
				let editBtn = document.createElement('button');
				editBtn.dataset.id = student.id;
				editBtn.id = 'edit-button'+student.id;
				editBtn.textContent = 'Edit';
				editBtn.className = 'btn btn-primary margin-right-10 margin-left-10';
				editBtn.addEventListener('click', function(){
					console.log(this.getAttribute('data-id'))
					//alert('edit button clicked!' + btn);
					//toggleInput(this);
					editStudent(this.getAttribute('data-id'));
				}, false);	

				tr.appendChild(editBtn);

   				//Save btn
				let saveBtn = document.createElement('button');
				saveBtn.dataset.id = student.id;
				saveBtn.id = 'save-button'+student.id;
				saveBtn.textContent = 'Save';
				saveBtn.className = 'btn btn-primary margin-right-10 margin-left-10 create-student';
				saveBtn.addEventListener('click', function(){
					updateStudent(student);
					
				}, false);	

				tr.appendChild(saveBtn);	

				//Delete Button
				let delBtn = document.createElement('button');
				delBtn.dataset.id = student.id;
				delBtn.id = 'del-button';
				delBtn.textContent = 'Delete';
				delBtn.className = 'btn btn-danger';
				delBtn.addEventListener('click', function(){
					deleteStudent(this.getAttribute('data-id'));
				}, false);

				tr.appendChild(delBtn);
				table.appendChild(tr);
			})
		}
		return data;
	})
	.catch((error) => {
		catchError(error);
	});

}

function updateStudent(student){

	let fname = document.getElementById('fname-txt'+student.id).value;
	let lname = document.getElementById('lname-txt'+student.id).value;
	student.firstName = fname;
	student.lastName = lname;

	console.log(student);
	let isValidData = validateStudentDetails(student);
	const errorCodes = [400, 401, 402, 500]
	if(isValidData){
		fetch(API_ENDPOINT+"/student/update", {
			method: "PUT", 
			headers: {'Content-Type': MEDIA_TYPE_APPLICATION_JSON},
			body: JSON.stringify(student)
		}).then(response => {
			if(!response.ok){
				catchError( response );
			} else {
				alert("Student updated successfully !")
				fetchStudents(true);
				console.log("Success");
			}
		}).catch(catchError);
	}

	document.getElementById("fname-"+student.id).innerHTML=fname;
	document.getElementById("lname-"+student.id).innerHTML=lname;

	document.getElementById("edit-button"+student.id).style.display="inline-block";
	document.getElementById("save-button"+student.id).style.display="none";
}


function editStudent(no)
{
	document.getElementById("edit-button"+no).style.display="none";
	document.getElementById("save-button"+no).style.display="inline-block";
	
	let fname=document.getElementById("fname-"+no);
	var lname=document.getElementById("lname-"+no);

	let fnameData=fname.innerHTML;
	let lnameData=lname.innerHTML;
	
	fname.innerHTML="<input type='text' id='fname-txt"+no+"' value='"+fnameData+"'>";
	lname.innerHTML="<input type='text' id='lname-txt"+no+"' value='"+lnameData+"'>";

}


function deleteStudent(id){
	fetch(API_ENDPOINT+"/student/delete/"+id, {
		method: "DELETE", 
	}).then(response => {
		if(!response.ok){
			catchError( response );
		} else {
			alert("Student deleted successfully !")
			fetchStudents(true);
			console.log("Success");
		}
	}).catch(catchError);
}



function showCreateStudentForm(){
	let btnId = document.getElementById("form-create-student");
	if (btnId.style.display === "none" || btnId.style.display === "") {
		btnId.style.display = "block";
	} else {
		btnId.style.display = "none";
	}
}


function validateStudentDetails(student){
	if(student.firstName === ""){
		return alert("First name is mandatory");
	}
	if(student.firstName.length > 255){
		return alert("First name should be less than 255 characters");
	}
	if(student.lastName === ""){
		return alert("Last name is mandatory");
	}
	if(student.lastName.length > 255){
		return alert("Last name should be less than 255 characters");
	}
	if(student.dateOfBirth === ""){
		return alert("Date of birth is mandatory");
	}
	if(student.phoneNumber === ""){
		return alert("Contact is mandatory");
	}
	return true;
	
}



//----------Course--------//



function createCourse(){
	
	let courseName = document.getElementById('name').value;
	let courseDescription = document.getElementById('course-description').value;
	
	let course = {};

	course.name = courseName;
	course.description = courseDescription;
	
	let isValidData = validateCourseDetails(course);
	const errorCodes = [400, 401, 402, 500]
	if(isValidData){
		fetch(API_ENDPOINT+"/course/create", {
			method: "POST", 
			headers: {'Content-Type': MEDIA_TYPE_APPLICATION_JSON},
			body: JSON.stringify(course)
		}).then(response => {
			if(!response.ok){
				catchError( response );
			} else {
				alert("Course added successfully !")
				fetchCourses(true);
				console.log("Success");
			}
		}).catch(catchError);
	}

}


function fetchCourses(populateTable){
	let page = 0;
	let size = 50;
	return fetch(API_ENDPOINT+"/course?page="+page+"&size="+size, {
		method: "GET"
	})
	.then(response => response.json())
	.then(data => {
		if(populateTable){
			let table = document.getElementById('course-table');
			table.innerHTML = "";
			let courses = data.courses;
			courses.forEach(function(course){
				populateCourseData(table,course);
			})
		}
		return data;

	})
	.catch((error) => {
		catchError(error);
	});
}

function populateCourseData(table, course){
	console.log(course);
	let tr = document.createElement('tr');
	let coursename = document.createElement('td');
	coursename.innerHTML = course.name;
	coursename.id = 'coursename-'+course.id;
	tr.appendChild(coursename);

	let editBtn = document.createElement('button');
	editBtn.dataset.id = course.id;
	editBtn.id = 'edit-button'+course.id;
	editBtn.textContent = 'Edit';
	editBtn.className = 'btn btn-primary margin-right-10 margin-left-10';
	editBtn.addEventListener('click', function(){
		editCourse(this.getAttribute('data-id'));
	}, false);	

	tr.appendChild(editBtn);

	let saveBtn = document.createElement('button');
	saveBtn.dataset.id = course.id;
	saveBtn.id = 'save-button'+course.id;
	saveBtn.textContent = 'Save';
	saveBtn.className = 'btn btn-primary margin-right-10 margin-left-10 create-course';
	saveBtn.addEventListener('click', function(){
		updateCourse(course);
	}, false);	

	tr.appendChild(saveBtn);	

	let delBtn = document.createElement('button');
	delBtn.dataset.id = course.id;
	delBtn.id = 'del-button';
	delBtn.textContent = 'Delete';
	delBtn.className = 'btn btn-danger';
	delBtn.addEventListener('click', function(){
		deleteCourse(this.getAttribute('data-id'));
	}, false);

	tr.appendChild(delBtn);
	table.appendChild(tr);
}

function deleteCourse(id){
	fetch(API_ENDPOINT+"/course/delete/"+id, {
		method: "DELETE", 
	}).then(response => {
		if(!response.ok){
			catchError( response );
		} else {
			alert("Course deleted successfully !")
			fetchCourses(true);
			console.log("Success");
		}
	}).catch(catchError);
}

function editCourse(no)
{
	document.getElementById("edit-button"+no).style.display="none";
	document.getElementById("save-button"+no).style.display="inline-block";
	
	let cname=document.getElementById("coursename-"+no);
	let cData=cname.innerHTML;
	cname.innerHTML="<input type='text' id='cname-txt"+no+"' value='"+cData+"'>";

}

function updateCourse(course){

	let cname = document.getElementById('cname-txt'+course.id).value;
	course.name = cname;
	console.log(course);
	let isValidData = validateCourseDetails(course);
	const errorCodes = [400, 401, 402, 500]
	if(isValidData){
		fetch(API_ENDPOINT+"/course/"+course.id+"/update", {
			method: "PUT", 
			headers: {'Content-Type': MEDIA_TYPE_APPLICATION_JSON},
			body: JSON.stringify(course)
		}).then(response => {
			if(!response.ok){
				catchError( response );
			} else {
				alert("Course updated successfully !")
				fetchCourses(true);
				console.log("Success");
			}
		}).catch(catchError);
	}

	document.getElementById("coursename-"+course.id).innerHTML=cname;
	document.getElementById("edit-button"+course.id).style.display="inline-block";
	document.getElementById("save-button"+course.id).style.display="none";
}


function validateCourseDetails(course){
	let isValid = true;
	if(course.name === ""){
		alert("Course name is mandatory");
		isValid = false;
	}
	if(course.name.length > 255){
		alert("Course name should be less than 255 characters");
		isValid = false;
	}
	if(course.description === ""){
		alert("Course description is mandatory");
		isValid = false;
	}
	if(course.description.length > 255){
		alert("Course description should be less than 255 characters");
		isValid
	}
	return isValid;
	
}

function showCreateCourseForm(){
	console.log(event.target.id);
	let btnId = document.getElementById("form-create-course");
	if (btnId.style.display === "none" || btnId.style.display === "") {
		btnId.style.display = "block";
	} else {
		btnId.style.display = "none";
	}
}


//----------Subscription--------//


function loadDetails() {

	let mainContainer = document.getElementById("container");

	fetchStudents(false)
	.then((data) => {
		let selectStudent = document.createElement("select");
		selectStudent.name = "student";
		selectStudent.id = "student"
		let students = data.students;
		for (let val of students)
		{
			let option = document.createElement("option");
			option.value = val.id;
			option.text = val.firstName;
			selectStudent.appendChild(option);
		}
		let studentLabel = document.createElement("label");
		studentLabel.innerHTML = " Student : "
		studentLabel.htmlFor = "student";
		mainContainer.appendChild(studentLabel).appendChild(selectStudent);
	}).catch((error) => {
		catchError(error);
	});

	mainContainer.innerHTML += '&nbsp;&nbsp;&nbsp;&nbsp;';

	fetchCourses(false)
	.then((data) => {
		let courseSelect = document.createElement("select");
		courseSelect.name = "course";
		courseSelect.id = "course";
		let courses = data.courses;
		for (let val of courses){
			let option = document.createElement("option");
			option.value = val.id;
			option.text = val.name;
			courseSelect.appendChild(option);
		}

		let label = document.createElement("label");
		label.innerHTML = "Course : "
		label.htmlFor = "course";
		mainContainer.appendChild(label).appendChild(courseSelect);
	}).catch((error) => {
		catchError(error);
	});

	let lineBreak = document.createElement("br");
	mainContainer.appendChild(lineBreak);
}

function submitSubscription(){
	console.log("Called submitSubscription");
	let studentId = document.getElementById("student").value;
	let courseId = document.getElementById("course").value;
	let subscriptionMap = new Object();
	subscriptionMap[studentId] = courseId;
	let createSubscriptionRequest = {};
	createSubscriptionRequest.subscriptions = subscriptionMap;
	console.log(createSubscriptionRequest);

	fetch(API_ENDPOINT+"/course/subscribe", {
		method: "POST", 
		headers: {'Content-Type': MEDIA_TYPE_APPLICATION_JSON},
		body: JSON.stringify(createSubscriptionRequest)
	}).then(response => {
		if(!response.ok){
			catchError( response );
		} else {
			alert("Student subscribed to course successfully !")
				//fetchStudents(true);
			}
		}).catch(catchError);

	
}

function fetchSubscriptionReport(){
	let page = 0;
	let size = 50;
	fetch(API_ENDPOINT+"/courseSubscription/report?"+page+"&size="+size, {
		method: "GET"
	}).then(response => response.json())
	.then(data => {
		let table = document.getElementById('subscription-table');
		table.innerHTML = "";
		let subscriptions = data.subscriptions;
		subscriptions.forEach(function(subscription){
			console.log(subscription);
			let tr = document.createElement('tr');
			tr.innerHTML = '<td>' + subscription.studentName+ '</td>' +
						   '<td>' + subscription.courseName+ '</td>';
			table.appendChild(tr);
		})
	})
	.catch((error) => {
		catchError(error);
	});

}


function catchError(error){
	console.log(error)
	alert(error.message);
}