exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("Role")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("Role").insert([
        { Id: 0, Name: "Admin" },
        { Id: 1, Name: "Instructor" },
        { Id: 2, Name: "User" },
      ]);
    })
    .then(function () {
      return knex("Categories").insert([
        { Id: 0, Name: "Development", Parent_Id: null },
        { Id: 1, Name: "Design", Parent_Id: null },
        { Id: 2, Name: "Web Development", Parent_Id: 0 },
        { Id: 3, Name: "Mobile Development", Parent_Id: 0 },
        { Id: 4, Name: "Data Science", Parent_Id: 0 },
        { Id: 5, Name: "Web Design", Parent_Id: 1 },
        { Id: 6, Name: "Graphic design and Illustration", Parent_Id: 1 },
        { Id: 7, Name: "Design Thinking", Parent_Id: 1 },
      ]);
    })
    .then(function () {
      return knex("Languages").insert([
        { 'Id': 0, 'Name': 'English' },
        { 'Id': 1, 'Name': 'Indian' },
        { 'Id': 2, 'Name': 'France' },
        { 'Id': 3, 'Name': 'Vietnamese' },
        { 'Id': 4, 'Name': '日本語' }]);
    })
    .then(function () {
      return knex("Promotes").insert([
        { Id: 0, Promote: 0 },
      ]);
    })
    .then(function () {
      return knex("Users").insert([
        {
          'Id': 0,
          'Name': 'admin',
          'Email': 'admin@udemy.com',
          'Password': '$2b$08$6HfAWwJr9VT25cgeGnipR.ypaQW8/6.UOgHvOmgkvblyF47lWwkM6',
          'Role_Id': 0,
        },
        {
          'Email': 'jonas_schmedtmann@udemy.com',
          'Id': 1,
          'Name': 'Jonas Schmedtmann',
          'Password': '$2b$08$w3A71dG78nUq01mxYZl5IO8fugC812DnWg64/aHK6aWOkQrofviUu',
          'Role_Id': 1
        },
        {
          'Email': 'lawrence_turton@udemy.com',
          'Id': 2,
          'Name': 'Lawrence Turton',
          'Password': '$2b$08$grNnfPiRTISs5JUdafauwu03Zot3wiXpHdz/ctf/yeUzh5cR/4ebu',
          'Role_Id': 1
        },
        {
          'Email': 'dr._sahand_ghavidel@udemy.com',
          'Id': 3,
          'Name': 'Dr. Sahand Ghavidel',
          'Password': '$2b$08$zWUhag7f1MhqleToBI4puu91wCS0TcRrpxeSrRwHEtcBSZnEBBfMi',
          'Role_Id': 1
        },
        {
          'Email': 'brad_hussey@udemy.com',
          'Id': 4,
          'Name': 'Brad Hussey',
          'Password': '$2b$08$NWRxabERYouMSMI3ybwJnOuNGIE9o7Iycy81xTOxwnCx2pflMVdIi',
          'Role_Id': 1
        },
        {
          'Email': 'r-tutorials_training@udemy.com',
          'Id': 5,
          'Name': 'R-Tutorials Training',
          'Password': '$2b$08$rMwIRhnnn/GSvmwwDb/CDuurQCFCoizwaksFnCyQN084QoKXLkp6K',
          'Role_Id': 1
        },
        {
          'Email': 'rakesh_gopalakrishnan@udemy.com',
          'Id': 6,
          'Name': 'Rakesh Gopalakrishnan',
          'Password': '$2b$08$gDVyJ7lgKMDlcAGubX5k3uaJndeyQw1peDMJLxMXlwTL5tyziYUFm',
          'Role_Id': 1
        },
        {
          'Email': 'mike_west@udemy.com',
          'Id': 7,
          'Name': 'Mike West',
          'Password': '$2b$08$U2y7OmXtXeMNxNZyVhglVOfFJ4F8gHMm2PwkTVgbUt2XTkcj2620C',
          'Role_Id': 1
        },
        {
          'Email': 'charles_redmond@udemy.com',
          'Id': 8,
          'Name': 'Charles Redmond',
          'Password': '$2b$08$wwJqbzMN0VQAElhjwgbhku9JgNRTivCpeqmRwEqy9VQpVe2J2QPOu',
          'Role_Id': 1
        },
        {
          'Email': 'vinoth_rathinam@udemy.com',
          'Id': 9,
          'Name': 'Vinoth Rathinam',
          'Password': '$2b$08$uyc.5RTiDMP1i000vC3Id.o5vYyLv8hndRqwTQJuOe9Gx78/zMHhC',
          'Role_Id': 1
        },
        {
          'Email': 'grant_klimaytys@udemy.com',
          'Id': 10,
          'Name': 'Grant Klimaytys',
          'Password': '$2b$08$VMS.vSEBHfClXyNsFq7.te4G8u0mRvJX/WK85w2kw6VJKZTTb0VfW',
          'Role_Id': 1
        },
        {
          'Email': 'mayuresh_wankhede@udemy.com',
          'Id': 11,
          'Name': 'Mayuresh Wankhede',
          'Password': '$2b$08$bquQWsQ.gAvTa3jDGBdl7eCKnaqqGipZlQfFbI39jqcwOkSIbrdFe',
          'Role_Id': 1
        },
        {
          'Email': 'sisoft_learning@udemy.com',
          'Id': 12,
          'Name': 'Sisoft Learning',
          'Password': '$2b$08$lENRwOABsldGb9fgXcLHJe9Sq9lBAA2gyQ/LWmO1zT2KvxJjuwOgG',
          'Role_Id': 1
        },
        {
          'Email': 'the_app_dojo@udemy.com',
          'Id': 13,
          'Name': 'The App Dojo',
          'Password': '$2b$08$yMa4fzM0rdEspkwPBfE6KOWScThjim8eHTQ1c2Q2VbF9yTjcRnk9.',
          'Role_Id': 1
        },
        {
          'Email': 'martie_dread@udemy.com',
          'Id': 14,
          'Name': 'Martie Dread',
          'Password': '$2b$08$tQO.xZO9Ix19t0SYLXGWae4tv38f5kR7BR9F/QKQ6G19YV44z2Fza',
          'Role_Id': 1
        },
        {
          'Email': 'carl_heaton@udemy.com',
          'Id': 15,
          'Name': 'Carl Heaton',
          'Password': '$2b$08$aedtH5eX1gBTqKcxyyNTC.Ks1rLZUjZxcansiSMeDtb7Mtdlt2mrK',
          'Role_Id': 1
        },
        {
          'Email': 'christine_maisel@udemy.com',
          'Id': 16,
          'Name': 'Christine Maisel',
          'Password': '$2b$08$LrnkT4ebSgQa3MfCWF2hc.qDp2.YVEzZUYwr6YbZBkuZ9SlnK.hne',
          'Role_Id': 1
        },
        {
          'Email': 'adam_frisbee@udemy.com',
          'Id': 17,
          'Name': 'Adam Frisbee',
          'Password': '$2b$08$Y/g/GEODibRAXO.ZFXFFBOnluKfTaZgu/a9vzTZaASVN5fjEmEo.m',
          'Role_Id': 1
        },
        {
          'Email': 'rawson_uddin@udemy.com',
          'Id': 18,
          'Name': 'Rawson Uddin',
          'Password': '$2b$08$8gMQvStKN1QOUzPiNtpJz.tFcUEnIVub.muPffXPp4a67oAdGgkpG',
          'Role_Id': 1
        },
        {
          'Email': 'hardy_fowler@udemy.com',
          'Id': 19,
          'Name': 'Hardy Fowler',
          'Password': '$2b$08$.DnbuYJUyc78oHxQ9gZd1OZ3aq/zmPvncYaYetYwa5c4p2KZhq.Uy',
          'Role_Id': 1
        },
        {
          'Email': 'donelli_dimaria@udemy.com',
          'Id': 20,
          'Name': 'Donelli DiMaria',
          'Password': '$2b$08$eenCl4zYOxGdGSHW02t3.e62pGVunCnpiSI3aMie8cOvKs3O/ugi2',
          'Role_Id': 1
        },
        {
          'Email': 'andrew_boehm@udemy.com',
          'Id': 21,
          'Name': 'Andrew Boehm',
          'Password': '$2b$08$AclJUKrQp.dVJdHy1IZ04OmGhRvqREEwOfP2.T6Wdc12BPac6ZClm',
          'Role_Id': 1
        },
        {
          'Email': 'brian_dickinson@udemy.com',
          'Id': 22,
          'Name': 'Brian Dickinson',
          'Password': '$2b$08$vQEsxALqzIMRaFLtkiAAY.3WLAHLKA9Jd/cNYhhQtYOVHi94UsHq6',
          'Role_Id': 1
        },
        {
          'Email': 'bruna_ruschel_moreira@udemy.com',
          'Id': 23,
          'Name': 'Bruna Ruschel Moreira',
          'Password': '$2b$08$77g5Vb0GPjNCy9kbK1ktIORxdE0S/8vslQzab5u1YNwEJ9pneK1Za',
          'Role_Id': 1
        },
        {
          'Email': 'vilas_patil@udemy.com',
          'Id': 24,
          'Name': 'Vilas Patil',
          'Password': '$2b$08$9ApzLfb3J7YJqu2gMuZnKedu4z2sT4uILn7JfkZ0aViZHk5/qNGlC',
          'Role_Id': 1
        },
        {
          'Email': 'thomas_giordano@udemy.com',
          'Id': 25,
          'Name': 'Thomas Giordano',
          'Password': '$2b$08$S.gD0bH0NLakifaEK7ZB6eAF1gyyMIfkAbpD1e9biS1tpTEF2DHlK',
          'Role_Id': 1
        },
        {
          'Email': '一般社団法人情報サービス産業協会_（jisa）@udemy.com',
          'Id': 26,
          'Name': '一般社団法人情報サービス産業協会 （JISA）',
          'Password': '$2b$08$v36j5hjV/MHpqDgxajMuFuXL3bQClnOy1./uySvZK1vPdvviwTnpW',
          'Role_Id': 1
        }
      ]);
    })
    .then(function () {
      return knex("Courses").insert([{
        'Author_Id': 1,
        'Category_Id': 0,
        'Description': {
          'blocks': [{
            'data': {},
            'depth': 0,
            'entityRanges': [],
            'inlineStyleRanges': [],
            'key': '',
            'text': 'IMPORTANT NOTE: The material of this course is also covered in my other course about web design and development with HTML5 & CSS3. Scroll to the bottom of this page to check out that course, too! If you\'re already taking my other course, you already have all it takes to start designing beautiful websites today!\n"Best web design course on Udemy: If you\'re interested in web design, but want more than just a "how to use WordPress" course, I highly recommend this one." — Florian Giusti\n"Very helpful to us left-brained people: I am familiar with HTML, CSS, JQuery, and Twitter Bootstrap, but I needed instruction in web design. This course gave me practical, impactful techniques for making websites more beautiful and engaging." — Susan Darlene Cain\n"The most educational instructor ever!: Everything is good about this course, you learn a lot, the instructor are excellent and the production is flawless. Love this course, simple as that!" — Lovisa\nDid you know that beautiful websites convert better that ones that don\'t stand out at all? This means more sales, more signups, and ultimately more money for you. Do you want to learn how to do exactly that?\n\nIf you wonder how you can make your next website really good looking, then you\'ve come to the right place! \nIn this course, I will show you 25+ guidelines of amazing web design in less than 1 hour. No boring theory, no unnecessary stuff. You will learn dead simple web design rules and guidelines that go straight to the point — you can use them to improve your websites today!\nIn this course, we will use beautiful web design examples together with my 25+ guidelines of amazing web design to learn:\n• How to make text look professionally designed\n• How to correctly use the power of colors\n• How to get and use amazing images, fonts and icons to make your website shine — all for FREE.\n• How to create a layout using whitespace and visual hierarchy\n• How to keep yourself inspired to learn more and more about web design\n• How to make your websites convert better using 8 simple-to-use techniques\nBut there is even more: I provide you with tons of useful web design resources to get you started for your next web design project! You get immediate FREE access to the course e-book “Best Resources for Web Design and Development with HTML5 & CSS3". These are real-world resources used by real professionals in the web design industry!\nYou can use the rules and guidelines you\'ll learn in this course for everything you want: design your own Wordpress theme, personalize a Bootstrap website, start from scratch with HTML and CSS or mockup a website in Photoshop. The 25+ guidelines of amazing web design are universal and ready-to-use for any project.\nThis course is perfect for experienced web developers who want to learn how to make their websites look beautiful and professionally designed.\nSo start designing websites that convert today! The thing is: you will have a hard time to find a compilation of guidelines like the one I show you in this course anywhere else. But see for yourself and click the “Take this course" button right now.',
            'type': 'unstyled'
          }],
          'entityMap': {}
        },
        'Id': 0,
        'Is_Completed': true,
        'Language_Id': 0,
        'Price': 0,
        'Promote_Id': 0,
        'Rating': 0,
        'Sub_Description': 'Learn web design in 1 hour with 25+ simple-to-use rules and guidelines — tons of amazing web design resources included!',
        'Thumbnail_Large': '"https://img-c.udemycdn.com/course/750x422/473160_d929_3.jpg"',
        'Thumbnail_Medium': '"https://img-c.udemycdn.com/course/480x270/473160_d929_3.jpg"}',
        'Thumbnail_Small': '"https://img-c.udemycdn.com/course/240x135/473160_d929_3.jpg"',
        'Title': 'Web Design for Web Developers: Build Beautiful Websites!'
      },
      {
        'Author_Id': 2,
        'Category_Id': 2,
        'Description': {
          'blocks': [{
            'data': {},
            'depth': 0,
            'entityRanges': [],
            'inlineStyleRanges': [],
            'key': '',
            'text': "Learn the Javascript essentials for web development or any type of programming. Learn all the basics of Javascript including primitive types, arrays, functions, assignment operators, the window object and much more. Also I'll provide clear explanations of objects, constructors and arrays in a clear way for anyone to understand. We'll also dive into some more detail about how Javascript works and even advanced topics like prototype inheritance, scope, execution context and much more. So why should you learn Javascript? Well it's everywhere and is getting even bigger in 2016. It's available to mobile apps, desktop apps, server side nodeJS technology and as always in every single browser around the world. There has never been a better time to learn the basics of Javascript!",
            'type': 'unstyled'
          }],
          'entityMap': {}
        },
        'Id': 1,
        'Is_Completed': true,
        'Language_Id': 0,
        'Price': 0,
        'Promote_Id': 0,
        'Rating': 0,
        'Sub_Description': "Learn how Javascript works, some basic API's and finally create a mini project.",
        'Thumbnail_Large': '"https://img-c.udemycdn.com/course/750x422/707962_71f5_4.jpg"',
        'Thumbnail_Medium': '"https://img-c.udemycdn.com/course/480x270/707962_71f5_4.jpg"}',
        'Thumbnail_Small': '"https://img-c.udemycdn.com/course/240x135/707962_71f5_4.jpg"',
        'Title': 'Javascript Essentials'
      },
      {
        'Author_Id': 3,
        'Category_Id': 0,
        'Description': {
          'blocks': [{
            'data': {},
            'depth': 0,
            'entityRanges': [],
            'inlineStyleRanges': [],
            'key': '',
            'text': "Welcome to the course in which you will learn how to create Q&A and Tab sections in your website using HTML, CSS, and JavaScript.This JavaScript course is designed to assist you in becoming more familiar with responsive designs.At end of this course, your will learn how to create responsive Q&A and Tab sections using HTML, CSS, and JavaScript that allow users to toggle between the questions and tabs by clicking on the icons.The CSS section will be covered after you finish with the HTML section, and you will learn how to use font awesome to add minus and plus icons, among other things.Simple HTML, CSS, and JavaScript projects like these ones will teach you many web development skills such as how to add Font Awesome icons, design a responsive and attractive Q&A section, and use some essential JavaScript methods such as the addeventlistener and toggle methods.It is acceptable to not have prior knowledge of HTML, CSS, and JavaScript before beginning. This web development course provides an overview of the fundamentals of HTML, CSS, and JavaScript. This is a brief course that will teach you about HTML, CSS, and JavaScript while having you create simple but functional Q&A and Tab sections for your website.If you are as enthusiastic as I am about learning how to create responsive and visually appealing Q&A and Tab sections, as well as the fundamentals of HTML, CSS, and JavaScript, then let's get started right away.",
            'type': 'unstyled'
          }],
          'entityMap': {}
        },
        'Id': 2,
        'Is_Completed': true,
        'Language_Id': 0,
        'Price': 0,
        'Promote_Id': 0,
        'Rating': 0,
        'Sub_Description': 'Create a responsive Q&A and Tab sections for your website by utilizing only HTML, CSS, and JavaScript (JS)',
        'Thumbnail_Large': '"https://img-c.udemycdn.com/course/750x422/4038786_c662.jpg"',
        'Thumbnail_Medium': '"https://img-c.udemycdn.com/course/480x270/4038786_c662.jpg"',
        'Thumbnail_Small': '"https://img-c.udemycdn.com/course/240x135/4038786_c662.jpg"}',
        'Title': 'Q&A and Tab sections using HTML, CSS and JavaScript (JS)'
      },
      {
        'Author_Id': 3,
        'Category_Id': 0,
        'Description': {
          'blocks': [{
            'data': {},
            'depth': 0,
            'entityRanges': [],
            'inlineStyleRanges': [],
            'key': '',
            'text': "In this course, you will create a background video project and a counter project to learn the fundamentals of HTML, CSS, and JavaScript (JS), as well as to practice your skills in these areas. I am Sahand and I work as a web developer in the programming industry. I have more than 15 years of experience in the field of programming. In order to share my knowledge and experience with you, I created this introductory course for you. This course is intended to assist you in becoming familiar with the fundamentals of HTML, CSS, and JavaScript. It is divided into three sections.The course will teach you how to write the fundamental HTML, CSS, and JavaScript codes, as well as how to construct a simple but functional website with a video playing in the background. To get started, we'll go over how to install Visual Studio Code and its essential extensions in a straightforward and straightforward manner. After that, we'll write the HTML code for the website. You'll learn how to create a simple Bootstrap button, among other things, once you've finished with the fundamental HTML. After that, you'll move on to the CSS. The skills you will gain from this project include how to use Bootstraps and Font Awesome, how to add and locate a free preloader, how to find free background videos for your project, and all of the essential JavaScript methods, such as add and remove classes, that are used by the vast majority of websites today. Even if you have no prior experience with HTML, CSS, or JavaScript, it is perfectly acceptable to start from scratch with no prior knowledge. A brief overview of HTML, CSS, and JavaScript fundamentals is provided as part of the course's overall structure. A brief introduction to HTML, CSS, and JavaScript will be provided, and the development of a simple but functional website will follow as part of the course.Then let's get started. If you are as excited as I am about learning the fundamentals of HTML, CSS, and JavaScript in order to build an amazing website, then let's get started.",
            'type': 'unstyled'
          }],
          'entityMap': {}
        },
        'Id': 3,
        'Is_Completed': true,
        'Language_Id': 0,
        'Price': 0,
        'Promote_Id': 0,
        'Rating': 0,
        'Sub_Description': 'Build 2 websites (Counter & background video webs) using HTML, CSS, and JavaScript and learn bootstrap and Font Awesome.',
        'Thumbnail_Large': '"https://img-c.udemycdn.com/course/750x422/4020696_7018.jpg"',
        'Thumbnail_Medium': '"https://img-c.udemycdn.com/course/480x270/4020696_7018.jpg"',
        'Thumbnail_Small': '"https://img-c.udemycdn.com/course/240x135/4020696_7018.jpg"}',
        'Title': 'Learn HTML, CSS, and JavaScript through 2 simple projects.'
      },
      {
        'Author_Id': 4,
        'Category_Id': 2,
        'Description': {
          'blocks': [{
            'data': {},
            'depth': 0,
            'entityRanges': [],
            'inlineStyleRanges': [],
            'key': '',
            'text': 'Learn How to Code Dynamic Websites with PHP 5+ for absolute beginners!\xa0 This course is a total beginners guide to coding dynamic websites with PHP so you need no prior knowledge or experience with PHP — although, it is a good idea if you know some HTML & CSS. (My beginner\'s guide Build a Website from Scratch with HTML & CSS will teach you everything you need to know about HTML & CSS.)\xa0 Practical Hands-on Approach\xa0 My approach with this course, like many of my courses, is to take a practical "hands on" approach. While there will be some theory involved — every single lesson requires you to get your hands dirty and exercise what you\'ve learned in that specific lesson. I find this to be the best approach, because you\'re able to retain much more of what you learned, and therefore, get up and running with maximizing your practical knowledge of PHP quickly!\xa0 Why Should I Learn PHP?\xa0 So — why learn PHP? Well, PHP is a very powerful scripting language used by millions of websites. Some of the most popular websites and frameworks utilize PHP to build their dynamic websites. PHP works very well with HTML, and therefore will allow you to start coding dynamic websites quickly without having to learn some of the more complicated scripting languages out there.\xa0 You Will Love This Course\xa0 I think you\'re going to love this course, and you\'re going to especially love what you\'re going to learn. When I first started learning PHP, I couldn\'t wait to start implementing what I learned into my websites! I think you\'ll feel the same.\xa0 It\'s Totally Free!\xa0 Also, I am excited to be offering this course absolutely free for three reasons:\xa0 I don\'t want a purchasing decision to get in the way of you learning what I have to offer in this course.I want as many people as possible to be able access the content.I want to give you learning material so good that it should cost money.The Final Project\xa0 Throughout the course you will be building a handful of dynamic PHP examples, but in the last section of the course, we will build a dynamic website for a (fictional) restaurant.\xa0 So, I invite you to join me in learning how to Code Dynamic Websites with PHP!\xa0 Let\'s do this.',
            'type': 'unstyled'
          }],
          'entityMap': {}
        },
        'Id': 4,
        'Is_Completed': true,
        'Language_Id': 0,
        'Price': 0,
        'Promote_Id': 0,
        'Rating': 0,
        'Sub_Description': 'Code Your Very Own Dynamic Websites by Learning PHP Through Real-World Application & Examples',
        'Thumbnail_Large': '"https://img-c.udemycdn.com/course/750x422/130064_22b3_11.jpg"',
        'Thumbnail_Medium': '"https://img-c.udemycdn.com/course/480x270/130064_22b3_11.jpg"}',
        'Thumbnail_Small': '"https://img-c.udemycdn.com/course/240x135/130064_22b3_11.jpg"',
        'Title': 'Practical PHP: Master the Basics and Code Dynamic Websites'
      },
      {
        'Author_Id': 5,
        'Category_Id': 0,
        'Description': {
          'blocks': [{
            'data': {},
            'depth': 0,
            'entityRanges': [],
            'inlineStyleRanges': [],
            'key': '',
            'text': 'Are you interested in data science?\nDo you want to learn R totally from scratch?\nAre you looking for an easy step by step approach to get into R?\n\nDo you want to take an easy R course for BEGINNERS?Well, if your answer is YES to some of these questions, look no further, this course will help you.\n\nI created this course for the total beginner. That means for you: No prior knowledge required! If this is your first computer programming language to use - congratulations, you found your entry level material. If you are new to data science, no problem, you will learn anything you need to to start out with R.\n\nThat also means for you: if you are already used to R, you will likely benefit more from an advanced course. I have more than ten intermediate and advanced R courses available on Udemy, which might be more suited towards your needs. Check out the r-tutorials instructor profile for more info.\n\nLet’s take a look at the content and how the course is structured:\n\nWe will start with installation, the R and RStudio interface, add on packages, how to use the R exercise database and the R help tools.\n\nThen we will learn various ways to import data, first coding steps including basic R functions, functions and loops and we will also take a look at the graphical tools.\n\nThe whole course should take approx. 3 to 5 hours, and there are exercises available for you to try out R. You will also get the code I am using for the demos.\n\nAnything is ready for you to enter the world of statistical programming.What R you waiting for?\n\nMartin',
            'type': 'unstyled'
          }],
          'entityMap': {}
        },
        'Id': 5,
        'Is_Completed': true,
        'Language_Id': 0,
        'Price': 0,
        'Promote_Id': 0,
        'Rating': 0,
        'Sub_Description': 'Learn the essentials of R Programming - R Beginner Level!',
        'Thumbnail_Large': '"https://img-c.udemycdn.com/course/750x422/236676_881e_4.jpg"',
        'Thumbnail_Medium': '"https://img-c.udemycdn.com/course/480x270/236676_881e_4.jpg"}',
        'Thumbnail_Small': '"https://img-c.udemycdn.com/course/240x135/236676_881e_4.jpg"',
        'Title': 'R Basics - R Programming Language Introduction'
      },
      {
        'Author_Id': 6,
        'Category_Id': 0,
        'Description': {
          'blocks': [{
            'data': {},
            'depth': 0,
            'entityRanges': [],
            'inlineStyleRanges': [],
            'key': '',
            'text': "Are you completely new to Data science?\nHave you been hearing these buzz words like Machine learning, Data Science, Data Scientist, Text analytics, Statistics and don't know what this is?\nDo you want to start or switch career to Data Science and analytics?\nIf yes, then I have a new course for you. In this course, I cover the absolute basics of Data Science and Machine learning. This course will not cover in-depth algorithms. I\xa0have split this course into 3 Modules. This module, takes a 500,000ft. view of what Data science is and how is it used. We will go through commonly used terms and write some code in Python.\xa0I spend some time walking you through different career areas in the Business Intelligence Stack, where does Data Science fit in, What is Data Science and what are the tools you will need to get started. I will be using Python and Scikit-Learn Package in this course. I am not assuming any prior knowledge in this area. I have given some reading materials, which will help you solidify the concepts that are discussed in this lectures.\nThis course will the first data science course in a series of courses. Consider this course as a 101 level course, where I don't go too much deep into any particular statistical area, but rather just cover enough to raise your curiosity in the field of Data Science and Analytics.The other modules will cover more complex concepts.",
            'type': 'unstyled'
          }],
          'entityMap': {}
        },
        'Id': 6,
        'Is_Completed': true,
        'Language_Id': 0,
        'Price': 0,
        'Promote_Id': 0,
        'Rating': 0,
        'Sub_Description': 'Learn Data science / Machine Learning using Python (Scikit Learn)',
        'Thumbnail_Large': '"https://img-c.udemycdn.com/course/750x422/1555134_031f_3.jpg"',
        'Thumbnail_Medium': '"https://img-c.udemycdn.com/course/480x270/1555134_031f_3.jpg"',
        'Thumbnail_Small': '"https://img-c.udemycdn.com/course/240x135/1555134_031f_3.jpg"}',
        'Title': 'Introduction to Data Science using Python (Module 1/3)'
      },
      {
        'Author_Id': 7,
        'Category_Id': 0,
        'Description': {
          'blocks': [{
            'data': {},
            'depth': 0,
            'entityRanges': [],
            'inlineStyleRanges': [],
            'key': '',
            'text': 'Recent\xa0Review from Similar Course:\n"This was one of the most useful classes I have taken in a long time. Very specific, real-world examples. It covered several instances of \'what is happening\', \'what it means\' and \'how you fix it\'. I was impressed." \xa0Steve\n\nWelcome to The Top 5 Machine Learning Libraries in Python.\xa0 This is an introductory course on the process of building supervised machine learning models and then using libraries\xa0in a computer programming language called Python.\n\nWhat’s the top career in the world? Doctor? Lawyer? Teacher? Nope. None of those.\n\nThe top career in the world is the data scientist. Great. What’s a data scientist?\n\nThe area of study which involves extracting knowledge from data is called Data Science and people practicing in this field are called as Data Scientists.\n\nBusiness generate a huge amount of data. \xa0The data has tremendous value but there so much of it where do you begin to look for value that is actionable? That’s where the data scientist comes in.\xa0 The job of the data scientist is to create predictive models that can find hidden patterns in data that will give the business a competitive advantage in their space.\n\nDon’t I need a PhD? \xa0Nope. Some data scientists do have PhDs but it’s not a requirement.\xa0 A similar career to that of the data scientist is the machine learning engineer.\n\nA machine learning engineer is a person who builds predictive models, scores them and then puts them into production so that others in the company can consume or use their model. \xa0They are usually skilled programmers that have a solid background in data mining or other data related professions and they have learned predictive modeling.\n\nIn the course we are going to take a look at what machine learning engineers do. We are going to learn about the process of building supervised predictive models and build several using the most widely used programming language for machine learning. Python. There are literally hundreds of libraries we can import into Python that are machine learning related.\n\nA library is simply a group of code that lives outside the core language. We “import it” into our work space when we need to use its functionality. We can mix and match these libraries like Lego blocks.\n\nThanks for your interest in the The Top 5 Machine Learning Libraries in Python and we will see you in the course.',
            'type': 'unstyled'
          }],
          'entityMap': {}
        },
        'Id': 7,
        'Is_Completed': true,
        'Language_Id': 0,
        'Price': 0,
        'Promote_Id': 0,
        'Rating': 0,
        'Sub_Description': 'A Gentle Introduction to the Top Python Libraries used in Applied Machine Learning',
        'Thumbnail_Large': '"https://img-c.udemycdn.com/course/750x422/1198574_369c_3.jpg"',
        'Thumbnail_Medium': '"https://img-c.udemycdn.com/course/480x270/1198574_369c_3.jpg"}',
        'Thumbnail_Small': '"https://img-c.udemycdn.com/course/240x135/1198574_369c_3.jpg"',
        'Title': 'The Top 5 Machine Learning Libraries in Python'
      },
      {
        'Author_Id': 8,
        'Category_Id': 0,
        'Description': {
          'blocks': [{
            'data': {},
            'depth': 0,
            'entityRanges': [],
            'inlineStyleRanges': [],
            'key': '',
            'text': 'Data science skills are in much demand today, but it is not just the mathematicians, statisticians, and the computer scientists who can benefit from acquiring them. Data science skills are for everyone!In this course, I help you to begin using R, one of the most important tools in data science, and the excellent graphics package for R, ggplot2. Along the way, I also show you the basics of simple linear regression. There are no prerequisites. We begin with installation of R and RStudio, and I introduce R and ggplot skills as they are needed as we progress toward an understanding of linear regression. Students should be able to complete the course within two weeks, working at an easy pace.Linear regression is a machine learning technique. I hope to create more courses like this one in the future, teaching machine learning, R, ggplot, dplyr, and programming, all at the same time.',
            'type': 'unstyled'
          }],
          'entityMap': {}
        },
        'Id': 8,
        'Is_Completed': true,
        'Language_Id': 0,
        'Price': 0,
        'Promote_Id': 0,
        'Rating': 0,
        'Sub_Description': 'Begin to use R and ggplot while learning the basics of linear regression',
        'Thumbnail_Large': '"https://img-c.udemycdn.com/course/750x422/487490_5f70_2.jpg"',
        'Thumbnail_Medium': '"https://img-c.udemycdn.com/course/480x270/487490_5f70_2.jpg"',
        'Thumbnail_Small': '"https://img-c.udemycdn.com/course/240x135/487490_5f70_2.jpg"}}',
        'Title': 'R, ggplot, and Simple Linear Regression'
      },
      {
        'Author_Id': 9,
        'Category_Id': 0,
        'Description': {
          'blocks': [{
            'data': {},
            'depth': 0,
            'entityRanges': [],
            'inlineStyleRanges': [],
            'key': '',
            'text': 'NON TECHNICAL COURSE specifically created for AI/ML/DL Aspirants, gives insight about Road map to A.IThis course will clear all doubts such as, 1. What are prerequisites for learning AI? 2. What is Road map to start Machine learning project(ML)3. How to choose the best programming language for AI ?4. How much Mathematical knowledge needed for AI ?5. Which is the best AI Engine/Tool/Framework for AI ? and so on... Each video is created with real time scenario examples in simple language. So that anyone without programming knowledge can understand in depth about Artificial Intelligence and Machine Learning.  The contents were prepared based on maximum queries searched in google or posted in AI forum. At the end of this course you will get clear clarity on how much effort needed to start your career in Artificial Intelligence or Machine Learning Projects.Note: 1. Students/Experienced professionals, who expects sample coding can skip this course :)\xa0But soon case study with coding course will be launched :)\xa02. For Non-English speaking students, I enabled the Auto Caption now. But still the text won’t 100% correct. So I will be updating the captions manually as soon as possible. 3. All AI prerequisites topics like programming language , Mathematics , Machine Learning Algorithms will be posted soon as free course. Keep following.\xa0 Happy Learning !!',
            'type': 'unstyled'
          }],
          'entityMap': {}
        },
        'Id': 9,
        'Is_Completed': true,
        'Language_Id': 0,
        'Price': 0,
        'Promote_Id': 0,
        'Rating': 0,
        'Sub_Description': 'NON TECHNICAL COURSE specifically created for AI/ML/DL Aspirants, gives insight about Road map to A.I',
        'Thumbnail_Large': '"https://img-c.udemycdn.com/course/750x422/2155538_297b.jpg"',
        'Thumbnail_Medium': '"https://img-c.udemycdn.com/course/480x270/2155538_297b.jpg"',
        'Thumbnail_Small': '"https://img-c.udemycdn.com/course/240x135/2155538_297b.jpg"}',
        'Title': 'Welcome to Artificial Intelligence !'
      },
      {
        'Author_Id': 10,
        'Category_Id': 0,
        'Description': {
          'blocks': [{
            'data': {},
            'depth': 0,
            'entityRanges': [],
            'inlineStyleRanges': [],
            'key': '',
            'text': "Tired of seeing endless 'How to code 50 Android apps in 10 days' courses?Ever just wanted to get stuck in to Android app development right away?Well, that's why I created this Android development course! No other course takes you from beginner (with no experience) to a full Android app in less time than it takes to make a sandwich! I will show you how to:Install Android Studio (and required extras)Setup the graphical look of your appConnect layout elements like buttons and Text Fields to your java code Code in Java within an Android activityStore items in Android Shared Preferences, making them accessible across app restartsThis course is for you if you:Are a beginner or novice to Android App developmentWant to understand Android apps in a short period of timeLove proceeding at an awesomely brisk pace!This course is not for you if:You are an expert or intermediate programmerWhat software do you need?Android Studio (free) which runs on PC / Mac / LinuxDo you need experience?No. I assume you are a complete beginner to apps and development in generalWhat makes this course different?It's just so quick! Take i right now and you'll learn Android apps before you can even blink! Everyone used to tell me apps were hard to make - but they're wrong. It's probably because they had bad teachers - join me and I'll show you what good teaching is!------------------------------------------------PLEASE NOTE: This course is designed to get you up and running with Android and Android Studio in record time. Therefore we have limited time to actually explain everything. My other course on Android app development explains everything we do in much more detail.",
            'type': 'unstyled'
          }],
          'entityMap': {}
        },
        'Id': 10,
        'Is_Completed': true,
        'Language_Id': 0,
        'Price': 0,
        'Promote_Id': 0,
        'Rating': 0,
        'Sub_Description': 'Android app in Android studio. Learn Android app development now!',
        'Thumbnail_Large': '"https://img-c.udemycdn.com/course/750x422/695836_2fba.jpg"',
        'Thumbnail_Medium': '"https://img-c.udemycdn.com/course/480x270/695836_2fba.jpg"}}',
        'Thumbnail_Small': '"https://img-c.udemycdn.com/course/240x135/695836_2fba.jpg"',
        'Title': 'Mobile App Development in 27 Minutes: Android'
      },
      {
        'Author_Id': 11,
        'Category_Id': 0,
        'Description': {
          'blocks': [{
            'data': {},
            'depth': 0,
            'entityRanges': [],
            'inlineStyleRanges': [],
            'key': '',
            'text': 'Hello everyone, Welcome to the beginners course of flutter, This course will teach you how to create\xa0 Flutter application in a very practical & simple manner, as every lecture comes with full coding screencast & corresponding code in notebook\xa0.\nThis course will be updates frequently as flutter and dart are in their early stages of development.\nSo what are you waiting for?',
            'type': 'unstyled'
          }],
          'entityMap': {}
        },
        'Id': 11,
        'Is_Completed': true,
        'Language_Id': 0,
        'Price': 0,
        'Promote_Id': 0,
        'Rating': 0,
        'Sub_Description': 'Build Android and iOS apps with a flutter framework',
        'Thumbnail_Large': '"https://img-c.udemycdn.com/course/750x422/1644780_cd06_3.jpg"}',
        'Thumbnail_Medium': '"https://img-c.udemycdn.com/course/480x270/1644780_cd06_3.jpg"',
        'Thumbnail_Small': '"https://img-c.udemycdn.com/course/240x135/1644780_cd06_3.jpg"}',
        'Title': 'Learn Flutter - Beginners Course'
      },
      {
        'Author_Id': 12,
        'Category_Id': 0,
        'Description': {
          'blocks': [{
            'data': {},
            'depth': 0,
            'entityRanges': [],
            'inlineStyleRanges': [],
            'key': '',
            'text': "Android Programming lets you create stuff that's meaningful\xa0. And that's what we focus on !\xa0\nAny programming language is just another language unless you learn it the right way. A programmer can not benefit from its features if she/he does not appreciate a Programming Language's core concepts.\nBeing an open source platform, it is very important to learn how to solve the problems taking help from other Android Developers. During the course , we guide students how to be not just a programmer but be an active participant in the Android Open Source Community !",
            'type': 'unstyled'
          }],
          'entityMap': {}
        },
        'Id': 12,
        'Is_Completed': true,
        'Language_Id': 0,
        'Price': 0,
        'Promote_Id': 0,
        'Rating': 0,
        'Sub_Description': 'We start learning Android Programming by understanding concepts and implementing them live!',
        'Thumbnail_Large': '"https://img-c.udemycdn.com/course/750x422/1000888_e8cb_3.jpg"',
        'Thumbnail_Medium': '"https://img-c.udemycdn.com/course/480x270/1000888_e8cb_3.jpg"',
        'Thumbnail_Small': '"https://img-c.udemycdn.com/course/240x135/1000888_e8cb_3.jpg"}',
        'Title': 'Android Development from Scratch to Create Cool Apps!'
      },
      {
        'Author_Id': 10,
        'Category_Id': 0,
        'Description': {
          'blocks': [{
            'data': {},
            'depth': 0,
            'entityRanges': [],
            'inlineStyleRanges': [],
            'key': '',
            'text': 'The Complete iOS\xa010 Developer has just\xa0ONE goal - to turn you\xa0into the best developer,\xa0freelancer and\xa0entrepreneur that\xa0you can possibly\xa0be!\xa0\nOther iOS\xa0courses COMPLETELY\xa0miss why you\'re learning to become a developer. How do I know this? Well I\'ve taken their courses\xa0because I\xa0wanted to\xa0see what the competition is up to!\nAnd what do these other guys miss?\nWell they haven\'t thought about you\xa0and what your needs are!\xa0Let me tell you why I think you\'re here.\xa0I\xa0think it\'s because\xa0maybe\xa0you are looking for a way to improve yourself - either via high paying jobs, freelancing or by creating your very own successful startup.\nI\xa0get that.\nSo whilst this course gives you all the developer skills you could ever want - it also\xa0has more. A complete section on how\xa0you\xa0create a startup. Right from\xa0idea all the way through to raising millions in venture capital\xa0funding.\n--------------------------------------------------------\nWhich one are you?\n- Six figure salaried developer?\n- Someone who likes earning between $60 - $120 p/h as a freelancer?\n- Someone who wants to free themselves from the 9 - 5 jive\xa0and create a successful\xa0startup?\xa0\n--------------------------------------------------------\nHere\'s a recent message I received from one of my students:\n"\xa0Hi Grant, I\xa0managed to land the fabled 6 figure developer job yesterday\xa0thanks to your course. In the interview they asked me\xa0complicated questions and luckily you\'d explained the majority of those. Thanks for a great course and I\'m off to buy the\xa0rest of your courses now that I have a little extra change :)\xa0"\n--------------------------------------------------------\nBonus For You\nMany courses offer a few extras here and there. That\'s nice but they don\'t have any real value. By real value I\xa0mean, can it earn you passive\xa0revenue day after day, week after week or month after month?\nThis course contains an app that no other course contains. One that I\'m releasing in time for iOS 10 and one\xa0that I\xa0foresee as having HUGE potential. The source code is contained in this course. In fact I\xa0invite you to compete against me with the\xa0release. If your app has more users than mine I\xa0will refund you the price of this course :)\n------------------------------------------------------\nWho Am I?\nEveryone wants to know who\'s teaching them. Well, here\'s my bio:\nI started out as NOT\xa0A\xa0PROGRAMMER.\xa0Hard to believe when I tell you that I\'ve worked on dozens of the most popular\xa0apps out there right?\nThe fact that I didn\'t start out as a programmer means that\xa0I actually remember what it\'s like to be a beginner. I\xa0remember teachers throwing useless jargon at me and you know what?\xa0\nIt sucked!\nThat\'s why in this course I\xa0tell you everything you need to know in plain English!\nCreating useful appsMaking GPS mapsMaking ticking clock\xa0appsTranscription appsCalculator appsConverter appsRESTful and JSON appsFirebase appsInstagram clones (but better ;)Fancy animations to WOW\xa0usersCreating compelling appsHow to start your own startup from idea to financing to selling\nAnd a ton more!\nIn Silicon valley venture capitalists talk about return on investment a lot. A good return averaged over all their assets is something like 10%.\xa0\nImagine if you could have a return in the thousands of percent?\nWell that\'s what you get when you take this course. An investment of a few coffees returns your investment multiple times over.\nYou are your biggest asset. Invest in it accordingly and take this course today!',
            'type': 'unstyled'
          }],
          'entityMap': {}
        },
        'Id': 13,
        'Is_Completed': true,
        'Language_Id': 0,
        'Price': 0,
        'Promote_Id': 0,
        'Rating': 0,
        'Sub_Description': 'Learn iOS and Swift to become an app entrepreneur. Includes FREE AWS service, Swift tvOS and Sketch training.',
        'Thumbnail_Large': '"https://img-c.udemycdn.com/course/750x422/877482_cfa8_2.jpg"',
        'Thumbnail_Medium': '"https://img-c.udemycdn.com/course/480x270/877482_cfa8_2.jpg"',
        'Thumbnail_Small': '"https://img-c.udemycdn.com/course/240x135/877482_cfa8_2.jpg"}',
        'Title': 'The Complete Swift iOS Developer - Create Real Apps in Swift'
      },
      {
        'Author_Id': 13,
        'Category_Id': 0,
        'Description': {
          'blocks': [{
            'data': {},
            'depth': 0,
            'entityRanges': [],
            'inlineStyleRanges': [],
            'key': '',
            'text': "I'll teach you how to make iPhone apps with this complete iOS development tutorial. You'll learn how to create apps using the same tools and techniques used to make the top apps in The App Store.  No coding experience? No problem. We'll create our first app in Lesson 2 without writing a single line of code. Then in Lesson 3 of this iOS app development tutorial, we'll learn how to write code in Apple's Objective-C programming language.  Once we've gotten the hang of programming, we'll create three more apps as we explore Apple's iOS software development kit. I'll walk you through every detail of developing the apps from project creation, through every line of code, and on to testing the app.  Finally, in the last lesson I'll let you watch over my shoulder as I submit an app to The App Store.  Take the course now, learn iOS development now and have your first fully functional iPhone app before the end of the day.",
            'type': 'unstyled'
          }],
          'entityMap': {}
        },
        'Id': 14,
        'Is_Completed': true,
        'Language_Id': 0,
        'Price': 0,
        'Promote_Id': 0,
        'Rating': 0,
        'Sub_Description': 'Learn every step in iOS App Development with iOS app development tutorial, from creating to submitting to app store.',
        'Thumbnail_Large': '"https://img-c.udemycdn.com/course/750x422/20366_6760_9.jpg"',
        'Thumbnail_Medium': '"https://img-c.udemycdn.com/course/480x270/20366_6760_9.jpg"',
        'Thumbnail_Small': '"https://img-c.udemycdn.com/course/240x135/20366_6760_9.jpg"}}',
        'Title': 'This Is How You Make iPhone Apps - iOS Development Course'
      },
      {
        'Author_Id': 14,
        'Category_Id': 5,
        'Description': {
          'blocks': [{
            'data': {},
            'depth': 0,
            'entityRanges': [],
            'inlineStyleRanges': [],
            'key': '',
            'text': 'Learn How To Create A Website Using WordPress...A Step by Step Tutorial for Beginners!*** NOW UPDATED FOR 2019 ***Why Take This Course?Learn To Create A WordPress Website in Less Than 1 HourThe Website Will Be Fully Responsive (Mobile Friendly)I Will Share A Coupon Which Gets Your First Month Hosting For 1 Penny!Learn To Create A Logo For Free!Using Most Up To Date Version of WordPress (unlike some others here on Udemy)Get A Certificate of Completion (This is from Udemy)All Lectures Are DownloadableI have got 6+ Years experience of working with WordPressI own 2 different websites which combined have taught thousands of people how to create websites with WordPressThis course is 100% FREE to enroll and always will be!I always respond to my students questions!There are a total of 10 Lectures (plus an intro and an outro) over a total of 55 Minutes. This seems like very little time, but believe me when I say that its MORE than enough time to create a website using WordPress!!Don\'t worry if all you have you used your computer for so far is sending and receiving emails... by following this course I can almost guarantee that you will be able to create a website using WordPress... and another thing... It will be awesome!Not only will you learn to create a website, step by step but I have also included a link to another video of mine which will show you how to make a logo for free!So go ahead and enroll today and let\'s make a WordPress Website... TOGETHER!Martie"',
            'type': 'unstyled'
          }],
          'entityMap': {}
        },
        'Id': 15,
        'Is_Completed': true,
        'Language_Id': 0,
        'Price': 0,
        'Promote_Id': 0,
        'Rating': 0,
        'Sub_Description': 'A Step by Step Instructional Guide on How To Create A Fully Functional Website Using WordPress in Around 1 Hour!',
        'Thumbnail_Large': '"https://img-c.udemycdn.com/course/750x422/648102_bbdd_2.jpg"',
        'Thumbnail_Medium': '"https://img-c.udemycdn.com/course/480x270/648102_bbdd_2.jpg"}',
        'Thumbnail_Small': '"https://img-c.udemycdn.com/course/240x135/648102_bbdd_2.jpg"',
        'Title': 'How To Create A Website using WordPress (Step by Step)'
      },
      {
        'Author_Id': 4,
        'Category_Id': 1,
        'Description': {
          'blocks': [{
            'data': {},
            'depth': 0,
            'entityRanges': [],
            'inlineStyleRanges': [],
            'key': '',
            'text': "Do you want to know how to get your website live on the web with your own domain name and hosting? You've come to the right place!Buying a domain name, hosting package and getting your website live can be an incredibly intimidating and confusing process if you're unfamiliar with the territory, but let me tell you a secret: It's surprisingly easy! And I'm going to show you exactly how to do all of these things in no time by guiding you in a simple, step-by-step process.In less than 1-hour, you will no longer be uncomfortable with the process of purchasing a Domain Name & Hosting Package, or Uploading your Website Live to the Web via FTP.Don't have a Website or Blog yet? No problem! I will also be showing you how to set up a Wordpress Website (and write your first blog post) in less than 5 minutes.So, what do you say? Want me to teach you how to get your website live on your own domain? Sign up for free today!",
            'type': 'unstyled'
          }],
          'entityMap': {}
        },
        'Id': 16,
        'Is_Completed': true,
        'Language_Id': 0,
        'Price': 0,
        'Promote_Id': 0,
        'Rating': 0,
        'Sub_Description': 'Learn how to publish your own website live on the web in no time with this web hosting crash course.',
        'Thumbnail_Large': '"https://img-c.udemycdn.com/course/750x422/40017_84f0_5.jpg"',
        'Thumbnail_Medium': '"https://img-c.udemycdn.com/course/480x270/40017_84f0_5.jpg"',
        'Thumbnail_Small': '"https://img-c.udemycdn.com/course/240x135/40017_84f0_5.jpg"}',
        'Title': 'Web Hosting 101: Get Your Website Live on the Web in No Time'
      },
      {
        'Author_Id': 15,
        'Category_Id': 1,
        'Description': {
          'blocks': [{
            'data': {},
            'depth': 0,
            'entityRanges': [],
            'inlineStyleRanges': [],
            'key': '',
            'text': 'Do you Want to Learn Photoshop in a Fun Way Taught by a Friendly Education Expert?After the huge success of the first version we had to do another to help more people like you create designs for the web. This course is IDEAL for total beginners who want to know why behind each of the tools, why behind the methods and why even use Photoshop for web design in the first place. The course is very well explained, gives you lots of nice files to practice with and you will be able to create a web page design at the end of it!Course DescriptionThis course is designed to teach you the basics of Photoshop, even if you have little to no experience with it, to create profitable web designs that help you stand out from the competition.Over 20,000 Students has been taking the old course already, this is the new version of Photoshop (cc)Are you new to Photoshop (cc) or Need a refresher? Then this course will help you learn the basics of Photoshop.Why Choose This Course?Have you ever noticed how beautiful some websites look? That\'s because of the perfect design that have been made in Photoshop. Also you can definitely make a substantial income once you learn more about Photoshop.“I created this course to teach you the knowledge that will help you with Photoshop since I was in your shoes some years ago. If you need support, my company Web Courses Bangkok will be just a message or an email away, feel free to visit our website. I love when my students succeed and that for me is priceless. You success depends on yours and I will make sure with that you get all the help you need when you need it." – Carl Heaton, Senior Instructor We take our courses very seriously but at the same time we try to make it fun since we know how difficult it can be learning from an instructor over the web. This course is fun, and when you need some energy to keep going, you will get it from me. Also the courses are well illustrated and easy to understand.The Approach Practice, practice and more practice. In every lecture you will find the required .psd files to download. Along the way I will be explaining what to do with the files and how to use them.This Photoshop course Covers the following;Explanation about the interface of Photoshop ccUsing the paint brushUsing shapes and making custom shapesUsing layers and groupsExplanation about moving and resizingZooming and panningUsing different blending modes and effectsInsterting and adjusting text into PhotoshopDuring the course you will also learn some keyboard shortcuts Some of my students reviews for the older version of this course:"great course. Thank you Mr Carl Heaton for this great and simple course!" - Vili"Thank You !! Even though I\'ve played around with Photoshop before this course was really worthwhile and I learnt things which will definitely help me. You are a really good presenter and you make it easy to understand, I\'ll definitely be taking more of your courses :-)" - Sue Henderson"The Way that the Courses are put together are awesome. Love the Way that you Put the Courses Together. The Second Showing is what makes the difference." - Marc Antonio Turner"Excellent course for web designers that want to make there page designs in Photoshop. It explains all I needed to know to design my first website." - Koen van Dieren',
            'type': 'unstyled'
          }],
          'entityMap': {}
        },
        'Id': 17,
        'Is_Completed': true,
        'Language_Id': 0,
        'Price': 0,
        'Promote_Id': 0,
        'Rating': 0,
        'Sub_Description': 'Learning the basics of Photoshop CC for Web Design Beginners',
        'Thumbnail_Large': '"https://img-c.udemycdn.com/course/750x422/599170_aa50_3.jpg"',
        'Thumbnail_Medium': '"https://img-c.udemycdn.com/course/480x270/599170_aa50_3.jpg"',
        'Thumbnail_Small': '"https://img-c.udemycdn.com/course/240x135/599170_aa50_3.jpg"}',
        'Title': 'Photoshop CC for Web Design Beginners'
      },
      {
        'Author_Id': 16,
        'Category_Id': 1,
        'Description': {
          'blocks': [{
            'data': {},
            'depth': 0,
            'entityRanges': [],
            'inlineStyleRanges': [],
            'key': '',
            'text': '"I\'ve already started setting up my site while I\'m learning because I\'m new to wordpress but it\'s easier than I expected! Thank you!" - Chris Livingston   Have you ever wanted to create your own website but don\'t know how to code?    Good news, you\'re in the right place!   This course is designed to walk you step-by-step through setting up your own WordPress website without any experience or coding required.   Specific action steps are included to walk you through setting up your website so by the end of this course you will have launched your very own WordPress website!Over 74 million websites use WordPress. And almost 50% of the top blogs are built on WordPress. Do you know how to use WordPress to get ahead?  As a web designer for over 10 years, I\'m here to help you get your website online. I\'m here to show you exactly how everything in WordPress works. No fancy terminology or complex methods used here. Just exactly what you need to know to set-up a fully functioning website.   "I have gone through a number of basic WordPress courses on Udemy and this is my favorite so far. I liked the included term definitions and resources as well as practical examples such as setting up email list. Good site example." - Christopher Kearney    Get Ready to Cover:   How to set-up a nicely designed site so you will save thousands of $ on hiring a designer. How to add new functionality to your website so you will save even more $ on not having to hire a developer. How to quickly and easily update and manage your own website without having to hire someone to do it for you. How you can start earning money tomorrow by setting up websites for others. And lots more!    "Excellent training course, one of the best around, if not the best." - Brad   My Guarantee   I personally guarantee you will be able to set-up your own WordPress website today without ever touching any code.  I make myself available so you will have access to me if you have questions or need feedback along the way. You\'re not in this alone!    Click the \'Take This Course Now\' button in the top right of your screen to get your website online today.',
            'type': 'unstyled'
          }],
          'entityMap': {}
        },
        'Id': 18,
        'Is_Completed': true,
        'Language_Id': 0,
        'Price': 0,
        'Promote_Id': 0,
        'Rating': 0,
        'Sub_Description': "A beginner's guide to creating a WordPress website without any coding for your web design & SEO business.",
        'Thumbnail_Large': '"https://img-c.udemycdn.com/course/750x422/149006_b92e_8.jpg"}',
        'Thumbnail_Medium': '"https://img-c.udemycdn.com/course/480x270/149006_b92e_8.jpg"}',
        'Thumbnail_Small': '"https://img-c.udemycdn.com/course/240x135/149006_b92e_8.jpg"',
        'Title': 'Create a WordPress Website for Your Web Design Business'
      },
      {
        'Author_Id': 17,
        'Category_Id': 1,
        'Description': {
          'blocks': [{
            'data': {},
            'depth': 0,
            'entityRanges': [],
            'inlineStyleRanges': [],
            'key': '',
            'text': 'There are a lot of HTML and CSS courses out there. A lot. How do you choose the one that\'s right for you?\nI\xa0made this course for you--the beginner; the person who has never touched a tag or seduced a selector. Heck, you can learn HTML and CSS even if you\'re new to computers.\nSome "free" classes are actually disguised\xa0marketing devices to try to get you to purchase other content from the author(s). I assure you this class is the real deal. I genuinely want to help, and although I do offer paid classes, this one will always be free and good.\nSure, you could purchase one of the more\xa0popular courses that has hours and hours of video and 30 or 45 lectures. And, in fact, I encourage you to do so after you take this course. This course is the starting place for all the other web development courses out there.\nHow can HTML and CSS\xa0help you?\nYeah, there are a lot of "drag \'n drop" website creators out there. But behind them all are HTML and CSS, and knowing how HTML and CSS works can be immensely valuable to you.\nAfter you complete this course, you will be able to make your own website using only Notepad or TextEdit (or a text editor of your choice)! You\'ll also be able to manipulate existing code in Wordpress, Drupal, and Joomla sites.\xa0\nYou can also feel confident in taking a more advanced web design course.\xa0\nSTART\xa0HERE!',
            'type': 'unstyled'
          }],
          'entityMap': {}
        },
        'Id': 19,
        'Is_Completed': true,
        'Language_Id': 0,
        'Price': 0,
        'Promote_Id': 0,
        'Rating': 0,
        'Sub_Description': 'The starting place for all the other HTML courses out there!',
        'Thumbnail_Large': '"https://img-c.udemycdn.com/course/750x422/1192478_0bde_8.jpg"}',
        'Thumbnail_Medium': '"https://img-c.udemycdn.com/course/480x270/1192478_0bde_8.jpg"}',
        'Thumbnail_Small': '"https://img-c.udemycdn.com/course/240x135/1192478_0bde_8.jpg"',
        'Title': "HTML and CSS: The Super Fun Beginner's Course"
      },
      {
        'Author_Id': 18,
        'Category_Id': 1,
        'Description': {
          'blocks': [{
            'data': {},
            'depth': 0,
            'entityRanges': [],
            'inlineStyleRanges': [],
            'key': '',
            'text': "Logos are a critical part of the modern visual landscape. To learn how to create your own, it's important to be able to identify the components and design techniques behind the most successful Logos. In this course, we will be deconstructing Challenging logos in order to explain why and how they work, and offers a methodical approach to creating a logo in Illustrator. These tutorials combine theory with nuts-and-bolts techniques that emphasize simplicity and readability: the principles that ground the best logo designs. \nTopics include:\nChoosing the right typefaceDesigning with simple shapesAdding shine, texture, beveled edges, and transparencyDesigning with negative spaceChoosing logo colorsPreparing final files* Note: I have use used Adobe\xa0Illustrator cc\xa0version\xa0for this course.\nDesign a logo that stands out from the crowd with the help of these video tutorials. \n* Fully explained tutorial from starting to end.\n* Provided you secret techniques of creation.\nYou also get the Project file to enhance your work flow..\n Contents and Overview \n This course, containing over 45 lectures and 2.5 hours of content, provides step-by-step instructions on logo design. \n Along with this you also get the AI. Working File to download and practice along the tutorials. \n No logo design experience is required; however, you should have a full or free trial version of Adobe Illustrator, even though you don't need prior knowledge working in this program. \n Upon completion of this course. You'll know how to create unique symbols, add elements to a word, use geometric shapes and initials, and position text properly. \n Students will nail the basics of Illustrator, and create logos in color, black and white, and in different formats. All of these skills will make you a more valuable designer or allow you to use your creativity to make your own logos.",
            'type': 'unstyled'
          }],
          'entityMap': {}
        },
        'Id': 20,
        'Is_Completed': true,
        'Language_Id': 0,
        'Price': 0,
        'Promote_Id': 0,
        'Rating': 0,
        'Sub_Description': 'Learn how to design a logo that stands out from the crowd.',
        'Thumbnail_Large': '"https://img-c.udemycdn.com/course/750x422/399938_e897_5.jpg"',
        'Thumbnail_Medium': '"https://img-c.udemycdn.com/course/480x270/399938_e897_5.jpg"',
        'Thumbnail_Small': '"https://img-c.udemycdn.com/course/240x135/399938_e897_5.jpg"}',
        'Title': 'Professional Logo Design in Adobe Illustrator'
      },
      {
        'Author_Id': 19,
        'Category_Id': 1,
        'Description': {
          'blocks': [{
            'data': {},
            'depth': 0,
            'entityRanges': [],
            'inlineStyleRanges': [],
            'key': '',
            'text': "If you’ve ever wanted to try digital painting, but you’re intimidated by photoshop, this course is for you! We’ll go through all of the software’s core functions and tools in a series of easy-to-follow lessons that will have you up and running in no time.\nThese lessons are the building blocks that you will carry forward to the incredibly cool digital painting courses that we offer. Best of all, this course is absolutely FREE!\xa0So enroll today and let's get you on board with Photoshop!",
            'type': 'unstyled'
          }],
          'entityMap': {}
        },
        'Id': 21,
        'Is_Completed': true,
        'Language_Id': 0,
        'Price': 0,
        'Promote_Id': 0,
        'Rating': 0,
        'Sub_Description': 'The power of the digital art standard at your finger tips',
        'Thumbnail_Large': '"https://img-c.udemycdn.com/course/750x422/1298462_38dd.jpg"',
        'Thumbnail_Medium': '"https://img-c.udemycdn.com/course/480x270/1298462_38dd.jpg"}',
        'Thumbnail_Small': '"https://img-c.udemycdn.com/course/240x135/1298462_38dd.jpg"',
        'Title': 'Photoshop Fundamentals'
      },
      {
        'Author_Id': 19,
        'Category_Id': 1,
        'Description': {
          'blocks': [{
            'data': {},
            'depth': 0,
            'entityRanges': [],
            'inlineStyleRanges': [],
            'key': '',
            'text': 'This course distills semesters of art school into series of fun, engaging and succinct lessons. We’ll go over all of the core concepts and terminology that you’ll need to start understanding and creating art like a professional and I’ll even teach you my habits for success! Anyone who has a passion for art, but may not know all of the technical terminology or concepts - you have come to the right place.\nThese lessons are the building blocks that you will carry forward to the incredibly cool digital painting courses that we offer.\xa0Best of all, if you enroll today, this course is FREE!',
            'type': 'unstyled'
          }],
          'entityMap': {}
        },
        'Id': 22,
        'Is_Completed': true,
        'Language_Id': 0,
        'Price': 0,
        'Promote_Id': 0,
        'Rating': 0,
        'Sub_Description': "A beginner's guide to the building blocks of digital art",
        'Thumbnail_Large': '"https://img-c.udemycdn.com/course/750x422/1298438_2631.jpg"',
        'Thumbnail_Medium': '"https://img-c.udemycdn.com/course/480x270/1298438_2631.jpg"}',
        'Thumbnail_Small': '"https://img-c.udemycdn.com/course/240x135/1298438_2631.jpg"',
        'Title': 'Art Fundamentals - Building Blocks of Digital Painting'
      },
      {
        'Author_Id': 20,
        'Category_Id': 1,
        'Description': {
          'blocks': [{
            'data': {},
            'depth': 0,
            'entityRanges': [],
            'inlineStyleRanges': [],
            'key': '',
            'text': 'This Frank Reilly method drawing course in fifteen lectures covers the details of the "Reilly" drawing technique and demonstrations using it. This technique allows for complete figure drawings from life in less than 45 minutes. Starting with the lines of action and large abstract shapes, the course proceeds through small shapes, negative space, value, perspective, foreshortening, edge, line, details (face, hands and feet), and drapery on the figure. The final two lectures summarize the entire technique and give two examples using it to draw complete figures in under five minutes by Reilly Method Drawing. There are also five complete demonstrations using this technique done in 4- 7 minutes of figures drawn from life in a variety of positions. The driving principal behind this course is that the "whole is more important than the parts" which is the reason that I start with a gesture drawing and build on its structure until completion with anatomy and details. Also, I cover how to apply drapery to the figure using the same principles.',
            'type': 'unstyled'
          }],
          'entityMap': {}
        },
        'Id': 23,
        'Is_Completed': true,
        'Language_Id': 0,
        'Price': 0,
        'Promote_Id': 0,
        'Rating': 0,
        'Sub_Description': 'Learn to draw the figure from life in less than 45 minutes.',
        'Thumbnail_Large': '"https://img-c.udemycdn.com/course/750x422/17349_932f_8.jpg"',
        'Thumbnail_Medium': '"https://img-c.udemycdn.com/course/480x270/17349_932f_8.jpg"}}',
        'Thumbnail_Small': '"https://img-c.udemycdn.com/course/240x135/17349_932f_8.jpg"',
        'Title': 'Figure Drawing From Life Using The Reilly Technique.'
      },
      {
        'Author_Id': 21,
        'Category_Id': 1,
        'Description': {
          'blocks': [{
            'data': {},
            'depth': 0,
            'entityRanges': [],
            'inlineStyleRanges': [],
            'key': '',
            'text': "Welcome to Logo Design-Fundamentals of Building a Great Brand Logo. Our course teacher, Lauren, walks you through the steps he takes to come up and create a logo design. In Logo Design Fundamentals, Lauren describes his process from start to finish using all the elements it takes to create and build a unique logo. With a Bachelor’s degree in Fine Arts and an Associates degree in Graphic Design, Lauren has the professional experience needed to be the perfect instructor for this course. He has been our lead designer for over 5 years, and we are happy to have him on the Elevated team.  Our Logo Design course is shown using mostly screen casts video. We use the best tools and provide lot's of fun and exciting tips.   Tools Adobe Illustrator, Photoshop and Reader    All the sound is recorded using a Blue Yeti microphone for maximum clarity and we use the Camtasia screen capture for high quality video.   This is a fun course, weather you have little or now background with Adobe products suite or you are seasoned vet looking to pick up some fun tips and tricks from another peer professional logo designer.   Using Adobe and showing how you can help brand someones company with a great logo design is an important skill to have. We are here to add value to your life and want you to feel happy with the content we have created and are providing in this course. We want to be new valuable members of the Udemy family and are excited for the journey.   This class is about 54 mins long and moves pretty fast. We have also included different AUDIO VERSION: Special Bonus Audio Only version, not the same as the course.   Terminology that will be used is very Adobe heavy, but we also include the fundamentals. Fonts, Colors, Tones, Black and White, Feathers, Vertical and Horizontal.   Looking for free logo design? Design Logo Fundamentals. Design process, Adobe Illustrator, Adobe Photoshop, Professional Design, Development, Flat Design, Adobe.   Elevated courses are geared for you to understand not only what design is, but how to recognize great design and understand why it's great. To clarify further this class walks you through the process of developing and designing a logo and doesn't focus just on the tools and little micro pieces of Adobe, it's more of the A-Z process of a professional as he walks you through how to set up each stage of the process. The Process is covered very thoroughly.   Why you should take this course?   Lauren is very proficient in the skills that it takes to make and master a branded logo design. We use a real world example and we are going to take this even further as we walk you through the process to creating the big brand down the road.   Why Again?   Branding is a key element of design Logo represents your company Creating quality work as a professional is paramount  We teach you the process of black and white vs. color Importance of vertical and Horizontal and many other aspects of branded logo design    This Logo Design Fundamentals course is geared towards teaching you the different key components to creating and managing a logo for a company, it's more then just putting together some shapes, with font. This is about identity and craftsmanship   As well about details of the preparation it takes to turn your finished product over to your client a print shop. If you are looking to make a career from your design or even brand identity, this course is perfect for you. These important details can't go over looked and must be included in your final product. From A-Zed we will push you ahead!   Stay tuned for our Big Brand course, as we walk through in more detail the creation of a envelope, stationary, company business card and promotional card.   Once again thank you for taking our course and engaging with our company.",
            'type': 'unstyled'
          }],
          'entityMap': {}
        },
        'Id': 24,
        'Is_Completed': true,
        'Language_Id': 0,
        'Price': 0,
        'Promote_Id': 0,
        'Rating': 0,
        'Sub_Description': "Logo Design! Not just the basics, it's the fundamentals. Lauren guides you in building and preparing a branded logo.",
        'Thumbnail_Large': '"https://img-c.udemycdn.com/course/750x422/270454_23ec_5.jpg"',
        'Thumbnail_Medium': '"https://img-c.udemycdn.com/course/480x270/270454_23ec_5.jpg"',
        'Thumbnail_Small': '"https://img-c.udemycdn.com/course/240x135/270454_23ec_5.jpg"}',
        'Title': 'Logo Design Fundamentals'
      },
      {
        'Author_Id': 22,
        'Category_Id': 1,
        'Description': {
          'blocks': [{
            'data': {},
            'depth': 0,
            'entityRanges': [],
            'inlineStyleRanges': [],
            'key': '',
            'text': "This introductory course gives the student an understanding of how we should separate Analysis from Design issues. It does this by looking at the many things that are simply perpetuated from old designs and taking a humorous look at where those old designs originated. The course uses pictures, graphics, both static and animated, with voice-over to show the various real world examples of the perpetuation of old designs. It does this by progressing through basic examples in everyone's regular life to business issues that restrict us as customers. There is no support material needed for this course. The course video is approximately one hour in duration. The student will see the importance of applying analysis concepts to every new invention or system be it a manual task or a computer business system. There are no exercises or questionnaires to complete.",
            'type': 'unstyled'
          }],
          'entityMap': {}
        },
        'Id': 25,
        'Is_Completed': true,
        'Language_Id': 0,
        'Price': 0,
        'Promote_Id': 0,
        'Rating': 0,
        'Sub_Description': 'A look at how the old ways of doing things get perpetuated causing us problems today.',
        'Thumbnail_Large': '"https://img-c.udemycdn.com/course/750x422/45551_8735_15.jpg"',
        'Thumbnail_Medium': '"https://img-c.udemycdn.com/course/480x270/45551_8735_15.jpg"',
        'Thumbnail_Small': '"https://img-c.udemycdn.com/course/240x135/45551_8735_15.jpg"}}',
        'Title': 'Analysis of Everyday Things.'
      },
      {
        'Author_Id': 23,
        'Category_Id': 7,
        'Description': {
          'blocks': [{
            'data': {},
            'depth': 0,
            'entityRanges': [],
            'inlineStyleRanges': [],
            'key': '',
            'text': 'Creativity is not a divine gift conceded only to a few.\xa0It is a heritage of everyone, but people lose their creative potential through life due to many different reasons.But don’t worry, it can be turned around! With the combination of knowledge, tools, exercises and tasks,\xa0it is possible to bring back to life the creativity inside you!For this reason, this course presents all the stages of the creative process and, for each phase, it teaches a collection of tools and techniques which aim to stimulate and guide creativity! \xa0In total,\xa0you will learn more than THIRTY tools and techniques which stimulate the creative process!\xa0They come from different areas and are not restricted only to the famous Brainstorming and Mind Maps.\xa0\xa0Of course, such tools are also explained in the course, but you will learn many others to support creativity, which will\xa0help you think outside the box and have original ideas!To make your life easier, all these tools are accompanied by\xa0support materials that were developed exclusively for this course and that can be downloaded and printed\xa0in order to be used where and when you need them!\xa0In this course, you will learn:- Ways to identify opportunities and have ideias, through tools such as\xa0Convergence Map, Behavioral Tendencies Map, Popular Media Scanning, amongst others;- Forms to cllect data that relate directly or indirectly to your idea, like\xa0Eras Map, Types of Innovation Evaluation, Sociocultural Scanning, etc;- Tips to incubate your idea with the development of activities and challenges, based on\xa0Creative Idleness;- Many practices to warm up you ideas, such as\xa0Tool 635, Scamper, 4 Types of Brainstorming, Mind Map, Wordcloud, amongst others;- Practices to illuminate and evalate your ideas, like\xa0Stakeholder Evaluation, 6 Hats, Role Playing Game and Attributes Evaluation, etc.;- Ways to elaborate your idea through\xa0Moodboaboards, Canvas, Storyboard, 5W1H,\xa0and others;- And, finally, you will get to know tools to\xa0evaluate your idea with potential users, partners and in the market.',
            'type': 'unstyled'
          }],
          'entityMap': {}
        },
        'Id': 26,
        'Is_Completed': true,
        'Language_Id': 0,
        'Price': 0,
        'Promote_Id': 0,
        'Rating': 0,
        'Sub_Description': 'Learn more than 30 tools to potentialize your creative process and have innovative ideas.',
        'Thumbnail_Large': '"https://img-c.udemycdn.com/course/750x422/1898726_5870_3.jpg"',
        'Thumbnail_Medium': '"https://img-c.udemycdn.com/course/480x270/1898726_5870_3.jpg"',
        'Thumbnail_Small': '"https://img-c.udemycdn.com/course/240x135/1898726_5870_3.jpg"}',
        'Title': 'Guide to Unblock Creativity and Have Original Ideas!'
      },
      {
        'Author_Id': 24,
        'Category_Id': 1,
        'Description': {
          'blocks': [{
            'data': {},
            'depth': 0,
            'entityRanges': [],
            'inlineStyleRanges': [],
            'key': '',
            'text': 'A machine generally consists of a motor, a drive, and an actuating element. The mechanical power driving a machine constitutes the rotary motion energy of a motor shaft. Electric motors, internal-combustion motors, or turbines are the most common types of motors. The mechanical power transmission from the motor to the actuating element is accomplished by various driving gears. These include gearings, worm gearings, belt drives, chain drives, and friction gears. Some examples of actuating elements are car steering wheels, work spindles, and screw propellers of ships. This course covers the design of machine elements, in particular all common types of knuckle joint and the needed machine components. The in-depth description, including stress and strength analysis, materials, tables and assembly recommendations allows for a comprehensive and detailed calculation and design of these most important. The course provides the practicing engineer with a clear understanding of the theory and applications behind the fundamental concepts of knuckle joint elements.The aim of the course is to develop the concept for knuckle joint based on the available space and its need. After developing concept design the all elements, including selection of material, factor of safety and calculation of final dimensions. To design the element basic steps were used as 1.Material selection, 2.Factor of safety, 3.Calculate permissible stresses, 4.Free body diagram\xa0 the element, 5.Deciding weakest cross section and calculate its dimensions.',
            'type': 'unstyled'
          }],
          'entityMap': {}
        },
        'Id': 27,
        'Is_Completed': true,
        'Language_Id': 0,
        'Price': 0,
        'Promote_Id': 0,
        'Rating': 0,
        'Sub_Description': 'Design of Knuckle Joint Elements based on Static load condition',
        'Thumbnail_Large': '"https://img-c.udemycdn.com/course/750x422/3901046_c8ee.jpg"}',
        'Thumbnail_Medium': '"https://img-c.udemycdn.com/course/480x270/3901046_c8ee.jpg"',
        'Thumbnail_Small': '"https://img-c.udemycdn.com/course/240x135/3901046_c8ee.jpg"}',
        'Title': 'Design Simple Machine Element'
      },
      {
        'Author_Id': 25,
        'Category_Id': 1,
        'Description': {
          'blocks': [{
            'data': {},
            'depth': 0,
            'entityRanges': [],
            'inlineStyleRanges': [],
            'key': '',
            'text': 'New products and services are the foundation of any long term successful strategy in a business.\xa0 But when we think about new products and services, we often think only about those groundbreaking products that have changed the world in some way.\xa0 We often forget that most of the new successful product introductions are much smaller in scale, leverage from the strengths of the organization and its connection with it\'s customer base.\xa0 This introductory course will lay the framework for the many different types of new products and services that we can offer our customers.\xa0 Follow-on courses will develop the details of how to define, develop and launch highly successful new products and services. In this course we will cover:PRODUCT FLOP OR SUCCESS?Learning from failure is a key ingredient of success. This lecture will examine a few of the big product failures in the past and examine what caused those.TYPES OF NEW PRODUCTSWe all think about that earth shattering, revolutionary brand new product that rocks the world. But most successful products are extensions of our current product line or improvements on a current product. This course will review the basic types of new products and how they can be great business investments.SERVICES AS PRODUCTSThe conventional method of thinking about new products is the development and launch of a new physical item...\xa0 something we can see and feel and hold. We often forget that there are huge opportunities in launching "New Services" as a stand alone item or in conjunction with a new physical product. We will review the different classes of services and how they relate to overall business success.This "PLAIN AND SIMPLE" series strives to describe all course content\xa0 in a simple and easy to understand manner, using many practical examples throughout.\xa0 It is targeted at those learners who have minimal familiarity with the subject matter.The content of the series is based on the author\'s 35 plus years experience in New Product Development from Concept to Product End of Life. The author started out his career as a product development engineer and progressed to technical marketing, business development and then finally to senior management as a VP and then President of a high tech firm. Following his retirement the author was invited to teach New Product Development to MBA students at the University of Washington in Seattle and to EMBA and Healthcare students at the University of New Haven in Connecticut.',
            'type': 'unstyled'
          }],
          'entityMap': {}
        },
        'Id': 28,
        'Is_Completed': true,
        'Language_Id': 0,
        'Price': 0,
        'Promote_Id': 0,
        'Rating': 0,
        'Sub_Description': 'Learn about new ways to think about defining new products and services. Understand success or failure with new products',
        'Thumbnail_Large': '"https://img-c.udemycdn.com/course/750x422/4199640_d240_11.jpg"',
        'Thumbnail_Medium': '"https://img-c.udemycdn.com/course/480x270/4199640_d240_11.jpg"}',
        'Thumbnail_Small': '"https://img-c.udemycdn.com/course/240x135/4199640_d240_11.jpg"',
        'Title': 'B03: New Product, Boom or Bust?, Plain & Simple'
      },
      {
        'Author_Id': 26,
        'Category_Id': 8,
        'Description': {
          'blocks': [{
            'data': {},
            'depth': 0,
            'entityRanges': [],
            'inlineStyleRanges': [],
            'key': '',
            'text': '世界中でデジタルトランスフォーメーション（デジタル革命）が急速に進行しています。この時に求められるのはいわゆるSoEとよばれている中でも顧客に新しい経験を提供できる「攻め」のシステムです。この様なシステムはSoRに適した従来型のシステム設計の手法では対応できません。本コースでは、最も重要となる要件定義のパートにおいて適用する「サービスデザイン」の手法について必要性を学習し、習得して頂きます。なお、本コースは情報サービス産業協会(JISA)で開催する実践サービスデザイン講座に向けた事前学習教材です。講師は宗平順己氏が担当します。■講師プロフィール氏名：宗平 順己京都大学理学部大学院中退後、総合電機メーカーを経て、1986年にオージス総研に入社。コンサルティング部長、ソフトウェア工学センター長を経て、2014/3/31まで取締役執行役員技術部長。在任中は、クラウドインテグレーションセンター、アジャイル開発センター、エンタープライズオープンソースセンター、IoTセンター、データサイエンスセンターの技術系組織とビジネスイノベーションセンターのコンサルティング組織を率いる。2014/4/1より株式会社ロックオン特別顧問\u3000執行役員商流プラットフォーム事業本部長。2016/10/1よりKyotoビジネスデザインラボ主宰し、デジタルリテールやIoT、Logistics4.0に代表されるデジタルトランスフォーメーションを専門研究分野としている。主にIT投資マネジメント、IT統制、ビジネスモデリング、BPM、SOA、EA、BSC、サービスデザインに関する研究活動を行いながら、IT顧問として複数の企業のCIO/CDO補佐、CTO/CSO補佐の任に就く。Service Design Network Japan Chapter 関西支部世話人 。',
            'type': 'unstyled'
          }],
          'entityMap': {}
        },
        'Id': 29,
        'Is_Completed': true,
        'Language_Id': 0,
        'Price': 0,
        'Promote_Id': 0,
        'Rating': 0,
        'Sub_Description': '顧客のデジタル革命の推進役となるために',
        'Thumbnail_Large': '"https://img-c.udemycdn.com/course/750x422/1785082_7651_2.jpg"',
        'Thumbnail_Medium': '"https://img-c.udemycdn.com/course/480x270/1785082_7651_2.jpg"',
        'Thumbnail_Small': '"https://img-c.udemycdn.com/course/240x135/1785082_7651_2.jpg"}}',
        'Title': 'デジタルトランスフォーメーション(DX)とサービスデザイン'
      }
      ]);
    })

    .then(function () {
      return knex("Sections").insert([{ 'Course_Id': 0, 'Id': 0, 'Name': 'Course Introduction' },
      { 'Course_Id': 0, 'Id': 1, 'Name': 'The 25+ Guidelines Of Amazing Web Design' },
      { 'Course_Id': 0, 'Id': 2, 'Name': 'Course Summary' },
      { 'Course_Id': 0, 'Id': 3, 'Name': 'Conclusion' },
      { 'Course_Id': 1, 'Id': 4, 'Name': 'Introduction' },
      { 'Course_Id': 1, 'Id': 5, 'Name': 'Basic Syntax' },
      { 'Course_Id': 1, 'Id': 6, 'Name': 'Comparison & Conditional Execution' },
      { 'Course_Id': 1, 'Id': 7, 'Name': 'DOM Manipulation' },
      { 'Course_Id': 1, 'Id': 8, 'Name': 'Final Overview' },
      { 'Course_Id': 2, 'Id': 9, 'Name': 'Q&A Section Project' },
      { 'Course_Id': 2, 'Id': 10, 'Name': 'Tabs Project' },
      { 'Course_Id': 3, 'Id': 11, 'Name': 'Introduction and Installations' },
      { 'Course_Id': 3, 'Id': 12, 'Name': 'Background video project' },
      { 'Course_Id': 3, 'Id': 13, 'Name': 'Counter Project' },
      { 'Course_Id': 4, 'Id': 14, 'Name': 'Introduction' },
      { 'Course_Id': 4, 'Id': 15, 'Name': 'PHP Basics' },
      { 'Course_Id': 4, 'Id': 16, 'Name': 'PHP Arrays' },
      { 'Course_Id': 4, 'Id': 17, 'Name': 'PHP If, Else & Elseif' },
      { 'Course_Id': 4, 'Id': 18, 'Name': 'PHP Operators' },
      { 'Course_Id': 4, 'Id': 19, 'Name': 'PHP Loops' },
      { 'Course_Id': 4, 'Id': 20, 'Name': 'PHP Functions' },
      { 'Course_Id': 4, 'Id': 21, 'Name': 'Coding a Dynamic PHP Restaurant Website' },
      { 'Course_Id': 5, 'Id': 22, 'Name': 'Introduction' },
      { 'Course_Id': 5, 'Id': 23, 'Name': 'Getting started with coding' },
      {
        'Course_Id': 5,
        'Id': 24,
        'Name': 'Bonus material from the other R-Tutorials courses'
      },
      { 'Course_Id': 6, 'Id': 25, 'Name': 'Introduction' },
      { 'Course_Id': 6, 'Id': 26, 'Name': 'Getting setup with Tools' },
      {
        'Course_Id': 6,
        'Id': 27,
        'Name': 'Getting Deeper into Machine learning frameworks and algorithms'
      },
      { 'Course_Id': 7, 'Id': 28, 'Name': 'Introduction' },
      { 'Course_Id': 7, 'Id': 29, 'Name': 'Pandas' },
      { 'Course_Id': 7, 'Id': 30, 'Name': 'NumPy' },
      { 'Course_Id': 7, 'Id': 31, 'Name': 'SciKit-Learn' },
      { 'Course_Id': 7, 'Id': 32, 'Name': 'matplotlib' },
      { 'Course_Id': 7, 'Id': 33, 'Name': 'NLTK' },
      { 'Course_Id': 8, 'Id': 34, 'Name': 'Getting Started' },
      { 'Course_Id': 8, 'Id': 35, 'Name': 'Working with ggplot' },
      { 'Course_Id': 8, 'Id': 36, 'Name': 'Sampling from populations' },
      { 'Course_Id': 8, 'Id': 37, 'Name': 'Simple Linear Regression in R' },
      { 'Course_Id': 9, 'Id': 38, 'Name': 'Introduction to Artificial Intelligence' },
      {
        'Course_Id': 9,
        'Id': 39,
        'Name': 'Road Map for AI and Machine Learning (ML)'
      },
      { 'Course_Id': 9, 'Id': 40, 'Name': 'Introduction to Machine Learning' },
      { 'Course_Id': 9, 'Id': 41, 'Name': 'Types of Machine Learning' },
      { 'Course_Id': 10, 'Id': 42, 'Name': 'Introduction and setup' },
      {
        'Course_Id': 10,
        'Id': 43,
        'Name': 'Creating a basic Android App in 15 minutes'
      },
      {
        'Course_Id': 10,
        'Id': 44,
        'Name': 'Bonus app features (Complete in 11 minutes)'
      },
      { 'Course_Id': 11, 'Id': 45, 'Name': 'Introduction To Flutter' },
      { 'Course_Id': 11, 'Id': 46, 'Name': 'Flutter States' },
      { 'Course_Id': 11, 'Id': 47, 'Name': 'layouts' },
      { 'Course_Id': 11, 'Id': 48, 'Name': 'AppBar & TabBar Widget' },
      { 'Course_Id': 11, 'Id': 49, 'Name': 'Custom Widgets' },
      { 'Course_Id': 11, 'Id': 50, 'Name': 'Input & Selections Widgets' },
      { 'Course_Id': 11, 'Id': 51, 'Name': 'Drawer Widget & Routes' },
      { 'Course_Id': 11, 'Id': 52, 'Name': 'Notification Widgets' },
      {
        'Course_Id': 12,
        'Id': 53,
        'Name': 'Hey there ! Let me introduce you to Android and Android Studio !'
      },
      { 'Course_Id': 12, 'Id': 54, 'Name': 'Android Versions' },
      { 'Course_Id': 13, 'Id': 55, 'Name': 'Introduction' },
      { 'Course_Id': 13, 'Id': 56, 'Name': 'Setup' },
      { 'Course_Id': 13, 'Id': 57, 'Name': 'Basic Swift 3' },
      {
        'Course_Id': 13,
        'Id': 58,
        'Name': 'Your First iOS 10 App - An Astronomy Screen Torch!'
      },
      { 'Course_Id': 13, 'Id': 59, 'Name': 'App 2 - Temperature Converter' },
      { 'Course_Id': 13, 'Id': 60, 'Name': 'App 3 - Calculator' },
      { 'Course_Id': 13, 'Id': 61, 'Name': 'App 4 - Back to the Future' },
      { 'Course_Id': 13, 'Id': 62, 'Name': 'App 5 - Where was I? - GPS and Maps' },
      { 'Course_Id': 13, 'Id': 63, 'Name': 'Great App Design' },
      { 'Course_Id': 13, 'Id': 64, 'Name': 'App 6 - Quick Share (Photos)' },
      { 'Course_Id': 14, 'Id': 65, 'Name': 'Getting Started' },
      { 'Course_Id': 14, 'Id': 66, 'Name': 'Your First App' },
      { 'Course_Id': 14, 'Id': 67, 'Name': 'Learning To Code' },
      { 'Course_Id': 14, 'Id': 68, 'Name': 'Creating A Tip Calculator App' },
      { 'Course_Id': 14, 'Id': 69, 'Name': 'Creating A Food Journal App' },
      { 'Course_Id': 14, 'Id': 70, 'Name': 'Expanding Our Food Journal App' },
      {
        'Course_Id': 14,
        'Id': 71,
        'Name': 'Adding Geo-Location And Maps to Our Food Journal App'
      },
      { 'Course_Id': 14, 'Id': 72, 'Name': 'Creating A Multi-Touch Photo-based App' },
      { 'Course_Id': 14, 'Id': 73, 'Name': 'Submitting To The App Store' },
      { 'Course_Id': 15, 'Id': 74, 'Name': 'Introduction' },
      { 'Course_Id': 15, 'Id': 75, 'Name': 'The 5 Main Steps' },
      { 'Course_Id': 15, 'Id': 76, 'Name': 'Web Hosting and Domain Name' },
      { 'Course_Id': 15, 'Id': 77, 'Name': 'Installing WordPress and Logging In' },
      { 'Course_Id': 15, 'Id': 78, 'Name': 'Deleting Demo Content' },
      { 'Course_Id': 15, 'Id': 79, 'Name': 'Changing Our Theme' },
      { 'Course_Id': 15, 'Id': 80, 'Name': 'Customizing Our Theme' },
      { 'Course_Id': 15, 'Id': 81, 'Name': 'Adding Pages' },
      { 'Course_Id': 15, 'Id': 82, 'Name': 'Adding Blog Posts' },
      { 'Course_Id': 15, 'Id': 83, 'Name': 'Changing Our Fonts' },
      { 'Course_Id': 16, 'Id': 84, 'Name': 'Introduction' },
      { 'Course_Id': 16, 'Id': 85, 'Name': 'The Domain Name' },
      { 'Course_Id': 16, 'Id': 86, 'Name': 'Web Hosting' },
      { 'Course_Id': 16, 'Id': 87, 'Name': 'Getting your Website Live' },
      { 'Course_Id': 17, 'Id': 88, 'Name': 'Hello and Welcome!' },
      { 'Course_Id': 17, 'Id': 89, 'Name': 'User Interface' },
      { 'Course_Id': 17, 'Id': 90, 'Name': 'Working with tools and layers' },
      { 'Course_Id': 17, 'Id': 91, 'Name': 'Creating Shapes' },
      { 'Course_Id': 17, 'Id': 92, 'Name': 'Working With Layers & Groups' },
      { 'Course_Id': 17, 'Id': 93, 'Name': 'Moving and Resizing' },
      { 'Course_Id': 17, 'Id': 94, 'Name': 'Zooming and Panning' },
      { 'Course_Id': 17, 'Id': 95, 'Name': 'Blend Modes and Adding Effects' },
      { 'Course_Id': 17, 'Id': 96, 'Name': 'Inserting Text' },
      { 'Course_Id': 17, 'Id': 97, 'Name': 'Design in Photoshop' },
      { 'Course_Id': 18, 'Id': 98, 'Name': 'Course Overview' },
      { 'Course_Id': 18, 'Id': 99, 'Name': 'Getting Started With WordPress' },
      {
        'Course_Id': 18,
        'Id': 100,
        'Name': 'Customizing Your Website & Adding New Features'
      },
      {
        'Course_Id': 18,
        'Id': 101,
        'Name': 'The Big Reveal & Your Site Post Launch'
      },
      { 'Course_Id': 19, 'Id': 102, 'Name': 'Introduction' },
      { 'Course_Id': 19, 'Id': 103, 'Name': 'HTML' },
      { 'Course_Id': 19, 'Id': 104, 'Name': 'CSS' },
      { 'Course_Id': 19, 'Id': 105, 'Name': 'Bringing it all together' },
      { 'Course_Id': 20, 'Id': 106, 'Name': 'INTRODUCTION' },
      {
        'Course_Id': 20,
        'Id': 107,
        'Name': 'Professional Logo Design- Abobe Illustrator'
      },
      { 'Course_Id': 21, 'Id': 108, 'Name': 'Welcome' },
      { 'Course_Id': 21, 'Id': 109, 'Name': 'Basic Operations' },
      { 'Course_Id': 21, 'Id': 110, 'Name': 'Course Recap' },
      { 'Course_Id': 22, 'Id': 111, 'Name': 'Introduction' },
      { 'Course_Id': 22, 'Id': 112, 'Name': 'Habits of Successful Artists' },
      { 'Course_Id': 22, 'Id': 113, 'Name': 'Art Basics' },
      { 'Course_Id': 22, 'Id': 114, 'Name': 'Art Project' },
      { 'Course_Id': 22, 'Id': 115, 'Name': 'Course Recap' },
      {
        'Course_Id': 23,
        'Id': 116,
        'Name': 'Step-by-Step Instruction Using the Reilly Technique'
      },
      {
        'Course_Id': 23,
        'Id': 117,
        'Name': 'Demonstrations Using the Reilly Technique'
      },
      {
        'Course_Id': 24,
        'Id': 118,
        'Name': 'Introduction to logo design fundamentals'
      },
      { 'Course_Id': 24, 'Id': 119, 'Name': 'Fonts for Logo' },
      { 'Course_Id': 24, 'Id': 120, 'Name': 'Vector Elements and building vectors' },
      { 'Course_Id': 24, 'Id': 121, 'Name': 'Constructing the Logo' },
      {
        'Course_Id': 24,
        'Id': 122,
        'Name': 'Black and White | Horizontal Vs. Vertical'
      },
      { 'Course_Id': 24, 'Id': 123, 'Name': 'Finishing touches on the Logo' },
      { 'Course_Id': 24, 'Id': 124, 'Name': 'Bonus Features' },
      {
        'Course_Id': 25,
        'Id': 125,
        'Name': 'Analysis of Everyday Things Introduction'
      },
      {
        'Course_Id': 25,
        'Id': 126,
        'Name': 'Analysis of Modern Perpetuations of Old Designs.'
      },
      {
        'Course_Id': 25,
        'Id': 127,
        'Name': 'Analysis of Everyday Things Conclusion'
      },
      { 'Course_Id': 26, 'Id': 128, 'Name': 'I’m not creative… What do I do now?' },
      { 'Course_Id': 26, 'Id': 129, 'Name': 'Create + Activity = Creativity' },
      { 'Course_Id': 26, 'Id': 130, 'Name': 'Stages of the Creative Process' },
      { 'Course_Id': 26, 'Id': 131, 'Name': 'Identification Phase + 5 Tools' },
      { 'Course_Id': 26, 'Id': 132, 'Name': 'Preparation Phase + 4 Tools' },
      { 'Course_Id': 26, 'Id': 133, 'Name': 'Incubation Phase + 2 Tips' },
      { 'Course_Id': 26, 'Id': 134, 'Name': 'Warming Up Phase + 6 Tools' },
      { 'Course_Id': 26, 'Id': 135, 'Name': 'Enlightenment Phase + 4 Tools' },
      { 'Course_Id': 26, 'Id': 136, 'Name': 'Elaboration Phase + 5 Tools' },
      { 'Course_Id': 26, 'Id': 137, 'Name': 'Verification Stage + 5 Tools' },
      { 'Course_Id': 27, 'Id': 138, 'Name': 'Introduction to Knuckle joint' },
      { 'Course_Id': 27, 'Id': 139, 'Name': 'Design of knuckle joint' },
      { 'Course_Id': 28, 'Id': 140, 'Name': 'Introduction' },
      { 'Course_Id': 29, 'Id': 141, 'Name': 'デジタルトランスフォーメーション(DX)とサービスデザイン' }]);
    })
    .then(function () {
      return knex("Lectures").insert([
        {
          'Desciption': '',
          'Duration': '02:35',
          'Id': 0,
          'Section_Id': 0,
          'Title': 'Welcome To This Course'
        },
        {
          'Desciption': '',
          'Duration': '00:18',
          'Id': 1,
          'Section_Id': 0,
          'Title': 'READ BEFORE YOU START!'
        },
        {
          'Desciption': '',
          'Duration': '00:18',
          'Id': 2,
          'Section_Id': 0,
          'Title': 'E-Book Resources 2.0'
        },
        {
          'Desciption': '',
          'Duration': '03:47',
          'Id': 3,
          'Section_Id': 1,
          'Title': 'Introduction To Web Design'
        },
        {
          'Desciption': '',
          'Duration': '08:54',
          'Id': 4,
          'Section_Id': 1,
          'Title': 'Beautiful Typography'
        },
        {
          'Desciption': '',
          'Duration': '06:45',
          'Id': 5,
          'Section_Id': 1,
          'Title': 'Using Colors Like A Pro'
        },
        {
          'Desciption': '',
          'Duration': '01:09',
          'Id': 6,
          'Section_Id': 1,
          'Title': 'The Meaning Of Colors In Web Design'
        },
        {
          'Desciption': '',
          'Duration': '04:54',
          'Id': 7,
          'Section_Id': 1,
          'Title': 'Working With Images'
        },
        {
          'Desciption': '',
          'Duration': '02:31',
          'Id': 8,
          'Section_Id': 1,
          'Title': 'Use CSS To Work With Images'
        },
        {
          'Desciption': '',
          'Duration': '5 questions',
          'Id': 9,
          'Section_Id': 1,
          'Title': 'Web Design Quiz 1'
        },
        {
          'Desciption': '',
          'Duration': '03:29',
          'Id': 10,
          'Section_Id': 1,
          'Title': 'Working With Icons'
        },
        {
          'Desciption': '',
          'Duration': '03:42',
          'Id': 11,
          'Section_Id': 1,
          'Title': 'Spacing And Layout'
        },
        {
          'Desciption': '',
          'Duration': '02:50',
          'Id': 12,
          'Section_Id': 1,
          'Title': 'Introduction To User Experience'
        },
        {
          'Desciption': '',
          'Duration': '02:25',
          'Id': 13,
          'Section_Id': 1,
          'Title': 'Getting Inspired: The Secret Ingredient For Stunning Web Design'
        },
        {
          'Desciption': '',
          'Duration': '5 questions',
          'Id': 14,
          'Section_Id': 1,
          'Title': 'Web Design Quiz 2'
        },
        {
          'Desciption': '',
          'Duration': '04:35',
          'Id': 15,
          'Section_Id': 1,
          'Title': '8 Super Effective Ways To Improve Your Website’s Conversion'
        },
        {
          'Desciption': '',
          'Duration': '00:44',
          'Id': 16,
          'Section_Id': 2,
          'Title': 'Wrapping Up What We’ve Learned'
        },
        {
          'Desciption': '',
          'Duration': '01:56',
          'Id': 17,
          'Section_Id': 2,
          'Title': 'The Ultimate Cheatsheet: All Guidelines In One Place'
        },
        {
          'Desciption': '',
          'Duration': '99 pages',
          'Id': 18,
          'Section_Id': 2,
          'Title': 'Slides For This Course'
        },
        {
          'Desciption': '',
          'Duration': '02:30',
          'Id': 19,
          'Section_Id': 3,
          'Title': 'Where To Go From Here?'
        },
        {
          'Desciption': '',
          'Duration': '01:00',
          'Id': 20,
          'Section_Id': 3,
          'Title': 'Bonus Lecture'
        },
        {
          'Desciption': '',
          'Duration': '02:30',
          'Id': 21,
          'Section_Id': 4,
          'Title': 'Introduction'
        },
        {
          'Desciption': '',
          'Duration': '04:36',
          'Id': 22,
          'Section_Id': 4,
          'Title': 'What is Javascript?'
        },
        {
          'Desciption': '',
          'Duration': '04:04',
          'Id': 23,
          'Section_Id': 4,
          'Title': 'How Javascript Works'
        },
        {
          'Desciption': '',
          'Duration': '05:24',
          'Id': 24,
          'Section_Id': 4,
          'Title': 'Javascript Console'
        },
        {
          'Desciption': '',
          'Duration': '07:09',
          'Id': 25,
          'Section_Id': 4,
          'Title': 'Objects in Javascript'
        },
        {
          'Desciption': '',
          'Duration': '06:08',
          'Id': 26,
          'Section_Id': 4,
          'Title': 'Javascript Syntax'
        },
        {
          'Desciption': '',
          'Duration': '06:59',
          'Id': 27,
          'Section_Id': 5,
          'Title': 'Primitive Data'
        },
        {
          'Desciption': '',
          'Duration': '11:25',
          'Id': 28,
          'Section_Id': 5,
          'Title': 'Variables, Constants & Assignment'
        },
        {
          'Desciption': '',
          'Duration': '13:21',
          'Id': 29,
          'Section_Id': 5,
          'Title': 'Arithmetic Operator’s & BODMAS'
        },
        {
          'Desciption': '',
          'Duration': '08:16',
          'Id': 30,
          'Section_Id': 5,
          'Title': 'Assignment Operator’s'
        },
        {
          'Desciption': '',
          'Duration': '09:29',
          'Id': 31,
          'Section_Id': 5,
          'Title': 'Code Editors & Debugging'
        },
        {
          'Desciption': '',
          'Duration': '13:32',
          'Id': 32,
          'Section_Id': 5,
          'Title': 'Functions or Subroutines'
        },
        {
          'Desciption': '',
          'Duration': '11:50',
          'Id': 33,
          'Section_Id': 5,
          'Title': 'Objects & Arrays'
        },
        {
          'Desciption': '',
          'Duration': '10:34',
          'Id': 34,
          'Section_Id': 5,
          'Title': 'Embedding Objects & Arrays'
        },
        {
          'Desciption': '',
          'Duration': '09:29',
          'Id': 35,
          'Section_Id': 5,
          'Title': 'Member Access'
        },
        {
          'Desciption': '',
          'Duration': '13:18',
          'Id': 36,
          'Section_Id': 5,
          'Title': 'Computed Member Access'
        },
        {
          'Desciption': '',
          'Duration': '09:22',
          'Id': 37,
          'Section_Id': 5,
          'Title': 'Member Creation, Assignment & Deletion'
        },
        {
          'Desciption': '',
          'Duration': '15:51',
          'Id': 38,
          'Section_Id': 5,
          'Title': 'Array Modification'
        },
        {
          'Desciption': '',
          'Duration': '11:00',
          'Id': 39,
          'Section_Id': 5,
          'Title': 'Callable Objects'
        },
        {
          'Desciption': '',
          'Duration': '08:02',
          'Id': 40,
          'Section_Id': 5,
          'Title': 'Memory Hoisting'
        },
        {
          'Desciption': '',
          'Duration': '12:50',
          'Id': 41,
          'Section_Id': 5,
          'Title': 'Scope & Closures'
        },
        {
          'Desciption': '',
          'Duration': '09:55',
          'Id': 42,
          'Section_Id': 5,
          'Title': 'Inferred Globals & Scope'
        },
        {
          'Desciption': '',
          'Duration': '13:56',
          'Id': 43,
          'Section_Id': 5,
          'Title': 'This Context'
        },
        {
          'Desciption': '',
          'Duration': '10:35',
          'Id': 44,
          'Section_Id': 5,
          'Title': 'Constructors'
        },
        {
          'Desciption': '',
          'Duration': '07:06',
          'Id': 45,
          'Section_Id': 5,
          'Title': 'Prototype'
        },
        {
          'Desciption': '',
          'Duration': '09:32',
          'Id': 46,
          'Section_Id': 5,
          'Title': 'Constructors with Prototype'
        },
        {
          'Desciption': '',
          'Duration': '12:33',
          'Id': 47,
          'Section_Id': 6,
          'Title': 'Comparison Operators'
        },
        {
          'Desciption': '',
          'Duration': '15:21',
          'Id': 48,
          'Section_Id': 6,
          'Title': 'If Statements'
        },
        {
          'Desciption': '',
          'Duration': '14:41',
          'Id': 49,
          'Section_Id': 6,
          'Title': "For & For In Loop's"
        },
        {
          'Desciption': '',
          'Duration': '06:46',
          'Id': 50,
          'Section_Id': 6,
          'Title': 'Let ES6'
        },
        {
          'Desciption': '',
          'Duration': '09:12',
          'Id': 51,
          'Section_Id': 7,
          'Title': 'Understanding the Document Object Model'
        },
        {
          'Desciption': '',
          'Duration': '12:47',
          'Id': 52,
          'Section_Id': 7,
          'Title': 'Targeting DOM Element’s'
        },
        {
          'Desciption': '',
          'Duration': '16:22',
          'Id': 53,
          'Section_Id': 7,
          'Title': "Changing Element's Content's"
        },
        {
          'Desciption': '',
          'Duration': '12:39',
          'Id': 54,
          'Section_Id': 7,
          'Title': "Changing Element Style's"
        },
        {
          'Desciption': '',
          'Duration': '13:52',
          'Id': 55,
          'Section_Id': 7,
          'Title': 'Event Handlers'
        },
        {
          'Desciption': '',
          'Duration': '07:45',
          'Id': 56,
          'Section_Id': 7,
          'Title': "Create & appendChild & insertBefore method's"
        },
        {
          'Desciption': '',
          'Duration': '14:24',
          'Id': 57,
          'Section_Id': 7,
          'Title': 'Final Project'
        },
        {
          'Desciption': '',
          'Duration': '05:57',
          'Id': 58,
          'Section_Id': 8,
          'Title': 'Conclusion & Goodbye'
        },
        {
          'Desciption': '',
          'Duration': '00:59',
          'Id': 59,
          'Section_Id': 8,
          'Title': 'Bonus Lecture: Discount Courses'
        },
        {
          'Desciption': '',
          'Duration': '05:05',
          'Id': 60,
          'Section_Id': 9,
          'Title': 'Start the HTML of the website'
        },
        {
          'Desciption': '',
          'Duration': '03:23',
          'Id': 61,
          'Section_Id': 9,
          'Title': 'Using Font Awesome for adding plus and minus icons to our website'
        },
        {
          'Desciption': '',
          'Duration': '11:01',
          'Id': 62,
          'Section_Id': 9,
          'Title': 'Using CSS to style the title, button and the answere'
        },
        {
          'Desciption': '',
          'Duration': '11:11',
          'Id': 63,
          'Section_Id': 9,
          'Title': 'Start using JavaScript for toggling between classes'
        },
        {
          'Desciption': '',
          'Duration': '06:13',
          'Id': 64,
          'Section_Id': 10,
          'Title': 'Completing the HTML part'
        },
        {
          'Desciption': '',
          'Duration': '16:55',
          'Id': 65,
          'Section_Id': 10,
          'Title': 'Styling the website using CSS'
        },
        {
          'Desciption': '',
          'Duration': '14:56',
          'Id': 66,
          'Section_Id': 10,
          'Title': 'Adding functionality to the website using JavaScript'
        },
        {
          'Desciption': '',
          'Duration': '01:37',
          'Id': 67,
          'Section_Id': 11,
          'Title': "What you're going to get from this course?"
        },
        {
          'Desciption': '',
          'Duration': '03:54',
          'Id': 68,
          'Section_Id': 11,
          'Title': 'Installing VScode and adding extensions'
        },
        {
          'Desciption': '',
          'Duration': '04:54',
          'Id': 69,
          'Section_Id': 12,
          'Title': 'Start the project (HTML)'
        },
        {
          'Desciption': '',
          'Duration': '12:39',
          'Id': 70,
          'Section_Id': 12,
          'Title': 'CSS styling, Bootstrap and Font Awesome'
        },
        {
          'Desciption': '',
          'Duration': '06:21',
          'Id': 71,
          'Section_Id': 12,
          'Title': 'Adding functionality using Javascript'
        },
        {
          'Desciption': '',
          'Duration': '08:34',
          'Id': 72,
          'Section_Id': 12,
          'Title': 'Adding a Preloader'
        },
        {
          'Desciption': '',
          'Duration': '03:53',
          'Id': 73,
          'Section_Id': 13,
          'Title': 'HTML part'
        },
        {
          'Desciption': '',
          'Duration': '03:20',
          'Id': 74,
          'Section_Id': 13,
          'Title': 'CSS'
        },
        {
          'Desciption': '',
          'Duration': '02:55',
          'Id': 75,
          'Section_Id': 13,
          'Title': 'Bootstrap'
        },
        {
          'Desciption': '',
          'Duration': '03:51',
          'Id': 76,
          'Section_Id': 13,
          'Title': 'Font Awesome'
        },
        {
          'Desciption': '',
          'Duration': '06:55',
          'Id': 77,
          'Section_Id': 13,
          'Title': 'Javascript'
        },
        {
          'Desciption': '',
          'Duration': '05:34',
          'Id': 78,
          'Section_Id': 13,
          'Title': 'addEventListener method'
        },
        {
          'Desciption': '',
          'Duration': '02:31',
          'Id': 79,
          'Section_Id': 13,
          'Title': 'Adding color to the number'
        },
        {
          'Desciption': '',
          'Duration': '01:47',
          'Id': 80,
          'Section_Id': 14,
          'Title': 'Welcome!'
        },
        {
          'Desciption': '',
          'Duration': '01:24',
          'Id': 81,
          'Section_Id': 14,
          'Title': 'What is PHP?'
        },
        {
          'Desciption': '',
          'Duration': '01:08',
          'Id': 82,
          'Section_Id': 14,
          'Title': 'What does PHP do?'
        },
        {
          'Desciption': '',
          'Duration': '07:23',
          'Id': 83,
          'Section_Id': 14,
          'Title': 'Tools to Get Started'
        },
        {
          'Desciption': '',
          'Duration': '03:39',
          'Id': 84,
          'Section_Id': 14,
          'Title': 'The Course Files'
        },
        {
          'Desciption': '',
          'Duration': '2 questions',
          'Id': 85,
          'Section_Id': 14,
          'Title': 'PHP Pop Quiz!'
        },
        {
          'Desciption': '',
          'Duration': '08:00',
          'Id': 86,
          'Section_Id': 15,
          'Title': 'Your First PHP Web Page'
        },
        {
          'Desciption': '',
          'Duration': '03:17',
          'Id': 87,
          'Section_Id': 15,
          'Title': 'PHP Syntax'
        },
        {
          'Desciption': '',
          'Duration': '03:10',
          'Id': 88,
          'Section_Id': 15,
          'Title': 'PHP Variables'
        },
        {
          'Desciption': '',
          'Duration': '02:56',
          'Id': 89,
          'Section_Id': 15,
          'Title': 'More Variables'
        },
        {
          'Desciption': '',
          'Duration': '03:25',
          'Id': 90,
          'Section_Id': 15,
          'Title': 'Defining Constants'
        },
        {
          'Desciption': '',
          'Duration': '15:25',
          'Id': 91,
          'Section_Id': 15,
          'Title': 'Get Your Hands Dirty!'
        },
        {
          'Desciption': '',
          'Duration': '11:56',
          'Id': 92,
          'Section_Id': 16,
          'Title': 'PHP Arrays'
        },
        {
          'Desciption': '',
          'Duration': '09:52',
          'Id': 93,
          'Section_Id': 16,
          'Title': 'PHP Associative Arrays'
        },
        {
          'Desciption': '',
          'Duration': '10:35',
          'Id': 94,
          'Section_Id': 16,
          'Title': 'PHP Multi-Dimensional Arrays'
        },
        {
          'Desciption': '',
          'Duration': '12:07',
          'Id': 95,
          'Section_Id': 16,
          'Title': 'Get Your Hands Dirty!'
        },
        {
          'Desciption': '',
          'Duration': '08:23',
          'Id': 96,
          'Section_Id': 17,
          'Title': 'If Statements'
        },
        {
          'Desciption': '',
          'Duration': '07:18',
          'Id': 97,
          'Section_Id': 17,
          'Title': 'PHP Else'
        },
        {
          'Desciption': '',
          'Duration': '09:19',
          'Id': 98,
          'Section_Id': 17,
          'Title': 'PHP Elseif'
        },
        {
          'Desciption': '',
          'Duration': '11:37',
          'Id': 99,
          'Section_Id': 17,
          'Title': 'Get Your Hands Dirty!'
        },
        {
          'Desciption': '',
          'Duration': '19:12',
          'Id': 100,
          'Section_Id': 18,
          'Title': 'Comparison Operators'
        },
        {
          'Desciption': '',
          'Duration': '12:20',
          'Id': 101,
          'Section_Id': 18,
          'Title': 'Logical Operators'
        },
        {
          'Desciption': '',
          'Duration': '08:39',
          'Id': 102,
          'Section_Id': 18,
          'Title': 'Arithmetic Operators'
        },
        {
          'Desciption': '',
          'Duration': '07:00',
          'Id': 103,
          'Section_Id': 18,
          'Title': 'String Operators'
        },
        {
          'Desciption': '',
          'Duration': '07:54',
          'Id': 104,
          'Section_Id': 18,
          'Title': 'Assignment Operators'
        },
        {
          'Desciption': '',
          'Duration': '06:51',
          'Id': 105,
          'Section_Id': 19,
          'Title': 'While Loop'
        },
        {
          'Desciption': '',
          'Duration': '04:49',
          'Id': 106,
          'Section_Id': 19,
          'Title': 'For Loop'
        },
        {
          'Desciption': '',
          'Duration': '05:20',
          'Id': 107,
          'Section_Id': 19,
          'Title': 'Foreach Loop'
        },
        {
          'Desciption': '',
          'Duration': '04:22',
          'Id': 108,
          'Section_Id': 19,
          'Title': 'Do / While Loop'
        },
        {
          'Desciption': '',
          'Duration': '13:17',
          'Id': 109,
          'Section_Id': 20,
          'Title': 'Intro to PHP Functions'
        },
        {
          'Desciption': '',
          'Duration': '07:22',
          'Id': 110,
          'Section_Id': 20,
          'Title': 'Custom Functions'
        },
        {
          'Desciption': '',
          'Duration': '07:26',
          'Id': 111,
          'Section_Id': 20,
          'Title': 'Simple Arguments'
        },
        {
          'Desciption': '',
          'Duration': '05:09',
          'Id': 112,
          'Section_Id': 21,
          'Title': 'The Final Website'
        },
        {
          'Desciption': '',
          'Duration': '11:22',
          'Id': 113,
          'Section_Id': 21,
          'Title': 'Code a Basic Webpage Layout'
        },
        {
          'Desciption': '',
          'Duration': '13:42',
          'Id': 114,
          'Section_Id': 21,
          'Title': 'Templating a Global Header & Footer'
        },
        {
          'Desciption': '',
          'Duration': '14:21',
          'Id': 115,
          'Section_Id': 21,
          'Title': 'Dynamic Copyright & Hours of Operation'
        },
        {
          'Desciption': '',
          'Duration': '17:30',
          'Id': 116,
          'Section_Id': 21,
          'Title': 'Code a "Team Member" Array & Template'
        },
        {
          'Desciption': '',
          'Duration': '17:26',
          'Id': 117,
          'Section_Id': 21,
          'Title': 'Code a "Menu" Array & Template'
        },
        {
          'Desciption': '',
          'Duration': '01:49',
          'Id': 118,
          'Section_Id': 21,
          'Title': 'Understanding $_GET'
        },
        {
          'Desciption': '',
          'Duration': '15:55',
          'Id': 119,
          'Section_Id': 21,
          'Title': 'Code a "Menu Item" Dynamic Template'
        },
        {
          'Desciption': '',
          'Duration': '08:14',
          'Id': 120,
          'Section_Id': 21,
          'Title': 'Code a Simple Contact Form'
        },
        {
          'Desciption': '',
          'Duration': '01:35',
          'Id': 121,
          'Section_Id': 21,
          'Title': 'Understanding $_POST'
        },
        {
          'Desciption': '',
          'Duration': '14:02',
          'Id': 122,
          'Section_Id': 21,
          'Title': 'Simple Form Validation & Submission (Part 1)'
        },
        {
          'Desciption': '',
          'Duration': '15:31',
          'Id': 123,
          'Section_Id': 21,
          'Title': 'Simple Form Validation & Submission (Part 2)'
        },
        {
          'Desciption': '',
          'Duration': '04:01',
          'Id': 124,
          'Section_Id': 21,
          'Title': 'Uploading Your Website Live On The Web'
        },
        {
          'Desciption': '',
          'Duration': '01:59',
          'Id': 125,
          'Section_Id': 21,
          'Title': 'Wrap Up & Where to Go From Here!'
        },
        {
          'Desciption': '',
          'Duration': '02:49',
          'Id': 126,
          'Section_Id': 22,
          'Title': 'Welcome to R Basics'
        },
        {
          'Desciption': '',
          'Duration': '04:22',
          'Id': 127,
          'Section_Id': 22,
          'Title': 'Download R and RStudio'
        },
        {
          'Desciption': '',
          'Duration': '18:26',
          'Id': 128,
          'Section_Id': 22,
          'Title': 'RStudio Orientation'
        },
        {
          'Desciption': '',
          'Duration': '05:08',
          'Id': 129,
          'Section_Id': 22,
          'Title': 'Course Script'
        },
        {
          'Desciption': '',
          'Duration': '14:33',
          'Id': 130,
          'Section_Id': 22,
          'Title': 'The Structure of the R Ecosystem'
        },
        {
          'Desciption': '',
          'Duration': '17:49',
          'Id': 131,
          'Section_Id': 22,
          'Title': 'R Help Features'
        },
        {
          'Desciption': '',
          'Duration': '11:01',
          'Id': 132,
          'Section_Id': 22,
          'Title': 'Using R Functions'
        },
        {
          'Desciption': '',
          'Duration': '02:39',
          'Id': 133,
          'Section_Id': 22,
          'Title': 'Practice R - the R Exercise Database'
        },
        {
          'Desciption': '',
          'Duration': '11:03',
          'Id': 134,
          'Section_Id': 22,
          'Title': 'Three Common Mistakes of R Beginners'
        },
        {
          'Desciption': '',
          'Duration': '14:38',
          'Id': 135,
          'Section_Id': 23,
          'Title': 'Your First Lines of R Code'
        },
        {
          'Desciption': '',
          'Duration': '12:59',
          'Id': 136,
          'Section_Id': 23,
          'Title': 'Using Some Basic Functions'
        },
        {
          'Desciption': '',
          'Duration': '06:16',
          'Id': 137,
          'Section_Id': 23,
          'Title': 'Exercise and Solution - Basic Coding'
        },
        {
          'Desciption': '',
          'Duration': '06:39',
          'Id': 138,
          'Section_Id': 23,
          'Title': 'Functions and Loops'
        },
        {
          'Desciption': '',
          'Duration': '09:26',
          'Id': 139,
          'Section_Id': 23,
          'Title': 'R Datasets and Data.Frames'
        },
        {
          'Desciption': '',
          'Duration': '06:04',
          'Id': 140,
          'Section_Id': 23,
          'Title': 'Importing CSV Files'
        },
        {
          'Desciption': '',
          'Duration': '07:53',
          'Id': 141,
          'Section_Id': 23,
          'Title': 'Advanced Data Import - Bonus Material from the Data Pre-Processing Course'
        },
        {
          'Desciption': '',
          'Duration': '12:38',
          'Id': 142,
          'Section_Id': 23,
          'Title': 'How to Best Structure Your R Learning Experience'
        },
        {
          'Desciption': '',
          'Duration': '10:52',
          'Id': 143,
          'Section_Id': 23,
          'Title': 'R Base Graphs'
        },
        {
          'Desciption': '',
          'Duration': '15:41',
          'Id': 144,
          'Section_Id': 23,
          'Title': 'R Base Graphs 2'
        },
        {
          'Desciption': '',
          'Duration': '03:10',
          'Id': 145,
          'Section_Id': 23,
          'Title': 'Exercise and Solution - R Base Graphs'
        },
        {
          'Desciption': '',
          'Duration': '05:13',
          'Id': 146,
          'Section_Id': 24,
          'Title': 'Loading your csv files in R; Working directories'
        },
        {
          'Desciption': '',
          'Duration': '05:19',
          'Id': 147,
          'Section_Id': 24,
          'Title': 'Course R Level 1: Intro to the apply family of functions'
        },
        {
          'Desciption': '',
          'Duration': '06:29',
          'Id': 148,
          'Section_Id': 24,
          'Title': 'Course Statistics in R: Tests for normality, Exercise and solution'
        },
        {
          'Desciption': '',
          'Duration': '03:31',
          'Id': 149,
          'Section_Id': 24,
          'Title': 'Course Graphs in R: Lattice package plots'
        },
        {
          'Desciption': '',
          'Duration': '12:08',
          'Id': 150,
          'Section_Id': 24,
          'Title': 'Course Twitter Text Mining: Exercise and solution sentiment analysis'
        },
        {
          'Desciption': '',
          'Duration': '05:51',
          'Id': 151,
          'Section_Id': 24,
          'Title': 'Course Machine Learning: KNN Classification'
        },
        {
          'Desciption': '',
          'Duration': '05:43',
          'Id': 152,
          'Section_Id': 24,
          'Title': 'Course Machine Learning: Linear Discriminant Analysis'
        },
        {
          'Desciption': '',
          'Duration': '13:15',
          'Id': 153,
          'Section_Id': 24,
          'Title': 'Course Career Guide: Statistical Software Packages - Alternatives to R'
        },
        {
          'Desciption': '',
          'Duration': '00:30',
          'Id': 154,
          'Section_Id': 24,
          'Title': 'Where to get more info'
        },
        {
          'Desciption': '',
          'Duration': '04:36',
          'Id': 155,
          'Section_Id': 25,
          'Title': 'Welcome'
        },
        {
          'Desciption': '',
          'Duration': '09:32',
          'Id': 156,
          'Section_Id': 25,
          'Title': 'What is Data Science and Machine Learning?'
        },
        {
          'Desciption': '',
          'Duration': '05:06',
          'Id': 157,
          'Section_Id': 26,
          'Title': 'Getting Started with Python and Scikit-Learn'
        },
        {
          'Desciption': '',
          'Duration': '08:53',
          'Id': 158,
          'Section_Id': 26,
          'Title': 'Types of Machine learning algorithms'
        },
        {
          'Desciption': '',
          'Duration': '08:49',
          'Id': 159,
          'Section_Id': 26,
          'Title': 'Playing Around with Anaconda and Jupyter'
        },
        {
          'Desciption': '',
          'Duration': '10:44',
          'Id': 160,
          'Section_Id': 26,
          'Title': 'Playing with some Python Code'
        },
        {
          'Desciption': '',
          'Duration': '13:36',
          'Id': 161,
          'Section_Id': 27,
          'Title': 'Fitting a Machine Learning Model (KNN Algorithm) - Part 1'
        },
        {
          'Desciption': '',
          'Duration': '20:27',
          'Id': 162,
          'Section_Id': 27,
          'Title': 'Fitting a Machine Learning Model (KNN Algorithm) Part 2'
        },
        {
          'Desciption': '',
          'Duration': '14:54',
          'Id': 163,
          'Section_Id': 27,
          'Title': 'Fitting a Machine Learning Model (Logistic Regression Algorithm)'
        },
        {
          'Desciption': '',
          'Duration': '23:40',
          'Id': 164,
          'Section_Id': 27,
          'Title': 'Validation using Model Selection (Train and Test)'
        },
        {
          'Desciption': '',
          'Duration': '19:53',
          'Id': 165,
          'Section_Id': 27,
          'Title': 'Finalizing Your optimum algorithm (K-Fold Cross Validation)'
        },
        {
          'Desciption': '',
          'Duration': '11:44',
          'Id': 166,
          'Section_Id': 27,
          'Title': "Data Science - What's Next?"
        },
        {
          'Desciption': '',
          'Duration': '03:38',
          'Id': 167,
          'Section_Id': 28,
          'Title': "What's the Course About? What will I Learn?"
        },
        {
          'Desciption': '',
          'Duration': '04:54',
          'Id': 168,
          'Section_Id': 28,
          'Title': 'Instructor Q & A'
        },
        {
          'Desciption': '',
          'Duration': '04:16',
          'Id': 169,
          'Section_Id': 28,
          'Title': 'Machine Learning Vernacular'
        },
        {
          'Desciption': '',
          'Duration': '00:12',
          'Id': 170,
          'Section_Id': 28,
          'Title': 'Must Know Terms Quiz'
        },
        {
          'Desciption': '',
          'Duration': '04:33',
          'Id': 171,
          'Section_Id': 28,
          'Title': 'The Machine Modeling Process'
        },
        {
          'Desciption': '',
          'Duration': '04:15',
          'Id': 172,
          'Section_Id': 28,
          'Title': 'Installing Python 3.X'
        },
        {
          'Desciption': '',
          'Duration': '06:56',
          'Id': 173,
          'Section_Id': 28,
          'Title': 'Jupyter Notebook Anatomy'
        },
        {
          'Desciption': '',
          'Duration': '01:25',
          'Id': 174,
          'Section_Id': 28,
          'Title': 'Course Downloads'
        },
        {
          'Desciption': '',
          'Duration': '00:57',
          'Id': 175,
          'Section_Id': 28,
          'Title': 'Summary'
        },
        {
          'Desciption': '',
          'Duration': '10 questions',
          'Id': 176,
          'Section_Id': 28,
          'Title': 'Quiz'
        },
        {
          'Desciption': '',
          'Duration': '06:04',
          'Id': 177,
          'Section_Id': 29,
          'Title': 'Import Pandas and Manipulate Data'
        },
        {
          'Desciption': '',
          'Duration': '05:08',
          'Id': 178,
          'Section_Id': 29,
          'Title': 'Importing a CSV in Pandas'
        },
        {
          'Desciption': '',
          'Duration': '05:03',
          'Id': 179,
          'Section_Id': 29,
          'Title': 'Remove Columns and Sort Some Data'
        },
        {
          'Desciption': '',
          'Duration': '01:54',
          'Id': 180,
          'Section_Id': 29,
          'Title': 'Learning Tip'
        },
        {
          'Desciption': '',
          'Duration': '00:56',
          'Id': 181,
          'Section_Id': 29,
          'Title': 'Summary'
        },
        {
          'Desciption': '',
          'Duration': '5 questions',
          'Id': 182,
          'Section_Id': 29,
          'Title': 'Quiz'
        },
        {
          'Desciption': '',
          'Duration': '04:21',
          'Id': 183,
          'Section_Id': 30,
          'Title': 'Anatomy of an Array'
        },
        {
          'Desciption': '',
          'Duration': '03:52',
          'Id': 184,
          'Section_Id': 30,
          'Title': 'Creating Arrays'
        },
        {
          'Desciption': '',
          'Duration': '03:26',
          'Id': 185,
          'Section_Id': 30,
          'Title': 'Accessing Elements in Our Array'
        },
        {
          'Desciption': '',
          'Duration': '00:51',
          'Id': 186,
          'Section_Id': 30,
          'Title': 'Summary'
        },
        {
          'Desciption': '',
          'Duration': '8 questions',
          'Id': 187,
          'Section_Id': 30,
          'Title': 'Quiz'
        },
        {
          'Desciption': '',
          'Duration': '03:23',
          'Id': 188,
          'Section_Id': 31,
          'Title': 'What is SciKit-Learn?'
        },
        {
          'Desciption': '',
          'Duration': '00:44',
          'Id': 189,
          'Section_Id': 31,
          'Title': 'Data Sets'
        },
        {
          'Desciption': '',
          'Duration': '05:06',
          'Id': 190,
          'Section_Id': 31,
          'Title': 'An End to End Model'
        },
        {
          'Desciption': '',
          'Duration': '03:40',
          'Id': 191,
          'Section_Id': 31,
          'Title': 'Anatomy of an End to End Model'
        },
        {
          'Desciption': '',
          'Duration': '00:22',
          'Id': 192,
          'Section_Id': 31,
          'Title': 'What Does Accuracy Mean?'
        },
        {
          'Desciption': '',
          'Duration': '00:49',
          'Id': 193,
          'Section_Id': 31,
          'Title': 'Summary'
        },
        {
          'Desciption': '',
          'Duration': '5 questions',
          'Id': 194,
          'Section_Id': 31,
          'Title': 'Quiz'
        },
        {
          'Desciption': '',
          'Duration': '04:45',
          'Id': 195,
          'Section_Id': 32,
          'Title': 'The line and Scatter Plot'
        },
        {
          'Desciption': '',
          'Duration': '03:32',
          'Id': 196,
          'Section_Id': 32,
          'Title': 'The Histogram'
        },
        {
          'Desciption': '',
          'Duration': '01:09',
          'Id': 197,
          'Section_Id': 32,
          'Title': 'Summary'
        },
        {
          'Desciption': '',
          'Duration': '6 questions',
          'Id': 198,
          'Section_Id': 32,
          'Title': 'Quiz'
        },
        {
          'Desciption': '',
          'Duration': '04:39',
          'Id': 199,
          'Section_Id': 33,
          'Title': 'What is NLP and NTLK?'
        },
        {
          'Desciption': '',
          'Duration': '02:44',
          'Id': 200,
          'Section_Id': 33,
          'Title': 'What is Tokenization?'
        },
        {
          'Desciption': '',
          'Duration': '04:20',
          'Id': 201,
          'Section_Id': 33,
          'Title': 'Word and Sentence Tokenization'
        },
        {
          'Desciption': '',
          'Duration': '00:45',
          'Id': 202,
          'Section_Id': 33,
          'Title': 'Summary'
        },
        {
          'Desciption': '',
          'Duration': '5 questions',
          'Id': 203,
          'Section_Id': 33,
          'Title': 'Quiz'
        },
        {
          'Desciption': '',
          'Duration': '00:21',
          'Id': 204,
          'Section_Id': 33,
          'Title': 'Bonus Lecture "The Complete Course for Machine Learning Engineers"'
        },
        {
          'Desciption': '',
          'Duration': '02:19',
          'Id': 205,
          'Section_Id': 34,
          'Title': 'Introduction'
        },
        {
          'Desciption': '',
          'Duration': '02:57',
          'Id': 206,
          'Section_Id': 34,
          'Title': 'Installing R and RStudio'
        },
        {
          'Desciption': '',
          'Duration': '02:06',
          'Id': 207,
          'Section_Id': 34,
          'Title': 'A Tour of RStudio'
        },
        {
          'Desciption': '',
          'Duration': '06:32',
          'Id': 208,
          'Section_Id': 34,
          'Title': 'Vectors in R'
        },
        {
          'Desciption': '',
          'Duration': '03:35',
          'Id': 209,
          'Section_Id': 34,
          'Title': 'Data Frames'
        },
        {
          'Desciption': '',
          'Duration': '02:52',
          'Id': 210,
          'Section_Id': 35,
          'Title': 'Installing ggplot2'
        },
        {
          'Desciption': '',
          'Duration': '08:31',
          'Id': 211,
          'Section_Id': 35,
          'Title': 'Plotting a point with ggplot'
        },
        {
          'Desciption': '',
          'Duration': '09:00',
          'Id': 212,
          'Section_Id': 35,
          'Title': 'Controlling axis properties'
        },
        {
          'Desciption': '',
          'Duration': '04:22',
          'Id': 213,
          'Section_Id': 35,
          'Title': 'More with color and shape'
        },
        {
          'Desciption': '',
          'Duration': '05:11',
          'Id': 214,
          'Section_Id': 35,
          'Title': 'Graphing lines with ggplot'
        },
        {
          'Desciption': '',
          'Duration': '06:10',
          'Id': 215,
          'Section_Id': 35,
          'Title': 'More with lines'
        },
        {
          'Desciption': '',
          'Duration': '05:20',
          'Id': 216,
          'Section_Id': 36,
          'Title': 'Normal populations'
        },
        {
          'Desciption': '',
          'Duration': '06:11',
          'Id': 217,
          'Section_Id': 36,
          'Title': 'Plotting a vertical sample'
        },
        {
          'Desciption': '',
          'Duration': '08:47',
          'Id': 218,
          'Section_Id': 36,
          'Title': 'Plotting several vertical samples'
        },
        {
          'Desciption': '',
          'Duration': '08:59',
          'Id': 219,
          'Section_Id': 36,
          'Title': 'Samples along a line'
        },
        {
          'Desciption': '',
          'Duration': '03:47',
          'Id': 220,
          'Section_Id': 36,
          'Title': 'sapply'
        },
        {
          'Desciption': '',
          'Duration': '10:04',
          'Id': 221,
          'Section_Id': 36,
          'Title': 'Cloud of points'
        },
        {
          'Desciption': '',
          'Duration': '05:42',
          'Id': 222,
          'Section_Id': 37,
          'Title': 'Father and son heights'
        },
        {
          'Desciption': '',
          'Duration': '02:19',
          'Id': 223,
          'Section_Id': 37,
          'Title': 'Equation of a line'
        },
        {
          'Desciption': '',
          'Duration': '12:09',
          'Id': 224,
          'Section_Id': 37,
          'Title': 'Residual visualization'
        },
        {
          'Desciption': '',
          'Duration': '04:57',
          'Id': 225,
          'Section_Id': 37,
          'Title': 'Sum of squared residuals'
        },
        {
          'Desciption': '',
          'Duration': '05:07',
          'Id': 226,
          'Section_Id': 37,
          'Title': 'The least squares line'
        },
        {
          'Desciption': '',
          'Duration': '03:02',
          'Id': 227,
          'Section_Id': 37,
          'Title': 'Prediction'
        },
        {
          'Desciption': '',
          'Duration': '02:35',
          'Id': 228,
          'Section_Id': 37,
          'Title': 'Reading in Excel files'
        },
        {
          'Desciption': '',
          'Duration': '01:08',
          'Id': 229,
          'Section_Id': 37,
          'Title': 'Course wrap-up'
        },
        {
          'Desciption': '',
          'Duration': '06:50',
          'Id': 230,
          'Section_Id': 38,
          'Title': 'Introduction to Artificial Intelligence'
        },
        {
          'Desciption': '',
          'Duration': '5 questions',
          'Id': 231,
          'Section_Id': 38,
          'Title': 'Introduction to Artificial Intelligence'
        },
        {
          'Desciption': '',
          'Duration': '07:26',
          'Id': 232,
          'Section_Id': 39,
          'Title': 'Programming and Mathematics Requirements'
        },
        {
          'Desciption': '',
          'Duration': '05:43',
          'Id': 233,
          'Section_Id': 39,
          'Title': 'Machine Learning Algorithms and AI Engine Requirements'
        },
        {
          'Desciption': '',
          'Duration': '3 questions',
          'Id': 234,
          'Section_Id': 39,
          'Title': 'Road Map Quiz'
        },
        {
          'Desciption': '',
          'Duration': '07:47',
          'Id': 235,
          'Section_Id': 40,
          'Title': 'Introduction to Machine Learning'
        },
        {
          'Desciption': '',
          'Duration': '4 questions',
          'Id': 236,
          'Section_Id': 40,
          'Title': 'Introduction to Machine Learning'
        },
        {
          'Desciption': '',
          'Duration': '07:16',
          'Id': 237,
          'Section_Id': 41,
          'Title': 'Supervised Machine Learning'
        },
        {
          'Desciption': '',
          'Duration': '7 questions',
          'Id': 238,
          'Section_Id': 41,
          'Title': 'Supervised Machine Learning'
        },
        {
          'Desciption': '',
          'Duration': '05:16',
          'Id': 239,
          'Section_Id': 41,
          'Title': 'Unsupervised Machine Learning'
        },
        {
          'Desciption': '',
          'Duration': '4 questions',
          'Id': 240,
          'Section_Id': 41,
          'Title': 'Unsupervised Machine Learning'
        },
        {
          'Desciption': '',
          'Duration': '08:24',
          'Id': 241,
          'Section_Id': 41,
          'Title': 'Reinforcement Machine Learning'
        },
        {
          'Desciption': '',
          'Duration': '7 questions',
          'Id': 242,
          'Section_Id': 41,
          'Title': 'Reinforcement Machine Learning'
        },
        {
          'Desciption': '',
          'Duration': '01:32',
          'Id': 243,
          'Section_Id': 42,
          'Title': 'Introduction'
        },
        {
          'Desciption': '',
          'Duration': '05:53',
          'Id': 244,
          'Section_Id': 42,
          'Title': 'How to set up Android Studio and Android simulators'
        },
        {
          'Desciption': '',
          'Duration': '02:53',
          'Id': 245,
          'Section_Id': 43,
          'Title': 'How to create a new Android project in Android Studio'
        },
        {
          'Desciption': '',
          'Duration': '03:58',
          'Id': 246,
          'Section_Id': 43,
          'Title': 'How to configure the main screen of an Android app (activity_main.xml)'
        },
        {
          'Desciption': '',
          'Duration': '08:42',
          'Id': 247,
          'Section_Id': 43,
          'Title': 'How to write Java code inside MainActivity.java'
        },
        {
          'Desciption': '',
          'Duration': '02:55',
          'Id': 248,
          'Section_Id': 44,
          'Title': 'Bonus 1: How to add an alpha animation to an Android button'
        },
        {
          'Desciption': '',
          'Duration': '02:37',
          'Id': 249,
          'Section_Id': 44,
          'Title': 'Bonus 2: How to debug an Android app'
        },
        {
          'Desciption': '',
          'Duration': '01:32',
          'Id': 250,
          'Section_Id': 44,
          'Title': 'Farewell and your next steps in Android Development'
        },
        {
          'Desciption': '',
          'Duration': '00:06',
          'Id': 251,
          'Section_Id': 44,
          'Title': 'BONUS: Your Next Course Awaits'
        },
        {
          'Desciption': '',
          'Duration': '01:53',
          'Id': 252,
          'Section_Id': 45,
          'Title': 'How to Install Flutter on Android Studio'
        },
        {
          'Desciption': '',
          'Duration': '02:20',
          'Id': 253,
          'Section_Id': 45,
          'Title': 'First Flutter Application'
        },
        {
          'Desciption': '',
          'Duration': '02:53',
          'Id': 254,
          'Section_Id': 46,
          'Title': 'StatelessWidget Class'
        },
        {
          'Desciption': '',
          'Duration': '06:11',
          'Id': 255,
          'Section_Id': 46,
          'Title': 'StatefullWidget Class'
        },
        {
          'Desciption': '',
          'Duration': '06:37',
          'Id': 256,
          'Section_Id': 47,
          'Title': 'Container Widget'
        },
        {
          'Desciption': '',
          'Duration': '04:19',
          'Id': 257,
          'Section_Id': 47,
          'Title': 'Row & Column Widget'
        },
        {
          'Desciption': '',
          'Duration': '01:45',
          'Id': 258,
          'Section_Id': 47,
          'Title': 'Basic List Widget'
        },
        {
          'Desciption': '',
          'Duration': '03:16',
          'Id': 259,
          'Section_Id': 47,
          'Title': 'List Widget (Array of List)'
        },
        {
          'Desciption': '',
          'Duration': '02:11',
          'Id': 260,
          'Section_Id': 47,
          'Title': 'Stack'
        },
        {
          'Desciption': '',
          'Duration': '03:42',
          'Id': 261,
          'Section_Id': 47,
          'Title': 'Gridview'
        },
        {
          'Desciption': '',
          'Duration': '03:49',
          'Id': 262,
          'Section_Id': 48,
          'Title': "Basic : Create AppBar & It's Basic Properties"
        },
        {
          'Desciption': '',
          'Duration': '05:59',
          'Id': 263,
          'Section_Id': 48,
          'Title': 'AppBar Leading & Actions[]'
        },
        {
          'Desciption': '',
          'Duration': '06:04',
          'Id': 264,
          'Section_Id': 48,
          'Title': 'Tabbar : Top & Bottom'
        },
        {
          'Desciption': '',
          'Duration': '01:27',
          'Id': 265,
          'Section_Id': 49,
          'Title': 'Custom Method Widget'
        },
        {
          'Desciption': '',
          'Duration': '03:30',
          'Id': 266,
          'Section_Id': 49,
          'Title': 'Custom Class Widget'
        },
        {
          'Desciption': '',
          'Duration': '04:44',
          'Id': 267,
          'Section_Id': 50,
          'Title': 'TextField Widget'
        },
        {
          'Desciption': '',
          'Duration': '04:18',
          'Id': 268,
          'Section_Id': 50,
          'Title': 'Buttons Widget'
        },
        {
          'Desciption': '',
          'Duration': '02:11',
          'Id': 269,
          'Section_Id': 50,
          'Title': 'CheckBox Widget'
        },
        {
          'Desciption': '',
          'Duration': '04:06',
          'Id': 270,
          'Section_Id': 50,
          'Title': 'Radio Widget'
        },
        {
          'Desciption': '',
          'Duration': '04:54',
          'Id': 271,
          'Section_Id': 50,
          'Title': 'Slider Widget'
        },
        {
          'Desciption': '',
          'Duration': '02:44',
          'Id': 272,
          'Section_Id': 50,
          'Title': 'Switch Widget'
        },
        {
          'Desciption': '',
          'Duration': '05:56',
          'Id': 273,
          'Section_Id': 51,
          'Title': 'Simple Drawer Widgets'
        },
        {
          'Desciption': '',
          'Duration': '04:00',
          'Id': 274,
          'Section_Id': 51,
          'Title': 'Routes'
        },
        {
          'Desciption': '',
          'Duration': '03:48',
          'Id': 275,
          'Section_Id': 52,
          'Title': 'SnackBar'
        },
        {
          'Desciption': '',
          'Duration': '03:49',
          'Id': 276,
          'Section_Id': 52,
          'Title': 'Alert Dialog'
        },
        {
          'Desciption': '',
          'Duration': '04:25',
          'Id': 277,
          'Section_Id': 52,
          'Title': 'Simple Dialog'
        },
        {
          'Desciption': '',
          'Duration': '01:47',
          'Id': 278,
          'Section_Id': 53,
          'Title': 'Course Objective - For Whom and What to expect ?'
        },
        {
          'Desciption': '',
          'Duration': '19:20',
          'Id': 279,
          'Section_Id': 53,
          'Title': 'Setting up Android Studio !'
        },
        {
          'Desciption': '',
          'Duration': '01:31',
          'Id': 280,
          'Section_Id': 53,
          'Title': 'What is a Layout !?'
        },
        {
          'Desciption': '',
          'Duration': '17:25',
          'Id': 281,
          'Section_Id': 53,
          'Title': 'A few important concepts to know ! View , Pixels & dp.'
        },
        {
          'Desciption': '',
          'Duration': '16:39',
          'Id': 282,
          'Section_Id': 53,
          'Title': 'A few important concepts to know ! Padding & Margin'
        },
        {
          'Desciption': '',
          'Duration': '17:49',
          'Id': 283,
          'Section_Id': 53,
          'Title': 'A few important concepts to know ! wrap_content , match_parent & gravity.'
        },
        {
          'Desciption': '',
          'Duration': '6 questions',
          'Id': 284,
          'Section_Id': 53,
          'Title': "Let's not forget the basics... Quiz"
        },
        {
          'Desciption': '',
          'Duration': '12:07',
          'Id': 285,
          'Section_Id': 53,
          'Title': '2 Most important types of Layouts'
        },
        {
          'Desciption': '',
          'Duration': '19:17',
          'Id': 286,
          'Section_Id': 53,
          'Title': 'Writing Layouts on XML.'
        },
        {
          'Desciption': '',
          'Duration': '09:41',
          'Id': 287,
          'Section_Id': 53,
          'Title': 'Using a Relative Layout to design a particular screen.'
        },
        {
          'Desciption': '',
          'Duration': '10:55',
          'Id': 288,
          'Section_Id': 53,
          'Title': 'Your First App ! Designing the Layout'
        },
        {
          'Desciption': '',
          'Duration': '11:49',
          'Id': 289,
          'Section_Id': 53,
          'Title': 'Your First App ! Coding with Java'
        },
        {
          'Desciption': '',
          'Duration': '4 questions',
          'Id': 290,
          'Section_Id': 53,
          'Title': 'Quiz 2: Android Studio - XML & JAVA'
        },
        {
          'Desciption': '',
          'Duration': '14:17',
          'Id': 291,
          'Section_Id': 54,
          'Title': 'Enhancements in Oreo'
        },
        {
          'Desciption': '',
          'Duration': '09:48',
          'Id': 292,
          'Section_Id': 54,
          'Title': 'Enhancements in Nougat'
        },
        {
          'Desciption': '',
          'Duration': '10:31',
          'Id': 293,
          'Section_Id': 54,
          'Title': 'Enhancements in Marshmallow'
        },
        {
          'Desciption': '',
          'Duration': '09:48',
          'Id': 294,
          'Section_Id': 54,
          'Title': 'Enhancements in Lollipop'
        },
        {
          'Desciption': '',
          'Duration': '02:41',
          'Id': 295,
          'Section_Id': 55,
          'Title': 'Introduction'
        },
        {
          'Desciption': '',
          'Duration': '01:10',
          'Id': 296,
          'Section_Id': 56,
          'Title': 'Introduction to Setup'
        },
        {
          'Desciption': '',
          'Duration': '02:54',
          'Id': 297,
          'Section_Id': 56,
          'Title': 'How to Set Up Xcode 8 and Swift 3'
        },
        {
          'Desciption': '',
          'Duration': '01:36',
          'Id': 298,
          'Section_Id': 56,
          'Title': 'How to Set Up iOS 10 Simulators'
        },
        {
          'Desciption': '',
          'Duration': '02:30',
          'Id': 299,
          'Section_Id': 57,
          'Title': 'Introduction to Swift 3'
        },
        {
          'Desciption': '',
          'Duration': '00:46',
          'Id': 300,
          'Section_Id': 57,
          'Title': 'Interlude'
        },
        {
          'Desciption': '',
          'Duration': '02:18',
          'Id': 301,
          'Section_Id': 57,
          'Title': 'Set up a Playground in Swift 3'
        },
        {
          'Desciption': '',
          'Duration': '07:17',
          'Id': 302,
          'Section_Id': 57,
          'Title': 'Variables in Swift 3'
        },
        {
          'Desciption': '',
          'Duration': '07:37',
          'Id': 303,
          'Section_Id': 57,
          'Title': 'Collections - Arrays in Swift 3'
        },
        {
          'Desciption': '',
          'Duration': '04:21',
          'Id': 304,
          'Section_Id': 57,
          'Title': 'Collections - Sets in Swift 3'
        },
        {
          'Desciption': '',
          'Duration': '04:50',
          'Id': 305,
          'Section_Id': 57,
          'Title': 'Collections - Dictionaries in Swift 3'
        },
        {
          'Desciption': '',
          'Duration': '2 questions',
          'Id': 306,
          'Section_Id': 57,
          'Title': 'Swift 3 Questions - Part 1'
        },
        {
          'Desciption': '',
          'Duration': '05:58',
          'Id': 307,
          'Section_Id': 57,
          'Title': 'Logic - If Else and Switch Case in Swift 3'
        },
        {
          'Desciption': '',
          'Duration': '07:07',
          'Id': 308,
          'Section_Id': 57,
          'Title': 'Round and Round - Loops in Swift 3'
        },
        {
          'Desciption': '',
          'Duration': '2 questions',
          'Id': 309,
          'Section_Id': 57,
          'Title': 'Swift 3 Questions - Part 2'
        },
        {
          'Desciption': '',
          'Duration': '06:48',
          'Id': 310,
          'Section_Id': 57,
          'Title': 'Functions in Swift 3'
        },
        {
          'Desciption': '',
          'Duration': '06:29',
          'Id': 311,
          'Section_Id': 57,
          'Title': 'Optionals in Swift 3'
        },
        {
          'Desciption': '',
          'Duration': '2 questions',
          'Id': 312,
          'Section_Id': 57,
          'Title': 'Swift 3 Questions - Part 3'
        },
        {
          'Desciption': '',
          'Duration': '06:08',
          'Id': 313,
          'Section_Id': 57,
          'Title': 'Classes and Objects in Swift 3'
        },
        {
          'Desciption': '',
          'Duration': '04:27',
          'Id': 314,
          'Section_Id': 57,
          'Title': 'Inheritance in Swift 3'
        },
        {
          'Desciption': '',
          'Duration': '2 questions',
          'Id': 315,
          'Section_Id': 57,
          'Title': 'Swift 3 Questions - Part 4'
        },
        {
          'Desciption': '',
          'Duration': '01:15',
          'Id': 316,
          'Section_Id': 57,
          'Title': 'Summary of Swift 3'
        },
        {
          'Desciption': '',
          'Duration': '03:43',
          'Id': 317,
          'Section_Id': 58,
          'Title': 'Introduction to Your First iOS 10 App'
        },
        {
          'Desciption': '',
          'Duration': '09:14',
          'Id': 318,
          'Section_Id': 58,
          'Title': 'An Astronomy Screen Torch - Storyboards'
        },
        {
          'Desciption': '',
          'Duration': '04:03',
          'Id': 319,
          'Section_Id': 58,
          'Title': 'An Astronomy Screen Torch - View Controller Code'
        },
        {
          'Desciption': '',
          'Duration': '06:24',
          'Id': 320,
          'Section_Id': 58,
          'Title': 'An Astronomy Screen Torch - Buttons and Outlets'
        },
        {
          'Desciption': '',
          'Duration': '03:55',
          'Id': 321,
          'Section_Id': 58,
          'Title': 'An Astronomy Screen Torch - Storyboard Element Positioning'
        },
        {
          'Desciption': '',
          'Duration': '01:11',
          'Id': 322,
          'Section_Id': 58,
          'Title': 'Create an Astronomy Screen Torch - Assignment'
        },
        {
          'Desciption': '',
          'Duration': '03:38',
          'Id': 323,
          'Section_Id': 58,
          'Title': 'Create an Astronomy Screen Torch - Solution'
        },
        {
          'Desciption': '',
          'Duration': '01:47',
          'Id': 324,
          'Section_Id': 58,
          'Title': 'Summary of Your First iOS 10 App'
        },
        {
          'Desciption': '',
          'Duration': '00:02',
          'Id': 325,
          'Section_Id': 58,
          'Title': 'Astro Torch Source Code'
        },
        {
          'Desciption': '',
          'Duration': '01:08',
          'Id': 326,
          'Section_Id': 59,
          'Title': 'Introduction to Temperature Converter'
        },
        {
          'Desciption': '',
          'Duration': '09:29',
          'Id': 327,
          'Section_Id': 59,
          'Title': 'Making the Main Screen of our Temperature Converter'
        },
        {
          'Desciption': '',
          'Duration': '06:51',
          'Id': 328,
          'Section_Id': 59,
          'Title': 'Connecting the Main Screen of Temperature Converter to Code'
        },
        {
          'Desciption': '',
          'Duration': '05:46',
          'Id': 329,
          'Section_Id': 59,
          'Title': 'Writing the Main Code of our Temperature Converter App'
        },
        {
          'Desciption': '',
          'Duration': '01:11',
          'Id': 330,
          'Section_Id': 59,
          'Title': 'Temperature Converter - Assignment'
        },
        {
          'Desciption': '',
          'Duration': '08:52',
          'Id': 331,
          'Section_Id': 59,
          'Title': 'Temperature Converter - Solution'
        },
        {
          'Desciption': '',
          'Duration': '01:36',
          'Id': 332,
          'Section_Id': 59,
          'Title': 'Summary of Temperature Converter'
        },
        {
          'Desciption': '',
          'Duration': '01:08',
          'Id': 333,
          'Section_Id': 60,
          'Title': 'Introduction to Calculator'
        },
        {
          'Desciption': '',
          'Duration': '11:45',
          'Id': 334,
          'Section_Id': 60,
          'Title': 'Making our Calculator Screen - Images, Image Sets and Buttons'
        },
        {
          'Desciption': '',
          'Duration': '07:39',
          'Id': 335,
          'Section_Id': 60,
          'Title': 'Making of our Calculator Screen - Stack Layouts'
        },
        {
          'Desciption': '',
          'Duration': '12:38',
          'Id': 336,
          'Section_Id': 60,
          'Title': 'Connecting Calculator Screen to Code'
        },
        {
          'Desciption': '',
          'Duration': '07:09',
          'Id': 337,
          'Section_Id': 60,
          'Title': 'Storing things with Enums'
        },
        {
          'Desciption': '',
          'Duration': '18:33',
          'Id': 338,
          'Section_Id': 60,
          'Title': 'Writing the Basic Code of our Calculator'
        },
        {
          'Desciption': '',
          'Duration': '00:51',
          'Id': 339,
          'Section_Id': 60,
          'Title': 'Calculator - Homework'
        },
        {
          'Desciption': '',
          'Duration': '06:38',
          'Id': 340,
          'Section_Id': 60,
          'Title': 'Calculator- Solution'
        },
        {
          'Desciption': '',
          'Duration': '00:02',
          'Id': 341,
          'Section_Id': 60,
          'Title': 'Calculator Source Code'
        },
        {
          'Desciption': '',
          'Duration': '02:18',
          'Id': 342,
          'Section_Id': 60,
          'Title': 'Summary of Calculator'
        },
        {
          'Desciption': '',
          'Duration': '01:40',
          'Id': 343,
          'Section_Id': 61,
          'Title': 'Introduction to Back to the Future'
        },
        {
          'Desciption': '',
          'Duration': '04:14',
          'Id': 344,
          'Section_Id': 61,
          'Title': 'Back to the Future - Tabbed Apps Explained'
        },
        {
          'Desciption': '',
          'Duration': '11:27',
          'Id': 345,
          'Section_Id': 61,
          'Title': 'Back to the Future Layout - Storyboards'
        },
        {
          'Desciption': '',
          'Duration': '08:40',
          'Id': 346,
          'Section_Id': 61,
          'Title': 'Back to the Future Code - Showing the Year'
        },
        {
          'Desciption': '',
          'Duration': '06:56',
          'Id': 347,
          'Section_Id': 61,
          'Title': 'Back to the Future Code - A Ticking Clock'
        },
        {
          'Desciption': '',
          'Duration': '06:50',
          'Id': 348,
          'Section_Id': 61,
          'Title': 'Back to the Future Time Travel - Storyboards'
        },
        {
          'Desciption': '',
          'Duration': '04:47',
          'Id': 349,
          'Section_Id': 61,
          'Title': 'Back to the Future Time Travel - Code'
        },
        {
          'Desciption': '',
          'Duration': '10:06',
          'Id': 350,
          'Section_Id': 61,
          'Title': 'Back to the Future Time Travel - Animations'
        },
        {
          'Desciption': '',
          'Duration': '01:07',
          'Id': 351,
          'Section_Id': 61,
          'Title': 'Back to the Future - Homework'
        },
        {
          'Desciption': '',
          'Duration': '05:14',
          'Id': 352,
          'Section_Id': 61,
          'Title': 'Back to the Future - Solution'
        },
        {
          'Desciption': '',
          'Duration': '00:52',
          'Id': 353,
          'Section_Id': 61,
          'Title': 'Back to the Future - Extra Credits'
        },
        {
          'Desciption': '',
          'Duration': '01:32',
          'Id': 354,
          'Section_Id': 61,
          'Title': 'Summary of App 2 - Back to the Future'
        },
        {
          'Desciption': '',
          'Duration': '00:02',
          'Id': 355,
          'Section_Id': 61,
          'Title': 'Back to the Future Source Code'
        },
        {
          'Desciption': '',
          'Duration': '00:48',
          'Id': 356,
          'Section_Id': 62,
          'Title': 'Introduction to App 3 - Where was I?'
        },
        {
          'Desciption': '',
          'Duration': '00:52',
          'Id': 357,
          'Section_Id': 62,
          'Title': 'Where was I? - Setup'
        },
        {
          'Desciption': '',
          'Duration': '04:50',
          'Id': 358,
          'Section_Id': 62,
          'Title': 'Showing a Map with Apple Maps'
        },
        {
          'Desciption': '',
          'Duration': '02:17',
          'Id': 359,
          'Section_Id': 62,
          'Title': 'Info.plist - Setting Required Device Capabilities'
        },
        {
          'Desciption': '',
          'Duration': '02:39',
          'Id': 360,
          'Section_Id': 62,
          'Title': 'Info.plist - Permissions for Location'
        },
        {
          'Desciption': '',
          'Duration': '07:57',
          'Id': 361,
          'Section_Id': 62,
          'Title': 'Showing Your Location'
        },
        {
          'Desciption': '',
          'Duration': '08:05',
          'Id': 362,
          'Section_Id': 62,
          'Title': 'Getting Location Coordinates'
        },
        {
          'Desciption': '',
          'Duration': '03:15',
          'Id': 363,
          'Section_Id': 62,
          'Title': 'Creating a Class to Store Location Coordinates'
        },
        {
          'Desciption': '',
          'Duration': '09:07',
          'Id': 364,
          'Section_Id': 62,
          'Title': 'Saving Location Coordinates (UserDefaults)'
        },
        {
          'Desciption': '',
          'Duration': '06:16',
          'Id': 365,
          'Section_Id': 62,
          'Title': 'Showing Last Location with a Pin Annotation'
        },
        {
          'Desciption': '',
          'Duration': '00:45',
          'Id': 366,
          'Section_Id': 62,
          'Title': 'Where Was I - Homework'
        },
        {
          'Desciption': '',
          'Duration': '04:19',
          'Id': 367,
          'Section_Id': 62,
          'Title': 'Where Was I - Solution'
        },
        {
          'Desciption': '',
          'Duration': '00:50',
          'Id': 368,
          'Section_Id': 62,
          'Title': 'Summary of Where was I? - GPS and Maps'
        },
        {
          'Desciption': '',
          'Duration': '00:02',
          'Id': 369,
          'Section_Id': 62,
          'Title': 'Where was I Source Code'
        },
        {
          'Desciption': '',
          'Duration': '01:41',
          'Id': 370,
          'Section_Id': 63,
          'Title': 'Introduction to Great App Design'
        },
        {
          'Desciption': '',
          'Duration': '03:05',
          'Id': 371,
          'Section_Id': 63,
          'Title': 'Thinking About User Experience'
        },
        {
          'Desciption': '',
          'Duration': '02:13',
          'Id': 372,
          'Section_Id': 63,
          'Title': 'Popular User Experience Tools'
        },
        {
          'Desciption': '',
          'Duration': '03:58',
          'Id': 373,
          'Section_Id': 63,
          'Title': 'How to Design a User Experience - Photo Sharer'
        },
        {
          'Desciption': '',
          'Duration': '04:59',
          'Id': 374,
          'Section_Id': 63,
          'Title': 'What is a User Interface - First Step'
        },
        {
          'Desciption': '',
          'Duration': '01:39',
          'Id': 375,
          'Section_Id': 63,
          'Title': 'Popular User Interface Design Tools'
        },
        {
          'Desciption': '',
          'Duration': '06:18',
          'Id': 376,
          'Section_Id': 63,
          'Title': 'How to Design a User Interface'
        },
        {
          'Desciption': '',
          'Duration': '00:55',
          'Id': 377,
          'Section_Id': 63,
          'Title': 'Summary of Great App Design'
        },
        {
          'Desciption': '',
          'Duration': '01:15',
          'Id': 378,
          'Section_Id': 64,
          'Title': 'Introduction to Quick Share'
        },
        {
          'Desciption': '',
          'Duration': '11:19',
          'Id': 379,
          'Section_Id': 64,
          'Title': 'Quick Share - Launch Screens and Images'
        },
        {
          'Desciption': '',
          'Duration': '07:59',
          'Id': 380,
          'Section_Id': 64,
          'Title': 'Creating the User Interface - UITableView'
        },
        {
          'Desciption': '',
          'Duration': '06:49',
          'Id': 381,
          'Section_Id': 64,
          'Title': 'How to Setup a Simple UITableView'
        },
        {
          'Desciption': '',
          'Duration': '11:08',
          'Id': 382,
          'Section_Id': 64,
          'Title': 'How to Setup a Custom UITableViewCell'
        },
        {
          'Desciption': '',
          'Duration': '02:58',
          'Id': 383,
          'Section_Id': 64,
          'Title': 'How Handle a Click from a UITableViewCell'
        },
        {
          'Desciption': '',
          'Duration': '08:27',
          'Id': 384,
          'Section_Id': 64,
          'Title': 'How to Push a New View Controller and Send Data'
        },
        {
          'Desciption': '',
          'Duration': '00:35',
          'Id': 385,
          'Section_Id': 64,
          'Title': 'Warning - There Be Dragons Ahead!'
        },
        {
          'Desciption': '',
          'Duration': '12:53',
          'Id': 386,
          'Section_Id': 64,
          'Title': 'How to Use the Photos Framework with Swift'
        },
        {
          'Desciption': '',
          'Duration': '09:59',
          'Id': 387,
          'Section_Id': 64,
          'Title': 'How to Pass a Photo to a View Controller'
        },
        {
          'Desciption': '',
          'Duration': '14:28',
          'Id': 388,
          'Section_Id': 64,
          'Title': 'Setting up Sharing Icons and Minimising Outlet Code'
        },
        {
          'Desciption': '',
          'Duration': '06:37',
          'Id': 389,
          'Section_Id': 64,
          'Title': 'Sharing on Facebook and Twitter Using the Social Framework'
        },
        {
          'Desciption': '',
          'Duration': '14:11',
          'Id': 390,
          'Section_Id': 64,
          'Title': 'Sharing on Instagram'
        },
        {
          'Desciption': '',
          'Duration': '10:29',
          'Id': 391,
          'Section_Id': 64,
          'Title': 'Sharing on WhatsApp'
        },
        {
          'Desciption': '',
          'Duration': '13:31',
          'Id': 392,
          'Section_Id': 64,
          'Title': 'Taking a Photo from Inside Your App'
        },
        {
          'Desciption': '',
          'Duration': '01:00',
          'Id': 393,
          'Section_Id': 64,
          'Title': 'Quick Share - Homework'
        },
        {
          'Desciption': '',
          'Duration': '03:27',
          'Id': 394,
          'Section_Id': 64,
          'Title': 'Quick Share - Solution'
        },
        {
          'Desciption': '',
          'Duration': '02:35',
          'Id': 395,
          'Section_Id': 64,
          'Title': 'Summary of Quick Share'
        },
        {
          'Desciption': '',
          'Duration': '00:01',
          'Id': 396,
          'Section_Id': 64,
          'Title': 'Source Code for Quick Share'
        },
        {
          'Desciption': '',
          'Duration': '01:42',
          'Id': 397,
          'Section_Id': 65,
          'Title': 'Lesson 1 - What You Need To Start Making Apps'
        },
        {
          'Desciption': '',
          'Duration': '23:23',
          'Id': 398,
          'Section_Id': 66,
          'Title': 'Lesson 2 - Getting The Tools You Need And Building Your First iPhone App'
        },
        {
          'Desciption': '',
          'Duration': '06:52',
          'Id': 399,
          'Section_Id': 66,
          'Title': 'Lesson 2 Challenge Solution'
        },
        {
          'Desciption': '',
          'Duration': '59.7 kB',
          'Id': 400,
          'Section_Id': 66,
          'Title': 'Lesson 2 Assets'
        },
        {
          'Desciption': '',
          'Duration': '19:07',
          'Id': 401,
          'Section_Id': 67,
          'Title': 'Lesson 3 - Learning To Write Code In Objective-C'
        },
        {
          'Desciption': '',
          'Duration': '2 pages',
          'Id': 402,
          'Section_Id': 67,
          'Title': 'Lesson 3 Challenge Solution'
        },
        {
          'Desciption': '',
          'Duration': '612.4 kB',
          'Id': 403,
          'Section_Id': 67,
          'Title': 'Lesson 3 Project File'
        },
        {
          'Desciption': '',
          'Duration': '48:30',
          'Id': 404,
          'Section_Id': 68,
          'Title': 'Lesson 4 - Creating a Tip Calculator App'
        },
        {
          'Desciption': '',
          'Duration': '03:08',
          'Id': 405,
          'Section_Id': 68,
          'Title': 'Lesson 4 Challenge Solution'
        },
        {
          'Desciption': '',
          'Duration': '387.6 kB',
          'Id': 406,
          'Section_Id': 68,
          'Title': 'Lesson 4 Tip Calculator App Images'
        },
        {
          'Desciption': '',
          'Duration': '418.8 kB',
          'Id': 407,
          'Section_Id': 68,
          'Title': 'Completed Tip Calculator Project'
        },
        {
          'Desciption': '',
          'Duration': '43:23',
          'Id': 408,
          'Section_Id': 69,
          'Title': 'Lesson 5 - Fun With TableViews, Arrays, and More'
        },
        {
          'Desciption': '',
          'Duration': '05:00',
          'Id': 409,
          'Section_Id': 69,
          'Title': 'Lesson 5 Challenge Solution'
        },
        {
          'Desciption': '',
          'Duration': '33:28',
          'Id': 410,
          'Section_Id': 70,
          'Title': 'Lesson 6 - Updating Food Diary to save data and show a detail view'
        },
        {
          'Desciption': '',
          'Duration': '09:06',
          'Id': 411,
          'Section_Id': 70,
          'Title': 'Lesson 6 Challenge Solution'
        },
        {
          'Desciption': '',
          'Duration': '30.2 kB',
          'Id': 412,
          'Section_Id': 70,
          'Title': 'Food Diary Lesson 6 Starting Point'
        },
        {
          'Desciption': '',
          'Duration': '29:46',
          'Id': 413,
          'Section_Id': 71,
          'Title': 'Lesson 7 - Updating Food Diary to add Geo-Location And Map Views'
        },
        {
          'Desciption': '',
          'Duration': '34.6 kB',
          'Id': 414,
          'Section_Id': 71,
          'Title': 'Food Diary Lesson 7 Starting Point'
        },
        {
          'Desciption': '',
          'Duration': '28:25',
          'Id': 415,
          'Section_Id': 72,
          'Title': 'Lesson 8 - A new app! Photos, touches, gestures, animations, and sound'
        },
        {
          'Desciption': '',
          'Duration': '04:41',
          'Id': 416,
          'Section_Id': 72,
          'Title': 'Lesson 8 Challenge Solution'
        },
        {
          'Desciption': '',
          'Duration': '1.9 MB',
          'Id': 417,
          'Section_Id': 72,
          'Title': 'Lesson 8 Photo Touch Images and Sound File'
        },
        {
          'Desciption': '',
          'Duration': '13:31',
          'Id': 418,
          'Section_Id': 73,
          'Title': 'Lesson 9 - Submitting Your App To The App Store'
        },
        {
          'Desciption': '',
          'Duration': '862.9 kB',
          'Id': 419,
          'Section_Id': 73,
          'Title': 'Lesson 9 PhotoTouch Icon Files'
        },
        {
          'Desciption': '',
          'Duration': '03:07',
          'Id': 420,
          'Section_Id': 74,
          'Title': 'Introduction / Website Tour'
        },
        {
          'Desciption': '',
          'Duration': '02:06',
          'Id': 421,
          'Section_Id': 75,
          'Title': 'The 5 Main Steps'
        },
        {
          'Desciption': '',
          'Duration': '05:08',
          'Id': 422,
          'Section_Id': 76,
          'Title': 'Web Hosting and Domain Name'
        },
        {
          'Desciption': '',
          'Duration': '04:50',
          'Id': 423,
          'Section_Id': 77,
          'Title': 'Installing WordPress and Logging In'
        },
        {
          'Desciption': '',
          'Duration': '02:05',
          'Id': 424,
          'Section_Id': 78,
          'Title': 'Deleting WordPress DEMO Content'
        },
        {
          'Desciption': '',
          'Duration': '02:07',
          'Id': 425,
          'Section_Id': 79,
          'Title': 'Changing Our Theme on WordPress'
        },
        {
          'Desciption': '',
          'Duration': '12:06',
          'Id': 426,
          'Section_Id': 80,
          'Title': 'Customizing Our New WordPress Theme (Rocked)'
        },
        {
          'Desciption': '',
          'Duration': '10:21',
          'Id': 427,
          'Section_Id': 81,
          'Title': 'Adding Pages on WordPress (About, Contact, etc)'
        },
        {
          'Desciption': '',
          'Duration': '06:09',
          'Id': 428,
          'Section_Id': 82,
          'Title': 'Adding Blog Posts on WordPress'
        },
        {
          'Desciption': '',
          'Duration': '05:17',
          'Id': 429,
          'Section_Id': 83,
          'Title': 'Changing Our Fonts & Font Sizes (Google Fonts)'
        },
        {
          'Desciption': '',
          'Duration': '00:37',
          'Id': 430,
          'Section_Id': 84,
          'Title': 'Welcome to Web Hosting 101'
        },
        {
          'Desciption': '',
          'Duration': '18 pages',
          'Id': 431,
          'Section_Id': 84,
          'Title': 'What is a Domain Name & Hosting Package?'
        },
        {
          'Desciption': '',
          'Duration': '06:22',
          'Id': 432,
          'Section_Id': 85,
          'Title': 'How to Find Your Perfect Domain Name'
        },
        {
          'Desciption': '',
          'Duration': '08:52',
          'Id': 433,
          'Section_Id': 85,
          'Title': 'How to Purchase a Domain Name'
        },
        {
          'Desciption': '',
          'Duration': '09:12',
          'Id': 434,
          'Section_Id': 86,
          'Title': 'How to Purchase a Hosting Package'
        },
        {
          'Desciption': '',
          'Duration': '07:32',
          'Id': 435,
          'Section_Id': 86,
          'Title': 'How to Associate your Domain Name with your Hosting Package'
        },
        {
          'Desciption': '',
          'Duration': '07:36',
          'Id': 436,
          'Section_Id': 87,
          'Title': 'How to Upload your Website to your Domain'
        },
        {
          'Desciption': '',
          'Duration': '06:52',
          'Id': 437,
          'Section_Id': 87,
          'Title': 'How to set up a Wordpress Blog in under 5-minutes'
        },
        {
          'Desciption': '',
          'Duration': '00:15',
          'Id': 438,
          'Section_Id': 87,
          'Title': 'Rate & Review'
        },
        {
          'Desciption': '',
          'Duration': '01:59',
          'Id': 439,
          'Section_Id': 88,
          'Title': 'Introduction'
        },
        {
          'Desciption': '',
          'Duration': '00:04',
          'Id': 440,
          'Section_Id': 88,
          'Title': "What you'll need"
        },
        {
          'Desciption': '',
          'Duration': '12:43',
          'Id': 441,
          'Section_Id': 89,
          'Title': 'User interface Explained'
        },
        {
          'Desciption': '',
          'Duration': '3 questions',
          'Id': 442,
          'Section_Id': 89,
          'Title': 'User interface'
        },
        {
          'Desciption': '',
          'Duration': '06:06',
          'Id': 443,
          'Section_Id': 90,
          'Title': 'Using The Paint Brush'
        },
        {
          'Desciption': '',
          'Duration': '1 question',
          'Id': 444,
          'Section_Id': 90,
          'Title': 'Using the paint brush'
        },
        {
          'Desciption': '',
          'Duration': '09:26',
          'Id': 445,
          'Section_Id': 91,
          'Title': 'Shapes and Custom Shapes'
        },
        {
          'Desciption': '',
          'Duration': '4 questions',
          'Id': 446,
          'Section_Id': 91,
          'Title': 'shapes and custom shapes'
        },
        {
          'Desciption': '',
          'Duration': '04:23',
          'Id': 447,
          'Section_Id': 92,
          'Title': 'layers and groups'
        },
        {
          'Desciption': '',
          'Duration': '2 questions',
          'Id': 448,
          'Section_Id': 92,
          'Title': 'Layers and groups'
        },
        {
          'Desciption': '',
          'Duration': '08:09',
          'Id': 449,
          'Section_Id': 93,
          'Title': 'moving and resizing'
        },
        {
          'Desciption': '',
          'Duration': '2 questions',
          'Id': 450,
          'Section_Id': 93,
          'Title': 'moving and resizing'
        },
        {
          'Desciption': '',
          'Duration': '01:37',
          'Id': 451,
          'Section_Id': 94,
          'Title': 'Zooming and Panning'
        },
        {
          'Desciption': '',
          'Duration': '2 questions',
          'Id': 452,
          'Section_Id': 94,
          'Title': 'zooming and panning'
        },
        {
          'Desciption': '',
          'Duration': '13:04',
          'Id': 453,
          'Section_Id': 95,
          'Title': 'Blend Modes & Adding Effects'
        },
        {
          'Desciption': '',
          'Duration': '13:58',
          'Id': 454,
          'Section_Id': 96,
          'Title': 'text'
        },
        {
          'Desciption': '',
          'Duration': '07:09',
          'Id': 455,
          'Section_Id': 97,
          'Title': 'walking monk'
        },
        {
          'Desciption': '',
          'Duration': '2 questions',
          'Id': 456,
          'Section_Id': 97,
          'Title': 'Walking monk'
        },
        {
          'Desciption': '',
          'Duration': '00:42',
          'Id': 457,
          'Section_Id': 98,
          'Title': 'Build a Web Design & SEO Business Website With WordPress'
        },
        {
          'Desciption': '',
          'Duration': '01:12',
          'Id': 458,
          'Section_Id': 98,
          'Title': 'Ongoing Help & How to Contact Me'
        },
        {
          'Desciption': '',
          'Duration': '03:01',
          'Id': 459,
          'Section_Id': 99,
          'Title': 'Benefits of WordPress: Why Use WordPress to Build Your Website'
        },
        {
          'Desciption': '',
          'Duration': '02:57',
          'Id': 460,
          'Section_Id': 99,
          'Title': 'WordPress: Get Familiar With the Most Common WordPress Lingo'
        },
        {
          'Desciption': '',
          'Duration': '04:00',
          'Id': 461,
          'Section_Id': 99,
          'Title': 'Setting Up the Best WordPress Hosting'
        },
        {
          'Desciption': '',
          'Duration': '01:55',
          'Id': 462,
          'Section_Id': 99,
          'Title': 'How to Install WordPress in Under 60 Seconds'
        },
        {
          'Desciption': '',
          'Duration': '00:51',
          'Id': 463,
          'Section_Id': 99,
          'Title': 'How to Log-In to the WordPress Dashboard'
        },
        {
          'Desciption': '',
          'Duration': '05:13',
          'Id': 464,
          'Section_Id': 99,
          'Title': 'A Quick Tour of the WordPress Dashboard'
        },
        {
          'Desciption': '',
          'Duration': '06:35',
          'Id': 465,
          'Section_Id': 99,
          'Title': 'The Most Important WordPress Settings You Need to Update'
        },
        {
          'Desciption': '',
          'Duration': '03:26',
          'Id': 466,
          'Section_Id': 99,
          'Title': 'How to Set-up WordPress Posts on Your Blog'
        },
        {
          'Desciption': '',
          'Duration': '02:47',
          'Id': 467,
          'Section_Id': 99,
          'Title': 'How to Add a New Page to Your WordPress Website'
        },
        {
          'Desciption': '',
          'Duration': '04:26',
          'Id': 468,
          'Section_Id': 100,
          'Title': 'How to Set-Up Your Website Menu in WordPress'
        },
        {
          'Desciption': '',
          'Duration': '06:01',
          'Id': 469,
          'Section_Id': 100,
          'Title': 'How to Find and Install WordPress Themes'
        },
        {
          'Desciption': '',
          'Duration': '00:47',
          'Id': 470,
          'Section_Id': 100,
          'Title': 'The Top WordPress Themes to Use For Your Business Website'
        },
        {
          'Desciption': '',
          'Duration': '04:27',
          'Id': 471,
          'Section_Id': 100,
          'Title': 'How to Find and Install Plugins on Your WordPress Website'
        },
        {
          'Desciption': '',
          'Duration': '03:15',
          'Id': 472,
          'Section_Id': 100,
          'Title': 'How to Customize Your WordPress Plugin'
        },
        {
          'Desciption': '',
          'Duration': '04:53',
          'Id': 473,
          'Section_Id': 100,
          'Title': 'Understanding Widgets & Adding Them to Your Website'
        },
        {
          'Desciption': '',
          'Duration': '00:24',
          'Id': 474,
          'Section_Id': 100,
          'Title': '8 Places to Find Free & Premium Themes'
        },
        {
          'Desciption': '',
          'Duration': '02:58',
          'Id': 475,
          'Section_Id': 100,
          'Title': '15 of the Best WordPress Plugins'
        },
        {
          'Desciption': '',
          'Duration': '01:16',
          'Id': 476,
          'Section_Id': 101,
          'Title': 'Finishing Your Web Design & SEO Business WordPress Website'
        },
        {
          'Desciption': '',
          'Duration': '00:42',
          'Id': 477,
          'Section_Id': 101,
          'Title': "Let's Continue Learning Together"
        },
        {
          'Desciption': '',
          'Duration': '00:28',
          'Id': 478,
          'Section_Id': 101,
          'Title': 'How to Select a Hosting Company Based on Your Needs'
        },
        {
          'Desciption': '',
          'Duration': '01:03',
          'Id': 479,
          'Section_Id': 101,
          'Title': 'Additional Resources'
        },
        {
          'Desciption': '',
          'Duration': '01:27',
          'Id': 480,
          'Section_Id': 102,
          'Title': 'Introduction'
        },
        {
          'Desciption': '',
          'Duration': '03:51',
          'Id': 481,
          'Section_Id': 103,
          'Title': 'HTML Documents'
        },
        {
          'Desciption': '',
          'Duration': '04:35',
          'Id': 482,
          'Section_Id': 103,
          'Title': 'HTML Tags'
        },
        {
          'Desciption': '',
          'Duration': '01:23',
          'Id': 483,
          'Section_Id': 104,
          'Title': 'CSS Part 1'
        },
        {
          'Desciption': '',
          'Duration': '04:10',
          'Id': 484,
          'Section_Id': 104,
          'Title': 'CSS Part 2'
        },
        {
          'Desciption': '',
          'Duration': '09:39',
          'Id': 485,
          'Section_Id': 105,
          'Title': 'Demo, Part 1'
        },
        {
          'Desciption': '',
          'Duration': '17:54',
          'Id': 486,
          'Section_Id': 105,
          'Title': 'Demo, Part 2'
        },
        {
          'Desciption': '',
          'Duration': '10:29',
          'Id': 487,
          'Section_Id': 105,
          'Title': 'Demo, Part 3'
        },
        {
          'Desciption': '',
          'Duration': '08:12',
          'Id': 488,
          'Section_Id': 105,
          'Title': 'Demo, Part 4'
        },
        {
          'Desciption': '',
          'Duration': '01:22',
          'Id': 489,
          'Section_Id': 106,
          'Title': 'Introduction'
        },
        {
          'Desciption': '',
          'Duration': '10:46',
          'Id': 490,
          'Section_Id': 107,
          'Title': 'Logo Design (Neuron)'
        },
        {
          'Desciption': '',
          'Duration': '11:24',
          'Id': 491,
          'Section_Id': 107,
          'Title': 'Logo Design (Macro)'
        },
        {
          'Desciption': '',
          'Duration': '09:49',
          'Id': 492,
          'Section_Id': 107,
          'Title': 'Logo Design (Crease)'
        },
        {
          'Desciption': '',
          'Duration': '09:30',
          'Id': 493,
          'Section_Id': 107,
          'Title': 'Logo Design (Color)'
        },
        {
          'Desciption': '',
          'Duration': '09:49',
          'Id': 494,
          'Section_Id': 107,
          'Title': 'Logo Design (abc)'
        },
        {
          'Desciption': '',
          'Duration': '15:05',
          'Id': 495,
          'Section_Id': 107,
          'Title': 'Logo Design (Aragon)'
        },
        {
          'Desciption': '',
          'Duration': '09:45',
          'Id': 496,
          'Section_Id': 107,
          'Title': 'Logo Design (3D Logo)'
        },
        {
          'Desciption': '',
          'Duration': '19:56',
          'Id': 497,
          'Section_Id': 107,
          'Title': 'Logo Design (Plus)'
        },
        {
          'Desciption': '',
          'Duration': '07:36',
          'Id': 498,
          'Section_Id': 107,
          'Title': 'Logo Design (Catalist)'
        },
        {
          'Desciption': '',
          'Duration': '13:40',
          'Id': 499,
          'Section_Id': 107,
          'Title': 'Logo Design (Air)'
        },
        {
          'Desciption': '',
          'Duration': '08:43',
          'Id': 500,
          'Section_Id': 107,
          'Title': 'Logo Design (Glass)'
        },
        {
          'Desciption': '',
          'Duration': '11:16',
          'Id': 501,
          'Section_Id': 107,
          'Title': 'Logo Design (Tropical)'
        },
        {
          'Desciption': '',
          'Duration': '11:10',
          'Id': 502,
          'Section_Id': 107,
          'Title': 'Logo Design (Check)'
        },
        {
          'Desciption': '',
          'Duration': '09:03',
          'Id': 503,
          'Section_Id': 107,
          'Title': 'Logo Design (Science)'
        },
        {
          'Desciption': '',
          'Duration': '14:41',
          'Id': 504,
          'Section_Id': 107,
          'Title': 'Logo Design (Yawl)'
        },
        {
          'Desciption': '',
          'Duration': '08:43',
          'Id': 505,
          'Section_Id': 107,
          'Title': 'Logo Design (Cubic)'
        },
        {
          'Desciption': '',
          'Duration': '11:36',
          'Id': 506,
          'Section_Id': 107,
          'Title': 'Logo Design (ET)'
        },
        {
          'Desciption': '',
          'Duration': '06:11',
          'Id': 507,
          'Section_Id': 107,
          'Title': 'Logo Design (Direct)'
        },
        {
          'Desciption': '',
          'Duration': '14:57',
          'Id': 508,
          'Section_Id': 107,
          'Title': 'Logo Design (Creat)'
        },
        {
          'Desciption': '',
          'Duration': '10:32',
          'Id': 509,
          'Section_Id': 107,
          'Title': 'Logo Design (Celcius)'
        },
        {
          'Desciption': '',
          'Duration': '09:30',
          'Id': 510,
          'Section_Id': 107,
          'Title': 'Logo Design (Tesla)'
        },
        {
          'Desciption': '',
          'Duration': '09:53',
          'Id': 511,
          'Section_Id': 107,
          'Title': 'Logo Design (Artmag)'
        },
        {
          'Desciption': '',
          'Duration': '09:34',
          'Id': 512,
          'Section_Id': 107,
          'Title': 'Logo Design (Beat)'
        },
        {
          'Desciption': '',
          'Duration': '05:57',
          'Id': 513,
          'Section_Id': 107,
          'Title': 'Logo Design (Blend)'
        },
        {
          'Desciption': '',
          'Duration': '06:28',
          'Id': 514,
          'Section_Id': 107,
          'Title': 'Logo Design (Mestro)'
        },
        {
          'Desciption': '',
          'Duration': '09:06',
          'Id': 515,
          'Section_Id': 107,
          'Title': 'Logo Design (Known)'
        },
        {
          'Desciption': '',
          'Duration': '07:57',
          'Id': 516,
          'Section_Id': 107,
          'Title': 'Logo Design (CarbonCoffee)'
        },
        {
          'Desciption': '',
          'Duration': '08:41',
          'Id': 517,
          'Section_Id': 107,
          'Title': 'Logo Design (Alpha)'
        },
        {
          'Desciption': '',
          'Duration': '09:49',
          'Id': 518,
          'Section_Id': 107,
          'Title': 'Logo Design (Task)'
        },
        {
          'Desciption': '',
          'Duration': '07:25',
          'Id': 519,
          'Section_Id': 107,
          'Title': 'Logo Design (Euro)'
        },
        {
          'Desciption': '',
          'Duration': '13:50',
          'Id': 520,
          'Section_Id': 107,
          'Title': 'Logo Design (Evolve)'
        },
        {
          'Desciption': '',
          'Duration': '04:52',
          'Id': 521,
          'Section_Id': 107,
          'Title': 'Logo Design (Explore)'
        },
        {
          'Desciption': '',
          'Duration': '05:20',
          'Id': 522,
          'Section_Id': 107,
          'Title': 'Logo Design (Delmon)'
        },
        {
          'Desciption': '',
          'Duration': '11:38',
          'Id': 523,
          'Section_Id': 107,
          'Title': 'Logo Design (Entroprenor)'
        },
        {
          'Desciption': '',
          'Duration': '07:34',
          'Id': 524,
          'Section_Id': 107,
          'Title': 'Logo Design (Gsquare)'
        },
        {
          'Desciption': '',
          'Duration': '09:48',
          'Id': 525,
          'Section_Id': 107,
          'Title': 'Logo Design (Guard)'
        },
        {
          'Desciption': '',
          'Duration': '15:32',
          'Id': 526,
          'Section_Id': 107,
          'Title': 'Logo Design (Jazzer)'
        },
        {
          'Desciption': '',
          'Duration': '15:10',
          'Id': 527,
          'Section_Id': 107,
          'Title': 'Logo Design (Oral)'
        },
        {
          'Desciption': '',
          'Duration': '12:13',
          'Id': 528,
          'Section_Id': 107,
          'Title': 'Logo Design (Orbit)'
        },
        {
          'Desciption': '',
          'Duration': '07:37',
          'Id': 529,
          'Section_Id': 107,
          'Title': 'Logo Design (Ordinary)'
        },
        {
          'Desciption': '',
          'Duration': '10:39',
          'Id': 530,
          'Section_Id': 107,
          'Title': 'Logo Design (Playr)'
        },
        {
          'Desciption': '',
          'Duration': '04:41',
          'Id': 531,
          'Section_Id': 107,
          'Title': 'Logo Design (Nice)'
        },
        {
          'Desciption': '',
          'Duration': '08:10',
          'Id': 532,
          'Section_Id': 107,
          'Title': 'Logo Design (Direct)'
        },
        {
          'Desciption': '',
          'Duration': '05:45',
          'Id': 533,
          'Section_Id': 107,
          'Title': 'Logo Design (Clear)'
        },
        {
          'Desciption': '',
          'Duration': '01:59',
          'Id': 534,
          'Section_Id': 108,
          'Title': 'Welcome'
        },
        {
          'Desciption': '',
          'Duration': '16:54',
          'Id': 535,
          'Section_Id': 109,
          'Title': 'Photoshop Setup and Basic Operations'
        },
        {
          'Desciption': '',
          'Duration': '04:42',
          'Id': 536,
          'Section_Id': 109,
          'Title': 'Photoshop Filters'
        },
        {
          'Desciption': '',
          'Duration': '02:12',
          'Id': 537,
          'Section_Id': 109,
          'Title': 'Photoshop Masks'
        },
        {
          'Desciption': '',
          'Duration': '11:30',
          'Id': 538,
          'Section_Id': 109,
          'Title': 'Photoshop Tools'
        },
        {
          'Desciption': '',
          'Duration': '00:57',
          'Id': 539,
          'Section_Id': 110,
          'Title': 'Course Recap'
        },
        {
          'Desciption': '',
          'Duration': '00:48',
          'Id': 540,
          'Section_Id': 111,
          'Title': 'Introduction'
        },
        {
          'Desciption': '',
          'Duration': '05:21',
          'Id': 541,
          'Section_Id': 112,
          'Title': 'Habits of Successful Artists'
        },
        {
          'Desciption': '',
          'Duration': '16:13',
          'Id': 542,
          'Section_Id': 113,
          'Title': 'Basics of Sketching'
        },
        {
          'Desciption': '',
          'Duration': '04:36',
          'Id': 543,
          'Section_Id': 113,
          'Title': 'Design Principles'
        },
        {
          'Desciption': '',
          'Duration': '16:30',
          'Id': 544,
          'Section_Id': 113,
          'Title': 'Value'
        },
        {
          'Desciption': '',
          'Duration': '07:04',
          'Id': 545,
          'Section_Id': 113,
          'Title': 'Color'
        },
        {
          'Desciption': '',
          'Duration': '11:54',
          'Id': 546,
          'Section_Id': 114,
          'Title': 'Still life study - value painting'
        },
        {
          'Desciption': '',
          'Duration': '01:31',
          'Id': 547,
          'Section_Id': 115,
          'Title': 'Course Recap'
        },
        {
          'Desciption': '',
          'Duration': '04:05',
          'Id': 548,
          'Section_Id': 116,
          'Title': 'Figure Drawing Class Introduction'
        },
        {
          'Desciption': '',
          'Duration': '02:19',
          'Id': 549,
          'Section_Id': 116,
          'Title': 'Figure Drawing Class Disclaimers'
        },
        {
          'Desciption': '',
          'Duration': '05:57',
          'Id': 550,
          'Section_Id': 116,
          'Title': 'Figure Drawing Class #1:Large and Small Action Lines'
        },
        {
          'Desciption': '',
          'Duration': '02:20',
          'Id': 551,
          'Section_Id': 116,
          'Title': 'Figure Drawing Class #2: Action and Large Shapes'
        },
        {
          'Desciption': '',
          'Duration': '04:19',
          'Id': 552,
          'Section_Id': 116,
          'Title': 'Figure Drawing Class #3: Action and Large Shapes'
        },
        {
          'Desciption': '',
          'Duration': '05:05',
          'Id': 553,
          'Section_Id': 116,
          'Title': 'Figure Drawing Class #4: Negative Space and Small Shapes'
        },
        {
          'Desciption': '',
          'Duration': '13:17',
          'Id': 554,
          'Section_Id': 116,
          'Title': 'Figure Drawing Class #5: Value (Light and Dark)'
        },
        {
          'Desciption': '',
          'Duration': '10:45',
          'Id': 555,
          'Section_Id': 116,
          'Title': 'Figure Drawing Class #6: Perspective and Foreshortening'
        },
        {
          'Desciption': '',
          'Duration': '09:51',
          'Id': 556,
          'Section_Id': 116,
          'Title': 'Figure Drawing Class #7: Depth with Shape, Edge, and Value'
        },
        {
          'Desciption': '',
          'Duration': '11:35',
          'Id': 557,
          'Section_Id': 116,
          'Title': 'Figure Drawing Class #8: Edge and Line Weight'
        },
        {
          'Desciption': '',
          'Duration': '08:12',
          'Id': 558,
          'Section_Id': 116,
          'Title': 'Figure Drawing Class #9: Details (Hands and Feet)'
        },
        {
          'Desciption': '',
          'Duration': '05:07',
          'Id': 559,
          'Section_Id': 116,
          'Title': 'Figure Drawing Class #10: Details (Hands and Feet)'
        },
        {
          'Desciption': '',
          'Duration': '07:07',
          'Id': 560,
          'Section_Id': 116,
          'Title': 'Figure Drawing Class #11: Drapery'
        },
        {
          'Desciption': '',
          'Duration': '16:49',
          'Id': 561,
          'Section_Id': 116,
          'Title': 'Figure Drawing Class #12: Details (Face)'
        },
        {
          'Desciption': '',
          'Duration': '04:06',
          'Id': 562,
          'Section_Id': 116,
          'Title': 'Figure Drawing Class #13: Details (Face-Foreshortening)'
        },
        {
          'Desciption': '',
          'Duration': '08:45',
          'Id': 563,
          'Section_Id': 116,
          'Title': 'Figure Drawing Class #14: Summary and Demo (Back)'
        },
        {
          'Desciption': '',
          'Duration': '05:45',
          'Id': 564,
          'Section_Id': 116,
          'Title': 'Figure Drawing class #15: Summary and Demo (Side)'
        },
        {
          'Desciption': '',
          'Duration': '05:38',
          'Id': 565,
          'Section_Id': 117,
          'Title': 'Demonstration #1: Front Female Nude (Seated)'
        },
        {
          'Desciption': '',
          'Duration': '04:22',
          'Id': 566,
          'Section_Id': 117,
          'Title': 'Demonstration #2: Back Female Nude (Seated)'
        },
        {
          'Desciption': '',
          'Duration': '05:21',
          'Id': 567,
          'Section_Id': 117,
          'Title': 'Demonstration #3: Side Female Nude (Seated)'
        },
        {
          'Desciption': '',
          'Duration': '07:31',
          'Id': 568,
          'Section_Id': 117,
          'Title': 'Demonstration #4: Front Female Nude (Reclining)'
        },
        {
          'Desciption': '',
          'Duration': '05:37',
          'Id': 569,
          'Section_Id': 117,
          'Title': 'Demonstration #5: Side Female Nude (Standing)'
        },
        {
          'Desciption': '',
          'Duration': '01:48',
          'Id': 570,
          'Section_Id': 118,
          'Title': 'Intro to logo fundamentals'
        },
        {
          'Desciption': '',
          'Duration': '01:18',
          'Id': 571,
          'Section_Id': 118,
          'Title': 'Company Profile beginning'
        },
        {
          'Desciption': '',
          'Duration': '03:47',
          'Id': 572,
          'Section_Id': 118,
          'Title': '20 Sketches'
        },
        {
          'Desciption': '',
          'Duration': '02:47',
          'Id': 573,
          'Section_Id': 119,
          'Title': 'Choosing a font'
        },
        {
          'Desciption': '',
          'Duration': '02:13',
          'Id': 574,
          'Section_Id': 119,
          'Title': 'Finding a new font and installing it'
        },
        {
          'Desciption': '',
          'Duration': '04:02',
          'Id': 575,
          'Section_Id': 120,
          'Title': 'Vector Elements'
        },
        {
          'Desciption': '',
          'Duration': '03:17',
          'Id': 576,
          'Section_Id': 120,
          'Title': 'Building vector'
        },
        {
          'Desciption': '',
          'Duration': '05:02',
          'Id': 577,
          'Section_Id': 121,
          'Title': 'Construction 1'
        },
        {
          'Desciption': '',
          'Duration': '05:02',
          'Id': 578,
          'Section_Id': 121,
          'Title': 'Construction 2'
        },
        {
          'Desciption': '',
          'Duration': '07:14',
          'Id': 579,
          'Section_Id': 121,
          'Title': 'Construction 3'
        },
        {
          'Desciption': '',
          'Duration': '06:06',
          'Id': 580,
          'Section_Id': 122,
          'Title': 'Horizontal Vs. Vertical'
        },
        {
          'Desciption': '',
          'Duration': '02:50',
          'Id': 581,
          'Section_Id': 122,
          'Title': 'Black and White'
        },
        {
          'Desciption': '',
          'Duration': '01:55',
          'Id': 582,
          'Section_Id': 123,
          'Title': 'Saving the Logo File for Print'
        },
        {
          'Desciption': '',
          'Duration': '01:40',
          'Id': 583,
          'Section_Id': 123,
          'Title': 'Finishing touches and wrap up'
        },
        {
          'Desciption': '',
          'Duration': '52:03',
          'Id': 584,
          'Section_Id': 124,
          'Title': 'First Full Length Audio on how to build a logo'
        },
        {
          'Desciption': '',
          'Duration': '03:08',
          'Id': 585,
          'Section_Id': 125,
          'Title': 'Introduction and Overview'
        },
        {
          'Desciption': '',
          'Duration': '08:40',
          'Id': 586,
          'Section_Id': 126,
          'Title': 'Perpetuation of road and rail systems.'
        },
        {
          'Desciption': '',
          'Duration': '09:23',
          'Id': 587,
          'Section_Id': 126,
          'Title': 'Perpetuation of numbering systems and the worst data entry technology.'
        },
        {
          'Desciption': '',
          'Duration': '08:56',
          'Id': 588,
          'Section_Id': 126,
          'Title': 'Perpetuation of paper and computer formats.'
        },
        {
          'Desciption': '',
          'Duration': '13:50',
          'Id': 589,
          'Section_Id': 126,
          'Title': 'Perpetuation of bookkeeping and computer files.'
        },
        {
          'Desciption': '',
          'Duration': '13:22',
          'Id': 590,
          'Section_Id': 126,
          'Title': 'Perpetuation of industrial-age systems into the information-age.'
        },
        {
          'Desciption': '',
          'Duration': '13:41',
          'Id': 591,
          'Section_Id': 126,
          'Title': 'Perpetuation of industrial-age business structures today and the problems it causes.'
        },
        {
          'Desciption': '',
          'Duration': '02:28',
          'Id': 592,
          'Section_Id': 127,
          'Title': 'Wrap-Up and Review'
        },
        {
          'Desciption': '',
          'Duration': '03:40',
          'Id': 593,
          'Section_Id': 128,
          'Title': 'I’m not creative… What do I do now?'
        },
        {
          'Desciption': '',
          'Duration': '00:19',
          'Id': 594,
          'Section_Id': 129,
          'Title': 'Section Introduction'
        },
        {
          'Desciption': '',
          'Duration': '02:23',
          'Id': 595,
          'Section_Id': 129,
          'Title': 'What is Creativity again?'
        },
        {
          'Desciption': '',
          'Duration': '03:53',
          'Id': 596,
          'Section_Id': 129,
          'Title': 'Are there any differences between creative and non-creative people?'
        },
        {
          'Desciption': '',
          'Duration': '1 question',
          'Id': 597,
          'Section_Id': 129,
          'Title': 'Closing of the Creativity Section'
        },
        {
          'Desciption': '',
          'Duration': '00:11',
          'Id': 598,
          'Section_Id': 130,
          'Title': "Beginning of the 'Stages of the Creative Procces' Section"
        },
        {
          'Desciption': '',
          'Duration': '05:42',
          'Id': 599,
          'Section_Id': 130,
          'Title': 'Stages of the creative process'
        },
        {
          'Desciption': '',
          'Duration': '1 question',
          'Id': 600,
          'Section_Id': 130,
          'Title': 'Closing of Stages of the Creative Process'
        },
        {
          'Desciption': '',
          'Duration': '00:19',
          'Id': 601,
          'Section_Id': 131,
          'Title': 'Section Introduction'
        },
        {
          'Desciption': '',
          'Duration': '00:13',
          'Id': 602,
          'Section_Id': 131,
          'Title': 'The Identification Phase'
        },
        {
          'Desciption': '',
          'Duration': '02:17',
          'Id': 603,
          'Section_Id': 131,
          'Title': 'Identification Phase Introduction'
        },
        {
          'Desciption': '',
          'Duration': '04:29',
          'Id': 604,
          'Section_Id': 131,
          'Title': 'Mapping Behavioral Trends'
        },
        {
          'Desciption': '',
          'Duration': '02:25',
          'Id': 605,
          'Section_Id': 131,
          'Title': 'Popular Media Scanning'
        },
        {
          'Desciption': '',
          'Duration': '01:57',
          'Id': 606,
          'Section_Id': 131,
          'Title': 'Innovation Sourcebook'
        },
        {
          'Desciption': '',
          'Duration': '02:01',
          'Id': 607,
          'Section_Id': 131,
          'Title': 'Convergence Map'
        },
        {
          'Desciption': '',
          'Duration': '02:43',
          'Id': 608,
          'Section_Id': 131,
          'Title': 'The 5 Whys'
        },
        {
          'Desciption': '',
          'Duration': '1 question',
          'Id': 609,
          'Section_Id': 131,
          'Title': "Closing of the 'Identification Phase' Section"
        },
        {
          'Desciption': '',
          'Duration': '00:06',
          'Id': 610,
          'Section_Id': 132,
          'Title': 'Section Introduction'
        },
        {
          'Desciption': '',
          'Duration': '01:12',
          'Id': 611,
          'Section_Id': 132,
          'Title': 'The Preparation Phase'
        },
        {
          'Desciption': '',
          'Duration': '02:49',
          'Id': 612,
          'Section_Id': 132,
          'Title': 'Socio-Cultural Scanning of The Problem'
        },
        {
          'Desciption': '',
          'Duration': '02:17',
          'Id': 613,
          'Section_Id': 132,
          'Title': 'Eras Map'
        },
        {
          'Desciption': '',
          'Duration': '05:29',
          'Id': 614,
          'Section_Id': 132,
          'Title': 'Evaluation of Types of Market Innovations'
        },
        {
          'Desciption': '',
          'Duration': '03:16',
          'Id': 615,
          'Section_Id': 132,
          'Title': 'Thinking through Analogies'
        },
        {
          'Desciption': '',
          'Duration': '1 question',
          'Id': 616,
          'Section_Id': 132,
          'Title': "Closing of the 'Preparation Phase' Section"
        },
        {
          'Desciption': '',
          'Duration': '00:12',
          'Id': 617,
          'Section_Id': 133,
          'Title': 'Section Introduction'
        },
        {
          'Desciption': '',
          'Duration': '02:22',
          'Id': 618,
          'Section_Id': 133,
          'Title': 'The Incubation Phase'
        },
        {
          'Desciption': '',
          'Duration': '01:14',
          'Id': 619,
          'Section_Id': 133,
          'Title': 'New Activities, Challenges and Experiences'
        },
        {
          'Desciption': '',
          'Duration': '01:36',
          'Id': 620,
          'Section_Id': 133,
          'Title': 'Acquire Random Knowledge'
        },
        {
          'Desciption': '',
          'Duration': '1 question',
          'Id': 621,
          'Section_Id': 133,
          'Title': 'Closing of the \'Incubation Phase" Section'
        },
        {
          'Desciption': '',
          'Duration': '00:05',
          'Id': 622,
          'Section_Id': 134,
          'Title': 'Section Introduction'
        },
        {
          'Desciption': '',
          'Duration': '00:54',
          'Id': 623,
          'Section_Id': 134,
          'Title': 'The Warming Up Phase'
        },
        {
          'Desciption': '',
          'Duration': '03:40',
          'Id': 624,
          'Section_Id': 134,
          'Title': 'Brainstorming'
        },
        {
          'Desciption': '',
          'Duration': '04:50',
          'Id': 625,
          'Section_Id': 134,
          'Title': 'Scamper'
        },
        {
          'Desciption': '',
          'Duration': '03:16',
          'Id': 626,
          'Section_Id': 134,
          'Title': 'Word Cloud'
        },
        {
          'Desciption': '',
          'Duration': '03:13',
          'Id': 627,
          'Section_Id': 134,
          'Title': 'Mind Map'
        },
        {
          'Desciption': '',
          'Duration': '04:10',
          'Id': 628,
          'Section_Id': 134,
          'Title': 'Empathy Map'
        },
        {
          'Desciption': '',
          'Duration': '03:34',
          'Id': 629,
          'Section_Id': 134,
          'Title': '635 Tool'
        },
        {
          'Desciption': '',
          'Duration': '1 question',
          'Id': 630,
          'Section_Id': 134,
          'Title': 'Closing of the \'Warming Up Phase" Section'
        },
        {
          'Desciption': '',
          'Duration': '00:06',
          'Id': 631,
          'Section_Id': 135,
          'Title': 'Section Introduction'
        },
        {
          'Desciption': '',
          'Duration': '00:48',
          'Id': 632,
          'Section_Id': 135,
          'Title': 'The Enlightenmen Phase'
        },
        {
          'Desciption': '',
          'Duration': '05:47',
          'Id': 633,
          'Section_Id': 135,
          'Title': 'Six Hats Tool'
        },
        {
          'Desciption': '',
          'Duration': '02:58',
          'Id': 634,
          'Section_Id': 135,
          'Title': 'Role Playing Game'
        },
        {
          'Desciption': '',
          'Duration': '02:51',
          'Id': 635,
          'Section_Id': 135,
          'Title': 'Stakeholders Value Map'
        },
        {
          'Desciption': '',
          'Duration': '1 question',
          'Id': 636,
          'Section_Id': 135,
          'Title': "Closing of the 'Enlightenment Phase' Section"
        },
        {
          'Desciption': '',
          'Duration': '00:05',
          'Id': 637,
          'Section_Id': 136,
          'Title': 'Section Introduction'
        },
        {
          'Desciption': '',
          'Duration': '01:01',
          'Id': 638,
          'Section_Id': 136,
          'Title': 'The Elaboration Phase'
        },
        {
          'Desciption': '',
          'Duration': '03:56',
          'Id': 639,
          'Section_Id': 136,
          'Title': 'Moodboard'
        },
        {
          'Desciption': '',
          'Duration': '03:20',
          'Id': 640,
          'Section_Id': 136,
          'Title': 'Storyboard'
        },
        {
          'Desciption': '',
          'Duration': '03:44',
          'Id': 641,
          'Section_Id': 136,
          'Title': '5W1H'
        },
        {
          'Desciption': '',
          'Duration': '03:02',
          'Id': 642,
          'Section_Id': 136,
          'Title': 'Business Model Canvas'
        },
        {
          'Desciption': '',
          'Duration': '01:43',
          'Id': 643,
          'Section_Id': 136,
          'Title': 'Real Prototype Development'
        },
        {
          'Desciption': '',
          'Duration': '1 question',
          'Id': 644,
          'Section_Id': 136,
          'Title': "Closing of the 'Elaboration Phase' Section"
        },
        {
          'Desciption': '',
          'Duration': '00:05',
          'Id': 645,
          'Section_Id': 137,
          'Title': 'Section Introduction'
        },
        {
          'Desciption': '',
          'Duration': '00:56',
          'Id': 646,
          'Section_Id': 137,
          'Title': 'The Verification Phase'
        },
        {
          'Desciption': '',
          'Duration': '01:46',
          'Id': 647,
          'Section_Id': 137,
          'Title': 'Evaluation of the Idea with Potential Consumers'
        },
        {
          'Desciption': '',
          'Duration': '01:56',
          'Id': 648,
          'Section_Id': 137,
          'Title': 'Evaluation of the Product with Potential Consumers'
        },
        {
          'Desciption': '',
          'Duration': '02:51',
          'Id': 649,
          'Section_Id': 137,
          'Title': 'Evaluation of the Idea or Product with Potential Partners'
        },
        {
          'Desciption': '',
          'Duration': '02:54',
          'Id': 650,
          'Section_Id': 137,
          'Title': 'Product Evaluation on the Market'
        },
        {
          'Desciption': '',
          'Duration': '01:52',
          'Id': 651,
          'Section_Id': 137,
          'Title': 'Evaluation of the Productive or Management Capacity of the Company'
        },
        {
          'Desciption': '',
          'Duration': '1 question',
          'Id': 652,
          'Section_Id': 137,
          'Title': "Closing of 'Verification Phase' Section"
        },
        {
          'Desciption': '',
          'Duration': '18:11',
          'Id': 653,
          'Section_Id': 138,
          'Title': 'Knuckle Joint design for Tractor'
        },
        {
          'Desciption': '',
          'Duration': '11:41',
          'Id': 654,
          'Section_Id': 138,
          'Title': 'Concept development'
        },
        {
          'Desciption': '',
          'Duration': '38:09',
          'Id': 655,
          'Section_Id': 139,
          'Title': 'Design of Fork'
        },
        {
          'Desciption': '',
          'Duration': '09:52',
          'Id': 656,
          'Section_Id': 139,
          'Title': 'Design of Eye'
        },
        {
          'Desciption': '',
          'Duration': '22:49',
          'Id': 657,
          'Section_Id': 139,
          'Title': 'Design of Pin'
        },
        {
          'Desciption': '',
          'Duration': '01:34',
          'Id': 658,
          'Section_Id': 140,
          'Title': 'Introduction'
        },
        {
          'Desciption': '',
          'Duration': '08:44',
          'Id': 659,
          'Section_Id': 140,
          'Title': 'Product Flop or Success?'
        },
        {
          'Desciption': '',
          'Duration': '14:18',
          'Id': 660,
          'Section_Id': 140,
          'Title': 'Types of New Products'
        },
        {
          'Desciption': '',
          'Duration': '09:14',
          'Id': 661,
          'Section_Id': 140,
          'Title': 'Services as Products'
        },
        {
          'Desciption': '',
          'Duration': '00:31',
          'Id': 662,
          'Section_Id': 140,
          'Title': 'BONUS LECTURE'
        },
        {
          'Desciption': '',
          'Duration': '01:38',
          'Id': 663,
          'Section_Id': 141,
          'Title': 'はじめに'
        },
        {
          'Desciption': '',
          'Duration': '09:28',
          'Id': 664,
          'Section_Id': 141,
          'Title': 'デジタルトランスフォーメーション(DX)とは'
        },
        {
          'Desciption': '',
          'Duration': '16:05',
          'Id': 665,
          'Section_Id': 141,
          'Title': '製造業での事例（前半）'
        },
        {
          'Desciption': '',
          'Duration': '19:18',
          'Id': 666,
          'Section_Id': 141,
          'Title': '製造業での事例（後半）'
        },
        {
          'Desciption': '',
          'Duration': '28:10',
          'Id': 667,
          'Section_Id': 141,
          'Title': '流通業での事例'
        },
        {
          'Desciption': '',
          'Duration': '12:28',
          'Id': 668,
          'Section_Id': 141,
          'Title': 'デジタルトランスフォーメーションシステムのアーキテクチャ'
        },
        {
          'Desciption': '',
          'Duration': '13:42',
          'Id': 669,
          'Section_Id': 141,
          'Title': 'サービスデザインの必要性'
        }
      ]);
    })
    .then(function () {
      return knex("Enrolled_Courses").insert([

      ]);
    })
    .then(function () {
      return knex("Feedbacks").insert([

      ]);
    });
};
