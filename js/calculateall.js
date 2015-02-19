//Template and methods for sheet object
function perfSheet(len, width, thickness, sw, pitch, perfType, material, volumeUnits, volumeFactor, weightUnits, weightFactor) {
	this.len = len;
	this.width = width;
	this.thickness = thickness;
	this.sw = sw;
	this.pitch = pitch;
	this.perfType = perfType;
	this.material = material;
	this.volumeUnits = volumeUnits;
	this.volumeFactor = volumeFactor;
	this.weightUnits = weightUnits;
	this.weightFactor = weightFactor;

	//Volume Method
	this.volume = function() {
		return (this.len * this.width * this.thickness) / this.volumeFactor;
	};
	//Weight Method
	this.weight = function() {
		var density = 0;
		switch (this.material) {
			case "steel":
				density = 7.9068;
				return ((density * (this.len * this.width * this.thickness)) / 1000000) * this.weightFactor;
			case "aluminum":
				density = 2.6988;
				return ((density * (this.len * this.width * this.thickness)) / 1000000) * this.weightFactor;
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

	//Metric or Imperial
	if ($('#imperial:checked').length) {
		vu = " inch<sup>3</sup>";
		vf = 16387.064;
		wu = " Lbs";
		wf = 2.20462;
	} else {
		vu = " mm<sup>3</sup>",
		vf = 1,
		wu = " Kg",
		wf = 1;
	}

	return new perfSheet(l, w, t, s, p, pt, m, vu, vf, wu, wf);
};

//Load results based on Sheet Object properties
$(document).ready(function() {
	//Modifies results based on Form inputs
	$("#sheetname, #length, #width, #thickness, #sw, #pitch").keyup(function() {
		myPerfSheet = setPerfSheet();
		//$("#sheetNameResult").html($("#sheetname").val() + " has the following properties:");
		$("#volumeResult").html("Volume:  " + myPerfSheet.volume().toLocaleString('en') + myPerfSheet.volumeUnits);
		$("#weightResult").html("Weight:  " + myPerfSheet.weight().toLocaleString('en') + myPerfSheet.weightUnits);
		$("#openAreaResult").html("Open Area:  " + myPerfSheet.openArea().toFixed(2) + "%");
	});

	//Modifies results based on radio button selection
	$("input[name='perfSelector'], input[name='matSelector'], input[class ='unitSelector'], input[name='resultUnitSelector']").change(function() {
		myPerfSheet = setPerfSheet();
		$("#volumeResult").html("Volume:  " + myPerfSheet.volume().toLocaleString('en') + myPerfSheet.volumeUnits);
		$("#weightResult").html("Weight:  " + myPerfSheet.weight().toLocaleString('en') + myPerfSheet.weightUnits);
		$("#openAreaResult").html("Open Area:  " + myPerfSheet.openArea().toFixed(2) + "%");
	});

});