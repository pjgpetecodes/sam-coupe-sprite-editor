const cssUrl = 'css/style.css?' + new Date().getTime();
const mainJsUrl = 'scripts/main.js?' + new Date().getTime();
const gridJsUrl = 'scripts/grid.js?' + new Date().getTime();
const colorJsUrl = 'scripts/color.js?' + new Date().getTime();

const cssFile = document.querySelector('link[href="'+cssUrl+'"]');
const mainJsFile = document.querySelector('script[src="'+mainJsUrl+'"]');
const gridJsFile = document.querySelector('script[src="'+gridJsUrl+'"]');
const colorJsFile = document.querySelector('script[src="'+colorJsUrl+'"]');

function bustCaches() {

    if (cssFile) {
        cssFile.href = cssUrl;
      }
      
      if (mainJsFile) {
        mainJsFile.src = mainJsUrl;
      }
      
      if (gridJsFile) {
        gridJsFile.src = gridJsUrl;
      }
      
      if (colorJsFile) {
        colorJsFile.src = colorJsUrl;
      }

}

export {
    bustCaches
}