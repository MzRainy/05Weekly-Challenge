
  // Wrap all code that interacts with the DOM in a call to jQuery to ensure that
  // the code isn't run until the browser has finished rendering all the elements
  // in the html.
  var localeSettings = {};
  dayjs.locale(localeSettings);
  
  $(function () {
     var currentHour = dayjs().format();
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage.
  
    function textEntry() {
      $('.saveBtn').on('click', function() {
        var key = $(this).parent().attr('id');
        var value = $(this).siblings('.description').val();
        localStorage.setItem(key, value);
      });
    }
     // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. 

  //Not working
  function hourlyColor() {
    $('.time-block').each(function() {
      var blockHour = parseInt(this.id);
      $(this).toggleClass('past', blockHour < currentHour);
      $(this).toggleClass('present', blockHour === currentHour);
      $(this).toggleClass('future', blockHour > currentHour);
    });
  }
  //This is my code to refresh the color based on the current hour.
    function refreshColor() {
      $('.time-block').each(function() {
        var blockHour = parseInt(this.id);
        if (blockHour === currentHour) {
          $(this).removeClass('past future').addClass('present');
        } else if (blockHour < currentHour) {
          $(this).removeClass('future present').addClass('past');
        } else {
          $(this).removeClass('past present').addClass('future');
        }
      });
    }
   // TODO: Add code to get any user input that was saved in localStorage and set
   // the values of the corresponding textarea elements
    $('.time-block').each(function() {
      var key = $(this).attr('id');
      var value = localStorage.getItem(key);
      $(this).children('.description').val(value);
    });
  
    
    function updateTime() {
      var dateElement = $('#date');
      var timeElement = $('#time');
      var currentDate = dayjs().format('dddd, MMMM D, YYYY');
      var currentTime = dayjs().format('hh:mm:ss A');
      dateElement.text(currentDate);
      timeElement.text(currentTime);
    }
   
    hourlyColor();
    textEntry();                
    refreshColor();
    
    setInterval(updateTime, 1000);
    // TODO: Add code to display the current date in the header of the page
    var today = dayjs();
    $('#currentDay').text(today.format('MMM D, YYYY', 'HH:mm:ss'));
    
  });
