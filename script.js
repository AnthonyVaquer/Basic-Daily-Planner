$(document).ready(function () {
  // Display current time/date
  var currentDate = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDate);

  $(function () {
    // event listener for saving event
    $(".saveBtn").on("click", function () {
      var event = $(this).siblings(".description").val();
      console.log($(this).parent());
      var time = $(this).parent().attr("id");

      let prevsEvents = JSON.parse(localStorage.getItem("events"));

      if (prevsEvents !== null) {
        // prevsEvents.push(eventDetails);

        // check if event exists
        const foundEvent = prevsEvents.find((eventItem) => {
          if (eventItem.id === time) {
            return eventItem;
          }
        });
        // update any existing events
        if (foundEvent) {
          const udpatedEvents = prevs;
          Events.map((item) => {
            if (item.id === time) {
              item.event = event;
            }
            console.log(item);

            return item;
          });
// save updated events to local storage
          localStorage.setItem("events", JSON.stringify(udpatedEvents));
          alert("Your event has been updated.");
          return;
        }
// save previous events to local storage
        localStorage.setItem("events", JSON.stringify(prevsEvents));
      } else {
        localStorage.setItem("events", JSON.stringify(prevsEvents));
      }
      localStorage.setItem(time, event);
      $("description").val(localStorage.getItem("description"));
      alert("Your event has been saved.");
    });
  });
  // run getTime to update time-blocks and retrieve any saved events
  getTime();
});

// gets current time and updates time-block colors
function getTime() {
  var currentHour = dayjs().hour();

  $(".time-block").each(function () {
    let saveEvent = localStorage.getItem($(this).attr("id"));
    if (saveEvent) {
      $(this).find(".description").val(saveEvent);
      console.log(saveEvent);
    }
    var hour = parseInt($(this).attr("id").split("-")[1]);
    $(this).find(".description").val(saveEvent);

    // changes timeblock class by comparing time block hour to current hour
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
