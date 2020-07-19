const express = require("express");
const bodyParser = require("body-parser");
const Event = require("../models/events");
const Art = require("../models/art");
const Music = require("../models/music");
const Sport = require("../models/sport");
const Volunteer = require("../models/volunteer");
const { response } = require("express");
const EventType = require("../models/eventTypes");

const eventsRouter = express.Router();

eventsRouter.use(bodyParser.json());

eventsRouter
  .route("/")
  .get((req, res, next) => {
    Event.find()
      .then((events) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(events);
      })
      .catch((err) => next(err));
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /events");
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /events");
  })
  .delete((req, res) => {
    res.statusCode = 403;
    res.end("DELETE operation not supported on /events");
  });

eventsRouter.route("/arts")
.get((req, res, next) => {
  console.log("das arts");
  EventType.find()
    .then((events) => {
      let arts = events.filter(function(x) {
        return x.eventType == "Arts"});
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(arts);
    })
    .catch((err) => next(err));
})
  .post((req, res) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /events/arts");
  })
  .put((req, res) => {
    res.end("PUT operation not supported on /events/arts");
  })
  .delete((req, res) => {
    res.end("DELETE operation not supported on /events/arts");
  });

eventsRouter
  .route("/arts/artId")
  .get((req, res, next) => {
    Art.findById(req.params.artId)
      .then((event) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(event);
      })
      .catch((err) => next(err));
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /events/arts/${req.params.artId}`);
  })
  .put((req, res, next) => {
    Art.findByIdAndUpdate(
      req.params.artId,
    )
      .then((event) => {
        if(authorized)
        {
          if (!event) {
            err = new Error(`${req.params.artId} not found`);
            err.status = 404;
            return next(err);
          } 
          if (req.body.artId == null) {
            err = new Error(`${req.body.artId} not found`);
            err.status = 404;
            return next(err);
          }
        }
        else if (event && event.artId == req.body.artId) {
          event.artId.featured = req.body.artId.featured;
        
          event
            .save()
            .then((event) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(event);
            })
            .catch((err) => next(err));
        }
        else if(!authorized){
          err = new Error("You are not authorized to perform that function!");
          err.status = 403;
          return next(err);
        }
      })
    .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Art.findByIdAndDelete(req.params.artId)
      .then((unlike) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(unlike);
      })
      .catch((err) => next(err));
  });

  eventsRouter.route("/music")
  .get((req, res, next) => {
    console.log("das music");
    EventType.find()
      .then((events) => {
        let music = events.filter(function(x) {
          return x.eventType == "Music"});
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(music);
      })
      .catch((err) => next(err));
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /events/music");
  })
  .put((req, res) => {
    res.end("PUT operation not supported on /events/music");
  })
  .delete((req, res) => {
    res.end("DELETE operation not supported on /events/music");
  });

eventsRouter
  .route("/music/:musicId")
  .get((req, res, next) => {
    Music.findById(req.params.musicId)
      .then((event) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(event);
      })
      .catch((err) => next(err));
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /events/music/${req.params.musicId}`
    );
  })
  .put((req, res, next) => {
    Music.findByIdAndUpdate(
      req.params.musicId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then((like) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(like);
      })
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Music.findByIdAndDelete(req.params.musicId)
      .then((unlike) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(unlike);
      })
      .catch((err) => next(err));
  });

  eventsRouter.route("/sports")
  .get((req, res, next) => {
    console.log("das sports");
    EventType.find()
      .then((events) => {
        let sports = events.filter(function(x) {
          return x.eventType == "Sports"});
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(sports);
      })
      .catch((err) => next(err));
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /events/sport");
  })
  .put((req, res) => {
    res.end("PUT operation not supported on /events/sport");
  })
  .delete((req, res) => {
    res.end("DELETE operation not supported on /events/sport");
  });

eventsRouter
  .route("/sports/:sportId")
  .get((req, res, next) => {
    Sport.findById(req.params.sportId)
      .then((event) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(event);
      })
      .catch((err) => next(err));
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /events/sport/${req.params.sportId}`
    );
  })
  .put((req, res, next) => {
    Sport.findByIdAndUpdate(
      req.params.sportId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then((like) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(like);
      })
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Sport.findByIdAndDelete(req.params.sportId)
      .then((unlike) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(unlike);
      })
      .catch((err) => next(err));
  });

  eventsRouter.route("/volunteer")
  .get((req, res, next) => {
    EventType.find()
      .then((events) => {
        let volunteer = events.filter(function(x) {
          return x.eventType == "Volunteer"});
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(volunteer);
      })
      .catch((err) => next(err));
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /events/volunteer");
  })
  .put((req, res) => {
    res.end("PUT operation not supported on /events/volunteer");
  })
  .delete((req, res) => {
    res.end("DELETE operation not supported on /events/volunteer");
  });

eventsRouter
  .route("/volunteer/:volunteerId")
  .get((req, res, next) => {
    Volunteer.findById(req.params.volunteerId)
      .then((event) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(event);
      })
      .catch((err) => next(err));
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /events/volunteer/${req.params.volunteerId}`
    );
  })
  .put((req, res, next) => {
    Volunteer.findByIdAndUpdate(
      req.params.volunteerId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then((like) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(like);
      })
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Volunteer.findByIdAndDelete(req.params.volunteerId)
      .then((unlike) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(unlike);
      })
      .catch((err) => next(err));
  });

module.exports = eventsRouter;

/*

campsiteRouter.route('/:campsiteId/comments')
    .get((req, res, next) => {
        Campsite.findById(req.params.campsiteId)
            .then(campsite => {
                if (campsite) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(campsite.comments);
                } else {
                    err = new Error(`Campsite ${req.params.campsiteId} not found`);
                    err.status = 404;
                    return next(err);
                }
            })
            .catch(err => next(err));
    })
    .post((req, res, next) => {
        Campsite.findById(req.params.campsiteId)
            .then(campsite => {
                if (campsite) {
                    campsite.comments.push(req.body);
                    campsite.save()
                        .then(campsite => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(campsite);
                        })
                        .catch(err => next(err));
                } else {
                    err = new Error(`Campsite ${req.params.campsiteId} not found`);
                    err.status = 404;
                    return next(err);
                }
            })
            .catch(err => next(err));
    })
    .put((req, res) => {
        res.statusCode = 403;
        res.end(`PUT operation not supported on /campsites/${req.params.campsiteId}/comments`);
    })
    .delete((req, res, next) => {
        Campsite.findById(req.params.campsiteId)
            .then(campsite => {
                if (campsite) {
                    for (let i = (campsite.comments.length - 1); i >= 0; i--) {
                        campsite.comments.id(campsite.comments[i]._id).remove();
                    }
                    campsite.save()
                        .then(campsite => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(campsite);
                        })
                        .catch(err => next(err));
                } else {
                    err = new Error(`Campsite ${req.params.campsiteId} not found`);
                    err.status = 404;
                    return next(err);
                }
            })
            .catch(err => next(err));
    });

campsiteRouter.route('/:campsiteId/comments/:commentId')
    .get((req, res, next) => {
        Campsite.findById(req.params.campsiteId)
            .then(campsite => {
                if (campsite && campsite.comments.id(req.params.commentId)) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(campsite.comments.id(req.params.commentId));
                } else if (!campsite) {
                    err = new Error(`Campsite ${req.params.campsiteId} not found`);
                    err.status = 404;
                    return next(err);
                } else {
                    err = new Error(`Comment ${req.params.commentId} not found`);
                    err.status = 404;
                    return next(err);
                }
            })
            .catch(err => next(err));
    })
    .post((req, res) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on /campsites/${req.params.campsiteId}/comments/${req.params.commentId}`);
    })
    .put((req, res, next) => {
        Campsite.findById(req.params.campsiteId)
            .then(campsite => {
                if (campsite && campsite.comments.id(req.params.commentId)) {
                    if (req.body.rating) {
                        campsite.comments.id(req.params.commentId).rating = req.body.rating;
                    }
                    if (req.body.text) {
                        campsite.comments.id(req.params.commentId).text = req.body.text;
                    }
                    campsite.save()
                        .then(campsite => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(campsite);
                        })
                        .catch(err => next(err));
                } else if (!campsite) {
                    err = new Error(`Campsite ${req.params.campsiteId} not found`);
                    err.status = 404;
                    return next(err);
                } else {
                    err = new Error(`Comment ${req.params.commentId} not found`);
                    err.status = 404;
                    return next(err);
                }
            })
            .catch(err => next(err));
    })
    .delete((req, res, next) => {
        Campsite.findById(req.params.campsiteId)
            .then(campsite => {
                if (campsite && campsite.comments.id(req.params.commentId)) {
                    campsite.comments.id(req.params.commentId).remove();
                    campsite.save()
                        .then(campsite => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(campsite);
                        })
                        .catch(err => next(err));
                } else if (!campsite) {
                    err = new Error(`Campsite ${req.params.campsiteId} not found`);
                    err.status = 404;
                    return next(err);
                } else {
                    err = new Error(`Comment ${req.params.commentId} not found`);
                    err.status = 404;
                    return next(err);
                }
            })
            .catch(err => next(err));
    });

module.exports = campsiteRouter; */
