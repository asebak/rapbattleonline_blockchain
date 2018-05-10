const Nas = require('nebulas');
const NebInvoke = require('../smartcontracts/invoke');

exports.getStartRapBattle = (req, res) => {
    res.render('rapbattle/startbattle', {
      title: 'Start Rap battle',
    });
  };
  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  exports.postStartRapBattle = (req, res, next) => {
    try{
  var fromAddress = req.user.addressId;
  var toAddress = process.env.NAS_RAP_CONTRACT_ID;
  var balance = req.user.balance;
  var amount = "0"
  var acc = Nas.Account.fromAddress(fromAddress); 
  var callArgs = "[\"" +  + "\", \"" + req.body.end + "\"]";   
  acc = acc.fromKey(req.user.key, req.body.password); 
  var nebInvoke = new NebInvoke(toAddress, fromAddress, acc);
  nebInvoke.txCall("start", callArgs, amount, function(response){
      req.flash('success', { msg: 'Rap battle has been created. Battle Id: ' + response.txhash });
      res.redirect('/rapbattle/' + response.txhash);
  }, function(error){
    req.flash('errors', { msg: 'Rap battle could not be created : ' + error.message });
    res.redirect('/startrapbattle');
  });
} catch (error) {
  req.flash('errors', { msg: error.message });
  res.redirect('/startrapbattle');
}
 
  };


  exports.getRapBattle = (req, res) => {
    var battleId = req.params.battleid;

    var account = Nas.Account;
    try {
      var acc = account.fromAddress(req.user.addressId);
     var id = acc.getAddressString();
     
     var Neb = Nas.Neb;
     var neb = new Neb();

           var toAddress = process.env.NAS_RAP_CONTRACT_ID;
           var amount = "0"
           var callArgs = "[\"" + battleId + "\"]";   

           var nebInvoke = new NebInvoke(toAddress, id, id);
           nebInvoke.rpcCall("get", callArgs, amount, function(response){
             if(response.result != null && response.result != "null"){
               var obj = JSON.parse(response.result);
             }
             res.render('rapbattle/rapbattlecontext', {
              title: 'Rap battle',
            });
            }, function(error){
              res.render('rapbattle/rapbattlecontext', {
                title: 'Rap battle',
              });
                
            });
        
    } catch (err) {
    }
  };

  exports.getMyRapBattleList = (req, res) => {
    var account = Nas.Account;
    try {
      var acc = account.fromAddress(req.user.addressId);
     var id = acc.getAddressString();
     
     var Neb = Nas.Neb;
     var neb = new Neb();

           var toAddress = process.env.NAS_RAP_CONTRACT_ID;
           var amount = "0"
           var callArgs = "[]";   

           var nebInvoke = new NebInvoke(toAddress, id, id);
           nebInvoke.rpcCall("getmybattles", callArgs, amount, function(response){
             if(response.result != null && response.result != "null"){
               var obj = JSON.parse(response.result);
             }
             res.render('rapbattle/rapbattlelist', {
              title: 'Rap battle',
            });
            }, function(error){
              res.render('rapbattle/rapbattlelist', {
                title: 'Rap battle',
              });
                
            });
        
    } catch (err) {
    }
  };
