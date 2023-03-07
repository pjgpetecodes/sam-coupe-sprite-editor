$(document).ready(function() {

    var pixelLines;
    var rowCounter;
    var pixels;
    var cellCounter;

    $('td').click(function() {
        $(this).toggleClass('selectedPixel');
        //$(this).css('background-color', pickers.fgcolor.toHEXString()); 
        update();
    });

    $('#output').hide();
    
    $('#clear').click(function() {
        $('td').removeClass('selectedPixel');
        update();
    });

    $('#generate').click(function() {
        pixelLines = [];
        rowCounter = -1;

        $('#PixelTable').find('tr').each(function() {
            rowCounter += 1;
            pixels = [];
            cellCounter = -1;

            $(this).find('td').each(function() {
                    cellCounter += 1;
                    if ($(this).hasClass('selectedPixel')) {
                        pixels[cellCounter] = 'f';
                    } else {
                        pixels[cellCounter] = 'b';
                    }
                    pixelLines[rowCounter] = pixels;
                }

            );
        });

        var outputString = "<code id='codeBlock'><br>"
        var tab = "&nbsp;&nbsp;&nbsp;&nbsp;"

        outputString += "from sense_hat import SenseHat<br><br>"
        outputString += "sense = SenseHat()<br>"
        outputString += "<br>"
        outputString += "b = " + pickers.bgcolor.toRGBString().replace("rgb", "") + "<br>"
        outputString += "f = " + pickers.fgcolor.toRGBString().replace("rgb", "") + "<br>"
        outputString += "pixels = [<br>";

        for (i = 0; i < 8; i++) {

            outputString += tab + tab + tab;

            for (j = 0; j < 8; j++) {

                if (j != 7) {
                    outputString += pixelLines[j][i] + ", ";
                } else {

                    if (j === 7 && i === 7 )
                    {
                        outputString += pixelLines[j][i] + "<br>"
                    }
                    else
                    {
                        outputString += pixelLines[j][i] + ", <br>"
                    }
                    
                }

            }

        }

        outputString += "]"

        outputString += "<br><br>"

        outputString += "sense.set_pixels(pixels)<br>"
        outputString += "</code>"
        $('#output').html(outputString);

        $('#output').fadeIn();
    
    })

    
});

var options = {
    valueElement: null,
    width: 300,
    height: 120,
    sliderSize: 20,
    position: 'top',
    borderColor: '#CCC',
    insetColor: '#CCC',
    backgroundColor: '#202020'
};

var pickers = {};

pickers.bgcolor = new jscolor('bgcolor-button', options);
pickers.bgcolor.onFineChange = "update('bgcolor')";
pickers.bgcolor.fromString('000000');

pickers.fgcolor = new jscolor('fgcolor-button', options);
pickers.fgcolor.onFineChange = "update('fgcolor')";
pickers.fgcolor.fromString('FFFFFF');

function update (id) {

    var x = document.getElementsByClassName("selectedPixel");
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].style.backgroundColor = pickers.fgcolor.toHEXString();
    }

    var y = document.querySelectorAll("td:not(.selectedPixel)");
    for (i = 0; i < y.length; i++) {
        y[i].style.backgroundColor = pickers.bgcolor.toHEXString();
    }

}

function setHSV (id, h, s, v) {
    pickers[id].fromHSV(h, s, v);
    update(id);
}

function setRGB (id, r, g, b) {
    pickers[id].fromRGB(r, g, b);
    update(id);
}

function setString (id, str) {
    pickers[id].fromString(str);
    update(id);
}

update('bgcolor');
update('fgcolor');