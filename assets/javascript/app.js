$(document).ready(function () 

    // converted some obgects in array to "get and set assessors" as suggested by VS code intelisense. testing difference and to see if it breaks code
    {
        
        var options = 
        [
            {
                _question: "Who lives in a barrel?", 
                get question() {
                    return this._question;
                },
                set question(value) {
                    this._question = value;
                },
                choice: ["El Chavo", "Doña Florinda", "Don Ramon", "Kiko"],
                answer: 0,
                photo: "assets/images/Chavo.jpg"
            },
        
            {
                _question_1: "His mom always spoils him with a giant ball?", 
                get question() {
                    return this._question_1;
                },
                set question(value) {
                    this._question_1 = value;
                },
                choice: ["La Chilindrina", "Don Ramon", "Kiko", "El Chavo"],
                answer: 2,
                photo: "assets/images/Kiko.jpg"
            },
        
            {
                _question_2: "Who is Don Ramon's child?", 
                get question() {
                    return this._question_2;
                },
                set question(value) {
                    this._question_2 = value;
                },
                choice: ["EL Chavo", "Kiko", "La Chilindrina", "Profesor Jirafales" ],
                answer: 2,
                photo: "assets/images/la_Chilindrina.jpg"
            },
        
            {
                _question_3: "Who's Doña Florinda's love interest?", 
                get question() {
                    return this._question_3;
                },
                set question(value) {
                    this._question_3 = value;
                },
                choice: ["Don Ramon", "El Chavo", "Kiko", "Profesor Jirafales" ],
                answer: 3,
                photo: "assets/images/Profesor_Jirafales.jpg"
            },
        
            {
                question: "Who does Don Ramon hide from paying the rent?", 
                choice: ["Señor Barriga", "Doña Florinda", "Kiko", "Profesor Jirafales" ],
                answer: 0,
                photo: "assets/images/Señor_Barriga.jpg"
            },
        
            {
                question: "Who is always wrongfully accusing and hitting Don Ramon?", 
                choice: ["Señor Barriga", "Doña Florinda", "Kiko", "Profesor Jirafales" ],
                answer: 1,
                photo: "assets/images/Dona_Florinda.jpg"
            },
        
            {
                question: "Who is La Bruja del 71 obsessed with?", 
                choice: ["El Chavo", "Doña Florinda", "Don Ramon", "Kiko" ],
                answer: 2,
                photo: "assets/images/Don_Ramon.jpg"
            },
        
            {
                question: "Who does el Chapulin Colorado look like?", 
                choice: ["Kiko", "Doña Florinda", "Don Ramon", "El Chavo" ],
                answer: 3,
                photo: "assets/images/Chavo.jpg"
            }
        ];
        
        //variable city
        var right = 0;
        var wrong = 0;
        var unanswer = 0;
        var running = false;
        var questionCount = options.length;
        var pick;
        var index;
        var newArray = [];
        var holder = [];
        var timer = 20;
        var intervalId;
        var userGuess ="";

        $("#reset").hide();
        
        //start game button
        $("#start").on("click", function () 
            {
                $("#start").hide();
                displayQuestion();
                runTimer();
                
                for(var i = 0; i < options.length; i++) 
                    {
                        holder.push(options[i]);
                    }
            }
        )
        
        //timer start
        function runTimer()
        {
            if (!running) 
            {
                intervalId = setInterval(decrement, 1000); 
                running = true;
            }
        }
        
        //timer countdown
        function decrement() 
        {
            $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
            timer --;
            
            //stops at 0
            if (timer === 0) 
            {
                unanswer++;
                stop();
                $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
                hidepicture();
            }   
            
        }
        
        //timer stop
        function stop() 
        {
            running = false;
            clearInterval(intervalId);
        }
        
        //rando pick
        function displayQuestion() 
        {
        
            //rando index in array
        
            index = Math.floor(Math.random()*options.length);
            pick = options[index];
            
        
            
            //iterate answers array shows
            $("#questionblock").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerchoice");
            userChoice.html(pick.choice[i]);
            
            //assign array position to check answeres
            userChoice.attr("data-guessvalue", i);
            $("#answerblock").append(userChoice);
        
        }
        
        //click function to select answer and outcomes
        $(".answerchoice").on("click", function () 
        {

            //grab array position from Guess

            userGuess = parseInt($(this).attr("data-guessvalue"));
            
            //correct guess or wrong guess outcomes

            if (userGuess === pick.answer) {
            stop();
            right++;
            userGuess="";
            $("#answerblock").html("<p>Correct!</p>");
            hidepicture();
            } else {
            stop();
            wrong++;
            userGuess="";
            $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
            }
            })
        }
        
        function hidepicture () 
        {
            $("#answerblock").append("<img src=" + pick.photo + ">");
            newArray.push(pick);
            options.splice(index,1);
            var hidpic = setTimeout(function() {
            $("#answerblock").empty();
            timer= 20;
            
            //score screen at all questions answered

            if ((wrong + right + unanswer) === questionCount) {
            $("#questionblock").empty();
            $("#questionblock").html("<h3>Game Over! Here's how you did: </h3>");
            $("#answerblock").append("<h4> Correct: " + right + "</h4>" );
            $("#answerblock").append("<h4> Incorrect: " + wrong + "</h4>" );
            $("#answerblock").append("<h4> Unanswered: " + unanswer + "</h4>" );
            $("#reset").show();
            right = 0;
            wrong = 0;
            unanswer = 0;
            } else {
            runTimer();
            displayQuestion();
            }
            }, 3000);
        }

        $("#reset").on("click", function() 
            {
                $("#reset").hide();
                $("#answerblock").empty();
                $("#questionblock").empty();
                for(var i = 0; i < holder.length; i++) {
                options.push(holder[i]);
                }
                runTimer();
                displayQuestion();
            }
        )     
    }
)
    