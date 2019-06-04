
var elementSize = 600;
var midCoords = [elementSize/2, elementSize/2];
/*Triangle is the shape of this polygon*/
var margin = elementSize/6
var padding = margin/5
var sideLenght = elementSize-2*margin
var height = sideLenght*Math.sqrt(3)/2



var elementWidth = document.getElementById("chart").offsetWidth;

var svg = d3.select("#chart").append("svg")
	.attr('viewBox', "0 0 "+elementSize+" "+ elementSize)
	.attr("preserveAspectRatio", "xMidYMid meet");


//drawBackground();
drawDimensions();
drawPolygon();
initDimensionLabels();
initCrosshair();
initSelection();

var isSelecting = true;
var isEntered = false;
var isConfirmed = false;

svg
.on("click", function (d){
	var coords = d3.mouse(this);
	var isOnArea = isOnTriangle(coords);
	//console.log(isOnArea);
	if(isSelecting && isOnArea){
		//select
		console.log("Valittu!");
		drawFeedback(coords);
		placeSelection(coords);
		isSelecting = false;
		toggleSelectionVisibility();
	}
	else{
		console.log("Ei mitään klikkailla!");
		isSelecting = true;
		isEntered = false;
		toggleSelectionVisibility();
	}
	})
.on("touchmove", function (d){
	var coords = d3.mouse(this);
	var isOnArea = isOnTriangle(coords)

	if(isOnArea && !isEntered){
		isEntered = true;
		toggleSelectionVisibility();

	}
	if(isOnArea && isEntered){
		drawFeedback(coords);
		placeSelection(coords);
		isSelecting = false;
	}
	})
.on("mousemove", function (d){
	var coords = d3.mouse(this);
	var isOnArea = isOnTriangle(coords)
	if(isOnArea && !isEntered){
		isEntered = true;
		toggleSelectionVisibility();
	}

	if(!isOnArea && isSelecting && isEntered){
		drawFeedback(coords);
		placeSelection(coords);
		toggleSelectionVisibility();
		isSelecting = false;
	}
	else if(isOnArea && !isSelecting && !isConfirmed && isEntered){
		isSelecting = true;
		toggleSelectionVisibility();
	}
	else if(isSelecting && isOnArea && isEntered){
		drawFeedback(coords);
	}
	})
;


function selectionLogic(coords){

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
	var dimension1coords = getDimension1Coordinates();
	svg.append("circle")
		.attr("r", 5)
		.attr("cx", dimension1coords[0])
		.attr("cy", dimension1coords[1])
		.attr("fill", "#000000");
	var dimension2coords = getDimension2Coordinates();
	svg.append("circle")
		.attr("r", 5)
		.attr("cx", dimension2coords[0])
		.attr("cy", dimension2coords[1])
		.attr("fill", "#000000");
	var dimension3coords = getDimension3Coordinates();
	svg.append("circle")
		.attr("r", 5)
		.attr("cx", dimension3coords[0])
		.attr("cy", dimension3coords[1])
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
		.attr("fill", "#FFFFFF")
		;
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
		.attr("stroke","black")
		.attr("stroke-width",2);
	g.append("line")
		.attr("id", "asd")
		.attr("y1", -25)
		.attr("y2", 25)
		.attr("stroke","black")
		.attr("stroke-width",2);
	return g;
}

function initCrosshair(){
	var coords = getPolygonMidCoords();
	getCrosshair("crosshair", coords, 0.5);
}

function initSelection(){
	var coords = getPolygonMidCoords();
	getCrosshair("selection", coords, 1);
}

function removeSelection(){
	svg.select("#selection").remove();
}

var isSelectionVisible = true;
function toggleSelectionVisibility(){
	var selection = svg.select("#selection");
	if(isSelectionVisible){
		selection.attr("opacity", 0)
	}
	else{
		selection.attr("opacity", 1)
	}
	isSelectionVisible = !isSelectionVisible;
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

var linearScale = d3.scaleLinear()
		.domain([0,1])
		.range([20,40]);

function calculateLabelSize(value){
	var calc = linearScale(value);
	//var calc = value * 20;
	var str = calc.toString();
	var fontSize = str+"px";
	return fontSize;
}
var fontWeightScale = d3.scaleLinear()
		.domain([0,1])
		.range([100,900]);

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
	//return sideLenght-distance;
	//return elementSize/distance;
	if (sideLenght-distance <= 0) { return 0;}
	else { return Math.sqrt(sideLenght-distance)/20;}
}

function drawBackground(){
	svg.append("rect")
		.attr("width", "100%")
		.attr("height", "100%")
		.attr("fill", "#FFFFFF");
}

