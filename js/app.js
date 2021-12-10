var score = 0;
var lives = 3;
var SavingRyan =  (function () {

    function SavingRyan() {
        this.elId = 'ryan';
        this.words = [
            "PUPPY","TURTLE","RABBIT","RACCOON","KITTEN","HAMSTER",
        "SHEEP","TURKEY","CHICKEN","HORSE","CHIMPANZEE","KANGAROO","KOALA",
        "ELEPHANT","LEOPARD","HIPPOPOTAMUS","GIRAFFE","CROCODILE","ALLIGATOR",
        "HEDGEHOG"
        ];
    }
    SavingRyan.prototype.reset = function () {

        this.STOPPED = false;
        this.MISTAKES = 0;
        this.GUESSES = [];
        this.WORD = this.words[Math.floor(Math.random() * this.words.length)];
        this.hideElementByClass('h');
        this.showElementByIdWithContent(this.elId + "_guessbox", null);
        this.showElementByIdWithContent(this.elId + "_word", this.getGuessedfWord());
    };
    SavingRyan.prototype.guess = function (letter) {
        letter = letter.charAt(0).toUpperCase();

        if (this.STOPPED || this.GUESSES.indexOf(letter) > -1) {
            return;
        }
        this.GUESSES.push(letter);
        this.showElementByIdWithContent(this.elId + "_word", this.getGuessedfWord());
        this.showElementByIdWithContent(this.elId + "_guesses", this.GUESSES.join(''));

        if (this.WORD.indexOf(letter) < 0) {
            this.MISTAKES++;
            this.showElementByIdWithContent(this.elId + "_" + this.MISTAKES, null);
            if (this.MISTAKES === 6) {
                lives--;
                this.showElementByIdWithContent(this.elId + "_end", "GAME OVER!<br/>The word was: " + this.WORD);
                this.STOPPED = true;
                this.showElementByIdWithContent("score", "Score: " + score);
                if(lives === 0){
                    myFunction();
                    // this.showElementByIdWithContent("gamemodal", "Game Over! Ur score: " + score);                    
                }
                else
                this.showElementByIdWithContent("lives", "Lives-left: " + lives);
            }
        } else if (this.WORD.indexOf(this.getGuessedfWord()) !== -1) {
            score++;
            this.showElementByIdWithContent("score", "Score: " + score);
            this.showElementByIdWithContent("lives", "Lives-left: " + lives);
            this.showElementByIdWithContent(this.elId + "_end", "You made it!<br/>The word was: " + this.WORD);
            this.STOPPED = true;
        }
        
        // this.showElementByIdWithContent("score", "score: " + this.score);
    };
    // SavingRyan.prototype.drawScore = function(){
    //     ctx.font = "16px Arial";
    //     ctx.fillStyle = "#000000";
    //     ctx.fillText("Score: "+ score, 8, 20);
    // }
    function myFunction() {

        document.getElementById("gamescore").innerHTML = "Your Score: " + score;
        $('#gamemodal').modal('show');
        // $('.alert').alert();
        // // $(".alert").alert('close');
        // $('#myAlert').on('closed.bs.alert', function () {
        //     // do something…
        //     location.reload(true);
        //   })
        // alert("Game Over! Your score: " + score);
        // var txt;

        //  confirm("Game Over! Your score: " + score) 
        //  location.reload(true);
        
        // else {
        //   txt = "You pressed Cancel!";
        // }

        // location.reload(true);
      }
    SavingRyan.prototype.showElementByIdWithContent = function (elId, content) {
        if (content !== null) {
            document.getElementById(elId).innerHTML = content;
        }
        document.getElementById(elId).style.opacity = 1;
    };

    SavingRyan.prototype.hideElementByClass = function (elClass) {
        var elements = document.getElementsByClassName(elClass), i;
        for (i = 0; i < elements.length; i++) {
            elements[i].style.opacity = 0;
        }
    };

    SavingRyan.prototype.getGuessedfWord = function () {
        var result = "", i;
        for (i = 0; i < this.WORD.length; i++) {
            result += (this.GUESSES.indexOf(this.WORD[i]) > -1) ?
                    this.WORD[i] : "_";
        }
        return result;
    };
    return new SavingRyan();
}());