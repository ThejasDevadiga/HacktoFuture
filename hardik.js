let string = "Hello, this is your Invoice number: 123456\nPlease pay your dues on time.";


let start_word = "Invoice";
let start_index = string.indexOf(start_word);


let end_word = "\n";
let end_index = string.indexOf(end_word);


let substring = string.substring(start_index + start_word.length, end_index);


let words = substring.split(" ");

console.log(words);
