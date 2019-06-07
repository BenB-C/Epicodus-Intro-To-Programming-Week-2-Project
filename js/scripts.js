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
$(function(){
  $("form#userInfo").submit(function(event) {
    // Prevent page from reloading
    event.preventDefault();
    // Capture values from form
    var name = $("#name").val();
    if (!name) {
      name = "new programmer";
    }
    // Determine recommended language
    var iRandom = randBetween(0, languages.length);
    var recommendedLanguage = languages[iRandom];
    console.log(iRandom, recommendedLanguage);
    // Generate output and show it
    $("#userName").empty();
    $("#userName").text(name);
    $("#suggestedLanguage").empty();
    $("#suggestedLanguage").text(recommendedLanguage);
    $("#output").show();
  });
});
