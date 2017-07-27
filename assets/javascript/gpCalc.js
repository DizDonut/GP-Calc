$(document).ready(function(){

  $(document).on("click", "#sal-submit", function(event){
    event.preventDefault();

    //delcare and initialize values with values from user input fields
    var salary = parseInt($("#sal-input").val().trim());
    var markupInput = parseFloat($("#sal-mrkUp").val().trim());
        var weeklyHours = parseInt($("#weekly-hours-input1").val().trim());
    var trueMarkup = markupInput + 0.0045;

    //call function to get the bill rate for a salary input
    var br = functions.salBillRate(salary, trueMarkup);

    //call funciton to get the hourly rate for a salary input
    var hr = functions.showHourly(salary, 2080);

    //display values to the page
    $("#sal-br-goes-here").html(br);
    $("#sal-hr").html(hr);

    //call function to display data to the table
    functions.tableData(hr, br, weeklyHours);

  })//end salary submit button event

  $(document).on("click", "#hour-submit", function(event){
    event.preventDefault();

    //delcare and initialize values with values from user input fields
    var hourlyWage = parseFloat($("#hour-input").val().trim());
    var markupInput = parseFloat($("#hour-mrkUp").val().trim());
    var weeklyHours = parseInt($("#weekly-hours-input2").val().trim());
    var trueMarkup = markupInput + 0.0045;

    //call function to get the bill rate for a salary input
    var br = functions.hrBillRate(hourlyWage, trueMarkup);

    //call funciton to get the hourly rate for a salary input
    var sal = functions.showSalary(hourlyWage, 2080);

    //display values to the page
    $("#hr-br-goes-here").html(br);
    $("#hr-sal").html(sal);

    //call function to display data to the table
    functions.tableData(hourlyWage, br, weeklyHours);


  })//end salary submit button event


  var functions = {

    salBillRate: function(salary, markup){
      var burden = (0.30 * (salary / 2080));
      var billrate = ((salary / 2080) + burden) * (1 + markup);
      var result = functions.round(billrate, 2);
      return result;
    },

    hrBillRate: function(hourly, markup){
      var burden = (0.30 * hourly);
      var billrate = (hourly + burden) * (1 + markup);
      var result = functions.round(billrate, 2);
      return result;
    },

    showHourly: function(salInput, totalHour){
      var hrly = salInput / totalHour;
      var result = functions.round(hrly, 2);
      return result;
    },

    showSalary: function(hourInput, totalHour){
      var sal = hourInput * totalHour;
      var result = functions.round(sal, 2);
      return result;
    },

    tableData: function(wage, bill, hours){
      var totalPay = ((wage * 0.30) + wage) * hours;

      var gpDoll = ((bill * hours) - totalPay).toFixed(2);
      var gpDollResult = functions.round(gpDoll, 2);

      var gpPerc = (((gpDoll / hours) / bill) * 100).toFixed(2);
      var gpPercResult = functions.round(gpPerc, 2);

      $("#sheet").append("<tr><td>$" + wage + "/HR" + "</td><td>" + "$" + bill + "/HR" + "</td><td>" +
                         hours + "</td><td>" + "$" + gpDollResult + "</td><td>" + gpPercResult + "%" +
                        "</td><td>");
    },

    round: function(value, decimals){
      return Number(Math.round(value + "e"+ decimals) + "e-" + decimals)
    }

  }; //end functions object

});//end document ready
