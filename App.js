document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('Score');
    const width = 28; // 28 x 28 = 784 squares
    let score = 0;

    //layout grid and what is in the squares 
    // Legend: 0 - pac-dot, 1 - wall, 2 - ghostlair, 3 - power pellet, 4 - empty.
    const layout = [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ]

    const squares = [] // is empty because we will be pushing into

    // draw the grid and render it
    function createBoard(){
        for (let i=0; i<layout.length; i++){
            const square = document.createElement("div");
            grid.appendChild(square);
            squares.push(square);
            // add layout to the board
            if(layout[i]===0){
                squares[i].classList.add("pac-dot")
            } else if (layout[i]===1){
                squares[i].classList.add("wall")
            } else if (layout[i]===2){
                squares[i].classList.add("ghost-lair")
            } else if (layout[i]===3){
                squares[i].classList.add("power-pellet")
            }
        }
    }
    // call the function
    createBoard();

    // starting position of pacman 
    let pacmanCurrentIndex = 490;
    squares[pacmanCurrentIndex].classList.add("pac-man");

    // move pacman
    function movePacman(e) {
       squares[pacmanCurrentIndex].classList.remove("pac-man");
       
       switch (e.keyCode){
           case 37:
               if (pacmanCurrentIndex % width !== 0 && !squares[pacmanCurrentIndex - 1].classList.contains("wall")
               && !squares[pacmanCurrentIndex - 1].classList.contains("ghost-lair")) 
               pacmanCurrentIndex -= 1;
                // moving pacman from left to right topology 
                if((pacmanCurrentIndex - 1) === 363){
                    pacmanCurrentIndex = 391
                }
                break;
            case  38:
                if (pacmanCurrentIndex - width >= 0 && !squares[pacmanCurrentIndex - width].classList.contains("wall")
                && !squares[pacmanCurrentIndex - width].classList.contains("ghost-lair")) 
                pacmanCurrentIndex -= width;
                break;
            case  39:
                if (pacmanCurrentIndex % width < width -1 && !squares[pacmanCurrentIndex + 1].classList.contains("wall")
                && !squares[pacmanCurrentIndex + 1].classList.contains("ghost-lair")) 
                pacmanCurrentIndex += 1;
                // moving pacman from left to right topology 
                if((pacmanCurrentIndex + 1) === 392){
                    pacmanCurrentIndex = 364
                }
                break;
            case  40:
                if (pacmanCurrentIndex + width < width*width && !squares[pacmanCurrentIndex + width].classList.contains("wall")
                && !squares[pacmanCurrentIndex + width].classList.contains("ghost-lair")) 
                pacmanCurrentIndex += width;
                break;
       }

       squares[pacmanCurrentIndex].classList.add("pac-man");

       pacDotEaten()
       //powerPelletEaten()
       //checkForGameOver()
       //checkForWin()
    }
    // add event to move pacman
    document.addEventListener("keyup", movePacman);
    
    // pacman eating pac-dots and getting points
    function pacDotEaten(){
    if(squares[pacmanCurrentIndex].classList.contains("pac-dot")){
        score ++;
        scoreDisplay.innerHTML = score;
        squares[pacmanCurrentIndex].classList.remove("pac-dot");
        }
    }

    // create our Ghost template
    class Ghost {
        constructor(className, startIndex, speed){
            this.className = className;
            this.startIndex = startIndex;
            this.speed = speed;
            this.currentIndex = startIndex;
            this.timerId = NaN;
        }
    }

    ghosts = [
        new Ghost('urtzi', 348, 250),
        new Ghost('sheila', 376, 400),
        new Ghost('ekhi', 351, 300),
        new Ghost('maddi', 379, 500)
    ]

    // drawn ghosts onto grid
    ghosts.forEach(ghost => {
        squares[ghost.currentIndex].classList.add(ghost.className);
        squares[ghost.currentIndex].classList.add('ghost');
    });

    // move ghosts randomly
    ghosts.forEach(ghost => moveGhost(ghost));

    // write the function to move ghost
    function moveGhost(ghost){
        const directions = [-1, +1, width, -width];
        let direction = directions[Math.floor(Math.random()*directions.length)];
        ghost.timerId = setInterval(function(){
            // ghosts can move if there is not a wall or a ghost
        if(!squares[ghost.currentIndex + direction].classList.contains('wall') && 
            !squares[ghost.currentIndex + direction].classList.contains('ghost')){
                //you can go here
                //remove all ghosts related classes 
                squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
                //change the currentIndex to the new safe square
                ghost.currentIndex += direction;
                //redraw the ghost in the new safe square
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');

                //else find and try a new direction
            }else direction = directions[Math.floor(Math.random()*directions.length)]

        }, ghost.speed)
    }
})