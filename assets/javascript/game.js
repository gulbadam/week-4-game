//hp generator beetween 100-120
function randomGenHp(){
	return Math.floor(Math.random()*(170-120+1))+120;
	
}

function randomGenPa() {
	return Math.floor(Math.random()*(20-10+1))+10;
	
}
function randomGenCa() {
	return Math.floor(Math.random()*(40-20+1))+ 20;
}

var yoda ={
	name: "Yoda",
	divName:"yoda",
	pic: "assets/images/yoda.png",
	power: basehp = randomGenHp(),
	health: hp=basehp,
	powerAttack: attack = randomGenPa(),
	nextAttack: attackInc=attack,
	powerContAttack: contAttack = randomGenCa(),
	setDamage: function(pwr) {
	    this.health-=pwr;
	    if(this.health > 0) {
			this.nextAttack += this.powerAttack;
				return true;
		}
		else {
			this.health = 0;
				return false;			
		}
	},
	percentage: function() {
		return Math.floor(this.health/this.power*100)
	}	
};
var leia ={
	name:"Princess Leia",
	divName:"leia",
	pic: "assets/images/lea.png",
	power: basehp=randomGenHp(),
	health: hp=basehp,
	powerAttack: attack= randomGenPa(),
	nextAttack: attackInc=attack,
	powerContAttack: contAttack = randomGenCa(),
	setDamage: function(pwr) {
	    this.health-=pwr;
		if(this.health > 0) {
			this.nextAttack += this.powerAttack;
				return true;
		}
		else {
			this.health = 0;
				return false;			
		}
	},
	percentage: function() {
		return Math.floor(this.health/this.power*100);
	}
};
var luke={
	name:"Luke Skywalker",
	divName:"luke",
	pic:"assets/images/like.png",
	power: basehp = randomGenHp(),
	health: hp=basehp,
	powerAttack: attack = randomGenPa(),
	nextAttack: attackInc=attack,
	powerContAttack: contAttack = randomGenCa(),
	setDamage: function(pwr) {
	    this.health-=pwr;
		if(this.health > 0) {
			this.nextAttack += this.powerAttack;
				return true;
		}
		else {
			this.health = 0;
				return false;			
		}
	},
	percentage: function() {
		return Math.floor(this.health/this.power*100);
	}
};
var maul ={
	name:"Dart Maul",
	divName:"maul",
	pic: "assets/images/maul.png",
	power: basehp = randomGenHp(),
	health: hp=basehp,
	powerAttack: attack =  randomGenPa(),
	nextAttack: attackInc=attack,
	powerContAttack: contAttack = randomGenCa(),
	setDamage: function(pwr) {
	    this.health-=pwr;
		if(this.health > 0) {
			this.nextAttack += this.powerAttack;
				return true;
		}
		else {
			this.health = 0;
				return false;			
		}
	},
	percentage: function() {
		return Math.floor(this.health/this.power*100);
	}
};
var charArray = [yoda, leia, luke, maul];
for(var i=0; i<charArray.length; i++) {
	$("#"+charArray[i].divName).text(charArray[i].health);
	$("#"+charArray[i].divName).attr("style", "width:"+charArray[i].percentage()+"%");
}
$(document).ready(function() {
	var actDescr = [
		"THERE IS NO YOUR CHARACTER!",
		"THERE IS NO OPPONENT!",
		"&nbsp;",
		"YOU'VE BEEN DEFEATED... GAME OVER!",
		"YOU'VE WON... GAME OVER!",
	];
	var yourChar;
	var oppoChar;
	var remainOpponent = charArray.length - 1;
    var gameStep = 0;
	$("#gameInst").text("SELECT YOUR CHARACTER...");
	$(".charGrp").hover(function(event) {
		if($(this).attr("selchar") === "no") {
			if(event.type === "mouseenter") {
				$(this).css('border', '0.5rem solid #784212');
			}
			else if(event.type === "mouseleave") {
				$(this).css('border', '0.5rem solid white');
			}
		}
	});
	$(".charGrp").on("click", function() {
		if($(this).attr("selchar") === "no") {
			var idx = $(this).attr("idxval");
			switch(gameStep) {
			case 0:
				yourChar = charArray[parseInt(idx)];
				$(this).attr("selchar", "yes");
				$(".charGrp").css("background-color", "rgba(255,0,0, 0.3)");
				$(this).css({"background-color": "rgba(255,255,255, 0.3)",
				'border': '0.5rem solid #28F008'});
				$("#yourchar").html('<h2>Your Character</h2>');
				$("#yourchar").append($(this));
				gameStep = 1;
				$("#gameInst").text("SELECT OPPONENT...");
				break;
			case 1:
				oppoChar = charArray[parseInt(idx)];
				$(this).css({"background-color": "rgba(255, 0, 0, 0.3)",
				'border': '0.5rem solid #FC0509'});
				$("#oppochar").html('<h2>Defender</h2>');
				$(this).attr("selchar", "yes");
				$("#oppochar").append($(this));
				gameStep = 2;
				$("#gameInst").text("ATTACK!!");
				break;
			default:
				break;
			}
		}
	});
	$("#attack").on("click", function(){
		if(gameStep===2) {
			var dispMsg = ("You attacked " + oppoChar.name + " for " + yourChar.nextAttack + " damage. ");
			if(!oppoChar.setDamage(yourChar.nextAttack)) {
				dispMsg +=(oppoChar.name + " is Dead.");
				$("#oppochar").html('<h2>Defender Lost</h2>');
				$("#gameInst").text("SELECT NEXT OPPONENT...");
				remainOpponent--;
				if(remainOpponent <= 0) {
					gameStep = 4;
					dispMsg = actDescr[gameStep];
					$("#gameInst").text("");
				}
				else {
					gameStep = 1;
				}
			}
		else{
			$("#"+oppoChar.divName).text(oppoChar.health);
			$("#"+oppoChar.divName).attr("style", "width:"+oppoChar.percentage()+"%");
			dispMsg += (oppoChar.name + " attacked you back for " + oppoChar.powerContAttack + " damage.");
			if(!yourChar.setDamage(oppoChar.powerContAttack)) {
				$("#yourchar").html("<h2>You've been defeated</h2>");
				$("#gameInst").text("");
				$("#"+yourChar.divName).text("0");
				$("#"+yourChar.divName).attr("style", "width:0%");
				gameStep=3;
				dispMsg = actDescr[gameStep];
			}
			else{
				$("#"+yourChar.divName).text(yourChar.health);
				$("#"+yourChar.divName).attr("style", "width:"+yourChar.percentage()+"%");
			}
		}
		$("#actDesc").html(dispMsg);
		}
		else {
			$("#actDesc").html(actDescr[gameStep]);
		}

		if((gameStep === 3) || (gameStep === 4)) {
			$("#actDesc").attr("style", "color:#f00;")
		}
	})
	$("#reload").on("click", function() {
		location.reload();
	});
});
