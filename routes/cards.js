var path = require("path");
var _ = require("underscore");
var Cards = require(path.resolve(path.dirname(__dirname), "modules/cards"));
var Comments = require(path.resolve(path.dirname(__dirname), "modules/comments"));

module.exports = function(router) {
  router.route("/cards").get(function(req, res) {
    var cards = Cards.get();
    res.json(cards);
  }).post(function(req, res) {
    var card = req.body;
    var cards = Cards.get();

    card.id = Cards.getLastID() + 1;
    cards.push(card);
    Cards.set(cards);
    res.json(card);
  });

  router.route("/cards/:id").get(function(req, res) {
    var card = _(Cards.get()).findWhere({ id: Number(req.params.id) });
    res.json(card);
  }).put(function(req, res) {
    var cards = Cards.get();
    var currentCard = _(cards).findWhere({ id: Number(req.params.id) });

    _.extend(currentCard, req.body);
    Cards.update(cards);
    res.json(currentCard);
  }).delete(function(req, res) {
    var id = Number(req.params.id)
    var cards = _(Cards.get()).reject(function(card) {
      return card.id === id;
    });
    var comments = _(Comments.get()).reject(function(comment) {
      return comment.cardID === id;
    });

    Cards.update(cards);
    Comments.update(comments);
    res.status(200).end();
  });
};
