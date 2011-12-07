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
	
	//Value of selected checkbox.
	// this function doesn't work as I wanted it to work.
	// If I pick all the options it only returns the last option.
	// I want it to display all the options that are selected.
	
	function getCheckboxValue() {
		var checkboxes = document.forms[0].drawings;
			for (var i=0; i<checkboxes.length; i++) {
				if (checkboxes[i].checked){
					dwgValue = 	checkboxes[i].value;		
				}else{
					dwgValue = "No Drawings Needed!"
				};
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
		}
	
	};
	
	
	// Store Data
	
	function storeData() {
		var id				= Math.floor(Math.random()*10000001);
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
			makeItemLinks (localStorage.key(i));
		};
	};
	
	
	// Make Item Links
	
	function makeItemLinks(key) {
		var editLink = document.createElement("a");
		var editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Project";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		var deleteLink = document.createElement("a");
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Project";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
		
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
	
		
	
	//Variable defaults
	
	var projectType = [" -- Choose A Type -- ", "Site Development", "Building Envelope", "Interior Design"],
		workValue,
		dwgValue = "No Drawings Needed!"
	;
	selectType();

	
	
	//Set link & submit click Events
	
	var displayLink = $("display");
	displayLink.addEventListener("click", getData);
	var clearLink = $("clear");
	clearLink.addEventListener("click", clearLocal);
	var saveLink = $("submit");
	saveLink.addEventListener("click", storeData);

});
