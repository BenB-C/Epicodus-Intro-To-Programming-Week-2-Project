// -----------------------------------------------------------------------------
// Business logic
// -----------------------------------------------------------------------------

// Returns a random integer between min and max - 1, inclusive
function randBetween(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}

// Returns a suggested language for the given array of answers
function getRecomendedLanguage(answers) {
  // Possible languages to return
  var languages = [
    "Ruby",
    "C#",
    "JavaScript",
    "Go",
    "Python",
    "Rust",
    "Swift",
    "COBOL",
    "LOLCODE",
    "Whitespace",
    "Brainfuck",
    "Binary lambda calculus",
  ];
  var numLanguages = languages.length;
  // Half the time, recommend a random language
  if (Math.random() > 0.5) {
    return languages[randBetween(0, numLanguages)];
  }
  // Otherwise, use answers to determine recommended language
  var sum = 0;
  for (i = 0; i < answers.length; i++) {
    sum += parseInt(answers[i]);
  }
  var recommendedLanguage = null
  if (sum <= numLanguages) {
    recommendedLanguage = languages[sum - 1];
  } else {
    if (sum % 3 === 0) {
      recommendedLanguage = languages[0];
    } else if (sum % 3 === 1 && numLanguages > 1) {
      recommendedLanguage = languages[1];
    } else {
      recommendedLanguage = languages[sum % numLanguages]
    }
  }
  if (!recommendedLanguage) {
    return languages[randBetween(0, numLanguages)];
  }
  return recommendedLanguage;
}

// Return an anchor tag with a LMGTFY link for the given query
function getLink(query) {
  return '<a href="http://lmgtfy.com/?q=' + query + '" class="text-success">' + query + '</a>';
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
    var numQuestions = 4
    var answers = [];
    for (i = 0; i < numQuestions; i++) {
      answers[i] = $("input:radio[name=question" + (i + 1) + "]:checked").val();
    }
    // Style forgotten name input
    if (!name) {
      name = "Too lazy to type in my name"
      $("#nameInput").addClass(forgotNameClass);
      $("#nameInput").effect("shake");
      $("#nameOutput").addClass(forgotNameClass);
    } else {
      $("#nameInput").removeClass(forgotNameClass);
      $("#nameOutput").removeClass(forgotNameClass);
    }
    // Determine recommended language and output result for user
    var recommendedLanguageLink = getLink(getRecomendedLanguage(answers));
    $("#nameOutput").empty();
    $("#nameOutput").text(name);
    $("#suggestedLanguage").empty();
    $("#suggestedLanguage").html(recommendedLanguageLink);
    $("#output").show();
  });

  $("#nameInput").on("focus", function() {
    $(this).removeClass(forgotNameClass);
    $("#output").hide();
  });

  $("input:radio").on("change", function() {
    $("#output").hide();
  });
});
