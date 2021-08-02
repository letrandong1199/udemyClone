exports.seed = function (knex) {
  // Deletes ALL existing entries
  console.log("seed users");
  return createUsers(knex);
};

function createUsers(knex) {
  return knex("Users")
    .del()
    .then(function () {
      return (
        knex("Users")
          //.returning("Id")
          .insert([
            {
              Email: "jonas_schmedtmann@udemy.com",
              // 'Id': 2,
              Name: "Jonas Schmedtmann",
              Password:
                "$2b$08$P0pQBexHqipk97HnauFqCOG.XxxmWDiiWVR0wkdmWUc7N.loGYh6a",
              Role_Id: 2,
            },
            {
              Email: "lawrence_turton@udemy.com",
              // 'Id': 3,
              Name: "Lawrence Turton",
              Password:
                "$2b$08$8uAOC.bR5c4UQJR1ZXfPnO2uKmkmNjWH/cl83tKqdv6KF3Wdw2DD2",
              Role_Id: 2,
            },
            {
              Email: "dr._sahand_ghavidel@udemy.com",
              // 'Id': 4,
              Name: "Dr. Sahand Ghavidel",
              Password:
                "$2b$08$OxRdhdoFLoSAOAaUYGUoD.VBSxM4guizSxR31lbpGJ7TbNcFfUv2O",
              Role_Id: 2,
            },
            {
              Email: "brad_hussey@udemy.com",
              // 'Id': 5,
              Name: "Brad Hussey",
              Password:
                "$2b$08$pDg.wWLtHUAeewceV.24jOO.VgmQswFpAX0/K.yWRbLHzvsXxRnGS",
              Role_Id: 2,
            },
            {
              Email: "r-tutorials_training@udemy.com",
              // 'Id': 6,
              Name: "R-Tutorials Training",
              Password:
                "$2b$08$BwmYvCbYZfCQlHAfkoV06uzJNjZk.PibeeCLlUdU6x1BscGO4nd/y",
              Role_Id: 2,
            },
            {
              Email: "rakesh_gopalakrishnan@udemy.com",
              // 'Id': 7,
              Name: "Rakesh Gopalakrishnan",
              Password:
                "$2b$08$DLJ19hBZby8b5AQBMcqRN.6hXYA4PIO6DPKscjMiSreZ9EgJEB.d2",
              Role_Id: 2,
            },
            {
              Email: "mike_west@udemy.com",
              // 'Id': 8,
              Name: "Mike West",
              Password:
                "$2b$08$AdoZutY1cbs5TwC78kMcCO9e9y/Tvm.5bjOCHDm4xIW3JT.OrONRG",
              Role_Id: 2,
            },
            {
              Email: "charles_redmond@udemy.com",
              // 'Id': 9,
              Name: "Charles Redmond",
              Password:
                "$2b$08$I839tZDezBIM/Uf544SQluJk5hpBUqV/U4o0BlvuOyYxjXq.hgox6",
              Role_Id: 2,
            },
            {
              Email: "vinoth_rathinam@udemy.com",
              // 'Id': 10,
              Name: "Vinoth Rathinam",
              Password:
                "$2b$08$bqa8UdAdRpHNne07u550gO/Eyi8CvBrnMcdIaAw6rekJM/aThhRcS",
              Role_Id: 2,
            },
            {
              Email: "grant_klimaytys@udemy.com",
              // 'Id': 11,
              Name: "Grant Klimaytys",
              Password:
                "$2b$08$GU9wpnpBYq9JAQgaQF4tB.AIRVVxDT07jgNQrDYVShX1TSbaEQng.",
              Role_Id: 2,
            },
            {
              Email: "mayuresh_wankhede@udemy.com",
              // 'Id': 12,
              Name: "Mayuresh Wankhede",
              Password:
                "$2b$08$evdKt40d5raSDj3.svKgzu/yEj8Np9NhKcSKBSOlsUCs8ydURNYMq",
              Role_Id: 2,
            },
            {
              Email: "sisoft_learning@udemy.com",
              // 'Id': 13,
              Name: "Sisoft Learning",
              Password:
                "$2b$08$xtV4D0wbD2vfQOBKqzXzD.vkf8jTUOZAEYnGj.boySZQTSk5yEAI.",
              Role_Id: 2,
            },
            {
              Email: "the_app_dojo@udemy.com",
              // 'Id': 14,
              Name: "The App Dojo",
              Password:
                "$2b$08$gSAUQI7Amvrp59rDg6Bpn.H3Rf87XFQJ7u/j3HXujqjuh/kfSR.52",
              Role_Id: 2,
            },
            {
              Email: "martie_dread@udemy.com",
              // 'Id': 15,
              Name: "Martie Dread",
              Password:
                "$2b$08$LwLdA.hnyrFcT6RQZg47CueOPCeCAymghGP/lRFFbGCpji4f38cqq",
              Role_Id: 2,
            },
            {
              Email: "carl_heaton@udemy.com",
              // 'Id': 16,
              Name: "Carl Heaton",
              Password:
                "$2b$08$t8.5yPgWPAxQIBJ52eUK6ey.FcJtAM3BhYbUgIl.gIRVgNQV4sQfC",
              Role_Id: 2,
            },
            {
              Email: "christine_maisel@udemy.com",
              // 'Id': 17,
              Name: "Christine Maisel",
              Password:
                "$2b$08$4O.q0KLn6lhnFk0PV2As0urYxLmOqVy8pV/EmuANkYyHW114DVL0K",
              Role_Id: 2,
            },
            {
              Email: "adam_frisbee@udemy.com",
              // 'Id': 18,
              Name: "Adam Frisbee",
              Password:
                "$2b$08$TK9JiRMt.U9VjpHv5csoL.byC.k51Z6HlCtsxbuPaGzDAVw85g9c6",
              Role_Id: 2,
            },
            {
              Email: "rawson_uddin@udemy.com",
              // 'Id': 19,
              Name: "Rawson Uddin",
              Password:
                "$2b$08$FtVHepwV3nRH06AfHKUciOAiC3Rh57qkxeRSlSqpHzyiqQzByX4Yu",
              Role_Id: 2,
            },
            {
              Email: "hardy_fowler@udemy.com",
              // 'Id': 20,
              Name: "Hardy Fowler",
              Password:
                "$2b$08$JyOXbZbKGOAS1y4L95SMJOM3FyKWyiC6ZytBADj2F1vnJM3CSkAYa",
              Role_Id: 2,
            },
            {
              Email: "donelli_dimaria@udemy.com",
              // 'Id': 21,
              Name: "Donelli DiMaria",
              Password:
                "$2b$08$Hu7gWs/nWpRMcLEZWJayKuRTN99r.A5n5sygJNw0GGoWI/1Da8uNO",
              Role_Id: 2,
            },
            {
              Email: "andrew_boehm@udemy.com",
              // 'Id': 22,
              Name: "Andrew Boehm",
              Password:
                "$2b$08$Wz2iIJB1y4gr7VIWesHQ/uSNB4v6gQuTRw4UEEOUOimz0aQA4QN7S",
              Role_Id: 2,
            },
            {
              Email: "brian_dickinson@udemy.com",
              // 'Id': 23,
              Name: "Brian Dickinson",
              Password:
                "$2b$08$d32Gbshx/zPhSJlIw7KRPe1JPdPMFd8LfnzxWFvPDeJ3yr5GZ1FtW",
              Role_Id: 2,
            },
            {
              Email: "bruna_ruschel_moreira@udemy.com",
              // 'Id': 24,
              Name: "Bruna Ruschel Moreira",
              Password:
                "$2b$08$e7h7R8rNmUuK4bYJid/FXOs7cRf5h.0ovzev4Pj2CYACG.2EaFmH6",
              Role_Id: 2,
            },
            {
              Email: "vilas_patil@udemy.com",
              // 'Id': 25,
              Name: "Vilas Patil",
              Password:
                "$2b$08$3.xv6Cqb8OhQH/.hfggg3eFhTy20cQbGyraoUWLGCwegIn2vAdCY.",
              Role_Id: 2,
            },
            {
              Email: "thomas_giordano@udemy.com",
              // 'Id': 26,
              Name: "Thomas Giordano",
              Password:
                "$2b$08$.m4OEVxKsM5Yb9ev0/Vyfu1GlT4HIEiH/vUCiiJtY6lfN2Y7b8h1e",
              Role_Id: 2,
            },
            {
              Email: "一般社団法人情報サービス産業協会_（jisa）@udemy.com",
              // 'Id': 27,
              Name: "一般社団法人情報サービス産業協会 （JISA）",
              Password:
                "$2b$08$B6yhtqPged97QFhPEnwa/u8aE9NYWgLWr03G2JGUhgWbAh6nl4vmq",
              Role_Id: 2,
            },
          ])
      );
    });
}
