//Template and methods for sheet object
function perfSheet(len, width, thickness, sw, pitch, perfType, material) {
	this.len = len;
	this.width = width;
	this.thickness = thickness;
	this.sw = sw;
	this.pitch = pitch;
	this.perfType = perfType;
	this.material = material;

	//Volume Method
	this.volume = function() {
		var twoup = "2";
		return this.len * this.width * this.thickness;
	};
	//Weight Method
	this.weight = function() {
		var density = 0;
		switch (this.material) {
			case "steel":
				density = 7.9068;
				return (density * this.volume()) / 1000000;
			case "aluminum":
				density = 2.6988;
				return (density * this.volume()) / 1000000;
		}
	};
	//Open Area method
	this.openArea = function() {
		switch (this.perfType) {
			case "hex":
				return (sw * sw * 100) / (pitch * pitch);
			case "round":
				return (sw * sw * 90.89) / (pitch * pitch);
		}
	};
}

//Create the new sheet object
setPerfSheet = function() {
	//Length Input
	var l = 0;
	if ($('#mmLengthUnit:checked').length) {
		l = $('#length').val();
	} else {
		l = $('#length').val() * 25.4;
	}

	//Width Input
	var w = 0;
	if ($('#mmWidthUnit:checked').length) {
		w = $('#width').val();
	} else {
		w = $('#width').val() * 25.4;
	}

	//Material Thickness Input
	var t = 0;
	if ($('#mmThicknessUnit:checked').length) {
		t = $('#thickness').val();
	} else {
		t = $('#thickness').val() * 25.4;
	}

	//Schlüsselweite
	var s = 0;
	if ($('#mmSwUnit:checked').length) {
		s = $('#sw').val();
	} else {
		s = $('#sw').val() * 25.4;
	}

	//Pitch
	var p = 0;
	if ($('#mmPitchUnit:checked').length) {
		p = $('#pitch').val();
	} else {
		p = $('#pitch').val() * 25.4;
	}

	//Perforation Type	
	var pt = "";
	if ($('#hexagonal:checked').length) {
		pt = "hex";
	} else if ($('#round:checked').length) {
		pt = "round";
	} else {
		pt = "error";
	}

	//Material Type
	var m = "";
	if ($('#steel:checked').length) {
		m = "steel";
	} else if ($('#aluminum:checked').length) {
		m = "aluminum";
	} else {
		m = "error";
	}

	return new perfSheet(l, w, t, s, p, pt, m);
};

//Load results based on Sheet Object properties
$(document).ready(function() {
	//Sheet Name Introduction
	$("#sheetname").keyup(function() {
		$("#sheetNameResult").html($("#sheetname").val() + " has the following properties:");
	});

	//Volume Results	
	$("#length, #width, #thickness").keyup(function() {
		myPerfsheet = setPerfSheet();
		$("#volumeResult").html("Volume:  " + myPerfsheet.volume().toLocaleString('en') + " mm<sup>3</sup>");
	});

	//Weight Results
	$("#length, #width, #thickness").keyup(function() {
		myPerfsheet = setPerfSheet();
		$("#weightResult").html("Weight:  " + myPerfsheet.weight().toLocaleString('en') + " Kg");
	});

	//Open Area Results
	$("#sw, #pitch").keyup(function() {
		myPerfsheet = setPerfSheet();
		$("#openAreaResult").html("Open Area:  " + myPerfsheet.openArea() + "%");
	});

	//Peforation Type Results
	$("input[name='perfSelector']").change(function() {
		myPerfsheet = setPerfSheet();
		$("#openAreaResult").html("Open Area:  " + myPerfsheet.openArea() + "%");
	});

	//Material Type Results
	$("input[name='matSelector']").change(function() {
		myPerfsheet = setPerfSheet();
		$("#weightResult").html("Weight:  " + myPerfsheet.weight().toLocaleString('en') + " Kg");
	});

	//Unit Selection Conversion
	$("input[class ='unitSelector']").change(function() {
		myPerfsheet = setPerfSheet();
		$("#volumeResult").html("Volume:  " + myPerfsheet.volume().toLocaleString('en') + " mm<sup>3</sup>");
		$("#weightResult").html("Weight:  " + myPerfsheet.weight().toLocaleString('en') + " Kg");
		$("#openAreaResult").html("Open Area:  " + myPerfsheet.openArea() + "%");
	});

});