/*Triangle is the shape of this polygon input field*/

/*Global variables*/
var elementSize = 600;
var margin = elementSize/6
var padding = margin/5
var sideLenght = elementSize-2*margin
var height = sideLenght*Math.sqrt(3)/2
var elementWidth = document.getElementById("chart").offsetWidth;
var svg = d3.select("#chart").append("svg")
	.attr('viewBox', "0 0 "+elementSize+" "+ elementSize)
	.attr("preserveAspectRatio", "xMidYMid meet");
var linearScaleFontSize = d3.scaleLinear()
		.domain([0,1])
		.range([20,40]);
var fontWeightScale = d3.scaleLinear()
		.domain([0,1])
		.range([100,900]);

/*Init*/
drawDimensions();
drawPolygon();
initDimensionLabels();
initCrosshair();
initSelection();

/*Interaction related state variables*/
var isSelecting = true;
var isEntered = false;
var isSelectionVisible = true;
var isConfirmed = false;

/*Interaction handlers*/
svg
.on("click", function (d){
	var coords = d3.mouse(this);
	var isOnArea = isOnTriangle(coords);
	//Is making confirmed selection
	if(isOnArea && isSelecting && isEntered && !isConfirmed){
		console.log("Valittu!");
		drawFeedback(coords);
		placeSelection(coords);
		isSelecting = false;
		isConfirmed = true;
	}
	//Reconsidering by clicking again when confirmed, results in neutralizing
	else if(isOnArea && isConfirmed){
		isSelecting = true;
		isConfirmed = false;
		drawFeedback(coords);
		setSelectionVisibilityOff();
	}
	})
.on("touchmove", function (d){
	var coords = d3.mouse(this);
	var isOnArea = isOnTriangle(coords);
	if(isOnArea && !isEntered){
		isEntered = true;
	}
	if(isOnArea && isEntered){
		drawFeedback(coords);
		placeSelection(coords);
		isSelecting = false;
	}
	})
.on("mousemove", function (d){
	var coords = d3.mouse(this);
	var isOnArea = isOnTriangle(coords);
	//First time entry
	if(isOnArea  && isSelecting && !isEntered){
		isEntered = true;
		setSelectionVisibilityOff();
	}
	//Is actively selecting
	else if(isOnArea && isSelecting && isEntered){
		drawFeedback(coords);
		placeSelection(coords);
	}
	//When returning to area and the point was made unintentionally to the corner
	else if(isOnArea && !isSelecting && isEntered && !isConfirmed){
		isSelecting = true;
		setSelectionVisibilityOff();
	}
	});

function setSelectionVisibilityOff(){
	var selection = svg.select("#selection");
	selection.attr("opacity", 0);
}

function setSelectionVisibilityOn(){
	var selection = svg.select("#selection");
	selection.attr("opacity", 1);
}

function isOnTriangle(coords){
	if(getDimension1Value(coords) <= 0 || getDimension2Value(coords) <= 0 || getDimension3Value(coords) <= 0 ){ 
		return false;
	}
	return true;
}

function drawFeedback(coords){
	updateCrosshair(coords);
	updateEmphasis(coords);
}

function placeSelection(coords){
	updateInput(coords);
	translateGroup("#selection", coords);
	setSelectionVisibilityOn();
}

function updateCrosshair(coords){
	translateGroup("#crosshair", coords);
}

function translateGroup(id, coords){
	svg.select(id)
		.attr("transform", "translate("+coords[0]+","+coords[1]+")");
}

function updateEmphasis (coords){
	updateDimensionLabels(getDimension1Value(coords), getDimension2Value(coords), getDimension3Value(coords));
}

function updateInput(coords){
	document.getElementById("dimension1").value = getDimension1Value(coords);
	document.getElementById("dimension2").value = getDimension2Value(coords);
	document.getElementById("dimension3").value = getDimension3Value(coords);
}

function drawDimensions(){
	drawDimensionPoint(getDimension1Coordinates());
	drawDimensionPoint(getDimension2Coordinates());
	drawDimensionPoint(getDimension3Coordinates());
}

function drawDimensionPoint(coords){
	svg.append("circle")
		.attr("r", 5)
		.attr("cx", coords[0])
		.attr("cy", coords[1])
		.attr("fill", "#000000");
}

function drawPolygon(){
	var d1c = getDimension1Coordinates();
	var d2c = getDimension2Coordinates();
	var d3c = getDimension3Coordinates();
	svg.append("polygon")
		.attr("points", function(d){
			return d1c[0]+","+d1c[1]
			+" "+d2c[0]+","+d2c[1]
			+" "+d3c[0]+","+d3c[1];
		})
		.attr("stroke","black")
		.attr("stroke-width",2)
		.attr("fill", "#FFFFFF");
}

function initDimensionLabels(){
	var dimension1coords = getDimension1Coordinates();
	svg.append("text")
		.attr("id", "dimension1Label")
		.attr("x", dimension1coords[0])
		.attr("y", dimension1coords[1]-padding)
		.attr("fill", "#000000")
		.attr("font-size", "20px")
		.style("text-anchor", "middle")
		.text("Suuri epätoivo");
	var dimension2coords = getDimension2Coordinates();
	svg.append("text")
		.attr("id", "dimension2Label")
		.attr("x", dimension2coords[0]+padding*2)
		.attr("y", dimension2coords[1]+padding)
		.attr("fill", "#000000")
		.attr("font-size", "20px")
		.style("text-anchor", "end")
		.style("alignment-baseline", "hanging")
		.text("Kauhu");
	var dimension3coords = getDimension3Coordinates();
	svg.append("text")
		.attr("id", "dimension3Label")
		.attr("x", dimension3coords[0]-padding*2)
		.attr("y", dimension3coords[1]+padding)
		.attr("fill", "#000000")
		.attr("font-size", "20px")
		.style("text-anchor", "start")
		.style("alignment-baseline", "hanging")
		.text("Tuskastuminen");
}

function getCrosshair(id, coords, opacity){
	var g = svg.append("g")
		.attr("id", id)
		.attr("transform", "translate("+coords[0]+","+coords[1]+")")
	g.append("circle")
		.attr("cx", 0)
		.attr("cy", 0)
		.attr("r", 5)
		.attr("opacity", opacity)
		.attr("fill", "black")
	g.append("line")
		.attr("id", "asd")
		.attr("x1", -25)
		.attr("x2", 25)
		.attr("opacity", opacity)
		.attr("stroke","black")
		.attr("stroke-width",2);
	g.append("line")
		.attr("id", "asd")
		.attr("y1", -25)
		.attr("y2", 25)
		.attr("opacity", opacity)
		.attr("stroke","black")
		.attr("stroke-width",2);
	return g;
}

function initCrosshair(){
	var coords = getPolygonMidCoords();
	getCrosshair("crosshair", coords, 0.3);
}

function initSelection(){
	var coords = getPolygonMidCoords();
	getCrosshair("selection", coords, 1);
	updateEmphasis(coords);
}

function removeSelection(){
	svg.select("#selection").remove();
}

function updateDimensionLabels(emphasis1, emphasis2, emphasis3){
	svg.select("#dimension1Label")
		.attr("font-size", calculateLabelSize(emphasis1))
		.attr("font-weight", calculateFontWeight(emphasis1));
	svg.select("#dimension2Label")
		.attr("font-size", calculateLabelSize(emphasis2))
		.attr("font-weight", calculateFontWeight(emphasis2));
	svg.select("#dimension3Label")
		.attr("font-size", calculateLabelSize(emphasis3))
		.attr("font-weight", calculateFontWeight(emphasis3));
}

function calculateLabelSize(value){
	var calc = linearScaleFontSize(value);
	var str = calc.toString();
	var fontSize = str+"px";
	return fontSize;
}

function calculateFontWeight(value){
	return fontWeightScale(value);
}

function getPolygonMidCoords(){
	return [elementSize/2, margin + sideLenght*Math.sqrt(3)/3];
}

function getTriangleCornerCoords(cornerNumber){
	if (cornerNumber == 1){ return [elementSize/2, margin] }
	if (cornerNumber == 2){ return [elementSize-margin, height+margin] }
	if (cornerNumber == 3){ return [margin, height+margin] }
	else{return [0, 0]}
}

function getDimension1Coordinates(){
	return getTriangleCornerCoords(1);
}

function getDimension2Coordinates(){
	return getTriangleCornerCoords(2);
}

function getDimension3Coordinates(){
	return getTriangleCornerCoords(3);
}

function getDimension1Value(coords){
	return getDimensionValue(coords, getDimension1Coordinates())
}

function getDimension2Value(coords){
	return getDimensionValue(coords, getDimension2Coordinates())
}

function getDimension3Value(coords){
	return getDimensionValue(coords, getDimension3Coordinates())
}

function getDimensionValue(coords, dimCoords){
	var dx = coords[0] - dimCoords[0];
	var dy = coords[1] - dimCoords[1];
	var distance = Math.sqrt(dx * dx + dy * dy)
	var mappedValue = mapDistanceToValue(distance);
	return mappedValue;
}

function mapDistanceToValue(distance){
	if (sideLenght-distance <= 0) { return 0;}
	//Gives values from [1,0[
	else { return Math.sqrt(sideLenght-distance)/Math.sqrt(sideLenght);}
}
