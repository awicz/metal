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
setPerfSheet = function() {
	var l = document.getElementById("length") // Length Input
	var w = document.getElementById("width"); //Width Input
	var t = document.getElementById("thickness"); //Material Thickness Input
	var s = document.getElementById("sw"); //Schlüsselweite
	var p = document.getElementById("pitch"); //Pitch
	var pt = ""; //Perforation Type	
	if ($('#hexagonal:checked').length) {
		pt = "hex"
	} else if ($('#round:checked').length) {
		pt = "round"
	} else {
		pt = "error"
	}

	var m = ""; //Material Type
	if ($('#steel:checked').length) {
		m = "steel"
	} else if ($('#aluminum:checked').length) {
		m = "aluminum"
	} else {
		m = "error"
	}

	return new perfSheet(l.value, w.value, t.value, s.value, p.value, pt, m);
}
$(document).ready(function() {
	//Sheet Name Introduction
	$("#sheetname").keyup(function() {
		$("#sheetNameResult").html($("#sheetname").val() + " has the following properties:")
	})

	//Volume Results	
	$("#length, #width, #thickness").keyup(function() {
		myPerfsheet = setPerfSheet();
		$("#volumeResult").html("Volume:  " + myPerfsheet.volume().toLocaleString('en'))
	})

	//Weight Results --Need to add state change for material type
	$("#length, #width, #thickness").keyup(function() {
		myPerfsheet = setPerfSheet();
		$("#weightResult").html("Weight:  " + myPerfsheet.weight().toLocaleString('en'))
	})

	//Open Area Results --Need to add state change for hex vs. Perf
	$("#sw, #pitch").keyup(function() {
		myPerfsheet = setPerfSheet();
		$("#openAreaResult").html("Open Area:  " + myPerfsheet.openArea() + "%")
	})

	//Peforation Type Results
	$("input[name='perfSelector']").change(function() {
		myPerfsheet = setPerfSheet();
		$("#openAreaResult").html("Open Area:  " + myPerfsheet.openArea() + "%")
	})

	//Material Type Results
	$("input[name='matSelector']").change(function() {
		myPerfsheet = setPerfSheet();
		$("#weightResult").html("Weight:  " + myPerfsheet.weight())
	})

	//Unit Selection Conversion
	$(".unitSelector").change(function() {
		if ($("label[for='" + $(this) + "']") == "mm") {
			b;
		}
	})




})