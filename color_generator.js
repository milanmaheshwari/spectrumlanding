//variable
var ihex;
var ohsl;
var harr = [];
var sarr = [];
var larr = [];
var hues = [];
var shades = [];
var neutrals = [];
var harrbaseindex;
var sarrbaseindex;
var larrbaseindex;
var paletteset = [];
var paletteindex = [];
var customset = [];
var custompalette = [];
var huessetindex;
var shadessetindex;
var huestartindex;
var shadestartindex;
var customstartindex;
var finalpalette = [];
var uploadimgdata1;
var uploadimgdata2;
var uploadimgdata3;
var uploadimgdata4;
var uploadimgdata5;
var uploadimgdata6;
var u = 0;
var f = 0;

//elements
const loader = document.getElementById('loader');
const flex = document.getElementById('flexcontainer');
const scrollcontainer = document.getElementById('scrollcontainer');
const elementscontainer = document.getElementById('elements');
const footercontainer = document.getElementById('footer');

const shadestab = document.getElementById('shades');
const huestab = document.getElementById('hues');
const customtab = document.getElementById('custom');
const palettegapslider = document.getElementById('palettegap');
const shufflebtn = document.getElementById('paletteshuffle');
const canvas = document.getElementById('imagecanvas');
const context = canvas.getContext('2d');
const orthopaletteshades = document.getElementById('orthopaletteshades');
const orthopalettehues = document.getElementById('orthopalettehues');
const orthopalettetitle = document.getElementById('orthopalettep');
const colorpicker = document.getElementById('colorpicker');
const colorpickerlabel = document.getElementById('colorpickerlabel');
const inputcolor = document.getElementById('inputcolor');
const submitarrow = document.getElementById('submitarrow');

const home = document.getElementById('home');
const logo = document.getElementById('logo');
const mobileheaderlogo = document.getElementById('mobileheaderlogo');
const controlcontainer = document.getElementById('controlcontainer');
const harmonylistli = document.getElementsByClassName('harmonylistli');
const sliderlabel = document.getElementsByClassName('sliderlabel');
const slider = document.getElementsByClassName('slider');

const palette = document.getElementById('palette');
const gradient = document.getElementById('gradient');
const imagecontainer = document.getElementById('imagecontainer');
const illustrationcontainer = document.getElementById('illustrationcontainer');
const uicontainer = document.getElementById('uicontainer');
const gridcontainer = document.getElementById('gridcontainer');

const palettecolor1 = document.getElementById('palettecolor1');
const palettecolor2 = document.getElementById('palettecolor2');
const palettecolor3 = document.getElementById('palettecolor3');
const palettecolor4 = document.getElementById('palettecolor4');
const palettecolor5 = document.getElementById('palettecolor5');
const palettecolor6 = document.getElementById('palettecolor6');

const columninput = document.getElementsByClassName('columninput');
const column = document.getElementsByClassName('column');
const columnbasecolor = document.getElementsByClassName('columnbasecoloricon');
const columncopy = document.getElementsByClassName('columncopyicon');
const columncopytext = document.getElementsByClassName('columncopytext');
const cbciconcircle = document.getElementsByClassName('cbciconcircle');
const cbciconpath = document.getElementsByClassName('cbciconpath');
const cciconpath = document.getElementsByClassName('cciconpath');

const gridcell = document.getElementsByClassName('gridcell');
const gridbasecolor = document.getElementsByClassName('gridbasecoloricon');
const gridcopy = document.getElementsByClassName('gridcopyicon');
const gridcopytext = document.getElementsByClassName('gridcopytext');
const gridheadingp = document.getElementById('gridheadingp');

const gradientsave = document.getElementById('gradientsave');
const imagesave = document.getElementById('imagesave');
const illustrationsave = document.getElementById('illustrationsave');
const uisave = document.getElementById('uisave');
const gradientshuffle = document.getElementById('gradientshuffle');
const illustrationshuffle = document.getElementById('illustrationshuffle');
const uishuffle = document.getElementById('uishuffle');
const contenticoncircle = document.getElementsByClassName('contenticoncircle');

const themetoggle = document.getElementById('themeicon');
const themetoggle2 = document.getElementById('themeicon2');


const keyinput = document.getElementById('keyinput');
const keyinputplaceholder = document.getElementById('keyinputplaceholder');
const submitkeyarrow = document.getElementById('submitkeyarrow');

const imageLoader = document.getElementById('imageLoader');
const uploadcanvas1 = document.getElementById('uploadedimagecanvas1');
const uploadcontext1 = uploadcanvas1.getContext('2d');
const uploadedimagesave1 = document.getElementById('uploadedimagesave1');
const uploadedimagedelete1 = document.getElementById('uploadedimagedelete1');
const uploadcanvas2 = document.getElementById('uploadedimagecanvas2');
const uploadcontext2 = uploadcanvas2.getContext('2d');
const uploadedimagesave2 = document.getElementById('uploadedimagesave2');
const uploadedimagedelete2 = document.getElementById('uploadedimagedelete2');
const uploadcanvas3 = document.getElementById('uploadedimagecanvas3');
const uploadcontext3 = uploadcanvas3.getContext('2d');
const uploadedimagesave3 = document.getElementById('uploadedimagesave3');
const uploadedimagedelete3 = document.getElementById('uploadedimagedelete3');
const uploadcanvas4 = document.getElementById('uploadedimagecanvas4');
const uploadcontext4 = uploadcanvas4.getContext('2d');
const uploadedimagesave4 = document.getElementById('uploadedimagesave4');
const uploadedimagedelete4 = document.getElementById('uploadedimagedelete4');
const uploadcanvas5 = document.getElementById('uploadedimagecanvas5');
const uploadcontext5 = uploadcanvas5.getContext('2d');
const uploadedimagesave5 = document.getElementById('uploadedimagesave5');
const uploadedimagedelete5 = document.getElementById('uploadedimagedelete5');
const uploadcanvas6 = document.getElementById('uploadedimagecanvas6');
const uploadcontext6 = uploadcanvas6.getContext('2d');
const uploadedimagesave6 = document.getElementById('uploadedimagesave6');
const uploadedimagedelete6 = document.getElementById('uploadedimagedelete6');

const uploadonlytoggle = document.getElementById('uploadonlytoggle');
const uploadonlycheck = document.getElementById('uploadonlycheck');
const uploadedimagecontainer1 = document.getElementById('uploadedimagecontainer1');
const uploadedimagecontainer2 = document.getElementById('uploadedimagecontainer2');
const uploadedimagecontainer3 = document.getElementById('uploadedimagecontainer3');
const uploadedimagecontainer4 = document.getElementById('uploadedimagecontainer4');
const uploadedimagecontainer5 = document.getElementById('uploadedimagecontainer5');
const uploadedimagecontainer6 = document.getElementById('uploadedimagecontainer6');

//verification
function retrievekey(){
  var k = localStorage.getItem('storedkey') || '0';

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "post",
    headers: myHeaders,
    redirect: "follow",
  };

  var url = "https://api.gumroad.com/v2/licenses/verify?product_permalink=Dphij&license_key=" + k;

  fetch(url, requestOptions)
    .then(response => response.text())
    .then(result => verify(result, k))
    .catch(error => verify(error, k));
}

//scroll
function vwTOpx(value) {
  var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;

  var result = (x*value)/100;
  return result;
}
function vhTOpx(value) {
  var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;

  var result = (y*value)/100;
  return result;
}
function scroll(){
  $(flex).animate({
    scrollTop: vwTOpx(100)
  }, 640);
}

var p = parseInt(localStorage.getItem("repeatvalue") || 0);

//theme
var t = parseInt(localStorage.getItem("themevalue") || 1);
function toggle(){
  // if it's light -> go dark
  if(t == 0){
    t=1;
    generatecontrolpanel();
    localStorage.setItem('themevalue','1');
  }
  // if it's dark -> go light
  else if(t == 1){
    t=0;
    generatecontrolpanel();
    localStorage.setItem('themevalue','0');
  }
}
themetoggle.onclick = () => {toggle();}
themetoggle2.onclick = () => {toggle();}

//functions

function rgbtohsl(r, g, b) {

  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h /= 6;
  }

  return {h: h, s: s, l: l};
}
function hsltorgb(h, s, l) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return { r: r, g: g, b: b };
}
function rgbtohex(r, g, b) {
  r*= 255;
  r = Math.round(r);
  g*= 255;
  g = Math.round(g);
  b*= 255;
  b = Math.round(b);
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
function hsltohex(h, s, l){
  var rgb = hsltorgb(h,s,l);
  var r = rgb.r;
  var g = rgb.g;
  var b = rgb.b;
  var hex = rgbtohex(r, g, b);
  return hex;
}
function hextohsl(hex){
  var rgb = hextorgb(hex);
  var r = rgb.r;
  var g = rgb.g;
  var b = rgb.b;
  var hsl = rgbtohsl(r, g, b);
  return hsl;
}
function hextorgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16)/255,
    g: parseInt(result[2], 16)/255,
    b: parseInt(result[3], 16)/255
  } : null;
}

function shuffle(array) {
  var i = array.length,
      j = 0,
      temp;

  while (i--) {

      j = Math.floor(Math.random() * (i+1));

      // swap randomly chosen element with current element
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;

  }

  return array;
}

function randomInteger(min, max) {  
  min = Math.ceil(min); 
  max = Math.floor(max); 
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}

function goldenratio(h){
  const g = 0.618033988749895;
  var grarr = [];
  for (let i=0; i<33; i++){
    grarr[i] = h;
    h+= g;
    h%= 1;
  }
  grarr.sort(function(a, b){return a-b});
  return grarr;
}

function gradientarr(colorStart, colorEnd, colorCount){

	// The number of colors to compute
	var len = colorCount;

	//Alpha blending amount
	var alpha = 0;

	var saida = [];
	
	for (let k = 0; k < len; k++) {
		alpha += (1/len);
		
		var r = colorStart.r * alpha + (1 - alpha) * colorEnd.r;
		var g = colorStart.g * alpha + (1 - alpha) * colorEnd.g;
		var b = colorStart.b * alpha + (1 - alpha) * colorEnd.b;

		saida.push(rgbtohsl(r, g, b));
		
	}
	
	return saida;
	
}


function generategrid(){

  var x = larrbaseindex%4;
  var y = harrbaseindex%4;

  document.getElementById('grid1x8').style.backgroundColor = hues[x+28][y];
  document.getElementById('grid2x8').style.backgroundColor = hues[x+28][y+4];
  document.getElementById('grid3x8').style.backgroundColor = hues[x+28][y+8];
  document.getElementById('grid4x8').style.backgroundColor = hues[x+28][y+12];
  document.getElementById('grid5x8').style.backgroundColor = hues[x+28][y+16];
  document.getElementById('grid6x8').style.backgroundColor = hues[x+28][y+20];
  document.getElementById('grid7x8').style.backgroundColor = hues[x+28][y+24];
  document.getElementById('grid8x8').style.backgroundColor = hues[x+28][y+28];

  document.getElementById('grid1x7').style.backgroundColor = hues[x+24][y];
  document.getElementById('grid2x7').style.backgroundColor = hues[x+24][y+4];
  document.getElementById('grid3x7').style.backgroundColor = hues[x+24][y+8];
  document.getElementById('grid4x7').style.backgroundColor = hues[x+24][y+12];
  document.getElementById('grid5x7').style.backgroundColor = hues[x+24][y+16];
  document.getElementById('grid6x7').style.backgroundColor = hues[x+24][y+20];
  document.getElementById('grid7x7').style.backgroundColor = hues[x+24][y+24];
  document.getElementById('grid8x7').style.backgroundColor = hues[x+24][y+28];

  document.getElementById('grid1x6').style.backgroundColor = hues[x+20][y];
  document.getElementById('grid2x6').style.backgroundColor = hues[x+20][y+4];
  document.getElementById('grid3x6').style.backgroundColor = hues[x+20][y+8];
  document.getElementById('grid4x6').style.backgroundColor = hues[x+20][y+12];
  document.getElementById('grid5x6').style.backgroundColor = hues[x+20][y+16];
  document.getElementById('grid6x6').style.backgroundColor = hues[x+20][y+20];
  document.getElementById('grid7x6').style.backgroundColor = hues[x+20][y+24];
  document.getElementById('grid8x6').style.backgroundColor = hues[x+20][y+28];

  document.getElementById('grid1x5').style.backgroundColor = hues[x+16][y];
  document.getElementById('grid2x5').style.backgroundColor = hues[x+16][y+4];
  document.getElementById('grid3x5').style.backgroundColor = hues[x+16][y+8];
  document.getElementById('grid4x5').style.backgroundColor = hues[x+16][y+12];
  document.getElementById('grid5x5').style.backgroundColor = hues[x+16][y+16];
  document.getElementById('grid6x5').style.backgroundColor = hues[x+16][y+20];
  document.getElementById('grid7x5').style.backgroundColor = hues[x+16][y+24];
  document.getElementById('grid8x5').style.backgroundColor = hues[x+16][y+28];

  document.getElementById('grid1x4').style.backgroundColor = hues[x+12][y];
  document.getElementById('grid2x4').style.backgroundColor = hues[x+12][y+4];
  document.getElementById('grid3x4').style.backgroundColor = hues[x+12][y+8];
  document.getElementById('grid4x4').style.backgroundColor = hues[x+12][y+12];
  document.getElementById('grid5x4').style.backgroundColor = hues[x+12][y+16];
  document.getElementById('grid6x4').style.backgroundColor = hues[x+12][y+20];
  document.getElementById('grid7x4').style.backgroundColor = hues[x+12][y+24];
  document.getElementById('grid8x4').style.backgroundColor = hues[x+12][y+28];

  document.getElementById('grid1x3').style.backgroundColor = hues[x+8][y];
  document.getElementById('grid2x3').style.backgroundColor = hues[x+8][y+4];
  document.getElementById('grid3x3').style.backgroundColor = hues[x+8][y+8];
  document.getElementById('grid4x3').style.backgroundColor = hues[x+8][y+12];
  document.getElementById('grid5x3').style.backgroundColor = hues[x+8][y+16];
  document.getElementById('grid6x3').style.backgroundColor = hues[x+8][y+20];
  document.getElementById('grid7x3').style.backgroundColor = hues[x+8][y+24];
  document.getElementById('grid8x3').style.backgroundColor = hues[x+8][y+28];

  document.getElementById('grid1x2').style.backgroundColor = hues[x+4][y];
  document.getElementById('grid2x2').style.backgroundColor = hues[x+4][y+4];
  document.getElementById('grid3x2').style.backgroundColor = hues[x+4][y+8];
  document.getElementById('grid4x2').style.backgroundColor = hues[x+4][y+12];
  document.getElementById('grid5x2').style.backgroundColor = hues[x+4][y+16];
  document.getElementById('grid6x2').style.backgroundColor = hues[x+4][y+20];
  document.getElementById('grid7x2').style.backgroundColor = hues[x+4][y+24];
  document.getElementById('grid8x2').style.backgroundColor = hues[x+4][y+28];

  document.getElementById('grid1x1').style.backgroundColor = hues[x][y];
  document.getElementById('grid2x1').style.backgroundColor = hues[x][y+4];
  document.getElementById('grid3x1').style.backgroundColor = hues[x][y+8];
  document.getElementById('grid4x1').style.backgroundColor = hues[x][y+12];
  document.getElementById('grid5x1').style.backgroundColor = hues[x][y+16];
  document.getElementById('grid6x1').style.backgroundColor = hues[x][y+20];
  document.getElementById('grid7x1').style.backgroundColor = hues[x][y+24];
  document.getElementById('grid8x1').style.backgroundColor = hues[x][y+28];

  document.getElementById('grid9x1').style.backgroundColor = neutrals[x];
  document.getElementById('grid9x2').style.backgroundColor = neutrals[x+4];
  document.getElementById('grid9x3').style.backgroundColor = neutrals[x+8];
  document.getElementById('grid9x4').style.backgroundColor = neutrals[x+12];
  document.getElementById('grid9x5').style.backgroundColor = neutrals[x+16];
  document.getElementById('grid9x6').style.backgroundColor = neutrals[x+20];
  document.getElementById('grid9x7').style.backgroundColor = neutrals[x+24];
  document.getElementById('grid9x8').style.backgroundColor = neutrals[x+28];
}

function generatepalette(){
  var harmony = document.querySelector('input[name = harmony]:checked').value;
  var gap = (parseInt(palettegapslider.value)+10)/10;
  shadessetindex = orthopaletteshades.value;
  huessetindex = orthopalettehues.value;
  
  if(harmony == "shades"){
    document.getElementById('sliders').style.display = 'block';
    orthopaletteshades.style.display = 'block';
    orthopalettehues.style.display = 'none';
    orthopalettetitle.innerHTML = "HUE MAP";
    var x = shadestartindex;
    var y = gap;
    if(y==1){if(x>27){x=27;}}
    if(y==2){if(x>22){x=22;}}
    if(y==3){if(x>17){x=17;}}
    if(y==4){if(x>12){x=12;}}
    if(y==5){if(x>7){x=7;}}
    if(y==6){if(x>2){x=2;}}
    paletteset = shades[shadessetindex];
    paletteindex = [x, (x + y), (x + 2*y), (x + 3*y), (x + 4*y), (x + 5*y)];

    finalpalette = [paletteset[paletteindex[0]], paletteset[paletteindex[1]], paletteset[paletteindex[2]], paletteset[paletteindex[3]], paletteset[paletteindex[4]], paletteset[paletteindex[5]]];

    document.getElementById('palettecolor1').style.backgroundColor = finalpalette[0];
    document.getElementById('palettecolor2').style.backgroundColor = finalpalette[1];
    document.getElementById('palettecolor3').style.backgroundColor = finalpalette[2];
    document.getElementById('palettecolor4').style.backgroundColor = finalpalette[3];
    document.getElementById('palettecolor5').style.backgroundColor = finalpalette[4];
    document.getElementById('palettecolor6').style.backgroundColor = finalpalette[5];
  }

  if(harmony == "hues"){
    document.getElementById('sliders').style.display = 'block';
    orthopaletteshades.style.display = 'none';
    orthopalettehues.style.display = 'block';
    orthopalettetitle.innerHTML = "LIGHTNESS MAP";
    var x = huestartindex;
    var y = gap;
    paletteset = hues[huessetindex];
    paletteindex = [x%33, (x + y)%33, (x + 2*y)%33, (x + 3*y)%33, (x + 4*y)%33, (x + 5*y)%33];

    finalpalette = [paletteset[paletteindex[0]], paletteset[paletteindex[1]], paletteset[paletteindex[2]], paletteset[paletteindex[3]], paletteset[paletteindex[4]], paletteset[paletteindex[5]]];

    document.getElementById('palettecolor1').style.backgroundColor = finalpalette[0];
    document.getElementById('palettecolor2').style.backgroundColor = finalpalette[1];
    document.getElementById('palettecolor3').style.backgroundColor = finalpalette[2];
    document.getElementById('palettecolor4').style.backgroundColor = finalpalette[3];
    document.getElementById('palettecolor5').style.backgroundColor = finalpalette[4];
    document.getElementById('palettecolor6').style.backgroundColor = finalpalette[5];
  }

  if(harmony == "custom"){
    document.getElementById('sliders').style.display = 'none';
    customset[0] = [];
    customset[1] = [];
    customset[2] = [];
    var x = customstartindex;
    var y = (x + 4)%33;
    var z = (x + 16)%33;

    if(larrbaseindex<8){
      customset[0] = hues[larrbaseindex];
      customset[1] = hues[larrbaseindex+8];
      customset[2] = hues[larrbaseindex+16];
      custompalette = [customset[0][x], customset[1][x], customset[0][y], customset[1][y], customset[0][z], customset[1][z]];
    }
    else if(larrbaseindex>24){
      customset[0] = hues[larrbaseindex-16];
      customset[1] = hues[larrbaseindex-8];
      customset[2] = hues[larrbaseindex];
      custompalette = [customset[2][x], customset[1][x], customset[2][y], customset[1][y], customset[2][z], customset[1][z]];
    }
    else if(larrbaseindex>=8 && larrbaseindex<=24){
      customset[0] = hues[larrbaseindex+8];
      customset[1] = hues[larrbaseindex];
      customset[2] = hues[larrbaseindex-8];
      custompalette = [customset[1][x], customset[0][x], customset[1][y], customset[0][y], customset[2][z], customset[1][z]];
    }

    document.getElementById('palettecolor1').style.backgroundColor = custompalette[0];
    document.getElementById('palettecolor2').style.backgroundColor = custompalette[1];
    document.getElementById('palettecolor3').style.backgroundColor = custompalette[2];
    document.getElementById('palettecolor4').style.backgroundColor = custompalette[3];
    document.getElementById('palettecolor5').style.backgroundColor = custompalette[4];
    document.getElementById('palettecolor6').style.backgroundColor = custompalette[5];

    finalpalette = custompalette;

  }
  generatelogo();
  generatemobileheaderlogo();
  generatecontrolpanel();
  generategradient();
  generateillustration();
  generateui();
  generateimage(canvas, context);
  generateuploadimage(uploadcanvas1, uploadcontext1, uploadimgdata1);
  generateuploadimage(uploadcanvas2, uploadcontext2, uploadimgdata2);
  generateuploadimage(uploadcanvas3, uploadcontext3, uploadimgdata3);
  generateuploadimage(uploadcanvas4, uploadcontext4, uploadimgdata4);
  generateuploadimage(uploadcanvas5, uploadcontext5, uploadimgdata5);
  generateuploadimage(uploadcanvas6, uploadcontext6, uploadimgdata6);
}

function shufflepalette(){
  var harmony = document.querySelector('input[name = harmony]:checked').value;
  if(harmony == "shades"){shadestartindex = randomInteger(0,32);}
  if(harmony == "hues"){huestartindex = randomInteger(0,32);}
  if(harmony == "custom"){customstartindex = randomInteger(0,32);}
  generatepalette();
}

function generatelogo(){
  var gap = (parseInt(palettegapslider.value)+10)/10;
  var x = shadestartindex;
  var y = gap;
  if(y==1){if(x>27){x=27;}}
  if(y==2){if(x>22){x=22;}}
  if(y==3){if(x>17){x=17;}}
  if(y==4){if(x>12){x=12;}}
  if(y==5){if(x>7){x=7;}}
  if(y==6){if(x>2){x=2;}}
  let ps = shades[harrbaseindex];
  let pi = [x, (x + y), (x + 2*y), (x + 3*y), (x + 4*y), (x + 5*y)];
  var fp = [ps[pi[0]], ps[pi[1]], ps[pi[2]], ps[pi[3]], ps[pi[4]], ps[pi[5]]];

  document.getElementById('logorect1').setAttribute('fill', fp[0]);
  document.getElementById('logorect2').setAttribute('fill', fp[1]);
  document.getElementById('logorect3').setAttribute('fill', fp[2]);
  document.getElementById('logorect4').setAttribute('fill', fp[3]);
  document.getElementById('logorect5').setAttribute('fill', fp[4]);
  document.getElementById('logorect6').setAttribute('fill', fp[5]);
}
function generatemobileheaderlogo(){
  var gap = (parseInt(palettegapslider.value)+10)/10;
  var x = shadestartindex;
  var y = gap;
  if(y==1){if(x>27){x=27;}}
  if(y==2){if(x>22){x=22;}}
  if(y==3){if(x>17){x=17;}}
  if(y==4){if(x>12){x=12;}}
  if(y==5){if(x>7){x=7;}}
  if(y==6){if(x>2){x=2;}}
  let ps = shades[harrbaseindex];
  let pi = [x, (x + y), (x + 2*y), (x + 3*y), (x + 4*y), (x + 5*y)];
  var fp = [ps[pi[0]], ps[pi[1]], ps[pi[2]], ps[pi[3]], ps[pi[4]], ps[pi[5]]];

  document.getElementById('logorect1.1').setAttribute('fill', fp[0]);
  document.getElementById('logorect2.1').setAttribute('fill', fp[1]);
  document.getElementById('logorect3.1').setAttribute('fill', fp[2]);
  document.getElementById('logorect4.1').setAttribute('fill', fp[3]);
  document.getElementById('logorect5.1').setAttribute('fill', fp[4]);
  document.getElementById('logorect6.1').setAttribute('fill', fp[5]);
}

function generatecontrolpanel(){
  if(t==1){
    var darkhex = hsltohex(hextohsl(inputcolor.value).h, hextohsl(inputcolor.value).s, 0.85);
    var darkhexop = darkhex + "4D";
    document.body.style.backgroundColor = hsltohex(hextohsl(inputcolor.value).h, hextohsl(inputcolor.value).s, 0.025);
    for(let i=0; i<3; i++){
      harmonylistli[i].style.color = darkhex;
    }
    for(let i=0; i<2; i++){
      sliderlabel[i].style.color = darkhex;
    }
    for(let i=0; i<3; i++){
      slider[i].style.setProperty("--thumbBg", darkhex);
      slider[i].style.setProperty("--progressBg", darkhex);
      slider[i].style.setProperty("--trackBg", darkhexop);
    }
    gridheadingp.style.color = darkhex;
    inputcolor.style.color = darkhex;
    submitarrow.setAttribute('fill', darkhex);
    document.getElementById('themeicon').style.display = "block";
    document.getElementById('themeicon2').style.display = "none";
    //document.getElementById('themeiconpath').setAttribute('fill', darkhex);
    /*for(let i=0; i<9; i++){
      document.getElementsByClassName('themeiconpath2')[i].setAttribute('fill', darkhex);
     }*/
    document.getElementById('gridsavepath').setAttribute('fill', darkhex); 
    document.getElementById('gridsaverect').setAttribute('fill', darkhex); 

    document.getElementById('keycontainerheader').style.color = darkhex;
    document.getElementById('keycontainersubheader').style.color = darkhex;
    document.getElementById('seeallplans').style.color = darkhex;
    document.getElementById('keyinput').style.color = darkhex;
    document.getElementById('keyinputplaceholder').style.color = darkhex + "4A";
    submitkeyarrow.setAttribute('fill', darkhex);

    document.getElementById('toggletext').style.color = darkhex;
    document.getElementById('uploadtitle').style.color = darkhex;
    document.getElementById('uploadsubtitle').style.color = darkhex + "C0";
    document.getElementById('browselink').style.color = darkhex;
    for(let i=0; i<3; i++){
      document.getElementsByClassName('uploadcondn')[i].style.color = darkhex + "C0";
    }
    document.getElementById('mobileheader').style.backgroundColor = hsltohex(hextohsl(inputcolor.value).h, hextohsl(inputcolor.value).s, 0.025);
    for(let i=0; i<3; i++){
      document.getElementsByClassName('menubar')[i].style.backgroundColor = darkhex;
    }
  }
  if(t==0){
    var lighthex = hsltohex(hextohsl(inputcolor.value).h, hextohsl(inputcolor.value).s, 0.20);
    var lighthexop = lighthex + "4D";
    document.body.style.backgroundColor = hsltohex(hextohsl(inputcolor.value).h, hextohsl(inputcolor.value).s, 0.99);
    for(let i=0; i<3; i++){
      harmonylistli[i].style.color = lighthex;
    }
    for(let i=0; i<2; i++){
      sliderlabel[i].style.color = lighthex;
    }
    for(let i=0; i<3; i++){
      slider[i].style.setProperty("--thumbBg", lighthex);
      slider[i].style.setProperty("--progressBg", lighthex);
      slider[i].style.setProperty("--trackBg", lighthexop);
    }
    gridheadingp.style.color = lighthex;
    inputcolor.style.color = lighthex;
    submitarrow.setAttribute('fill', lighthex);
    document.getElementById('themeicon').style.display = "none";
    document.getElementById('themeicon2').style.display = "block";
    //document.getElementById('themeiconpath').setAttribute('fill', lighthex);
    /*for(let i=0; i<9; i++){
     document.getElementsByClassName('themeiconpath2')[i].setAttribute('fill', lighthex);
    }*/
    document.getElementById('gridsavepath').setAttribute('fill', lighthex); 
    document.getElementById('gridsaverect').setAttribute('fill', lighthex); 

    document.getElementById('keycontainerheader').style.color = lighthex;
    document.getElementById('keycontainersubheader').style.color = lighthex;
    document.getElementById('seeallplans').style.color = lighthex;
    document.getElementById('keyinput').style.color = lighthex;
    document.getElementById('keyinputplaceholder').style.color = lighthex + "4A";
    submitkeyarrow.setAttribute('fill', lighthex);

    document.getElementById('toggletext').style.color = lighthex;
    document.getElementById('uploadtitle').style.color = lighthex;
    document.getElementById('uploadsubtitle').style.color = lighthex + "C0";
    document.getElementById('browselink').style.color = lighthex;
    for(let i=0; i<3; i++){
      document.getElementsByClassName('uploadcondn')[i].style.color = lighthex + "C0";
    }
    document.getElementById('mobileheader').style.backgroundColor = hsltohex(hextohsl(inputcolor.value).h, hextohsl(inputcolor.value).s, 0.99);
    for(let i=0; i<3; i++){
      document.getElementsByClassName('menubar')[i].style.backgroundColor = lighthex;
    }
  }
  document.getElementById('harmonylistcontainer').style.backgroundColor = inputcolor.value + "4D";
  document.getElementById('sliders').style.backgroundColor = inputcolor.value + "4D";
  inputcolor.style.borderColor = inputcolor.value + "4D";
  document.getElementById('themeiconcircle').setAttribute('fill',inputcolor.value); 
  document.getElementById('themeiconcircle2').setAttribute('fill',inputcolor.value); 
  document.getElementById('bmciconcircle').setAttribute('fill',inputcolor.value);

  document.getElementById('keycontainer').style.borderColor = inputcolor.value + "4D";
  document.getElementById('uploadgif').style.backgroundColor = inputcolor.value + "4D";
  document.getElementById('getuploadaccess').style.backgroundColor = inputcolor.value;
  document.getElementById('getuploadaccess').style.borderColor = inputcolor.value;
  document.getElementById('seeallplans').style.borderColor = inputcolor.value;
  document.getElementById('keyinput').style.borderColor = inputcolor.value + "4D";

  document.getElementById('uploadcontainer').style.borderColor = inputcolor.value + "4D";
  document.getElementById('uploadonlytoggle').style.backgroundColor = inputcolor.value + "4D";
  document.getElementById('toggleslider').style.backgroundColor = inputcolor.value + "7E";
  document.getElementById('uploadsvgpath').setAttribute('fill', inputcolor.value);

  for(let i=0; i<6; i++){
    columninput[i].value = finalpalette[i];
    if(hextohsl(columninput[i].value).l > 0.6){
      columninput[i].style.color = "#0000004D";
      columninput[i].style.borderColor = "#0000004D";
      cbciconcircle[i].setAttribute('stroke', "#000000");
      cbciconpath[i].setAttribute('fill', "#000000");
      cciconpath[i].setAttribute('fill', "#000000");
      columncopytext[i].style.color = "#000000CC";

      columninput[i].onfocus = () => {
        columninput[i].style.color = "#000000CC";
        columninput[i].style.borderColor = "#000000CC";
      }
      columninput[i].onblur = () => {
        columninput[i].style.color = "#0000004D";
        columninput[i].style.borderColor = "#0000004D";
      }
    }else{
      columninput[i].style.color = "#FFFFFF4D";
      columninput[i].style.borderColor = "#FFFFFF4D";
      cbciconcircle[i].setAttribute('stroke', "#FFFFFF");
      cbciconpath[i].setAttribute('fill', "#FFFFFF");
      cciconpath[i].setAttribute('fill', "#FFFFFF");
      columncopytext[i].style.color = "#FFFFFFCC";

      columninput[i].onfocus = () => {
        columninput[i].style.color = "#FFFFFFCC";
        columninput[i].style.borderColor = "#FFFFFFCC";
      }
      columninput[i].onblur = () => {
        columninput[i].style.color = "#FFFFFF4D";
        columninput[i].style.borderColor = "#FFFFFF4D";
      }
    }
  }
  for(let i=0; i<36; i++){
    gridcopytext[i].style.color = "#000000CC";
  }
  for(let i=36; i<72; i++){
    gridcopytext[i].style.color = "#FFFFFFCC";
  }
}

[inputcolor].forEach(item => {
  item.onfocus = () => {
    item.style.borderColor = inputcolor.value;
  }
  item.onblur = () => {
    item.style.borderColor = inputcolor.value + "4D";
  }
})
keyinput.onfocus = () => {
  keyinputplaceholder.style.display = "none";
  keyinput.style.borderColor = inputcolor.value;
  f=1;
}
keyinput.onblur = () => {
  keyinput.style.borderColor = inputcolor.value + "4D";
  f=0;
  if(keyinput.value == ""){
    keyinputplaceholder.style.display = "block";
  }else{
    keyinputplaceholder.style.display = "none";
  }
}
document.getElementById('uploadcontainer').onmouseover = () => {
  document.getElementById('uploadcontainer').style.borderColor = inputcolor.value;
}
document.getElementById('uploadcontainer').onmouseout = () => {
  document.getElementById('uploadcontainer').style.borderColor = inputcolor.value + "4D"; 
}

function generategradient(){
  //var gradientpalette = shuffle(finalpalette);
  var gradientpalette = finalpalette;
  document.getElementById('gradientrectangle').setAttribute('fill',gradientpalette[0]);
  document.getElementById('gradientcircle1').setAttribute('fill',gradientpalette[1]);
  document.getElementById('gradientcircle2').setAttribute('fill',gradientpalette[2]);
  document.getElementById('gradientcircle3').setAttribute('fill',gradientpalette[3]);
  document.getElementById('gradientcircle4').setAttribute('fill',gradientpalette[4]);
  document.getElementById('gradientcircle5').setAttribute('fill',gradientpalette[5]);
}
function shufflegradient(){
  var gradientpalette = shuffle(finalpalette);
  document.getElementById('gradientrectangle').setAttribute('fill',gradientpalette[0]);
  document.getElementById('gradientcircle1').setAttribute('fill',gradientpalette[1]);
  document.getElementById('gradientcircle2').setAttribute('fill',gradientpalette[2]);
  document.getElementById('gradientcircle3').setAttribute('fill',gradientpalette[3]);
  document.getElementById('gradientcircle4').setAttribute('fill',gradientpalette[4]);
  document.getElementById('gradientcircle5').setAttribute('fill',gradientpalette[5]);
}

function drawimage(cvs, ctx){
  cvs.width = 676;
  cvs.height = 896;
  var sourceimage = new Image();
  //sourceimage.crossOrigin = "Anonymous";
  sourceimage.src = 'building.png';
  ctx.drawImage(sourceimage, 0, 0, cvs.width, cvs.height);
}
function drawuploadimage(cvs, ctx, idata){
  cvs.width = 800;
  cvs.height = 800;
  ctx.putImageData(idata, 0, 0);
}
function generateimage(cvs, ctx){

  ctx.clearRect(0, 0, cvs.width, cvs.height);
  drawimage(cvs, ctx);
  
  var imageData = ctx.getImageData(0, 0, cvs.width, cvs.height);
  var data = imageData.data;

  var harmony = document.querySelector('input[name = harmony]:checked').value;

  var hslpixels = [];
  for (var i = 0; i < data.length; i+= 4) {
    hslpixels[i/4] = rgbtohsl(data[i]/255, data[i+1]/255, data[i+2]/255);
  }
  var hslfinalpalette = [];
  for (var i = 0; i < finalpalette.length; i++) {
    hslfinalpalette[i] = hextohsl(finalpalette[i]);
  }

  var hfinalpalette = [];
  for (var i = 0; i < hslfinalpalette.length; i++) {
    hfinalpalette[i] = hslfinalpalette[i].h;
  }
  hfinalpalette.sort(function(a, b){return a-b});

  var sfinalpalette = [];
  for (var i = 0; i < hslfinalpalette.length; i++) {
    sfinalpalette[i] = hslfinalpalette[i].s;
  }
  sfinalpalette.sort(function(a, b){return a-b});

  var lfinalpalette = [];
  for (var i = 0; i < hslfinalpalette.length; i++) {
    lfinalpalette[i] = hslfinalpalette[i].l;
  }
  lfinalpalette.sort(function(a, b){return a-b});
  
  var avgpixell = 0;
  for (var i = 0; i < hslpixels.length; i++) {
    avgpixell += hslpixels[i].l;
  }
  avgpixell /= hslpixels.length;

  var avgpalettel = 0;
  for (var i = 0; i < hslfinalpalette.length; i++) {
    avgpalettel += hslfinalpalette[i].l;
  }
  avgpalettel /= hslfinalpalette.length;

  var r = avgpalettel/avgpixell;

  var avgpalettes = 0;
  for (var i = 0; i < hslfinalpalette.length; i++) {
    avgpalettes += hslfinalpalette[i].s;
  }
  avgpalettes /= hslfinalpalette.length;
  
  var avgpixels = 0;
  for (var i = 0; i < hslpixels.length; i++) {
    avgpixels += hslpixels[i].s;
  }
  avgpixels /= hslpixels.length;
  
  var s = avgpalettes/avgpixels;

  for (var i = 0; i < hslpixels.length; i++) {
    hslpixels[i].h *= (hfinalpalette[5] - hfinalpalette[0]);
    hslpixels[i].h += hfinalpalette[0];
    if(hslpixels[i].h <= (hfinalpalette[0] + hfinalpalette[1])/2){hslpixels[i].h = hfinalpalette[0];}
    else if((hfinalpalette[0] + hfinalpalette[1])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[1] + hfinalpalette[2])/2){hslpixels[i].h = hfinalpalette[1];}
    else if((hfinalpalette[1] + hfinalpalette[2])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[2] + hfinalpalette[3])/2){hslpixels[i].h = hfinalpalette[2];}
    else if((hfinalpalette[2] + hfinalpalette[3])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[3] + hfinalpalette[4])/2){hslpixels[i].h = hfinalpalette[3];}
    else if((hfinalpalette[3] + hfinalpalette[4])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[4] + hfinalpalette[5])/2){hslpixels[i].h = hfinalpalette[4];}
    else if((hfinalpalette[4] + hfinalpalette[5])/2 < hslpixels[i].h && hslpixels[i].h <= hfinalpalette[5]){hslpixels[i].h = hfinalpalette[5];}
    hslpixels[i].s *= s;
    hslpixels[i].l *=  r;
  }

  for (var i = 0; i < data.length; i+= 4) {
    var rgb = hsltorgb(hslpixels[i/4].h, hslpixels[i/4].s, hslpixels[i/4].l);
    data[i] = Math.round(rgb.r*255);
    data[i+1] = Math.round(rgb.g*255);
    data[i+2] = Math.round(rgb.b*255);
  }

  ctx.putImageData(imageData, 0, 0);
}

/*function generateuploadimage(cvs, ctx, imgdata){

  ctx.clearRect(0, 0, cvs.width, cvs.height);
  drawuploadimage(cvs, ctx, imgdata);
  
  var imageData = ctx.getImageData(0, 0, cvs.width, cvs.height);
  var data = imageData.data;

  var harmony = document.querySelector('input[name = harmony]:checked').value;

  var hslpixels = [];
  for (var i = 0; i < data.length; i+= 4) {
    hslpixels[i/4] = rgbtohsl(data[i]/255, data[i+1]/255, data[i+2]/255);
  }
  var hslfinalpalette = [];
  for (var i = 0; i < finalpalette.length; i++) {
    hslfinalpalette[i] = hextohsl(finalpalette[i]);
  }
  
  var avgpixell = 0;
  for (var i = 0; i < hslpixels.length; i++) {
    avgpixell += hslpixels[i].l;
  }
  avgpixell /= hslpixels.length;

  var avgpalettel = 0;
  for (var i = 0; i < hslfinalpalette.length; i++) {
    avgpalettel += hslfinalpalette[i].l;
  }
  avgpalettel /= hslfinalpalette.length;

  var r = avgpalettel/avgpixell;

  var hfinalpalette = [];
  for (var i = 0; i < hslfinalpalette.length; i++) {
    hfinalpalette[i] = hslfinalpalette[i].h;
  }
  hfinalpalette.sort(function(a, b){return a-b});

  var avgpalettes = 0;
  for (var i = 0; i < hslfinalpalette.length; i++) {
    avgpalettes += hslfinalpalette[i].s;
  }
  avgpalettes /= hslfinalpalette.length;
  
  var avgpixels = 0;
  for (var i = 0; i < hslpixels.length; i++) {
    avgpixels += hslpixels[i].s;
  }
  avgpixels /= hslpixels.length;
  
  var s = avgpalettes/avgpixels;

  if(harmony == "shades"){
    for (var i = 0; i < hslpixels.length; i++) {
      hslpixels[i].h *= (hfinalpalette[5] - hfinalpalette[0]);
      hslpixels[i].h += hfinalpalette[0];
      if(hslpixels[i].h <= (hfinalpalette[0] + hfinalpalette[1])/2){hslpixels[i].h = hfinalpalette[0];}
      else if((hfinalpalette[0] + hfinalpalette[1])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[1] + hfinalpalette[2])/2){hslpixels[i].h = hfinalpalette[1];}
      else if((hfinalpalette[1] + hfinalpalette[2])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[2] + hfinalpalette[3])/2){hslpixels[i].h = hfinalpalette[2];}
      else if((hfinalpalette[2] + hfinalpalette[3])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[3] + hfinalpalette[4])/2){hslpixels[i].h = hfinalpalette[3];}
      else if((hfinalpalette[3] + hfinalpalette[4])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[4] + hfinalpalette[5])/2){hslpixels[i].h = hfinalpalette[4];}
      else if((hfinalpalette[4] + hfinalpalette[5])/2 < hslpixels[i].h && hslpixels[i].h <= hfinalpalette[5]){hslpixels[i].h = hfinalpalette[5];}
      hslpixels[i].s *= s;
      hslpixels[i].l *=  r;
    }
  }
  if(harmony == "hues"){
    if(hfinalpalette[0] >= (1 - hfinalpalette[5])){
      var seavg = hfinalpalette[0] - ((hfinalpalette[0] + (1 - hfinalpalette[5]))/2);
      for (var i = 0; i < hslpixels.length; i++) {
        if(0 <= hslpixels[i].h && hslpixels[i].h <= seavg){hslpixels[i].h = hfinalpalette[5];}
        else if(seavg < hslpixels[i].h <= (hfinalpalette[0] + hfinalpalette[1])/2){hslpixels[i].h = hfinalpalette[0];}
        else if((hfinalpalette[0] + hfinalpalette[1])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[1] + hfinalpalette[2])/2){hslpixels[i].h = hfinalpalette[1];}
        else if((hfinalpalette[1] + hfinalpalette[2])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[2] + hfinalpalette[3])/2){hslpixels[i].h = hfinalpalette[2];}
        else if((hfinalpalette[2] + hfinalpalette[3])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[3] + hfinalpalette[4])/2){hslpixels[i].h = hfinalpalette[3];}
        else if((hfinalpalette[3] + hfinalpalette[4])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[4] + hfinalpalette[5])/2){hslpixels[i].h = hfinalpalette[4];}
        else if((hfinalpalette[4] + hfinalpalette[5])/2 < hslpixels[i].h && hslpixels[i].h <= 1){hslpixels[i].h = hfinalpalette[5];}

        hslpixels[i].s *= s;
        hslpixels[i].l *= r;
      }
      console.log(1);
    } 
    if(hfinalpalette[0] < (1 - hfinalpalette[5])){
      var seavg = hfinalpalette[5] + ((hfinalpalette[0] + (1 - hfinalpalette[5]))/2);
      for (var i = 0; i < hslpixels.length; i++) {
        if(0 <= hslpixels[i].h <= (hfinalpalette[0] + hfinalpalette[1])/2){hslpixels[i].h = hfinalpalette[0];}
        else if((hfinalpalette[0] + hfinalpalette[1])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[1] + hfinalpalette[2])/2){hslpixels[i].h = hfinalpalette[1];}
        else if((hfinalpalette[1] + hfinalpalette[2])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[2] + hfinalpalette[3])/2){hslpixels[i].h = hfinalpalette[2];}
        else if((hfinalpalette[2] + hfinalpalette[3])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[3] + hfinalpalette[4])/2){hslpixels[i].h = hfinalpalette[3];}
        else if((hfinalpalette[3] + hfinalpalette[4])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[4] + hfinalpalette[5])/2){hslpixels[i].h = hfinalpalette[4];}
        else if((hfinalpalette[4] + hfinalpalette[5])/2 < hslpixels[i].h && hslpixels[i].h <= seavg){hslpixels[i].h = hfinalpalette[5];}
        else if(seavg < hslpixels[i].h && hslpixels[i].h <= 1){hslpixels[i].h = hfinalpalette[0];}

        hslpixels[i].s *= s;
        hslpixels[i].l *= r;
      }
      console.log(2);
    }
    for (var i = 0; i < hslpixels.length; i++) {
     hslpixels[i].h *= (hfinalpalette[5] - hfinalpalette[0]);
     hslpixels[i].h += hfinalpalette[0];
     if(hslpixels[i].h <= (hfinalpalette[0] + hfinalpalette[1])/2){hslpixels[i].h = hfinalpalette[0];}
     else if((hfinalpalette[0] + hfinalpalette[1])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[1] + hfinalpalette[2])/2){hslpixels[i].h = hfinalpalette[1];}
     else if((hfinalpalette[1] + hfinalpalette[2])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[2] + hfinalpalette[3])/2){hslpixels[i].h = hfinalpalette[2];}
     else if((hfinalpalette[2] + hfinalpalette[3])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[3] + hfinalpalette[4])/2){hslpixels[i].h = hfinalpalette[3];}
     else if((hfinalpalette[3] + hfinalpalette[4])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[4] + hfinalpalette[5])/2){hslpixels[i].h = hfinalpalette[4];}
     else if((hfinalpalette[4] + hfinalpalette[5])/2 < hslpixels[i].h && hslpixels[i].h <= hfinalpalette[5]){hslpixels[i].h = hfinalpalette[5];}
     hslpixels[i].s *= s;
     hslpixels[i].l *= r;
   }
  }
  if(harmony == "custom"){
    for (var i = 0; i < hslpixels.length; i++) {
      hslpixels[i].h *= (hfinalpalette[5] - hfinalpalette[0]);
      hslpixels[i].h += hfinalpalette[0];
      if(hslpixels[i].h <= (hfinalpalette[0] + hfinalpalette[1])/2){hslpixels[i].h = hfinalpalette[0];}
      else if((hfinalpalette[0] + hfinalpalette[1])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[1] + hfinalpalette[2])/2){hslpixels[i].h = hfinalpalette[1];}
      else if((hfinalpalette[1] + hfinalpalette[2])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[2] + hfinalpalette[3])/2){hslpixels[i].h = hfinalpalette[2];}
      else if((hfinalpalette[2] + hfinalpalette[3])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[3] + hfinalpalette[4])/2){hslpixels[i].h = hfinalpalette[3];}
      else if((hfinalpalette[3] + hfinalpalette[4])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[4] + hfinalpalette[5])/2){hslpixels[i].h = hfinalpalette[4];}
      else if((hfinalpalette[4] + hfinalpalette[5])/2 < hslpixels[i].h && hslpixels[i].h <= hfinalpalette[5]){hslpixels[i].h = hfinalpalette[5];}
      hslpixels[i].s *= s;
      hslpixels[i].l *= r;
    }
  }

  for (var i = 0; i < data.length; i+= 4) {
    var rgb = hsltorgb(hslpixels[i/4].h, hslpixels[i/4].s, hslpixels[i/4].l);
    data[i] = Math.round(rgb.r*255);
    data[i+1] = Math.round(rgb.g*255);
    data[i+2] = Math.round(rgb.b*255);
  }

  ctx.putImageData(imageData, 0, 0);
}*/

/*function generateuploadimage(cvs, ctx, imgdata){

  ctx.clearRect(0, 0, cvs.width, cvs.height);
  drawuploadimage(cvs, ctx, imgdata);
  
  var imageData = ctx.getImageData(0, 0, cvs.width, cvs.height);
  var data = imageData.data;

  var harmony = document.querySelector('input[name = harmony]:checked').value;

  var hslpixels = [];
  for (var i = 0; i < data.length; i+= 4) {
    hslpixels[i/4] = rgbtohsl(data[i]/255, data[i+1]/255, data[i+2]/255);
  }
  var hslfinalpalette = [];
  for (var i = 0; i < finalpalette.length; i++) {
    hslfinalpalette[i] = hextohsl(finalpalette[i]);
  }

  var q = 60;

  var rgbfinalpalette = [];
  for (var i = 0; i < finalpalette.length; i++) {
    rgbfinalpalette[i] = hextorgb(finalpalette[i]);
  }
  var gradientarr01 = gradientarr(rgbfinalpalette[0], rgbfinalpalette[1], q);
  var gradientarr12 = gradientarr(rgbfinalpalette[1], rgbfinalpalette[2], q);
  var gradientarr23 = gradientarr(rgbfinalpalette[2], rgbfinalpalette[3], q);
  var gradientarr34 = gradientarr(rgbfinalpalette[3], rgbfinalpalette[4], q);
  var gradientarr45 = gradientarr(rgbfinalpalette[4], rgbfinalpalette[5], q);
  var gradientarr50 = gradientarr(rgbfinalpalette[5], rgbfinalpalette[0], q);

  var gradientangles01 = [];
  gradientangles01[0] = (q/2)+1;
  for(let i=1; i<q; i++){
    gradientangles01[i] = gradientangles01[i-1] + 1;
  }
  var gradientangles12 = [];
  gradientangles12[0] = (q/2)+q+1;
  for(let i=1; i<q; i++){
    gradientangles12[i] = gradientangles12[i-1] + 1;
  }
  var gradientangles23 = [];
  gradientangles23[0] = (q/2)+(2*q)+1;
  for(let i=1; i<q; i++){
    gradientangles23[i] = gradientangles23[i-1] + 1;
  }
  var gradientangles34 = [];
  gradientangles34[0] = (q/2)+(3*q)+1;
  for(let i=1; i<q; i++){
    gradientangles34[i] = gradientangles34[i-1] + 1;
  }
  var gradientangles45 = [];
  gradientangles45[0] = (q/2)+(4*q)+1;
  for(let i=1; i<q; i++){
    gradientangles45[i] = gradientangles45[i-1] + 1;
  }
  var gradientangles50 = [];
  gradientangles50[0] = (q/2)+(5*q)+1;
  for(let i=1; i<q/2; i++){
    gradientangles50[i] = gradientangles50[i-1] + 1;
  }
  gradientangles50[q/2] = 1;
  for(let i=(q/2)+1; i<q; i++){
    gradientangles50[i] = gradientangles50[i-1] + 1;
  }

  var avgpixell = 0;
  for (var i = 0; i < hslpixels.length; i++) {
    avgpixell += hslpixels[i].l;
  }
  avgpixell /= hslpixels.length;

  var avgpalettel = 0;
  for (var i = 0; i < hslfinalpalette.length; i++) {
    avgpalettel += hslfinalpalette[i].l;
  }
  avgpalettel /= hslfinalpalette.length;

  var r = avgpalettel/avgpixell;

  var hfinalpalette = [];
  for (var i = 0; i < hslfinalpalette.length; i++) {
    hfinalpalette[i] = hslfinalpalette[i].h;
  }
  hfinalpalette.sort(function(a, b){return a-b});

  var avgpalettes = 0;
  for (var i = 0; i < hslfinalpalette.length; i++) {
    avgpalettes += hslfinalpalette[i].s;
  }
  avgpalettes /= hslfinalpalette.length;
  
  var avgpixels = 0;
  for (var i = 0; i < hslpixels.length; i++) {
    avgpixels += hslpixels[i].s;
  }
  avgpixels /= hslpixels.length;
  
  var s = avgpalettes/avgpixels;

  if(harmony == "shades"){
    for (var i = 0; i < hslpixels.length; i++) {
      hslpixels[i].h *= (hfinalpalette[5] - hfinalpalette[0]);
      hslpixels[i].h += hfinalpalette[0];
      if(hslpixels[i].h <= (hfinalpalette[0] + hfinalpalette[1])/2){hslpixels[i].h = hfinalpalette[0];}
      else if((hfinalpalette[0] + hfinalpalette[1])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[1] + hfinalpalette[2])/2){hslpixels[i].h = hfinalpalette[1];}
      else if((hfinalpalette[1] + hfinalpalette[2])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[2] + hfinalpalette[3])/2){hslpixels[i].h = hfinalpalette[2];}
      else if((hfinalpalette[2] + hfinalpalette[3])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[3] + hfinalpalette[4])/2){hslpixels[i].h = hfinalpalette[3];}
      else if((hfinalpalette[3] + hfinalpalette[4])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[4] + hfinalpalette[5])/2){hslpixels[i].h = hfinalpalette[4];}
      else if((hfinalpalette[4] + hfinalpalette[5])/2 < hslpixels[i].h && hslpixels[i].h <= hfinalpalette[5]){hslpixels[i].h = hfinalpalette[5];}
      hslpixels[i].s *= s;
      hslpixels[i].l *=  r;
    }
  }
  if(harmony == "hues"){
    for (var i = 0; i < hslpixels.length; i++) {
      var pangle = (hslpixels[i].h)*360;
      if(pangle >= 0 && pangle <= 0.5*q){
        for(let j=gradientangles50.length/2; j<gradientangles50.length-1; j++){
          if(gradientangles50[j] < pangle <= gradientangles50[j+1]){
            if(pangle >= (gradientangles50[j]+gradientangles50[j+1])/2){pangle = gradientangles50[j+1];}
            else if(pangle < (gradientangles50[j]+gradientangles50[j+1])/2){pangle = gradientangles50[j];}
          }
        }
        hslpixels[i].h = gradientarr50[pangle+(q/2 - 1)].h;
      }
      else if(pangle > 0.5*q && pangle <= 1.5*q){
        for(let j=0; j<gradientangles01.length-1; j++){
          if(gradientangles01[j] < pangle <= gradientangles01[j+1]){
            if(pangle >= (gradientangles01[j]+gradientangles01[j+1])/2){pangle = gradientangles01[j+1];}
            else if(pangle < (gradientangles01[j]+gradientangles01[j+1])/2){pangle = gradientangles01[j];}
          }
        }
        hslpixels[i].h = gradientarr01[pangle-(q/2 + 1)].h;
      }
      else if(pangle > 1.5*q && pangle <= 2.5*q){
        for(let j=0; j<gradientangles12.length-1; j++){
          if(gradientangles12[j] < pangle <= gradientangles12[j+1]){
            if(pangle >= (gradientangles12[j]+gradientangles12[j+1])/2){pangle = gradientangles12[j+1];}
            else if(pangle < (gradientangles12[j]+gradientangles12[j+1])/2){pangle = gradientangles12[j];}
          }
        }
        hslpixels[i].h = gradientarr12[pangle-(1.5*q + 1)].h;
      }
      else if(pangle > 2.5*q && pangle <= 3.5*q){
        for(let j=0; j<gradientangles23.length-1; j++){
          if(gradientangles23[j] < pangle <= gradientangles23[j+1]){
            if(pangle >= (gradientangles23[j]+gradientangles23[j+1])/2){pangle = gradientangles23[j+1];}
            else if(pangle < (gradientangles23[j]+gradientangles23[j+1])/2){pangle = gradientangles23[j];}
          }
        }
        hslpixels[i].h = gradientarr23[pangle-(2.5*q + 1)].h;
      }
      else if(pangle > 3.5*q && pangle <= 4.5*q){
        for(let j=0; j<gradientangles34.length-1; j++){
          if(gradientangles34[j] < pangle <= gradientangles34[j+1]){
            if(pangle >= (gradientangles34[j]+gradientangles34[j+1])/2){pangle = gradientangles34[j+1];}
            else if(pangle < (gradientangles34[j]+gradientangles34[j+1])/2){pangle = gradientangles34[j];}
          }
        }
        hslpixels[i].h = gradientarr34[pangle-(3.5*q + 1)].h;
      }
      else if(pangle > 4.5*q && pangle <= 5.5*q){
        for(let j=0; j<gradientangles45.length-1; j++){
          if(gradientangles45[j] < pangle <= gradientangles45[j+1]){
            if(pangle >= (gradientangles45[j]+gradientangles45[j+1])/2){pangle = gradientangles45[j+1];}
            else if(pangle < (gradientangles45[j]+gradientangles45[j+1])/2){pangle = gradientangles45[j];}
          }
        }
        hslpixels[i].h = gradientarr45[pangle-(4.5*q + 1)].h;
      }
      else if(pangle > 5.5*q && pangle <= 6*q){
        for(let j=0; j<(gradientangles50.length/2)-1; j++){
          if(gradientangles50[j] < pangle <= gradientangles50[j+1]){
            if(pangle >= (gradientangles50[j]+gradientangles50[j+1])/2){pangle = gradientangles50[j+1];}
            else if(pangle < (gradientangles50[j]+gradientangles50[j+1])/2){pangle = gradientangles50[j];}
          }
        }
        hslpixels[i].h = gradientarr50[pangle-(5.5*q + 1)].h;
      }

      hslpixels[i].s *= s;
      hslpixels[i].l *= r;
    }
  }
  if(harmony == "custom"){
    for (var i = 0; i < hslpixels.length; i++) {
      hslpixels[i].h *= (hfinalpalette[5] - hfinalpalette[0]);
      hslpixels[i].h += hfinalpalette[0];
      if(hslpixels[i].h <= (hfinalpalette[0] + hfinalpalette[1])/2){hslpixels[i].h = hfinalpalette[0];}
      else if((hfinalpalette[0] + hfinalpalette[1])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[1] + hfinalpalette[2])/2){hslpixels[i].h = hfinalpalette[1];}
      else if((hfinalpalette[1] + hfinalpalette[2])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[2] + hfinalpalette[3])/2){hslpixels[i].h = hfinalpalette[2];}
      else if((hfinalpalette[2] + hfinalpalette[3])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[3] + hfinalpalette[4])/2){hslpixels[i].h = hfinalpalette[3];}
      else if((hfinalpalette[3] + hfinalpalette[4])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[4] + hfinalpalette[5])/2){hslpixels[i].h = hfinalpalette[4];}
      else if((hfinalpalette[4] + hfinalpalette[5])/2 < hslpixels[i].h && hslpixels[i].h <= hfinalpalette[5]){hslpixels[i].h = hfinalpalette[5];}
      hslpixels[i].s *= s;
      hslpixels[i].l *= r;
    }
  }

  for (var i = 0; i < data.length; i+= 4) {
    var rgb = hsltorgb(hslpixels[i/4].h, hslpixels[i/4].s, hslpixels[i/4].l);
    data[i] = Math.round(rgb.r*255);
    data[i+1] = Math.round(rgb.g*255);
    data[i+2] = Math.round(rgb.b*255);
  }

  ctx.putImageData(imageData, 0, 0);
}*/

function generateuploadimage(cvs, ctx, imgdata){

  ctx.clearRect(0, 0, cvs.width, cvs.height);
  drawuploadimage(cvs, ctx, imgdata);
  
  var imageData = ctx.getImageData(0, 0, cvs.width, cvs.height);
  var data = imageData.data;

  var harmony = document.querySelector('input[name = harmony]:checked').value;

  var hslpixels = [];
  for (var i = 0; i < data.length; i+= 4) {
    hslpixels[i/4] = rgbtohsl(data[i]/255, data[i+1]/255, data[i+2]/255);
  }
  
  var hslfinalpalette = [];
  for (var i = 0; i < finalpalette.length; i++) {
    hslfinalpalette[i] = hextohsl(finalpalette[i]);
  }
  var hfinalpalette = [];
  for (var i = 0; i < hslfinalpalette.length; i++) {
    hfinalpalette[i] = hslfinalpalette[i].h;
  }
  hfinalpalette.sort(function(a, b){return a-b});

  var sfinalpalette = [];
  for (var i = 0; i < hslfinalpalette.length; i++) {
    sfinalpalette[i] = hslfinalpalette[i].s;
  }
  sfinalpalette.sort(function(a, b){return a-b});

  var lfinalpalette = [];
  for (var i = 0; i < hslfinalpalette.length; i++) {
    lfinalpalette[i] = hslfinalpalette[i].l;
  }
  lfinalpalette.sort(function(a, b){return a-b});
  
  var avgpixell = 0;
  for (var i = 0; i < hslpixels.length; i++) {
    avgpixell += hslpixels[i].l;
  }
  avgpixell /= hslpixels.length;

  var avgpalettel = 0;
  for (var i = 0; i < hslfinalpalette.length; i++) {
    avgpalettel += hslfinalpalette[i].l;
  }
  avgpalettel /= hslfinalpalette.length;

  var r = avgpalettel/avgpixell;

  var avgpalettes = 0;
  for (var i = 0; i < hslfinalpalette.length; i++) {
    avgpalettes += hslfinalpalette[i].s;
  }
  avgpalettes /= hslfinalpalette.length;
  
  var avgpixels = 0;
  for (var i = 0; i < hslpixels.length; i++) {
    avgpixels += hslpixels[i].s;
  }
  avgpixels /= hslpixels.length;
  
  var s = avgpalettes/avgpixels;

  for (var i = 0; i < hslpixels.length; i++) {
    if(harmony == "shades"){
      hslpixels[i].h *= (hfinalpalette[5] - hfinalpalette[0]);
      hslpixels[i].h += hfinalpalette[0];
      if(hslpixels[i].h <= (hfinalpalette[0] + hfinalpalette[1])/2){hslpixels[i].h = hfinalpalette[0];}
      else if((hfinalpalette[0] + hfinalpalette[1])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[1] + hfinalpalette[2])/2){hslpixels[i].h = hfinalpalette[1];}
      else if((hfinalpalette[1] + hfinalpalette[2])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[2] + hfinalpalette[3])/2){hslpixels[i].h = hfinalpalette[2];}
      else if((hfinalpalette[2] + hfinalpalette[3])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[3] + hfinalpalette[4])/2){hslpixels[i].h = hfinalpalette[3];}
      else if((hfinalpalette[3] + hfinalpalette[4])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[4] + hfinalpalette[5])/2){hslpixels[i].h = hfinalpalette[4];}
      else if((hfinalpalette[4] + hfinalpalette[5])/2 < hslpixels[i].h && hslpixels[i].h <= hfinalpalette[5]){hslpixels[i].h = hfinalpalette[5];}
      hslpixels[i].s *= s;
      hslpixels[i].l *= r;
    }
    if(harmony == "hues"){
      hslpixels[i].h *= (hfinalpalette[5] - hfinalpalette[0]);
      hslpixels[i].h += hfinalpalette[0];
      if(hslpixels[i].h <= (hfinalpalette[0] + hfinalpalette[1])/2){hslpixels[i].h = hfinalpalette[0];}
      else if((hfinalpalette[0] + hfinalpalette[1])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[1] + hfinalpalette[2])/2){hslpixels[i].h = hfinalpalette[1];}
      else if((hfinalpalette[1] + hfinalpalette[2])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[2] + hfinalpalette[3])/2){hslpixels[i].h = hfinalpalette[2];}
      else if((hfinalpalette[2] + hfinalpalette[3])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[3] + hfinalpalette[4])/2){hslpixels[i].h = hfinalpalette[3];}
      else if((hfinalpalette[3] + hfinalpalette[4])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[4] + hfinalpalette[5])/2){hslpixels[i].h = hfinalpalette[4];}
      else if((hfinalpalette[4] + hfinalpalette[5])/2 < hslpixels[i].h && hslpixels[i].h <= hfinalpalette[5]){hslpixels[i].h = hfinalpalette[5];}

      if(hslpixels[i].s!=0){
        hslpixels[i].s *= (sfinalpalette[5] - sfinalpalette[0]);
        hslpixels[i].s += sfinalpalette[0];
        if(hslpixels[i].s <= (sfinalpalette[0] + sfinalpalette[1])/2){hslpixels[i].s = sfinalpalette[0];}
        else if((sfinalpalette[0] + sfinalpalette[1])/2 < hslpixels[i].s && hslpixels[i].s <= (sfinalpalette[1] + sfinalpalette[2])/2){hslpixels[i].s = sfinalpalette[1];}
        else if((sfinalpalette[1] + sfinalpalette[2])/2 < hslpixels[i].s && hslpixels[i].s <= (sfinalpalette[2] + sfinalpalette[3])/2){hslpixels[i].s = sfinalpalette[2];}
        else if((sfinalpalette[2] + sfinalpalette[3])/2 < hslpixels[i].s && hslpixels[i].s <= (sfinalpalette[3] + sfinalpalette[4])/2){hslpixels[i].s = sfinalpalette[3];}
        else if((sfinalpalette[3] + sfinalpalette[4])/2 < hslpixels[i].s && hslpixels[i].s <= (sfinalpalette[4] + sfinalpalette[5])/2){hslpixels[i].s = sfinalpalette[4];}
        else if((sfinalpalette[4] + sfinalpalette[5])/2 < hslpixels[i].s && hslpixels[i].s <= sfinalpalette[5]){hslpixels[i].s = sfinalpalette[5];}
      }
    }
    if(harmony == "custom"){
      hslpixels[i].h *= (hfinalpalette[5] - hfinalpalette[0]);
      hslpixels[i].h += hfinalpalette[0];
      if(hslpixels[i].h <= (hfinalpalette[0] + hfinalpalette[1])/2){hslpixels[i].h = hfinalpalette[0];}
      else if((hfinalpalette[0] + hfinalpalette[1])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[1] + hfinalpalette[2])/2){hslpixels[i].h = hfinalpalette[1];}
      else if((hfinalpalette[1] + hfinalpalette[2])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[2] + hfinalpalette[3])/2){hslpixels[i].h = hfinalpalette[2];}
      else if((hfinalpalette[2] + hfinalpalette[3])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[3] + hfinalpalette[4])/2){hslpixels[i].h = hfinalpalette[3];}
      else if((hfinalpalette[3] + hfinalpalette[4])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[4] + hfinalpalette[5])/2){hslpixels[i].h = hfinalpalette[4];}
      else if((hfinalpalette[4] + hfinalpalette[5])/2 < hslpixels[i].h && hslpixels[i].h <= hfinalpalette[5]){hslpixels[i].h = hfinalpalette[5];}

      if(hslpixels[i].s!=0){
        hslpixels[i].s *= (sfinalpalette[5] - sfinalpalette[0]);
        hslpixels[i].s += sfinalpalette[0];
        if(hslpixels[i].s <= (sfinalpalette[0] + sfinalpalette[1])/2){hslpixels[i].s = sfinalpalette[0];}
        else if((sfinalpalette[0] + sfinalpalette[1])/2 < hslpixels[i].s && hslpixels[i].s <= (sfinalpalette[1] + sfinalpalette[2])/2){hslpixels[i].s = sfinalpalette[1];}
        else if((sfinalpalette[1] + sfinalpalette[2])/2 < hslpixels[i].s && hslpixels[i].s <= (sfinalpalette[2] + sfinalpalette[3])/2){hslpixels[i].s = sfinalpalette[2];}
        else if((sfinalpalette[2] + sfinalpalette[3])/2 < hslpixels[i].s && hslpixels[i].s <= (sfinalpalette[3] + sfinalpalette[4])/2){hslpixels[i].s = sfinalpalette[3];}
        else if((sfinalpalette[3] + sfinalpalette[4])/2 < hslpixels[i].s && hslpixels[i].s <= (sfinalpalette[4] + sfinalpalette[5])/2){hslpixels[i].s = sfinalpalette[4];}
        else if((sfinalpalette[4] + sfinalpalette[5])/2 < hslpixels[i].s && hslpixels[i].s <= sfinalpalette[5]){hslpixels[i].s = sfinalpalette[5];}
      }
    }
  }

  for (var i = 0; i < data.length; i+= 4) {
    var rgb = hsltorgb(hslpixels[i/4].h, hslpixels[i/4].s, hslpixels[i/4].l);
    data[i] = Math.round(rgb.r*255);
    data[i+1] = Math.round(rgb.g*255);
    data[i+2] = Math.round(rgb.b*255);
  }

  ctx.putImageData(imageData, 0, 0);
}

/*function generateuploadimage(cvs, ctx, imgdata){

  ctx.clearRect(0, 0, cvs.width, cvs.height);
  drawuploadimage(cvs, ctx, imgdata);
  
  var imageData = ctx.getImageData(0, 0, cvs.width, cvs.height);
  var data = imageData.data;

  var harmony = document.querySelector('input[name = harmony]:checked').value;

  var hslpixels = [];
  for (var i = 0; i < data.length; i+= 4) {
    hslpixels[i/4] = rgbtohsl(data[i]/255, data[i+1]/255, data[i+2]/255);
  }
  var hslfinalpalette = [];
  for (var i = 0; i < finalpalette.length; i++) {
    hslfinalpalette[i] = hextohsl(finalpalette[i]);
  }

  var avgpixell = 0;
  for (var i = 0; i < hslpixels.length; i++) {
    avgpixell += hslpixels[i].l;
  }
  avgpixell /= hslpixels.length;

  var avgpalettel = 0;
  for (var i = 0; i < hslfinalpalette.length; i++) {
    avgpalettel += hslfinalpalette[i].l;
  }
  avgpalettel /= hslfinalpalette.length;

  var r = avgpalettel/avgpixell;

  var hfinalpalette = [];
  for (var i = 0; i < hslfinalpalette.length; i++) {
    hfinalpalette[i] = hslfinalpalette[i].h;
  }
  hfinalpalette.sort(function(a, b){return a-b});

  var avgpalettes = 0;
  for (var i = 0; i < hslfinalpalette.length; i++) {
    avgpalettes += hslfinalpalette[i].s;
  }
  avgpalettes /= hslfinalpalette.length;
  
  var avgpixels = 0;
  for (var i = 0; i < hslpixels.length; i++) {
    avgpixels += hslpixels[i].s;
  }
  avgpixels /= hslpixels.length;
  
  var s = avgpalettes/avgpixels;

  if(harmony == "shades"){
    for (var i = 0; i < hslpixels.length; i++) {
      hslpixels[i].h *= (hfinalpalette[5] - hfinalpalette[0]);
      hslpixels[i].h += hfinalpalette[0];
      if(hslpixels[i].h <= (hfinalpalette[0] + hfinalpalette[1])/2){hslpixels[i].h = hfinalpalette[0];}
      else if((hfinalpalette[0] + hfinalpalette[1])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[1] + hfinalpalette[2])/2){hslpixels[i].h = hfinalpalette[1];}
      else if((hfinalpalette[1] + hfinalpalette[2])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[2] + hfinalpalette[3])/2){hslpixels[i].h = hfinalpalette[2];}
      else if((hfinalpalette[2] + hfinalpalette[3])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[3] + hfinalpalette[4])/2){hslpixels[i].h = hfinalpalette[3];}
      else if((hfinalpalette[3] + hfinalpalette[4])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[4] + hfinalpalette[5])/2){hslpixels[i].h = hfinalpalette[4];}
      else if((hfinalpalette[4] + hfinalpalette[5])/2 < hslpixels[i].h && hslpixels[i].h <= hfinalpalette[5]){hslpixels[i].h = hfinalpalette[5];}
      hslpixels[i].s *= s;
      hslpixels[i].l *=  r;
    }
  }
  if(harmony == "hues"){
    
  }
  if(harmony == "custom"){
    for (var i = 0; i < hslpixels.length; i++) {
      hslpixels[i].h *= (hfinalpalette[5] - hfinalpalette[0]);
      hslpixels[i].h += hfinalpalette[0];
      if(hslpixels[i].h <= (hfinalpalette[0] + hfinalpalette[1])/2){hslpixels[i].h = hfinalpalette[0];}
      else if((hfinalpalette[0] + hfinalpalette[1])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[1] + hfinalpalette[2])/2){hslpixels[i].h = hfinalpalette[1];}
      else if((hfinalpalette[1] + hfinalpalette[2])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[2] + hfinalpalette[3])/2){hslpixels[i].h = hfinalpalette[2];}
      else if((hfinalpalette[2] + hfinalpalette[3])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[3] + hfinalpalette[4])/2){hslpixels[i].h = hfinalpalette[3];}
      else if((hfinalpalette[3] + hfinalpalette[4])/2 < hslpixels[i].h && hslpixels[i].h <= (hfinalpalette[4] + hfinalpalette[5])/2){hslpixels[i].h = hfinalpalette[4];}
      else if((hfinalpalette[4] + hfinalpalette[5])/2 < hslpixels[i].h && hslpixels[i].h <= hfinalpalette[5]){hslpixels[i].h = hfinalpalette[5];}
      hslpixels[i].s *= s;
      hslpixels[i].l *= r;
    }
  }

  for (var i = 0; i < data.length; i+= 4) {
    var rgb = hsltorgb(hslpixels[i/4].h, hslpixels[i/4].s, hslpixels[i/4].l);
    data[i] = Math.round(rgb.r*255);
    data[i+1] = Math.round(rgb.g*255);
    data[i+2] = Math.round(rgb.b*255);
  }

  ctx.putImageData(imageData, 0, 0);
}*/

function generateillustration(){
  var illcolor1 = document.getElementsByClassName('illcolor1');
  for(let i=0; i<illcolor1.length; i++){
    illcolor1[i].setAttribute('fill',finalpalette[0]);
  }
  var illcolor2 = document.getElementsByClassName('illcolor2');
  for(let i=0; i<illcolor2.length; i++){
    illcolor2[i].setAttribute('fill',finalpalette[1]);
  }
  var illcolor3 = document.getElementsByClassName('illcolor3');
  for(let i=0; i<illcolor3.length; i++){
    illcolor3[i].setAttribute('fill',finalpalette[2]);
  }
  var illcolor4 = document.getElementsByClassName('illcolor4');
  for(let i=0; i<illcolor4.length; i++){
    illcolor4[i].setAttribute('fill',finalpalette[3]);
  }
  var illcolor5 = document.getElementsByClassName('illcolor5');
  for(let i=0; i<illcolor5.length; i++){
    illcolor5[i].setAttribute('fill',finalpalette[4]);
  }
  var illcolor6 = document.getElementsByClassName('illcolor6');
  for(let i=0; i<illcolor6.length; i++){
    illcolor6[i].setAttribute('fill',finalpalette[5]);
  }
}
function shuffleillustration(){
  var illpalette = shuffle(finalpalette);
  var illcolor1 = document.getElementsByClassName('illcolor1');
  for(let i=0; i<illcolor1.length; i++){
    illcolor1[i].setAttribute('fill',illpalette[0]);
  }
  var illcolor2 = document.getElementsByClassName('illcolor2');
  for(let i=0; i<illcolor2.length; i++){
    illcolor2[i].setAttribute('fill',illpalette[1]);
  }
  var illcolor3 = document.getElementsByClassName('illcolor3');
  for(let i=0; i<illcolor3.length; i++){
    illcolor3[i].setAttribute('fill',illpalette[2]);
  }
  var illcolor4 = document.getElementsByClassName('illcolor4');
  for(let i=0; i<illcolor4.length; i++){
    illcolor4[i].setAttribute('fill',illpalette[3]);
  }
  var illcolor5 = document.getElementsByClassName('illcolor5');
  for(let i=0; i<illcolor5.length; i++){
    illcolor5[i].setAttribute('fill',illpalette[4]);
  }
  var illcolor6 = document.getElementsByClassName('illcolor6');
  for(let i=0; i<illcolor6.length; i++){
    illcolor6[i].setAttribute('fill',illpalette[5]);
  }
}

function generateui(){
  var harmony = document.querySelector('input[name = harmony]:checked').value;
  if(harmony == "shades"){
    var uicolor1 = document.getElementsByClassName('uicolor1');
    var uicolor2 = document.getElementsByClassName('uicolor2');
    var uicolor3 = document.getElementsByClassName('uicolor3');
    var uicolor4 = document.getElementsByClassName('uicolor4');
    var uicolor5 = document.getElementsByClassName('uicolor5');
    var uicolor6 = document.getElementsByClassName('uicolor6');
    var uicolor6stroke = document.getElementsByClassName('uicolor6stroke');

    for(let i=0; i<uicolor1.length; i++){
      uicolor1[i].setAttribute('fill',finalpalette[0]);
      uicolor1[i].setAttribute('opacity',"1");
    }
    for(let i=0; i<uicolor2.length; i++){
      uicolor2[i].setAttribute('fill',finalpalette[1]);
      uicolor2[i].setAttribute('opacity',"1");
    }
    for(let i=0; i<uicolor3.length; i++){
      uicolor3[i].setAttribute('fill',finalpalette[2]);
      uicolor3[i].setAttribute('opacity',"1");
    }
    for(let i=0; i<uicolor4.length; i++){
      uicolor4[i].setAttribute('fill',finalpalette[3]);
      uicolor4[i].setAttribute('opacity',"1");
    }
    for(let i=0; i<uicolor5.length; i++){
      uicolor5[i].setAttribute('fill',finalpalette[4]);
      uicolor5[i].setAttribute('opacity',"1");
    }
    for(let i=0; i<uicolor6.length; i++){
      uicolor6[i].setAttribute('fill',finalpalette[5]);
      uicolor6[i].setAttribute('opacity',"1");
    }
    for(let i=0; i<uicolor6stroke.length; i++){
      uicolor6stroke[i].setAttribute('stroke',finalpalette[5]);
    }
  }
  if(harmony == "custom"){
    var uicustomcolor1 = document.getElementsByClassName('uicustomcolor1');
    var uicustomcolor2 = document.getElementsByClassName('uicustomcolor2');
    var uicustomcolor3 = document.getElementsByClassName('uicustomcolor3');
    var uicustomcolor4 = document.getElementsByClassName('uicustomcolor4');
    var uicustomcolor5 = document.getElementsByClassName('uicustomcolor5');
    var uicustomcolor5op = document.getElementsByClassName('uicustomcolor5op');
    var uicustomcolor6 = document.getElementsByClassName('uicustomcolor6');
    var uicustomcolor2stroke = document.getElementsByClassName('uicustomcolor2stroke');

    for(let i=0; i<uicustomcolor1.length; i++){
      uicustomcolor1[i].setAttribute('fill',finalpalette[0]);
      uicustomcolor1[i].setAttribute('opacity',1);
    }
    for(let i=0; i<uicustomcolor2.length; i++){
      uicustomcolor2[i].setAttribute('fill',finalpalette[1]);
      uicustomcolor2[i].setAttribute('opacity',1);
    }
    for(let i=0; i<uicustomcolor3.length; i++){
      uicustomcolor3[i].setAttribute('fill',finalpalette[2]);
      uicustomcolor3[i].setAttribute('opacity',1);
    }
    for(let i=0; i<uicustomcolor4.length; i++){
      uicustomcolor4[i].setAttribute('fill',finalpalette[3]);
      uicustomcolor4[i].setAttribute('opacity',1);
    }
    for(let i=0; i<uicustomcolor5.length; i++){
      uicustomcolor5[i].setAttribute('fill',finalpalette[4]);
      uicustomcolor5[i].setAttribute('opacity',1);
    }
    for(let i=0; i<uicustomcolor5op.length; i++){
      uicustomcolor5op[i].setAttribute('fill',finalpalette[4]);
      uicustomcolor5op[i].setAttribute('opacity',"0.3");
    }
    for(let i=0; i<uicustomcolor6.length; i++){
      uicustomcolor6[i].setAttribute('fill',finalpalette[5]);
      uicustomcolor6[i].setAttribute('opacity',1);
    }
    for(let i=0; i<uicustomcolor2stroke.length; i++){
      uicustomcolor2stroke[i].setAttribute('stroke',finalpalette[1]);
    }
  }
  if(harmony == "hues"){
    var uihuecolor1 = document.getElementsByClassName('uihuecolor1');
    var uihuecolor1op = document.getElementsByClassName('uihuecolor1op');
    var uihuecolor2 = document.getElementsByClassName('uihuecolor2');
    var uihuecolor2op = document.getElementsByClassName('uihuecolor2op');
    var uihuecolor3 = document.getElementsByClassName('uihuecolor3');
    var uihuecolor3op = document.getElementsByClassName('uihuecolor3op');
    var uihuecolor4 = document.getElementsByClassName('uihuecolor4');
    var uihuecolor4op = document.getElementsByClassName('uihuecolor4op');
    var uihuecolor5 = document.getElementsByClassName('uihuecolor5');
    var uihuecolor5op = document.getElementsByClassName('uihuecolor5op');
    var uihuecolor6 = document.getElementsByClassName('uihuecolor6');
    var uihuewhitestroke = document.getElementsByClassName('uihuewhitestroke');

    for(let i=0; i<uihuecolor1.length; i++){
      uihuecolor1[i].setAttribute('fill',finalpalette[0]);
      uihuecolor1[i].setAttribute('opacity',"1");
    }
    for(let i=0; i<uihuecolor1op.length; i++){
      uihuecolor1op[i].setAttribute('fill',finalpalette[0]);
      uihuecolor1op[i].setAttribute('opacity',"0.3");
    }
    for(let i=0; i<uihuecolor2.length; i++){
      uihuecolor2[i].setAttribute('fill',finalpalette[1]);
      uihuecolor2[i].setAttribute('opacity',"1");
    }
    for(let i=0; i<uihuecolor2op.length; i++){
      uihuecolor2op[i].setAttribute('fill',finalpalette[1]);
      uihuecolor2op[i].setAttribute('opacity',"0.3");
    }
    for(let i=0; i<uihuecolor3.length; i++){
      uihuecolor3[i].setAttribute('fill',finalpalette[2]);
      uihuecolor3[i].setAttribute('opacity',"1");
    }
    for(let i=0; i<uihuecolor3op.length; i++){
      uihuecolor3op[i].setAttribute('fill',finalpalette[2]);
      uihuecolor3op[i].setAttribute('opacity',"0.3");
    }
    for(let i=0; i<uihuecolor4.length; i++){
      uihuecolor4[i].setAttribute('fill',finalpalette[3]);
      uihuecolor4[i].setAttribute('opacity',"1");
    }
    for(let i=0; i<uihuecolor4op.length; i++){
      uihuecolor4op[i].setAttribute('fill',finalpalette[3]);
      uihuecolor4op[i].setAttribute('opacity',"0.5");
    }
    for(let i=0; i<uihuecolor5.length; i++){
      uihuecolor5[i].setAttribute('fill',finalpalette[4]);
      uihuecolor5[i].setAttribute('opacity',"1");
    }
    for(let i=0; i<uihuecolor5op.length; i++){
      uihuecolor5op[i].setAttribute('fill',finalpalette[4]);
      uihuecolor5op[i].setAttribute('opacity',"0.5");
    }
    for(let i=0; i<uihuecolor6.length; i++){
      uihuecolor6[i].setAttribute('fill',finalpalette[5]);
      uihuecolor6[i].setAttribute('opacity',"1");
    }
    for(let i=0; i<uihuewhitestroke.length; i++){
      uihuewhitestroke[i].setAttribute('stroke',"#FFFFFF");
    }
  }
}
function shuffleui(){
  var uipalette = shuffle(finalpalette);
  var harmony = document.querySelector('input[name = harmony]:checked').value;
  if(harmony == "shades"){
    var uicolor1 = document.getElementsByClassName('uicolor1');
    var uicolor2 = document.getElementsByClassName('uicolor2');
    var uicolor3 = document.getElementsByClassName('uicolor3');
    var uicolor4 = document.getElementsByClassName('uicolor4');
    var uicolor5 = document.getElementsByClassName('uicolor5');
    var uicolor6 = document.getElementsByClassName('uicolor6');
    var uicolor6stroke = document.getElementsByClassName('uicolor6stroke');

    for(let i=0; i<uicolor1.length; i++){
      uicolor1[i].setAttribute('fill',uipalette[0]);
      uicolor1[i].setAttribute('opacity',"1");
    }
    for(let i=0; i<uicolor2.length; i++){
      uicolor2[i].setAttribute('fill',uipalette[1]);
      uicolor2[i].setAttribute('opacity',"1");
    }
    for(let i=0; i<uicolor3.length; i++){
      uicolor3[i].setAttribute('fill',uipalette[2]);
      uicolor3[i].setAttribute('opacity',"1");
    }
    for(let i=0; i<uicolor4.length; i++){
      uicolor4[i].setAttribute('fill',uipalette[3]);
      uicolor4[i].setAttribute('opacity',"1");
    }
    for(let i=0; i<uicolor5.length; i++){
      uicolor5[i].setAttribute('fill',uipalette[4]);
      uicolor5[i].setAttribute('opacity',"1");
    }
    for(let i=0; i<uicolor6.length; i++){
      uicolor6[i].setAttribute('fill',uipalette[5]);
      uicolor6[i].setAttribute('opacity',"1");
    }
    for(let i=0; i<uicolor6stroke.length; i++){
      uicolor6stroke[i].setAttribute('stroke',uipalette[5]);
    }
  }
  if(harmony == "custom"){
    var uicustomcolor1 = document.getElementsByClassName('uicustomcolor1');
    var uicustomcolor2 = document.getElementsByClassName('uicustomcolor2');
    var uicustomcolor3 = document.getElementsByClassName('uicustomcolor3');
    var uicustomcolor4 = document.getElementsByClassName('uicustomcolor4');
    var uicustomcolor5 = document.getElementsByClassName('uicustomcolor5');
    var uicustomcolor5op = document.getElementsByClassName('uicustomcolor5op');
    var uicustomcolor6 = document.getElementsByClassName('uicustomcolor6');
    var uicustomcolor2stroke = document.getElementsByClassName('uicustomcolor2stroke');

    for(let i=0; i<uicustomcolor1.length; i++){
      uicustomcolor1[i].setAttribute('fill',uipalette[0]);
      uicustomcolor1[i].setAttribute('opacity',1);
    }
    for(let i=0; i<uicustomcolor2.length; i++){
      uicustomcolor2[i].setAttribute('fill',uipalette[1]);
      uicustomcolor2[i].setAttribute('opacity',1);
    }
    for(let i=0; i<uicustomcolor3.length; i++){
      uicustomcolor3[i].setAttribute('fill',uipalette[2]);
      uicustomcolor3[i].setAttribute('opacity',1);
    }
    for(let i=0; i<uicustomcolor4.length; i++){
      uicustomcolor4[i].setAttribute('fill',uipalette[3]);
      uicustomcolor4[i].setAttribute('opacity',1);
    }
    for(let i=0; i<uicustomcolor5.length; i++){
      uicustomcolor5[i].setAttribute('fill',uipalette[4]);
      uicustomcolor5[i].setAttribute('opacity',1);
    }
    for(let i=0; i<uicustomcolor5op.length; i++){
      uicustomcolor5op[i].setAttribute('fill',uipalette[4]);
      uicustomcolor5op[i].setAttribute('opacity',"0.3");
    }
    for(let i=0; i<uicustomcolor6.length; i++){
      uicustomcolor6[i].setAttribute('fill',uipalette[5]);
      uicustomcolor6[i].setAttribute('opacity',1);
    }
    for(let i=0; i<uicustomcolor2stroke.length; i++){
      uicustomcolor2stroke[i].setAttribute('stroke',uipalette[1]);
    }
  }
  if(harmony == "hues"){
    var uihuecolor1 = document.getElementsByClassName('uihuecolor1');
    var uihuecolor1op = document.getElementsByClassName('uihuecolor1op');
    var uihuecolor2 = document.getElementsByClassName('uihuecolor2');
    var uihuecolor2op = document.getElementsByClassName('uihuecolor2op');
    var uihuecolor3 = document.getElementsByClassName('uihuecolor3');
    var uihuecolor3op = document.getElementsByClassName('uihuecolor3op');
    var uihuecolor4 = document.getElementsByClassName('uihuecolor4');
    var uihuecolor4op = document.getElementsByClassName('uihuecolor4op');
    var uihuecolor5 = document.getElementsByClassName('uihuecolor5');
    var uihuecolor5op = document.getElementsByClassName('uihuecolor5op');
    var uihuecolor6 = document.getElementsByClassName('uihuecolor6');
    var uihuewhitestroke = document.getElementsByClassName('uihuewhitestroke');

    for(let i=0; i<uihuecolor1.length; i++){
      uihuecolor1[i].setAttribute('fill',uipalette[0]);
      uihuecolor1[i].setAttribute('opacity',"1");
    }
    for(let i=0; i<uihuecolor1op.length; i++){
      uihuecolor1op[i].setAttribute('fill',uipalette[0]);
      uihuecolor1op[i].setAttribute('opacity',"0.3");
    }
    for(let i=0; i<uihuecolor2.length; i++){
      uihuecolor2[i].setAttribute('fill',uipalette[1]);
      uihuecolor2[i].setAttribute('opacity',"1");
    }
    for(let i=0; i<uihuecolor2op.length; i++){
      uihuecolor2op[i].setAttribute('fill',uipalette[1]);
      uihuecolor2op[i].setAttribute('opacity',"0.3");
    }
    for(let i=0; i<uihuecolor3.length; i++){
      uihuecolor3[i].setAttribute('fill',uipalette[2]);
      uihuecolor3[i].setAttribute('opacity',"1");
    }
    for(let i=0; i<uihuecolor3op.length; i++){
      uihuecolor3op[i].setAttribute('fill',uipalette[2]);
      uihuecolor3op[i].setAttribute('opacity',"0.3");
    }
    for(let i=0; i<uihuecolor4.length; i++){
      uihuecolor4[i].setAttribute('fill',uipalette[3]);
      uihuecolor4[i].setAttribute('opacity',"1");
    }
    for(let i=0; i<uihuecolor4op.length; i++){
      uihuecolor4op[i].setAttribute('fill',uipalette[3]);
      uihuecolor4op[i].setAttribute('opacity',"0.5");
    }
    for(let i=0; i<uihuecolor5.length; i++){
      uihuecolor5[i].setAttribute('fill',uipalette[4]);
      uihuecolor5[i].setAttribute('opacity',"1");
    }
    for(let i=0; i<uihuecolor5op.length; i++){
      uihuecolor5op[i].setAttribute('fill',uipalette[4]);
      uihuecolor5op[i].setAttribute('opacity',"0.5");
    }
    for(let i=0; i<uihuecolor6.length; i++){
      uihuecolor6[i].setAttribute('fill',uipalette[5]);
      uihuecolor6[i].setAttribute('opacity',"1");
    }
    for(let i=0; i<uihuewhitestroke.length; i++){
      uihuewhitestroke[i].setAttribute('stroke',"#FFFFFF");
    }
  }
}

function init(){

  ihex = document.getElementById('inputcolor').value;

  colorpicker.value = rgbtohex(hextorgb(ihex).r, hextorgb(ihex).g, hextorgb(ihex).b);
  colorpickerlabel.style.backgroundColor = colorpicker.value;

  var orgb = hextorgb(ihex);
  ohsl = rgbtohsl(orgb.r, orgb.g, orgb.b);
  //var ohex = hsltohex(ohsl.h, ohsl.s, ohsl.l);
  //document.getElementById('outputcolor').innerHTML = JSON.stringify(ohsl);

  harr = goldenratio(ohsl.h);
  sarr = goldenratio(ohsl.s);
  larr = goldenratio(ohsl.l);

  for(let i=0; i<33; i++){
    if(harr[i] == ohsl.h){harrbaseindex = i;}
  }
  for(let i=0; i<33; i++){
    if(sarr[i] == ohsl.s){sarrbaseindex = i;}
  }
  for(let i=0; i<33; i++){
    if(larr[i] == ohsl.l){larrbaseindex = i;}
  }

 for(let j=0; j<33; j++){
   hues[j] = [];
  for(let i=0; i<33; i++){
    hues[j][i] = hsltohex(harr[i], ohsl.s, larr[j]);
  }
}

for(let j=0; j<33; j++){
  shades[j] = [];
  for(let i=0; i<33; i++){
    shades[j][i] = hsltohex(harr[j], ohsl.s, larr[i]);
  }
}

//huessetindex = larrbaseindex;
//shadessetindex = harrbaseindex;
orthopaletteshades.value = harrbaseindex;
setCSSProperty(orthopaletteshades);
orthopalettehues.value = larrbaseindex;
setCSSProperty(orthopalettehues);

huestartindex = harrbaseindex;
shadestartindex = larrbaseindex;
customstartindex = harrbaseindex;

for(let i=0; i<33; i++){
  neutrals[i] = hsltohex(ohsl.h, 0, larr[i]);
}

generategrid();
generatepalette();
}

//logic

window.addEventListener('load', drawimage(canvas, context));
window.addEventListener('load', init);
window.addEventListener('load', retrievekey);

document.getElementById('submit').onclick = () => {
  init();
}

[shadestab, huestab, customtab].forEach(item => {
  item.onchange = () => {
    generatepalette();
  }
})

palettegapslider.onchange = () => {
  generatepalette();
}
orthopaletteshades.onchange = () => {
  generatepalette();
}
orthopalettehues.onchange = () => {
  generatepalette();
}

shufflebtn.onclick = () => {
  shufflepalette();
}

document.body.onkeyup = function(e){
  if(e.keyCode == 32){
    if(f == 0){
      shufflepalette();
    }
  }
}
document.body.onkeydown = function(e){
  if(e.keyCode == 32){
     if(f == 0){
      e.preventDefault();
    }
  }
}

//sliders
  
var isChanging = false;
  
function setCSSProperty(x){
  const percent =
    ((x.value - x.min) / (x.max - x.min)) * 100;
    x.style.setProperty("--webkitProgressPercent", `${percent}%`);
}

function handleMove(x){
  if (!isChanging) return;
  setCSSProperty(x);
}
function handleUpAndLeave(){isChanging = false;}
function handleDown(){isChanging = true;}

[palettegapslider, orthopaletteshades, orthopalettehues].forEach(item => {
item.onmousemove = () => {handleMove(item)};
item.onmousedown = () => {handleDown()};
item.onmouseup = () => {handleUpAndLeave()};
item.onmouseleave = () => {handleUpAndLeave()};
item.onclick = () => {setCSSProperty(item)};
})

setCSSProperty(palettegapslider);
setCSSProperty(orthopaletteshades);
setCSSProperty(orthopalettehues);

//colorpicker
colorpicker.onchange = () => {
  inputcolor.value = colorpicker.value;
  init();
}

//columninput
[columninput[0], columninput[1], columninput[2], columninput[3], columninput[4], columninput[5]].forEach(item => {
  item.onchange = () => {
    palettecolor1.style.backgroundColor = rgbtohex(hextorgb(columninput[0].value).r, hextorgb(columninput[0].value).g, hextorgb(columninput[0].value).b);
    palettecolor2.style.backgroundColor = rgbtohex(hextorgb(columninput[1].value).r, hextorgb(columninput[1].value).g, hextorgb(columninput[1].value).b);
    palettecolor3.style.backgroundColor = rgbtohex(hextorgb(columninput[2].value).r, hextorgb(columninput[2].value).g, hextorgb(columninput[2].value).b);
    palettecolor4.style.backgroundColor = rgbtohex(hextorgb(columninput[3].value).r, hextorgb(columninput[3].value).g, hextorgb(columninput[3].value).b);
    palettecolor5.style.backgroundColor = rgbtohex(hextorgb(columninput[4].value).r, hextorgb(columninput[4].value).g, hextorgb(columninput[4].value).b);
    palettecolor6.style.backgroundColor = rgbtohex(hextorgb(columninput[5].value).r, hextorgb(columninput[5].value).g, hextorgb(columninput[5].value).b);
    for(let i=0; i<6; i++){
      finalpalette[i] = rgbtohex(hextorgb(columninput[i].value).r, hextorgb(columninput[i].value).g, hextorgb(columninput[i].value).b);
    }
    generatelogo();
    generatemobileheaderlogo();
    generatecontrolpanel();
    generategradient();
    generateillustration();
    generateui();
    generateimage(canvas, context);
    generateuploadimage(uploadcanvas1, uploadcontext1, uploadimgdata1);
    generateuploadimage(uploadcanvas2, uploadcontext2, uploadimgdata2);
    generateuploadimage(uploadcanvas3, uploadcontext3, uploadimgdata3);
    generateuploadimage(uploadcanvas4, uploadcontext4, uploadimgdata4);
    generateuploadimage(uploadcanvas5, uploadcontext5, uploadimgdata5);
    generateuploadimage(uploadcanvas6, uploadcontext6, uploadimgdata6);
  }
})

//copyhex
function copyhexpalette(button, target, text){
  target.select();
  document.execCommand("copy");
  target.selectionEnd = target.selectionStart;
  target.blur();
  button.style.visibility = "hidden";
  text.style.visibility = "visible";

  setTimeout(() => {
    button.style.visibility = "visible";
    text.style.visibility = "hidden";
  }, 800);
}

function copyhexgrid(button, target, text, hidebtn){
  let bgColor = window.getComputedStyle(target, null).getPropertyValue("background-color");
  let targettext = document.createElement('textarea');
  document.body.appendChild(targettext);
  var a = bgColor.split("(")[1].split(")")[0];
  a = a.split(",");
  var b = a.map(function(x){             //For each array element
    x = parseInt(x).toString(16);      //Convert to a base16 string
    return (x.length==1) ? "0"+x : x;  //Add zero if we get only one character
  })
  b = b.join("");
  targettext.value = b;

  targettext.select();
  document.execCommand("copy");
  document.body.removeChild(targettext);

  hidebtn.style.visibility = "hidden";
  button.style.visibility = "hidden";
  text.style.visibility = "visible";

  setTimeout(() => {
    hidebtn.style.visibility = "visible";
    button.style.visibility = "visible";
    text.style.visibility = "hidden";
  }, 800);
}

Array.from(columncopy).forEach(
  function(item, index, array) {
    item.onclick = () => {
      copyhexpalette(item, columninput[index], columncopytext[index]);
    }
  }
);
Array.from(gridcopy).forEach(
  function(item, index, array) {
    item.onclick = () => {
      copyhexgrid(item, gridcell[index], gridcopytext[index], gridbasecolor[index]);
    }
  }
);

if(window.matchMedia("(min-width: 960px)").matches){
  if(p==0){
    [columncopy[0], columncopy[1], columncopy[2], columncopy[3], columncopy[4], columncopy[5]].forEach((item, index) => {
      item.onmouseover = () => {
          document.getElementsByClassName('columncopytooltip')[index].style.visibility = "visible";
      }
      item.onmouseleave = () => {
          document.getElementsByClassName('columncopytooltip')[index].style.visibility = "hidden";
      }
    })
  }
}

//setbasecolor
function setbasecolor(button, target){
  let bgColor = window.getComputedStyle(target, null).getPropertyValue("background-color");
  var a = bgColor.split("(")[1].split(")")[0];
  a = a.split(",");
  var b = a.map(function(x){             //For each array element
    x = parseInt(x).toString(16);      //Convert to a base16 string
    return (x.length==1) ? "0"+x : x;  //Add zero if we get only one character
  })
  b = b.join("");
  inputcolor.value = '#' + b;
  init();
}
Array.from(columnbasecolor).forEach(
  function(item, index, array) {
    item.onclick = () => {
      setbasecolor(item, column[index]);
    }
  }
);
Array.from(gridbasecolor).forEach(
  function(item, index, array) {
    item.onclick = () => {
      setbasecolor(item, gridcell[index]);
    }
  }
);


if(window.matchMedia("(min-width: 960px)").matches){
  if(p==0){
    [columnbasecolor[0], columnbasecolor[1], columnbasecolor[2], columnbasecolor[3], columnbasecolor[4], columnbasecolor[5]].forEach((item, index) => {
      item.onmouseover = () => {
        document.getElementsByClassName('columnbasetooltip')[index].style.visibility = "visible";
      }
      item.onmouseleave = () => {
        document.getElementsByClassName('columnbasetooltip')[index].style.visibility = "hidden";
      }
    })
  }
}


/*function checkbasecolumn(){
  for(let i=0; i<column.length; i++){
    let bgColor = window.getComputedStyle(column[i], null).getPropertyValue("background-color");
    var a = bgColor.split("(")[1].split(")")[0];
    a = a.split(",");
    var b = a.map(function(x){             //For each array element
      x = parseInt(x).toString(16);      //Convert to a base16 string
      return (x.length==1) ? "0"+x : x;  //Add zero if we get only one character
    })
    b = "#" + b.join("");
    var circle = columnbasecolor[i].getElementsByTagName("circle");
    var path = columnbasecolor[i].getElementsByTagName("path");
    if(inputcolor.value == b){
      circle[0].setAttribute('fill','#FFFFFF');
      path[0].setAttribute('fill', b);
    }
    else{
      circle[0].setAttribute('fill','none');
      path[0].setAttribute('fill', "#FFFFFF");
    }
  }
}*/

//saving
gradientsave.onclick = () => {
  const svginnerContent = document.getElementById("gradientsvg").innerHTML;
  //const svgContent = document.getElementById("gradientsvg").outerHTML;
  const svgContent = '<svg id="gradientsvg" width="676px" height="384px" viewBox="0 0 338 192" fill="none" xmlns="http://www.w3.org/2000/svg">'+svginnerContent+'</svg>';
  const blob = new Blob([svgContent], {
      type: "image/svg+xml"
  });
  const url = window.URL.createObjectURL(blob);
  const link = gradientsave;
  link.target = "_blank";
  link.download = "gradient.svg";
  link.href = url;
}
illustrationsave.onclick = () => {
  const svginnerContent = document.getElementById("illustrationsvg").innerHTML;
  //const svgContent = document.getElementById("illustrationsvg").outerHTML;
  const svgContent = '<svg id="illustrationsvg" width="800px" height="600px" viewBox="0 110 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">'+svginnerContent+'</svg>';
  const blob = new Blob([svgContent], {
      type: "image/svg+xml"
  });
  const url = window.URL.createObjectURL(blob);
  const link = illustrationsave;
  link.target = "_blank";
  link.download = "illustration.svg";
  link.href = url;
}
uisave.onclick = () => {
  const svginnerContent = document.getElementById("uisvg").innerHTML;
  //const svgContent = document.getElementById("uisvg").outerHTML;
  const svgContent = '<svg id="uisvg" width="600px" height="600px" viewBox="0 120 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">'+svginnerContent+'</svg>';
  const blob = new Blob([svgContent], {
      type: "image/svg+xml"
  });
  const url = window.URL.createObjectURL(blob);
  const link = uisave;
  link.target = "_blank";
  link.download = "UI.svg";
  link.href = url;
}
imagesave.onclick = () => {
  const url = canvas.toDataURL();
  const link = imagesave;
  link.href = url;
  link.target = "_blank";
  link.download = "Image.png";
}
uploadedimagesave1.onclick = () => {
  const url = uploadcanvas1.toDataURL();
  const link = uploadedimagesave1;
  link.href = url;
  link.target = "_blank";
  link.download = "Image1.png";
}
uploadedimagesave2.onclick = () => {
  const url = uploadcanvas2.toDataURL();
  const link = uploadedimagesave2;
  link.href = url;
  link.target = "_blank";
  link.download = "Image2.png";
}
uploadedimagesave3.onclick = () => {
  const url = uploadcanvas3.toDataURL();
  const link = uploadedimagesave3;
  link.href = url;
  link.target = "_blank";
  link.download = "Image3.png";
}
uploadedimagesave4.onclick = () => {
  const url = uploadcanvas4.toDataURL();
  const link = uploadedimagesave4;
  link.href = url;
  link.target = "_blank";
  link.download = "Image4.png";
}
uploadedimagesave5.onclick = () => {
  const url = uploadcanvas5.toDataURL();
  const link = uploadedimagesave5;
  link.href = url;
  link.target = "_blank";
  link.download = "Image5.png";
}
uploadedimagesave6.onclick = () => {
  const url = uploadcanvas6.toDataURL();
  const link = uploadedimagesave6;
  link.href = url;
  link.target = "_blank";
  link.download = "Image6.png";
}
palettesave.onclick = () => {
  const palettesvgcolumn = document.getElementsByClassName('palettesvgcolumn');
  for(let i=0; i<6; i++){
    palettesvgcolumn[i].setAttribute('fill',finalpalette[i]);
  }

  const svgContent = document.getElementById("palettesvg").outerHTML;
  const blob = new Blob([svgContent], {
      type: "image/svg+xml"
  });
  const url = window.URL.createObjectURL(blob);
  const link = palettesave;
  link.target = "_blank";
  link.download = "Palette.svg";
  link.href = url;
}
gridsave.onclick = () => {
  const gridsvgcell = document.getElementsByClassName('gridsvgcell');
  for(let i=0; i<gridsvgcell.length; i++){
    let bgColor = window.getComputedStyle(gridcell[i], null).getPropertyValue("background-color");
    gridsvgcell[i].setAttribute('fill', bgColor);
  }
  const svgContent = document.getElementById("gridsvg").outerHTML;
  const blob = new Blob([svgContent], {
      type: "image/svg+xml"
  });
  const url = window.URL.createObjectURL(blob);
  const link = gridsave;
  link.target = "_blank";
  link.download = "Grid.svg";
  link.href = url;
}

//deleting
uploadedimagedelete1.onclick = () => {
  if(document.getElementById('uploadedimagecontainer1').style.display == 'block'){
    if(document.getElementById('uploadedimagecontainer2').style.display == 'block'){
      if(document.getElementById('uploadedimagecontainer3').style.display == 'block'){
        if(document.getElementById('uploadedimagecontainer4').style.display == 'block'){
          if(document.getElementById('uploadedimagecontainer5').style.display == 'block'){
            if(document.getElementById('uploadedimagecontainer6').style.display == 'block'){
              u=6;
            }else{u=5;}
          }else{u=4;}
        }else{u=3;}
      }else{u=2;}
    }else{u=1;}
  }else{u=0;}
  if(u == 6){
    generateuploadimage(uploadcanvas1, uploadcontext1, uploadimgdata2);
    generateuploadimage(uploadcanvas2, uploadcontext2, uploadimgdata3);
    generateuploadimage(uploadcanvas3, uploadcontext3, uploadimgdata4);
    generateuploadimage(uploadcanvas4, uploadcontext4, uploadimgdata5);
    generateuploadimage(uploadcanvas5, uploadcontext5, uploadimgdata6);
    uploadedimagecontainer6.style.display = "none";
    uploadimgdata1 = uploadcontext1.getImageData(0, 0, uploadcanvas1.width, uploadcanvas1.height);
    uploadimgdata2 = uploadcontext2.getImageData(0, 0, uploadcanvas2.width, uploadcanvas2.height);
    uploadimgdata3 = uploadcontext3.getImageData(0, 0, uploadcanvas3.width, uploadcanvas3.height);
    uploadimgdata4 = uploadcontext4.getImageData(0, 0, uploadcanvas4.width, uploadcanvas4.height);
    uploadimgdata5 = uploadcontext5.getImageData(0, 0, uploadcanvas5.width, uploadcanvas5.height);
  }
  if(u == 5){
    generateuploadimage(uploadcanvas1, uploadcontext1, uploadimgdata2);
    generateuploadimage(uploadcanvas2, uploadcontext2, uploadimgdata3);
    generateuploadimage(uploadcanvas3, uploadcontext3, uploadimgdata4);
    generateuploadimage(uploadcanvas4, uploadcontext4, uploadimgdata5);
    uploadedimagecontainer5.style.display = "none";
    uploadimgdata1 = uploadcontext1.getImageData(0, 0, uploadcanvas1.width, uploadcanvas1.height);
    uploadimgdata2 = uploadcontext2.getImageData(0, 0, uploadcanvas2.width, uploadcanvas2.height);
    uploadimgdata3 = uploadcontext3.getImageData(0, 0, uploadcanvas3.width, uploadcanvas3.height);
    uploadimgdata4 = uploadcontext4.getImageData(0, 0, uploadcanvas4.width, uploadcanvas4.height);
  }
  if(u == 4){
    generateuploadimage(uploadcanvas1, uploadcontext1, uploadimgdata2);
    generateuploadimage(uploadcanvas2, uploadcontext2, uploadimgdata3);
    generateuploadimage(uploadcanvas3, uploadcontext3, uploadimgdata4);
    uploadedimagecontainer4.style.display = "none";
    uploadimgdata1 = uploadcontext1.getImageData(0, 0, uploadcanvas1.width, uploadcanvas1.height);
    uploadimgdata2 = uploadcontext2.getImageData(0, 0, uploadcanvas2.width, uploadcanvas2.height);
    uploadimgdata3 = uploadcontext3.getImageData(0, 0, uploadcanvas3.width, uploadcanvas3.height);
  }
  if(u == 3){
    generateuploadimage(uploadcanvas1, uploadcontext1, uploadimgdata2);
    generateuploadimage(uploadcanvas2, uploadcontext2, uploadimgdata3);
    uploadedimagecontainer3.style.display = "none";
    uploadimgdata1 = uploadcontext1.getImageData(0, 0, uploadcanvas1.width, uploadcanvas1.height);
    uploadimgdata2 = uploadcontext2.getImageData(0, 0, uploadcanvas2.width, uploadcanvas2.height);
  }
  if(u == 2){
    generateuploadimage(uploadcanvas1, uploadcontext1, uploadimgdata2);
    uploadedimagecontainer2.style.display = "none";
    uploadimgdata1 = uploadcontext1.getImageData(0, 0, uploadcanvas1.width, uploadcanvas1.height);
  }
  if(u == 1){
    uploadedimagecontainer1.style.display = "none";
    uploadonlycheck.checked = false;
    uploadonlytoggle.style.display = "none";
  }
  togglecheck();
}
uploadedimagedelete2.onclick = () => {
  if(document.getElementById('uploadedimagecontainer1').style.display == 'block'){
    if(document.getElementById('uploadedimagecontainer2').style.display == 'block'){
      if(document.getElementById('uploadedimagecontainer3').style.display == 'block'){
        if(document.getElementById('uploadedimagecontainer4').style.display == 'block'){
          if(document.getElementById('uploadedimagecontainer5').style.display == 'block'){
            if(document.getElementById('uploadedimagecontainer6').style.display == 'block'){
              u=6;
            }else{u=5;}
          }else{u=4;}
        }else{u=3;}
      }else{u=2;}
    }else{u=1;}
  }else{u=0;}
  if(u == 6){
    generateuploadimage(uploadcanvas2, uploadcontext2, uploadimgdata3);
    generateuploadimage(uploadcanvas3, uploadcontext3, uploadimgdata4);
    generateuploadimage(uploadcanvas4, uploadcontext4, uploadimgdata5);
    generateuploadimage(uploadcanvas5, uploadcontext5, uploadimgdata6);
    uploadedimagecontainer6.style.display = "none";
    uploadimgdata2 = uploadcontext2.getImageData(0, 0, uploadcanvas2.width, uploadcanvas2.height);
    uploadimgdata3 = uploadcontext3.getImageData(0, 0, uploadcanvas3.width, uploadcanvas3.height);
    uploadimgdata4 = uploadcontext4.getImageData(0, 0, uploadcanvas4.width, uploadcanvas4.height);
    uploadimgdata5 = uploadcontext5.getImageData(0, 0, uploadcanvas5.width, uploadcanvas5.height);
  }
  if(u == 5){
    generateuploadimage(uploadcanvas2, uploadcontext2, uploadimgdata3);
    generateuploadimage(uploadcanvas3, uploadcontext3, uploadimgdata4);
    generateuploadimage(uploadcanvas4, uploadcontext4, uploadimgdata5);
    uploadedimagecontainer5.style.display = "none";
    uploadimgdata2 = uploadcontext2.getImageData(0, 0, uploadcanvas2.width, uploadcanvas2.height);
    uploadimgdata3 = uploadcontext3.getImageData(0, 0, uploadcanvas3.width, uploadcanvas3.height);
    uploadimgdata4 = uploadcontext4.getImageData(0, 0, uploadcanvas4.width, uploadcanvas4.height);
  }
  if(u == 4){
    generateuploadimage(uploadcanvas2, uploadcontext2, uploadimgdata3);
    generateuploadimage(uploadcanvas3, uploadcontext3, uploadimgdata4);
    uploadedimagecontainer4.style.display = "none";
    uploadimgdata2 = uploadcontext2.getImageData(0, 0, uploadcanvas2.width, uploadcanvas2.height);
    uploadimgdata3 = uploadcontext3.getImageData(0, 0, uploadcanvas3.width, uploadcanvas3.height);
  }
  if(u == 3){
    generateuploadimage(uploadcanvas2, uploadcontext2, uploadimgdata3);
    uploadedimagecontainer3.style.display = "none";
    uploadimgdata2 = uploadcontext2.getImageData(0, 0, uploadcanvas2.width, uploadcanvas2.height);
  }
  if(u == 2){
    uploadedimagecontainer2.style.display = "none";
  }
  togglecheck();
}
uploadedimagedelete3.onclick = () => {
  if(document.getElementById('uploadedimagecontainer1').style.display == 'block'){
    if(document.getElementById('uploadedimagecontainer2').style.display == 'block'){
      if(document.getElementById('uploadedimagecontainer3').style.display == 'block'){
        if(document.getElementById('uploadedimagecontainer4').style.display == 'block'){
          if(document.getElementById('uploadedimagecontainer5').style.display == 'block'){
            if(document.getElementById('uploadedimagecontainer6').style.display == 'block'){
              u=6;
            }else{u=5;}
          }else{u=4;}
        }else{u=3;}
      }else{u=2;}
    }else{u=1;}
  }else{u=0;}
  if(u == 6){
    generateuploadimage(uploadcanvas3, uploadcontext3, uploadimgdata4);
    generateuploadimage(uploadcanvas4, uploadcontext4, uploadimgdata5);
    generateuploadimage(uploadcanvas5, uploadcontext5, uploadimgdata6);
    uploadedimagecontainer6.style.display = "none";
    uploadimgdata3 = uploadcontext3.getImageData(0, 0, uploadcanvas3.width, uploadcanvas3.height);
    uploadimgdata4 = uploadcontext4.getImageData(0, 0, uploadcanvas4.width, uploadcanvas4.height);
    uploadimgdata5 = uploadcontext5.getImageData(0, 0, uploadcanvas5.width, uploadcanvas5.height);
  }
  if(u == 5){
    generateuploadimage(uploadcanvas3, uploadcontext3, uploadimgdata4);
    generateuploadimage(uploadcanvas4, uploadcontext4, uploadimgdata5);
    uploadedimagecontainer5.style.display = "none";
    uploadimgdata3 = uploadcontext3.getImageData(0, 0, uploadcanvas3.width, uploadcanvas3.height);
    uploadimgdata4 = uploadcontext4.getImageData(0, 0, uploadcanvas4.width, uploadcanvas4.height);
  }
  if(u == 4){
    generateuploadimage(uploadcanvas3, uploadcontext3, uploadimgdata4);
    uploadedimagecontainer4.style.display = "none";
    uploadimgdata3 = uploadcontext3.getImageData(0, 0, uploadcanvas3.width, uploadcanvas3.height);
  }
  if(u == 3){
    uploadedimagecontainer3.style.display = "none";
  }
  togglecheck();
}
uploadedimagedelete4.onclick = () => {
  if(document.getElementById('uploadedimagecontainer1').style.display == 'block'){
    if(document.getElementById('uploadedimagecontainer2').style.display == 'block'){
      if(document.getElementById('uploadedimagecontainer3').style.display == 'block'){
        if(document.getElementById('uploadedimagecontainer4').style.display == 'block'){
          if(document.getElementById('uploadedimagecontainer5').style.display == 'block'){
            if(document.getElementById('uploadedimagecontainer6').style.display == 'block'){
              u=6;
            }else{u=5;}
          }else{u=4;}
        }else{u=3;}
      }else{u=2;}
    }else{u=1;}
  }else{u=0;}
  if(u == 6){
    generateuploadimage(uploadcanvas4, uploadcontext4, uploadimgdata5);
    generateuploadimage(uploadcanvas5, uploadcontext5, uploadimgdata6);
    uploadedimagecontainer6.style.display = "none";
    uploadimgdata4 = uploadcontext4.getImageData(0, 0, uploadcanvas4.width, uploadcanvas4.height);
    uploadimgdata5 = uploadcontext5.getImageData(0, 0, uploadcanvas5.width, uploadcanvas5.height);
  }
  if(u == 5){
    generateuploadimage(uploadcanvas4, uploadcontext4, uploadimgdata5);
    uploadedimagecontainer5.style.display = "none";
    uploadimgdata4 = uploadcontext4.getImageData(0, 0, uploadcanvas4.width, uploadcanvas4.height);
  }
  if(u == 4){
    uploadedimagecontainer4.style.display = "none";
  }
  togglecheck();
}
uploadedimagedelete5.onclick = () => {
  if(document.getElementById('uploadedimagecontainer1').style.display == 'block'){
    if(document.getElementById('uploadedimagecontainer2').style.display == 'block'){
      if(document.getElementById('uploadedimagecontainer3').style.display == 'block'){
        if(document.getElementById('uploadedimagecontainer4').style.display == 'block'){
          if(document.getElementById('uploadedimagecontainer5').style.display == 'block'){
            if(document.getElementById('uploadedimagecontainer6').style.display == 'block'){
              u=6;
            }else{u=5;}
          }else{u=4;}
        }else{u=3;}
      }else{u=2;}
    }else{u=1;}
  }else{u=0;}
  if(u == 6){
    generateuploadimage(uploadcanvas5, uploadcontext5, uploadimgdata6);
    uploadedimagecontainer6.style.display = "none";
    uploadimgdata5 = uploadcontext5.getImageData(0, 0, uploadcanvas5.width, uploadcanvas5.height);
  }
  if(u == 5){
    uploadedimagecontainer5.style.display = "none";
  }
  togglecheck();
}
uploadedimagedelete6.onclick = () => {
  if(document.getElementById('uploadedimagecontainer1').style.display == 'block'){
    if(document.getElementById('uploadedimagecontainer2').style.display == 'block'){
      if(document.getElementById('uploadedimagecontainer3').style.display == 'block'){
        if(document.getElementById('uploadedimagecontainer4').style.display == 'block'){
          if(document.getElementById('uploadedimagecontainer5').style.display == 'block'){
            if(document.getElementById('uploadedimagecontainer6').style.display == 'block'){
              u=6;
            }else{u=5;}
          }else{u=4;}
        }else{u=3;}
      }else{u=2;}
    }else{u=1;}
  }else{u=0;}
  if(u == 6){
    uploadedimagecontainer6.style.display = "none";
  }
  togglecheck();
}

//shuffling
gradientshuffle.onclick = () => shufflegradient();
illustrationshuffle.onclick = () => shuffleillustration();
uishuffle.onclick = () => shuffleui();


//uploading
imageLoader.addEventListener('change', handleImage, false);
imageLoader.addEventListener('change', handleImage2, false);
imageLoader.addEventListener('change', handleImage3, false);
imageLoader.addEventListener('change', handleImage4, false);
imageLoader.addEventListener('change', handleImage5, false);
imageLoader.addEventListener('change', handleImage6, false);
imageLoader.onclick = function () {
  this.value = null;
};

function readeronload(event){
  var image = new Image();
      image.src = event.target.result;
      image.onload = function(){
        if(document.getElementById('uploadedimagecontainer1').style.display == 'block'){
          if(document.getElementById('uploadedimagecontainer2').style.display == 'block'){
            if(document.getElementById('uploadedimagecontainer3').style.display == 'block'){
              if(document.getElementById('uploadedimagecontainer4').style.display == 'block'){
                if(document.getElementById('uploadedimagecontainer5').style.display == 'block'){
                  if(document.getElementById('uploadedimagecontainer6').style.display == 'block'){
                    alert('Max upload limit reached')
                  }else{
                    if(image.width >= image.height){
                      uploadcanvas6.width = (image.width/image.height)*800;
                      uploadcanvas6.height = 800;
                    }else{
                      uploadcanvas6.width = 800;
                      uploadcanvas6.height = (image.height/image.width)*800;
                    }
                    uploadcontext6.drawImage(image, 0, 0, uploadcanvas6.width, uploadcanvas6.height);
                    uploadimgdata6 = uploadcontext6.getImageData(0, 0, uploadcanvas6.width, uploadcanvas6.height);
                    document.getElementById('uploadedimagecontainer6').style.display = 'block';
                    generateuploadimage(uploadcanvas6, uploadcontext6, uploadimgdata6);
                    
                  }
                }else{
                  if(image.width >= image.height){
                    uploadcanvas5.width = (image.width/image.height)*800;
                    uploadcanvas5.height = 800;
                  }else{
                    uploadcanvas5.width = 800;
                    uploadcanvas5.height = (image.height/image.width)*800;
                  }
                  uploadcontext5.drawImage(image, 0, 0, uploadcanvas5.width, uploadcanvas5.height);
                  uploadimgdata5 = uploadcontext5.getImageData(0, 0, uploadcanvas5.width, uploadcanvas5.height);
                  document.getElementById('uploadedimagecontainer5').style.display = 'block';
                  generateuploadimage(uploadcanvas5, uploadcontext5, uploadimgdata5);
                  
                }
              }else{
                if(image.width >= image.height){
                  uploadcanvas4.width = (image.width/image.height)*800;
                  uploadcanvas4.height = 800;
                }else{
                  uploadcanvas4.width = 800;
                  uploadcanvas4.height = (image.height/image.width)*800;
                }
                uploadcontext4.drawImage(image, 0, 0, uploadcanvas4.width, uploadcanvas4.height);
                uploadimgdata4 = uploadcontext4.getImageData(0, 0, uploadcanvas4.width, uploadcanvas4.height);
                document.getElementById('uploadedimagecontainer4').style.display = 'block';
                generateuploadimage(uploadcanvas4, uploadcontext4, uploadimgdata4);
                
              }
            }else{
              if(image.width >= image.height){
                uploadcanvas3.width = (image.width/image.height)*800;
                uploadcanvas3.height = 800;
              }else{
                uploadcanvas3.width = 800;
                uploadcanvas3.height = (image.height/image.width)*800;
              }
              uploadcontext3.drawImage(image, 0, 0, uploadcanvas3.width, uploadcanvas3.height);
              uploadimgdata3 = uploadcontext3.getImageData(0, 0, uploadcanvas3.width, uploadcanvas3.height);
              document.getElementById('uploadedimagecontainer3').style.display = 'block';
              generateuploadimage(uploadcanvas3, uploadcontext3, uploadimgdata3);
              
            }
          }else{
            if(image.width >= image.height){
              uploadcanvas2.width = (image.width/image.height)*800;
              uploadcanvas2.height = 800;
            }else{
              uploadcanvas2.width = 800;
              uploadcanvas2.height = (image.height/image.width)*800;
            }
            uploadcontext2.drawImage(image, 0, 0, uploadcanvas2.width, uploadcanvas2.height);
            uploadimgdata2 = uploadcontext2.getImageData(0, 0, uploadcanvas2.width, uploadcanvas2.height);
            document.getElementById('uploadedimagecontainer2').style.display = 'block';
            generateuploadimage(uploadcanvas2, uploadcontext2, uploadimgdata2);
            
          }
        }
        else{
          if(image.width >= image.height){
            uploadcanvas1.width = (image.width/image.height)*800;
            uploadcanvas1.height = 800;
          }else{
            uploadcanvas1.width = 800;
            uploadcanvas1.height = (image.height/image.width)*800;
          }
          uploadcontext1.drawImage(image, 0, 0, uploadcanvas1.width, uploadcanvas1.height);
          uploadimgdata1 = uploadcontext1.getImageData(0, 0, uploadcanvas1.width, uploadcanvas1.height);
          document.getElementById('uploadedimagecontainer1').style.display = 'block';
          generateuploadimage(uploadcanvas1, uploadcontext1, uploadimgdata1);
        }
      }
}

var error = 0;
var error2 = 0;

function handleImage(e){
  error = 0;
  error2 = 0;
  var type = imageLoader.files[0].type;
  var size = imageLoader.files[0].size / 1024 / 1024;
  
  if(size > 5){
    alert('One of the file size exceeds 5 MB');
    error2 = 1;
    return false;
  }else{
    var reader = new FileReader();
    reader.onload = function(event){
    readeronload(event);
    }
    reader.readAsDataURL(e.target.files[0]);  
    uploadonlytoggle.style.display = "block";
    if(window.matchMedia("(min-width: 960px)").matches){
      document.getElementById('uploadcontainer').style.marginLeft = "7vh";
    }
      
  }
  
}
function handleImage2(e){
  var type = imageLoader.files[1].type;
  var size = imageLoader.files[1].size / 1024 / 1024;
  
  if(size > 5){
    if(error2 != 1){
      alert('One of the file size exceeds 5 MB');
      error2 = 1;
    }
    return false;
  }else{
  var reader = new FileReader();
  reader.onload = function(event){
    readeronload(event);
  }
  reader.readAsDataURL(e.target.files[1]);  
}
 
}
function handleImage3(e){
  var type = imageLoader.files[2].type;
  var size = imageLoader.files[2].size / 1024 / 1024;
  
  if(size > 5){
    if(error2 != 1){
      alert('One of the file size exceeds 5 MB');
      error2 = 1;
    }
    return false;
  }else{
  var reader = new FileReader();
  reader.onload = function(event){
    readeronload(event);
  }
  reader.readAsDataURL(e.target.files[2]);  
}
 
}
function handleImage4(e){
  var type = imageLoader.files[3].type;
  var size = imageLoader.files[3].size / 1024 / 1024;
  
  if(size > 5){
    if(error2 != 1){
      alert('One of the file size exceeds 5 MB');
      error2 = 1;
    }
    return false;
  }else{
  var reader = new FileReader();
  reader.onload = function(event){
    readeronload(event);
  }
  reader.readAsDataURL(e.target.files[3]);  
}
 
}
function handleImage5(e){
  var type = imageLoader.files[4].type;
  var size = imageLoader.files[4].size / 1024 / 1024;
  
  if(size > 5){
    if(error2 != 1){
      alert('One of the file size exceeds 5 MB');
      error2 = 1;
    }
    return false;
  }else{
  var reader = new FileReader();
  reader.onload = function(event){
    readeronload(event);
  }
  reader.readAsDataURL(e.target.files[4]);  
}
 
}
function handleImage6(e){
  var type = imageLoader.files[5].type;
  var size = imageLoader.files[5].size / 1024 / 1024;
  
  if(size > 5){
    if(error2 != 1){
      alert('One of the file size exceeds 5 MB');
      error2 = 1;
    }
    return false;
  }else{
  var reader = new FileReader();
  reader.onload = function(event){
    readeronload(event);
  }
reader.readAsDataURL(e.target.files[5]);  
}
 
}

uploadonlycheck.onchange = () => {togglelayout();}

function togglecheck(){
  const check = uploadonlycheck.checked;
  if(check == true){
    gradient.style.display = "none";
    imagecontainer.style.display = "none";
    illustrationcontainer.style.display = "none";
    uicontainer.style.display = "none";
    document.getElementById('toggleslider').style.backgroundColor = inputcolor.value;
    if(window.matchMedia("(min-width: 960px)").matches){
      uploadedimagecontainer1.style.margin = "53vh 0 0 -86vh";
      uploadedimagecontainer2.style.margin = "53vh 0 0 6vh";
      uploadedimagecontainer3.style.margin = "7vh 0 0 6vh";
      uploadedimagecontainer4.style.margin = "53vh 0 0 -40vh";
      uploadedimagecontainer5.style.margin = "7vh 0 0 6vh";
      uploadedimagecontainer6.style.margin = "53vh 0 0 -40vh";
      palette.style.width = "86vh";
      palette.style.height = "40vh";
      if(uploadedimagecontainer2.style.display !== "block"){
        document.getElementById('uploadcontainer').style.marginLeft = "53vh";
      }
    }
  }
  if(check == false){
    gradient.style.display = "block";
    imagecontainer.style.display = "block";
    illustrationcontainer.style.display = "block";
    uicontainer.style.display = "block";
    document.getElementById('toggleslider').style.backgroundColor = inputcolor.value + "7E";
    if(window.matchMedia("(min-width: 960px)").matches){
      uploadedimagecontainer1.style.margin = "7vh 0 0 6vh";
      uploadedimagecontainer2.style.margin = "53vh 0 0 -40vh";
      uploadedimagecontainer3.style.margin = "7vh 0 0 6vh";
      uploadedimagecontainer4.style.margin = "53vh 0 0 -40vh";
      uploadedimagecontainer5.style.margin = "7vh 0 0 6vh";
      uploadedimagecontainer6.style.margin = "53vh 0 0 -40vh";
      palette.style.width = "93vh";
      palette.style.height = "42.5vh";
      if(uploadedimagecontainer2.style.display !== "block"){
      document.getElementById('uploadcontainer').style.marginLeft = "7vh";
      }
    }  
  }
}

function togglelayout(){
  imagecontainer.style.opacity = '0';
  illustrationcontainer.style.opacity = '0';
  uicontainer.style.opacity = '0';
  gradient.style.opacity = '0';
  uploadedimagecontainer1.style.opacity = '0';
  uploadedimagecontainer2.style.opacity = '0';
  uploadedimagecontainer3.style.opacity = '0';
  uploadedimagecontainer4.style.opacity = '0';
  uploadedimagecontainer5.style.opacity = '0';
  uploadedimagecontainer6.style.opacity = '0';

  setTimeout(function(){
    togglecheck();
   }, 500);
  setTimeout(function(){
    imagecontainer.style.opacity = '1';
    illustrationcontainer.style.opacity = '1';
    uicontainer.style.opacity = '1';
    gradient.style.opacity = '1';
    uploadedimagecontainer1.style.opacity = '1';
    uploadedimagecontainer2.style.opacity = '1';
    uploadedimagecontainer3.style.opacity = '1';
    uploadedimagecontainer4.style.opacity = '1';
    uploadedimagecontainer5.style.opacity = '1';
    uploadedimagecontainer6.style.opacity = '1';
   }, 800);
}

//mobilehamburger
function mobheaderscroll(){
  if(window.matchMedia("(max-width: 959px)").matches){
    if(flex.scrollTop >= vhTOpx(50)){
      document.getElementById('mobileheader').style.opacity = "1";
      document.getElementById('mobileheader').style.height = "24vw";
      document.getElementById('controls').style.display = "none";
      setTimeout(function(){
        document.getElementById('controls').style.opacity = "0";
      }, 100);
      expanded = 0;
    }
    else if(flex.scrollTop < vhTOpx(100)){
      document.getElementById('mobileheader').style.opacity = "0";
    }
  }
}
flex.onscroll = () => {
  mobheaderscroll();
}
var expanded = 0;
document.getElementById('hamburger').onclick = () => {
  if(window.matchMedia("(max-width: 959px)").matches){
    if(expanded == 0){
      document.getElementById('mobileheader').style.height = "80vh";
      document.getElementById('controls').style.display = "block";
      setTimeout(function(){
        document.getElementById('controls').style.opacity = "1";
      }, 100);
      expanded = 1;
    }
    else if(expanded == 1){
      document.getElementById('mobileheader').style.height = "24vw";
      document.getElementById('controls').style.display = "none";
      setTimeout(function(){
        document.getElementById('controls').style.opacity = "0";
      }, 100);
      expanded = 0;
    }
    
  }
}

//verification

function verify(text, key){
  const obj = JSON.parse(text);
  var success = obj.success;
  var uses = obj.uses;
  if(success == true){
    document.getElementById('keycontainer').style.display = "none";
    document.getElementById('uploadcontainer').style.display = "block";
  }
  if(success == false){
    document.getElementById('keycontainer').style.display = "block";
    document.getElementById('uploadcontainer').style.display = "none";
  }
  console.log(uses);
}

function verifyonclick(text, key){
  const obj = JSON.parse(text);
  var success = obj.success;
  var uses = obj.uses;
  if(success == true){
    document.getElementById('keycontainer').style.display = "none";
    document.getElementById('uploadcontainer').style.display = "block";

    localStorage.setItem('storedkey', key);
  }
  if(success == false){
    document.getElementById('errormsg').innerHTML = "Invalid key!";
  }
  console.log(uses);
}

document.getElementById('submitkeybtn').onclick = () => {

  var key = document.getElementById('keyinput').value;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "post",
    headers: myHeaders,
    redirect: "follow",
  };

  var url = "https://api.gumroad.com/v2/licenses/verify?product_permalink=Dphij&license_key=" + key;

  fetch(url, requestOptions)
    .then(response => response.text())
    .then(result => verifyonclick(result, key))
    .catch(error => verifyonclick(error, key));
}

