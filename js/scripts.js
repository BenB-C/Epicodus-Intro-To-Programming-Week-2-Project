// -----------------------------------------------------------------------------
// Business logic
// -----------------------------------------------------------------------------
var languages = [
  "Ruby",
  "C#",
  "JavaScript",
  "Go",
  "Python",
  "Rust",
  "Swift",
  "Cobol",
]

// Returns a random integer between min and max - 1, inclusive
function randBetween(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}

// -----------------------------------------------------------------------------
// User interface
// -----------------------------------------------------------------------------
var forgotNameClass = "red-border"

$(function(){
  $("form#userInfo").submit(function(event) {
    // Prevent page from reloading
    event.preventDefault();
    // Capture values from form
    var name = $("#nameInput").val();

    if (!name) {
      name = "Too lazy to type in my name"
      $("#nameInput").addClass(forgotNameClass);
      $("#nameInput").effect("shake");
      $("#nameOutput").addClass(forgotNameClass);
    } else {
      $("#nameInput").removeClass(forgotNameClass);
      $("#nameOutput").removeClass(forgotNameClass);
    }
    // Determine recommended language
    var iRandom = randBetween(0, languages.length);
    var recommendedLanguage = languages[iRandom];
    console.log(iRandom, recommendedLanguage);
    // Generate output and show it
    $("#nameOutput").empty();
    $("#nameOutput").text(name);
    $("#suggestedLanguage").empty();
    $("#suggestedLanguage").text(recommendedLanguage);
    $("#output").show();
  });

  $('#nameInput').on('focus', function(){
    $(this).removeClass(forgotNameClass);
  });
});
