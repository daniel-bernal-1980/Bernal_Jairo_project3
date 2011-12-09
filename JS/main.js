//VFW - Project 3
//Jairo Daniel Bernal
//VFW 1112
//12/08/2011		

// DOM Content Load.
window.addEventListener("DOMContentLoaded", function(){
	

	//getElementById function
	function $(x) {
		var theElement = document.getElementById(x);
		return theElement;
	};
	
	// Field Elements
	
	// Select Field for Project Type.
	function selectType() {
		var formTag = document.getElementsByTagName("form");	//array
			selectLi = $("selectType");
			makeSelect = document.createElement("select");
			makeSelect.setAttribute("id", "pType");
		 for (var i=0, j=projectType.length; i<j; i++) {
		 	var makeOption = document.createElement("option");
		 	var optText = projectType[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		};
		selectLi.appendChild(makeSelect);
	};
	
	//Value of selected radio button.
	
	function getSelectedRadio() {
		var radios = document.forms[0].models;
		 for (var i=0; i<radios.length; i++) {
		 	if(radios[i].checked){
		 		workValue = radios[i].value;
		 	};
		 };
	};
	
//  I wasn't able to translated your suggestions from the e-mail to the actual code.
//	I have to be honest and tell you that I barely pass SDI. I even had to take it twice.
//  I haven't being able to grasp the logic of the language. Is easy to follow the videos but when I do things on my own they never work.
	
	function getCheckboxValue() {
		var checkboxes = document.forms[0].drawings;
//		var valueAry = [];
			for (var i=0; i<checkboxes.length; i++) {
				if (checkboxes[i].checked){
					dwgValue = 	checkboxes[i].value;
//					valueAry.push(dwgValue);		
				}else{
					dwgValue = "No Drawings Needed!";
				};
//			valueAry.push(dwgValue);
			};
	};
	
	
	function toggleControls(n) {
		switch (n) {
			case "on":
				$("projectForm").style.display = "none";
				$("clear").style.display = "inline";
				$("display").style.display = "none";
				$("addNew").style.display = "inline";
				break;
			case "off":
				$("projectForm").style.display = "block";
				$("clear").style.display = "inline";
				$("display").style.display = "inline";
				$("addNew").style.display = "none";
				$("items").style.display = "none";
				break;
				default:
				return false;	
		};
	
	};
	
	
	// Store Data
	
	function storeData(key) {
		if (!key) {
			var id			= Math.floor(Math.random()*10000001);
		}else {
			id = key;
		};
		
		getSelectedRadio();
		getCheckboxValue();
		var item			= {};
			item.pType		= ["Project Type: ", $("pType").value];
			item.pName		= ["Project Name: ", $("pName").value];
			item.pNum		= ["Project Number: ", $("pNum").value];
			item.dName		= ["Designer Name: ", $("dName").value];
			item.dateComp	= ["Completion Date: ", $("dateComp").value];
			item.dwg		= ["Drawings: ", dwgValue];
			item.dComt		= ["Drawings Comments: ", $("dComments").value];
			item.work3d		= ["3D Work: ", workValue];
			item.wComt		= ["3D Work Comments: ", $("wComments").value];
			item.rend		= ["Renderings: ", $("rend").value];
			
		localStorage.setItem(id, JSON.stringify(item));
		alert("Project Stored!");
	};
	
	// Display Data
	
	function getData() {
		toggleControls("on");
		if (localStorage.length === 0){
			alert("There is no data in local storage.");
		};
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement("ul");
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$("items").style.display = "block";
		for(var i=0, len = localStorage.length; i<len; i++){
			var makeLi = document.createElement("li");
			var linksLi = document.createElement("li");
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = document.createElement("ul");
			makeLi.appendChild(makeSubList);
			for (var n in obj){
				var makeSubLi = document.createElement("li");
				makeSubList.appendChild(makeSubLi);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubLi.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			};
			makeItemLinks (localStorage.key(i), linksLi);
		};
	};
	
	
	// Make Item Links
	
	function makeItemLinks(key, linksLi) {
		var editLink = document.createElement("a");
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Project";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		var breakTag = document.createElement("br");
		linksLi.appendChild(breakTag);
		
		var deleteLink = document.createElement("a");
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Project";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
		
	};
	
	// Edit an item 
	
	function editItem() {
		var value 	= localStorage.getItem(this.key);
		var item 	= JSON.parse(value);
		
		toggleControls("off");
		
		$("pType").value 	= item.pType[1];
		$("pName").value 	= item.pName[1];
		$("pNum").value 	= item.pNum[1];
		$("dName").value 	= item.dName[1];
		$("dateComp").value = item.dateComp[1];
		
		
//		var checkboxes = document.forms[0].drawings;
//		for (var i=0; i<checkboxes.length; i++){
//			if (checkboxes [i].value == ){
//				checkboxes [i].setAttribute("checked", "checked");
//			}else if (checkboxes [i].value == ) {
//				checkboxes [i].setAttribute("checked", "checked");
//			}
//		};
		
		$("dComments").value = item.dComt[1];
		
// 		this portion kept breaking the code - is totally wrong.
		
//		var radios = document.forms[0].drawings;
//		for (var i=0; i<radios.length; i++){
//			if(radios[i].value == "Digital Model" && item.work3d[1] == "Digital Model"){
//				radios[i].setAttribute("checked", "checked");
//			}else if(radios[i].value == "Physical Model" && item.work3d[1] == "Physical Model"){
//				radios[i].setAttribute("checked", "checked");
//			}else if(radios[i].value == "Animation" && item.work3d[1] == "Animation"){
//				radios[i].setAttribute("checked", "checked");
//			}else if(radios[i].value == "Digital Model, Physical Model and Animation" && item.work3d[1] == "Digital Model, Physical Model and Animation"){
//				radios[i].setAttribute("checked", "checked");
//			};
		
		$("wComments").value = item.wComt[1];
		$("rend").value = item.rend[1];
		
		saveLink.removeEventListener("click", storeData);
		$("submit").value = "Edit Project";		// changes submit button to edit button
		var editSubmit = $("submit");
		editSubmit.addEventListener("click", validate);		
		editSubmit.key = this.key;
	};
	
	// Delete a Project

	function deleteItem() {
		var ask = confirm("Are you sure you want to delete this project?");
		if (ask) {
			localStorage.removeItem(this.key);
			alert("Project was deleted!");
			window.location.reload();
		}else {
			alert("Project was Not deleted.");
		};
	};


	// Clear Data
	
	function clearLocal() {
		if (localStorage.length === 0){
			alert("There is no projects.");
		}else{
			localStorage.clear();
			alert("All stored projects are deleted!");
			window.location.reload();
			return false;
		};
	};
	
	// validate stored data
	
	function validate(e) {
		var getPrjType 	= $("pType");
		var getPrjName 	= $("pName");
		var getPrjNum 	= $("pNum");
		var getDgrName 	= $("dName");
		
		errorMsg.innerHTML = "";
			getPrjType.style.border 	= "1px solid gray";
			getPrjName.style.border 	= "1px solid gray";
			getPrjNum.style.border 		= "1px solid gray";
			getDgrName.style.border 	= "1px solid gray";	
		
		var messageAry = [];
		
		// Project Type validate
		if (getPrjType.value === " -- Choose A Type -- "){
			var typeError = "Choose a Project Type.";
			getPrjType.style.border = "1px solid red";
			messageAry.push(typeError); 
		};
		
		// Project Name validate
		if (getPrjName.value === ""){
			var nameError = "Enter a project name.";
			getPrjName.style.border = "1px solid red";
			messageAry.push(nameError); 
		};
		
		// Project Number validate
		if (getPrjNum.value === ""){
			var numError = "Enter a project number.";
			getPrjNum.style.border = "1px solid red";
			messageAry.push(numError); 
		};
		
		// Project Designer validate
		if (getDgrName.value === ""){
			var dNameError = "Enter a designer name.";
			getDgrName.style.border = "1px solid red";
			messageAry.push(dNameError); 
		};
		
		// Display Errors
		if (messageAry.length >= 1) {
			for (var i = 0, j = messageAry.length; i < j; i++) {
				var txt = document.createElement("li");
				txt.innerHTML = messageAry[i];
				errorMsg.appendChild(txt);
			};
			e.preventDefault();
			return false;
		}else{
			storeData(this.key);
		};
	};
		
	
	//Variable defaults
	
	var projectType = [" -- Choose A Type -- ", "Site Development", "Building Envelope", "Interior Design"],
		workValue,
		dwgValue = "No Drawings Needed!",
		errorMsg = $("errors")
	;
	selectType();

	
	
	//Set link & submit click Events
	
	var displayLink = $("display");
	displayLink.addEventListener("click", getData);
	var clearLink = $("clear");
	clearLink.addEventListener("click", clearLocal);
	var saveLink = $("submit");
	saveLink.addEventListener("click", validate);

});
