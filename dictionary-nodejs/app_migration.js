var cors = require('cors')

const mysql = require('mysql');
var promise = require('promise');
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'dictionary'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});




//var express = require("express");
// var app = express();app.listen(3001, () => {
//  console.log("Server running on port 3000");
// });

//connection.connect()

//app.use(cors())


// app.get("/words", (req, res, next) => {
//       word = req.params['query_word'];
//       connection.query("SELECT distinct(word) FROM word", function (err, result, fields) {
//       if (err) throw err;
//       console.log(result);
//       words = []
//       for (var i in result) {
//         words.push(result[i].word);
//       }
//       res.json(words);
//     });
//  });


// app.get("/words/:query_word", (req, res, next) => {
//   word = req.params['query_word'];
//       connection.query("SELECT word FROM word WHERE word LIKE "+"'"+word+"%' limit 100", function (err, result, fields) {
//       if (err) throw err;
//       console.log(result);
//       words = []
//       for (var i in result) {
//         words.push(result[i].word);
//       }
//       res.json(words);
//     });
//  });



distinct_word_list = []

get_distinct_words = function(){
  return new Promise(function(resolve,reject){
    connection.query("SELECT distinct(word) FROM word", function (err, result) {
      if (err) reject(err);
      
      for (var j in result) {
        word = result[j].word;
        distinct_word_list.push(word);
      }
      resolve(distinct_word_list);
    });    
  })
}




get_response_for_word = function(word){
  return new Promise(function(resolve,reject){
    connection.query("SELECT meaning,pos,GROUP_CONCAT(DISTINCT sentence) as sentences,GROUP_CONCAT(DISTINCT word) as synonyms from (SELECT m.meaning,m.pos,s.sentence,wds.word FROM word w LEFT join word_meaning wm ON w.wordid = wm.wordid LEFT JOIN meaning m ON wm.meaningid=m.meaningid LEFT JOIN meaning_sentence ms ON ms.meaningid=wm.meaningid LEFT JOIN sentence s ON s.sentenceid=ms.sentenceid LEFT JOIN word_synonym ws ON ws.meaningid=wm.meaningid LEFT JOIN word wds ON ws.synonymid=wds.wordid WHERE w.word = "+"'"+word+"') AS T group by meaning,pos limit 100", function (err, result, fields) {
      if (err) reject(err);
      word_meanings = [];
      for (var i in result) {
        word_meanings.push({"meaning":result[i].meaning,"pos":result[i].pos,
              "sentences":result[i].sentences,"synonyms":result[i].synonyms});
      }
      resolve({
        'word':w,
        'description': word_meanings});
      });    
  })
}

const axios = require('axios')

responses = []





get_distinct_words()
.then(async function(results){
  console.log(results);

  for(word in results){
    console.log("Word is",results[word]);
    w = results[word];
    //response = await get_response_for_word_util(results[2000]);
    await get_response_for_word(results[word]).then(function(results){
      console.log(results);
      axios.post('https://dictionary-bea35.firebaseio.com/words.json', results)
      .then((res) => {
        console.log(`statusCode: ${res.statusCode}`)
        console.log(res)
      })
      .catch((error) => {
        console.error(error)
      })
      
      //responses.push(results);
      //console.log("Responses are");
      //console.log(responses);
    }).catch(function(err){
      console.log("error")
      console.log(err);
    });
    //console.log(response);
  }
})
.catch(function(err){
  console.log(err);
})
