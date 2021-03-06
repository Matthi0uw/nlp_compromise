// Generated by CoffeeScript 1.6.3
var arr;

arr = ["./libs/jquery.js", "./libs/sugar.js", "./libs/oj.js", "./libs/dirty.js", "../nlp.js", "./libs/bluebrowns.js", "./coffeejs/texts.js"];

head.js.apply(this, arr);

head(function() {
  var articles, highlight, make_list, second_choices, set_text, tags_to_html;
  oj.useGlobally();
  articles = Object.keys(texts);
  second_choices = function(k) {
    var choices, style;
    style = "color:white; font-size:17px; cursor:pointer;";
    choices = {
      nouns: function() {
        return tr(function() {
          return ['named entities', 'plural', 'acronyms'].map(function(s) {
            return td({
              style: "" + style + "; background-color:" + (bluebrowns(0.6)) + ";",
              click: function() {
                if (s === "plural") {
                  highlight('plural');
                }
                if (s === "acronyms") {
                  highlight('acronym');
                }
                if (s === "named entities") {
                  return highlight('entity');
                }
              }
            }, function() {
              return s;
            });
          });
        });
      },
      verbs: function() {
        return tr(function() {
          return ['past', 'present', 'future', 'negative'].map(function(s) {
            return td({
              style: "" + style + "; background-color:" + (bluebrowns(0.6)) + ";",
              click: function() {
                if (s === "past") {
                  highlight('past');
                }
                if (s === "present") {
                  highlight('present');
                }
                if (s === "future") {
                  highlight('future');
                }
                if (s === "negative") {
                  return highlight('negative');
                }
              }
            }, function() {
              return s;
            });
          });
        });
      },
      adjectives: function() {
        return tr(function() {
          return ['comparatives', 'superlatives'].map(function(s) {
            return td({
              style: "" + style + "; background-color:" + (bluebrowns(0.6)) + ";",
              click: function() {
                if (s === "comparatives") {
                  highlight('JJR');
                }
                if (s === "superlatives") {
                  return highlight('JJS');
                }
              }
            }, function() {
              return s;
            });
          });
        });
      },
      adverbs: function() {
        return tr(function() {
          return ['comparatives', 'superlatives'].map(function(s) {
            return td({
              style: "" + style + "; background-color:" + (bluebrowns(0.6)) + ";",
              click: function() {
                if (s === "comparatives") {
                  highlight('RBR');
                }
                if (s === "superlatives") {
                  return highlight('RBS');
                }
              }
            }, function() {
              return s;
            });
          });
        });
      },
      values: function() {
        return tr(function() {
          return ['dates', 'numbers'].map(function(s) {
            return td({
              style: "" + style + "; background-color:" + (bluebrowns(0.6)) + ";",
              click: function() {
                if (s === "dates") {
                  highlight('DA');
                }
                if (s === "numbers") {
                  return highlight('NU');
                }
              }
            }, function() {
              return s;
            });
          });
        });
      }
    };
    return choices[k];
  };
  highlight = function(clss) {
    $(".word").css('background-color', 'white');
    arr = [];
    $("." + clss).each(function() {
      $(this).css('background-color', bluebrowns(0.4));
      return arr.push($(this).attr('data-token'));
    });
    return make_list(arr);
  };
  tags_to_html = function(pos) {
    var colour;
    colour = blues(0.4);
    return pos.map(function(sentence) {
      return sentence.tokens.map(function(word) {
        var classes;
        classes = ["word", word.pos.tag, word.pos.parent];
        if (word.pos.parent === "verb") {
          if (word.pos.negative) {
            classes.push("negative");
          }
          classes.push(word.pos.tense);
        }
        if (word.pos.parent === "noun") {
          if (word.is_acronym) {
            classes.push("acronym");
          }
          if (word.is_plural) {
            classes.push("plural");
          }
          if (word.analysis.is_entity) {
            classes.push("entity");
          }
        }
        return "<span data-token=\"" + word.normalised + "\" class=\"" + (classes.join(' ')) + "\">" + word.text + "</span>";
      }).join(' ');
    }).join('<div style="height:10px;"> </div>');
  };
  make_list = function(arr) {
    arr = arr.topk().slice(0, 15);
    return $("#list").html(arr.map(function(s) {
      return s.value;
    }).join(', ') + "..");
  };
  set_text = function(txt) {
    var html, tags;
    tags = nlp.pos(txt).sentences;
    html = tags_to_html(tags);
    $("#text").html(html);
    $("#second").html('');
    return $("#list").html('');
  };
  $("#main").oj(div(function() {
    h3({
      style: "color:grey;"
    }, function() {
      return "nlp comprimise - ";
    });
    css({
      ".word": {
        "border-radius": "3px"
      }
    });
    table({
      style: "width:80%; padding:0px 10% 0px 10%; height:40px;"
    }, function() {
      return tr(function() {
        return ['adjectives', 'nouns', 'verbs', 'adverbs', 'values'].map(function(pos) {
          return td({
            style: "color:white; background-color:" + (bluebrowns(0.7)) + "; cursor:pointer;",
            click: function() {
              var parent, txt;
              txt = $("#text").text();
              parent = pos.replace(/s$/, '');
              $("#second").oj(second_choices(pos));
              return highlight(parent);
            }
          }, function() {
            return pos;
          });
        });
      });
    });
    table({
      id: "second",
      style: "position:relative; width:70%; padding:0px 10% 0px 10%; left:50px; height:20px;"
    });
    div({
      style: "position:relative; left:50%; width:200px; color:grey;"
    }, function() {
      return articles.map(function(t) {
        return span({
          style: "color:steelblue; font-size:12px; cursor:pointer; padding:5px;",
          click: function() {
            return set_text(texts[t]);
          }
        }, function() {
          return t;
        });
      });
    });
    div({
      id: "list",
      style: "display:block; border:1px solid lightsteelblue; padding: 5% 10% 5% 10%; text-align:left; width:80%; max-width:80%; color:steelblue; font-size:22px;"
    });
    return div({
      id: "text",
      style: "display:block; padding: 5% 10% 5% 10%; text-align:left; width:80%; color:slategrey;"
    });
  }));
  return set_text(texts[articles.random()]);
});

/*
//@ sourceMappingURL=index.map
*/
