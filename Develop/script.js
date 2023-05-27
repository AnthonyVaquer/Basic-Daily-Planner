// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {
  // Display current time/date
  var currentDate = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDate);

  $(function () {
    // TODO: Add a listener for click events on the save button. This code should

    $(".saveBtn").on("click", function () {
      var event = $(this).siblings(".description").val();
      console.log($(this).parent());
      var time = $(this).parent().attr("id");

      // console.log({
      //   time,
      //   event,
      // });

      const eventDetails = {
        id: time,
        time,
        event,
      }; 
      let prevsEvents = JSON.parse(localStorage.getItem("events"));

      if (prevsEvents !== null) {
        // prevsEvents.push(eventDetails);

        // check if item already exists

        const foundEvent = prevsEvents.find((eventItem) => {
          if (eventItem.id === time) {
            return eventItem;
          }
        });

        if (foundEvent) {
          const udpatedEvents = prevsEvents.map((item) => {
            if (item.id === time) {
              item.event = event;
            }
            console.log(item);

            return item;
          });

          localStorage.setItem("events", JSON.stringify(udpatedEvents));
          alert("Your event has been updated.");
          return;
        }

        localStorage.setItem("events", JSON.stringify(prevsEvents));
      } else {
        prevsEvents = [];
        prevsEvents.push(eventDetails);
        localStorage.setItem("events", JSON.stringify(prevsEvents));
      }
      localStorage.setItem(time, event);
      $("description").val(localStorage.getItem("description"));
      alert("Your event has been saved.");
    });

  });

  getTime();
});


// gets current time and updates time-block colors
function getTime() {

  var currentHour = dayjs().hour();

  $(".time-block").each(function () {
    var hour = parseInt($(this).attr("id").split("-")[1]);

    if (hour === currentHour) {
      $(this).removeClass("past");
      $(this).addClass("present");
    } else if (hour > currentHour) {
      $(this).addClass("future");
      $(this).removeClass("present");
    } else {
      $(this).addClass("past");
    }
  });
}

setInterval(getTime, 15000);
