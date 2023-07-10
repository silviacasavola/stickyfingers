data = d3.csv("data/data.csv");

let cards = d3.select("#all-cards");
let info = d3.select("#right-side-container")

let width;
let height;

data.then(function(data) {

    // Join your data to the creation of div elements to the same number of items in your dataset.
    let card = cards.selectAll("div")
    .data(data)
    .join("div")
    .attr("class", "card")
    .on("dragstart", function(event) {
      let d = d3.select(event.currentTarget).datum();

        width = $(this).width();
        height = $(this).height();
        $("#moving-img").css("width", width);
        $("#moving-img").css("height", height);
        $("#moving-img img").attr("src", "img/" + d.path);
        let imgXY = $(this).offset();

        // let date = new Date(d.filing_date);
        // console.log(date)

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
        return path + filename;
    })

    cards.append("a")
    .attr("href", "mailto:stickyfingers@theshulmancenter.com")
    .attr("class", "card pressura")
    .attr("id", "submit")
    .attr("style", function () {
      let height2 = $(this).width();
      return "height: " + height2 + "px";
    })
    .append("div")
    .html("click here<br>to submit<br>your story")
    })

$(document).ready(function() {
    $(document).on("dragstart", "img", function(event) {
      event.preventDefault();
    });
})

function makeitdraggable(d){
        $("#moving-img").draggable({
          stop: function( event, ui ) {
          $("#moving-img").css("display", "none");
          }
        })

        $("#right-side-container").droppable({
            drop: function( event, ui ) {
            $("#preview-text").css("display", "none");
            $("#right-side-container div").css("opacity", "1");
            $("#d-index").html(d.index);
            $("#d-date").html(d.filing_date);
            $("#d-img").attr("src", "img/" + d.path);
            $("#d-item").html(d.item);
            $("#d-name").html(d.protagonist);
            $("#d-age").html(d.age);
            $("#d-job").html(d.job);
            $("#d-location").html(d.location);
            $("#d-interests").html(d.interests);
            $("#d-issues").html(d.related_issue);
            $("#d-text").html(d.story);
          }
        })
  }

  // cards.selectAll("div")
  // .join("div")
  // .attr("class", "card")
  // .attr("background-color", "yellow")
  // .html("oppa")
