/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: No Rhythm
@author: Eduardo
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const blackPixel = "b"
const yellowPixel = "y"

setLegend(
  [player, bitmap`
................
................
................
................
................
................
................
................
066..........6F0
066..........6F0
066..........6F0
0F66........6FF0
.0F66......66F0.
..0F6666666FF0..
...0FFFFFFFF0...
....00000000....`],
  [yellowPixel, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`],
  [blackPixel, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`]
)

const level = map`
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
.............................................................
p............................................................`
setMap(level)

function drawX(xTable, y, pixel, offset) {
  if (offset == null){
    offset = [0, 0]
  }
  
  let x1 = xTable[0] + offset[0]
  let x2 = xTable[1] + offset[0]
  y = y + offset[1]
  let xLength = x2 - x1 + 1

  for (i = 0; i < xLength; i++) {
    addSprite(x1+i, y, pixel)
  }
}

function drawY(x, yTable, pixel, offset) {
  if (offset == null){
    offset = [0, 0]
  }
  
  let y1 = yTable[0] + offset[1]
  let y2 = yTable[1] + offset[1]
  x = x + offset[0]
  let yLength = y2 - y1 + 1

  for (i = 0; i < yLength; i++) {
    addSprite(x, y1+i, pixel)
  }
}

function addSprite2(x, y, pixel, offset){
  if (offset == null){
    offset = [0, 0]
  }

  addSprite(x + offset[0], y + offset[1], pixel)
}

function getTilesX(xTable, y, offset) {
  if (offset == null){
    offset = [0, 0]
  }

  let x1 = xTable[0] + offset[0]
  let x2 = xTable[1] + offset[0]
  y = y + offset[1]
  let xLength = x2 - x1 + 1

  let tiles = []
  for (let i = 0; i < xLength; i++) {
    tiles.push(getTile(x1+i, y)[0])
  }
  return tiles
}

function getTilesY(x, yTable, offset) {
  if (offset == null){
    offset = [0, 0]
  }
  
  let y1 = yTable[0] + offset[1]
  let y2 = yTable[1] + offset[1]
  x = x + offset[0]
  let yLength = y2 - y1 + 1
  
  let tiles = []
  for (let i = 0; i < yLength; i++) {
    tiles.push(getTile(x, y1+i)[0])
  }
  return tiles
}

function getTile2(x, y, offset) {
  if (offset == null){
    offset = [0, 0]
  }

  return getTile(x + offset[0], y + offset[1])
}

let directions = ["up", "down", "left", "right"]

function getInnerCircle(offset) {
  if (offset == null){
    offset = [0, 0]
  }
  
  let table1 = getTilesY(28, [29,31], offset)
  let table2 = getTilesY(29, [28,32], offset)
  let table3 = getTilesY(30, [28,32], offset)
  let table4 = getTilesY(31, [28,32], offset)
  let table5 = getTilesY(32, [29,31], offset)

  let tiles = table1.concat(table2, table3, table4, table5)
  
  return tiles
}

function deleteAndCount(table) {
  var count = 0
  
  for (i=0;i<table.length;i++) {
    if (table[i] != null) {
      count += 1
      let x = table[i].x
      let y = table[i].y
      clearTile(x, y)
    }
  }
  
  return count
}

function makeCircle(pixel, offset) {
  if (offset == null){
    offset = [0, 0]
  }

  drawY(27, [29, 31], pixel, offset) // left line
  addSprite2(28, 28, pixel, offset)
  
  drawY(33, [29, 31], pixel, offset) // right line
  addSprite2(32, 32, pixel, offset)

  drawX([29, 31], 27, pixel, offset) // top line
  addSprite2(32, 28, pixel, offset)
  
  drawX([29, 31], 33, pixel, offset)// bottom line
  addSprite2(28, 32, pixel, offset)

  
  let table1 = [
    getTile2(28, 28, offset)[0],
    getTile2(32, 32, offset)[0],
    getTile2(32, 28, offset)[0],
    getTile2(28, 32, offset)[0],
  ]
  let table2 = getTilesX([29, 31], 27, offset)
  let table3 = getTilesX([29, 31], 33, offset)
  let table4 = getTilesY(27, [29, 31], offset)
  let table5 = getTilesY(33, [29, 31], offset)
  
  let finalTable = table1.concat(table2, table3, table4, table5)
  return finalTable
}

function makeInnerCircle(pixel, offset) {
  if (offset == null){
    offset = [0, 0]
  }
  
  drawY(28, [29,31], pixel, offset)
  drawY(29, [28,32], pixel, offset)
  drawY(30, [28,32], pixel, offset)
  drawY(31, [28,32], pixel, offset)
  drawY(32, [29,31], pixel, offset)

  let table1 = getTilesY(28, [29,31], offset)
  let table2 = getTilesY(29, [28,32], offset)
  let table3 = getTilesY(30, [28,32], offset)
  let table4 = getTilesY(31, [28,32], offset)
  let table5 = getTilesY(32, [29,31], offset)

  let finalTable = table1.concat(table2, table3, table4, table5)
  return finalTable
}

function randomDirectionCircle(string) {
  if (string == "up") {
    let circle = makeInnerCircle(yellowPixel, [0, -27])
    circle.direction = "up"
    circle.distance = 30
    circle.traveled = 0
    return circle
    
  } else if (string == "down") {
    let circle = makeInnerCircle(yellowPixel, [0, 27])
    circle.direction = "down"
    circle.distance = 30
    circle.traveled = 0
    return circle
    
  } else if (string == "left") {
    let circle = makeInnerCircle(yellowPixel, [-27, 0])
    circle.direction = "left"
    circle.distance = 30
    circle.traveled = 0
    return circle
    
  } else if (string == "right") {
    let circle = makeInnerCircle(yellowPixel, [27, 0])
    circle.direction = "right"
    circle.distance = 30
    circle.traveled = 0
    return circle
  }
}



/*
function fallDown(table) {
  let count = 1

  for (let i = 0; i < count; i++){
    moveDown(table, 1)
  }
}
*/

function moveRight(table, magnitude){
  if (table.traveled == table.distance) {
    return
  }
  table.traveled += 1
  for (let i = 0; i < table.length; i++){
    table[i].x += magnitude
  }
}

function moveLeft(table, magnitude){
  if (table.traveled == table.distance) {
    return
  }
  table.traveled += 1
  for (let i = 0; i < table.length; i++){
    table[i].x -= magnitude
  }
}

function moveUp(table, magnitude){
  if (table.traveled == table.distance) {
    return
  }
  table.traveled += 1
  for (let i = 0; i < table.length; i++){
    table[i].y -= magnitude
  }
}

function moveDown(table, magnitude){
  if (table.traveled == table.distance) {
    return
  }
  table.traveled += 1
  for (let i = 0; i < table.length; i++){
    table[i].y += magnitude
  }
}

let blackCircle = makeCircle(blackPixel)
// let yellowCircle = makeCircle(yellowPixel, [0, -27])


let fallingCircles = [
]

onInput("d", function(){
  console.log(getInnerCircle())
  let count = deleteAndCount(fallingCircles[0])
})

onInput("a", function(){
  moveLeft(blackCircle, 1)
})

function moveDirection(table, magnitude) {
  if (table.direction == "up") {
    moveDown(table, magnitude)
  } else if (table.direction == "down") {
    moveUp(table, magnitude)
  } else if (table.direction == "left") {
    moveRight(table, magnitude)
  } else if (table.direction == "right") {
    moveLeft(table, magnitude)
  } 
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

var ticker = 0

function moveLoop() {
  for (let i = 0; i < fallingCircles.length; i++) {
    moveDirection(fallingCircles[i], 1)
  }
}

function spawn() {
  let index = getRndInteger(0, 3)
  
  fallingCircles.push(
    randomDirectionCircle(
      directions[index]
    )
  )
  setTimeout(spawn, getRndInteger(1000, 2000))
}

function gameLoop() {
  moveLoop()
  setTimeout(gameLoop, 1000 / 15)
}

function startGame() {
  spawn()
  gameLoop()
}

startGame()