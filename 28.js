
//Tell the library which element to use for the table
cards.init({table:'#card-table', type:TWENTYEIGHT});

//Create a new deck of cards
deck = new cards.Deck();
//By default it's in the middle of the container, put it slightly to the side
deck.x -= 50;
//cards.all contains all cards, put them all in the deck
deck.addCards(cards.all);
//No animation here, just get the deck onto the table.
deck.render({immediate:true});


//Now lets create a couple of hands, one face down, one face up.
//upperhand = new cards.Hand({faceUp:false, y:60});
lowerhand = new cards.Hand({faceUp:true,  y:340});
lefthand = new cards.Hand({faceUp:true,  x:100,y:200});
upperhand = new cards.Hand({faceUp:true,  y:60});
righthand = new cards.Hand({faceUp:true,  x:600,y:200});

var myHand = lowerhand;

//Lets add a discard pile
discardPile_lower = new cards.Deck({faceUp:true});
discardPile_lower.x += 60;
discardPile_lower.y += 0;
discardPile_left = new cards.Deck({faceUp:true});
discardPile_left.x += -10;
discardPile_left.y += 0;
discardPile_upper = new cards.Deck({faceUp:true});
discardPile_upper.x += -80;
discardPile_upper.y += 0;
discardPile_right = new cards.Deck({faceUp:true});
discardPile_right.x += -150;
discardPile_right.y += 0;

//Let's deal when the clear button is pressed:
$('#clear').click(function() {
discardPile_lower.render({hideme:"hideit"});
discardPile_left.render({hideme:"hideit"});
discardPile_upper.render({hideme:"hideit"});
discardPile_right.render({hideme:"hideit"});
});

//Let's deal when the Deal button is pressed:
$('#deal1').click(function() {
	//Deck has a built in method to deal to hands.
	$('#deal1').hide();
	deck.deal(4, [lowerhand,lefthand,upperhand,righthand], 50, function() {
		//This is a callback function, called when the dealing
		//is done.
		//discardPile.addCard(deck.topCard());
		//discardPile.render();


	});

});
//Let's deal when the Deal button is pressed:
$('#deal2').click(function() {
	//Deck has a built in method to deal to hands.
	$('#deal2').hide();
	deck.deal(4, [lowerhand,lefthand,upperhand,righthand], 50, function() {
		//This is a callback function, called when the dealing
		//is done.
		//discardPile.addCard(deck.topCard());
		//discardPile.render();
		var totalhands = [lowerhand,lefthand,upperhand,righthand]
		for (var h = 0; h < totalhands.length; h++) {
			var currenthand = totalhands[h]
		for (var i = 0; i < currenthand.length; i++) {
			//console.log(currenthand[i].suit)
			//console.log(currenthand[i].rank)
			for (var j = i+1; j < currenthand.length; j++) {
				if(currenthand[i].suit == currenthand[j].suit)
				{
					temp = currenthand[i+1]
					currenthand[i+1] = currenthand[j]
					currenthand[j] = temp
				}
			}
		  }
		  currenthand.render();
		}
		//myHand.render();
	});
});

//When you click on the top card of a deck, a card is added
//to your hand
//deck.click(function(card){
//	if (card === deck.topCard()) {
//		lowerhand.addCard(deck.topCard());
//		lowerhand.render();
//	}
//});

//Finally, when you click a card in your hand, if it's
//the same suit or rank as the top card of the discard pile
//then it's added to it
//lowerhand.click(function(card){
//	if (card.suit == discardPile.topCard().suit
//		|| card.rank == discardPile.topCard().rank) {
//		discardPile.addCard(card);
//		discardPile.render();
//		lowerhand.render();
//	}
//});

lowerhand.click(function(card){
		discardPile_lower.addCard(card);
		discardPile_lower.render();
		lowerhand.render();
});
lefthand.click(function(card){
	discardPile_left.addCard(card);
	discardPile_left.render();
	lefthand.render();
});
upperhand.click(function(card){
	discardPile_upper.addCard(card);
	discardPile_upper.render();
	upperhand.render();
});
righthand.click(function(card){
	discardPile_right.addCard(card);
	discardPile_right.render();
	righthand.render();
});


//So, that should give you some idea about how to render a card game.
//Now you just need to write some logic around who can play when etc...
//Good luck :)
