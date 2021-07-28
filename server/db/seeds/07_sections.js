
exports.seed = function (knex) {
  // Deletes ALL existing entries
  console.log("seed sections");
  return createSections(knex);
};

function createSections(knex) {
  return knex("Sections")
    .del()
    .then(function () {
      return knex("Sections").insert(
        [
          { 'Course_Id': 1, 'Id': 1, 'Name': 'Course Introduction' },
          { 'Course_Id': 1, 'Id': 2, 'Name': 'The 25+ Guidelines Of Amazing Web Design' },
          { 'Course_Id': 1, 'Id': 3, 'Name': 'Course Summary' },
          { 'Course_Id': 1, 'Id': 4, 'Name': 'Conclusion' },
          { 'Course_Id': 2, 'Id': 5, 'Name': 'Introduction' },
          { 'Course_Id': 2, 'Id': 6, 'Name': 'Basic Syntax' },
          { 'Course_Id': 2, 'Id': 7, 'Name': 'Comparison & Conditional Execution' },
          { 'Course_Id': 2, 'Id': 8, 'Name': 'DOM Manipulation' },
          { 'Course_Id': 2, 'Id': 9, 'Name': 'Final Overview' },
          { 'Course_Id': 3, 'Id': 10, 'Name': 'Q&A Section Project' },
          { 'Course_Id': 3, 'Id': 11, 'Name': 'Tabs Project' },
          { 'Course_Id': 4, 'Id': 12, 'Name': 'Introduction and Installations' },
          { 'Course_Id': 4, 'Id': 13, 'Name': 'Background video project' },
          { 'Course_Id': 4, 'Id': 14, 'Name': 'Counter Project' },
          { 'Course_Id': 5, 'Id': 15, 'Name': 'Introduction' },
          { 'Course_Id': 5, 'Id': 16, 'Name': 'PHP Basics' },
          { 'Course_Id': 5, 'Id': 17, 'Name': 'PHP Arrays' },
          { 'Course_Id': 5, 'Id': 18, 'Name': 'PHP If, Else & Elseif' },
          { 'Course_Id': 5, 'Id': 19, 'Name': 'PHP Operators' },
          { 'Course_Id': 5, 'Id': 20, 'Name': 'PHP Loops' },
          { 'Course_Id': 5, 'Id': 21, 'Name': 'PHP Functions' },
          { 'Course_Id': 5, 'Id': 22, 'Name': 'Coding a Dynamic PHP Restaurant Website' },
          { 'Course_Id': 6, 'Id': 23, 'Name': 'Introduction' },
          { 'Course_Id': 6, 'Id': 24, 'Name': 'Getting started with coding' },
          {
            'Course_Id': 6,
            'Id': 25,
            'Name': 'Bonus material from the other R-Tutorials courses'
          },
          { 'Course_Id': 7, 'Id': 26, 'Name': 'Introduction' },
          { 'Course_Id': 7, 'Id': 27, 'Name': 'Getting setup with Tools' },
          {
            'Course_Id': 7,
            'Id': 28,
            'Name': 'Getting Deeper into Machine learning frameworks and algorithms'
          },
          { 'Course_Id': 8, 'Id': 29, 'Name': 'Introduction' },
          { 'Course_Id': 8, 'Id': 30, 'Name': 'Pandas' },
          { 'Course_Id': 8, 'Id': 31, 'Name': 'NumPy' },
          { 'Course_Id': 8, 'Id': 32, 'Name': 'SciKit-Learn' },
          { 'Course_Id': 8, 'Id': 33, 'Name': 'matplotlib' },
          { 'Course_Id': 8, 'Id': 34, 'Name': 'NLTK' },
          { 'Course_Id': 9, 'Id': 35, 'Name': 'Getting Started' },
          { 'Course_Id': 9, 'Id': 36, 'Name': 'Working with ggplot' },
          { 'Course_Id': 9, 'Id': 37, 'Name': 'Sampling from populations' },
          { 'Course_Id': 9, 'Id': 38, 'Name': 'Simple Linear Regression in R' },
          {
            'Course_Id': 10,
            'Id': 39,
            'Name': 'Introduction to Artificial Intelligence'
          },
          {
            'Course_Id': 10,
            'Id': 40,
            'Name': 'Road Map for AI and Machine Learning (ML)'
          },
          { 'Course_Id': 10, 'Id': 41, 'Name': 'Introduction to Machine Learning' },
          { 'Course_Id': 10, 'Id': 42, 'Name': 'Types of Machine Learning' },
          { 'Course_Id': 11, 'Id': 43, 'Name': 'Introduction and setup' },
          {
            'Course_Id': 11,
            'Id': 44,
            'Name': 'Creating a basic Android App in 15 minutes'
          },
          {
            'Course_Id': 11,
            'Id': 45,
            'Name': 'Bonus app features (Complete in 11 minutes)'
          },
          { 'Course_Id': 12, 'Id': 46, 'Name': 'Introduction To Flutter' },
          { 'Course_Id': 12, 'Id': 47, 'Name': 'Flutter States' },
          { 'Course_Id': 12, 'Id': 48, 'Name': 'layouts' },
          { 'Course_Id': 12, 'Id': 49, 'Name': 'AppBar & TabBar Widget' },
          { 'Course_Id': 12, 'Id': 50, 'Name': 'Custom Widgets' },
          { 'Course_Id': 12, 'Id': 51, 'Name': 'Input & Selections Widgets' },
          { 'Course_Id': 12, 'Id': 52, 'Name': 'Drawer Widget & Routes' },
          { 'Course_Id': 12, 'Id': 53, 'Name': 'Notification Widgets' },
          {
            'Course_Id': 13,
            'Id': 54,
            'Name': 'Hey there ! Let me introduce you to Android and Android Studio !'
          },
          { 'Course_Id': 13, 'Id': 55, 'Name': 'Android Versions' },
          { 'Course_Id': 14, 'Id': 56, 'Name': 'Introduction' },
          { 'Course_Id': 14, 'Id': 57, 'Name': 'Setup' },
          { 'Course_Id': 14, 'Id': 58, 'Name': 'Basic Swift 3' },
          {
            'Course_Id': 14,
            'Id': 59,
            'Name': 'Your First iOS 10 App - An Astronomy Screen Torch!'
          },
          { 'Course_Id': 14, 'Id': 60, 'Name': 'App 2 - Temperature Converter' },
          { 'Course_Id': 14, 'Id': 61, 'Name': 'App 3 - Calculator' },
          { 'Course_Id': 14, 'Id': 62, 'Name': 'App 4 - Back to the Future' },
          { 'Course_Id': 14, 'Id': 63, 'Name': 'App 5 - Where was I? - GPS and Maps' },
          { 'Course_Id': 14, 'Id': 64, 'Name': 'Great App Design' },
          { 'Course_Id': 14, 'Id': 65, 'Name': 'App 6 - Quick Share (Photos)' },
          { 'Course_Id': 15, 'Id': 66, 'Name': 'Getting Started' },
          { 'Course_Id': 15, 'Id': 67, 'Name': 'Your First App' },
          { 'Course_Id': 15, 'Id': 68, 'Name': 'Learning To Code' },
          { 'Course_Id': 15, 'Id': 69, 'Name': 'Creating A Tip Calculator App' },
          { 'Course_Id': 15, 'Id': 70, 'Name': 'Creating A Food Journal App' },
          { 'Course_Id': 15, 'Id': 71, 'Name': 'Expanding Our Food Journal App' },
          {
            'Course_Id': 15,
            'Id': 72,
            'Name': 'Adding Geo-Location And Maps to Our Food Journal App'
          },
          { 'Course_Id': 15, 'Id': 73, 'Name': 'Creating A Multi-Touch Photo-based App' },
          { 'Course_Id': 15, 'Id': 74, 'Name': 'Submitting To The App Store' },
          { 'Course_Id': 16, 'Id': 75, 'Name': 'Introduction' },
          { 'Course_Id': 16, 'Id': 76, 'Name': 'The 5 Main Steps' },
          { 'Course_Id': 16, 'Id': 77, 'Name': 'Web Hosting and Domain Name' },
          { 'Course_Id': 16, 'Id': 78, 'Name': 'Installing WordPress and Logging In' },
          { 'Course_Id': 16, 'Id': 79, 'Name': 'Deleting Demo Content' },
          { 'Course_Id': 16, 'Id': 80, 'Name': 'Changing Our Theme' },
          { 'Course_Id': 16, 'Id': 81, 'Name': 'Customizing Our Theme' },
          { 'Course_Id': 16, 'Id': 82, 'Name': 'Adding Pages' },
          { 'Course_Id': 16, 'Id': 83, 'Name': 'Adding Blog Posts' },
          { 'Course_Id': 16, 'Id': 84, 'Name': 'Changing Our Fonts' },
          { 'Course_Id': 17, 'Id': 85, 'Name': 'Introduction' },
          { 'Course_Id': 17, 'Id': 86, 'Name': 'The Domain Name' },
          { 'Course_Id': 17, 'Id': 87, 'Name': 'Web Hosting' },
          { 'Course_Id': 17, 'Id': 88, 'Name': 'Getting your Website Live' },
          { 'Course_Id': 18, 'Id': 89, 'Name': 'Hello and Welcome!' },
          { 'Course_Id': 18, 'Id': 90, 'Name': 'User Interface' },
          { 'Course_Id': 18, 'Id': 91, 'Name': 'Working with tools and layers' },
          { 'Course_Id': 18, 'Id': 92, 'Name': 'Creating Shapes' },
          { 'Course_Id': 18, 'Id': 93, 'Name': 'Working With Layers & Groups' },
          { 'Course_Id': 18, 'Id': 94, 'Name': 'Moving and Resizing' },
          { 'Course_Id': 18, 'Id': 95, 'Name': 'Zooming and Panning' },
          { 'Course_Id': 18, 'Id': 96, 'Name': 'Blend Modes and Adding Effects' },
          { 'Course_Id': 18, 'Id': 97, 'Name': 'Inserting Text' },
          { 'Course_Id': 18, 'Id': 98, 'Name': 'Design in Photoshop' },
          { 'Course_Id': 19, 'Id': 99, 'Name': 'Course Overview' },
          { 'Course_Id': 19, 'Id': 100, 'Name': 'Getting Started With WordPress' },
          {
            'Course_Id': 19,
            'Id': 101,
            'Name': 'Customizing Your Website & Adding New Features'
          },
          {
            'Course_Id': 19,
            'Id': 102,
            'Name': 'The Big Reveal & Your Site Post Launch'
          },
          { 'Course_Id': 20, 'Id': 103, 'Name': 'Introduction' },
          { 'Course_Id': 20, 'Id': 104, 'Name': 'HTML' },
          { 'Course_Id': 20, 'Id': 105, 'Name': 'CSS' },
          { 'Course_Id': 20, 'Id': 106, 'Name': 'Bringing it all together' },
          { 'Course_Id': 21, 'Id': 107, 'Name': 'INTRODUCTION' },
          {
            'Course_Id': 21,
            'Id': 108,
            'Name': 'Professional Logo Design- Abobe Illustrator'
          },
          { 'Course_Id': 22, 'Id': 109, 'Name': 'Welcome' },
          { 'Course_Id': 22, 'Id': 110, 'Name': 'Basic Operations' },
          { 'Course_Id': 22, 'Id': 111, 'Name': 'Course Recap' },
          { 'Course_Id': 23, 'Id': 112, 'Name': 'Introduction' },
          { 'Course_Id': 23, 'Id': 113, 'Name': 'Habits of Successful Artists' },
          { 'Course_Id': 23, 'Id': 114, 'Name': 'Art Basics' },
          { 'Course_Id': 23, 'Id': 115, 'Name': 'Art Project' },
          { 'Course_Id': 23, 'Id': 116, 'Name': 'Course Recap' },
          {
            'Course_Id': 24,
            'Id': 117,
            'Name': 'Step-by-Step Instruction Using the Reilly Technique'
          },
          {
            'Course_Id': 24,
            'Id': 118,
            'Name': 'Demonstrations Using the Reilly Technique'
          },
          {
            'Course_Id': 25,
            'Id': 119,
            'Name': 'Introduction to logo design fundamentals'
          },
          { 'Course_Id': 25, 'Id': 120, 'Name': 'Fonts for Logo' },
          { 'Course_Id': 25, 'Id': 121, 'Name': 'Vector Elements and building vectors' },
          { 'Course_Id': 25, 'Id': 122, 'Name': 'Constructing the Logo' },
          {
            'Course_Id': 25,
            'Id': 123,
            'Name': 'Black and White | Horizontal Vs. Vertical'
          },
          { 'Course_Id': 25, 'Id': 124, 'Name': 'Finishing touches on the Logo' },
          { 'Course_Id': 25, 'Id': 125, 'Name': 'Bonus Features' },
          {
            'Course_Id': 26,
            'Id': 126,
            'Name': 'Analysis of Everyday Things Introduction'
          },
          {
            'Course_Id': 26,
            'Id': 127,
            'Name': 'Analysis of Modern Perpetuations of Old Designs.'
          },
          {
            'Course_Id': 26,
            'Id': 128,
            'Name': 'Analysis of Everyday Things Conclusion'
          },
          { 'Course_Id': 27, 'Id': 129, 'Name': 'I’m not creative… What do I do now?' },
          { 'Course_Id': 27, 'Id': 130, 'Name': 'Create + Activity = Creativity' },
          { 'Course_Id': 27, 'Id': 131, 'Name': 'Stages of the Creative Process' },
          { 'Course_Id': 27, 'Id': 132, 'Name': 'Identification Phase + 5 Tools' },
          { 'Course_Id': 27, 'Id': 133, 'Name': 'Preparation Phase + 4 Tools' },
          { 'Course_Id': 27, 'Id': 134, 'Name': 'Incubation Phase + 2 Tips' },
          { 'Course_Id': 27, 'Id': 135, 'Name': 'Warming Up Phase + 6 Tools' },
          { 'Course_Id': 27, 'Id': 136, 'Name': 'Enlightenment Phase + 4 Tools' },
          { 'Course_Id': 27, 'Id': 137, 'Name': 'Elaboration Phase + 5 Tools' },
          { 'Course_Id': 27, 'Id': 138, 'Name': 'Verification Stage + 5 Tools' },
          { 'Course_Id': 28, 'Id': 139, 'Name': 'Introduction to Knuckle joint' },
          { 'Course_Id': 28, 'Id': 140, 'Name': 'Design of knuckle joint' },
          { 'Course_Id': 29, 'Id': 141, 'Name': 'Introduction' },
          { 'Course_Id': 30, 'Id': 142, 'Name': 'デジタルトランスフォーメーション(DX)とサービスデザイン' }
        ]
      );
    })
};

