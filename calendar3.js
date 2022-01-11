function generate_year_range(start, end) {
  var years = "";
  for (var year = start; year <= end; year++) {
      years += "<option value='" + year + "'>" + year + "</option>";
  }
  return years;
}

var today = new Date();
var currentMonth = today.getMonth();
var currentYear = today.getFullYear();
var selectYear = document.getElementById("year");
var selectMonth = document.getElementById("month");


var createYear = generate_year_range(1970, 2050);
/** or
* createYear = generate_year_range( 1970, currentYear );
*/

document.getElementById("year").innerHTML = createYear;

var calendar = document.getElementById("calendar");
var lang = calendar.getAttribute('data-lang');

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var days = ["S", "M", "T", "W", "T", "F", "S"];

var dayHeader = "<tr>";
for (day in days) {
  dayHeader += "<th data-days='" + days[day] + "'>" + days[day] + "</th>";
}
dayHeader += "</tr>";

document.getElementById("thead-month").innerHTML = dayHeader;


monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);



function next() {
  currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentMonth, currentYear);
}

function previous() {
  currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
  currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
  showCalendar(currentMonth, currentYear);
}

function jump() {
  currentYear = parseInt(selectYear.value);
  currentMonth = parseInt(selectMonth.value);
  showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {

  var firstDay = ( new Date( year, month ) ).getDay();

  tbl = document.getElementById("calendar-body");

  
  tbl.innerHTML = "";

  
  monthAndYear.innerHTML = months[month] + " " + year;
  selectYear.value = year;
  selectMonth.value = month;

  // creating all cells
  var x;
  var c;
  c=0;
  if((month)%2===0)
  x=31;
  else
  x=30;
  var y;
  y=x-firstDay;
  var date = 1;
  for ( var i = 0; i < 6; i++ ) {
      var row = document.createElement("tr");
      for ( var j = 0; j < 7; j++ ) {
          if ( i === 0 && j < firstDay ) {
              cell = document.createElement( "td" );
              cellText = document.createTextNode(y+1);
              y=y+1;
              cell.appendChild(cellText);
              row.appendChild(cell);
              cell.setAttribute("data-month", month);
              cell.style.color="grey";
          } else if (date > daysInMonth(month, year)) {
              break;
          } else {
              cell = document.createElement("td");
              cell.setAttribute("data-date", date);
              cell.setAttribute("data-month", month + 1);
              cell.setAttribute("data-year", year);
              cell.setAttribute("data-month_name", months[month]);
              cell.className = "date-picker";
              cell.innerHTML = "<span>" + date + "</span>";

              if ( date === today.getDate() && year === today.getFullYear() && month === today.getMonth() ) {
                  cell.className = "date-picker selected";
              }
                if(date >= today.getDate()){
                 if((month < today.getMonth() && year <= today.getFullYear())||(year < today.getFullYear()))
                 cell.style.color="#f79824";
                 else
                 cell.style.color="#1D2F6F";
          }
          else{
            if((month > today.getMonth() && year >= today.getFullYear())||(year > today.getFullYear())){
              cell.style.color="#1D2F6F";
            }
            else{
            cell.style.color="#f79824";
            }
          }
              row.appendChild(cell);
              date++;
          }
      }
      if(j<7 && j!=0 && i===4 && c===0){
        var f;
        f=1;
        for(var k=j;k<7;k++){
          cell = document.createElement( "td" );
              cellText = document.createTextNode(f);
              f=f+1;
              cell.appendChild(cellText);
              row.appendChild(cell);
              cell.style.color="grey";
              c=1;
        }

      }
      if(j<7 && j!=0 && i===5 && c===0){
        var f;
        f=1;
        for(var k=j;k<7;k++){
          cell = document.createElement( "td" );
              cellText = document.createTextNode(f);
              f=f+1;
              cell.appendChild(cellText);
              row.appendChild(cell);
              cell.style.color="grey";
        }
      }

      tbl.appendChild(row);
  }

}

function daysInMonth(iMonth, iYear) {
  return 32 - new Date(iYear, iMonth, 32).getDate();
}
