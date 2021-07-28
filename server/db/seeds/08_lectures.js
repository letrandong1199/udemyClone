
exports.seed = function (knex) {
  // Deletes ALL existing entries
  console.log("seed lectures");
  return createLectures(knex);
};

function createLectures(knex) {
  return knex("Lectures")
    .del()
    .then(function () {
      return knex("Lectures").insert(
        [
          {
            'Description': '',
            'Duration': '02:35',
            'Id': 1,
            'Section_Id': 1,
            'Title': 'Welcome To This Course'
          },
          {
            'Description': '',
            'Duration': '00:18',
            'Id': 2,
            'Section_Id': 1,
            'Title': 'READ BEFORE YOU START!'
          },
          {
            'Description': '',
            'Duration': '00:18',
            'Id': 3,
            'Section_Id': 1,
            'Title': 'E-Book Resources 2.0'
          },
          {
            'Description': '',
            'Duration': '03:47',
            'Id': 4,
            'Section_Id': 2,
            'Title': 'Introduction To Web Design'
          },
          {
            'Description': '',
            'Duration': '08:54',
            'Id': 5,
            'Section_Id': 2,
            'Title': 'Beautiful Typography'
          },
          {
            'Description': '',
            'Duration': '06:45',
            'Id': 6,
            'Section_Id': 2,
            'Title': 'Using Colors Like A Pro'
          },
          {
            'Description': '',
            'Duration': '01:09',
            'Id': 7,
            'Section_Id': 2,
            'Title': 'The Meaning Of Colors In Web Design'
          },
          {
            'Description': '',
            'Duration': '04:54',
            'Id': 8,
            'Section_Id': 2,
            'Title': 'Working With Images'
          },
          {
            'Description': '',
            'Duration': '02:31',
            'Id': 9,
            'Section_Id': 2,
            'Title': 'Use CSS To Work With Images'
          },
          {
            'Description': '',
            'Duration': '5 questions',
            'Id': 10,
            'Section_Id': 2,
            'Title': 'Web Design Quiz 1'
          },
          {
            'Description': '',
            'Duration': '03:29',
            'Id': 11,
            'Section_Id': 2,
            'Title': 'Working With Icons'
          },
          {
            'Description': '',
            'Duration': '03:42',
            'Id': 12,
            'Section_Id': 2,
            'Title': 'Spacing And Layout'
          },
          {
            'Description': '',
            'Duration': '02:50',
            'Id': 13,
            'Section_Id': 2,
            'Title': 'Introduction To User Experience'
          },
          {
            'Description': '',
            'Duration': '02:25',
            'Id': 14,
            'Section_Id': 2,
            'Title': 'Getting Inspired: The Secret Ingredient For Stunning Web Design'
          },
          {
            'Description': '',
            'Duration': '5 questions',
            'Id': 15,
            'Section_Id': 2,
            'Title': 'Web Design Quiz 2'
          },
          {
            'Description': '',
            'Duration': '04:35',
            'Id': 16,
            'Section_Id': 2,
            'Title': '8 Super Effective Ways To Improve Your Website’s Conversion'
          },
          {
            'Description': '',
            'Duration': '00:44',
            'Id': 17,
            'Section_Id': 3,
            'Title': 'Wrapping Up What We’ve Learned'
          },
          {
            'Description': '',
            'Duration': '01:56',
            'Id': 18,
            'Section_Id': 3,
            'Title': 'The Ultimate Cheatsheet: All Guidelines In One Place'
          },
          {
            'Description': '',
            'Duration': '99 pages',
            'Id': 19,
            'Section_Id': 3,
            'Title': 'Slides For This Course'
          },
          {
            'Description': '',
            'Duration': '02:30',
            'Id': 20,
            'Section_Id': 4,
            'Title': 'Where To Go From Here?'
          },
          {
            'Description': '',
            'Duration': '01:00',
            'Id': 21,
            'Section_Id': 4,
            'Title': 'Bonus Lecture'
          },
          {
            'Description': '',
            'Duration': '02:30',
            'Id': 22,
            'Section_Id': 5,
            'Title': 'Introduction'
          },
          {
            'Description': '',
            'Duration': '04:36',
            'Id': 23,
            'Section_Id': 5,
            'Title': 'What is Javascript?'
          },
          {
            'Description': '',
            'Duration': '04:04',
            'Id': 24,
            'Section_Id': 5,
            'Title': 'How Javascript Works'
          },
          {
            'Description': '',
            'Duration': '05:24',
            'Id': 25,
            'Section_Id': 5,
            'Title': 'Javascript Console'
          },
          {
            'Description': '',
            'Duration': '07:09',
            'Id': 26,
            'Section_Id': 5,
            'Title': 'Objects in Javascript'
          },
          {
            'Description': '',
            'Duration': '06:08',
            'Id': 27,
            'Section_Id': 5,
            'Title': 'Javascript Syntax'
          },
          {
            'Description': '',
            'Duration': '06:59',
            'Id': 28,
            'Section_Id': 6,
            'Title': 'Primitive Data'
          },
          {
            'Description': '',
            'Duration': '11:25',
            'Id': 29,
            'Section_Id': 6,
            'Title': 'Variables, Constants & Assignment'
          },
          {
            'Description': '',
            'Duration': '13:21',
            'Id': 30,
            'Section_Id': 6,
            'Title': 'Arithmetic Operator’s & BODMAS'
          },
          {
            'Description': '',
            'Duration': '08:16',
            'Id': 31,
            'Section_Id': 6,
            'Title': 'Assignment Operator’s'
          },
          {
            'Description': '',
            'Duration': '09:29',
            'Id': 32,
            'Section_Id': 6,
            'Title': 'Code Editors & Debugging'
          },
          {
            'Description': '',
            'Duration': '13:32',
            'Id': 33,
            'Section_Id': 6,
            'Title': 'Functions or Subroutines'
          },
          {
            'Description': '',
            'Duration': '11:50',
            'Id': 34,
            'Section_Id': 6,
            'Title': 'Objects & Arrays'
          },
          {
            'Description': '',
            'Duration': '10:34',
            'Id': 35,
            'Section_Id': 6,
            'Title': 'Embedding Objects & Arrays'
          },
          {
            'Description': '',
            'Duration': '09:29',
            'Id': 36,
            'Section_Id': 6,
            'Title': 'Member Access'
          },
          {
            'Description': '',
            'Duration': '13:18',
            'Id': 37,
            'Section_Id': 6,
            'Title': 'Computed Member Access'
          },
          {
            'Description': '',
            'Duration': '09:22',
            'Id': 38,
            'Section_Id': 6,
            'Title': 'Member Creation, Assignment & Deletion'
          },
          {
            'Description': '',
            'Duration': '15:51',
            'Id': 39,
            'Section_Id': 6,
            'Title': 'Array Modification'
          },
          {
            'Description': '',
            'Duration': '11:00',
            'Id': 40,
            'Section_Id': 6,
            'Title': 'Callable Objects'
          },
          {
            'Description': '',
            'Duration': '08:02',
            'Id': 41,
            'Section_Id': 6,
            'Title': 'Memory Hoisting'
          },
          {
            'Description': '',
            'Duration': '12:50',
            'Id': 42,
            'Section_Id': 6,
            'Title': 'Scope & Closures'
          },
          {
            'Description': '',
            'Duration': '09:55',
            'Id': 43,
            'Section_Id': 6,
            'Title': 'Inferred Globals & Scope'
          },
          {
            'Description': '',
            'Duration': '13:56',
            'Id': 44,
            'Section_Id': 6,
            'Title': 'This Context'
          },
          {
            'Description': '',
            'Duration': '10:35',
            'Id': 45,
            'Section_Id': 6,
            'Title': 'Constructors'
          },
          {
            'Description': '',
            'Duration': '07:06',
            'Id': 46,
            'Section_Id': 6,
            'Title': 'Prototype'
          },
          {
            'Description': '',
            'Duration': '09:32',
            'Id': 47,
            'Section_Id': 6,
            'Title': 'Constructors with Prototype'
          },
          {
            'Description': '',
            'Duration': '12:33',
            'Id': 48,
            'Section_Id': 7,
            'Title': 'Comparison Operators'
          },
          {
            'Description': '',
            'Duration': '15:21',
            'Id': 49,
            'Section_Id': 7,
            'Title': 'If Statements'
          },
          {
            'Description': '',
            'Duration': '14:41',
            'Id': 50,
            'Section_Id': 7,
            'Title': "For & For In Loop's"
          },
          {
            'Description': '',
            'Duration': '06:46',
            'Id': 51,
            'Section_Id': 7,
            'Title': 'Let ES6'
          },
          {
            'Description': '',
            'Duration': '09:12',
            'Id': 52,
            'Section_Id': 8,
            'Title': 'Understanding the Document Object Model'
          },
          {
            'Description': '',
            'Duration': '12:47',
            'Id': 53,
            'Section_Id': 8,
            'Title': 'Targeting DOM Element’s'
          },
          {
            'Description': '',
            'Duration': '16:22',
            'Id': 54,
            'Section_Id': 8,
            'Title': "Changing Element's Content's"
          },
          {
            'Description': '',
            'Duration': '12:39',
            'Id': 55,
            'Section_Id': 8,
            'Title': "Changing Element Style's"
          },
          {
            'Description': '',
            'Duration': '13:52',
            'Id': 56,
            'Section_Id': 8,
            'Title': 'Event Handlers'
          },
          {
            'Description': '',
            'Duration': '07:45',
            'Id': 57,
            'Section_Id': 8,
            'Title': "Create & appendChild & insertBefore method's"
          },
          {
            'Description': '',
            'Duration': '14:24',
            'Id': 58,
            'Section_Id': 8,
            'Title': 'Final Project'
          },
          {
            'Description': '',
            'Duration': '05:57',
            'Id': 59,
            'Section_Id': 9,
            'Title': 'Conclusion & Goodbye'
          },
          {
            'Description': '',
            'Duration': '00:59',
            'Id': 60,
            'Section_Id': 9,
            'Title': 'Bonus Lecture: Discount Courses'
          },
          {
            'Description': '',
            'Duration': '05:05',
            'Id': 61,
            'Section_Id': 10,
            'Title': 'Start the HTML of the website'
          },
          {
            'Description': '',
            'Duration': '03:23',
            'Id': 62,
            'Section_Id': 10,
            'Title': 'Using Font Awesome for adding plus and minus icons to our website'
          },
          {
            'Description': '',
            'Duration': '11:01',
            'Id': 63,
            'Section_Id': 10,
            'Title': 'Using CSS to style the title, button and the answere'
          },
          {
            'Description': '',
            'Duration': '11:11',
            'Id': 64,
            'Section_Id': 10,
            'Title': 'Start using JavaScript for toggling between classes'
          },
          {
            'Description': '',
            'Duration': '06:13',
            'Id': 65,
            'Section_Id': 11,
            'Title': 'Completing the HTML part'
          },
          {
            'Description': '',
            'Duration': '16:55',
            'Id': 66,
            'Section_Id': 11,
            'Title': 'Styling the website using CSS'
          },
          {
            'Description': '',
            'Duration': '14:56',
            'Id': 67,
            'Section_Id': 11,
            'Title': 'Adding functionality to the website using JavaScript'
          },
          {
            'Description': '',
            'Duration': '01:37',
            'Id': 68,
            'Section_Id': 12,
            'Title': "What you're going to get from this course?"
          },
          {
            'Description': '',
            'Duration': '03:54',
            'Id': 69,
            'Section_Id': 12,
            'Title': 'Installing VScode and adding extensions'
          },
          {
            'Description': '',
            'Duration': '04:54',
            'Id': 70,
            'Section_Id': 13,
            'Title': 'Start the project (HTML)'
          },
          {
            'Description': '',
            'Duration': '12:39',
            'Id': 71,
            'Section_Id': 13,
            'Title': 'CSS styling, Bootstrap and Font Awesome'
          },
          {
            'Description': '',
            'Duration': '06:21',
            'Id': 72,
            'Section_Id': 13,
            'Title': 'Adding functionality using Javascript'
          },
          {
            'Description': '',
            'Duration': '08:34',
            'Id': 73,
            'Section_Id': 13,
            'Title': 'Adding a Preloader'
          },
          {
            'Description': '',
            'Duration': '03:53',
            'Id': 74,
            'Section_Id': 14,
            'Title': 'HTML part'
          },
          {
            'Description': '',
            'Duration': '03:20',
            'Id': 75,
            'Section_Id': 14,
            'Title': 'CSS'
          },
          {
            'Description': '',
            'Duration': '02:55',
            'Id': 76,
            'Section_Id': 14,
            'Title': 'Bootstrap'
          },
          {
            'Description': '',
            'Duration': '03:51',
            'Id': 77,
            'Section_Id': 14,
            'Title': 'Font Awesome'
          },
          {
            'Description': '',
            'Duration': '06:55',
            'Id': 78,
            'Section_Id': 14,
            'Title': 'Javascript'
          },
          {
            'Description': '',
            'Duration': '05:34',
            'Id': 79,
            'Section_Id': 14,
            'Title': 'addEventListener method'
          },
          {
            'Description': '',
            'Duration': '02:31',
            'Id': 80,
            'Section_Id': 14,
            'Title': 'Adding color to the number'
          },
          {
            'Description': '',
            'Duration': '01:47',
            'Id': 81,
            'Section_Id': 15,
            'Title': 'Welcome!'
          },
          {
            'Description': '',
            'Duration': '01:24',
            'Id': 82,
            'Section_Id': 15,
            'Title': 'What is PHP?'
          },
          {
            'Description': '',
            'Duration': '01:08',
            'Id': 83,
            'Section_Id': 15,
            'Title': 'What does PHP do?'
          },
          {
            'Description': '',
            'Duration': '07:23',
            'Id': 84,
            'Section_Id': 15,
            'Title': 'Tools to Get Started'
          },
          {
            'Description': '',
            'Duration': '03:39',
            'Id': 85,
            'Section_Id': 15,
            'Title': 'The Course Files'
          },
          {
            'Description': '',
            'Duration': '2 questions',
            'Id': 86,
            'Section_Id': 15,
            'Title': 'PHP Pop Quiz!'
          },
          {
            'Description': '',
            'Duration': '08:00',
            'Id': 87,
            'Section_Id': 16,
            'Title': 'Your First PHP Web Page'
          },
          {
            'Description': '',
            'Duration': '03:17',
            'Id': 88,
            'Section_Id': 16,
            'Title': 'PHP Syntax'
          },
          {
            'Description': '',
            'Duration': '03:10',
            'Id': 89,
            'Section_Id': 16,
            'Title': 'PHP Variables'
          },
          {
            'Description': '',
            'Duration': '02:56',
            'Id': 90,
            'Section_Id': 16,
            'Title': 'More Variables'
          },
          {
            'Description': '',
            'Duration': '03:25',
            'Id': 91,
            'Section_Id': 16,
            'Title': 'Defining Constants'
          },
          {
            'Description': '',
            'Duration': '15:25',
            'Id': 92,
            'Section_Id': 16,
            'Title': 'Get Your Hands Dirty!'
          },
          {
            'Description': '',
            'Duration': '11:56',
            'Id': 93,
            'Section_Id': 17,
            'Title': 'PHP Arrays'
          },
          {
            'Description': '',
            'Duration': '09:52',
            'Id': 94,
            'Section_Id': 17,
            'Title': 'PHP Associative Arrays'
          },
          {
            'Description': '',
            'Duration': '10:35',
            'Id': 95,
            'Section_Id': 17,
            'Title': 'PHP Multi-Dimensional Arrays'
          },
          {
            'Description': '',
            'Duration': '12:07',
            'Id': 96,
            'Section_Id': 17,
            'Title': 'Get Your Hands Dirty!'
          },
          {
            'Description': '',
            'Duration': '08:23',
            'Id': 97,
            'Section_Id': 18,
            'Title': 'If Statements'
          },
          {
            'Description': '',
            'Duration': '07:18',
            'Id': 98,
            'Section_Id': 18,
            'Title': 'PHP Else'
          },
          {
            'Description': '',
            'Duration': '09:19',
            'Id': 99,
            'Section_Id': 18,
            'Title': 'PHP Elseif'
          },
          {
            'Description': '',
            'Duration': '11:37',
            'Id': 100,
            'Section_Id': 18,
            'Title': 'Get Your Hands Dirty!'
          },
          {
            'Description': '',
            'Duration': '19:12',
            'Id': 101,
            'Section_Id': 19,
            'Title': 'Comparison Operators'
          },
          {
            'Description': '',
            'Duration': '12:20',
            'Id': 102,
            'Section_Id': 19,
            'Title': 'Logical Operators'
          },
          {
            'Description': '',
            'Duration': '08:39',
            'Id': 103,
            'Section_Id': 19,
            'Title': 'Arithmetic Operators'
          },
          {
            'Description': '',
            'Duration': '07:00',
            'Id': 104,
            'Section_Id': 19,
            'Title': 'String Operators'
          },
          {
            'Description': '',
            'Duration': '07:54',
            'Id': 105,
            'Section_Id': 19,
            'Title': 'Assignment Operators'
          },
          {
            'Description': '',
            'Duration': '06:51',
            'Id': 106,
            'Section_Id': 20,
            'Title': 'While Loop'
          },
          {
            'Description': '',
            'Duration': '04:49',
            'Id': 107,
            'Section_Id': 20,
            'Title': 'For Loop'
          },
          {
            'Description': '',
            'Duration': '05:20',
            'Id': 108,
            'Section_Id': 20,
            'Title': 'Foreach Loop'
          },
          {
            'Description': '',
            'Duration': '04:22',
            'Id': 109,
            'Section_Id': 20,
            'Title': 'Do / While Loop'
          },
          {
            'Description': '',
            'Duration': '13:17',
            'Id': 110,
            'Section_Id': 21,
            'Title': 'Intro to PHP Functions'
          },
          {
            'Description': '',
            'Duration': '07:22',
            'Id': 111,
            'Section_Id': 21,
            'Title': 'Custom Functions'
          },
          {
            'Description': '',
            'Duration': '07:26',
            'Id': 112,
            'Section_Id': 21,
            'Title': 'Simple Arguments'
          },
          {
            'Description': '',
            'Duration': '05:09',
            'Id': 113,
            'Section_Id': 22,
            'Title': 'The Final Website'
          },
          {
            'Description': '',
            'Duration': '11:22',
            'Id': 114,
            'Section_Id': 22,
            'Title': 'Code a Basic Webpage Layout'
          },
          {
            'Description': '',
            'Duration': '13:42',
            'Id': 115,
            'Section_Id': 22,
            'Title': 'Templating a Global Header & Footer'
          },
          {
            'Description': '',
            'Duration': '14:21',
            'Id': 116,
            'Section_Id': 22,
            'Title': 'Dynamic Copyright & Hours of Operation'
          },
          {
            'Description': '',
            'Duration': '17:30',
            'Id': 117,
            'Section_Id': 22,
            'Title': 'Code a "Team Member" Array & Template'
          },
          {
            'Description': '',
            'Duration': '17:26',
            'Id': 118,
            'Section_Id': 22,
            'Title': 'Code a "Menu" Array & Template'
          },
          {
            'Description': '',
            'Duration': '01:49',
            'Id': 119,
            'Section_Id': 22,
            'Title': 'Understanding $_GET'
          },
          {
            'Description': '',
            'Duration': '15:55',
            'Id': 120,
            'Section_Id': 22,
            'Title': 'Code a "Menu Item" Dynamic Template'
          },
          {
            'Description': '',
            'Duration': '08:14',
            'Id': 121,
            'Section_Id': 22,
            'Title': 'Code a Simple Contact Form'
          },
          {
            'Description': '',
            'Duration': '01:35',
            'Id': 122,
            'Section_Id': 22,
            'Title': 'Understanding $_POST'
          },
          {
            'Description': '',
            'Duration': '14:02',
            'Id': 123,
            'Section_Id': 22,
            'Title': 'Simple Form Validation & Submission (Part 1)'
          },
          {
            'Description': '',
            'Duration': '15:31',
            'Id': 124,
            'Section_Id': 22,
            'Title': 'Simple Form Validation & Submission (Part 2)'
          },
          {
            'Description': '',
            'Duration': '04:01',
            'Id': 125,
            'Section_Id': 22,
            'Title': 'Uploading Your Website Live On The Web'
          },
          {
            'Description': '',
            'Duration': '01:59',
            'Id': 126,
            'Section_Id': 22,
            'Title': 'Wrap Up & Where to Go From Here!'
          },
          {
            'Description': '',
            'Duration': '02:49',
            'Id': 127,
            'Section_Id': 23,
            'Title': 'Welcome to R Basics'
          },
          {
            'Description': '',
            'Duration': '04:22',
            'Id': 128,
            'Section_Id': 23,
            'Title': 'Download R and RStudio'
          },
          {
            'Description': '',
            'Duration': '18:26',
            'Id': 129,
            'Section_Id': 23,
            'Title': 'RStudio Orientation'
          },
          {
            'Description': '',
            'Duration': '05:08',
            'Id': 130,
            'Section_Id': 23,
            'Title': 'Course Script'
          },
          {
            'Description': '',
            'Duration': '14:33',
            'Id': 131,
            'Section_Id': 23,
            'Title': 'The Structure of the R Ecosystem'
          },
          {
            'Description': '',
            'Duration': '17:49',
            'Id': 132,
            'Section_Id': 23,
            'Title': 'R Help Features'
          },
          {
            'Description': '',
            'Duration': '11:01',
            'Id': 133,
            'Section_Id': 23,
            'Title': 'Using R Functions'
          },
          {
            'Description': '',
            'Duration': '02:39',
            'Id': 134,
            'Section_Id': 23,
            'Title': 'Practice R - the R Exercise Database'
          },
          {
            'Description': '',
            'Duration': '11:03',
            'Id': 135,
            'Section_Id': 23,
            'Title': 'Three Common Mistakes of R Beginners'
          },
          {
            'Description': '',
            'Duration': '14:38',
            'Id': 136,
            'Section_Id': 24,
            'Title': 'Your First Lines of R Code'
          },
          {
            'Description': '',
            'Duration': '12:59',
            'Id': 137,
            'Section_Id': 24,
            'Title': 'Using Some Basic Functions'
          },
          {
            'Description': '',
            'Duration': '06:16',
            'Id': 138,
            'Section_Id': 24,
            'Title': 'Exercise and Solution - Basic Coding'
          },
          {
            'Description': '',
            'Duration': '06:39',
            'Id': 139,
            'Section_Id': 24,
            'Title': 'Functions and Loops'
          },
          {
            'Description': '',
            'Duration': '09:26',
            'Id': 140,
            'Section_Id': 24,
            'Title': 'R Datasets and Data.Frames'
          },
          {
            'Description': '',
            'Duration': '06:04',
            'Id': 141,
            'Section_Id': 24,
            'Title': 'Importing CSV Files'
          },
          {
            'Description': '',
            'Duration': '07:53',
            'Id': 142,
            'Section_Id': 24,
            'Title': 'Advanced Data Import - Bonus Material from the Data Pre-Processing Course'
          },
          {
            'Description': '',
            'Duration': '12:38',
            'Id': 143,
            'Section_Id': 24,
            'Title': 'How to Best Structure Your R Learning Experience'
          },
          {
            'Description': '',
            'Duration': '10:52',
            'Id': 144,
            'Section_Id': 24,
            'Title': 'R Base Graphs'
          },
          {
            'Description': '',
            'Duration': '15:41',
            'Id': 145,
            'Section_Id': 24,
            'Title': 'R Base Graphs 2'
          },
          {
            'Description': '',
            'Duration': '03:10',
            'Id': 146,
            'Section_Id': 24,
            'Title': 'Exercise and Solution - R Base Graphs'
          },
          {
            'Description': '',
            'Duration': '05:13',
            'Id': 147,
            'Section_Id': 25,
            'Title': 'Loading your csv files in R; Working directories'
          },
          {
            'Description': '',
            'Duration': '05:19',
            'Id': 148,
            'Section_Id': 25,
            'Title': 'Course R Level 1: Intro to the apply family of functions'
          },
          {
            'Description': '',
            'Duration': '06:29',
            'Id': 149,
            'Section_Id': 25,
            'Title': 'Course Statistics in R: Tests for normality, Exercise and solution'
          },
          {
            'Description': '',
            'Duration': '03:31',
            'Id': 150,
            'Section_Id': 25,
            'Title': 'Course Graphs in R: Lattice package plots'
          },
          {
            'Description': '',
            'Duration': '12:08',
            'Id': 151,
            'Section_Id': 25,
            'Title': 'Course Twitter Text Mining: Exercise and solution sentiment analysis'
          },
          {
            'Description': '',
            'Duration': '05:51',
            'Id': 152,
            'Section_Id': 25,
            'Title': 'Course Machine Learning: KNN Classification'
          },
          {
            'Description': '',
            'Duration': '05:43',
            'Id': 153,
            'Section_Id': 25,
            'Title': 'Course Machine Learning: Linear Discriminant Analysis'
          },
          {
            'Description': '',
            'Duration': '13:15',
            'Id': 154,
            'Section_Id': 25,
            'Title': 'Course Career Guide: Statistical Software Packages - Alternatives to R'
          },
          {
            'Description': '',
            'Duration': '00:30',
            'Id': 155,
            'Section_Id': 25,
            'Title': 'Where to get more info'
          },
          {
            'Description': '',
            'Duration': '04:36',
            'Id': 156,
            'Section_Id': 26,
            'Title': 'Welcome'
          },
          {
            'Description': '',
            'Duration': '09:32',
            'Id': 157,
            'Section_Id': 26,
            'Title': 'What is Data Science and Machine Learning?'
          },
          {
            'Description': '',
            'Duration': '05:06',
            'Id': 158,
            'Section_Id': 27,
            'Title': 'Getting Started with Python and Scikit-Learn'
          },
          {
            'Description': '',
            'Duration': '08:53',
            'Id': 159,
            'Section_Id': 27,
            'Title': 'Types of Machine learning algorithms'
          },
          {
            'Description': '',
            'Duration': '08:49',
            'Id': 160,
            'Section_Id': 27,
            'Title': 'Playing Around with Anaconda and Jupyter'
          },
          {
            'Description': '',
            'Duration': '10:44',
            'Id': 161,
            'Section_Id': 27,
            'Title': 'Playing with some Python Code'
          },
          {
            'Description': '',
            'Duration': '13:36',
            'Id': 162,
            'Section_Id': 28,
            'Title': 'Fitting a Machine Learning Model (KNN Algorithm) - Part 1'
          },
          {
            'Description': '',
            'Duration': '20:27',
            'Id': 163,
            'Section_Id': 28,
            'Title': 'Fitting a Machine Learning Model (KNN Algorithm) Part 2'
          },
          {
            'Description': '',
            'Duration': '14:54',
            'Id': 164,
            'Section_Id': 28,
            'Title': 'Fitting a Machine Learning Model (Logistic Regression Algorithm)'
          },
          {
            'Description': '',
            'Duration': '23:40',
            'Id': 165,
            'Section_Id': 28,
            'Title': 'Validation using Model Selection (Train and Test)'
          },
          {
            'Description': '',
            'Duration': '19:53',
            'Id': 166,
            'Section_Id': 28,
            'Title': 'Finalizing Your optimum algorithm (K-Fold Cross Validation)'
          },
          {
            'Description': '',
            'Duration': '11:44',
            'Id': 167,
            'Section_Id': 28,
            'Title': "Data Science - What's Next?"
          },
          {
            'Description': '',
            'Duration': '03:38',
            'Id': 168,
            'Section_Id': 29,
            'Title': "What's the Course About? What will I Learn?"
          },
          {
            'Description': '',
            'Duration': '04:54',
            'Id': 169,
            'Section_Id': 29,
            'Title': 'Instructor Q & A'
          },
          {
            'Description': '',
            'Duration': '04:16',
            'Id': 170,
            'Section_Id': 29,
            'Title': 'Machine Learning Vernacular'
          },
          {
            'Description': '',
            'Duration': '00:12',
            'Id': 171,
            'Section_Id': 29,
            'Title': 'Must Know Terms Quiz'
          },
          {
            'Description': '',
            'Duration': '04:33',
            'Id': 172,
            'Section_Id': 29,
            'Title': 'The Machine Modeling Process'
          },
          {
            'Description': '',
            'Duration': '04:15',
            'Id': 173,
            'Section_Id': 29,
            'Title': 'Installing Python 3.X'
          },
          {
            'Description': '',
            'Duration': '06:56',
            'Id': 174,
            'Section_Id': 29,
            'Title': 'Jupyter Notebook Anatomy'
          },
          {
            'Description': '',
            'Duration': '01:25',
            'Id': 175,
            'Section_Id': 29,
            'Title': 'Course Downloads'
          },
          {
            'Description': '',
            'Duration': '00:57',
            'Id': 176,
            'Section_Id': 29,
            'Title': 'Summary'
          },
          {
            'Description': '',
            'Duration': '10 questions',
            'Id': 177,
            'Section_Id': 29,
            'Title': 'Quiz'
          },
          {
            'Description': '',
            'Duration': '06:04',
            'Id': 178,
            'Section_Id': 30,
            'Title': 'Import Pandas and Manipulate Data'
          },
          {
            'Description': '',
            'Duration': '05:08',
            'Id': 179,
            'Section_Id': 30,
            'Title': 'Importing a CSV in Pandas'
          },
          {
            'Description': '',
            'Duration': '05:03',
            'Id': 180,
            'Section_Id': 30,
            'Title': 'Remove Columns and Sort Some Data'
          },
          {
            'Description': '',
            'Duration': '01:54',
            'Id': 181,
            'Section_Id': 30,
            'Title': 'Learning Tip'
          },
          {
            'Description': '',
            'Duration': '00:56',
            'Id': 182,
            'Section_Id': 30,
            'Title': 'Summary'
          },
          {
            'Description': '',
            'Duration': '5 questions',
            'Id': 183,
            'Section_Id': 30,
            'Title': 'Quiz'
          },
          {
            'Description': '',
            'Duration': '04:21',
            'Id': 184,
            'Section_Id': 31,
            'Title': 'Anatomy of an Array'
          },
          {
            'Description': '',
            'Duration': '03:52',
            'Id': 185,
            'Section_Id': 31,
            'Title': 'Creating Arrays'
          },
          {
            'Description': '',
            'Duration': '03:26',
            'Id': 186,
            'Section_Id': 31,
            'Title': 'Accessing Elements in Our Array'
          },
          {
            'Description': '',
            'Duration': '00:51',
            'Id': 187,
            'Section_Id': 31,
            'Title': 'Summary'
          },
          {
            'Description': '',
            'Duration': '8 questions',
            'Id': 188,
            'Section_Id': 31,
            'Title': 'Quiz'
          },
          {
            'Description': '',
            'Duration': '03:23',
            'Id': 189,
            'Section_Id': 32,
            'Title': 'What is SciKit-Learn?'
          },
          {
            'Description': '',
            'Duration': '00:44',
            'Id': 190,
            'Section_Id': 32,
            'Title': 'Data Sets'
          },
          {
            'Description': '',
            'Duration': '05:06',
            'Id': 191,
            'Section_Id': 32,
            'Title': 'An End to End Model'
          },
          {
            'Description': '',
            'Duration': '03:40',
            'Id': 192,
            'Section_Id': 32,
            'Title': 'Anatomy of an End to End Model'
          },
          {
            'Description': '',
            'Duration': '00:22',
            'Id': 193,
            'Section_Id': 32,
            'Title': 'What Does Accuracy Mean?'
          },
          {
            'Description': '',
            'Duration': '00:49',
            'Id': 194,
            'Section_Id': 32,
            'Title': 'Summary'
          },
          {
            'Description': '',
            'Duration': '5 questions',
            'Id': 195,
            'Section_Id': 32,
            'Title': 'Quiz'
          },
          {
            'Description': '',
            'Duration': '04:45',
            'Id': 196,
            'Section_Id': 33,
            'Title': 'The line and Scatter Plot'
          },
          {
            'Description': '',
            'Duration': '03:32',
            'Id': 197,
            'Section_Id': 33,
            'Title': 'The Histogram'
          },
          {
            'Description': '',
            'Duration': '01:09',
            'Id': 198,
            'Section_Id': 33,
            'Title': 'Summary'
          },
          {
            'Description': '',
            'Duration': '6 questions',
            'Id': 199,
            'Section_Id': 33,
            'Title': 'Quiz'
          },
          {
            'Description': '',
            'Duration': '04:39',
            'Id': 200,
            'Section_Id': 34,
            'Title': 'What is NLP and NTLK?'
          },
          {
            'Description': '',
            'Duration': '02:44',
            'Id': 201,
            'Section_Id': 34,
            'Title': 'What is Tokenization?'
          },
          {
            'Description': '',
            'Duration': '04:20',
            'Id': 202,
            'Section_Id': 34,
            'Title': 'Word and Sentence Tokenization'
          },
          {
            'Description': '',
            'Duration': '00:45',
            'Id': 203,
            'Section_Id': 34,
            'Title': 'Summary'
          },
          {
            'Description': '',
            'Duration': '5 questions',
            'Id': 204,
            'Section_Id': 34,
            'Title': 'Quiz'
          },
          {
            'Description': '',
            'Duration': '00:21',
            'Id': 205,
            'Section_Id': 34,
            'Title': 'Bonus Lecture "The Complete Course for Machine Learning Engineers"'
          },
          {
            'Description': '',
            'Duration': '02:19',
            'Id': 206,
            'Section_Id': 35,
            'Title': 'Introduction'
          },
          {
            'Description': '',
            'Duration': '02:57',
            'Id': 207,
            'Section_Id': 35,
            'Title': 'Installing R and RStudio'
          },
          {
            'Description': '',
            'Duration': '02:06',
            'Id': 208,
            'Section_Id': 35,
            'Title': 'A Tour of RStudio'
          },
          {
            'Description': '',
            'Duration': '06:32',
            'Id': 209,
            'Section_Id': 35,
            'Title': 'Vectors in R'
          },
          {
            'Description': '',
            'Duration': '03:35',
            'Id': 210,
            'Section_Id': 35,
            'Title': 'Data Frames'
          },
          {
            'Description': '',
            'Duration': '02:52',
            'Id': 211,
            'Section_Id': 36,
            'Title': 'Installing ggplot2'
          },
          {
            'Description': '',
            'Duration': '08:31',
            'Id': 212,
            'Section_Id': 36,
            'Title': 'Plotting a point with ggplot'
          },
          {
            'Description': '',
            'Duration': '09:00',
            'Id': 213,
            'Section_Id': 36,
            'Title': 'Controlling axis properties'
          },
          {
            'Description': '',
            'Duration': '04:22',
            'Id': 214,
            'Section_Id': 36,
            'Title': 'More with color and shape'
          },
          {
            'Description': '',
            'Duration': '05:11',
            'Id': 215,
            'Section_Id': 36,
            'Title': 'Graphing lines with ggplot'
          },
          {
            'Description': '',
            'Duration': '06:10',
            'Id': 216,
            'Section_Id': 36,
            'Title': 'More with lines'
          },
          {
            'Description': '',
            'Duration': '05:20',
            'Id': 217,
            'Section_Id': 37,
            'Title': 'Normal populations'
          },
          {
            'Description': '',
            'Duration': '06:11',
            'Id': 218,
            'Section_Id': 37,
            'Title': 'Plotting a vertical sample'
          },
          {
            'Description': '',
            'Duration': '08:47',
            'Id': 219,
            'Section_Id': 37,
            'Title': 'Plotting several vertical samples'
          },
          {
            'Description': '',
            'Duration': '08:59',
            'Id': 220,
            'Section_Id': 37,
            'Title': 'Samples along a line'
          },
          {
            'Description': '',
            'Duration': '03:47',
            'Id': 221,
            'Section_Id': 37,
            'Title': 'sapply'
          },
          {
            'Description': '',
            'Duration': '10:04',
            'Id': 222,
            'Section_Id': 37,
            'Title': 'Cloud of points'
          },
          {
            'Description': '',
            'Duration': '05:42',
            'Id': 223,
            'Section_Id': 38,
            'Title': 'Father and son heights'
          },
          {
            'Description': '',
            'Duration': '02:19',
            'Id': 224,
            'Section_Id': 38,
            'Title': 'Equation of a line'
          },
          {
            'Description': '',
            'Duration': '12:09',
            'Id': 225,
            'Section_Id': 38,
            'Title': 'Residual visualization'
          },
          {
            'Description': '',
            'Duration': '04:57',
            'Id': 226,
            'Section_Id': 38,
            'Title': 'Sum of squared residuals'
          },
          {
            'Description': '',
            'Duration': '05:07',
            'Id': 227,
            'Section_Id': 38,
            'Title': 'The least squares line'
          },
          {
            'Description': '',
            'Duration': '03:02',
            'Id': 228,
            'Section_Id': 38,
            'Title': 'Prediction'
          },
          {
            'Description': '',
            'Duration': '02:35',
            'Id': 229,
            'Section_Id': 38,
            'Title': 'Reading in Excel files'
          },
          {
            'Description': '',
            'Duration': '01:08',
            'Id': 230,
            'Section_Id': 38,
            'Title': 'Course wrap-up'
          },
          {
            'Description': '',
            'Duration': '06:50',
            'Id': 231,
            'Section_Id': 39,
            'Title': 'Introduction to Artificial Intelligence'
          },
          {
            'Description': '',
            'Duration': '5 questions',
            'Id': 232,
            'Section_Id': 39,
            'Title': 'Introduction to Artificial Intelligence'
          },
          {
            'Description': '',
            'Duration': '07:26',
            'Id': 233,
            'Section_Id': 40,
            'Title': 'Programming and Mathematics Requirements'
          },
          {
            'Description': '',
            'Duration': '05:43',
            'Id': 234,
            'Section_Id': 40,
            'Title': 'Machine Learning Algorithms and AI Engine Requirements'
          },
          {
            'Description': '',
            'Duration': '3 questions',
            'Id': 235,
            'Section_Id': 40,
            'Title': 'Road Map Quiz'
          },
          {
            'Description': '',
            'Duration': '07:47',
            'Id': 236,
            'Section_Id': 41,
            'Title': 'Introduction to Machine Learning'
          },
          {
            'Description': '',
            'Duration': '4 questions',
            'Id': 237,
            'Section_Id': 41,
            'Title': 'Introduction to Machine Learning'
          },
          {
            'Description': '',
            'Duration': '07:16',
            'Id': 238,
            'Section_Id': 42,
            'Title': 'Supervised Machine Learning'
          },
          {
            'Description': '',
            'Duration': '7 questions',
            'Id': 239,
            'Section_Id': 42,
            'Title': 'Supervised Machine Learning'
          },
          {
            'Description': '',
            'Duration': '05:16',
            'Id': 240,
            'Section_Id': 42,
            'Title': 'Unsupervised Machine Learning'
          },
          {
            'Description': '',
            'Duration': '4 questions',
            'Id': 241,
            'Section_Id': 42,
            'Title': 'Unsupervised Machine Learning'
          },
          {
            'Description': '',
            'Duration': '08:24',
            'Id': 242,
            'Section_Id': 42,
            'Title': 'Reinforcement Machine Learning'
          },
          {
            'Description': '',
            'Duration': '7 questions',
            'Id': 243,
            'Section_Id': 42,
            'Title': 'Reinforcement Machine Learning'
          },
          {
            'Description': '',
            'Duration': '01:32',
            'Id': 244,
            'Section_Id': 43,
            'Title': 'Introduction'
          },
          {
            'Description': '',
            'Duration': '05:53',
            'Id': 245,
            'Section_Id': 43,
            'Title': 'How to set up Android Studio and Android simulators'
          },
          {
            'Description': '',
            'Duration': '02:53',
            'Id': 246,
            'Section_Id': 44,
            'Title': 'How to create a new Android project in Android Studio'
          },
          {
            'Description': '',
            'Duration': '03:58',
            'Id': 247,
            'Section_Id': 44,
            'Title': 'How to configure the main screen of an Android app (activity_main.xml)'
          },
          {
            'Description': '',
            'Duration': '08:42',
            'Id': 248,
            'Section_Id': 44,
            'Title': 'How to write Java code inside MainActivity.java'
          },
          {
            'Description': '',
            'Duration': '02:55',
            'Id': 249,
            'Section_Id': 45,
            'Title': 'Bonus 1: How to add an alpha animation to an Android button'
          },
          {
            'Description': '',
            'Duration': '02:37',
            'Id': 250,
            'Section_Id': 45,
            'Title': 'Bonus 2: How to debug an Android app'
          },
          {
            'Description': '',
            'Duration': '01:32',
            'Id': 251,
            'Section_Id': 45,
            'Title': 'Farewell and your next steps in Android Development'
          },
          {
            'Description': '',
            'Duration': '00:06',
            'Id': 252,
            'Section_Id': 45,
            'Title': 'BONUS: Your Next Course Awaits'
          },
          {
            'Description': '',
            'Duration': '01:53',
            'Id': 253,
            'Section_Id': 46,
            'Title': 'How to Install Flutter on Android Studio'
          },
          {
            'Description': '',
            'Duration': '02:20',
            'Id': 254,
            'Section_Id': 46,
            'Title': 'First Flutter Application'
          },
          {
            'Description': '',
            'Duration': '02:53',
            'Id': 255,
            'Section_Id': 47,
            'Title': 'StatelessWidget Class'
          },
          {
            'Description': '',
            'Duration': '06:11',
            'Id': 256,
            'Section_Id': 47,
            'Title': 'StatefullWidget Class'
          },
          {
            'Description': '',
            'Duration': '06:37',
            'Id': 257,
            'Section_Id': 48,
            'Title': 'Container Widget'
          },
          {
            'Description': '',
            'Duration': '04:19',
            'Id': 258,
            'Section_Id': 48,
            'Title': 'Row & Column Widget'
          },
          {
            'Description': '',
            'Duration': '01:45',
            'Id': 259,
            'Section_Id': 48,
            'Title': 'Basic List Widget'
          },
          {
            'Description': '',
            'Duration': '03:16',
            'Id': 260,
            'Section_Id': 48,
            'Title': 'List Widget (Array of List)'
          },
          {
            'Description': '',
            'Duration': '02:11',
            'Id': 261,
            'Section_Id': 48,
            'Title': 'Stack'
          },
          {
            'Description': '',
            'Duration': '03:42',
            'Id': 262,
            'Section_Id': 48,
            'Title': 'Gridview'
          },
          {
            'Description': '',
            'Duration': '03:49',
            'Id': 263,
            'Section_Id': 49,
            'Title': "Basic : Create AppBar & It's Basic Properties"
          },
          {
            'Description': '',
            'Duration': '05:59',
            'Id': 264,
            'Section_Id': 49,
            'Title': 'AppBar Leading & Actions[]'
          },
          {
            'Description': '',
            'Duration': '06:04',
            'Id': 265,
            'Section_Id': 49,
            'Title': 'Tabbar : Top & Bottom'
          },
          {
            'Description': '',
            'Duration': '01:27',
            'Id': 266,
            'Section_Id': 50,
            'Title': 'Custom Method Widget'
          },
          {
            'Description': '',
            'Duration': '03:30',
            'Id': 267,
            'Section_Id': 50,
            'Title': 'Custom Class Widget'
          },
          {
            'Description': '',
            'Duration': '04:44',
            'Id': 268,
            'Section_Id': 51,
            'Title': 'TextField Widget'
          },
          {
            'Description': '',
            'Duration': '04:18',
            'Id': 269,
            'Section_Id': 51,
            'Title': 'Buttons Widget'
          },
          {
            'Description': '',
            'Duration': '02:11',
            'Id': 270,
            'Section_Id': 51,
            'Title': 'CheckBox Widget'
          },
          {
            'Description': '',
            'Duration': '04:06',
            'Id': 271,
            'Section_Id': 51,
            'Title': 'Radio Widget'
          },
          {
            'Description': '',
            'Duration': '04:54',
            'Id': 272,
            'Section_Id': 51,
            'Title': 'Slider Widget'
          },
          {
            'Description': '',
            'Duration': '02:44',
            'Id': 273,
            'Section_Id': 51,
            'Title': 'Switch Widget'
          },
          {
            'Description': '',
            'Duration': '05:56',
            'Id': 274,
            'Section_Id': 52,
            'Title': 'Simple Drawer Widgets'
          },
          {
            'Description': '',
            'Duration': '04:00',
            'Id': 275,
            'Section_Id': 52,
            'Title': 'Routes'
          },
          {
            'Description': '',
            'Duration': '03:48',
            'Id': 276,
            'Section_Id': 53,
            'Title': 'SnackBar'
          },
          {
            'Description': '',
            'Duration': '03:49',
            'Id': 277,
            'Section_Id': 53,
            'Title': 'Alert Dialog'
          },
          {
            'Description': '',
            'Duration': '04:25',
            'Id': 278,
            'Section_Id': 53,
            'Title': 'Simple Dialog'
          },
          {
            'Description': '',
            'Duration': '01:47',
            'Id': 279,
            'Section_Id': 54,
            'Title': 'Course Objective - For Whom and What to expect ?'
          },
          {
            'Description': '',
            'Duration': '19:20',
            'Id': 280,
            'Section_Id': 54,
            'Title': 'Setting up Android Studio !'
          },
          {
            'Description': '',
            'Duration': '01:31',
            'Id': 281,
            'Section_Id': 54,
            'Title': 'What is a Layout !?'
          },
          {
            'Description': '',
            'Duration': '17:25',
            'Id': 282,
            'Section_Id': 54,
            'Title': 'A few important concepts to know ! View , Pixels & dp.'
          },
          {
            'Description': '',
            'Duration': '16:39',
            'Id': 283,
            'Section_Id': 54,
            'Title': 'A few important concepts to know ! Padding & Margin'
          },
          {
            'Description': '',
            'Duration': '17:49',
            'Id': 284,
            'Section_Id': 54,
            'Title': 'A few important concepts to know ! wrap_content , match_parent & gravity.'
          },
          {
            'Description': '',
            'Duration': '6 questions',
            'Id': 285,
            'Section_Id': 54,
            'Title': "Let's not forget the basics... Quiz"
          },
          {
            'Description': '',
            'Duration': '12:07',
            'Id': 286,
            'Section_Id': 54,
            'Title': '2 Most important types of Layouts'
          },
          {
            'Description': '',
            'Duration': '19:17',
            'Id': 287,
            'Section_Id': 54,
            'Title': 'Writing Layouts on XML.'
          },
          {
            'Description': '',
            'Duration': '09:41',
            'Id': 288,
            'Section_Id': 54,
            'Title': 'Using a Relative Layout to design a particular screen.'
          },
          {
            'Description': '',
            'Duration': '10:55',
            'Id': 289,
            'Section_Id': 54,
            'Title': 'Your First App ! Designing the Layout'
          },
          {
            'Description': '',
            'Duration': '11:49',
            'Id': 290,
            'Section_Id': 54,
            'Title': 'Your First App ! Coding with Java'
          },
          {
            'Description': '',
            'Duration': '4 questions',
            'Id': 291,
            'Section_Id': 54,
            'Title': 'Quiz 2: Android Studio - XML & JAVA'
          },
          {
            'Description': '',
            'Duration': '14:17',
            'Id': 292,
            'Section_Id': 55,
            'Title': 'Enhancements in Oreo'
          },
          {
            'Description': '',
            'Duration': '09:48',
            'Id': 293,
            'Section_Id': 55,
            'Title': 'Enhancements in Nougat'
          },
          {
            'Description': '',
            'Duration': '10:31',
            'Id': 294,
            'Section_Id': 55,
            'Title': 'Enhancements in Marshmallow'
          },
          {
            'Description': '',
            'Duration': '09:48',
            'Id': 295,
            'Section_Id': 55,
            'Title': 'Enhancements in Lollipop'
          },
          {
            'Description': '',
            'Duration': '02:41',
            'Id': 296,
            'Section_Id': 56,
            'Title': 'Introduction'
          },
          {
            'Description': '',
            'Duration': '01:10',
            'Id': 297,
            'Section_Id': 57,
            'Title': 'Introduction to Setup'
          },
          {
            'Description': '',
            'Duration': '02:54',
            'Id': 298,
            'Section_Id': 57,
            'Title': 'How to Set Up Xcode 8 and Swift 3'
          },
          {
            'Description': '',
            'Duration': '01:36',
            'Id': 299,
            'Section_Id': 57,
            'Title': 'How to Set Up iOS 10 Simulators'
          },
          {
            'Description': '',
            'Duration': '02:30',
            'Id': 300,
            'Section_Id': 58,
            'Title': 'Introduction to Swift 3'
          },
          {
            'Description': '',
            'Duration': '00:46',
            'Id': 301,
            'Section_Id': 58,
            'Title': 'Interlude'
          },
          {
            'Description': '',
            'Duration': '02:18',
            'Id': 302,
            'Section_Id': 58,
            'Title': 'Set up a Playground in Swift 3'
          },
          {
            'Description': '',
            'Duration': '07:17',
            'Id': 303,
            'Section_Id': 58,
            'Title': 'Variables in Swift 3'
          },
          {
            'Description': '',
            'Duration': '07:37',
            'Id': 304,
            'Section_Id': 58,
            'Title': 'Collections - Arrays in Swift 3'
          },
          {
            'Description': '',
            'Duration': '04:21',
            'Id': 305,
            'Section_Id': 58,
            'Title': 'Collections - Sets in Swift 3'
          },
          {
            'Description': '',
            'Duration': '04:50',
            'Id': 306,
            'Section_Id': 58,
            'Title': 'Collections - Dictionaries in Swift 3'
          },
          {
            'Description': '',
            'Duration': '2 questions',
            'Id': 307,
            'Section_Id': 58,
            'Title': 'Swift 3 Questions - Part 1'
          },
          {
            'Description': '',
            'Duration': '05:58',
            'Id': 308,
            'Section_Id': 58,
            'Title': 'Logic - If Else and Switch Case in Swift 3'
          },
          {
            'Description': '',
            'Duration': '07:07',
            'Id': 309,
            'Section_Id': 58,
            'Title': 'Round and Round - Loops in Swift 3'
          },
          {
            'Description': '',
            'Duration': '2 questions',
            'Id': 310,
            'Section_Id': 58,
            'Title': 'Swift 3 Questions - Part 2'
          },
          {
            'Description': '',
            'Duration': '06:48',
            'Id': 311,
            'Section_Id': 58,
            'Title': 'Functions in Swift 3'
          },
          {
            'Description': '',
            'Duration': '06:29',
            'Id': 312,
            'Section_Id': 58,
            'Title': 'Optionals in Swift 3'
          },
          {
            'Description': '',
            'Duration': '2 questions',
            'Id': 313,
            'Section_Id': 58,
            'Title': 'Swift 3 Questions - Part 3'
          },
          {
            'Description': '',
            'Duration': '06:08',
            'Id': 314,
            'Section_Id': 58,
            'Title': 'Classes and Objects in Swift 3'
          },
          {
            'Description': '',
            'Duration': '04:27',
            'Id': 315,
            'Section_Id': 58,
            'Title': 'Inheritance in Swift 3'
          },
          {
            'Description': '',
            'Duration': '2 questions',
            'Id': 316,
            'Section_Id': 58,
            'Title': 'Swift 3 Questions - Part 4'
          },
          {
            'Description': '',
            'Duration': '01:15',
            'Id': 317,
            'Section_Id': 58,
            'Title': 'Summary of Swift 3'
          },
          {
            'Description': '',
            'Duration': '03:43',
            'Id': 318,
            'Section_Id': 59,
            'Title': 'Introduction to Your First iOS 10 App'
          },
          {
            'Description': '',
            'Duration': '09:14',
            'Id': 319,
            'Section_Id': 59,
            'Title': 'An Astronomy Screen Torch - Storyboards'
          },
          {
            'Description': '',
            'Duration': '04:03',
            'Id': 320,
            'Section_Id': 59,
            'Title': 'An Astronomy Screen Torch - View Controller Code'
          },
          {
            'Description': '',
            'Duration': '06:24',
            'Id': 321,
            'Section_Id': 59,
            'Title': 'An Astronomy Screen Torch - Buttons and Outlets'
          },
          {
            'Description': '',
            'Duration': '03:55',
            'Id': 322,
            'Section_Id': 59,
            'Title': 'An Astronomy Screen Torch - Storyboard Element Positioning'
          },
          {
            'Description': '',
            'Duration': '01:11',
            'Id': 323,
            'Section_Id': 59,
            'Title': 'Create an Astronomy Screen Torch - Assignment'
          },
          {
            'Description': '',
            'Duration': '03:38',
            'Id': 324,
            'Section_Id': 59,
            'Title': 'Create an Astronomy Screen Torch - Solution'
          },
          {
            'Description': '',
            'Duration': '01:47',
            'Id': 325,
            'Section_Id': 59,
            'Title': 'Summary of Your First iOS 10 App'
          },
          {
            'Description': '',
            'Duration': '00:02',
            'Id': 326,
            'Section_Id': 59,
            'Title': 'Astro Torch Source Code'
          },
          {
            'Description': '',
            'Duration': '01:08',
            'Id': 327,
            'Section_Id': 60,
            'Title': 'Introduction to Temperature Converter'
          },
          {
            'Description': '',
            'Duration': '09:29',
            'Id': 328,
            'Section_Id': 60,
            'Title': 'Making the Main Screen of our Temperature Converter'
          },
          {
            'Description': '',
            'Duration': '06:51',
            'Id': 329,
            'Section_Id': 60,
            'Title': 'Connecting the Main Screen of Temperature Converter to Code'
          },
          {
            'Description': '',
            'Duration': '05:46',
            'Id': 330,
            'Section_Id': 60,
            'Title': 'Writing the Main Code of our Temperature Converter App'
          },
          {
            'Description': '',
            'Duration': '01:11',
            'Id': 331,
            'Section_Id': 60,
            'Title': 'Temperature Converter - Assignment'
          },
          {
            'Description': '',
            'Duration': '08:52',
            'Id': 332,
            'Section_Id': 60,
            'Title': 'Temperature Converter - Solution'
          },
          {
            'Description': '',
            'Duration': '01:36',
            'Id': 333,
            'Section_Id': 60,
            'Title': 'Summary of Temperature Converter'
          },
          {
            'Description': '',
            'Duration': '01:08',
            'Id': 334,
            'Section_Id': 61,
            'Title': 'Introduction to Calculator'
          },
          {
            'Description': '',
            'Duration': '11:45',
            'Id': 335,
            'Section_Id': 61,
            'Title': 'Making our Calculator Screen - Images, Image Sets and Buttons'
          },
          {
            'Description': '',
            'Duration': '07:39',
            'Id': 336,
            'Section_Id': 61,
            'Title': 'Making of our Calculator Screen - Stack Layouts'
          },
          {
            'Description': '',
            'Duration': '12:38',
            'Id': 337,
            'Section_Id': 61,
            'Title': 'Connecting Calculator Screen to Code'
          },
          {
            'Description': '',
            'Duration': '07:09',
            'Id': 338,
            'Section_Id': 61,
            'Title': 'Storing things with Enums'
          },
          {
            'Description': '',
            'Duration': '18:33',
            'Id': 339,
            'Section_Id': 61,
            'Title': 'Writing the Basic Code of our Calculator'
          },
          {
            'Description': '',
            'Duration': '00:51',
            'Id': 340,
            'Section_Id': 61,
            'Title': 'Calculator - Homework'
          },
          {
            'Description': '',
            'Duration': '06:38',
            'Id': 341,
            'Section_Id': 61,
            'Title': 'Calculator- Solution'
          },
          {
            'Description': '',
            'Duration': '00:02',
            'Id': 342,
            'Section_Id': 61,
            'Title': 'Calculator Source Code'
          },
          {
            'Description': '',
            'Duration': '02:18',
            'Id': 343,
            'Section_Id': 61,
            'Title': 'Summary of Calculator'
          },
          {
            'Description': '',
            'Duration': '01:40',
            'Id': 344,
            'Section_Id': 62,
            'Title': 'Introduction to Back to the Future'
          },
          {
            'Description': '',
            'Duration': '04:14',
            'Id': 345,
            'Section_Id': 62,
            'Title': 'Back to the Future - Tabbed Apps Explained'
          },
          {
            'Description': '',
            'Duration': '11:27',
            'Id': 346,
            'Section_Id': 62,
            'Title': 'Back to the Future Layout - Storyboards'
          },
          {
            'Description': '',
            'Duration': '08:40',
            'Id': 347,
            'Section_Id': 62,
            'Title': 'Back to the Future Code - Showing the Year'
          },
          {
            'Description': '',
            'Duration': '06:56',
            'Id': 348,
            'Section_Id': 62,
            'Title': 'Back to the Future Code - A Ticking Clock'
          },
          {
            'Description': '',
            'Duration': '06:50',
            'Id': 349,
            'Section_Id': 62,
            'Title': 'Back to the Future Time Travel - Storyboards'
          },
          {
            'Description': '',
            'Duration': '04:47',
            'Id': 350,
            'Section_Id': 62,
            'Title': 'Back to the Future Time Travel - Code'
          },
          {
            'Description': '',
            'Duration': '10:06',
            'Id': 351,
            'Section_Id': 62,
            'Title': 'Back to the Future Time Travel - Animations'
          },
          {
            'Description': '',
            'Duration': '01:07',
            'Id': 352,
            'Section_Id': 62,
            'Title': 'Back to the Future - Homework'
          },
          {
            'Description': '',
            'Duration': '05:14',
            'Id': 353,
            'Section_Id': 62,
            'Title': 'Back to the Future - Solution'
          },
          {
            'Description': '',
            'Duration': '00:52',
            'Id': 354,
            'Section_Id': 62,
            'Title': 'Back to the Future - Extra Credits'
          },
          {
            'Description': '',
            'Duration': '01:32',
            'Id': 355,
            'Section_Id': 62,
            'Title': 'Summary of App 2 - Back to the Future'
          },
          {
            'Description': '',
            'Duration': '00:02',
            'Id': 356,
            'Section_Id': 62,
            'Title': 'Back to the Future Source Code'
          },
          {
            'Description': '',
            'Duration': '00:48',
            'Id': 357,
            'Section_Id': 63,
            'Title': 'Introduction to App 3 - Where was I?'
          },
          {
            'Description': '',
            'Duration': '00:52',
            'Id': 358,
            'Section_Id': 63,
            'Title': 'Where was I? - Setup'
          },
          {
            'Description': '',
            'Duration': '04:50',
            'Id': 359,
            'Section_Id': 63,
            'Title': 'Showing a Map with Apple Maps'
          },
          {
            'Description': '',
            'Duration': '02:17',
            'Id': 360,
            'Section_Id': 63,
            'Title': 'Info.plist - Setting Required Device Capabilities'
          },
          {
            'Description': '',
            'Duration': '02:39',
            'Id': 361,
            'Section_Id': 63,
            'Title': 'Info.plist - Permissions for Location'
          },
          {
            'Description': '',
            'Duration': '07:57',
            'Id': 362,
            'Section_Id': 63,
            'Title': 'Showing Your Location'
          },
          {
            'Description': '',
            'Duration': '08:05',
            'Id': 363,
            'Section_Id': 63,
            'Title': 'Getting Location Coordinates'
          },
          {
            'Description': '',
            'Duration': '03:15',
            'Id': 364,
            'Section_Id': 63,
            'Title': 'Creating a Class to Store Location Coordinates'
          },
          {
            'Description': '',
            'Duration': '09:07',
            'Id': 365,
            'Section_Id': 63,
            'Title': 'Saving Location Coordinates (UserDefaults)'
          },
          {
            'Description': '',
            'Duration': '06:16',
            'Id': 366,
            'Section_Id': 63,
            'Title': 'Showing Last Location with a Pin Annotation'
          },
          {
            'Description': '',
            'Duration': '00:45',
            'Id': 367,
            'Section_Id': 63,
            'Title': 'Where Was I - Homework'
          },
          {
            'Description': '',
            'Duration': '04:19',
            'Id': 368,
            'Section_Id': 63,
            'Title': 'Where Was I - Solution'
          },
          {
            'Description': '',
            'Duration': '00:50',
            'Id': 369,
            'Section_Id': 63,
            'Title': 'Summary of Where was I? - GPS and Maps'
          },
          {
            'Description': '',
            'Duration': '00:02',
            'Id': 370,
            'Section_Id': 63,
            'Title': 'Where was I Source Code'
          },
          {
            'Description': '',
            'Duration': '01:41',
            'Id': 371,
            'Section_Id': 64,
            'Title': 'Introduction to Great App Design'
          },
          {
            'Description': '',
            'Duration': '03:05',
            'Id': 372,
            'Section_Id': 64,
            'Title': 'Thinking About User Experience'
          },
          {
            'Description': '',
            'Duration': '02:13',
            'Id': 373,
            'Section_Id': 64,
            'Title': 'Popular User Experience Tools'
          },
          {
            'Description': '',
            'Duration': '03:58',
            'Id': 374,
            'Section_Id': 64,
            'Title': 'How to Design a User Experience - Photo Sharer'
          },
          {
            'Description': '',
            'Duration': '04:59',
            'Id': 375,
            'Section_Id': 64,
            'Title': 'What is a User Interface - First Step'
          },
          {
            'Description': '',
            'Duration': '01:39',
            'Id': 376,
            'Section_Id': 64,
            'Title': 'Popular User Interface Design Tools'
          },
          {
            'Description': '',
            'Duration': '06:18',
            'Id': 377,
            'Section_Id': 64,
            'Title': 'How to Design a User Interface'
          },
          {
            'Description': '',
            'Duration': '00:55',
            'Id': 378,
            'Section_Id': 64,
            'Title': 'Summary of Great App Design'
          },
          {
            'Description': '',
            'Duration': '01:15',
            'Id': 379,
            'Section_Id': 65,
            'Title': 'Introduction to Quick Share'
          },
          {
            'Description': '',
            'Duration': '11:19',
            'Id': 380,
            'Section_Id': 65,
            'Title': 'Quick Share - Launch Screens and Images'
          },
          {
            'Description': '',
            'Duration': '07:59',
            'Id': 381,
            'Section_Id': 65,
            'Title': 'Creating the User Interface - UITableView'
          },
          {
            'Description': '',
            'Duration': '06:49',
            'Id': 382,
            'Section_Id': 65,
            'Title': 'How to Setup a Simple UITableView'
          },
          {
            'Description': '',
            'Duration': '11:08',
            'Id': 383,
            'Section_Id': 65,
            'Title': 'How to Setup a Custom UITableViewCell'
          },
          {
            'Description': '',
            'Duration': '02:58',
            'Id': 384,
            'Section_Id': 65,
            'Title': 'How Handle a Click from a UITableViewCell'
          },
          {
            'Description': '',
            'Duration': '08:27',
            'Id': 385,
            'Section_Id': 65,
            'Title': 'How to Push a New View Controller and Send Data'
          },
          {
            'Description': '',
            'Duration': '00:35',
            'Id': 386,
            'Section_Id': 65,
            'Title': 'Warning - There Be Dragons Ahead!'
          },
          {
            'Description': '',
            'Duration': '12:53',
            'Id': 387,
            'Section_Id': 65,
            'Title': 'How to Use the Photos Framework with Swift'
          },
          {
            'Description': '',
            'Duration': '09:59',
            'Id': 388,
            'Section_Id': 65,
            'Title': 'How to Pass a Photo to a View Controller'
          },
          {
            'Description': '',
            'Duration': '14:28',
            'Id': 389,
            'Section_Id': 65,
            'Title': 'Setting up Sharing Icons and Minimising Outlet Code'
          },
          {
            'Description': '',
            'Duration': '06:37',
            'Id': 390,
            'Section_Id': 65,
            'Title': 'Sharing on Facebook and Twitter Using the Social Framework'
          },
          {
            'Description': '',
            'Duration': '14:11',
            'Id': 391,
            'Section_Id': 65,
            'Title': 'Sharing on Instagram'
          },
          {
            'Description': '',
            'Duration': '10:29',
            'Id': 392,
            'Section_Id': 65,
            'Title': 'Sharing on WhatsApp'
          },
          {
            'Description': '',
            'Duration': '13:31',
            'Id': 393,
            'Section_Id': 65,
            'Title': 'Taking a Photo from Inside Your App'
          },
          {
            'Description': '',
            'Duration': '01:00',
            'Id': 394,
            'Section_Id': 65,
            'Title': 'Quick Share - Homework'
          },
          {
            'Description': '',
            'Duration': '03:27',
            'Id': 395,
            'Section_Id': 65,
            'Title': 'Quick Share - Solution'
          },
          {
            'Description': '',
            'Duration': '02:35',
            'Id': 396,
            'Section_Id': 65,
            'Title': 'Summary of Quick Share'
          },
          {
            'Description': '',
            'Duration': '00:01',
            'Id': 397,
            'Section_Id': 65,
            'Title': 'Source Code for Quick Share'
          },
          {
            'Description': '',
            'Duration': '01:42',
            'Id': 398,
            'Section_Id': 66,
            'Title': 'Lesson 1 - What You Need To Start Making Apps'
          },
          {
            'Description': '',
            'Duration': '23:23',
            'Id': 399,
            'Section_Id': 67,
            'Title': 'Lesson 2 - Getting The Tools You Need And Building Your First iPhone App'
          },
          {
            'Description': '',
            'Duration': '06:52',
            'Id': 400,
            'Section_Id': 67,
            'Title': 'Lesson 2 Challenge Solution'
          },
          {
            'Description': '',
            'Duration': '59.7 kB',
            'Id': 401,
            'Section_Id': 67,
            'Title': 'Lesson 2 Assets'
          },
          {
            'Description': '',
            'Duration': '19:07',
            'Id': 402,
            'Section_Id': 68,
            'Title': 'Lesson 3 - Learning To Write Code In Objective-C'
          },
          {
            'Description': '',
            'Duration': '2 pages',
            'Id': 403,
            'Section_Id': 68,
            'Title': 'Lesson 3 Challenge Solution'
          },
          {
            'Description': '',
            'Duration': '612.4 kB',
            'Id': 404,
            'Section_Id': 68,
            'Title': 'Lesson 3 Project File'
          },
          {
            'Description': '',
            'Duration': '48:30',
            'Id': 405,
            'Section_Id': 69,
            'Title': 'Lesson 4 - Creating a Tip Calculator App'
          },
          {
            'Description': '',
            'Duration': '03:08',
            'Id': 406,
            'Section_Id': 69,
            'Title': 'Lesson 4 Challenge Solution'
          },
          {
            'Description': '',
            'Duration': '387.6 kB',
            'Id': 407,
            'Section_Id': 69,
            'Title': 'Lesson 4 Tip Calculator App Images'
          },
          {
            'Description': '',
            'Duration': '418.8 kB',
            'Id': 408,
            'Section_Id': 69,
            'Title': 'Completed Tip Calculator Project'
          },
          {
            'Description': '',
            'Duration': '43:23',
            'Id': 409,
            'Section_Id': 70,
            'Title': 'Lesson 5 - Fun With TableViews, Arrays, and More'
          },
          {
            'Description': '',
            'Duration': '05:00',
            'Id': 410,
            'Section_Id': 70,
            'Title': 'Lesson 5 Challenge Solution'
          },
          {
            'Description': '',
            'Duration': '33:28',
            'Id': 411,
            'Section_Id': 71,
            'Title': 'Lesson 6 - Updating Food Diary to save data and show a detail view'
          },
          {
            'Description': '',
            'Duration': '09:06',
            'Id': 412,
            'Section_Id': 71,
            'Title': 'Lesson 6 Challenge Solution'
          },
          {
            'Description': '',
            'Duration': '30.2 kB',
            'Id': 413,
            'Section_Id': 71,
            'Title': 'Food Diary Lesson 6 Starting Point'
          },
          {
            'Description': '',
            'Duration': '29:46',
            'Id': 414,
            'Section_Id': 72,
            'Title': 'Lesson 7 - Updating Food Diary to add Geo-Location And Map Views'
          },
          {
            'Description': '',
            'Duration': '34.6 kB',
            'Id': 415,
            'Section_Id': 72,
            'Title': 'Food Diary Lesson 7 Starting Point'
          },
          {
            'Description': '',
            'Duration': '28:25',
            'Id': 416,
            'Section_Id': 73,
            'Title': 'Lesson 8 - A new app! Photos, touches, gestures, animations, and sound'
          },
          {
            'Description': '',
            'Duration': '04:41',
            'Id': 417,
            'Section_Id': 73,
            'Title': 'Lesson 8 Challenge Solution'
          },
          {
            'Description': '',
            'Duration': '1.9 MB',
            'Id': 418,
            'Section_Id': 73,
            'Title': 'Lesson 8 Photo Touch Images and Sound File'
          },
          {
            'Description': '',
            'Duration': '13:31',
            'Id': 419,
            'Section_Id': 74,
            'Title': 'Lesson 9 - Submitting Your App To The App Store'
          },
          {
            'Description': '',
            'Duration': '862.9 kB',
            'Id': 420,
            'Section_Id': 74,
            'Title': 'Lesson 9 PhotoTouch Icon Files'
          },
          {
            'Description': '',
            'Duration': '03:07',
            'Id': 421,
            'Section_Id': 75,
            'Title': 'Introduction / Website Tour'
          },
          {
            'Description': '',
            'Duration': '02:06',
            'Id': 422,
            'Section_Id': 76,
            'Title': 'The 5 Main Steps'
          },
          {
            'Description': '',
            'Duration': '05:08',
            'Id': 423,
            'Section_Id': 77,
            'Title': 'Web Hosting and Domain Name'
          },
          {
            'Description': '',
            'Duration': '04:50',
            'Id': 424,
            'Section_Id': 78,
            'Title': 'Installing WordPress and Logging In'
          },
          {
            'Description': '',
            'Duration': '02:05',
            'Id': 425,
            'Section_Id': 79,
            'Title': 'Deleting WordPress DEMO Content'
          },
          {
            'Description': '',
            'Duration': '02:07',
            'Id': 426,
            'Section_Id': 80,
            'Title': 'Changing Our Theme on WordPress'
          },
          {
            'Description': '',
            'Duration': '12:06',
            'Id': 427,
            'Section_Id': 81,
            'Title': 'Customizing Our New WordPress Theme (Rocked)'
          },
          {
            'Description': '',
            'Duration': '10:21',
            'Id': 428,
            'Section_Id': 82,
            'Title': 'Adding Pages on WordPress (About, Contact, etc)'
          },
          {
            'Description': '',
            'Duration': '06:09',
            'Id': 429,
            'Section_Id': 83,
            'Title': 'Adding Blog Posts on WordPress'
          },
          {
            'Description': '',
            'Duration': '05:17',
            'Id': 430,
            'Section_Id': 84,
            'Title': 'Changing Our Fonts & Font Sizes (Google Fonts)'
          },
          {
            'Description': '',
            'Duration': '00:37',
            'Id': 431,
            'Section_Id': 85,
            'Title': 'Welcome to Web Hosting 101'
          },
          {
            'Description': '',
            'Duration': '18 pages',
            'Id': 432,
            'Section_Id': 85,
            'Title': 'What is a Domain Name & Hosting Package?'
          },
          {
            'Description': '',
            'Duration': '06:22',
            'Id': 433,
            'Section_Id': 86,
            'Title': 'How to Find Your Perfect Domain Name'
          },
          {
            'Description': '',
            'Duration': '08:52',
            'Id': 434,
            'Section_Id': 86,
            'Title': 'How to Purchase a Domain Name'
          },
          {
            'Description': '',
            'Duration': '09:12',
            'Id': 435,
            'Section_Id': 87,
            'Title': 'How to Purchase a Hosting Package'
          },
          {
            'Description': '',
            'Duration': '07:32',
            'Id': 436,
            'Section_Id': 87,
            'Title': 'How to Associate your Domain Name with your Hosting Package'
          },
          {
            'Description': '',
            'Duration': '07:36',
            'Id': 437,
            'Section_Id': 88,
            'Title': 'How to Upload your Website to your Domain'
          },
          {
            'Description': '',
            'Duration': '06:52',
            'Id': 438,
            'Section_Id': 88,
            'Title': 'How to set up a Wordpress Blog in under 5-minutes'
          },
          {
            'Description': '',
            'Duration': '00:15',
            'Id': 439,
            'Section_Id': 88,
            'Title': 'Rate & Review'
          },
          {
            'Description': '',
            'Duration': '01:59',
            'Id': 440,
            'Section_Id': 89,
            'Title': 'Introduction'
          },
          {
            'Description': '',
            'Duration': '00:04',
            'Id': 441,
            'Section_Id': 89,
            'Title': "What you'll need"
          },
          {
            'Description': '',
            'Duration': '12:43',
            'Id': 442,
            'Section_Id': 90,
            'Title': 'User interface Explained'
          },
          {
            'Description': '',
            'Duration': '3 questions',
            'Id': 443,
            'Section_Id': 90,
            'Title': 'User interface'
          },
          {
            'Description': '',
            'Duration': '06:06',
            'Id': 444,
            'Section_Id': 91,
            'Title': 'Using The Paint Brush'
          },
          {
            'Description': '',
            'Duration': '1 question',
            'Id': 445,
            'Section_Id': 91,
            'Title': 'Using the paint brush'
          },
          {
            'Description': '',
            'Duration': '09:26',
            'Id': 446,
            'Section_Id': 92,
            'Title': 'Shapes and Custom Shapes'
          },
          {
            'Description': '',
            'Duration': '4 questions',
            'Id': 447,
            'Section_Id': 92,
            'Title': 'shapes and custom shapes'
          },
          {
            'Description': '',
            'Duration': '04:23',
            'Id': 448,
            'Section_Id': 93,
            'Title': 'layers and groups'
          },
          {
            'Description': '',
            'Duration': '2 questions',
            'Id': 449,
            'Section_Id': 93,
            'Title': 'Layers and groups'
          },
          {
            'Description': '',
            'Duration': '08:09',
            'Id': 450,
            'Section_Id': 94,
            'Title': 'moving and resizing'
          },
          {
            'Description': '',
            'Duration': '2 questions',
            'Id': 451,
            'Section_Id': 94,
            'Title': 'moving and resizing'
          },
          {
            'Description': '',
            'Duration': '01:37',
            'Id': 452,
            'Section_Id': 95,
            'Title': 'Zooming and Panning'
          },
          {
            'Description': '',
            'Duration': '2 questions',
            'Id': 453,
            'Section_Id': 95,
            'Title': 'zooming and panning'
          },
          {
            'Description': '',
            'Duration': '13:04',
            'Id': 454,
            'Section_Id': 96,
            'Title': 'Blend Modes & Adding Effects'
          },
          {
            'Description': '',
            'Duration': '13:58',
            'Id': 455,
            'Section_Id': 97,
            'Title': 'text'
          },
          {
            'Description': '',
            'Duration': '07:09',
            'Id': 456,
            'Section_Id': 98,
            'Title': 'walking monk'
          },
          {
            'Description': '',
            'Duration': '2 questions',
            'Id': 457,
            'Section_Id': 98,
            'Title': 'Walking monk'
          },
          {
            'Description': '',
            'Duration': '00:42',
            'Id': 458,
            'Section_Id': 99,
            'Title': 'Build a Web Design & SEO Business Website With WordPress'
          },
          {
            'Description': '',
            'Duration': '01:12',
            'Id': 459,
            'Section_Id': 99,
            'Title': 'Ongoing Help & How to Contact Me'
          },
          {
            'Description': '',
            'Duration': '03:01',
            'Id': 460,
            'Section_Id': 100,
            'Title': 'Benefits of WordPress: Why Use WordPress to Build Your Website'
          },
          {
            'Description': '',
            'Duration': '02:57',
            'Id': 461,
            'Section_Id': 100,
            'Title': 'WordPress: Get Familiar With the Most Common WordPress Lingo'
          },
          {
            'Description': '',
            'Duration': '04:00',
            'Id': 462,
            'Section_Id': 100,
            'Title': 'Setting Up the Best WordPress Hosting'
          },
          {
            'Description': '',
            'Duration': '01:55',
            'Id': 463,
            'Section_Id': 100,
            'Title': 'How to Install WordPress in Under 60 Seconds'
          },
          {
            'Description': '',
            'Duration': '00:51',
            'Id': 464,
            'Section_Id': 100,
            'Title': 'How to Log-In to the WordPress Dashboard'
          },
          {
            'Description': '',
            'Duration': '05:13',
            'Id': 465,
            'Section_Id': 100,
            'Title': 'A Quick Tour of the WordPress Dashboard'
          },
          {
            'Description': '',
            'Duration': '06:35',
            'Id': 466,
            'Section_Id': 100,
            'Title': 'The Most Important WordPress Settings You Need to Update'
          },
          {
            'Description': '',
            'Duration': '03:26',
            'Id': 467,
            'Section_Id': 100,
            'Title': 'How to Set-up WordPress Posts on Your Blog'
          },
          {
            'Description': '',
            'Duration': '02:47',
            'Id': 468,
            'Section_Id': 100,
            'Title': 'How to Add a New Page to Your WordPress Website'
          },
          {
            'Description': '',
            'Duration': '04:26',
            'Id': 469,
            'Section_Id': 101,
            'Title': 'How to Set-Up Your Website Menu in WordPress'
          },
          {
            'Description': '',
            'Duration': '06:01',
            'Id': 470,
            'Section_Id': 101,
            'Title': 'How to Find and Install WordPress Themes'
          },
          {
            'Description': '',
            'Duration': '00:47',
            'Id': 471,
            'Section_Id': 101,
            'Title': 'The Top WordPress Themes to Use For Your Business Website'
          },
          {
            'Description': '',
            'Duration': '04:27',
            'Id': 472,
            'Section_Id': 101,
            'Title': 'How to Find and Install Plugins on Your WordPress Website'
          },
          {
            'Description': '',
            'Duration': '03:15',
            'Id': 473,
            'Section_Id': 101,
            'Title': 'How to Customize Your WordPress Plugin'
          },
          {
            'Description': '',
            'Duration': '04:53',
            'Id': 474,
            'Section_Id': 101,
            'Title': 'Understanding Widgets & Adding Them to Your Website'
          },
          {
            'Description': '',
            'Duration': '00:24',
            'Id': 475,
            'Section_Id': 101,
            'Title': '8 Places to Find Free & Premium Themes'
          },
          {
            'Description': '',
            'Duration': '02:58',
            'Id': 476,
            'Section_Id': 101,
            'Title': '15 of the Best WordPress Plugins'
          },
          {
            'Description': '',
            'Duration': '01:16',
            'Id': 477,
            'Section_Id': 102,
            'Title': 'Finishing Your Web Design & SEO Business WordPress Website'
          },
          {
            'Description': '',
            'Duration': '00:42',
            'Id': 478,
            'Section_Id': 102,
            'Title': "Let's Continue Learning Together"
          },
          {
            'Description': '',
            'Duration': '00:28',
            'Id': 479,
            'Section_Id': 102,
            'Title': 'How to Select a Hosting Company Based on Your Needs'
          },
          {
            'Description': '',
            'Duration': '01:03',
            'Id': 480,
            'Section_Id': 102,
            'Title': 'Additional Resources'
          },
          {
            'Description': '',
            'Duration': '01:27',
            'Id': 481,
            'Section_Id': 103,
            'Title': 'Introduction'
          },
          {
            'Description': '',
            'Duration': '03:51',
            'Id': 482,
            'Section_Id': 104,
            'Title': 'HTML Documents'
          },
          {
            'Description': '',
            'Duration': '04:35',
            'Id': 483,
            'Section_Id': 104,
            'Title': 'HTML Tags'
          },
          {
            'Description': '',
            'Duration': '01:23',
            'Id': 484,
            'Section_Id': 105,
            'Title': 'CSS Part 1'
          },
          {
            'Description': '',
            'Duration': '04:10',
            'Id': 485,
            'Section_Id': 105,
            'Title': 'CSS Part 2'
          },
          {
            'Description': '',
            'Duration': '09:39',
            'Id': 486,
            'Section_Id': 106,
            'Title': 'Demo, Part 1'
          },
          {
            'Description': '',
            'Duration': '17:54',
            'Id': 487,
            'Section_Id': 106,
            'Title': 'Demo, Part 2'
          },
          {
            'Description': '',
            'Duration': '10:29',
            'Id': 488,
            'Section_Id': 106,
            'Title': 'Demo, Part 3'
          },
          {
            'Description': '',
            'Duration': '08:12',
            'Id': 489,
            'Section_Id': 106,
            'Title': 'Demo, Part 4'
          },
          {
            'Description': '',
            'Duration': '01:22',
            'Id': 490,
            'Section_Id': 107,
            'Title': 'Introduction'
          },
          {
            'Description': '',
            'Duration': '10:46',
            'Id': 491,
            'Section_Id': 108,
            'Title': 'Logo Design (Neuron)'
          },
          {
            'Description': '',
            'Duration': '11:24',
            'Id': 492,
            'Section_Id': 108,
            'Title': 'Logo Design (Macro)'
          },
          {
            'Description': '',
            'Duration': '09:49',
            'Id': 493,
            'Section_Id': 108,
            'Title': 'Logo Design (Crease)'
          },
          {
            'Description': '',
            'Duration': '09:30',
            'Id': 494,
            'Section_Id': 108,
            'Title': 'Logo Design (Color)'
          },
          {
            'Description': '',
            'Duration': '09:49',
            'Id': 495,
            'Section_Id': 108,
            'Title': 'Logo Design (abc)'
          },
          {
            'Description': '',
            'Duration': '15:05',
            'Id': 496,
            'Section_Id': 108,
            'Title': 'Logo Design (Aragon)'
          },
          {
            'Description': '',
            'Duration': '09:45',
            'Id': 497,
            'Section_Id': 108,
            'Title': 'Logo Design (3D Logo)'
          },
          {
            'Description': '',
            'Duration': '19:56',
            'Id': 498,
            'Section_Id': 108,
            'Title': 'Logo Design (Plus)'
          },
          {
            'Description': '',
            'Duration': '07:36',
            'Id': 499,
            'Section_Id': 108,
            'Title': 'Logo Design (Catalist)'
          },
          {
            'Description': '',
            'Duration': '13:40',
            'Id': 500,
            'Section_Id': 108,
            'Title': 'Logo Design (Air)'
          },
          {
            'Description': '',
            'Duration': '08:43',
            'Id': 501,
            'Section_Id': 108,
            'Title': 'Logo Design (Glass)'
          },
          {
            'Description': '',
            'Duration': '11:16',
            'Id': 502,
            'Section_Id': 108,
            'Title': 'Logo Design (Tropical)'
          },
          {
            'Description': '',
            'Duration': '11:10',
            'Id': 503,
            'Section_Id': 108,
            'Title': 'Logo Design (Check)'
          },
          {
            'Description': '',
            'Duration': '09:03',
            'Id': 504,
            'Section_Id': 108,
            'Title': 'Logo Design (Science)'
          },
          {
            'Description': '',
            'Duration': '14:41',
            'Id': 505,
            'Section_Id': 108,
            'Title': 'Logo Design (Yawl)'
          },
          {
            'Description': '',
            'Duration': '08:43',
            'Id': 506,
            'Section_Id': 108,
            'Title': 'Logo Design (Cubic)'
          },
          {
            'Description': '',
            'Duration': '11:36',
            'Id': 507,
            'Section_Id': 108,
            'Title': 'Logo Design (ET)'
          },
          {
            'Description': '',
            'Duration': '06:11',
            'Id': 508,
            'Section_Id': 108,
            'Title': 'Logo Design (Direct)'
          },
          {
            'Description': '',
            'Duration': '14:57',
            'Id': 509,
            'Section_Id': 108,
            'Title': 'Logo Design (Creat)'
          },
          {
            'Description': '',
            'Duration': '10:32',
            'Id': 510,
            'Section_Id': 108,
            'Title': 'Logo Design (Celcius)'
          },
          {
            'Description': '',
            'Duration': '09:30',
            'Id': 511,
            'Section_Id': 108,
            'Title': 'Logo Design (Tesla)'
          },
          {
            'Description': '',
            'Duration': '09:53',
            'Id': 512,
            'Section_Id': 108,
            'Title': 'Logo Design (Artmag)'
          },
          {
            'Description': '',
            'Duration': '09:34',
            'Id': 513,
            'Section_Id': 108,
            'Title': 'Logo Design (Beat)'
          },
          {
            'Description': '',
            'Duration': '05:57',
            'Id': 514,
            'Section_Id': 108,
            'Title': 'Logo Design (Blend)'
          },
          {
            'Description': '',
            'Duration': '06:28',
            'Id': 515,
            'Section_Id': 108,
            'Title': 'Logo Design (Mestro)'
          },
          {
            'Description': '',
            'Duration': '09:06',
            'Id': 516,
            'Section_Id': 108,
            'Title': 'Logo Design (Known)'
          },
          {
            'Description': '',
            'Duration': '07:57',
            'Id': 517,
            'Section_Id': 108,
            'Title': 'Logo Design (CarbonCoffee)'
          },
          {
            'Description': '',
            'Duration': '08:41',
            'Id': 518,
            'Section_Id': 108,
            'Title': 'Logo Design (Alpha)'
          },
          {
            'Description': '',
            'Duration': '09:49',
            'Id': 519,
            'Section_Id': 108,
            'Title': 'Logo Design (Task)'
          },
          {
            'Description': '',
            'Duration': '07:25',
            'Id': 520,
            'Section_Id': 108,
            'Title': 'Logo Design (Euro)'
          },
          {
            'Description': '',
            'Duration': '13:50',
            'Id': 521,
            'Section_Id': 108,
            'Title': 'Logo Design (Evolve)'
          },
          {
            'Description': '',
            'Duration': '04:52',
            'Id': 522,
            'Section_Id': 108,
            'Title': 'Logo Design (Explore)'
          },
          {
            'Description': '',
            'Duration': '05:20',
            'Id': 523,
            'Section_Id': 108,
            'Title': 'Logo Design (Delmon)'
          },
          {
            'Description': '',
            'Duration': '11:38',
            'Id': 524,
            'Section_Id': 108,
            'Title': 'Logo Design (Entroprenor)'
          },
          {
            'Description': '',
            'Duration': '07:34',
            'Id': 525,
            'Section_Id': 108,
            'Title': 'Logo Design (Gsquare)'
          },
          {
            'Description': '',
            'Duration': '09:48',
            'Id': 526,
            'Section_Id': 108,
            'Title': 'Logo Design (Guard)'
          },
          {
            'Description': '',
            'Duration': '15:32',
            'Id': 527,
            'Section_Id': 108,
            'Title': 'Logo Design (Jazzer)'
          },
          {
            'Description': '',
            'Duration': '15:10',
            'Id': 528,
            'Section_Id': 108,
            'Title': 'Logo Design (Oral)'
          },
          {
            'Description': '',
            'Duration': '12:13',
            'Id': 529,
            'Section_Id': 108,
            'Title': 'Logo Design (Orbit)'
          },
          {
            'Description': '',
            'Duration': '07:37',
            'Id': 530,
            'Section_Id': 108,
            'Title': 'Logo Design (Ordinary)'
          },
          {
            'Description': '',
            'Duration': '10:39',
            'Id': 531,
            'Section_Id': 108,
            'Title': 'Logo Design (Playr)'
          },
          {
            'Description': '',
            'Duration': '04:41',
            'Id': 532,
            'Section_Id': 108,
            'Title': 'Logo Design (Nice)'
          },
          {
            'Description': '',
            'Duration': '08:10',
            'Id': 533,
            'Section_Id': 108,
            'Title': 'Logo Design (Direct)'
          },
          {
            'Description': '',
            'Duration': '05:45',
            'Id': 534,
            'Section_Id': 108,
            'Title': 'Logo Design (Clear)'
          },
          {
            'Description': '',
            'Duration': '01:59',
            'Id': 535,
            'Section_Id': 109,
            'Title': 'Welcome'
          },
          {
            'Description': '',
            'Duration': '16:54',
            'Id': 536,
            'Section_Id': 110,
            'Title': 'Photoshop Setup and Basic Operations'
          },
          {
            'Description': '',
            'Duration': '04:42',
            'Id': 537,
            'Section_Id': 110,
            'Title': 'Photoshop Filters'
          },
          {
            'Description': '',
            'Duration': '02:12',
            'Id': 538,
            'Section_Id': 110,
            'Title': 'Photoshop Masks'
          },
          {
            'Description': '',
            'Duration': '11:30',
            'Id': 539,
            'Section_Id': 110,
            'Title': 'Photoshop Tools'
          },
          {
            'Description': '',
            'Duration': '00:57',
            'Id': 540,
            'Section_Id': 111,
            'Title': 'Course Recap'
          },
          {
            'Description': '',
            'Duration': '00:48',
            'Id': 541,
            'Section_Id': 112,
            'Title': 'Introduction'
          },
          {
            'Description': '',
            'Duration': '05:21',
            'Id': 542,
            'Section_Id': 113,
            'Title': 'Habits of Successful Artists'
          },
          {
            'Description': '',
            'Duration': '16:13',
            'Id': 543,
            'Section_Id': 114,
            'Title': 'Basics of Sketching'
          },
          {
            'Description': '',
            'Duration': '04:36',
            'Id': 544,
            'Section_Id': 114,
            'Title': 'Design Principles'
          },
          {
            'Description': '',
            'Duration': '16:30',
            'Id': 545,
            'Section_Id': 114,
            'Title': 'Value'
          },
          {
            'Description': '',
            'Duration': '07:04',
            'Id': 546,
            'Section_Id': 114,
            'Title': 'Color'
          },
          {
            'Description': '',
            'Duration': '11:54',
            'Id': 547,
            'Section_Id': 115,
            'Title': 'Still life study - value painting'
          },
          {
            'Description': '',
            'Duration': '01:31',
            'Id': 548,
            'Section_Id': 116,
            'Title': 'Course Recap'
          },
          {
            'Description': '',
            'Duration': '04:05',
            'Id': 549,
            'Section_Id': 117,
            'Title': 'Figure Drawing Class Introduction'
          },
          {
            'Description': '',
            'Duration': '02:19',
            'Id': 550,
            'Section_Id': 117,
            'Title': 'Figure Drawing Class Disclaimers'
          },
          {
            'Description': '',
            'Duration': '05:57',
            'Id': 551,
            'Section_Id': 117,
            'Title': 'Figure Drawing Class #1:Large and Small Action Lines'
          },
          {
            'Description': '',
            'Duration': '02:20',
            'Id': 552,
            'Section_Id': 117,
            'Title': 'Figure Drawing Class #2: Action and Large Shapes'
          },
          {
            'Description': '',
            'Duration': '04:19',
            'Id': 553,
            'Section_Id': 117,
            'Title': 'Figure Drawing Class #3: Action and Large Shapes'
          },
          {
            'Description': '',
            'Duration': '05:05',
            'Id': 554,
            'Section_Id': 117,
            'Title': 'Figure Drawing Class #4: Negative Space and Small Shapes'
          },
          {
            'Description': '',
            'Duration': '13:17',
            'Id': 555,
            'Section_Id': 117,
            'Title': 'Figure Drawing Class #5: Value (Light and Dark)'
          },
          {
            'Description': '',
            'Duration': '10:45',
            'Id': 556,
            'Section_Id': 117,
            'Title': 'Figure Drawing Class #6: Perspective and Foreshortening'
          },
          {
            'Description': '',
            'Duration': '09:51',
            'Id': 557,
            'Section_Id': 117,
            'Title': 'Figure Drawing Class #7: Depth with Shape, Edge, and Value'
          },
          {
            'Description': '',
            'Duration': '11:35',
            'Id': 558,
            'Section_Id': 117,
            'Title': 'Figure Drawing Class #8: Edge and Line Weight'
          },
          {
            'Description': '',
            'Duration': '08:12',
            'Id': 559,
            'Section_Id': 117,
            'Title': 'Figure Drawing Class #9: Details (Hands and Feet)'
          },
          {
            'Description': '',
            'Duration': '05:07',
            'Id': 560,
            'Section_Id': 117,
            'Title': 'Figure Drawing Class #10: Details (Hands and Feet)'
          },
          {
            'Description': '',
            'Duration': '07:07',
            'Id': 561,
            'Section_Id': 117,
            'Title': 'Figure Drawing Class #11: Drapery'
          },
          {
            'Description': '',
            'Duration': '16:49',
            'Id': 562,
            'Section_Id': 117,
            'Title': 'Figure Drawing Class #12: Details (Face)'
          },
          {
            'Description': '',
            'Duration': '04:06',
            'Id': 563,
            'Section_Id': 117,
            'Title': 'Figure Drawing Class #13: Details (Face-Foreshortening)'
          },
          {
            'Description': '',
            'Duration': '08:45',
            'Id': 564,
            'Section_Id': 117,
            'Title': 'Figure Drawing Class #14: Summary and Demo (Back)'
          },
          {
            'Description': '',
            'Duration': '05:45',
            'Id': 565,
            'Section_Id': 117,
            'Title': 'Figure Drawing class #15: Summary and Demo (Side)'
          },
          {
            'Description': '',
            'Duration': '05:38',
            'Id': 566,
            'Section_Id': 118,
            'Title': 'Demonstration #1: Front Female Nude (Seated)'
          },
          {
            'Description': '',
            'Duration': '04:22',
            'Id': 567,
            'Section_Id': 118,
            'Title': 'Demonstration #2: Back Female Nude (Seated)'
          },
          {
            'Description': '',
            'Duration': '05:21',
            'Id': 568,
            'Section_Id': 118,
            'Title': 'Demonstration #3: Side Female Nude (Seated)'
          },
          {
            'Description': '',
            'Duration': '07:31',
            'Id': 569,
            'Section_Id': 118,
            'Title': 'Demonstration #4: Front Female Nude (Reclining)'
          },
          {
            'Description': '',
            'Duration': '05:37',
            'Id': 570,
            'Section_Id': 118,
            'Title': 'Demonstration #5: Side Female Nude (Standing)'
          },
          {
            'Description': '',
            'Duration': '01:48',
            'Id': 571,
            'Section_Id': 119,
            'Title': 'Intro to logo fundamentals'
          },
          {
            'Description': '',
            'Duration': '01:18',
            'Id': 572,
            'Section_Id': 119,
            'Title': 'Company Profile beginning'
          },
          {
            'Description': '',
            'Duration': '03:47',
            'Id': 573,
            'Section_Id': 119,
            'Title': '20 Sketches'
          },
          {
            'Description': '',
            'Duration': '02:47',
            'Id': 574,
            'Section_Id': 120,
            'Title': 'Choosing a font'
          },
          {
            'Description': '',
            'Duration': '02:13',
            'Id': 575,
            'Section_Id': 120,
            'Title': 'Finding a new font and installing it'
          },
          {
            'Description': '',
            'Duration': '04:02',
            'Id': 576,
            'Section_Id': 121,
            'Title': 'Vector Elements'
          },
          {
            'Description': '',
            'Duration': '03:17',
            'Id': 577,
            'Section_Id': 121,
            'Title': 'Building vector'
          },
          {
            'Description': '',
            'Duration': '05:02',
            'Id': 578,
            'Section_Id': 122,
            'Title': 'Construction 1'
          },
          {
            'Description': '',
            'Duration': '05:02',
            'Id': 579,
            'Section_Id': 122,
            'Title': 'Construction 2'
          },
          {
            'Description': '',
            'Duration': '07:14',
            'Id': 580,
            'Section_Id': 122,
            'Title': 'Construction 3'
          },
          {
            'Description': '',
            'Duration': '06:06',
            'Id': 581,
            'Section_Id': 123,
            'Title': 'Horizontal Vs. Vertical'
          },
          {
            'Description': '',
            'Duration': '02:50',
            'Id': 582,
            'Section_Id': 123,
            'Title': 'Black and White'
          },
          {
            'Description': '',
            'Duration': '01:55',
            'Id': 583,
            'Section_Id': 124,
            'Title': 'Saving the Logo File for Print'
          },
          {
            'Description': '',
            'Duration': '01:40',
            'Id': 584,
            'Section_Id': 124,
            'Title': 'Finishing touches and wrap up'
          },
          {
            'Description': '',
            'Duration': '52:03',
            'Id': 585,
            'Section_Id': 125,
            'Title': 'First Full Length Audio on how to build a logo'
          },
          {
            'Description': '',
            'Duration': '03:08',
            'Id': 586,
            'Section_Id': 126,
            'Title': 'Introduction and Overview'
          },
          {
            'Description': '',
            'Duration': '08:40',
            'Id': 587,
            'Section_Id': 127,
            'Title': 'Perpetuation of road and rail systems.'
          },
          {
            'Description': '',
            'Duration': '09:23',
            'Id': 588,
            'Section_Id': 127,
            'Title': 'Perpetuation of numbering systems and the worst data entry technology.'
          },
          {
            'Description': '',
            'Duration': '08:56',
            'Id': 589,
            'Section_Id': 127,
            'Title': 'Perpetuation of paper and computer formats.'
          },
          {
            'Description': '',
            'Duration': '13:50',
            'Id': 590,
            'Section_Id': 127,
            'Title': 'Perpetuation of bookkeeping and computer files.'
          },
          {
            'Description': '',
            'Duration': '13:22',
            'Id': 591,
            'Section_Id': 127,
            'Title': 'Perpetuation of industrial-age systems into the information-age.'
          },
          {
            'Description': '',
            'Duration': '13:41',
            'Id': 592,
            'Section_Id': 127,
            'Title': 'Perpetuation of industrial-age business structures today and the problems it causes.'
          },
          {
            'Description': '',
            'Duration': '02:28',
            'Id': 593,
            'Section_Id': 128,
            'Title': 'Wrap-Up and Review'
          },
          {
            'Description': '',
            'Duration': '03:40',
            'Id': 594,
            'Section_Id': 129,
            'Title': 'I’m not creative… What do I do now?'
          },
          {
            'Description': '',
            'Duration': '00:19',
            'Id': 595,
            'Section_Id': 130,
            'Title': 'Section Introduction'
          },
          {
            'Description': '',
            'Duration': '02:23',
            'Id': 596,
            'Section_Id': 130,
            'Title': 'What is Creativity again?'
          },
          {
            'Description': '',
            'Duration': '03:53',
            'Id': 597,
            'Section_Id': 130,
            'Title': 'Are there any differences between creative and non-creative people?'
          },
          {
            'Description': '',
            'Duration': '1 question',
            'Id': 598,
            'Section_Id': 130,
            'Title': 'Closing of the Creativity Section'
          },
          {
            'Description': '',
            'Duration': '00:11',
            'Id': 599,
            'Section_Id': 131,
            'Title': "Beginning of the 'Stages of the Creative Procces' Section"
          },
          {
            'Description': '',
            'Duration': '05:42',
            'Id': 600,
            'Section_Id': 131,
            'Title': 'Stages of the creative process'
          },
          {
            'Description': '',
            'Duration': '1 question',
            'Id': 601,
            'Section_Id': 131,
            'Title': 'Closing of Stages of the Creative Process'
          },
          {
            'Description': '',
            'Duration': '00:19',
            'Id': 602,
            'Section_Id': 132,
            'Title': 'Section Introduction'
          },
          {
            'Description': '',
            'Duration': '00:13',
            'Id': 603,
            'Section_Id': 132,
            'Title': 'The Identification Phase'
          },
          {
            'Description': '',
            'Duration': '02:17',
            'Id': 604,
            'Section_Id': 132,
            'Title': 'Identification Phase Introduction'
          },
          {
            'Description': '',
            'Duration': '04:29',
            'Id': 605,
            'Section_Id': 132,
            'Title': 'Mapping Behavioral Trends'
          },
          {
            'Description': '',
            'Duration': '02:25',
            'Id': 606,
            'Section_Id': 132,
            'Title': 'Popular Media Scanning'
          },
          {
            'Description': '',
            'Duration': '01:57',
            'Id': 607,
            'Section_Id': 132,
            'Title': 'Innovation Sourcebook'
          },
          {
            'Description': '',
            'Duration': '02:01',
            'Id': 608,
            'Section_Id': 132,
            'Title': 'Convergence Map'
          },
          {
            'Description': '',
            'Duration': '02:43',
            'Id': 609,
            'Section_Id': 132,
            'Title': 'The 5 Whys'
          },
          {
            'Description': '',
            'Duration': '1 question',
            'Id': 610,
            'Section_Id': 132,
            'Title': "Closing of the 'Identification Phase' Section"
          },
          {
            'Description': '',
            'Duration': '00:06',
            'Id': 611,
            'Section_Id': 133,
            'Title': 'Section Introduction'
          },
          {
            'Description': '',
            'Duration': '01:12',
            'Id': 612,
            'Section_Id': 133,
            'Title': 'The Preparation Phase'
          },
          {
            'Description': '',
            'Duration': '02:49',
            'Id': 613,
            'Section_Id': 133,
            'Title': 'Socio-Cultural Scanning of The Problem'
          },
          {
            'Description': '',
            'Duration': '02:17',
            'Id': 614,
            'Section_Id': 133,
            'Title': 'Eras Map'
          },
          {
            'Description': '',
            'Duration': '05:29',
            'Id': 615,
            'Section_Id': 133,
            'Title': 'Evaluation of Types of Market Innovations'
          },
          {
            'Description': '',
            'Duration': '03:16',
            'Id': 616,
            'Section_Id': 133,
            'Title': 'Thinking through Analogies'
          },
          {
            'Description': '',
            'Duration': '1 question',
            'Id': 617,
            'Section_Id': 133,
            'Title': "Closing of the 'Preparation Phase' Section"
          },
          {
            'Description': '',
            'Duration': '00:12',
            'Id': 618,
            'Section_Id': 134,
            'Title': 'Section Introduction'
          },
          {
            'Description': '',
            'Duration': '02:22',
            'Id': 619,
            'Section_Id': 134,
            'Title': 'The Incubation Phase'
          },
          {
            'Description': '',
            'Duration': '01:14',
            'Id': 620,
            'Section_Id': 134,
            'Title': 'New Activities, Challenges and Experiences'
          },
          {
            'Description': '',
            'Duration': '01:36',
            'Id': 621,
            'Section_Id': 134,
            'Title': 'Acquire Random Knowledge'
          },
          {
            'Description': '',
            'Duration': '1 question',
            'Id': 622,
            'Section_Id': 134,
            'Title': 'Closing of the \'Incubation Phase" Section'
          },
          {
            'Description': '',
            'Duration': '00:05',
            'Id': 623,
            'Section_Id': 135,
            'Title': 'Section Introduction'
          },
          {
            'Description': '',
            'Duration': '00:54',
            'Id': 624,
            'Section_Id': 135,
            'Title': 'The Warming Up Phase'
          },
          {
            'Description': '',
            'Duration': '03:40',
            'Id': 625,
            'Section_Id': 135,
            'Title': 'Brainstorming'
          },
          {
            'Description': '',
            'Duration': '04:50',
            'Id': 626,
            'Section_Id': 135,
            'Title': 'Scamper'
          },
          {
            'Description': '',
            'Duration': '03:16',
            'Id': 627,
            'Section_Id': 135,
            'Title': 'Word Cloud'
          },
          {
            'Description': '',
            'Duration': '03:13',
            'Id': 628,
            'Section_Id': 135,
            'Title': 'Mind Map'
          },
          {
            'Description': '',
            'Duration': '04:10',
            'Id': 629,
            'Section_Id': 135,
            'Title': 'Empathy Map'
          },
          {
            'Description': '',
            'Duration': '03:34',
            'Id': 630,
            'Section_Id': 135,
            'Title': '635 Tool'
          },
          {
            'Description': '',
            'Duration': '1 question',
            'Id': 631,
            'Section_Id': 135,
            'Title': 'Closing of the \'Warming Up Phase" Section'
          },
          {
            'Description': '',
            'Duration': '00:06',
            'Id': 632,
            'Section_Id': 136,
            'Title': 'Section Introduction'
          },
          {
            'Description': '',
            'Duration': '00:48',
            'Id': 633,
            'Section_Id': 136,
            'Title': 'The Enlightenmen Phase'
          },
          {
            'Description': '',
            'Duration': '05:47',
            'Id': 634,
            'Section_Id': 136,
            'Title': 'Six Hats Tool'
          },
          {
            'Description': '',
            'Duration': '02:58',
            'Id': 635,
            'Section_Id': 136,
            'Title': 'Role Playing Game'
          },
          {
            'Description': '',
            'Duration': '02:51',
            'Id': 636,
            'Section_Id': 136,
            'Title': 'Stakeholders Value Map'
          },
          {
            'Description': '',
            'Duration': '1 question',
            'Id': 637,
            'Section_Id': 136,
            'Title': "Closing of the 'Enlightenment Phase' Section"
          },
          {
            'Description': '',
            'Duration': '00:05',
            'Id': 638,
            'Section_Id': 137,
            'Title': 'Section Introduction'
          },
          {
            'Description': '',
            'Duration': '01:01',
            'Id': 639,
            'Section_Id': 137,
            'Title': 'The Elaboration Phase'
          },
          {
            'Description': '',
            'Duration': '03:56',
            'Id': 640,
            'Section_Id': 137,
            'Title': 'Moodboard'
          },
          {
            'Description': '',
            'Duration': '03:20',
            'Id': 641,
            'Section_Id': 137,
            'Title': 'Storyboard'
          },
          {
            'Description': '',
            'Duration': '03:44',
            'Id': 642,
            'Section_Id': 137,
            'Title': '5W1H'
          },
          {
            'Description': '',
            'Duration': '03:02',
            'Id': 643,
            'Section_Id': 137,
            'Title': 'Business Model Canvas'
          },
          {
            'Description': '',
            'Duration': '01:43',
            'Id': 644,
            'Section_Id': 137,
            'Title': 'Real Prototype Development'
          },
          {
            'Description': '',
            'Duration': '1 question',
            'Id': 645,
            'Section_Id': 137,
            'Title': "Closing of the 'Elaboration Phase' Section"
          },
          {
            'Description': '',
            'Duration': '00:05',
            'Id': 646,
            'Section_Id': 138,
            'Title': 'Section Introduction'
          },
          {
            'Description': '',
            'Duration': '00:56',
            'Id': 647,
            'Section_Id': 138,
            'Title': 'The Verification Phase'
          },
          {
            'Description': '',
            'Duration': '01:46',
            'Id': 648,
            'Section_Id': 138,
            'Title': 'Evaluation of the Idea with Potential Consumers'
          },
          {
            'Description': '',
            'Duration': '01:56',
            'Id': 649,
            'Section_Id': 138,
            'Title': 'Evaluation of the Product with Potential Consumers'
          },
          {
            'Description': '',
            'Duration': '02:51',
            'Id': 650,
            'Section_Id': 138,
            'Title': 'Evaluation of the Idea or Product with Potential Partners'
          },
          {
            'Description': '',
            'Duration': '02:54',
            'Id': 651,
            'Section_Id': 138,
            'Title': 'Product Evaluation on the Market'
          },
          {
            'Description': '',
            'Duration': '01:52',
            'Id': 652,
            'Section_Id': 138,
            'Title': 'Evaluation of the Productive or Management Capacity of the Company'
          },
          {
            'Description': '',
            'Duration': '1 question',
            'Id': 653,
            'Section_Id': 138,
            'Title': "Closing of 'Verification Phase' Section"
          },
          {
            'Description': '',
            'Duration': '18:11',
            'Id': 654,
            'Section_Id': 139,
            'Title': 'Knuckle Joint design for Tractor'
          },
          {
            'Description': '',
            'Duration': '11:41',
            'Id': 655,
            'Section_Id': 139,
            'Title': 'Concept development'
          },
          {
            'Description': '',
            'Duration': '38:09',
            'Id': 656,
            'Section_Id': 140,
            'Title': 'Design of Fork'
          },
          {
            'Description': '',
            'Duration': '09:52',
            'Id': 657,
            'Section_Id': 140,
            'Title': 'Design of Eye'
          },
          {
            'Description': '',
            'Duration': '22:49',
            'Id': 658,
            'Section_Id': 140,
            'Title': 'Design of Pin'
          },
          {
            'Description': '',
            'Duration': '01:34',
            'Id': 659,
            'Section_Id': 141,
            'Title': 'Introduction'
          },
          {
            'Description': '',
            'Duration': '08:44',
            'Id': 660,
            'Section_Id': 141,
            'Title': 'Product Flop or Success?'
          },
          {
            'Description': '',
            'Duration': '14:18',
            'Id': 661,
            'Section_Id': 141,
            'Title': 'Types of New Products'
          },
          {
            'Description': '',
            'Duration': '09:14',
            'Id': 662,
            'Section_Id': 141,
            'Title': 'Services as Products'
          },
          {
            'Description': '',
            'Duration': '00:31',
            'Id': 663,
            'Section_Id': 141,
            'Title': 'BONUS LECTURE'
          },
          {
            'Description': '',
            'Duration': '01:38',
            'Id': 664,
            'Section_Id': 142,
            'Title': 'はじめに'
          },
          {
            'Description': '',
            'Duration': '09:28',
            'Id': 665,
            'Section_Id': 142,
            'Title': 'デジタルトランスフォーメーション(DX)とは'
          },
          {
            'Description': '',
            'Duration': '16:05',
            'Id': 666,
            'Section_Id': 142,
            'Title': '製造業での事例（前半）'
          },
          {
            'Description': '',
            'Duration': '19:18',
            'Id': 667,
            'Section_Id': 142,
            'Title': '製造業での事例（後半）'
          },
          {
            'Description': '',
            'Duration': '28:10',
            'Id': 668,
            'Section_Id': 142,
            'Title': '流通業での事例'
          },
          {
            'Description': '',
            'Duration': '12:28',
            'Id': 669,
            'Section_Id': 142,
            'Title': 'デジタルトランスフォーメーションシステムのアーキテクチャ'
          },
          {
            'Description': '',
            'Duration': '13:42',
            'Id': 670,
            'Section_Id': 142,
            'Title': 'サービスデザインの必要性'
          }
        ]
      );
    })
};