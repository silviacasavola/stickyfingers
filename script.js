// Interpret the data as the correct format. Use d3.csv or d3.tsv accordingly.
data = d3.csv("data/data.csv");
// let isDragging = false;

// Select the container where we will put our HTML elements
let cards = d3.select("#all-cards");
let info = d3.select("#right-side-container")

// Load data
data.then(function(data) {
    // Do stuff with your data!
    // console.log(data);

    // Join your data to the creation of div elements to the same number of items in your dataset.
    let card = cards.selectAll("div")
    .data(data)
    .join("div")
    .attr("class", "card")
    .on("mousedown", function(event) {
      let d = d3.select(event.currentTarget).datum();

        // isDragging = true;

        width = $(this).width();
        height = $(this).height();
        $("#moving-img").css("width", width);
        $("#moving-img").css("height", height);
        $("#moving-img img").attr("src", "img/" + d.path);
        let imgXY = $(this).offset();

        var imgX = imgXY.left;
        var imgY = imgXY.top;

        $("#moving-img").css("left", imgX)
        $("#moving-img").css("top", imgY)

        $("#moving-img").css("display", "block");

        makeitdraggable(d);
      })
    .on("mouseover", function (event) {
        width = $(this).width();
        height = $(this).height();
        let imgXY = $(this).offset();

        var imgX = imgXY.left;
        var imgY = imgXY.top;

        $("#star").css("display", "block");
        $("#star").css("width", (width/5)*4)
        $("#star").css("left", imgX + width/10)
        $("#star").css("top", imgY + height/10)
    });

    // IMAGE
    card.append("img")
    .attr("class", "card-img-top")
    .attr("src", function(d) {
        let filename = d.path;
        let path = "img/";
        // Concatenate the path and the filename of the image
        return path + filename;
    })

    })

$(document).ready(function() {
    $(document).on("dragstart", "img", function(event) {
      console.log("Dragstart event triggered");
      event.preventDefault();
    });
})

function makeitdraggable(d){
  // if (isdragging) {
        $("#moving-img").draggable({
          stop: function( event, ui ) {
          $("#moving-img").css("display", "none");
          }
        })

        $("#right-side-container").droppable({
            drop: function( event, ui ) {
            $("#right-side-container div").css("opacity", "1");
            $("#object_name").html(d.item);
          }
        })
  }
