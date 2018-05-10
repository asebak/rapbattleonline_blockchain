"use strict";

var RapBattleItem = function(text) {
	if (text) {
		var obj = JSON.parse(text);
		this.audio1 = obj.audio1;
        this.audio2 = obj.audio2;
	} else {
		this.audio1 = "";
        this.audio2 = "";
	}
};

RapBattleItem.prototype = {
	toString: function () {
		return JSON.stringify(this);
	}
};

var RapBattle = function () {
    LocalContractStorage.defineMapProperty(this, "rapbattle", {
        parse: function (text) {
            return new RapBattleItem(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });

    LocalContractStorage.defineMapProperty(this, "battleids", {
        parse: function (text) {
            return new RapBattleItem(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
    LocalContractStorage.defineProperty(this, "battlecount", null)
};

RapBattle.prototype = {
    init: function () {
        this.battlecount = 0;
    },

    start: function(challengedId, endDate) {
        //starts a battle
        //todo more validation on enddates
        if ( endDate === "" ) {
            throw new Error("empty end date")
        }
        var battleId = Blockchain.transaction.hash;
        var userId1 = Blockchain.transaction.from;
        var userId2 = challengedId || "";
        var battles = this.rapbattle.get(userId1) || [];

        battles.push({
            battleId: battleId,
            userId1: userId1,
            userId2: userId2,
            endDate: endDate
        });
        
        //keep track of users rap battles
        this.rapbattle.put(userId1, battles);

        //keep track of all rap battles
       this.battleids.put(this.battlecount, battleId);
       this.battlecount = new BigNumber(this.battlecount).plus(1);
    },

    get: function (battleId) {
     /*   var usersBattles = this.rapbattle.get(userId1)
        for(var i = 0; i < usersBattles.length; i++){
            if(usersBattles[i].battleId === battleId){
                return JSON.stringify(usersBattles[i]);
            }
        }
        */
        return null;
    },

    getmybattles: function() {
        var userId = Blockchain.transaction.from;
        return JSON.stringify(this.rapbattle.get(userId));
    },

    getAll: function() {
        var battles = [];
        for (var i = 0; i <  this.battlecount; i++) {
            battles.push(this.battleids.get(i))
          }
          return JSON.stringify(battles);
    },

    join: function(){
        //user joins
    },

    submit: function(){
        //submitting an audio
    }


};
module.exports = RapBattle;