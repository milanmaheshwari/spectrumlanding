//variables
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
var extremeneutralindex;
var finalpalette = [];

//elements
const shadestab = document.getElementById('shades');
const huestab = document.getElementById('hues');
const customtab = document.getElementById('custom');
const palettegapslider = document.getElementById('palettegap');
const shufflebtn = document.getElementById('paletteshuffle');
const canvas = document.getElementById('imagecanvas');
var context = canvas.getContext('2d');
const orthopaletteslider = document.getElementById('orthopalette');
const colorpicker = document.getElementById('colorpicker');
const colorpickerlabel = document.getElementById('colorpickerlabel');
const inputcolor = document.getElementById('inputcolor');
const submitarrow = document.getElementById('submitarrow');

const home = document.getElementById('home');
const logo = document.getElementById('logo');
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

const gridcell = document.getElementsByClassName('gridcell');
const gridbasecolor = document.getElementsByClassName('gridbasecoloricon');
const gridcopy = document.getElementsByClassName('gridcopyicon');
const gridcopytext = document.getElementsByClassName('gridcopytext');
const gridheadingp = document.getElementById('gridheadingp');

const gradientsave = document.getElementById('gradientsave');
const illustrationsave = document.getElementById('illustrationsave');
const uisave = document.getElementById('uisave');
const gradientshuffle = document.getElementById('gradientshuffle');
const illustrationshuffle = document.getElementById('illustrationshuffle');
const uishuffle = document.getElementById('uishuffle');
const contenticoncircle = document.getElementsByClassName('contenticoncircle');

const themetoggle = document.getElementById('themeicon');
const themetoggle2 = document.getElementById('themeicon2');

//scroll
var scroll = 0;
window.addEventListener("wheel", event => {
  var deltaY = event.deltaY;
  var deltaX = event.deltaX;
  if (deltaY > 0 || deltaX > 0) {
    scroll -= 1;
  } else if (deltaY < 0 || deltaX < 0) {
    scroll += 1;
  }

  //controlcontainer.style.left = "calc(100vw + 7vh + " + JSON.stringify(scroll) + "vh)";

});

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
  
  if(harmony == "shades"){
    document.getElementById('sliders').style.display = 'block';
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
    var x = huestartindex;
    var y = (x + 4)%33;
    var z = (x + 16)%33;
    var n = extremeneutralindex*32;

    if(huessetindex<8){
      customset[0] = hues[huessetindex];
      customset[1] = hues[huessetindex+8];
      customset[2] = hues[huessetindex+16];
      custompalette = [customset[0][x], customset[1][x], customset[0][y], customset[1][y], customset[0][z], neutrals[n]];
    }
    else if(huessetindex>24){
      customset[0] = hues[huessetindex-16];
      customset[1] = hues[huessetindex-8];
      customset[2] = hues[huessetindex];
      custompalette = [customset[2][x], customset[1][x], customset[2][y], customset[1][y], customset[2][z], neutrals[n]];
    }
    else if(huessetindex>=8 && huessetindex<=24){
      customset[0] = hues[huessetindex+8];
      customset[1] = hues[huessetindex];
      customset[2] = hues[huessetindex-8];
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
  generatecontrolpanel();
  generategradient();
  generateillustration();
  generateui();
  generateimage();
}

function shufflepalette(){
  var harmony = document.querySelector('input[name = harmony]:checked').value;
  if(harmony == "shades"){shadestartindex = randomInteger(0,32);}
  if(harmony == "hues"){huestartindex = randomInteger(0,32);}
  if(harmony == "custom"){huestartindex = randomInteger(0,32); extremeneutralindex = randomInteger(0,1);}
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
  let ps = shades[shadessetindex];
  let pi = [x, (x + y), (x + 2*y), (x + 3*y), (x + 4*y), (x + 5*y)];
  var fp = [ps[pi[0]], ps[pi[1]], ps[pi[2]], ps[pi[3]], ps[pi[4]], ps[pi[5]]];

  document.getElementById('logorect1').setAttribute('fill', fp[0]);
  document.getElementById('logorect2').setAttribute('fill', fp[1]);
  document.getElementById('logorect3').setAttribute('fill', fp[2]);
  document.getElementById('logorect4').setAttribute('fill', fp[3]);
  document.getElementById('logorect5').setAttribute('fill', fp[4]);
  document.getElementById('logorect6').setAttribute('fill', fp[5]);
}

function generatecontrolpanel(){
  if(t==1){
    //var darkhex = hsltohex(hextohsl(finalpalette[0]).h, hextohsl(finalpalette[0]).s, 0.85);
    var darkhex = hsltohex(hextohsl(inputcolor.value).h, hextohsl(inputcolor.value).s, 0.85);
    var darkhexop = darkhex + "4D";
    //document.body.style.backgroundColor = hsltohex(hextohsl(finalpalette[0]).h, hextohsl(finalpalette[0]).s, 0.025);
    document.body.style.backgroundColor = hsltohex(hextohsl(inputcolor.value).h, hextohsl(inputcolor.value).s, 0.025);
    for(let i=0; i<3; i++){
      harmonylistli[i].style.color = darkhex;
    }
    for(let i=0; i<2; i++){
      sliderlabel[i].style.color = darkhex;
    }
    for(let i=0; i<2; i++){
      slider[i].style.setProperty("--thumbBg", darkhex);
      slider[i].style.setProperty("--progressBg", darkhex);
      slider[i].style.setProperty("--trackBg", darkhexop);
    }
    gridheadingp.style.color = darkhex;
    inputcolor.style.color = darkhex;
    submitarrow.setAttribute('fill', darkhex);
    document.getElementById('themeicon').style.display = "block";
    document.getElementById('themeicon2').style.display = "none";
    document.getElementById('themeiconpath').setAttribute('fill', darkhex);
    for(let i=0; i<9; i++){
      document.getElementsByClassName('themeiconpath2')[i].setAttribute('fill', darkhex);
     }

    document.getElementById('twittericonpath').setAttribute('fill', darkhex);
    document.getElementById('homewelcometitle').style.color = darkhex;
    document.getElementById('homeheaderappln').style.color = darkhex;
    document.getElementById('homeheaderarrowsvgpath').setAttribute('fill', darkhex);
    document.getElementById('gridsavepath').setAttribute('fill', darkhex); 
    document.getElementById('gridsaverect').setAttribute('fill', darkhex); 
  }
  if(t==0){
    //var lighthex = hsltohex(hextohsl(finalpalette[0]).h, hextohsl(finalpalette[0]).s, 0.20);
    var lighthex = hsltohex(hextohsl(inputcolor.value).h, hextohsl(inputcolor.value).s, 0.20);
    var lighthexop = lighthex + "4D";
    //document.body.style.backgroundColor = hsltohex(hextohsl(finalpalette[0]).h, hextohsl(finalpalette[0]).s, 0.99);
    document.body.style.backgroundColor = hsltohex(hextohsl(inputcolor.value).h, hextohsl(inputcolor.value).s, 0.99);
    for(let i=0; i<3; i++){
      harmonylistli[i].style.color = lighthex;
    }
    for(let i=0; i<2; i++){
      sliderlabel[i].style.color = lighthex;
    }
    for(let i=0; i<2; i++){
      slider[i].style.setProperty("--thumbBg", lighthex);
      slider[i].style.setProperty("--progressBg", lighthex);
      slider[i].style.setProperty("--trackBg", lighthexop);
    }
    gridheadingp.style.color = lighthex;
    inputcolor.style.color = lighthex;
    submitarrow.setAttribute('fill', lighthex);
    document.getElementById('themeicon').style.display = "none";
    document.getElementById('themeicon2').style.display = "block";
    document.getElementById('themeiconpath').setAttribute('fill', lighthex);
    for(let i=0; i<9; i++){
     document.getElementsByClassName('themeiconpath2')[i].setAttribute('fill', lighthex);
    }

    document.getElementById('twittericonpath').setAttribute('fill', lighthex);
    document.getElementById('homewelcometitle').style.color = lighthex;
    document.getElementById('homeheaderappln').style.color = lighthex;
    document.getElementById('homeheaderarrowsvgpath').setAttribute('fill', lighthex);
    document.getElementById('gridsavepath').setAttribute('fill', lighthex); 
    document.getElementById('gridsaverect').setAttribute('fill', lighthex); 
  }
  document.getElementById('harmonylistcontainer').style.backgroundColor = inputcolor.value + "4D";
  document.getElementById('sliders').style.backgroundColor = inputcolor.value + "4D";
  inputcolor.style.borderColor = inputcolor.value + "4D";
  document.getElementById('homewelcome').style.color = inputcolor.value; 
  document.getElementById('homeheader').style.color = inputcolor.value; 
  document.getElementById('themeiconcircle').setAttribute('fill',inputcolor.value + "4D"); 
  document.getElementById('themeiconcircle2').setAttribute('fill',inputcolor.value + "4D"); 
  document.getElementById('twittericoncircle').setAttribute('fill',inputcolor.value + "4D");

  for(let i=0; i<6; i++){
    columninput[i].value = finalpalette[i];
  }
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

function drawimage(){
  canvas.width = 676;
  canvas.height = 896;
  var sourceimage = new Image();
  //sourceimage.crossOrigin = "Anonymous";
  sourceimage.src = 'building.png';
  context.drawImage(sourceimage, 0, 0, canvas.width, canvas.height);
}
function generateimage(){

  context.clearRect(0, 0, canvas.width, canvas.height);
  drawimage();
  
  var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
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

  context.putImageData(imageData, 0, 0);
}

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

huessetindex = larrbaseindex;
shadessetindex = harrbaseindex;
huestartindex = harrbaseindex;
shadestartindex = larrbaseindex;

for(let i=0; i<33; i++){
  neutrals[i] = hsltohex(ohsl.h, 0, larr[i]);
}

extremeneutralindex = 1;

generategrid();
generatepalette();
}

//logic

window.addEventListener('load', drawimage);
window.addEventListener('load', init);

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

shufflebtn.onclick = () => {
  shufflepalette();
}
document.body.onkeyup = function(e){
  if(e.keyCode == 32){
    shufflepalette();
  }
}
document.body.onkeydown = function(e){
  if(e.keyCode == 32){
    e.preventDefault();
  }
}

inputcolor.onfocus = () => {
  inputcolor.style.borderColor = inputcolor.value;
}

inputcolor.onblur = () => {
  inputcolor.style.borderColor = inputcolor.value + "4D";  
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

[palettegapslider, orthopaletteslider].forEach(item => {
item.onmousemove = () => {handleMove(item)};
item.onmousedown = () => {handleDown()};
item.onmouseup = () => {handleUpAndLeave()};
item.onmouseleave = () => {handleUpAndLeave()};
item.onclick = () => {setCSSProperty(item)};
})

setCSSProperty(palettegapslider);
setCSSProperty(orthopaletteslider);

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
    generatecontrolpanel();
    generategradient();
    generateillustration();
    generateui();
    generateimage();
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
  const svgContent = document.getElementById("gradientsvg").outerHTML;
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
  const svgContent = document.getElementById("illustrationsvg").outerHTML;
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
  const svgContent = document.getElementById("uisvg").outerHTML;
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

//shuffling
gradientshuffle.onclick = () => shufflegradient();
illustrationshuffle.onclick = () => shuffleillustration();
uishuffle.onclick = () => shuffleui();